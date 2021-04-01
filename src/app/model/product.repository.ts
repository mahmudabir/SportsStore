import { RestDataSource } from './rest.datasource';
// import { StaticDataSource } from './static.datasource';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { subscribeOn } from 'rxjs/operators';




@Injectable()
export class ProductRepository {
    private products: Product[] = [];
    private categories: string[] = [];


    // constructor(private dataSource: StaticDataSource) {
    constructor(private dataSource: RestDataSource) {
        dataSource.getProducts().subscribe(data => {
            this.products = data;
            this.categories = (data.map(p => p.category) as string[]);
        });
    }
    getProducts(category?: string): Product[] {
        return this.products.filter(p => category == null || category === p.category || category === '');
    }

    getProduct(id: number): Product {
        // tslint:disable-next-line: triple-equals
        return this.products.find(p => p.id == id) as Product;
    }
    getCategories(): string[] {
        return this.categories;
    }

    // tslint:disable-next-line: typedef
    saveProducts(product: Product) {
        // tslint:disable-next-line: triple-equals
        if (product.id == null || product.id == 0) {
            this.dataSource.saveProduct(product).subscribe(p => this.products.push(p));
        } else {
            this.dataSource.updateProduct(product).subscribe(p => {
                this.products.splice(this.products.findIndex(p => p.id == product.id), 1, product);
            });
        }
    }

    // tslint:disable-next-line: typedef
    deleteProduct(id: number) {
        this.dataSource.deleteProduct(id).subscribe(p => {
            this.products.splice(this.products.findIndex(p => p.id == id), 1);
        });
    }
}
