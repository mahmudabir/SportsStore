import { OrderRepository } from './order.repository';
import { Order } from './order.model';
import { Cart } from './cart.model';
import { NgModule } from '@angular/core';
import { ProductRepository } from './product.repository';
import { StaticDataSource } from './static.datasource';

@NgModule({
    providers: [ProductRepository, StaticDataSource, Cart, Order, OrderRepository]
})
export class ModelModule {

    // tslint:disable-next-line: typedef
    ToNumber(data: string) {
        return Number(data);
    }
}
