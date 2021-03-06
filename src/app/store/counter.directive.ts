import { Directive, Input, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';




@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[counterOf]'
})

export class CounterDirective {

    constructor(
        private container: ViewContainerRef,
        // tslint:disable-next-line: ban-types
        private template: TemplateRef<Object>,
    ) { }


    @Input('counterOf')
    counter = 0;


    ngOnChanges(changes: SimpleChanges) {
        this.container.clear();

        for (let i = 0; i < this.counter; i++) {
            this.container.createEmbeddedView(this.template, new CounterDirectiveContext(i + 1));
        }
    }
}

class CounterDirectiveContext {
    constructor(public $implicit: any) { }
}
