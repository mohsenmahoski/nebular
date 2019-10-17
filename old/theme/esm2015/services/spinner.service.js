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
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Injectable, Inject } from '@angular/core';
import { NB_DOCUMENT } from '../theme.options';
/**
 * Service to control the global page spinner.
 */
let NbSpinnerService = class NbSpinnerService {
    constructor(document) {
        this.document = document;
        this.loaders = [];
        this.selector = 'nb-global-spinner';
    }
    /**
     * Appends new loader to the list of loader to be completed before
     * spinner will be hidden
     * @param method Promise<any>
     */
    registerLoader(method) {
        this.loaders.push(method);
    }
    /**
     * Clears the list of loader
     */
    clear() {
        this.loaders = [];
    }
    /**
     * Start the loader process, show spinnder and execute loaders
     */
    load() {
        this.showSpinner();
        this.executeAll();
    }
    executeAll(done = () => { }) {
        Promise.all(this.loaders).then((values) => {
            this.hideSpinner();
            done.call(null, values);
        })
            .catch((error) => {
            // TODO: Promise.reject
            console.error(error);
        });
    }
    // TODO is there any better way of doing this?
    showSpinner() {
        const el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'block';
        }
    }
    hideSpinner() {
        const el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'none';
        }
    }
    getSpinnerElement() {
        return this.document.getElementById(this.selector);
    }
};
NbSpinnerService = __decorate([
    Injectable(),
    __param(0, Inject(NB_DOCUMENT)),
    __metadata("design:paramtypes", [Object])
], NbSpinnerService);
export { NbSpinnerService };
//# sourceMappingURL=spinner.service.js.map