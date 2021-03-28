import { Product } from './../model/product.model';
import { Component } from '@angular/core';
import { ProductRepository } from '../model/product.repository';


@Component({
    selector: 'app-store',
    templateUrl: 'store.component.html'
})

export class StoreComponent {
    public selectedCategory = '';
    public productsPerPage = 4;
    public selectedPage = 1;


    constructor(private repository: ProductRepository) { }

    get products(): Product[] {
        const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }


    get categories(): string[] {
        return this.repository.getCategories().map(item => item).filter((value, index, self) => self.indexOf(value) === index);
    }


    // tslint:disable-next-line: typedef
    changeCategory(newCategory?: string) {
        this.changePage(1);
        this.selectedCategory = (newCategory as string);
    }


    // tslint:disable-next-line: typedef
    changePage(newPage: number) {
        this.selectedPage = newPage;
    }

    // tslint:disable-next-line: typedef
    changePageSize(newSize: number) {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    get pageNumbers(): number[] {
        return Array(Math.ceil(this.repository.getProducts(this.selectedCategory).length / this.productsPerPage))
            .fill(0).map((x, i) => i + 1);
    }
}

