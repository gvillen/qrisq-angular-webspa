// angular
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// env
import { environment } from '@env';

// module
import { HurricaneViewerModule } from '@features/hurricane-viewer/hurricane-viewer.module';

// gzip
import pako from 'pako';

const {
  HURRICANE_WIND_URL,
  HURRICANE_WIND_LINE_URL,
  HURRICANE_WIND_POINTS_URL,
  HURRICANE_WIND_POLYGON_URL,
} = environment;

@Injectable({
  providedIn: 'root',
})
export class HurricaneWindService {
  constructor(private http: HttpClient) {}

  getWindGeoJSON() {
    const observable = new Observable((observer) => {
      this.fetchGeoJSON(HURRICANE_WIND_URL).subscribe((response) => {
        const data = response.body.arrayBuffer().then((arrayBuffer) => {
          let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
            to: 'string',
          });
          observer.next(JSON.parse(result));
          observer.complete();
        });
      });
    });
    return observable;
  }

  getLineGeoJSON() {
    const observable = new Observable((observer) => {
      this.fetchGeoJSON(HURRICANE_WIND_LINE_URL).subscribe((response) => {
        const data = response.body.arrayBuffer().then((arrayBuffer) => {
          let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
            to: 'string',
          });
          observer.next(JSON.parse(result));
          observer.complete();
        });
      });
    });
    return observable;
  }

  getPointsGeoJSON() {
    const observable = new Observable((observer) => {
      this.fetchGeoJSON(HURRICANE_WIND_POINTS_URL).subscribe((response) => {
        response.body.arrayBuffer().then((arrayBuffer) => {
          let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
            to: 'string',
          });
          const geoJSON = JSON.parse(result);
          // set icon property
          const circle: google.maps.Symbol = {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 7,
          };
          geoJSON.features = geoJSON.features.map((feature) => {
            feature.properties.icon = circle;
            return feature;
          });
          console.log(geoJSON);
          observer.next(geoJSON);
          observer.complete();
        });
      });
    });
    return observable;
  }

  getPolygonGeoJSON() {
    const observable = new Observable((observer) => {
      this.fetchGeoJSON(HURRICANE_WIND_POLYGON_URL).subscribe((response) => {
        const data = response.body.arrayBuffer().then((arrayBuffer) => {
          let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
            to: 'string',
          });
          observer.next(JSON.parse(result));
          observer.complete();
        });
      });
    });
    return observable;
  }

  private fetchGeoJSON(url) {
    return this.http.get(url, {
      observe: 'response',
      responseType: 'blob',
    });
  }
}

// fetch(url)
//   .then(function (response) {
//     return response.blob();
//   })
//   .then((blob) => {
//     var arrayBuffer;
//     var fileReader = new FileReader();
//     var res = {};
//     fileReader.onload = (e) => {
//       arrayBuffer = e.target.result;
//       try {
//         let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
//           to: 'string',
//         });
//         observer.next(JSON.parse(result));
//       } catch (err) {
//         console.log('Error ' + err);
//       }
//     };
//     fileReader.readAsArrayBuffer(blob);
//   });
