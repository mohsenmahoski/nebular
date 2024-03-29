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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, HostListener, Input, Renderer2, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
/**
 * Basic button component.
 *
 * Default button size is `medium` and status color is `primary`:
 * @stacked-example(Button Showcase, button/button-showcase.component)
 *
 * ```html
 * <button nbButton></button>
 * ```
 * ### Installation
 *
 * Import `NbButtonModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbButtonModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Buttons are available in multiple colors using `status` property:
 * @stacked-example(Button Colors, button/button-colors.component.html)
 *
 * There are three button sizes:
 *
 * @stacked-example(Button Sizes, button/button-sizes.component.html)
 *
 * And two additional style types - `outline`:
 *
 * @stacked-example(Outline Buttons, button/button-outline.component.html)
 *
 * and `hero`:
 *
 * @stacked-example(Button Colors, button/button-hero.component.html)
 *
 * Buttons available in different shapes, which could be combined with the other properties:
 * @stacked-example(Button Shapes, button/button-shapes.component)
 *
 * `nbButton` could be applied to the following selectors - `button`, `input[type="button"]`, `input[type="submit"]`
 * and `a`:
 * @stacked-example(Button Elements, button/button-types.component.html)
 *
 * Button can be made `fullWidth`:
 * @stacked-example(Full Width Button, button/button-full-width.component.html)
 *
 * Icon can be placed inside of a button as a child element:
 * @stacked-example(Icon Button, button/button-icon.component.html)
 *
 * @additional-example(Interactive example, button/button-interactive.component)
 *
 * @styles
 *
 * button-cursor:
 * button-outline-width:
 * button-outline-color:
 * button-text-font-family:
 * button-text-font-weight:
 * button-disabled-cursor:
 * button-tiny-text-font-size:
 * button-tiny-text-line-height:
 * button-small-text-font-size:
 * button-small-text-line-height:
 * button-medium-text-font-size:
 * button-medium-text-line-height:
 * button-large-text-font-size:
 * button-large-text-line-height:
 * button-giant-text-font-size:
 * button-giant-text-line-height:
 * button-rectangle-border-radius:
 * button-semi-round-border-radius:
 * button-round-border-radius:
 * button-filled-border-style:
 * button-filled-border-width:
 * button-filled-text-transform:
 * button-filled-tiny-padding:
 * button-filled-small-padding:
 * button-filled-medium-padding:
 * button-filled-large-padding:
 * button-filled-giant-padding:
 * button-filled-primary-background-color:
 * button-filled-primary-border-color:
 * button-filled-primary-text-color:
 * button-filled-primary-focus-border-color:
 * button-filled-primary-hover-background-color:
 * button-filled-primary-hover-border-color:
 * button-filled-primary-active-background-color:
 * button-filled-primary-active-border-color:
 * button-filled-primary-disabled-background-color:
 * button-filled-primary-disabled-border-color:
 * button-filled-primary-disabled-text-color:
 * button-filled-success-background-color:
 * button-filled-success-border-color:
 * button-filled-success-text-color:
 * button-filled-success-focus-border-color:
 * button-filled-success-hover-background-color:
 * button-filled-success-hover-border-color:
 * button-filled-success-active-background-color:
 * button-filled-success-active-border-color:
 * button-filled-success-disabled-background-color:
 * button-filled-success-disabled-border-color:
 * button-filled-success-disabled-text-color:
 * button-filled-info-background-color:
 * button-filled-info-border-color:
 * button-filled-info-text-color:
 * button-filled-info-focus-border-color:
 * button-filled-info-hover-background-color:
 * button-filled-info-hover-border-color:
 * button-filled-info-active-background-color:
 * button-filled-info-active-border-color:
 * button-filled-info-disabled-background-color:
 * button-filled-info-disabled-border-color:
 * button-filled-info-disabled-text-color:
 * button-filled-warning-background-color:
 * button-filled-warning-border-color:
 * button-filled-warning-text-color:
 * button-filled-warning-focus-border-color:
 * button-filled-warning-hover-background-color:
 * button-filled-warning-hover-border-color:
 * button-filled-warning-active-background-color:
 * button-filled-warning-active-border-color:
 * button-filled-warning-disabled-background-color:
 * button-filled-warning-disabled-border-color:
 * button-filled-warning-disabled-text-color:
 * button-filled-danger-background-color:
 * button-filled-danger-border-color:
 * button-filled-danger-text-color:
 * button-filled-danger-focus-border-color:
 * button-filled-danger-hover-background-color:
 * button-filled-danger-hover-border-color:
 * button-filled-danger-active-background-color:
 * button-filled-danger-active-border-color:
 * button-filled-danger-disabled-background-color:
 * button-filled-danger-disabled-border-color:
 * button-filled-danger-disabled-text-color:
 * button-outline-border-style:
 * button-outline-border-width:
 * button-outline-background-color:
 * button-outline-text-transform:
 * button-outline-tiny-padding:
 * button-outline-small-padding:
 * button-outline-medium-padding:
 * button-outline-large-padding:
 * button-outline-giant-padding:
 * button-outline-primary-border-color:
 * button-outline-primary-text-color:
 * button-outline-primary-focus-border-color:
 * button-outline-primary-focus-text-color:
 * button-outline-primary-hover-border-color:
 * button-outline-primary-hover-text-color:
 * button-outline-primary-active-border-color:
 * button-outline-primary-active-text-color:
 * button-outline-primary-disabled-border-color:
 * button-outline-primary-disabled-text-color:
 * button-outline-success-border-color:
 * button-outline-success-text-color:
 * button-outline-success-focus-border-color:
 * button-outline-success-focus-text-color:
 * button-outline-success-hover-border-color:
 * button-outline-success-hover-text-color:
 * button-outline-success-active-border-color:
 * button-outline-success-active-text-color:
 * button-outline-success-disabled-border-color:
 * button-outline-success-disabled-text-color:
 * button-outline-info-border-color:
 * button-outline-info-text-color:
 * button-outline-info-focus-border-color:
 * button-outline-info-focus-text-color:
 * button-outline-info-hover-border-color:
 * button-outline-info-hover-text-color:
 * button-outline-info-active-border-color:
 * button-outline-info-active-text-color:
 * button-outline-info-disabled-border-color:
 * button-outline-info-disabled-text-color:
 * button-outline-warning-border-color:
 * button-outline-warning-text-color:
 * button-outline-warning-focus-border-color:
 * button-outline-warning-focus-text-color:
 * button-outline-warning-hover-border-color:
 * button-outline-warning-hover-text-color:
 * button-outline-warning-active-border-color:
 * button-outline-warning-active-text-color:
 * button-outline-warning-disabled-border-color:
 * button-outline-warning-disabled-text-color:
 * button-outline-danger-border-color:
 * button-outline-danger-text-color:
 * button-outline-danger-focus-border-color:
 * button-outline-danger-focus-text-color:
 * button-outline-danger-hover-border-color:
 * button-outline-danger-hover-text-color:
 * button-outline-danger-active-border-color:
 * button-outline-danger-active-text-color:
 * button-outline-danger-disabled-border-color:
 * button-outline-danger-disabled-text-color:
 * button-ghost-background-color:
 * button-ghost-border-color:
 * button-ghost-border-style:
 * button-ghost-border-width:
 * button-ghost-text-transform:
 * button-ghost-tiny-padding:
 * button-ghost-small-padding:
 * button-ghost-medium-padding:
 * button-ghost-large-padding:
 * button-ghost-giant-padding:
 * button-ghost-primary-text-color:
 * button-ghost-primary-focus-text-color:
 * button-ghost-primary-hover-color:
 * button-ghost-primary-active-text-color:
 * button-ghost-primary-disabled-text-color:
 * button-ghost-success-text-color:
 * button-ghost-success-focus-text-color:
 * button-ghost-success-hover-color:
 * button-ghost-success-active-text-color:
 * button-ghost-success-disabled-text-color:
 * button-ghost-info-text-color:
 * button-ghost-info-focus-text-color:
 * button-ghost-info-hover-color:
 * button-ghost-info-active-text-color:
 * button-ghost-info-disabled-text-color:
 * button-ghost-warning-text-color:
 * button-ghost-warning-focus-text-color:
 * button-ghost-warning-hover-color:
 * button-ghost-warning-active-text-color:
 * button-ghost-warning-disabled-text-color:
 * button-ghost-danger-text-color:
 * button-ghost-danger-focus-text-color:
 * button-ghost-danger-hover-color:
 * button-ghost-danger-active-text-color:
 * button-ghost-danger-disabled-text-color:
 * button-hero-border-color:
 * button-hero-border-style:
 * button-hero-border-width:
 * button-hero-text-transform:
 * button-hero-tiny-padding:
 * button-hero-small-padding:
 * button-hero-medium-padding:
 * button-hero-large-padding:
 * button-hero-giant-padding:
 * button-hero-shadow:
 * button-hero-text-shadow:
 * button-hero-bevel-size:
 * button-hero-glow-size:
 * button-hero-outline-color:
 * button-hero-outline-width:
 * button-hero-primary-text-color:
 * button-hero-primary-bevel-color:
 * button-hero-primary-glow-color:
 * button-hero-primary-left-background-color:
 * button-hero-primary-right-background-color:
 * button-hero-primary-focus-left-background-color:
 * button-hero-primary-focus-right-background-color:
 * button-hero-primary-hover-left-background-color:
 * button-hero-primary-hover-right-background-color:
 * button-hero-primary-active-left-background-color:
 * button-hero-primary-active-right-background-color:
 * button-hero-primary-disabled-background-color:
 * button-hero-primary-disabled-text-color:
 * button-hero-success-text-color:
 * button-hero-success-bevel-color:
 * button-hero-success-glow-color:
 * button-hero-success-left-background-color:
 * button-hero-success-right-background-color:
 * button-hero-success-focus-left-background-color:
 * button-hero-success-focus-right-background-color:
 * button-hero-success-hover-left-background-color:
 * button-hero-success-hover-right-background-color:
 * button-hero-success-active-left-background-color:
 * button-hero-success-active-right-background-color:
 * button-hero-success-disabled-background-color:
 * button-hero-success-disabled-text-color:
 * button-hero-info-text-color:
 * button-hero-info-bevel-color:
 * button-hero-info-glow-color:
 * button-hero-info-left-background-color:
 * button-hero-info-right-background-color:
 * button-hero-info-focus-left-background-color:
 * button-hero-info-focus-right-background-color:
 * button-hero-info-hover-left-background-color:
 * button-hero-info-hover-right-background-color:
 * button-hero-info-active-left-background-color:
 * button-hero-info-active-right-background-color:
 * button-hero-info-disabled-background-color:
 * button-hero-info-disabled-text-color:
 * button-hero-warning-text-color:
 * button-hero-warning-bevel-color:
 * button-hero-warning-glow-color:
 * button-hero-warning-left-background-color:
 * button-hero-warning-right-background-color:
 * button-hero-warning-focus-left-background-color:
 * button-hero-warning-focus-right-background-color:
 * button-hero-warning-hover-left-background-color:
 * button-hero-warning-hover-right-background-color:
 * button-hero-warning-active-left-background-color:
 * button-hero-warning-active-right-background-color:
 * button-hero-warning-disabled-background-color:
 * button-hero-warning-disabled-text-color:
 * button-hero-danger-text-color:
 * button-hero-danger-bevel-color:
 * button-hero-danger-glow-color:
 * button-hero-danger-left-background-color:
 * button-hero-danger-right-background-color:
 * button-hero-danger-focus-left-background-color:
 * button-hero-danger-focus-right-background-color:
 * button-hero-danger-hover-left-background-color:
 * button-hero-danger-hover-right-background-color:
 * button-hero-danger-active-left-background-color:
 * button-hero-danger-active-right-background-color:
 * button-hero-danger-disabled-background-color:
 * button-hero-danger-disabled-text-color:
 */
