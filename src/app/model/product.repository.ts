import { StaticDataSource } from './static.datasource';
import { Product } from './product.model';
import { Injectable } from '@angular/core';




@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];


    constructor(private dataSource: StaticDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = (data.map(p => p.category) as string[]);
        });
    }
    getProducts(category?: string): Product[] {
        return this.products
            // tslint:disable-next-line: triple-equals
            .filter(p => category == null || category == p.category);
    }

    getProduct(id: number): Product {
        // tslint:disable-next-line: triple-equals
        return this.products.find(p => p.id == id) as Product;
    }
    getCategories(): string[] {
        return this.categories;
    }
}
