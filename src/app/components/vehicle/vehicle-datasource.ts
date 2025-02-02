import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Vehicle } from '../../model/vehicle';
import { VehicleService } from '../../services/vehicle.service';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Vehicle[] = [
    {
        name: "Sand Crawler",
        model: "Digger Crawler",
        manufacturer: "Corellia Mining Corporation",
        cost_in_credits: "150000",
        cargo_capacity: "50000",
        vehicle_class: "wheeled",
        created: "2014-12-10T15:36:25.724000Z",
    },
    {
        name: "T-16 skyhopper",
        model: "T-16 skyhopper",
        manufacturer: "Incom Corporation",
        cost_in_credits: "14500",
        cargo_capacity: "50",
        vehicle_class: "repulsorcraft",
        created: "2014-12-10T16:01:52.434000Z",
    },
    {
        name: "X-34 landspeeder",
        model: "X-34 landspeeder",
        manufacturer: "SoroSuub Corporation",
        cost_in_credits: "10550",
        cargo_capacity: "5",
        vehicle_class: "repulsorcraft",
        created: "2014-12-10T16:13:52.586000Z",
    },
    {
        name: "TIE/LN starfighter",
        model: "Twin Ion Engine/Ln Starfighter",
        manufacturer: "Sienar Fleet Systems",
        cost_in_credits: "unknown",
        cargo_capacity: "65",
        vehicle_class: "starfighter",
        created: "2014-12-10T16:33:52.860000Z",
    },
    {
        name: "Snowspeeder",
        model: "t-47 airspeeder",
        manufacturer: "Incom corporation",
        cost_in_credits: "unknown",
        cargo_capacity: "10",
        vehicle_class: "airspeeder",
        created: "2014-12-15T12:22:12Z",

    },
    {
        name: "TIE bomber",
        model: "TIE/sa bomber",
        manufacturer: "Sienar Fleet Systems",
        cost_in_credits: "unknown",
        cargo_capacity: "none",
        vehicle_class: "space/planetary bomber",
        created: "2014-12-15T12:33:15.838000Z",

    },
];
/**
 * Data source for the Table view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class VehicleDataSource extends DataSource<Vehicle> {
    data: Vehicle[] = EXAMPLE_DATA;
    //data: Vehicle[] = this.vehicles;
    paginator: MatPaginator | undefined;
    sort: MatSort | undefined;

    vehicleService: VehicleService = inject(VehicleService);
    //vehicles: Vehicle[] = this.vehicleService.vehicles();

    constructor() {
        super();
    }

    /**
      * Connect this data source to the table. The table will only update when
      * the returned stream emits new items.
      * @returns A stream of the items to be rendered.
      */
    connect(): Observable<Vehicle[]> {
        console.log("Tabledata in connect: " + this.data)
        if (this.paginator && this.sort) {
            // Combine everything that affects the rendered data into one update
            // stream for the data-table to consume.
            return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
                .pipe(map(() => {
                    return this.getPagedData(this.getSortedData([...this.data]));
                }));
        } else {
            throw Error('Please set the paginator and sort on the data source before connecting.');
        }
    }
    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
    disconnect(): void { }

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
    private getPagedData(data: Vehicle[]): Vehicle[] {
        if (this.paginator) {
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            return data.splice(startIndex, this.paginator.pageSize);
        } else {
            return data;
        }
    }
    /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
    private getSortedData(data: Vehicle[]): Vehicle[] {
        if (!this.sort || !this.sort.active || this.sort.direction === '') {
            return data;
        }
        return data.sort((a, b) => {
            const isAsc = this.sort?.direction === 'asc';
            switch (this.sort?.active) {
                case 'name': return compare(a.name, b.name, isAsc);
                case 'model': return compare(a.model, b.model, isAsc);
                case 'manufacturer': return compare(a.manufacturer, b.manufacturer, isAsc);
                case 'cost_in_credits': return compare(a.cost_in_credits, b.cost_in_credits, isAsc);
                case 'cargo_capacity': return compare(a.cargo_capacity, b.cargo_capacity, isAsc);
                case 'vehicle_class': return compare(a.vehicle_class, b.vehicle_class, isAsc);
                case 'created': return compare(a.created, b.created, isAsc);
                default: return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
