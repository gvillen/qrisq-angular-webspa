import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

import moment from 'moment';
import pako from 'pako';
import smooth from 'smooth-polyline';

import { environment } from '@env';
import { StormData } from '../models/storm.models';

@Injectable({
  providedIn: 'root',
})
export class QrStormService {
  constructor(private httpClient: HttpClient) {}

  getStormData(userId: number): Observable<StormData> {
    return new Observable<StormData>((observer) => {
      forkJoin({
        storm: this.getStormParameters(userId),
        surge: this.getSurgeParameters(),
        wind: this.getWindParameters(),
      }).subscribe((result) => {
        console.log(result);
        const stormData: StormData = {
          lattitude: Number.parseFloat(result.storm.latitude),
          longitude: Number.parseFloat(result.storm.longitude),
          address: result.storm.address,
          clientId: Number.parseInt(result.storm.client_id),
          surgeRisk: result.storm.surgerisk,
          maxFlood: Number.parseFloat(result.storm.maxflood),
          advisoryDate: result.storm.advisory_date,
          nextAdvisoryDate: result.storm.next_advisory_date,
          landfallDate: moment(result.storm.landfall_datetime).toDate(),
          landfallLocation: result.storm.landfall_location,
          stormDistance: Number.parseFloat(result.storm.storm_distance),
          stormName: result.storm.storm_name,
          windRisk: result.storm.windrisk,
          lineGeoJSON: JSON.parse(result.storm.line_data),
          pointsGeoJSON: JSON.parse(result.storm.points_data),
          polygonsGeoJSON: JSON.parse(result.storm.polygon_data),
          surgeGeoJSON: result.surge,
          windGeoJSON: result.wind.windGeoJSON,
          windGrib2JSON: result.wind.windGrib2JSON,
        };
        observer.next(stormData);
        observer.complete();
      });

      // .pipe(
      //   take(1),
      //   map((result) => {
      //     const stormData: StormData = {
      //       lattitude: Number.parseFloat(result.storm.latitude),
      //       longitude: Number.parseFloat(result.storm.latitude),
      //       address: result.storm.address,
      //       clientId: Number.parseInt(result.storm.client_id),
      //       surgeRisk: result.storm.surgerisk,
      //       maxFlood: Number.parseFloat(result.storm.maxflood),
      //       advisoryDate: result.storm.advisory_date,
      //       nextAdvisoryDate: result.storm.next_advisory_date,
      //       landfallDate: moment(result.storm.landfall_datetime).toDate(),
      //       landfallLocation: result.storm.landfall_location,
      //       stormDistance: Number.parseFloat(result.storm.storm_distance),
      //       stormName: result.storm.storm_name,
      //       windRisk: result.storm.windrisk,
      //       lineGeoJSON: JSON.parse(result.storm.line_data),
      //       pointsGeoJSON: JSON.parse(result.storm.points_data),
      //       polygonsGeoJSON: JSON.parse(result.storm.polygon_data),
      //       surgeGeoJSON: result.surge,
      //       windGeoJSON: result.wind.windGeoJSON,
      //       windGrib2JSON: result.wind.windGrib2JSON,
      //     };
      //     observer.next(stormData);
      //     observer.complete();
      //   })
      // );
    });
  }

  private getStormParameters(userId: number) {
    return this.httpClient.get<{
      latitude: string;
      longitude: string;
      address: string;
      client_id: string;
      surgerisk: string;
      maxflood: string;
      advisory_date: string;
      next_advisory_date: string;
      landfall_datetime: Date;
      landfall_location: string;
      storm_distance: string;
      storm_name: string;
      windrisk: string;
      line_data: string;
      points_data: string;
      polygon_data: string;
    }>(environment.API_URL + '/storm-data', {
      headers: { 'Content-type': 'application/json; charset=utf-8' },
      params: { userId: userId.toString() },
    });
  }

  private getSurgeParameters() {
    return this.httpClient
      .get<{ url: string }>(environment.API_URL + '/surge-data', {
        headers: { 'Content-type': 'application/json; charset=utf-8' },
      })
      .pipe(
        take(1),
        tap((response) => console.log(response.url)),
        switchMap((response) =>
          this.httpClient.get(
            'https://qrisq-angular-webspa.s3.us-east-2.amazonaws.com/surge-2020-al28-17-202010282100.zip',
            {
              observe: 'response',
              responseType: 'blob',
            }
          )
        ),
        take(1),
        switchMap(
          (response) =>
            new Observable<Object>((observer) => {
              const url = URL.createObjectURL(response.body);
              loadshp(
                {
                  url,
                  encoding: 'ISO-8859-1',
                  EPSG: 3826,
                },
                (data: any) => {
                  // console.log(data);
                  // const features = data.features;
                  // const smoothFeatures = features.map((feature) => {
                  //   const result = smooth(
                  //     smooth(feature.geometry.coordinates[0])
                  //   );
                  //   return {
                  //     ...feature,
                  //     geometry: { ...feature.geometry, coordinates: [result] },
                  //   };
                  // });
                  // const geoJson = { ...data, features: smoothFeatures };
                  observer.next(data);
                  observer.complete();
                }
              );
            })
        )
      );
  }

  private getWindParameters() {
    return this.httpClient
      .get<{ json_data: string; js_data: string }>(
        environment.API_URL + '/wind-data',
        {
          headers: {
            'Content-type': 'application/json; charset=utf-8',
          },
        }
      )
      .pipe(
        take(1),
        switchMap(
          (response) =>
            new Observable<{ windGeoJSON: Object; windGrib2JSON: Object }>(
              (observer) => {
                let windGeoJSON: Object;
                let windGrib2JSON: Object;
                // process grib2 binary data
                const data = JSON.parse(response.js_data);
                if (data != '') {
                  let instances, vtime;
                  instances = Object.keys(data);
                  instances.sort();
                  let range = instances.length - 1;
                  vtime = instances[0];
                  if (!vtime) {
                    instances = Object.keys(data);
                    instances.sort();
                    vtime = instances[0];
                  }
                  const binData = atob(data[vtime]);
                  const charData = binData.split('').map(function (x) {
                    return x.charCodeAt(0);
                  });
                  var zlibData = new Uint8Array(charData);
                  const result = JSON.parse(
                    pako.inflate(zlibData, { to: 'string' })
                  );
                  result[0].data = Array(result[1].data.length).fill(280);
                  windGrib2JSON = result;
                }
                windGeoJSON = JSON.parse(response.json_data);
                observer.next({ windGeoJSON, windGrib2JSON });
                observer.complete();
              }
            )
        )
      );
  }
}
