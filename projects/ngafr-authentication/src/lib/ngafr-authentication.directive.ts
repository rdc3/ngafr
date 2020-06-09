import { Directive, OnInit, ComponentFactoryResolver, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { NgafrAuthenticationComponent } from './ngafr-authentication.component';


@Directive({ selector: '[ngafrAuth]' })
export class NgafrAuthDirective implements OnInit {
    private authTemplateComponent: NgafrAuthenticationComponent;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewContainer: ViewContainerRef,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NgafrAuthenticationComponent);
        const componentRef = componentFactory.create(this.viewContainer.injector);
        this.authTemplateComponent = componentRef.instance;
        this.viewContainer.createEmbeddedView(this.authTemplateComponent.ngafrAuthElement);
        this.cdr.markForCheck();
    }

}


