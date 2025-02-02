import { HttpClient } from '@angular/common/http';
import { inject, Injectable, computed } from '@angular/core';
import { Vehicle } from '../model/vehicle';
import { VehicleResponse } from '../model/vehicle-response';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {


  private readonly API_URL = 'https://swapi.dev/api/vehicles/';
  private readonly http = inject(HttpClient);

  //vehicleList$ = this.http.get<Vehicle[]>(this.API_URL);
  //vehicles = toSignal(this.vehicleList$, {initialValue: []});
  // getVehicles(): void {
  //   this.http.get(this.API_URL).subscribe((data: any) => {
  //     this.vehicles = data.results;
  //   });
  //   console.log(this.vehicles.length);
  // }

  //using observable  
  fetchVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.API_URL);
  }


  //using Promise
  getVehicleList() : Promise<any>{
    return this.http.get<Vehicle[]>(this.API_URL).toPromise();
    //https://jsonplaceholder.typicode.com/todos
  }

  //using rxResource
  vehicleResource = rxResource({
    loader: () => this.http.get<VehicleResponse>(this.API_URL).pipe(
      map(vr => vr.results)
    )
  });

  //signal
  vehicles = computed(() => this.vehicleResource.value() ?? [] as Vehicle[]);
}


