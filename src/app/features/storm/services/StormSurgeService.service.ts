import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QrStormSurgeService {
  constructor(private httpClient: HttpClient) {}

  getSurgeGeoJSON(): Observable<Object> {
    return new Observable<Object>((observer) => {
      this.httpClient
        .get(environment.SURGE_SHP_ZIP_URL, {
          observe: 'response',
          responseType: 'blob',
        })
        .subscribe((response) => {
          const url = URL.createObjectURL(response.body);
          loadshp(
            {
              url,
              encoding: 'ISO-8859-1',
            },
            (data) => {
              observer.next(data);
            }
          );
        });
      // observer.next('Hi');
    });
    // return this.httpClient
    //   .get(environment.SURGE_SHP_ZIP_URL, {
    //     observe: 'response',
    //     responseType: 'blob',
    //   })
    //   .pipe(
    //     map((blob) => {
    //       return this.shapefileToGeoJSON(blob).pipe(map((geojson) => geojson));
    //     })
    //   );

    // const observable = new Observable((observer) => {
    //   this.fetchGeoJSON(environment.SURGE_SHP_URL).subscribe((response) => {
    //     const data = response.body.arrayBuffer().then((arrayBuffer) => {
    //       let result: any = pako.inflate(new Uint8Array(arrayBuffer), {
    //         to: 'string',
    //       });
    //       observer.next(JSON.parse(result));
    //       observer.complete();
    //     });
    //   });
    // });
    // return observable;
  }

  shapefileToGeoJSON(blob: Blob): Observable<Object> {
    return new Observable<Object>((observer) => {});
  }
}
