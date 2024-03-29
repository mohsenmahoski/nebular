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
import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
/**
 * Alert component.
 *
 * Basic alert example:
 * @stacked-example(Showcase, alert/alert-showcase.component)
 *
 * Alert configuration:
 *
 * ```html
 * <nb-alert status="success">
 *   You have been successfully authenticated!
 * </nb-alert>
 * ```
 * ### Installation
 *
 * Import `NbButtonModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAlertModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Alert could additionally have a `close` button when `closable` property is set:
 * ```html
 * <nb-alert status="success" closable (close)="onClose()">
 *   You have been successfully authenticated!
 * </nb-alert>
 * ```
 *
 * Colored alerts could be simply configured by providing a `status` property:
 * @stacked-example(Colored Alert, alert/alert-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight alert highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Alert, alert/alert-accents.component)
 *
 * And `outline` property:
 * @stacked-example(Outline Alert, alert/alert-outline.component)
 *
 * @additional-example(Multiple Sizes, alert/alert-sizes.component)
 *
 * @styles
 *
 * alert-background-color:
 * alert-border-radius:
 * alert-bottom-margin:
 * alert-padding:
 * alert-scrollbar-color:
 * alert-scrollbar-background-color:
 * alert-scrollbar-width:
 * alert-shadow:
 * alert-text-color:
 * alert-text-font-family:
 * alert-text-font-size:
 * alert-text-font-weight:
 * alert-text-line-height:
 * alert-closable-start-padding:
 * alert-tiny-height:
 * alert-small-height:
 * alert-medium-height:
 * alert-medium-padding:
 * alert-large-height:
 * alert-giant-height:
 * alert-primary-background-color:
 * alert-primary-text-color:
 * alert-success-background-color:
 * alert-success-text-color:
 * alert-info-background-color:
 * alert-info-text-color:
 * alert-warning-background-color:
 * alert-warning-text-color:
 * alert-danger-background-color:
 * alert-danger-text-color:
 * alert-accent-primary-color:
 * alert-accent-info-color:
 * alert-accent-success-color:
 * alert-accent-warning-color:
 * alert-accent-danger-color:
 * alert-outline-width:
 * alert-outline-primary-color:
 * alert-outline-info-color:
 * alert-outline-success-color:
 * alert-outline-warning-color:
 * alert-outline-danger-color:
 */
var NbAlertComponent = /** @class */ (function () {
    function NbAlertComponent() {
        /**
         * Alert size, available sizes:
         * `tiny`, `small`, `medium`, `large`, `giant`
         * Unset by default.
         */
        this.size = '';
        /**
         * Alert status (adds specific styles):
         * `primary`, `success`, `info`, `warning`, `danger`.
         * Unset by default.
         */
        this.status = '';
        /**
         * Alert accent (color of the top border):
         * `primary`, `success`, `info`, `warning`, `danger`.
         * Unset by default.
         */
        this.accent = '';
        /**
         * Alert outline (color of the border):
         * `primary`, `success`, `info`, `warning`, `danger`.
         * Unset by default.
         */
        this.outline = '';
        this._closable = false;
        /**
         * Emits when chip is removed
         * @type EventEmitter<any>
         */
        this.close = new EventEmitter();
    }
    Object.defineProperty(NbAlertComponent.prototype, "closable", {
        /**
         * Shows `close` icon
         */
        get: function () {
            return this._closable;
        },
        set: function (value) {
            this._closable = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Emits the removed chip event
     */
    NbAlertComponent.prototype.onClose = function () {
        this.close.emit();
    };
    Object.defineProperty(NbAlertComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "primaryAccent", {
        get: function () {
            return this.accent === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "successAccent", {
        get: function () {
            return this.accent === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "infoAccent", {
        get: function () {
            return this.accent === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "warningAccent", {
        get: function () {
            return this.accent === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "dangerAccent", {
        get: function () {
            return this.accent === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "primaryOutline", {
        get: function () {
            return this.outline === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "successOutline", {
        get: function () {
            return this.outline === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "infoOutline", {
        get: function () {
            return this.outline === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "warningOutline", {
        get: function () {
            return this.outline === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAlertComponent.prototype, "dangerOutline", {
        get: function () {
            return this.outline === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbAlertComponent.prototype, "size", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbAlertComponent.prototype, "status", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbAlertComponent.prototype, "accent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbAlertComponent.prototype, "outline", void 0);
    __decorate([
        Input(),
        HostBinding('class.closable'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbAlertComponent.prototype, "closable", null);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], NbAlertComponent.prototype, "close", void 0);
    __decorate([
        HostBinding('class.size-tiny'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "tiny", null);
    __decorate([
        HostBinding('class.size-small'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "small", null);
    __decorate([
        HostBinding('class.size-medium'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "medium", null);
    __decorate([
        HostBinding('class.size-large'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "large", null);
    __decorate([
        HostBinding('class.size-giant'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "giant", null);
    __decorate([
        HostBinding('class.status-primary'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "primary", null);
    __decorate([
        HostBinding('class.status-success'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "success", null);
    __decorate([
        HostBinding('class.status-info'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "info", null);
    __decorate([
        HostBinding('class.status-warning'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "warning", null);
    __decorate([
        HostBinding('class.status-danger'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "danger", null);
    __decorate([
        HostBinding('class.accent-primary'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "primaryAccent", null);
    __decorate([
        HostBinding('class.accent-success'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "successAccent", null);
    __decorate([
        HostBinding('class.accent-info'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "infoAccent", null);
    __decorate([
        HostBinding('class.accent-warning'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "warningAccent", null);
    __decorate([
        HostBinding('class.accent-danger'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "dangerAccent", null);
    __decorate([
        HostBinding('class.outline-primary'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "primaryOutline", null);
    __decorate([
        HostBinding('class.outline-success'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "successOutline", null);
    __decorate([
        HostBinding('class.outline-info'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "infoOutline", null);
    __decorate([
        HostBinding('class.outline-warning'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "warningOutline", null);
    __decorate([
        HostBinding('class.outline-danger'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbAlertComponent.prototype, "dangerOutline", null);
    NbAlertComponent = __decorate([
        Component({
            selector: 'nb-alert',
            template: "\n    <button *ngIf=\"closable\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"onClose()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <ng-content></ng-content>\n  ",
            styles: [":host{display:flex;flex-direction:column;position:relative}[dir=ltr] :host .close{right:0}[dir=rtl] :host .close{left:0}.close{position:absolute;top:0;color:inherit;background-color:transparent;border:0;appearance:none}\n"]
        })
    ], NbAlertComponent);
    return NbAlertComponent;
}());
export { NbAlertComponent };
//# sourceMappingURL=alert.component.js.map