var NbButtonComponent = /** @class */ (function () {
    function NbButtonComponent(renderer, hostElement, cd) {
        this.renderer = renderer;
        this.hostElement = hostElement;
        this.cd = cd;
        this.isInitialized = false;
        /**
         * Button size, available sizes:
         * `tiny`, `small`, `medium`, `large`, `giant`
         */
        this.size = 'medium';
        /**
         * Button status (adds specific styles):
         * `primary`, `info`, `success`, `warning`, `danger`
         */
        this.status = 'primary';
        /**
         * Button shapes: `rectangle`, `round`, `semi-round`
         */
        this.shape = 'rectangle';
        /**
         * Button appearance: `filled`, `outline`, `ghost`, `hero`
         */
        this.appearance = 'filled';
        this._fullWidth = false;
        this._disabled = false;
    }
    Object.defineProperty(NbButtonComponent.prototype, "filled", {
        /**
         * Sets `filled` appearance
         */
        get: function () {
            return this.appearance === 'filled';
        },
        set: function (value) {
            if (convertToBoolProperty(value)) {
                this.appearance = 'filled';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "outline", {
        /**
         * Sets `outline` appearance
         */
        get: function () {
            return this.appearance === 'outline';
        },
        set: function (value) {
            if (convertToBoolProperty(value)) {
                this.appearance = 'outline';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "ghost", {
        /**
         * Sets `ghost` appearance
         */
        get: function () {
            return this.appearance === 'ghost';
        },
        set: function (value) {
            if (convertToBoolProperty(value)) {
                this.appearance = 'ghost';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "hero", {
        /**
         * Sets `hero` appearance
         */
        get: function () {
            return this.appearance === 'hero';
        },
        set: function (value) {
            if (convertToBoolProperty(value)) {
                this.appearance = 'hero';
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "fullWidth", {
        /**
         * If set element will fill its container
         */
        get: function () {
            return this._fullWidth;
        },
        set: function (value) {
            this._fullWidth = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "disabled", {
        /**
         * Disables the button
         */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
            this.renderer.setProperty(this.hostElement.nativeElement, 'disabled', this.disabled);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "tabbable", {
        // issue #794
        get: function () {
            return this.disabled ? '-1' : '0';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "rectangle", {
        get: function () {
            return this.shape === 'rectangle';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "round", {
        get: function () {
            return this.shape === 'round';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "semiRound", {
        get: function () {
            return this.shape === 'semi-round';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "iconLeft", {
        get: function () {
            var el = this.hostElement.nativeElement;
            var icon = this.iconElement;
            return !!(icon && el.firstChild === icon);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "iconRight", {
        get: function () {
            var el = this.hostElement.nativeElement;
            var icon = this.iconElement;
            return !!(icon && el.lastChild === icon);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbButtonComponent.prototype, "transitions", {
        get: function () {
            return this.isInitialized;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * Keep this handler to partially support anchor disabling.
     * Unlike button, anchor doesn't have 'disabled' DOM property,
     * so handler will be called anyway. We preventing navigation and bubbling.
     * Disabling is partial due to click handlers precedence. Consider example:
     * <a nbButton [disabled]="true" (click)="clickHandler()">...</a>
     * 'clickHandler' will be called before our host listener below. We can't prevent
     * such handlers call.
     */
    NbButtonComponent.prototype.onClick = function (event) {
        if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
    };
    NbButtonComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.isInitialized = true;
            _this.cd.markForCheck();
        });
    };
    Object.defineProperty(NbButtonComponent.prototype, "iconElement", {
        get: function () {
            var el = this.hostElement.nativeElement;
            return el.querySelector('nb-icon');
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbButtonComponent.prototype, "size", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbButtonComponent.prototype, "status", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbButtonComponent.prototype, "shape", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbButtonComponent.prototype, "appearance", void 0);
    __decorate([
        Input(),
        HostBinding('class.appearance-filled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "filled", null);
    __decorate([
        Input(),
        HostBinding('class.appearance-outline'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "outline", null);
    __decorate([
        Input(),
        HostBinding('class.appearance-ghost'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "ghost", null);
    __decorate([
        Input(),
        HostBinding('class.appearance-hero'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "hero", null);
    __decorate([
        Input(),
        HostBinding('class.full-width'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "fullWidth", null);
    __decorate([
        Input(),
        HostBinding('attr.aria-disabled'),
        HostBinding('class.btn-disabled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "disabled", null);
    __decorate([
        HostBinding('attr.tabindex'),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "tabbable", null);
    __decorate([
        HostBinding('class.size-tiny'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "tiny", null);
    __decorate([
        HostBinding('class.size-small'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "small", null);
    __decorate([
        HostBinding('class.size-medium'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "medium", null);
    __decorate([
        HostBinding('class.size-large'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "large", null);
    __decorate([
        HostBinding('class.size-giant'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "giant", null);
    __decorate([
        HostBinding('class.status-primary'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "primary", null);
    __decorate([
        HostBinding('class.status-info'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "info", null);
    __decorate([
        HostBinding('class.status-success'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "success", null);
    __decorate([
        HostBinding('class.status-warning'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "warning", null);
    __decorate([
        HostBinding('class.status-danger'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "danger", null);
    __decorate([
        HostBinding('class.shape-rectangle'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "rectangle", null);
    __decorate([
        HostBinding('class.shape-round'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "round", null);
    __decorate([
        HostBinding('class.shape-semi-round'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "semiRound", null);
    __decorate([
        HostBinding('class.icon-start'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "iconLeft", null);
    __decorate([
        HostBinding('class.icon-end'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "iconRight", null);
    __decorate([
        HostBinding('class.transitions'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbButtonComponent.prototype, "transitions", null);
    __decorate([
        HostListener('click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Event]),
        __metadata("design:returntype", void 0)
    ], NbButtonComponent.prototype, "onClick", null);
    NbButtonComponent = __decorate([
        Component({
            selector: 'button[nbButton],a[nbButton],input[type="button"][nbButton],input[type="submit"][nbButton]',
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{appearance:none;text-align:center;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;vertical-align:middle;user-select:none}:host:hover,:host:focus{text-decoration:none}:host.full-width{width:100%}:host ::ng-deep nb-icon{vertical-align:top}[dir=ltr] :host.icon-start:not(.icon-end) ::ng-deep nb-icon{margin-right:.75rem}[dir=rtl] :host.icon-start:not(.icon-end) ::ng-deep nb-icon{margin-left:.75rem}[dir=ltr] :host.icon-end:not(.icon-start) ::ng-deep nb-icon{margin-left:.75rem}[dir=rtl] :host.icon-end:not(.icon-start) ::ng-deep nb-icon{margin-right:.75rem}:host(.transitions){transition-duration:0.15s;transition-property:background-color,border-color,box-shadow,color;transition-timing-function:ease-in}\n"]
        }),
        __metadata("design:paramtypes", [Renderer2,
            ElementRef,
            ChangeDetectorRef])
    ], NbButtonComponent);
    return NbButtonComponent;
}());
export { NbButtonComponent };
//# sourceMappingURL=button.component.js.map