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
import { Component, Input, HostBinding } from '@angular/core';
/**
 * Component intended to be used within the `<nb-card>` component.
 * It adds styles for a preset header section.
 *
 * @styles
 *
 * card-header-text-color:
 * card-header-text-font-family:
 * card-header-text-font-size:
 * card-header-text-font-weight:
 * card-header-text-line-height:
 * card-header-primary-background-color:
 * card-header-primary-text-color:
 * card-header-info-background-color:
 * card-header-info-text-color:
 * card-header-success-background-color:
 * card-header-success-text-color:
 * card-header-warning-background-color:
 * card-header-warning-text-color:
 * card-header-danger-background-color:
 * card-header-danger-text-color:
 */
let NbCardHeaderComponent = class NbCardHeaderComponent {
};
NbCardHeaderComponent = __decorate([
    Component({
        selector: 'nb-card-header',
        template: `<ng-content></ng-content>`
    })
], NbCardHeaderComponent);
export { NbCardHeaderComponent };
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset body section.
 */
let NbCardBodyComponent = class NbCardBodyComponent {
};
NbCardBodyComponent = __decorate([
    Component({
        selector: 'nb-card-body',
        template: `<ng-content></ng-content>`
    })
], NbCardBodyComponent);
export { NbCardBodyComponent };
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset footer section.
 */
let NbCardFooterComponent = class NbCardFooterComponent {
};
NbCardFooterComponent = __decorate([
    Component({
        selector: 'nb-card-footer',
        template: `<ng-content></ng-content>`
    })
], NbCardFooterComponent);
export { NbCardFooterComponent };
/**
 * Basic content container component.
 *
 * Basic card example:
 * @stacked-example(Showcase, card/card-showcase.component)
 *
 * Basic card configuration:
 *
 * ```html
 * <nb-card>
 *   <nb-card-body>
 *     Card
 *   </nb-card-body>
 * </nb-card>
 * ```
 *
 * ### Installation
 *
 * Import `NbCardModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCardModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Card with header and footer:
 * @stacked-example(With Header & Footer, card/card-full.component)
 *
 * Most of the time main card content goes to `nb-card-body`,
 * so it is styled and aligned in accordance with the header and footer.
 * In case you need a higher level of control, you can pass contend directly to `nb-card`,
 * so `nb-card-body` styling will not be applied.
 *
 * Consider an example with `nb-list` component:
 * @stacked-example(Card with list, card/card-without-body.component)
 *
 * Colored cards could be simply configured by providing a `status` property:
 * @stacked-example(Colored Card, card/card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Card, card/card-accents.component)
 *
 * @additional-example(Multiple Sizes, card/card-sizes.component)
 *
 * @styles
 *
 * card-background-color:
 * card-text-color:
 * card-text-font-family:
 * card-text-font-size:
 * card-text-font-weight:
 * card-text-line-height:
 * card-border-width:
 * card-border-style:
 * card-border-color:
 * card-border-radius:
 * card-padding:
 * card-shadow:
 * card-divider-color:
 * card-divider-style:
 * card-divider-width:
 * card-height-tiny:
 * card-height-small:
 * card-height-medium:
 * card-height-large:
 * card-height-giant:
 * card-margin-bottom:
 * card-scrollbar-color:
 * card-scrollbar-background-color:
 * card-scrollbar-width:
 */
