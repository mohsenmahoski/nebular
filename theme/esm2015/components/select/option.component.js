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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, HostListener, Inject, Input, Output, } from '@angular/core';
import { Subject } from 'rxjs';
import { convertToBoolProperty } from '../helpers';
import { NB_SELECT_INJECTION_TOKEN } from './select-injection-tokens';
let NbOptionComponent = class NbOptionComponent {
    constructor(parent, elementRef, cd) {
        this.elementRef = elementRef;
        this.cd = cd;
        this.disabledByGroup = false;
        this._disabled = false;
        /**
         * Fires value when option selection change.
         * */
        this.selectionChange = new EventEmitter();
        /**
         * Fires when option clicked
         */
        this.click$ = new Subject();
        this.selected = false;
        this.alive = true;
        this.parent = parent;
    }
    get disabled() {
        return this._disabled || this.disabledByGroup;
    }
    set disabled(value) {
        this._disabled = convertToBoolProperty(value);
    }
    get click() {
        return this.click$.asObservable();
    }
    ngOnDestroy() {
        this.alive = false;
    }
    /**
     * Determines should we render checkbox.
     * */
    get withCheckbox() {
        return this.multiple && this.value != null;
    }
    get content() {
        return this.elementRef.nativeElement.textContent;
    }
    get multiple() {
        return this.parent.multiple;
    }
    get selectedClass() {
        return this.selected;
    }
    get disabledAttribute() {
        return this.disabled ? '' : null;
    }
    get tabindex() {
        return '-1';
    }
    onClick(event) {
        this.click$.next(this);
        // Prevent scroll on space click, etc.
        event.preventDefault();
    }
    select() {
        this.setSelection(true);
    }
    deselect() {
        this.setSelection(false);
    }
    /**
     * Sets disabled by group state and marks component for check.
     */
    setDisabledByGroupState(disabled) {
        if (this.disabledByGroup !== disabled) {
            this.disabledByGroup = disabled;
            this.cd.markForCheck();
        }
    }
    setSelection(selected) {
        /**
         * In case of changing options in runtime the reference to the selected option will be kept in select component.
         * This may lead to exceptions with detecting changes in destroyed component.
         *
         * Also Angular can call writeValue on destroyed view (select implements ControlValueAccessor).
         * angular/angular#27803
         * */
        if (this.alive && this.selected !== selected) {
            this.selected = selected;
            this.selectionChange.emit(this);
            this.cd.markForCheck();
        }
    }
    focus() {
        this.elementRef.nativeElement.focus();
    }
    getLabel() {
        return this.content;
    }
};
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbOptionComponent.prototype, "value", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbOptionComponent.prototype, "disabled", null);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbOptionComponent.prototype, "selectionChange", void 0);
__decorate([
    HostBinding('class.selected'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbOptionComponent.prototype, "selectedClass", null);
__decorate([
    HostBinding('attr.disabled'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], NbOptionComponent.prototype, "disabledAttribute", null);
__decorate([
    HostBinding('tabIndex'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], NbOptionComponent.prototype, "tabindex", null);
__decorate([
    HostListener('click', ['$event']),
    HostListener('keydown.space', ['$event']),
    HostListener('keydown.enter', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], NbOptionComponent.prototype, "onClick", null);
NbOptionComponent = __decorate([
    Component({
        selector: 'nb-option',
        changeDetection: ChangeDetectionStrategy.OnPush,
        template: `
    <nb-checkbox *ngIf="withCheckbox"
                 [value]="selected"
                 [disabled]="disabled"
                 aria-hidden="true">
    </nb-checkbox>
    <ng-content></ng-content>
  `,
        styles: ["/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;transition-duration:0.15s;transition-property:background-color,color;transition-timing-function:ease-in}:host:hover{cursor:pointer}:host nb-checkbox{display:flex;pointer-events:none}:host nb-checkbox ::ng-deep .label{padding:0}:host([disabled]){pointer-events:none}\n"]
    }),
    __param(0, Inject(NB_SELECT_INJECTION_TOKEN)),
    __metadata("design:paramtypes", [Object, ElementRef,
        ChangeDetectorRef])
], NbOptionComponent);
export { NbOptionComponent };
//# sourceMappingURL=option.component.js.map