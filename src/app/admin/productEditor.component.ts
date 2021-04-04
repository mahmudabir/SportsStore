import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductRepository } from './../model/product.repository';
import { Product } from './../model/product.model';
import { Component } from '@angular/core';


@Component({
    templateUrl: 'productEditor.component.html'
})
export class ProductEditorComponent {
    editing: boolean = false;
    product: Product = new Product();

    constructor(
        private repository: ProductRepository,
        private router: Router,
        activeRoute: ActivatedRoute
    ) {
        const modeName = 'mode';
        const idName = 'id';
        const mode = activeRoute.snapshot.params[modeName];
        const id = activeRoute.snapshot.params[idName];

        this.editing = mode === 'edit';

        if (this.editing) {
            Object.assign(this.product, this.repository.getProduct(id));
        }
    }

    // tslint:disable-next-line: typedef
    save(form: NgForm) {
        this.repository.saveProducts(this.product);
        this.router.navigateByUrl('/admin/main/products');
    }
}
