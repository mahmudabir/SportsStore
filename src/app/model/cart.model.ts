import { Product } from './product.model';
import { Injectable } from '@angular/core';


@Injectable()
export class Cart {
    public lines: CartLine[] = [];
    public itemCount = 0;
    public cartPrice = 0;

    // tslint:disable-next-line: typedef
    addLine(product: Product, quantity: number = 1) {
        // tslint:disable-next-line: no-shadowed-variable
        let line = this.lines.find(line => line.product.id === product.id);

        if (line !== undefined) {
            line.quantity += quantity;
        } else {
            this.lines.push(new CartLine(product, quantity));
        }

        this.reCalculate();
    }

    // tslint:disable-next-line: typedef
    updateQuantity(product: Product, quantity: string) {
        // tslint:disable-next-line: no-shadowed-variable
        let line = this.lines.find(line => line.product.id === product.id);

        if (line !== undefined) {
            if (line.quantity + Number(quantity) < 10) {
                line.quantity = Number(quantity);
            } else if (line.quantity === 0) {
                this.removeLine(line.product.id);
            } else {

            }
        }

        this.reCalculate();
    }


    // tslint:disable-next-line: typedef
    increaseQuantity(product: Product) {
        // tslint:disable-next-line: no-shadowed-variable
        let line = this.lines.find(line => line.product.id === product.id);

        if (line !== undefined) {
            if (line.quantity < 10) {
                line.quantity = Number(line.quantity + 1);
            }
        }

        this.reCalculate();
    }

    // tslint:disable-next-line: typedef
    decreaseQuantity(product: Product) {
        // tslint:disable-next-line: no-shadowed-variable
        let line = this.lines.find(line => line.product.id === product.id);

        if (line !== undefined) {
            line.quantity = Number(line.quantity - 1);
            if (line.quantity === 0) {
                this.removeLine(line.product.id);
            }
        }

        this.reCalculate();
    }


    // tslint:disable-next-line: typedef
    removeLine(id: number) {
        let index = this.lines.findIndex(line => line.product.id === id);

        this.lines.splice(index, 1);

        this.reCalculate();
    }

    // tslint:disable-next-line: typedef
    clear() {
        this.lines = [];
        this.itemCount = 0;
        this.reCalculate();
    }

    // tslint:disable-next-line: typedef
    private reCalculate() {
        this.itemCount = 0;
        this.cartPrice = 0;
        this.lines.forEach(l => {
            this.itemCount += l.quantity;
            this.cartPrice += (l.quantity * l.product.price);
        });
    }

}



export class CartLine {
    constructor(
        public product: Product,
        public quantity: number
    ) { }

    // tslint:disable-next-line: typedef
    get lineTotal() {
        return this.quantity * this.product.price;
    }
}
