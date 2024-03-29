import { Directive, Inject, Injectable, InjectionToken, Input, NgModule, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, takeWhile } from 'rxjs/operators';

const NB_SECURITY_OPTIONS_TOKEN = new InjectionToken('Nebular Security Options');

var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
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
var NbAclService_1;
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
const shallowObjectClone = (o) => Object.assign({}, o);
const ɵ0 = shallowObjectClone;
const shallowArrayClone = (a) => Object.assign([], a);
const ɵ1 = shallowArrayClone;
const popParent = (abilities) => {
    const parent = abilities['parent'];
    delete abilities['parent'];
    return parent;
};
const ɵ2 = popParent;
/**
 * Common acl service.
 */
let NbAclService = NbAclService_1 = class NbAclService {
    constructor(settings = {}) {
        this.settings = settings;
        this.state = {};
        if (settings.accessControl) {
            this.setAccessControl(settings.accessControl);
        }
    }
    /**
     * Set/Reset ACL list
     * @param {NbAccessControl} list
     */
    setAccessControl(list) {
        for (const [role, value] of Object.entries(list)) {
            const abilities = shallowObjectClone(value);
            const parent = popParent(abilities);
            this.register(role, parent, abilities);
        }
    }
    /**
     * Register a new role with a list of abilities (permission/resources combinations)
     * @param {string} role
     * @param {string} parent
     * @param {[permission: string]: string|string[]} abilities
     */
    register(role, parent = null, abilities = {}) {
        this.validateRole(role);
        this.state[role] = {
            parent: parent,
        };
        for (const [permission, value] of Object.entries(abilities)) {
            const resources = typeof value === 'string' ? [value] : value;
            this.allow(role, permission, shallowArrayClone(resources));
        }
    }
    /**
     * Allow a permission for specific resources to a role
     * @param {string} role
     * @param {string} permission
     * @param {string | string[]} resource
     */
    allow(role, permission, resource) {
        this.validateRole(role);
        if (!this.getRole(role)) {
            this.register(role, null, {});
        }
        resource = typeof resource === 'string' ? [resource] : resource;
        let resources = shallowArrayClone(this.getRoleResources(role, permission));
        resources = resources.concat(resource);
        this.state[role][permission] = resources
            .filter((item, pos) => resources.indexOf(item) === pos);
    }
    /**
     * Check whether the role has a permission to a resource
     * @param {string} role
     * @param {string} permission
     * @param {string} resource
     * @returns {boolean}
     */
    can(role, permission, resource) {
        this.validateResource(resource);
        const parentRole = this.getRoleParent(role);
        const parentCan = parentRole && this.can(this.getRoleParent(role), permission, resource);
        return parentCan || this.exactCan(role, permission, resource);
    }
    getRole(role) {
        return this.state[role];
    }
    validateRole(role) {
        if (!role) {
            throw new Error('NbAclService: role name cannot be empty');
        }
    }
    validateResource(resource) {
        if (!resource || [NbAclService_1.ANY_RESOURCE].includes(resource)) {
            throw new Error(`NbAclService: cannot use empty or bulk '*' resource placeholder with 'can' method`);
        }
    }
    exactCan(role, permission, resource) {
        const resources = this.getRoleResources(role, permission);
        return resources.includes(resource) || resources.includes(NbAclService_1.ANY_RESOURCE);
    }
    getRoleResources(role, permission) {
        return this.getRoleAbilities(role)[permission] || [];
    }
    getRoleAbilities(role) {
        const abilities = shallowObjectClone(this.state[role] || {});
        popParent(shallowObjectClone(this.state[role] || {}));
        return abilities;
    }
    getRoleParent(role) {
        return this.state[role] ? this.state[role]['parent'] : null;
    }
};
NbAclService.ANY_RESOURCE = '*';
NbAclService = NbAclService_1 = __decorate$1([
    Injectable(),
    __param(0, Optional()), __param(0, Inject(NB_SECURITY_OPTIONS_TOKEN)),
    __metadata("design:paramtypes", [Object])
], NbAclService);

class NbRoleProvider {
}

var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Access checker service.
 *
 * Injects `NbRoleProvider` to determine current user role, and checks access permissions using `NbAclService`
 */
let NbAccessChecker = class NbAccessChecker {
    constructor(roleProvider, acl) {
        this.roleProvider = roleProvider;
        this.acl = acl;
    }
    /**
     * Checks whether access is granted or not
     *
     * @param {string} permission
     * @param {string} resource
     * @returns {Observable<boolean>}
     */
    isGranted(permission, resource) {
        return this.roleProvider.getRole()
            .pipe(map((role) => Array.isArray(role) ? role : [role]), map((roles) => {
            return roles.some(role => this.acl.can(role, permission, resource));
        }));
    }
};
NbAccessChecker = __decorate$2([
    Injectable(),
    __metadata$1("design:paramtypes", [NbRoleProvider, NbAclService])
], NbAccessChecker);

var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let NbIsGrantedDirective = class NbIsGrantedDirective {
    constructor(templateRef, viewContainer, accessChecker) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.accessChecker = accessChecker;
        this.alive = true;
        this.hasView = false;
    }
    set nbIsGranted([permission, resource]) {
        this.accessChecker.isGranted(permission, resource)
            .pipe(takeWhile(() => this.alive))
            .subscribe((can) => {
            if (can && !this.hasView) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                this.hasView = true;
            }
            else if (!can && this.hasView) {
                this.viewContainer.clear();
                this.hasView = false;
            }
        });
    }
    ngOnDestroy() {
        this.alive = false;
    }
};
__decorate$3([
    Input(),
    __metadata$2("design:type", Array),
    __metadata$2("design:paramtypes", [Array])
], NbIsGrantedDirective.prototype, "nbIsGranted", null);
NbIsGrantedDirective = __decorate$3([
    Directive({ selector: '[nbIsGranted]' }),
    __metadata$2("design:paramtypes", [TemplateRef,
        ViewContainerRef,
        NbAccessChecker])
], NbIsGrantedDirective);

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbSecurityModule_1;
let NbSecurityModule = NbSecurityModule_1 = class NbSecurityModule {
    static forRoot(nbSecurityOptions) {
        return {
            ngModule: NbSecurityModule_1,
            providers: [
                { provide: NB_SECURITY_OPTIONS_TOKEN, useValue: nbSecurityOptions },
                NbAclService,
                NbAccessChecker,
            ],
            exports: [
                NbIsGrantedDirective,
            ],
        };
    }
};
NbSecurityModule = NbSecurityModule_1 = __decorate([
    NgModule({
        imports: [
            CommonModule,
        ],
        declarations: [
            NbIsGrantedDirective,
        ],
        exports: [
            NbIsGrantedDirective,
        ],
    })
], NbSecurityModule);

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NB_SECURITY_OPTIONS_TOKEN, NbSecurityModule, NbAclService, ɵ0, ɵ1, ɵ2, NbAccessChecker, NbRoleProvider, NbIsGrantedDirective };
