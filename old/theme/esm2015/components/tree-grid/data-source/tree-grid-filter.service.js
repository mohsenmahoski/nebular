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
import { Injectable } from '@angular/core';
/**
 * Service used to filter tree grid data. Searched searchString in all object values.
 * If you need custom filter, you can extend this service and override filterPredicate or whole filter method.
 */
let NbTreeGridFilterService = class NbTreeGridFilterService {
    filter(query, data) {
        if (!query) {
            return data;
        }
        return data.reduce((filtered, node) => {
            let filteredChildren;
            if (node.children) {
                filteredChildren = this.filter(query, node.children);
                node.children = filteredChildren;
            }
            node.expanded = false;
            if (filteredChildren && filteredChildren.length) {
                node.expanded = true;
                filtered.push(node);
            }
            else if (this.filterPredicate(node.data, query)) {
                filtered.push(node);
            }
            return filtered;
        }, []);
    }
    filterPredicate(data, searchQuery) {
        const preparedQuery = searchQuery.trim().toLocaleLowerCase();
        for (const val of Object.values(data)) {
            const preparedVal = `${val}`.trim().toLocaleLowerCase();
            if (preparedVal.includes(preparedQuery)) {
                return true;
            }
        }
        return false;
    }
};
NbTreeGridFilterService = __decorate([
    Injectable()
], NbTreeGridFilterService);
export { NbTreeGridFilterService };
//# sourceMappingURL=tree-grid-filter.service.js.map