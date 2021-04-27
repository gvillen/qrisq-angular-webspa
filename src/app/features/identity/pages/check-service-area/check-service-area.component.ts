// angular
import { Component, OnInit, ViewChild } from '@angular/core';

// google maps
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

// rxjs
import { map, takeLast } from 'rxjs/operators';

// ngrx
import { Store } from '@ngrx/store';

// store
import { actionCheckServiceAreaRequest } from '../../store/identity.actions';

// component store
import { QrCheckServiceAreaComponentStore } from './check-service-area.component-store';

@Component({
  selector: 'qr-check-service-area',
  templateUrl: './check-service-area.component.html',
  styleUrls: ['./check-service-area.component.css'],
})
export class QrCheckServiceAreaPageComponent implements OnInit {
  constructor(
    private componentStore: QrCheckServiceAreaComponentStore,
    private store: Store
  ) {}

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  isLocation$ = this.componentStore.IsLocation$;

  ngOnInit(): void {
    this.componentStore.resetState();
  }

  public onAddressChange(address: Address): void {
    const lattitude = address.geometry.location.lat();
    const longitude = address.geometry.location.lng();
    this.componentStore.updateLocation({ lattitude, longitude });
  }

  public OnSearch(): void {
    this.componentStore.location$.pipe(
      takeLast(1),
      map((location) =>
        this.store.dispatch(
          actionCheckServiceAreaRequest({
            lattitude: location.lattitude,
            longitude: location.longitude,
          })
        )
      )
    );
  }
}
