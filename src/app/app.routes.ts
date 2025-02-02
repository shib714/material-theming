import { Routes } from '@angular/router';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddressFormComponent } from './components/address-form/address-form.component';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component:DashboardComponent
      },
      {
        path: 'vehicle',
        component: VehicleComponent,
    },
      {
        path: 'address-form',
        component: AddressFormComponent,
      },
    //   {
    //     path: 'table',
    //     component: TableComponent,
    //   },
    //  
];
