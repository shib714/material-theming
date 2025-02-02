import { Component, ViewChild } from '@angular/core';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Vehicle } from '../../model/vehicle';
import { MatTable, MatTableModule } from '@angular/material/table';
import { VehicleDataSource } from './vehicle-datasource';

@Component({
  selector: 'app-vehicle',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './vehicle.component.html',
  styleUrl: './vehicle.component.scss'
})
export class VehicleComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Vehicle>;

  //vehicleService : VehicleService = inject(VehicleService);
  //dataSource = new MatTableDataSource<Vehicle>(this.vehicleService.vehicles());
  dataSource = new VehicleDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'model', 'manufacturer', 'cost_in_credits', 'cargo_capacity', 'vehicle_class', 'created'];

  ngAfterViewInit(): void {
    console.log("TableComponent dataSource: " + this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
