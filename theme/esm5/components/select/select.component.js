/*
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, Inject, Input, Output, QueryList, ViewChild, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { merge } from 'rxjs';
import { startWith, switchMap, takeWhile, filter } from 'rxjs/operators';
import { NbAdjustment, NbPosition, NbPositionBuilderService, } from '../cdk/overlay/overlay-position';
import { NbPortalDirective } from '../cdk/overlay/mapping';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTrigger, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbFocusKeyManager } from '../cdk/a11y/focus-key-manager';
import { ESCAPE } from '../cdk/keycodes/keycodes';
import { NB_DOCUMENT } from '../../theme.options';
import { NbOptionComponent } from './option.component';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from './select-injection-tokens';
var NbSelectLabelComponent = /** @class */ (function () {
    function NbSelectLabelComponent() {
    }
    NbSelectLabelComponent = __decorate([
        Component({
            selector: 'nb-select-label',
            template: '<ng-content></ng-content>'
        })
    ], NbSelectLabelComponent);
    return NbSelectLabelComponent;
}());
export { NbSelectLabelComponent };
/**
 * The `NbSelectComponent` provides a capability to select one of the passed items.
 *
 * @stacked-example(Showcase, select/select-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSelectModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSelectModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use it as the multi-select control you have to mark it as `multiple`.
 * In this case, `nb-select` will work only with arrays - accept arrays and propagate arrays.
 *
 * @stacked-example(Multiple, select/select-multiple.component)
 *
 * Items without values will clean the selection. Both `null` and `undefined` values will also clean the selection.
 *
 * @stacked-example(Clean selection, select/select-clean.component)
 *
 * Select may be bounded using `selected` input:
 *
 * ```html
 * <nb-select [(selected)]="selected"></nb-selected>
 * ```
 *
 * Or you can bind control with form controls or ngModel:
 *
 * @stacked-example(Select form binding, select/select-form.component)
 *
 * Options in the select may be grouped using `nb-option-group` component.
 *
 * @stacked-example(Grouping, select/select-groups.component)
 *
 * Select may have a placeholder that will be shown when nothing selected:
 *
 * @stacked-example(Placeholder, select/select-placeholder.component)
 *
 * You can disable select, options and whole groups.
 *
 * @stacked-example(Disabled select, select/select-disabled.component)
 *
 * Also, the custom label may be provided in select.
 * This custom label will be used for instead placeholder when something selected.
 *
 * @stacked-example(Custom label, select/select-label.component)
 *
 * Default `nb-select` size is `medium` and status color is `primary`.
 * Select is available in multiple colors using `status` property:
 *
 * @stacked-example(Select statuses, select/select-status.component)
 *
 * There are five select sizes:
 *
 * @stacked-example(Select sizes, select/select-sizes.component)
 *
 * And two additional style types - `filled`:
 *
 * @stacked-example(Filled select, select/select-filled.component)
 *
 * and `hero`:
 *
 * @stacked-example(Select colors, select/select-hero.component)
 *
 * Select is available in different shapes, that could be combined with the other properties:
 *
 * @stacked-example(Select shapes, select/select-shapes.component)
 *
 * @additional-example(Interactive, select/select-interactive.component)
 *
 * @styles
 *
 * select-cursor:
 * select-disabled-cursor:
 * select-min-width:
 * select-options-list-max-height:
 * select-options-list-shadow:
 * select-options-list-border-color:
 * select-options-list-border-style:
 * select-options-list-border-width:
 * select-outline-width:
 * select-outline-color:
 * select-text-font-family:
 * select-text-font-weight:
 * select-placeholder-text-font-weight:
 * select-option-background-color:
 * select-option-text-color:
 * select-option-selected-background-color:
 * select-option-selected-text-color:
 * select-option-focus-background-color:
 * select-option-focus-text-color:
 * select-option-hover-background-color:
 * select-option-hover-text-color:
 * select-option-disabled-background-color:
 * select-option-disabled-text-color:
 * select-tiny-text-font-size:
 * select-tiny-text-line-height:
 * select-tiny-max-width:
 * select-small-text-font-size:
 * select-small-text-line-height:
 * select-small-max-width:
 * select-medium-text-font-size:
 * select-medium-text-line-height:
 * select-medium-max-width:
 * select-large-text-font-size:
 * select-large-text-line-height:
 * select-large-max-width:
 * select-giant-text-font-size:
 * select-giant-text-line-height:
 * select-giant-max-width:
 * select-rectangle-border-radius:
 * select-semi-round-border-radius:
 * select-round-border-radius:
 * select-outline-background-color:
 * select-outline-border-color:
 * select-outline-border-style:
 * select-outline-border-width:
 * select-outline-icon-color:
 * select-outline-text-color:
 * select-outline-placeholder-text-color:
 * select-outline-focus-border-color:
 * select-outline-hover-border-color:
 * select-outline-disabled-background-color:
 * select-outline-disabled-border-color:
 * select-outline-disabled-icon-color:
 * select-outline-disabled-text-color:
 * select-outline-tiny-padding:
 * select-outline-small-padding:
 * select-outline-medium-padding:
 * select-outline-large-padding:
 * select-outline-giant-padding:
 * select-outline-primary-border-color:
 * select-outline-primary-focus-border-color:
 * select-outline-primary-hover-border-color:
 * select-outline-primary-disabled-border-color:
 * select-outline-success-border-color:
 * select-outline-success-focus-border-color:
 * select-outline-success-hover-border-color:
 * select-outline-success-disabled-border-color:
 * select-outline-info-border-color:
 * select-outline-info-focus-border-color:
 * select-outline-info-hover-border-color:
 * select-outline-info-disabled-border-color:
 * select-outline-warning-border-color:
 * select-outline-warning-focus-border-color:
 * select-outline-warning-hover-border-color:
 * select-outline-warning-disabled-border-color:
 * select-outline-danger-border-color:
 * select-outline-danger-focus-border-color:
 * select-outline-danger-hover-border-color:
 * select-outline-danger-disabled-border-color:
 * select-option-outline-tiny-padding:
 * select-option-outline-small-padding:
 * select-option-outline-medium-padding:
 * select-option-outline-large-padding:
 * select-option-outline-giant-padding:
 * select-outline-adjacent-border-color:
 * select-outline-adjacent-border-style:
 * select-outline-adjacent-border-width:
 * select-outline-primary-adjacent-border-color:
 * select-outline-success-adjacent-border-color:
 * select-outline-info-adjacent-border-color:
 * select-outline-warning-adjacent-border-color:
 * select-outline-danger-adjacent-border-color:
 * select-group-option-outline-tiny-start-padding:
 * select-group-option-outline-small-start-padding:
 * select-group-option-outline-medium-start-padding:
 * select-group-option-outline-large-start-padding:
 * select-group-option-outline-giant-start-padding:
 * select-options-list-outline-border-color:
 * select-options-list-outline-primary-border-color:
 * select-options-list-outline-success-border-color:
 * select-options-list-outline-info-border-color:
 * select-options-list-outline-warning-border-color:
 * select-options-list-outline-danger-border-color:
 * select-filled-background-color:
 * select-filled-border-color:
 * select-filled-border-style:
 * select-filled-border-width:
 * select-filled-icon-color:
 * select-filled-text-color:
 * select-filled-placeholder-text-color:
 * select-filled-focus-border-color:
 * select-filled-hover-border-color:
 * select-filled-disabled-background-color:
 * select-filled-disabled-border-color:
 * select-filled-disabled-icon-color:
 * select-filled-disabled-text-color:
 * select-filled-tiny-padding:
 * select-filled-small-padding:
 * select-filled-medium-padding:
 * select-filled-large-padding:
 * select-filled-giant-padding:
 * select-filled-primary-background-color:
 * select-filled-primary-border-color:
 * select-filled-primary-icon-color:
 * select-filled-primary-text-color:
 * select-filled-primary-placeholder-text-color:
 * select-filled-primary-focus-background-color:
 * select-filled-primary-focus-border-color:
 * select-filled-primary-hover-background-color:
 * select-filled-primary-hover-border-color:
 * select-filled-primary-disabled-background-color:
 * select-filled-primary-disabled-border-color:
 * select-filled-primary-disabled-icon-color:
 * select-filled-primary-disabled-text-color:
 * select-filled-success-background-color:
 * select-filled-success-border-color:
 * select-filled-success-icon-color:
 * select-filled-success-text-color:
 * select-filled-success-placeholder-text-color:
 * select-filled-success-focus-background-color:
 * select-filled-success-focus-border-color:
 * select-filled-success-hover-background-color:
 * select-filled-success-hover-border-color:
 * select-filled-success-disabled-background-color:
 * select-filled-success-disabled-border-color:
 * select-filled-success-disabled-icon-color:
 * select-filled-success-disabled-text-color:
 * select-filled-info-background-color:
 * select-filled-info-border-color:
 * select-filled-info-icon-color:
 * select-filled-info-text-color:
 * select-filled-info-placeholder-text-color:
 * select-filled-info-focus-background-color:
 * select-filled-info-focus-border-color:
 * select-filled-info-hover-background-color:
 * select-filled-info-hover-border-color:
 * select-filled-info-disabled-background-color:
 * select-filled-info-disabled-border-color:
 * select-filled-info-disabled-icon-color:
 * select-filled-info-disabled-text-color:
 * select-filled-warning-background-color:
 * select-filled-warning-border-color:
 * select-filled-warning-icon-color:
 * select-filled-warning-text-color:
 * select-filled-warning-placeholder-text-color:
 * select-filled-warning-focus-background-color:
 * select-filled-warning-focus-border-color:
 * select-filled-warning-hover-background-color:
 * select-filled-warning-hover-border-color:
 * select-filled-warning-disabled-background-color:
 * select-filled-warning-disabled-border-color:
 * select-filled-warning-disabled-icon-color:
 * select-filled-warning-disabled-text-color:
 * select-filled-danger-background-color:
 * select-filled-danger-border-color:
 * select-filled-danger-icon-color:
 * select-filled-danger-text-color:
 * select-filled-danger-placeholder-text-color:
 * select-filled-danger-focus-background-color:
 * select-filled-danger-focus-border-color:
 * select-filled-danger-hover-background-color:
 * select-filled-danger-hover-border-color:
 * select-filled-danger-disabled-background-color:
 * select-filled-danger-disabled-border-color:
 * select-filled-danger-disabled-icon-color:
 * select-filled-danger-disabled-text-color:
 * select-option-filled-tiny-padding:
 * select-group-option-filled-tiny-padding-start:
 * select-option-filled-small-padding:
 * select-group-option-filled-small-padding-start:
 * select-option-filled-medium-padding:
 * select-group-option-filled-medium-padding-start:
 * select-option-filled-large-padding:
 * select-group-option-filled-large-padding-start:
 * select-option-filled-giant-padding:
 * select-group-option-filled-giant-padding-start:
 * select-options-list-filled-border-color:
 * select-options-list-filled-primary-border-color:
 * select-options-list-filled-success-border-color:
 * select-options-list-filled-info-border-color:
 * select-options-list-filled-warning-border-color:
 * select-options-list-filled-danger-border-color:
 * select-hero-background-color:
 * select-hero-border-color:
 * select-hero-border-style:
 * select-hero-border-width:
 * select-hero-icon-color:
 * select-hero-text-color:
 * select-hero-placeholder-text-color:
 * select-hero-focus-border-color:
 * select-hero-hover-border-color:
 * select-hero-disabled-background-color:
 * select-hero-disabled-icon-color:
 * select-hero-disabled-text-color:
 * select-hero-tiny-padding:
 * select-hero-small-padding:
 * select-hero-medium-padding:
 * select-hero-large-padding:
 * select-hero-giant-padding:
 * select-hero-primary-left-background-color:
 * select-hero-primary-right-background-color:
 * select-hero-primary-icon-color:
 * select-hero-primary-text-color:
 * select-hero-primary-placeholder-text-color:
 * select-hero-primary-focus-left-background-color:
 * select-hero-primary-focus-right-background-color:
 * select-hero-primary-hover-left-background-color:
 * select-hero-primary-hover-right-background-color:
 * select-hero-primary-disabled-background-color:
 * select-hero-primary-disabled-icon-color:
 * select-hero-primary-disabled-text-color:
 * select-hero-success-left-background-color:
 * select-hero-success-right-background-color:
 * select-hero-success-icon-color:
 * select-hero-success-text-color:
 * select-hero-success-placeholder-text-color:
 * select-hero-success-focus-left-background-color:
 * select-hero-success-focus-right-background-color:
 * select-hero-success-hover-left-background-color:
 * select-hero-success-hover-right-background-color:
 * select-hero-success-disabled-background-color:
 * select-hero-success-disabled-icon-color:
 * select-hero-success-disabled-text-color:
 * select-hero-info-left-background-color:
 * select-hero-info-right-background-color:
 * select-hero-info-icon-color:
 * select-hero-info-text-color:
 * select-hero-info-placeholder-text-color:
 * select-hero-info-focus-left-background-color:
 * select-hero-info-focus-right-background-color:
 * select-hero-info-hover-left-background-color:
 * select-hero-info-hover-right-background-color:
 * select-hero-info-disabled-background-color:
 * select-hero-info-disabled-icon-color:
 * select-hero-info-disabled-text-color:
 * select-hero-warning-left-background-color:
 * select-hero-warning-right-background-color:
 * select-hero-warning-icon-color:
 * select-hero-warning-text-color:
 * select-hero-warning-placeholder-text-color:
 * select-hero-warning-focus-left-background-color:
 * select-hero-warning-focus-right-background-color:
 * select-hero-warning-hover-left-background-color:
 * select-hero-warning-hover-right-background-color:
 * select-hero-warning-disabled-background-color:
 * select-hero-warning-disabled-icon-color:
 * select-hero-warning-disabled-text-color:
 * select-hero-danger-left-background-color:
 * select-hero-danger-right-background-color:
 * select-hero-danger-icon-color:
 * select-hero-danger-text-color:
 * select-hero-danger-placeholder-text-color:
 * select-hero-danger-focus-left-background-color:
 * select-hero-danger-focus-right-background-color:
 * select-hero-danger-hover-left-background-color:
 * select-hero-danger-hover-right-background-color:
 * select-hero-danger-disabled-background-color:
 * select-hero-danger-disabled-icon-color:
 * select-hero-danger-disabled-text-color:
 * select-option-hero-tiny-padding:
 * select-group-option-hero-tiny-padding-start:
 * select-option-hero-small-padding:
 * select-group-option-hero-small-padding-start:
 * select-option-hero-medium-padding:
 * select-group-option-hero-medium-padding-start:
 * select-option-hero-large-padding:
 * select-group-option-hero-large-padding-start:
 * select-option-hero-giant-padding:
 * select-group-option-hero-giant-padding-start:
 * select-options-list-hero-border-color:
 * select-options-list-hero-primary-border-color:
 * select-options-list-hero-success-border-color:
 * select-options-list-hero-info-border-color:
 * select-options-list-hero-warning-border-color:
 * select-options-list-hero-danger-border-color:
 * */
