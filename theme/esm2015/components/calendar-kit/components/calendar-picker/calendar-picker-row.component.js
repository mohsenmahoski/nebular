/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, EventEmitter, Input, Output, TemplateRef, Type, ViewChild, ViewContainerRef, } from '@angular/core';
let NbCalendarPickerRowComponent = class NbCalendarPickerRowComponent {
    constructor(cfr) {
        this.cfr = cfr;
        this.select = new EventEmitter();
    }
    ngOnChanges() {
        const factory = this.cfr.resolveComponentFactory(this.component);
        this.containerRef.clear();
        this.row.forEach((date) => {
            const component = this.containerRef.createComponent(factory);
            this.patchWithContext(component.instance, date);
            component.changeDetectorRef.detectChanges();
        });
    }
    patchWithContext(component, date) {
        component.visibleDate = this.visibleDate;
        component.selectedValue = this.selectedValue;
        component.date = date;
        component.min = this.min;
        component.max = this.max;
        component.filter = this.filter;
        component.select.subscribe(this.select.emit.bind(this.select));
    }
};
__decorate([
    Input(),
    __metadata("design:type", Array)
], NbCalendarPickerRowComponent.prototype, "row", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarPickerRowComponent.prototype, "selectedValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarPickerRowComponent.prototype, "visibleDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbCalendarPickerRowComponent.prototype, "component", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarPickerRowComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarPickerRowComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbCalendarPickerRowComponent.prototype, "filter", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbCalendarPickerRowComponent.prototype, "select", void 0);
__decorate([
    ViewChild(TemplateRef, { read: ViewContainerRef, static: true }),
    __metadata("design:type", ViewContainerRef)
], NbCalendarPickerRowComponent.prototype, "containerRef", void 0);
NbCalendarPickerRowComponent = __decorate([
    Component({
        selector: 'nb-calendar-picker-row',
        template: '<ng-template></ng-template>',
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [`
    :host {
      display: flex;
      justify-content: space-between;
    }
  `]
    }),
    __metadata("design:paramtypes", [ComponentFactoryResolver])
], NbCalendarPickerRowComponent);
export { NbCalendarPickerRowComponent };
//# sourceMappingURL=calendar-picker-row.component.js.map