let NbCardComponent = class NbCardComponent {
    /**
     * Basic content container component.
     *
     * Basic card example:
     * @stacked-example(Showcase, card/card-showcase.component)
     *
     * Basic card configuration:
     *
     * ```html
     * <nb-card>
     *   <nb-card-body>
     *     Card
     *   </nb-card-body>
     * </nb-card>
     * ```
     *
     * ### Installation
     *
     * Import `NbCardModule` to your feature module.
     * ```ts
     * @NgModule({
     *   imports: [
     *     // ...
     *     NbCardModule,
     *   ],
     * })
     * export class PageModule { }
     * ```
     * ### Usage
     *
     * Card with header and footer:
     * @stacked-example(With Header & Footer, card/card-full.component)
     *
     * Most of the time main card content goes to `nb-card-body`,
     * so it is styled and aligned in accordance with the header and footer.
     * In case you need a higher level of control, you can pass contend directly to `nb-card`,
     * so `nb-card-body` styling will not be applied.
     *
     * Consider an example with `nb-list` component:
     * @stacked-example(Card with list, card/card-without-body.component)
     *
     * Colored cards could be simply configured by providing a `status` property:
     * @stacked-example(Colored Card, card/card-colors.component)
     *
     * It is also possible to assign an `accent` property for a slight card highlight
     * as well as combine it with `status`:
     * @stacked-example(Accent Card, card/card-accents.component)
     *
     * @additional-example(Multiple Sizes, card/card-sizes.component)
     *
     * @styles
     *
     * card-background-color:
     * card-text-color:
     * card-text-font-family:
     * card-text-font-size:
     * card-text-font-weight:
     * card-text-line-height:
     * card-border-width:
     * card-border-style:
     * card-border-color:
     * card-border-radius:
     * card-padding:
     * card-shadow:
     * card-divider-color:
     * card-divider-style:
     * card-divider-width:
     * card-height-tiny:
     * card-height-small:
     * card-height-medium:
     * card-height-large:
     * card-height-giant:
     * card-margin-bottom:
     * card-scrollbar-color:
     * card-scrollbar-background-color:
     * card-scrollbar-width:
     */
    constructor() {
        this._size = '';
        this._status = '';
    }
    /**
     * Card size, available sizes:
     * tiny, small, medium, large, giant
     */
    get size() {
        return this._size;
    }
    set size(value) {
        this._size = value;
    }
    /**
     * Card status:
     * primary, info, success, warning, danger
     */
    get status() {
        return this._status;
    }
    set status(value) {
        this._status = value;
    }
    /**
     * Card accent (color of the top border):
     * primary, info, success, warning, danger
     */
    get accent() {
        return this._accent;
    }
    set accent(value) {
        this._accent = value;
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
    get primary() {
        return this.status === 'primary';
    }
    get info() {
        return this.status === 'info';
    }
    get success() {
        return this.status === 'success';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
    get hasAccent() {
        return this.accent;
    }
    get primaryAccent() {
        return this.accent === 'primary';
    }
    get infoAccent() {
        return this.accent === 'info';
    }
    get successAccent() {
        return this.accent === 'success';
    }
    get warningAccent() {
        return this.accent === 'warning';
    }
    get dangerAccent() {
        return this.accent === 'danger';
    }
};
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NbCardComponent.prototype, "size", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NbCardComponent.prototype, "status", null);
__decorate([
    Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], NbCardComponent.prototype, "accent", null);
__decorate([
    HostBinding('class.size-tiny'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "tiny", null);
__decorate([
    HostBinding('class.size-small'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "small", null);
__decorate([
    HostBinding('class.size-medium'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "medium", null);
__decorate([
    HostBinding('class.size-large'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "large", null);
__decorate([
    HostBinding('class.size-giant'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "giant", null);
__decorate([
    HostBinding('class.status-primary'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "primary", null);
__decorate([
    HostBinding('class.status-info'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "info", null);
__decorate([
    HostBinding('class.status-success'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "success", null);
__decorate([
    HostBinding('class.status-warning'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "warning", null);
__decorate([
    HostBinding('class.status-danger'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "danger", null);
__decorate([
    HostBinding('class.accent'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "hasAccent", null);
__decorate([
    HostBinding('class.accent-primary'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "primaryAccent", null);
__decorate([
    HostBinding('class.accent-info'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "infoAccent", null);
__decorate([
    HostBinding('class.accent-success'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "successAccent", null);
__decorate([
    HostBinding('class.accent-warning'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "warningAccent", null);
__decorate([
    HostBinding('class.accent-danger'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbCardComponent.prototype, "dangerAccent", null);
NbCardComponent = __decorate([
    Component({
        selector: 'nb-card',
        template: `
    <ng-content select="nb-card-header"></ng-content>
    <ng-content select="nb-card-body"></ng-content>
    <ng-content></ng-content>
    <ng-content select="nb-card-footer"></ng-content>
  `,
        styles: [":host{display:flex;flex-direction:column}\n"]
    })
], NbCardComponent);
export { NbCardComponent };
//# sourceMappingURL=card.component.js.map