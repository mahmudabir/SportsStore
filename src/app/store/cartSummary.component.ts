import { Cart } from './../model/cart.model';
import { Component } from '@angular/core';


@Component({
    selector: 'app-cart-summary',
    templateUrl: 'cartSummary.component.html'
})


export class CartSummaryComponent {
    constructor(public cart: Cart) { }
}
