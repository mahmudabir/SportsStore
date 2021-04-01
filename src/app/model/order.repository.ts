import { RestDataSource } from './rest.datasource';
// import { StaticDataSource } from './static.datasource';
import { Order } from './order.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable()
export class OrderRepository {
    private orders: Order[] = [];
    private loaded: boolean = false;

    constructor(private dataSource: RestDataSource) { }

    // tslint:disable-next-line: typedef
    loadOrders() {
        this.loaded = true;
        this.dataSource.getOrders().subscribe(orders => this.orders = this.orders);
    }

    getOrders(): Order[] {
        if (!this.loaded) {
            this.loadOrders();
        }
        return this.orders;
    }

    saveOrder(order: Order): Observable<Order> {
        return this.dataSource.saveOrder(order);
    }

    // tslint:disable-next-line: typedef
    updateOrder(order: Order) {
        this.dataSource.updateOrder(order).subscribe(p => {
            this.orders.splice(this.orders.findIndex(o => o.id == order.id), 1, order);
        });
    }

    // tslint:disable-next-line: typedef
    deleteOrder(id: number) {
        this.dataSource.deleteOrder(id).subscribe(order => {
            this.orders.splice(this.orders.findIndex(o => id == o.id), 1);
        });
    }
}
