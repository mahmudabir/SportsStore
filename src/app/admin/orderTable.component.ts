import { Component } from '@angular/core';
import { Order } from '../model/order.model';
import { OrderRepository } from '../model/order.repository';


@Component({
  templateUrl: 'orderTable.component.html'
})
export class OrderTableComponent {
  includeShipped = false;

  constructor(
    private repository: OrderRepository
  ) { }

  getOrders(): Order[] {
    const dataOrder: Order[] = this.repository.getOrders().filter(o => this.includeShipped || !o.shipped);
    console.log(dataOrder);
    return dataOrder;
  }

  // tslint:disable-next-line:typedef
  markShipped(order: Order) {
    order.shipped = true;
    this.repository.updateOrder(order);
  }

  // tslint:disable-next-line:typedef
  delete(id: number) {
    this.repository.deleteOrder(id);
  }
}
