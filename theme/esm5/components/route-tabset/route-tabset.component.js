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
import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
/**
 * Route tabset components.
 * Renders tabs inside of a router-outlet.
 *
 * ```ts
 *  tabs = [
 *  {
 *    title: 'Route tab #1',
 *    route: '/pages/description',
 *    icon: 'home',
 *    responsive: true, // hide title before `route-tabs-icon-only-max-width` value
 *  },
 *  {
 *    title: 'Route tab #2',
 *    route: '/pages/images',
 *    }
 *  ];
 *
 *  <nb-route-tabset [tabs]="tabs"></nb-route-tabset>
 * ```
 * ### Installation
 *
 * Import `NbRouteTabsetModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbRouteTabsetModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * @stacked-example(Route Tabset, tabset/route-tabset-showcase.component)
 *
 * @styles
 *
 * route-tabset-background-color:
 * route-tabset-border-radius:
 * route-tabset-shadow:
 * route-tabset-tab-background-color:
 * route-tabset-tab-padding:
 * route-tabset-tab-text-color:
 * route-tabset-tab-text-font-family:
 * route-tabset-tab-text-font-size:
 * route-tabset-tab-text-font-weight:
 * route-tabset-tab-text-line-height:
 * route-tabset-tab-text-transform:
 * route-tabset-tab-underline-width:
 * route-tabset-tab-underline-color:
 * route-tabset-tab-active-background-color:
 * route-tabset-tab-active-text-color:
 * route-tabset-tab-active-underline-color:
 * route-tabset-tab-focus-background-color:
 * route-tabset-tab-focus-text-color:
 * route-tabset-tab-focus-underline-color:
 * route-tabset-tab-hover-background-color:
 * route-tabset-tab-hover-text-color:
 * route-tabset-tab-hover-underline-color:
 * route-tabset-tab-disabled-background-color:
 * route-tabset-tab-disabled-text-color:
 * route-tabset-tab-disabled-underline-color:
 * route-tabset-divider-color:
 * route-tabset-divider-style:
 * route-tabset-divider-width:
 * route-tabset-scrollbar-color:
 * route-tabset-scrollbar-background-color:
 * route-tabset-scrollbar-width:
 * route-tabset-tab-text-hide-breakpoint:
 */
var NbRouteTabsetComponent = /** @class */ (function () {
    function NbRouteTabsetComponent() {
        this.fullWidthValue = false;
        /**
         * Options passed to `routerLinkActiveOptions` directive which set on tab links.
         * `{ exact: true }` by default.
         */
        this.activeLinkOptions = { exact: true };
        /**
         * Emits when tab is selected
         * @type {EventEmitter<any>}
         */
        this.changeTab = new EventEmitter();
    }
    Object.defineProperty(NbRouteTabsetComponent.prototype, "fullWidth", {
        /**
         * Take full width of a parent
         * @param {boolean} val
         */
        set: function (val) {
            this.fullWidthValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbRouteTabsetComponent.prototype.selectTab = function (tab) {
        this.changeTab.emit(tab);
    };
    __decorate([
        HostBinding('class.full-width'),
        __metadata("design:type", Boolean)
    ], NbRouteTabsetComponent.prototype, "fullWidthValue", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], NbRouteTabsetComponent.prototype, "tabs", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NbRouteTabsetComponent.prototype, "activeLinkOptions", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbRouteTabsetComponent.prototype, "fullWidth", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NbRouteTabsetComponent.prototype, "changeTab", void 0);
    NbRouteTabsetComponent = __decorate([
        Component({
            selector: 'nb-route-tabset',
            template: "\n    <ul class=\"route-tabset\">\n      <ng-container *ngFor=\"let tab of tabs\">\n        <li *ngIf=\"tab.disabled; else enabled\"\n            [class.responsive]=\"tab.responsive\"\n            class=\"route-tab disabled\"\n            tabindex=\"-1\">\n          <a tabindex=\"-1\" class=\"tab-link\">\n            <nb-icon *ngIf=\"tab.icon\" [icon]=\"tab.icon\"></nb-icon>\n            <span *ngIf=\"tab.title\" class=\"tab-text\">{{ tab.title }}</span>\n          </a>\n        </li>\n\n        <ng-template #enabled>\n          <li (click)=\"$event.preventDefault(); selectTab(tab)\"\n              [routerLink]=\"tab.route\"\n              routerLinkActive=\"active\"\n              [routerLinkActiveOptions]=\"activeLinkOptions\"\n              [class.responsive]=\"tab.responsive\"\n              tabindex=\"0\"\n              class=\"route-tab\">\n            <a tabindex=\"-1\" class=\"tab-link\">\n              <nb-icon *ngIf=\"tab.icon\" [icon]=\"tab.icon\"></nb-icon>\n              <span *ngIf=\"tab.title\" class=\"tab-text\">{{ tab.title }}</span>\n            </a>\n          </li>\n        </ng-template>\n      </ng-container>\n    </ul>\n    <router-outlet></router-outlet>\n  ",
            styles: [".route-tabset{display:flex;flex-direction:row;list-style-type:none;margin:0}.route-tabset .route-tab{margin-bottom:-1px;text-align:center;padding:0}.route-tabset .route-tab.active a::before{display:block}.route-tabset .route-tab a{position:relative;text-decoration:none;display:inline-block}.route-tabset .route-tab a::before{position:absolute;content:'';width:100%;border-radius:3px;bottom:-2px;left:0}.route-tabset .route-tab a nb-icon{vertical-align:middle}[dir=ltr] .route-tabset .route-tab a nb-icon+span{margin-left:.5rem}[dir=rtl] .route-tabset .route-tab a nb-icon+span{margin-right:.5rem}:host.full-width .route-tabset{justify-content:space-around}\n"]
        })
    ], NbRouteTabsetComponent);
    return NbRouteTabsetComponent;
}());
export { NbRouteTabsetComponent };
//# sourceMappingURL=route-tabset.component.js.map