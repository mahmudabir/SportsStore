import { Product } from './../model/product.model';
import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';


@Component({
    selector: 'app-store',
    templateUrl: 'store.component.html'
})

export class StoreComponent {
    constructor(private repository: ProductRepository) { }

    get products(): Product[] {
        return this.repository.getProducts();
    }


    get categories(): string[] {
        return this.repository.getCategories();
    }

}


