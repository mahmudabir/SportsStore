import { Product } from './../model/product.model';
import { ProductRepository } from './../model/product.repository';
import { Component } from '@angular/core';


@Component({
    templateUrl: 'productTable.component.html'
})
export class ProductTableComponent {

    constructor(private repository: ProductRepository) {
    }

    getProducts(): Product[] {
        return this.repository.getProducts();
    }

    // tslint:disable-next-line: typedef
    deleteProduct(id: number) {
        this.repository.deleteProduct(id);
    }
}