var NbSelectComponent = /** @class */ (function () {
    function NbSelectComponent(document, overlay, hostRef, positionBuilder, triggerStrategyBuilder, cd) {
        this.document = document;
        this.overlay = overlay;
        this.hostRef = hostRef;
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.cd = cd;
        /**
         * Select size, available sizes:
         * `tiny`, `small`, `medium` (default), `large`, `giant`
         */
        this.size = 'medium';
        /**
         * Select status (adds specific styles):
         * `primary`, `info`, `success`, `warning`, `danger`
         */
        this.status = '';
        /**
         * Select shapes: `rectangle` (default), `round`, `semi-round`
         */
        this.shape = 'rectangle';
        /**
         * Select appearances: `outline` (default), `filled`, `hero`
         */
        this.appearance = 'outline';
        this._fullWidth = false;
        /**
         * Renders select placeholder if nothing selected.
         * */
        this.placeholder = '';
        this._multiple = false;
        /**
         * Will be emitted when selected value changes.
         * */
        this.selectedChange = new EventEmitter();
        /**
         * List of selected options.
         * */
        this.selectionModel = [];
        /**
         * Current overlay position because of we have to toggle overlayPosition
         * in [ngClass] direction and this directive can use only string.
         */
        this.overlayPosition = '';
        this.alive = true;
        /**
         * Function passed through control value accessor to propagate changes.
         * */
        this.onChange = function () { };
        this.onTouched = function () { };
    }
    NbSelectComponent_1 = NbSelectComponent;
    Object.defineProperty(NbSelectComponent.prototype, "outline", {
        /**
         * Adds `outline` styles
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
    Object.defineProperty(NbSelectComponent.prototype, "filled", {
        /**
         * Adds `filled` styles
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
    Object.defineProperty(NbSelectComponent.prototype, "hero", {
        /**
         * Adds `hero` styles
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
    Object.defineProperty(NbSelectComponent.prototype, "disabled", {
        /**
         * Disables the select
         */
        get: function () {
            return !!this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "fullWidth", {
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
    Object.defineProperty(NbSelectComponent.prototype, "selected", {
        get: function () {
            return this.multiple
                ? this.selectionModel.map(function (o) { return o.value; })
                : this.selectionModel[0].value;
        },
        /**
         * Accepts selected item or array of selected items.
         * */
        set: function (value) {
            this.writeValue(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "multiple", {
        /**
         * Gives capability just write `multiple` over the element.
         * */
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            this._multiple = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "isOpen", {
        /**
         * Determines is select opened.
         * */
        get: function () {
            return this.ref && this.ref.hasAttached();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "isHidden", {
        /**
         * Determines is select hidden.
         * */
        get: function () {
            return !this.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "hostWidth", {
        /**
         * Returns width of the select button.
         * */
        get: function () {
            return this.hostRef.nativeElement.getBoundingClientRect().width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "selectButtonClasses", {
        get: function () {
            var classes = [];
            if (!this.selectionModel.length) {
                classes.push('placeholder');
            }
            if (this.isOpen) {
                classes.push(this.overlayPosition);
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "optionsListClasses", {
        get: function () {
            var classes = [
                "appearance-" + this.appearance,
                "size-" + this.size,
                "shape-" + this.shape,
                "status-" + this.status,
                this.overlayPosition,
            ];
            if (this.fullWidth) {
                classes.push('full-width');
            }
            return classes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "selectionView", {
        /**
         * Content rendered in the label.
         * */
        get: function () {
            if (this.selectionModel.length > 1) {
                return this.selectionModel.map(function (option) { return option.content; }).join(', ');
            }
            return this.selectionModel[0].content;
        },
        enumerable: true,
        configurable: true
    });
    NbSelectComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.queue) {
            // Call 'writeValue' when current change detection run is finished.
            // When writing is finished, change detection starts again, since
            // microtasks queue is empty.
            // Prevents ExpressionChangedAfterItHasBeenCheckedError.
            Promise.resolve().then(function () {
                _this.writeValue(_this.queue);
                _this.queue = null;
            });
        }
    };
    NbSelectComponent.prototype.ngAfterViewInit = function () {
        this.triggerStrategy = this.createTriggerStrategy();
        this.subscribeOnTriggers();
        this.subscribeOnOptionClick();
    };
    NbSelectComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        if (this.ref) {
            this.ref.dispose();
        }
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    };
    NbSelectComponent.prototype.show = function () {
        if (this.isHidden) {
            this.attachToOverlay();
            this.setActiveOption();
            this.cd.markForCheck();
        }
    };
    NbSelectComponent.prototype.hide = function () {
        if (this.isOpen) {
            this.ref.detach();
            this.cd.markForCheck();
        }
    };
    NbSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
        this.cd.markForCheck();
    };
    NbSelectComponent.prototype.writeValue = function (value) {
        if (!this.alive) {
            return;
        }
        if (this.options) {
            this.setSelection(value);
        }
        else {
            this.queue = value;
        }
    };
    /**
     * Selects option or clear all selected options if value is null.
     * */
    NbSelectComponent.prototype.handleOptionClick = function (option) {
        if (option.value == null) {
            this.reset();
        }
        else {
            this.selectOption(option);
        }
        this.cd.markForCheck();
    };
    /**
     * Deselect all selected options.
     * */
    NbSelectComponent.prototype.reset = function () {
        this.selectionModel.forEach(function (option) { return option.deselect(); });
        this.selectionModel = [];
        this.hide();
        this.button.nativeElement.focus();
        this.emitSelected(this.multiple ? [] : null);
    };
    /**
     * Determines how to select option as multiple or single.
     * */
    NbSelectComponent.prototype.selectOption = function (option) {
        if (this.multiple) {
            this.handleMultipleSelect(option);
        }
        else {
            this.handleSingleSelect(option);
        }
    };
    /**
     * Select single option.
     * */
    NbSelectComponent.prototype.handleSingleSelect = function (option) {
        var selected = this.selectionModel.pop();
        if (selected && selected !== option) {
            selected.deselect();
        }
        this.selectionModel = [option];
        option.select();
        this.hide();
        this.button.nativeElement.focus();
        this.emitSelected(option.value);
    };
    /**
     * Select for multiple options.
     * */
    NbSelectComponent.prototype.handleMultipleSelect = function (option) {
        if (option.selected) {
            this.selectionModel = this.selectionModel.filter(function (s) { return s.value !== option.value; });
            option.deselect();
        }
        else {
            this.selectionModel.push(option);
            option.select();
        }
        this.emitSelected(this.selectionModel.map(function (opt) { return opt.value; }));
    };
    NbSelectComponent.prototype.attachToOverlay = function () {
        if (!this.ref) {
            this.createOverlay();
            this.subscribeOnPositionChange();
            this.createKeyManager();
            this.subscribeOnOverlayKeys();
        }
        this.ref.attach(this.portal);
    };
    NbSelectComponent.prototype.setActiveOption = function () {
        if (this.selectionModel.length) {
            this.keyManager.setActiveItem(this.selectionModel[0]);
        }
        else {
            this.keyManager.setFirstItemActive();
        }
    };
    NbSelectComponent.prototype.createOverlay = function () {
        var scrollStrategy = this.createScrollStrategy();
        this.positionStrategy = this.createPositionStrategy();
        this.ref = this.overlay.create({ positionStrategy: this.positionStrategy, scrollStrategy: scrollStrategy });
    };
    NbSelectComponent.prototype.createKeyManager = function () {
        this.keyManager = new NbFocusKeyManager(this.options).withTypeAhead(200);
    };
    NbSelectComponent.prototype.createPositionStrategy = function () {
        return this.positionBuilder
            .connectedTo(this.hostRef)
            .position(NbPosition.BOTTOM)
            .offset(0)
            .adjustment(NbAdjustment.VERTICAL);
    };
    NbSelectComponent.prototype.createScrollStrategy = function () {
        return this.overlay.scrollStrategies.block();
    };
    NbSelectComponent.prototype.createTriggerStrategy = function () {
        var _this = this;
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.CLICK)
            .host(this.hostRef.nativeElement)
            .container(function () { return _this.getContainer(); })
            .build();
    };
    NbSelectComponent.prototype.subscribeOnTriggers = function () {
        var _this = this;
        this.triggerStrategy.show$.subscribe(function () { return _this.show(); });
        this.triggerStrategy.hide$.subscribe(function ($event) {
            _this.hide();
            if (!_this.isClickedWithinComponent($event)) {
                _this.onTouched();
            }
        });
    };
    NbSelectComponent.prototype.subscribeOnPositionChange = function () {
        var _this = this;
        this.positionStrategy.positionChange
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (position) {
            _this.overlayPosition = position;
            _this.cd.detectChanges();
        });
    };
    NbSelectComponent.prototype.subscribeOnOptionClick = function () {
        var _this = this;
        /**
         * If the user changes provided options list in the runtime we have to handle this
         * and resubscribe on options selection changes event.
         * Otherwise, the user will not be able to select new options.
         * */
        this.options.changes
            .pipe(startWith(this.options), switchMap(function (options) {
            return merge.apply(void 0, options.map(function (option) { return option.click; }));
        }), takeWhile(function () { return _this.alive; }))
            .subscribe(function (clickedOption) { return _this.handleOptionClick(clickedOption); });
    };
    NbSelectComponent.prototype.subscribeOnOverlayKeys = function () {
        var _this = this;
        this.ref.keydownEvents()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.isOpen; }))
            .subscribe(function (event) {
            if (event.keyCode === ESCAPE) {
                _this.button.nativeElement.focus();
                _this.hide();
            }
            else {
                _this.keyManager.onKeydown(event);
            }
        });
        this.keyManager.tabOut
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.hide(); });
    };
    NbSelectComponent.prototype.getContainer = function () {
        return this.ref && this.ref.hasAttached() && {
            location: {
                nativeElement: this.ref.overlayElement,
            },
        };
    };
    /**
     * Propagate selected value.
     * */
    NbSelectComponent.prototype.emitSelected = function (selected) {
        this.onChange(selected);
        this.selectedChange.emit(selected);
    };
    /**
     * Set selected value in model.
     * */
    NbSelectComponent.prototype.setSelection = function (value) {
        var _this = this;
        var isArray = Array.isArray(value);
        if (this.multiple && !isArray) {
            throw new Error('Can\'t assign single value if select is marked as multiple');
        }
        if (!this.multiple && isArray) {
            throw new Error('Can\'t assign array if select is not marked as multiple');
        }
        var previouslySelectedOptions = this.selectionModel;
        this.selectionModel = [];
        if (isArray) {
            value.forEach(function (option) { return _this.selectValue(option); });
        }
        else {
            this.selectValue(value);
        }
        // find options which were selected before and trigger deselect
        previouslySelectedOptions
            .filter(function (option) { return !_this.selectionModel.includes(option); })
            .forEach(function (option) { return option.deselect(); });
        this.cd.markForCheck();
    };
    /**
     * Selects value.
     * */
    NbSelectComponent.prototype.selectValue = function (value) {
        var corresponding = this.options.find(function (option) { return option.value === value; });
        if (corresponding) {
            corresponding.select();
            this.selectionModel.push(corresponding);
        }
    };
    /**
     * Sets touched if focus moved outside of button and overlay,
     * ignoring the case when focus moved to options overlay.
     */
    NbSelectComponent.prototype.trySetTouched = function () {
        if (this.isHidden) {
            this.onTouched();
        }
    };
    NbSelectComponent.prototype.isClickedWithinComponent = function ($event) {
        return this.hostRef.nativeElement === $event.target || this.hostRef.nativeElement.contains($event.target);
    };
    Object.defineProperty(NbSelectComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "rectangle", {
        get: function () {
            return this.shape === 'rectangle';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "round", {
        get: function () {
            return this.shape === 'round';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSelectComponent.prototype, "semiRound", {
        get: function () {
            return this.shape === 'semi-round';
        },
        enumerable: true,
        configurable: true
    });
    var NbSelectComponent_1;
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbSelectComponent.prototype, "size", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbSelectComponent.prototype, "status", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbSelectComponent.prototype, "shape", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbSelectComponent.prototype, "appearance", void 0);
    __decorate([
        Input(),
        HostBinding('class.appearance-outline'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "outline", null);
    __decorate([
        Input(),
        HostBinding('class.appearance-filled'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "filled", null);
    __decorate([
        Input(),
        HostBinding('class.appearance-hero'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "hero", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "disabled", null);
    __decorate([
        Input(),
        HostBinding('class.full-width'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "fullWidth", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbSelectComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NbSelectComponent.prototype, "selected", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "multiple", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], NbSelectComponent.prototype, "selectedChange", void 0);
    __decorate([
        ContentChildren(NbOptionComponent, { descendants: true }),
        __metadata("design:type", QueryList)
    ], NbSelectComponent.prototype, "options", void 0);
    __decorate([
        ContentChild(NbSelectLabelComponent, { static: false }),
        __metadata("design:type", Object)
    ], NbSelectComponent.prototype, "customLabel", void 0);
    __decorate([
        ViewChild(NbPortalDirective, { static: false }),
        __metadata("design:type", NbPortalDirective)
    ], NbSelectComponent.prototype, "portal", void 0);
    __decorate([
        ViewChild('selectButton', { read: ElementRef, static: false }),
        __metadata("design:type", ElementRef)
    ], NbSelectComponent.prototype, "button", void 0);
    __decorate([
        HostBinding('class.open'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "isOpen", null);
    __decorate([
        HostBinding('class.size-tiny'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "tiny", null);
    __decorate([
        HostBinding('class.size-small'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "small", null);
    __decorate([
        HostBinding('class.size-medium'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "medium", null);
    __decorate([
        HostBinding('class.size-large'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "large", null);
    __decorate([
        HostBinding('class.size-giant'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "giant", null);
    __decorate([
        HostBinding('class.status-primary'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "primary", null);
    __decorate([
        HostBinding('class.status-info'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "info", null);
    __decorate([
        HostBinding('class.status-success'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "success", null);
    __decorate([
        HostBinding('class.status-warning'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "warning", null);
    __decorate([
        HostBinding('class.status-danger'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "danger", null);
    __decorate([
        HostBinding('class.shape-rectangle'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "rectangle", null);
    __decorate([
        HostBinding('class.shape-round'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "round", null);
    __decorate([
        HostBinding('class.shape-semi-round'),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [])
    ], NbSelectComponent.prototype, "semiRound", null);
    NbSelectComponent = NbSelectComponent_1 = __decorate([
        Component({
            selector: 'nb-select',
            template: "<button [disabled]=\"disabled\"\n        [ngClass]=\"selectButtonClasses\"\n        (blur)=\"trySetTouched()\"\n        (keydown.arrowDown)=\"show()\"\n        (keydown.arrowUp)=\"show()\"\n        class=\"select-button\"\n        type=\"button\"\n        #selectButton>\n\n    <ng-container *ngIf=\"selectionModel.length; else placeholderTemplate\">\n      <ng-container *ngIf=\"customLabel; else defaultSelectionTemplate\">\n        <ng-content select=\"nb-select-label\"></ng-content>\n      </ng-container>\n\n      <ng-template #defaultSelectionTemplate>{{ selectionView }}</ng-template>\n    </ng-container>\n\n    <ng-template #placeholderTemplate>{{ placeholder }}</ng-template>\n\n    <nb-icon aria-hidden=\"true\" icon=\"chevron-down-outline\" pack=\"nebular-essentials\"></nb-icon>\n</button>\n\n<div *nbPortal [ngClass]=\"optionsListClasses\" [style.width.px]=\"hostWidth\" class=\"options-list-container\">\n  <ul class=\"options-list\">\n    <ng-content select=\"nb-option, nb-option-group\"></ng-content>\n  </ul>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NbSelectComponent_1; }),
                    multi: true,
                },
                { provide: NB_SELECT_INJECTION_TOKEN, useExisting: NbSelectComponent_1 },
            ],
            styles: ["/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:inline-block;max-width:100%}[dir=ltr] :host .select-button{text-align:left}[dir=ltr] :host .select-button nb-icon{right:0.2em}[dir=rtl] :host .select-button{text-align:right}[dir=rtl] :host .select-button nb-icon{left:0.2em}:host .select-button.bottom{border-bottom-left-radius:0;border-bottom-right-radius:0}:host .select-button.top{border-top-left-radius:0;border-top-right-radius:0}:host(.full-width){width:100%}.select-button{position:relative;width:100%;overflow:hidden;text-overflow:ellipsis;text-transform:none;white-space:nowrap;transition-duration:0.15s;transition-property:background-color,border-color,border-radius,box-shadow,color;transition-timing-function:ease-in}nb-icon{font-size:1.5em;position:absolute;top:50%;transform:translateY(-50%);transition-duration:0.15s;transition-property:transform;transition-timing-function:ease-in}[dir=ltr] nb-icon{right:.5rem}[dir=rtl] nb-icon{left:.5rem}:host(.open) nb-icon{transform:translateY(-50%) rotate(180deg)}\n"]
        }),
        __param(0, Inject(NB_DOCUMENT)),
        __metadata("design:paramtypes", [Object, NbOverlayService,
            ElementRef,
            NbPositionBuilderService,
            NbTriggerStrategyBuilderService,
            ChangeDetectorRef])
    ], NbSelectComponent);
    return NbSelectComponent;
}());
export { NbSelectComponent };
//# sourceMappingURL=select.component.js.map