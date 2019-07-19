import { Attribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Host, HostBinding, HostListener, Inject, Injectable, InjectionToken, Injector, Input, IterableDiffers, LOCALE_ID, NgModule, NgZone, Optional, Output, PLATFORM_ID, QueryList, Renderer2, SimpleChange, TemplateRef, Type, ViewChild, ViewChildren, ViewContainerRef, forwardRef, ɵɵdefineInjectable, ɵɵinject } from '@angular/core';
import * as i0 from '@angular/core';
import { CommonModule, DOCUMENT, DatePipe, FormStyle, Location, TranslationWidth, getLocaleDayNames, getLocaleFirstDayOfWeek, getLocaleMonthNames, isPlatformBrowser } from '@angular/common';
import * as i1 from '@angular/common';
import { BehaviorSubject, EMPTY, Observable, ReplaySubject, Subject, combineLatest, forkJoin, fromEvent, interval, merge, of, timer } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, map, pairwise, repeat, share, startWith, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { AbstractControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { FocusKeyManager, FocusTrap, FocusTrapFactory, InteractivityChecker } from '@angular/cdk/a11y';
import { CdkPortal, CdkPortalOutlet, ComponentPortal, PortalInjector, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { BlockScrollStrategy, FlexibleConnectedPositionStrategy, GlobalPositionStrategy, Overlay, OverlayContainer, OverlayModule, OverlayPositionBuilder, ScrollDispatcher, ScrollStrategyOptions, ViewportRuler } from '@angular/cdk/overlay';
import { Platform, PlatformModule } from '@angular/cdk/platform';
import { ScrollDispatcher as ScrollDispatcher$1 } from '@angular/cdk/scrolling';
import * as i2 from '@angular/cdk/scrolling';
import { DomSanitizer } from '@angular/platform-browser';
import { animate, state, style, transition, trigger } from '@angular/animations';
import 'intersection-observer';
import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { CdkCell, CdkCellDef, CdkCellOutlet, CdkColumnDef, CdkFooterCell, CdkFooterCellDef, CdkFooterRow, CdkFooterRowDef, CdkHeaderCell, CdkHeaderCellDef, CdkHeaderRow, CdkHeaderRowDef, CdkRow, CdkRowDef, CdkTable, CdkTableModule, DataRowOutlet, DataSource, FooterRowOutlet, HeaderRowOutlet } from '@angular/cdk/table';
import { ESCAPE } from '@angular/cdk/keycodes';
import * as _angular_cdk_keycodes from '@angular/cdk/keycodes';

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_THEME_OPTIONS = new InjectionToken('Nebular Theme Options');
var NB_MEDIA_BREAKPOINTS = new InjectionToken('Nebular Media Breakpoints');
var NB_BUILT_IN_JS_THEMES = new InjectionToken('Nebular Built-in JS Themes');
var NB_JS_THEMES = new InjectionToken('Nebular JS Themes');
/**
 * We're providing browser apis with tokens to improve testing capabilities.
 * */
var NB_WINDOW = new InjectionToken('Window');
var NB_DOCUMENT = new InjectionToken('Document');

var NbColorHelper = /** @class */ (function () {
    function NbColorHelper() {
    }
    NbColorHelper.shade = function (color, weight) {
        return NbColorHelper.mix('#000000', color, weight);
    };
    NbColorHelper.tint = function (color, weight) {
        return NbColorHelper.mix('#ffffff', color, weight);
    };
    NbColorHelper.mix = function (color1, color2, weight) {
        var d2h = function (d) { return d.toString(16); };
        var h2d = function (h) { return parseInt(h, 16); };
        var result = '#';
        for (var i = 1; i < 7; i += 2) {
            var firstPart = h2d(color1.substr(i, 2));
            var secondPart = h2d(color2.substr(i, 2));
            var resultPart = d2h(Math.floor(secondPart + (firstPart - secondPart) * (weight / 100.0)));
            result += ('0' + resultPart).slice(-2);
        }
        return result;
    };
    NbColorHelper.hexToRgbA = function (hex, alpha) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length === 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        }
        throw new Error('Bad Hex');
    };
    return NbColorHelper;
}());

var palette = {
    primary: '#8a7fff',
    success: '#40dc7e',
    info: '#4ca6ff',
    warning: '#ffa100',
    danger: '#ff4c6a',
};
var DEFAULT_THEME = {
    name: 'default',
    variables: {
        fontMain: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSecondary: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        bg: '#ffffff',
        fg: '#a4abb3',
        fgHeading: '#2a2a2a',
        fgText: '#3b3b3b',
        fgHighlight: '#41d974',
        layoutBg: '#ebeff5',
        separator: '#ebeef2',
        primary: palette.primary,
        success: palette.success,
        info: palette.info,
        warning: palette.warning,
        danger: palette.danger,
        primaryLight: NbColorHelper.tint(palette.primary, 15),
        successLight: NbColorHelper.tint(palette.success, 15),
        infoLight: NbColorHelper.tint(palette.info, 15),
        warningLight: NbColorHelper.tint(palette.warning, 15),
        dangerLight: NbColorHelper.tint(palette.danger, 15),
    },
};

var palette$1 = {
    primary: '#7659ff',
    success: '#00d977',
    info: '#0088ff',
    warning: '#ffa100',
    danger: '#ff386a',
};
var COSMIC_THEME = {
    name: 'cosmic',
    base: 'default',
    variables: {
        bg: '#3d3780',
        fg: '#a1a1e5',
        fgHeading: '#ffffff',
        fgText: '#d1d1ff',
        fgHighlight: '#00f9a6',
        layoutBg: '#2f296b',
        separator: '#342e73',
        primary: palette$1.primary,
        success: palette$1.success,
        info: palette$1.info,
        warning: palette$1.warning,
        danger: palette$1.danger,
        primaryLight: NbColorHelper.tint(palette$1.primary, 20),
        successLight: NbColorHelper.tint(palette$1.success, 20),
        infoLight: NbColorHelper.tint(palette$1.info, 20),
        warningLight: NbColorHelper.tint(palette$1.warning, 20),
        dangerLight: NbColorHelper.tint(palette$1.danger, 20),
    },
};

var palette$2 = {
    primary: '#73a1ff',
    success: '#5dcfe3',
    info: '#ba7fec',
    warning: '#ffa36b',
    danger: '#ff6b83',
};
var CORPORATE_THEME = {
    name: 'corporate',
    base: 'default',
    variables: {
        fg: '#f1f5f8',
        bg: '#ffffff',
        fgHeading: '#181818',
        fgText: '#4b4b4b',
        fgHighlight: '#a4abb3',
        layoutBg: '#f1f5f8',
        separator: '#cdd5dc',
        primary: palette$2.primary,
        success: palette$2.success,
        info: palette$2.info,
        warning: palette$2.warning,
        danger: palette$2.danger,
        primaryLight: NbColorHelper.tint(palette$2.primary, 15),
        successLight: NbColorHelper.tint(palette$2.success, 15),
        infoLight: NbColorHelper.tint(palette$2.info, 15),
        warningLight: NbColorHelper.tint(palette$2.warning, 15),
        dangerLight: NbColorHelper.tint(palette$2.danger, 15),
    },
};

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$1 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$1 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var BUILT_IN_THEMES = [
    DEFAULT_THEME,
    COSMIC_THEME,
    CORPORATE_THEME,
];
/**
 * Js Themes registry - provides access to the JS themes' variables.
 * Usually shouldn't be used directly, but through the NbThemeService class methods (getJsTheme).
 */
var NbJSThemesRegistry = /** @class */ (function () {
    function NbJSThemesRegistry(builtInThemes, newThemes) {
        var _this = this;
        if (newThemes === void 0) { newThemes = []; }
        this.themes = {};
        var themes = this.combineByNames(newThemes, builtInThemes);
        themes.forEach(function (theme) {
            _this.register(theme, theme.name, theme.base);
        });
    }
    /**
     * Registers a new JS theme
     * @param config any
     * @param themeName string
     * @param baseTheme string
     */
    NbJSThemesRegistry.prototype.register = function (config, themeName, baseTheme) {
        var base = this.has(baseTheme) ? this.get(baseTheme) : {};
        this.themes[themeName] = this.mergeDeep({}, base, config);
    };
    /**
     * Checks whether the theme is registered
     * @param themeName
     * @returns boolean
     */
    NbJSThemesRegistry.prototype.has = function (themeName) {
        return !!this.themes[themeName];
    };
    /**
     * Return a theme
     * @param themeName
     * @returns NbJSThemeOptions
     */
    NbJSThemesRegistry.prototype.get = function (themeName) {
        if (!this.themes[themeName]) {
            throw Error("NbThemeConfig: no theme '" + themeName + "' found registered.");
        }
        return JSON.parse(JSON.stringify(this.themes[themeName]));
    };
    NbJSThemesRegistry.prototype.combineByNames = function (newThemes, oldThemes) {
        var _this = this;
        if (newThemes) {
            var mergedThemes_1 = [];
            newThemes.forEach(function (theme) {
                var sameOld = oldThemes.find(function (tm) { return tm.name === theme.name; })
                    || {};
                var mergedTheme = _this.mergeDeep({}, sameOld, theme);
                mergedThemes_1.push(mergedTheme);
            });
            oldThemes.forEach(function (theme) {
                if (!mergedThemes_1.find(function (tm) { return tm.name === theme.name; })) {
                    mergedThemes_1.push(theme);
                }
            });
            return mergedThemes_1;
        }
        return oldThemes;
    };
    NbJSThemesRegistry.prototype.isObject = function (item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    };
    // TODO: move to helpers
    NbJSThemesRegistry.prototype.mergeDeep = function (target) {
        var _a, _b;
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        if (!sources.length) {
            return target;
        }
        var source = sources.shift();
        if (this.isObject(target) && this.isObject(source)) {
            for (var key in source) {
                if (this.isObject(source[key])) {
                    if (!target[key]) {
                        Object.assign(target, (_a = {}, _a[key] = {}, _a));
                    }
                    this.mergeDeep(target[key], source[key]);
                }
                else {
                    Object.assign(target, (_b = {}, _b[key] = source[key], _b));
                }
            }
        }
        return this.mergeDeep.apply(this, [target].concat(sources));
    };
    NbJSThemesRegistry = __decorate$2([
        Injectable(),
        __param$1(0, Inject(NB_BUILT_IN_JS_THEMES)),
        __param$1(1, Inject(NB_JS_THEMES)),
        __metadata$1("design:paramtypes", [Array, Array])
    ], NbJSThemesRegistry);
    return NbJSThemesRegistry;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$2 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$2 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DEFAULT_MEDIA_BREAKPOINTS = [
    {
        name: 'xs',
        width: 0,
    },
    {
        name: 'is',
        width: 400,
    },
    {
        name: 'sm',
        width: 576,
    },
    {
        name: 'md',
        width: 768,
    },
    {
        name: 'lg',
        width: 992,
    },
    {
        name: 'xl',
        width: 1200,
    },
    {
        name: 'xxl',
        width: 1400,
    },
    {
        name: 'xxxl',
        width: 1600,
    },
];
/**
 * Manages media breakpoints
 *
 * Provides access to available media breakpoints to convert window width to a configured breakpoint,
 * e.g. 200px - *xs* breakpoint
 */
var NbMediaBreakpointsService = /** @class */ (function () {
    function NbMediaBreakpointsService(breakpoints) {
        this.breakpoints = breakpoints;
        this.breakpointsMap = this.breakpoints.reduce(function (res, b) {
            res[b.name] = b.width;
            return res;
        }, {});
    }
    /**
     * Returns a configured breakpoint by width
     * @param width number
     * @returns {Z|{name: string, width: number}}
     */
    NbMediaBreakpointsService.prototype.getByWidth = function (width) {
        var unknown = { name: 'unknown', width: width };
        var breakpoints = this.getBreakpoints();
        return breakpoints
            .find(function (point, index) {
            var next = breakpoints[index + 1];
            return width >= point.width && (!next || width < next.width);
        }) || unknown;
    };
    /**
     * Returns a configured breakpoint by name
     * @param name string
     * @returns NbMediaBreakpoint
     */
    NbMediaBreakpointsService.prototype.getByName = function (name) {
        var unknown = { name: 'unknown', width: NaN };
        var breakpoints = this.getBreakpoints();
        return breakpoints.find(function (point) { return name === point.name; }) || unknown;
    };
    /**
     * Returns a list of configured breakpoints for the theme
     * @returns NbMediaBreakpoint[]
     */
    NbMediaBreakpointsService.prototype.getBreakpoints = function () {
        return this.breakpoints;
    };
    /**
     * Returns a map of configured breakpoints for the theme
     * @returns {[p: string]: number}
     */
    NbMediaBreakpointsService.prototype.getBreakpointsMap = function () {
        return this.breakpointsMap;
    };
    NbMediaBreakpointsService = __decorate$3([
        Injectable(),
        __param$2(0, Inject(NB_MEDIA_BREAKPOINTS)),
        __metadata$2("design:paramtypes", [Object])
    ], NbMediaBreakpointsService);
    return NbMediaBreakpointsService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
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
/**
 * Main Nebular service. Includes various helper methods.
 */
var NbThemeService = /** @class */ (function () {
    function NbThemeService(options, breakpointService, jsThemesRegistry) {
        this.options = options;
        this.breakpointService = breakpointService;
        this.jsThemesRegistry = jsThemesRegistry;
        this.themeChanges$ = new ReplaySubject(1);
        this.appendLayoutClass$ = new Subject();
        this.removeLayoutClass$ = new Subject();
        this.changeWindowWidth$ = new ReplaySubject(2);
        if (options && options.name) {
            this.changeTheme(options.name);
        }
    }
    /**
     * Change current application theme
     * @param {string} name
     */
    NbThemeService.prototype.changeTheme = function (name) {
        this.themeChanges$.next({ name: name, previous: this.currentTheme });
        this.currentTheme = name;
    };
    NbThemeService.prototype.changeWindowWidth = function (width) {
        this.changeWindowWidth$.next(width);
    };
    /**
     * Returns a theme object with variables (color/paddings/etc) on a theme change.
     * Once subscribed - returns current theme.
     *
     * @returns {Observable<NbJSThemeOptions>}
     */
    NbThemeService.prototype.getJsTheme = function () {
        var _this = this;
        return this.onThemeChange().pipe(map(function (theme) {
            return _this.jsThemesRegistry.get(theme.name);
        }));
    };
    /**
     * Triggers media query breakpoint change
     * Returns a pair where the first item is previous media breakpoint and the second item is current breakpoit.
     * ```ts
     *  [{ name: 'xs', width: 0 }, { name: 'md', width: 768 }] // change from `xs` to `md`
     * ```
     * @returns {Observable<[NbMediaBreakpoint, NbMediaBreakpoint]>}
     */
    NbThemeService.prototype.onMediaQueryChange = function () {
        var _this = this;
        return this.changeWindowWidth$
            .pipe(startWith(undefined), pairwise(), map(function (_a) {
            var prevWidth = _a[0], width = _a[1];
            return [
                _this.breakpointService.getByWidth(prevWidth),
                _this.breakpointService.getByWidth(width),
            ];
        }), filter(function (_a) {
            var prevPoint = _a[0], point = _a[1];
            return prevPoint.name !== point.name;
        }), distinctUntilChanged(null, function (params) { return params[0].name + params[1].name; }), share());
    };
    /**
     * Triggered when current theme is changed
     * @returns {Observable<any>}
     */
    NbThemeService.prototype.onThemeChange = function () {
        return this.themeChanges$.pipe(share());
    };
    /**
     * Append a class to nb-layout
     * @param {string} className
     */
    NbThemeService.prototype.appendLayoutClass = function (className) {
        this.appendLayoutClass$.next(className);
    };
    /**
     * Triggered when a new class is added to nb-layout through `appendLayoutClass` method
     * @returns {Observable<any>}
     */
    NbThemeService.prototype.onAppendLayoutClass = function () {
        return this.appendLayoutClass$.pipe(share());
    };
    /**
     * Removes a class from nb-layout
     * @param {string} className
     */
    NbThemeService.prototype.removeLayoutClass = function (className) {
        this.removeLayoutClass$.next(className);
    };
    /**
     * Triggered when a class is removed from nb-layout through `removeLayoutClass` method
     * @returns {Observable<any>}
     */
    NbThemeService.prototype.onRemoveLayoutClass = function () {
        return this.removeLayoutClass$.pipe(share());
    };
    NbThemeService = __decorate$1([
        Injectable(),
        __param(0, Inject(NB_THEME_OPTIONS)),
        __metadata("design:paramtypes", [Object, NbMediaBreakpointsService,
            NbJSThemesRegistry])
    ], NbThemeService);
    return NbThemeService;
}());

var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$3 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$3 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * Service to control the global page spinner.
 */
var NbSpinnerService = /** @class */ (function () {
    function NbSpinnerService(document) {
        this.document = document;
        this.loaders = [];
        this.selector = 'nb-global-spinner';
    }
    /**
     * Appends new loader to the list of loader to be completed before
     * spinner will be hidden
     * @param method Promise<any>
     */
    NbSpinnerService.prototype.registerLoader = function (method) {
        this.loaders.push(method);
    };
    /**
     * Clears the list of loader
     */
    NbSpinnerService.prototype.clear = function () {
        this.loaders = [];
    };
    /**
     * Start the loader process, show spinnder and execute loaders
     */
    NbSpinnerService.prototype.load = function () {
        this.showSpinner();
        this.executeAll();
    };
    NbSpinnerService.prototype.executeAll = function (done) {
        var _this = this;
        if (done === void 0) { done = function () { }; }
        Promise.all(this.loaders).then(function (values) {
            _this.hideSpinner();
            done.call(null, values);
        })
            .catch(function (error) {
            // TODO: Promise.reject
            console.error(error);
        });
    };
    // TODO is there any better way of doing this?
    NbSpinnerService.prototype.showSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'block';
        }
    };
    NbSpinnerService.prototype.hideSpinner = function () {
        var el = this.getSpinnerElement();
        if (el) {
            el.style['display'] = 'none';
        }
    };
    NbSpinnerService.prototype.getSpinnerElement = function () {
        return this.document.getElementById(this.selector);
    };
    NbSpinnerService = __decorate$4([
        Injectable(),
        __param$3(0, Inject(NB_DOCUMENT)),
        __metadata$3("design:paramtypes", [Object])
    ], NbSpinnerService);
    return NbSpinnerService;
}());

var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$4 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$4 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Layout direction.
 * */
var NbLayoutDirection;
(function (NbLayoutDirection) {
    NbLayoutDirection["LTR"] = "ltr";
    NbLayoutDirection["RTL"] = "rtl";
})(NbLayoutDirection || (NbLayoutDirection = {}));

/**
 * Layout direction setting injection token.
 * */
var NB_LAYOUT_DIRECTION = new InjectionToken('Layout direction');
/**
 * Layout Direction Service.
 * Allows to set or get layout direction and listen to its changes
 */
var NbLayoutDirectionService = /** @class */ (function () {
    function NbLayoutDirectionService(direction) {
        if (direction === void 0) { direction = NbLayoutDirection.LTR; }
        this.direction = direction;
        this.$directionChange = new ReplaySubject(1);
        this.setDirection(direction);
    }
    /**
     * Returns true if layout direction set to left to right.
     * @returns boolean.
     * */
    NbLayoutDirectionService.prototype.isLtr = function () {
        return this.direction === NbLayoutDirection.LTR;
    };
    /**
     * Returns true if layout direction set to right to left.
     * @returns boolean.
     * */
    NbLayoutDirectionService.prototype.isRtl = function () {
        return this.direction === NbLayoutDirection.RTL;
    };
    /**
     * Returns current layout direction.
     * @returns NbLayoutDirection.
     * */
    NbLayoutDirectionService.prototype.getDirection = function () {
        return this.direction;
    };
    /**
     * Sets layout direction
     * @param {NbLayoutDirection} direction
     */
    NbLayoutDirectionService.prototype.setDirection = function (direction) {
        this.direction = direction;
        this.$directionChange.next(direction);
    };
    /**
     * Triggered when direction was changed.
     * @returns Observable<NbLayoutDirection>.
     */
    NbLayoutDirectionService.prototype.onDirectionChange = function () {
        return this.$directionChange.pipe(share());
    };
    NbLayoutDirectionService = __decorate$5([
        Injectable(),
        __param$4(0, Optional()), __param$4(0, Inject(NB_LAYOUT_DIRECTION)),
        __metadata$4("design:paramtypes", [Object])
    ], NbLayoutDirectionService);
    return NbLayoutDirectionService;
}());

var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Layout scroll service. Provides information about current scroll position,
 * as well as methods to update position of the scroll.
 *
 * The reason we added this service is that in Nebular there are two scroll modes:
 * - the default mode when scroll is on body
 * - and the `withScroll` mode, when scroll is removed from the body and moved to an element inside of the
 * `nb-layout` component
 */
var NbLayoutScrollService = /** @class */ (function () {
    function NbLayoutScrollService() {
        this.scrollPositionReq$ = new Subject();
        this.manualScroll$ = new Subject();
        this.scroll$ = new Subject();
        this.scrollable$ = new Subject();
    }
    /**
     * Returns scroll position
     *
     * @returns {Observable<NbScrollPosition>}
     */
    NbLayoutScrollService.prototype.getPosition = function () {
        var _this = this;
        return Observable.create(function (observer) {
            var listener = new Subject();
            listener.subscribe(observer);
            _this.scrollPositionReq$.next({ listener: listener });
            return function () { return listener.complete(); };
        });
    };
    /**
     * Sets scroll position
     *
     * @param {number} x
     * @param {number} y
     */
    NbLayoutScrollService.prototype.scrollTo = function (x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        this.manualScroll$.next({ x: x, y: y });
    };
    /**
     * Returns a stream of scroll events
     *
     * @returns {Observable<any>}
     */
    NbLayoutScrollService.prototype.onScroll = function () {
        return this.scroll$.pipe(share());
    };
    /**
     * @private
     * @returns Observable<NbScrollPosition>.
     */
    NbLayoutScrollService.prototype.onManualScroll = function () {
        return this.manualScroll$.pipe(share());
    };
    /**
     * @private
     * @returns {Subject<any>}
     */
    NbLayoutScrollService.prototype.onGetPosition = function () {
        return this.scrollPositionReq$;
    };
    NbLayoutScrollService.prototype.onScrollableChange = function () {
        return this.scrollable$.pipe(share());
    };
    /**
     * @private
     * @param {any} event
     */
    NbLayoutScrollService.prototype.fireScrollChange = function (event) {
        this.scroll$.next(event);
    };
    NbLayoutScrollService.prototype.scrollable = function (scrollable) {
        this.scrollable$.next(scrollable);
    };
    NbLayoutScrollService = __decorate$6([
        Injectable()
    ], NbLayoutScrollService);
    return NbLayoutScrollService;
}());

var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Simple helper service to return Layout dimensions
 * Depending of current Layout scroll mode (default or `withScroll` when scroll is moved to an element
 * inside of the layout) corresponding dimensions will be returns  - of `documentElement` in first case and
 * `.scrollable-container` in the second.
 */
var NbLayoutRulerService = /** @class */ (function () {
    function NbLayoutRulerService() {
        this.contentDimensionsReq$ = new Subject();
    }
    /**
     * Content dimensions
     * @returns {Observable<NbLayoutDimensions>}
     */
    NbLayoutRulerService.prototype.getDimensions = function () {
        var _this = this;
        return Observable.create(function (observer) {
            var listener = new Subject();
            listener.subscribe(observer);
            _this.contentDimensionsReq$.next({ listener: listener });
            return function () { return listener.complete(); };
        });
    };
    /**
     * @private
     * @returns {Subject<any>}
     */
    NbLayoutRulerService.prototype.onGetDimensions = function () {
        return this.contentDimensionsReq$;
    };
    NbLayoutRulerService = __decorate$7([
        Injectable()
    ], NbLayoutRulerService);
    return NbLayoutRulerService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$9 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbSharedModule = /** @class */ (function () {
    function NbSharedModule() {
    }
    NbSharedModule = __decorate$9([
        NgModule({
            exports: [
                CommonModule,
                // TODO: probably we don't need FormsModule in SharedModule
                FormsModule,
                RouterModule,
            ],
        })
    ], NbSharedModule);
    return NbSharedModule;
}());

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$11 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$5 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$5 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Overrides angular cdk focus trap to keep restore functionality inside trap.
 * */
var NbFocusTrap = /** @class */ (function (_super) {
    __extends(NbFocusTrap, _super);
    function NbFocusTrap(element, checker, ngZone, document, deferAnchors) {
        var _this = _super.call(this, element, checker, ngZone, document, deferAnchors) || this;
        _this.element = element;
        _this.checker = checker;
        _this.ngZone = ngZone;
        _this.document = document;
        _this.savePreviouslyFocusedElement();
        return _this;
    }
    NbFocusTrap.prototype.restoreFocus = function () {
        this.previouslyFocusedElement.focus();
        this.destroy();
    };
    NbFocusTrap.prototype.blurPreviouslyFocusedElement = function () {
        this.previouslyFocusedElement.blur();
    };
    NbFocusTrap.prototype.savePreviouslyFocusedElement = function () {
        this.previouslyFocusedElement = this.document.activeElement;
    };
    return NbFocusTrap;
}(FocusTrap));
var NbFocusTrapFactoryService = /** @class */ (function (_super) {
    __extends(NbFocusTrapFactoryService, _super);
    function NbFocusTrapFactoryService(checker, ngZone, document) {
        var _this = _super.call(this, checker, ngZone, document) || this;
        _this.checker = checker;
        _this.ngZone = ngZone;
        _this.document = document;
        return _this;
    }
    NbFocusTrapFactoryService.prototype.create = function (element, deferCaptureElements) {
        return new NbFocusTrap(element, this.checker, this.ngZone, this.document, deferCaptureElements);
    };
    NbFocusTrapFactoryService = __decorate$11([
        Injectable(),
        __param$5(2, Inject(NB_DOCUMENT)),
        __metadata$5("design:paramtypes", [InteractivityChecker,
            NgZone, Object])
    ], NbFocusTrapFactoryService);
    return NbFocusTrapFactoryService;
}(FocusTrapFactory));

var __decorate$10 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbA11yModule = /** @class */ (function () {
    function NbA11yModule() {
    }
    NbA11yModule_1 = NbA11yModule;
    NbA11yModule.forRoot = function () {
        return {
            ngModule: NbA11yModule_1,
            providers: [NbFocusTrapFactoryService],
        };
    };
    var NbA11yModule_1;
    NbA11yModule = NbA11yModule_1 = __decorate$10([
        NgModule({})
    ], NbA11yModule);
    return NbA11yModule;
}());

var __extends$1 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$12 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbPortalDirective = /** @class */ (function (_super) {
    __extends$1(NbPortalDirective, _super);
    function NbPortalDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbPortalDirective = __decorate$12([
        Directive({ selector: '[nbPortal]' })
    ], NbPortalDirective);
    return NbPortalDirective;
}(CdkPortal));
var NbPortalOutletDirective = /** @class */ (function (_super) {
    __extends$1(NbPortalOutletDirective, _super);
    function NbPortalOutletDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbPortalOutletDirective = __decorate$12([
        Directive({ selector: '[nbPortalOutlet]' })
    ], NbPortalOutletDirective);
    return NbPortalOutletDirective;
}(CdkPortalOutlet));
var NbComponentPortal = /** @class */ (function (_super) {
    __extends$1(NbComponentPortal, _super);
    function NbComponentPortal() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbComponentPortal;
}(ComponentPortal));
var NbOverlay = /** @class */ (function (_super) {
    __extends$1(NbOverlay, _super);
    function NbOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbOverlay = __decorate$12([
        Injectable()
    ], NbOverlay);
    return NbOverlay;
}(Overlay));
var NbPlatform = /** @class */ (function (_super) {
    __extends$1(NbPlatform, _super);
    function NbPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbPlatform = __decorate$12([
        Injectable()
    ], NbPlatform);
    return NbPlatform;
}(Platform));
var NbOverlayPositionBuilder = /** @class */ (function (_super) {
    __extends$1(NbOverlayPositionBuilder, _super);
    function NbOverlayPositionBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbOverlayPositionBuilder = __decorate$12([
        Injectable()
    ], NbOverlayPositionBuilder);
    return NbOverlayPositionBuilder;
}(OverlayPositionBuilder));
var NbTemplatePortal = /** @class */ (function (_super) {
    __extends$1(NbTemplatePortal, _super);
    function NbTemplatePortal(template, viewContainerRef, context) {
        return _super.call(this, template, viewContainerRef, context) || this;
    }
    return NbTemplatePortal;
}(TemplatePortal));
var NbOverlayContainer = /** @class */ (function (_super) {
    __extends$1(NbOverlayContainer, _super);
    function NbOverlayContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbOverlayContainer.ngInjectableDef = ɵɵdefineInjectable({ factory: function NbOverlayContainer_Factory() { return new NbOverlayContainer(ɵɵinject(DOCUMENT)); }, token: NbOverlayContainer, providedIn: "root" });
    return NbOverlayContainer;
}(OverlayContainer));
var NbFlexibleConnectedPositionStrategy = /** @class */ (function (_super) {
    __extends$1(NbFlexibleConnectedPositionStrategy, _super);
    function NbFlexibleConnectedPositionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbFlexibleConnectedPositionStrategy;
}(FlexibleConnectedPositionStrategy));
var NbPortalInjector = /** @class */ (function (_super) {
    __extends$1(NbPortalInjector, _super);
    function NbPortalInjector() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbPortalInjector;
}(PortalInjector));
var CDK_MODULES = [OverlayModule, PortalModule];
/**
 * This module helps us to keep all angular/cdk deps inside our cdk module via providing aliases.
 * Approach will help us move cdk in separate npm package and refactor nebular/theme code.
 * */
var NbCdkMappingModule = /** @class */ (function () {
    function NbCdkMappingModule() {
    }
    NbCdkMappingModule_1 = NbCdkMappingModule;
    NbCdkMappingModule.forRoot = function () {
        return {
            ngModule: NbCdkMappingModule_1,
            providers: [
                NbOverlay,
                NbPlatform,
                NbOverlayPositionBuilder,
            ],
        };
    };
    var NbCdkMappingModule_1;
    NbCdkMappingModule = NbCdkMappingModule_1 = __decorate$12([
        NgModule({
            imports: CDK_MODULES.slice(),
            exports: CDK_MODULES.concat([
                NbPortalDirective,
                NbPortalOutletDirective,
            ]),
            declarations: [NbPortalDirective, NbPortalOutletDirective],
        })
    ], NbCdkMappingModule);
    return NbCdkMappingModule;
}());

var __extends$3 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$14 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Provides nb-layout as overlay container.
 * Container has to be cleared when layout destroys.
 * Another way previous version of the container will be used
 * but it isn't inserted in DOM and exists in memory only.
 * This case important only if you switch between multiple layouts.
 * */
var NbOverlayContainerAdapter = /** @class */ (function (_super) {
    __extends$3(NbOverlayContainerAdapter, _super);
    function NbOverlayContainerAdapter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbOverlayContainerAdapter.prototype.setContainer = function (container) {
        this.container = container;
    };
    NbOverlayContainerAdapter.prototype.clearContainer = function () {
        this.container = null;
        this._containerElement = null;
    };
    NbOverlayContainerAdapter.prototype._createContainer = function () {
        var container = this._document.createElement('div');
        container.classList.add('cdk-overlay-container');
        this.container.appendChild(container);
        this._containerElement = container;
    };
    NbOverlayContainerAdapter = __decorate$14([
        Injectable()
    ], NbOverlayContainerAdapter);
    return NbOverlayContainerAdapter;
}(NbOverlayContainer));

var __extends$4 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$15 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$7 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbViewportRulerAdapter = /** @class */ (function (_super) {
    __extends$4(NbViewportRulerAdapter, _super);
    function NbViewportRulerAdapter(platform, ngZone, ruler, scroll) {
        var _this = _super.call(this, platform, ngZone) || this;
        _this.ruler = ruler;
        _this.scroll = scroll;
        return _this;
    }
    NbViewportRulerAdapter.prototype.getViewportSize = function () {
        var res;
        /*
        * getDimensions call is really synchronous operation.
        * And we have to conform with the interface of the original service.
        * */
        this.ruler.getDimensions()
            .pipe(map(function (dimensions) { return ({ width: dimensions.clientWidth, height: dimensions.clientHeight }); }))
            .subscribe(function (rect) { return res = rect; });
        return res;
    };
    NbViewportRulerAdapter.prototype.getViewportScrollPosition = function () {
        var res;
        /*
        * getPosition call is really synchronous operation.
        * And we have to conform with the interface of the original service.
        * */
        this.scroll.getPosition()
            .pipe(map(function (position) { return ({ top: position.y, left: position.x }); }))
            .subscribe(function (position) { return res = position; });
        return res;
    };
    NbViewportRulerAdapter = __decorate$15([
        Injectable(),
        __metadata$7("design:paramtypes", [NbPlatform, NgZone,
            NbLayoutRulerService,
            NbLayoutScrollService])
    ], NbViewportRulerAdapter);
    return NbViewportRulerAdapter;
}(ViewportRuler));

var __decorate$16 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$8 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbGlobalLogicalPosition;
(function (NbGlobalLogicalPosition) {
    NbGlobalLogicalPosition["TOP_START"] = "top-start";
    NbGlobalLogicalPosition["TOP_END"] = "top-end";
    NbGlobalLogicalPosition["BOTTOM_START"] = "bottom-start";
    NbGlobalLogicalPosition["BOTTOM_END"] = "bottom-end";
})(NbGlobalLogicalPosition || (NbGlobalLogicalPosition = {}));
var NbGlobalPhysicalPosition;
(function (NbGlobalPhysicalPosition) {
    NbGlobalPhysicalPosition["TOP_RIGHT"] = "top-right";
    NbGlobalPhysicalPosition["TOP_LEFT"] = "top-left";
    NbGlobalPhysicalPosition["BOTTOM_RIGHT"] = "bottom-right";
    NbGlobalPhysicalPosition["BOTTOM_LEFT"] = "bottom-left";
})(NbGlobalPhysicalPosition || (NbGlobalPhysicalPosition = {}));
var NbPositionHelper = /** @class */ (function () {
    function NbPositionHelper(layoutDirection) {
        this.layoutDirection = layoutDirection;
    }
    NbPositionHelper.prototype.toLogicalPosition = function (position) {
        if (Object.values(NbGlobalLogicalPosition).includes(position)) {
            return position;
        }
        if (this.layoutDirection.isLtr()) {
            return this.toLogicalPositionWhenLtr(position);
        }
        else {
            return this.toLogicalPositionWhenRtl(position);
        }
    };
    NbPositionHelper.prototype.toPhysicalPosition = function (position) {
        if (Object.values(NbGlobalPhysicalPosition).includes(position)) {
            return position;
        }
        if (this.layoutDirection.isLtr()) {
            return this.toPhysicalPositionWhenLtr(position);
        }
        else {
            return this.toPhysicalPositionWhenRtl(position);
        }
    };
    NbPositionHelper.prototype.isTopPosition = function (position) {
        var logicalPosition = this.toLogicalPosition(position);
        return logicalPosition === NbGlobalLogicalPosition.TOP_END
            || logicalPosition === NbGlobalLogicalPosition.TOP_START;
    };
    NbPositionHelper.prototype.isRightPosition = function (position) {
        var physicalPosition = this.toPhysicalPosition(position);
        return physicalPosition === NbGlobalPhysicalPosition.TOP_RIGHT
            || physicalPosition === NbGlobalPhysicalPosition.BOTTOM_RIGHT;
    };
    NbPositionHelper.prototype.toLogicalPositionWhenLtr = function (position) {
        switch (position) {
            case NbGlobalPhysicalPosition.TOP_RIGHT:
                return NbGlobalLogicalPosition.TOP_END;
            case NbGlobalPhysicalPosition.TOP_LEFT:
                return NbGlobalLogicalPosition.TOP_START;
            case NbGlobalPhysicalPosition.BOTTOM_RIGHT:
                return NbGlobalLogicalPosition.BOTTOM_END;
            case NbGlobalPhysicalPosition.BOTTOM_LEFT:
                return NbGlobalLogicalPosition.BOTTOM_START;
        }
    };
    NbPositionHelper.prototype.toLogicalPositionWhenRtl = function (position) {
        switch (position) {
            case NbGlobalPhysicalPosition.TOP_RIGHT:
                return NbGlobalLogicalPosition.TOP_START;
            case NbGlobalPhysicalPosition.TOP_LEFT:
                return NbGlobalLogicalPosition.TOP_END;
            case NbGlobalPhysicalPosition.BOTTOM_RIGHT:
                return NbGlobalLogicalPosition.BOTTOM_START;
            case NbGlobalPhysicalPosition.BOTTOM_LEFT:
                return NbGlobalLogicalPosition.BOTTOM_END;
        }
    };
    NbPositionHelper.prototype.toPhysicalPositionWhenLtr = function (position) {
        switch (position) {
            case NbGlobalLogicalPosition.TOP_START:
                return NbGlobalPhysicalPosition.TOP_LEFT;
            case NbGlobalLogicalPosition.TOP_END:
                return NbGlobalPhysicalPosition.TOP_RIGHT;
            case NbGlobalLogicalPosition.BOTTOM_START:
                return NbGlobalPhysicalPosition.BOTTOM_LEFT;
            case NbGlobalLogicalPosition.BOTTOM_END:
                return NbGlobalPhysicalPosition.BOTTOM_RIGHT;
        }
    };
    NbPositionHelper.prototype.toPhysicalPositionWhenRtl = function (position) {
        switch (position) {
            case NbGlobalLogicalPosition.TOP_START:
                return NbGlobalPhysicalPosition.TOP_RIGHT;
            case NbGlobalLogicalPosition.TOP_END:
                return NbGlobalPhysicalPosition.TOP_LEFT;
            case NbGlobalLogicalPosition.BOTTOM_START:
                return NbGlobalPhysicalPosition.BOTTOM_RIGHT;
            case NbGlobalLogicalPosition.BOTTOM_END:
                return NbGlobalPhysicalPosition.BOTTOM_LEFT;
        }
    };
    NbPositionHelper = __decorate$16([
        Injectable(),
        __metadata$8("design:paramtypes", [NbLayoutDirectionService])
    ], NbPositionHelper);
    return NbPositionHelper;
}());

var __extends$2 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$13 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$6 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$6 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
var NbAdjustment;
(function (NbAdjustment) {
    NbAdjustment["NOOP"] = "noop";
    NbAdjustment["CLOCKWISE"] = "clockwise";
    NbAdjustment["COUNTERCLOCKWISE"] = "counterclockwise";
    NbAdjustment["VERTICAL"] = "vertical";
    NbAdjustment["HORIZONTAL"] = "horizontal";
})(NbAdjustment || (NbAdjustment = {}));
var NbPosition;
(function (NbPosition) {
    NbPosition["TOP"] = "top";
    NbPosition["BOTTOM"] = "bottom";
    NbPosition["LEFT"] = "left";
    NbPosition["RIGHT"] = "right";
    NbPosition["START"] = "start";
    NbPosition["END"] = "end";
})(NbPosition || (NbPosition = {}));
var POSITIONS = (_a = {},
    _a[NbPosition.RIGHT] = function (offset) {
        return { originX: 'end', originY: 'center', overlayX: 'start', overlayY: 'center', offsetX: offset };
    },
    _a[NbPosition.BOTTOM] = function (offset) {
        return { originX: 'center', originY: 'bottom', overlayX: 'center', overlayY: 'top', offsetY: offset };
    },
    _a[NbPosition.LEFT] = function (offset) {
        return { originX: 'start', originY: 'center', overlayX: 'end', overlayY: 'center', offsetX: -offset };
    },
    _a[NbPosition.TOP] = function (offset) {
        return { originX: 'center', originY: 'top', overlayX: 'center', overlayY: 'bottom', offsetY: -offset };
    },
    _a);
var COUNTER_CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.LEFT, NbPosition.BOTTOM, NbPosition.RIGHT];
var NOOP_POSITIONS = [NbPosition.TOP, NbPosition.BOTTOM, NbPosition.LEFT, NbPosition.RIGHT];
var CLOCKWISE_POSITIONS = [NbPosition.TOP, NbPosition.RIGHT, NbPosition.BOTTOM, NbPosition.LEFT];
var VERTICAL_POSITIONS = [NbPosition.BOTTOM, NbPosition.TOP];
var HORIZONTAL_POSITIONS = [NbPosition.START, NbPosition.END];
function comparePositions(p1, p2) {
    return p1.originX === p2.originX
        && p1.originY === p2.originY
        && p1.overlayX === p2.overlayX
        && p1.overlayY === p2.overlayY;
}
/**
 * The main idea of the adjustable connected strategy is to provide predefined set of positions for your overlay.
 * You have to provide adjustment and appropriate strategy will be chosen in runtime.
 * */
var NbAdjustableConnectedPositionStrategy = /** @class */ (function (_super) {
    __extends$2(NbAdjustableConnectedPositionStrategy, _super);
    function NbAdjustableConnectedPositionStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._offset = 15;
        _this.positionChange = _this.positionChanges.pipe(map(function (positionChange) { return positionChange.connectionPair; }), map(function (connectionPair) {
            return _this.appliedPositions.find(function (_a) {
                var connectedPosition = _a.connectedPosition;
                return comparePositions(connectedPosition, connectionPair);
            }).key;
        }));
        return _this;
    }
    NbAdjustableConnectedPositionStrategy.prototype.attach = function (overlayRef) {
        /**
         * We have to apply positions before attach because super.attach() validates positions and crashes app
         * if no positions provided.
         * */
        this.applyPositions();
        _super.prototype.attach.call(this, overlayRef);
    };
    NbAdjustableConnectedPositionStrategy.prototype.apply = function () {
        this.applyPositions();
        _super.prototype.apply.call(this);
    };
    NbAdjustableConnectedPositionStrategy.prototype.position = function (position) {
        this._position = position;
        return this;
    };
    NbAdjustableConnectedPositionStrategy.prototype.adjustment = function (adjustment) {
        this._adjustment = adjustment;
        return this;
    };
    NbAdjustableConnectedPositionStrategy.prototype.offset = function (offset) {
        this._offset = offset;
        return this;
    };
    NbAdjustableConnectedPositionStrategy.prototype.applyPositions = function () {
        var positions = this.createPositions();
        this.persistChosenPositions(positions);
        this.withPositions(this.appliedPositions.map(function (_a) {
            var connectedPosition = _a.connectedPosition;
            return connectedPosition;
        }));
    };
    NbAdjustableConnectedPositionStrategy.prototype.createPositions = function () {
        var _this = this;
        switch (this._adjustment) {
            case NbAdjustment.NOOP:
                return NOOP_POSITIONS.filter(function (position) { return _this._position === position; });
            case NbAdjustment.CLOCKWISE:
                return this.reorderPreferredPositions(CLOCKWISE_POSITIONS);
            case NbAdjustment.COUNTERCLOCKWISE:
                return this.reorderPreferredPositions(COUNTER_CLOCKWISE_POSITIONS);
            case NbAdjustment.HORIZONTAL:
                return this.reorderPreferredPositions(HORIZONTAL_POSITIONS);
            case NbAdjustment.VERTICAL:
                return this.reorderPreferredPositions(VERTICAL_POSITIONS);
        }
    };
    NbAdjustableConnectedPositionStrategy.prototype.persistChosenPositions = function (positions) {
        var _this = this;
        this.appliedPositions = positions.map(function (position) { return ({
            key: position,
            connectedPosition: POSITIONS[position](_this._offset),
        }); });
    };
    NbAdjustableConnectedPositionStrategy.prototype.reorderPreferredPositions = function (positions) {
        var cpy = positions.slice();
        var startIndex = positions.indexOf(this._position);
        var start = cpy.splice(startIndex);
        return start.concat.apply(start, cpy);
    };
    return NbAdjustableConnectedPositionStrategy;
}(NbFlexibleConnectedPositionStrategy));
var NbGlobalPositionStrategy = /** @class */ (function (_super) {
    __extends$2(NbGlobalPositionStrategy, _super);
    function NbGlobalPositionStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbGlobalPositionStrategy.prototype.position = function (position) {
        switch (position) {
            case NbGlobalLogicalPosition.TOP_START:
                return this.top().left();
            case NbGlobalLogicalPosition.TOP_END:
                return this.top().right();
            case NbGlobalLogicalPosition.BOTTOM_START:
                return this.bottom().left();
            case NbGlobalLogicalPosition.BOTTOM_END:
                return this.bottom().right();
        }
    };
    return NbGlobalPositionStrategy;
}(GlobalPositionStrategy));
var NbPositionBuilderService = /** @class */ (function () {
    function NbPositionBuilderService(document, viewportRuler, platform, positionBuilder, overlayContainer) {
        this.document = document;
        this.viewportRuler = viewportRuler;
        this.platform = platform;
        this.positionBuilder = positionBuilder;
        this.overlayContainer = overlayContainer;
    }
    NbPositionBuilderService.prototype.global = function () {
        return new NbGlobalPositionStrategy();
    };
    NbPositionBuilderService.prototype.connectedTo = function (elementRef) {
        return new NbAdjustableConnectedPositionStrategy(elementRef, this.viewportRuler, this.document, this.platform, this.overlayContainer)
            .withFlexibleDimensions(false)
            .withPush(false);
    };
    NbPositionBuilderService = __decorate$13([
        Injectable(),
        __param$6(0, Inject(NB_DOCUMENT)),
        __metadata$6("design:paramtypes", [Object, NbViewportRulerAdapter,
            NbPlatform,
            NbOverlayPositionBuilder,
            NbOverlayContainerAdapter])
    ], NbPositionBuilderService);
    return NbPositionBuilderService;
}());

var __decorate$17 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$9 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbPositionedContainer = /** @class */ (function () {
    function NbPositionedContainer() {
    }
    Object.defineProperty(NbPositionedContainer.prototype, "top", {
        get: function () {
            return this.position === NbPosition.TOP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "right", {
        get: function () {
            return this.position === NbPosition.RIGHT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "bottom", {
        get: function () {
            return this.position === NbPosition.BOTTOM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbPositionedContainer.prototype, "left", {
        get: function () {
            return this.position === NbPosition.LEFT;
        },
        enumerable: true,
        configurable: true
    });
    __decorate$17([
        Input(),
        __metadata$9("design:type", String)
    ], NbPositionedContainer.prototype, "position", void 0);
    __decorate$17([
        HostBinding('class.nb-overlay-top'),
        __metadata$9("design:type", Boolean),
        __metadata$9("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "top", null);
    __decorate$17([
        HostBinding('class.nb-overlay-right'),
        __metadata$9("design:type", Boolean),
        __metadata$9("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "right", null);
    __decorate$17([
        HostBinding('class.nb-overlay-bottom'),
        __metadata$9("design:type", Boolean),
        __metadata$9("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "bottom", null);
    __decorate$17([
        HostBinding('class.nb-overlay-left'),
        __metadata$9("design:type", Boolean),
        __metadata$9("design:paramtypes", [])
    ], NbPositionedContainer.prototype, "left", null);
    return NbPositionedContainer;
}());
var NbOverlayContainerComponent = /** @class */ (function () {
    function NbOverlayContainerComponent(vcr, injector, changeDetectorRef) {
        this.vcr = vcr;
        this.injector = injector;
        this.changeDetectorRef = changeDetectorRef;
        this.isAttached = false;
    }
    Object.defineProperty(NbOverlayContainerComponent.prototype, "isStringContent", {
        get: function () {
            return !!this.content;
        },
        enumerable: true,
        configurable: true
    });
    NbOverlayContainerComponent.prototype.attachComponentPortal = function (portal, context) {
        portal.injector = this.createChildInjector(portal.componentFactoryResolver);
        var componentRef = this.portalOutlet.attachComponentPortal(portal);
        if (context) {
            Object.assign(componentRef.instance, context);
        }
        componentRef.changeDetectorRef.markForCheck();
        componentRef.changeDetectorRef.detectChanges();
        this.isAttached = true;
        return componentRef;
    };
    NbOverlayContainerComponent.prototype.attachTemplatePortal = function (portal) {
        var templateRef = this.portalOutlet.attachTemplatePortal(portal);
        templateRef.detectChanges();
        this.isAttached = true;
        return templateRef;
    };
    NbOverlayContainerComponent.prototype.attachStringContent = function (content) {
        this.content = content;
        this.changeDetectorRef.markForCheck();
        this.changeDetectorRef.detectChanges();
        this.isAttached = true;
    };
    NbOverlayContainerComponent.prototype.detach = function () {
        if (this.portalOutlet.hasAttached()) {
            this.portalOutlet.detach();
        }
        this.attachStringContent(null);
        this.isAttached = false;
    };
    NbOverlayContainerComponent.prototype.createChildInjector = function (cfr) {
        return new NbPortalInjector(this.injector, new WeakMap([
            [ComponentFactoryResolver, cfr],
        ]));
    };
    __decorate$17([
        ViewChild(NbPortalOutletDirective, { static: true }),
        __metadata$9("design:type", NbPortalOutletDirective)
    ], NbOverlayContainerComponent.prototype, "portalOutlet", void 0);
    NbOverlayContainerComponent = __decorate$17([
        Component({
            selector: 'nb-overlay-container',
            template: "\n    <div *ngIf=\"isStringContent\" class=\"primitive-overlay\">{{ content }}</div>\n    <ng-template nbPortalOutlet></ng-template>\n  "
        }),
        __metadata$9("design:paramtypes", [ViewContainerRef,
            Injector, ChangeDetectorRef])
    ], NbOverlayContainerComponent);
    return NbOverlayContainerComponent;
}());

var __decorate$18 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$10 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
function patch(container, containerContext) {
    Object.assign(container.instance, containerContext);
    container.changeDetectorRef.detectChanges();
    return container;
}
function createContainer(ref, container, context, componentFactoryResolver) {
    var containerRef = ref.attach(new NbComponentPortal(container, null, null, componentFactoryResolver));
    patch(containerRef, context);
    return containerRef;
}
var NbOverlayService = /** @class */ (function () {
    function NbOverlayService(overlay, layoutDirection) {
        this.overlay = overlay;
        this.layoutDirection = layoutDirection;
    }
    Object.defineProperty(NbOverlayService.prototype, "scrollStrategies", {
        get: function () {
            return this.overlay.scrollStrategies;
        },
        enumerable: true,
        configurable: true
    });
    NbOverlayService.prototype.create = function (config) {
        var overlayRef = this.overlay.create(config);
        this.layoutDirection.onDirectionChange()
            .subscribe(function (dir) { return overlayRef.setDirection(dir); });
        return overlayRef;
    };
    NbOverlayService = __decorate$18([
        Injectable(),
        __metadata$10("design:paramtypes", [NbOverlay, NbLayoutDirectionService])
    ], NbOverlayService);
    return NbOverlayService;
}());

var __extends$5 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$20 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$11 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbScrollDispatcherAdapter = /** @class */ (function (_super) {
    __extends$5(NbScrollDispatcherAdapter, _super);
    function NbScrollDispatcherAdapter(ngZone, platform, scrollService) {
        var _this = _super.call(this, ngZone, platform) || this;
        _this.scrollService = scrollService;
        return _this;
    }
    NbScrollDispatcherAdapter.prototype.scrolled = function (auditTimeInMs) {
        return this.scrollService.onScroll();
    };
    NbScrollDispatcherAdapter = __decorate$20([
        Injectable(),
        __metadata$11("design:paramtypes", [NgZone, NbPlatform, NbLayoutScrollService])
    ], NbScrollDispatcherAdapter);
    return NbScrollDispatcherAdapter;
}(ScrollDispatcher));

var __extends$6 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$21 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$12 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$7 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Overrides default block scroll strategy because default strategy blocks scrolling on the body only.
 * But Nebular has its own scrollable container - nb-layout. So, we need to block scrolling in it to.
 * */
var NbBlockScrollStrategyAdapter = /** @class */ (function (_super) {
    __extends$6(NbBlockScrollStrategyAdapter, _super);
    function NbBlockScrollStrategyAdapter(document, viewportRuler, scrollService) {
        var _this = _super.call(this, viewportRuler, document) || this;
        _this.scrollService = scrollService;
        return _this;
    }
    NbBlockScrollStrategyAdapter.prototype.enable = function () {
        _super.prototype.enable.call(this);
        this.scrollService.scrollable(false);
    };
    NbBlockScrollStrategyAdapter.prototype.disable = function () {
        _super.prototype.disable.call(this);
        this.scrollService.scrollable(true);
    };
    NbBlockScrollStrategyAdapter = __decorate$21([
        Injectable(),
        __param$7(0, Inject(NB_DOCUMENT)),
        __metadata$12("design:paramtypes", [Object, NbViewportRulerAdapter,
            NbLayoutScrollService])
    ], NbBlockScrollStrategyAdapter);
    return NbBlockScrollStrategyAdapter;
}(BlockScrollStrategy));
var NbScrollStrategyOptions = /** @class */ (function (_super) {
    __extends$6(NbScrollStrategyOptions, _super);
    function NbScrollStrategyOptions(scrollService, scrollDispatcher, viewportRuler, ngZone, document) {
        var _this = _super.call(this, scrollDispatcher, viewportRuler, ngZone, document) || this;
        _this.scrollService = scrollService;
        _this.scrollDispatcher = scrollDispatcher;
        _this.viewportRuler = viewportRuler;
        _this.ngZone = ngZone;
        _this.document = document;
        _this.block = function () { return new NbBlockScrollStrategyAdapter(_this.document, _this.viewportRuler, _this.scrollService); };
        return _this;
    }
    NbScrollStrategyOptions.ngInjectableDef = ɵɵdefineInjectable({ factory: function NbScrollStrategyOptions_Factory() { return new NbScrollStrategyOptions(ɵɵinject(NbLayoutScrollService), ɵɵinject(ScrollDispatcher$1), ɵɵinject(NbViewportRulerAdapter), ɵɵinject(NgZone), ɵɵinject(NB_DOCUMENT)); }, token: NbScrollStrategyOptions, providedIn: "root" });
    NbScrollStrategyOptions = __decorate$21([
        __param$7(4, Inject(NB_DOCUMENT)),
        __metadata$12("design:paramtypes", [NbLayoutScrollService,
            ScrollDispatcher,
            NbViewportRulerAdapter,
            NgZone, Object])
    ], NbScrollStrategyOptions);
    return NbScrollStrategyOptions;
}(ScrollStrategyOptions));

var __decorate$19 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbCdkAdapterModule = /** @class */ (function () {
    function NbCdkAdapterModule() {
    }
    NbCdkAdapterModule_1 = NbCdkAdapterModule;
    NbCdkAdapterModule.forRoot = function () {
        return {
            ngModule: NbCdkAdapterModule_1,
            providers: [
                NbViewportRulerAdapter,
                NbOverlayContainerAdapter,
                NbBlockScrollStrategyAdapter,
                { provide: OverlayContainer, useExisting: NbOverlayContainerAdapter },
                { provide: ScrollDispatcher, useClass: NbScrollDispatcherAdapter },
                { provide: ScrollStrategyOptions, useClass: NbScrollStrategyOptions },
            ],
        };
    };
    var NbCdkAdapterModule_1;
    NbCdkAdapterModule = NbCdkAdapterModule_1 = __decorate$19([
        NgModule({})
    ], NbCdkAdapterModule);
    return NbCdkAdapterModule;
}());

var __extends$7 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$22 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$13 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$8 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbTrigger;
(function (NbTrigger) {
    NbTrigger["NOOP"] = "noop";
    NbTrigger["CLICK"] = "click";
    NbTrigger["HOVER"] = "hover";
    NbTrigger["HINT"] = "hint";
    NbTrigger["FOCUS"] = "focus";
})(NbTrigger || (NbTrigger = {}));
/**
 * TODO maybe we have to use renderer.listen instead of observableFromEvent?
 * Renderer provides capability use it in service worker, ssr and so on.
 * */
var NbTriggerStrategyBase = /** @class */ (function () {
    function NbTriggerStrategyBase(document, host, container) {
        this.document = document;
        this.host = host;
        this.container = container;
        this.destroyed$ = new Subject();
    }
    NbTriggerStrategyBase.prototype.destroy = function () {
        this.destroyed$.next();
    };
    NbTriggerStrategyBase.prototype.isNotOnHostOrContainer = function (event) {
        return !this.isOnHost(event) && !this.isOnContainer(event);
    };
    NbTriggerStrategyBase.prototype.isOnHostOrContainer = function (event) {
        return this.isOnHost(event) || this.isOnContainer(event);
    };
    NbTriggerStrategyBase.prototype.isOnHost = function (_a) {
        var target = _a.target;
        return this.host.contains(target);
    };
    NbTriggerStrategyBase.prototype.isOnContainer = function (_a) {
        var target = _a.target;
        return this.container() && this.container().location.nativeElement.contains(target);
    };
    return NbTriggerStrategyBase;
}());
/**
 * Creates show and hide event streams.
 * Fires toggle event when the click was performed on the host element.
 * Fires close event when the click was performed on the document but
 * not on the host or container.
 * */
var NbClickTriggerStrategy = /** @class */ (function (_super) {
    __extends$7(NbClickTriggerStrategy, _super);
    function NbClickTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // since we should track click for both SHOW and HIDE event we firstly need to track the click and the state
        // of the container and then later on decide should we hide it or show
        // if we track the click & state separately this will case a behavior when the container is getting shown
        // and then hidden right away
        _this.click$ = fromEvent(_this.document, 'click')
            .pipe(map(function (event) { return [!_this.container() && _this.isOnHost(event), event]; }), share(), takeUntil(_this.destroyed$));
        _this.show$ = _this.click$
            .pipe(filter(function (_a) {
            var shouldShow = _a[0];
            return shouldShow;
        }), map(function (_a) {
            var event = _a[1];
            return event;
        }), takeUntil(_this.destroyed$));
        _this.hide$ = _this.click$
            .pipe(filter(function (_a) {
            var shouldShow = _a[0], event = _a[1];
            return !shouldShow && !_this.isOnContainer(event);
        }), map(function (_a) {
            var event = _a[1];
            return event;
        }), takeUntil(_this.destroyed$));
        return _this;
    }
    return NbClickTriggerStrategy;
}(NbTriggerStrategyBase));
/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element and stops out of the host and popover container.
 * */
var NbHoverTriggerStrategy = /** @class */ (function (_super) {
    __extends$7(NbHoverTriggerStrategy, _super);
    function NbHoverTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show$ = fromEvent(_this.host, 'mouseenter')
            .pipe(filter(function () { return !_this.container(); }), delay(100), takeUntil(merge(fromEvent(_this.host, 'mouseleave'), _this.destroyed$)), repeat());
        _this.hide$ = fromEvent(_this.host, 'mouseleave')
            .pipe(switchMap(function () { return fromEvent(_this.document, 'mousemove')
            .pipe(debounceTime(100), takeWhile(function () { return !!_this.container(); }), filter(function (event) { return _this.isNotOnHostOrContainer(event); })); }), takeUntil(_this.destroyed$));
        return _this;
    }
    return NbHoverTriggerStrategy;
}(NbTriggerStrategyBase));
/**
 * Creates show and hide event streams.
 * Fires open event when a mouse hovers over the host element and stay over at least 100 milliseconds.
 * Fires close event when the mouse leaves the host element.
 * */
var NbHintTriggerStrategy = /** @class */ (function (_super) {
    __extends$7(NbHintTriggerStrategy, _super);
    function NbHintTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show$ = fromEvent(_this.host, 'mouseenter')
            .pipe(delay(100), takeUntil(merge(fromEvent(_this.host, 'mouseleave'), _this.destroyed$)), 
        // this `delay & takeUntil & repeat` operators combination is a synonym for `conditional debounce`
        // meaning that if one event occurs in some time after the initial one we won't react to it
        repeat());
        _this.hide$ = fromEvent(_this.host, 'mouseleave')
            .pipe(takeUntil(_this.destroyed$));
        return _this;
    }
    return NbHintTriggerStrategy;
}(NbTriggerStrategyBase));
/**
 * Creates show and hide event streams.
 * Fires open event when a focus is on the host element and stay over at least 100 milliseconds.
 * Fires close event when the focus leaves the host element.
 * */
var NbFocusTriggerStrategy = /** @class */ (function (_super) {
    __extends$7(NbFocusTriggerStrategy, _super);
    function NbFocusTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.focusOut$ = fromEvent(_this.host, 'focusout')
            .pipe(switchMap(function () { return fromEvent(_this.document, 'focusin')
            .pipe(takeWhile(function () { return !!_this.container(); }), filter(function (event) { return _this.isNotOnHostOrContainer(event); })); }), takeUntil(_this.destroyed$));
        _this.clickIn$ = fromEvent(_this.host, 'click')
            .pipe(filter(function () { return !_this.container(); }), takeUntil(_this.destroyed$));
        _this.clickOut$ = fromEvent(_this.document, 'click')
            .pipe(filter(function () { return !!_this.container(); }), filter(function (event) { return _this.isNotOnHostOrContainer(event); }), takeUntil(_this.destroyed$));
        _this.tabKeyPress$ = fromEvent(_this.document, 'keydown')
            .pipe(filter(function (event) { return event.keyCode === 9; }), filter(function () { return !!_this.container(); }), takeUntil(_this.destroyed$));
        _this.show$ = merge(fromEvent(_this.host, 'focusin'), _this.clickIn$)
            .pipe(filter(function () { return !_this.container(); }), debounceTime(100), takeUntil(merge(fromEvent(_this.host, 'focusout'), _this.destroyed$)), repeat());
        _this.hide$ = merge(_this.focusOut$, _this.tabKeyPress$, _this.clickOut$)
            .pipe(takeUntil(_this.destroyed$));
        return _this;
    }
    return NbFocusTriggerStrategy;
}(NbTriggerStrategyBase));
/**
 * Creates empty show and hide event streams.
 * */
var NbNoopTriggerStrategy = /** @class */ (function (_super) {
    __extends$7(NbNoopTriggerStrategy, _super);
    function NbNoopTriggerStrategy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.show$ = EMPTY;
        _this.hide$ = EMPTY;
        return _this;
    }
    return NbNoopTriggerStrategy;
}(NbTriggerStrategyBase));
var NbTriggerStrategyBuilderService = /** @class */ (function () {
    function NbTriggerStrategyBuilderService(_document) {
        this._document = _document;
    }
    NbTriggerStrategyBuilderService.prototype.trigger = function (trigger$$1) {
        this._trigger = trigger$$1;
        return this;
    };
    NbTriggerStrategyBuilderService.prototype.host = function (host) {
        this._host = host;
        return this;
    };
    NbTriggerStrategyBuilderService.prototype.container = function (container) {
        this._container = container;
        return this;
    };
    NbTriggerStrategyBuilderService.prototype.build = function () {
        switch (this._trigger) {
            case NbTrigger.CLICK:
                return new NbClickTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.HINT:
                return new NbHintTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.HOVER:
                return new NbHoverTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.FOCUS:
                return new NbFocusTriggerStrategy(this._document, this._host, this._container);
            case NbTrigger.NOOP:
                return new NbNoopTriggerStrategy(this._document, this._host, this._container);
            default:
                throw new Error('Trigger have to be provided');
        }
    };
    NbTriggerStrategyBuilderService = __decorate$22([
        Injectable(),
        __param$8(0, Inject(NB_DOCUMENT)),
        __metadata$13("design:paramtypes", [Object])
    ], NbTriggerStrategyBuilderService);
    return NbTriggerStrategyBuilderService;
}());

var __decorate$8 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbOverlayModule = /** @class */ (function () {
    function NbOverlayModule() {
    }
    NbOverlayModule_1 = NbOverlayModule;
    NbOverlayModule.forRoot = function () {
        return {
            ngModule: NbOverlayModule_1,
            providers: [
                NbPositionBuilderService,
                NbTriggerStrategyBuilderService,
                NbOverlayService,
                NbPositionHelper
            ].concat(NbCdkMappingModule.forRoot().providers, NbCdkAdapterModule.forRoot().providers, NbA11yModule.forRoot().providers),
        };
    };
    var NbOverlayModule_1;
    NbOverlayModule = NbOverlayModule_1 = __decorate$8([
        NgModule({
            imports: [
                NbCdkMappingModule,
                NbSharedModule,
            ],
            declarations: [NbOverlayContainerComponent],
            exports: [
                NbCdkMappingModule,
                NbCdkAdapterModule,
                NbOverlayContainerComponent,
            ],
        })
    ], NbOverlayModule);
    return NbOverlayModule;
}());

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
function nbWindowFactory() {
    return window;
}
var NbThemeModule = /** @class */ (function () {
    function NbThemeModule() {
    }
    NbThemeModule_1 = NbThemeModule;
    // TODO: check the options (throw exception?)
    /**
     * Main Theme Module
     *
     * @param nbThemeOptions {NbThemeOptions} Main theme options
     * @param nbJSThemes {NbJSThemeOptions[]} List of JS Themes, will be merged with default themes
     * @param nbMediaBreakpoints {NbMediaBreakpoint} Available media breakpoints
     * @param layoutDirection {NbLayoutDirection} Layout direction
     *
     * @returns {ModuleWithProviders}
     */
    NbThemeModule.forRoot = function (nbThemeOptions, nbJSThemes, nbMediaBreakpoints, layoutDirection) {
        if (nbThemeOptions === void 0) { nbThemeOptions = { name: 'default' }; }
        return {
            ngModule: NbThemeModule_1,
            providers: [
                { provide: NB_THEME_OPTIONS, useValue: nbThemeOptions || {} },
                { provide: NB_BUILT_IN_JS_THEMES, useValue: BUILT_IN_THEMES },
                { provide: NB_JS_THEMES, useValue: nbJSThemes || [] },
                { provide: NB_MEDIA_BREAKPOINTS, useValue: nbMediaBreakpoints || DEFAULT_MEDIA_BREAKPOINTS },
                { provide: NB_WINDOW, useFactory: nbWindowFactory },
                { provide: NB_DOCUMENT, useExisting: DOCUMENT },
                NbJSThemesRegistry,
                NbThemeService,
                NbMediaBreakpointsService,
                NbSpinnerService,
                { provide: NB_LAYOUT_DIRECTION, useValue: layoutDirection || NbLayoutDirection.LTR },
                NbLayoutDirectionService,
                NbLayoutScrollService,
                NbLayoutRulerService
            ].concat(NbOverlayModule.forRoot().providers),
        };
    };
    var NbThemeModule_1;
    NbThemeModule = NbThemeModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
            ],
            exports: [],
        })
    ], NbThemeModule);
    return NbThemeModule;
}());

var NbIconPackType;
(function (NbIconPackType) {
    NbIconPackType["SVG"] = "svg";
    NbIconPackType["FONT"] = "font";
})(NbIconPackType || (NbIconPackType = {}));

var NbFontIcon = /** @class */ (function () {
    function NbFontIcon(name, content, params) {
        if (params === void 0) { params = {}; }
        this.name = name;
        this.content = content;
        this.params = params;
    }
    NbFontIcon.prototype.getClasses = function (options) {
        var classes = [];
        if (this.params.packClass) {
            classes.push(this.params.packClass);
        }
        var name = this.params.iconClassPrefix ? this.params.iconClassPrefix + "-" + this.name : this.name;
        classes.push(name);
        return classes;
    };
    NbFontIcon.prototype.getContent = function (options) {
        return this.content;
    };
    return NbFontIcon;
}());
var NbSvgIcon = /** @class */ (function () {
    function NbSvgIcon(name, content, params) {
        if (params === void 0) { params = {}; }
        this.name = name;
        this.content = content;
        this.params = params;
    }
    NbSvgIcon.prototype.getClasses = function (options) {
        var classes = [];
        if (this.params.packClass) {
            classes.push(this.params.packClass);
        }
        return classes;
    };
    NbSvgIcon.prototype.getContent = function (options) {
        return this.content;
    };
    return NbSvgIcon;
}());

var __decorate$26 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbIconDefinition = /** @class */ (function () {
    function NbIconDefinition() {
    }
    return NbIconDefinition;
}());
function throwPackNotFoundError(name) {
    throw Error("Icon Pack '" + name + "' is not registered");
}
function throwNoDefaultPackError() {
    throw Error('Default pack is not registered.');
}
function throwIconNotFoundError(name, pack) {
    throw Error("Icon '" + name + "' is not registered in pack '" + pack + "'. Check icon name or consider switching icon pack.");
}
function throwWrongPackTypeError(name, type, desiredType) {
    throw Error("Pack '" + name + "' is not an '" + desiredType + "' Pack and its type is '" + type + "'");
}
/**
 * This service allows to register multiple icon packs to use them later within `<nb-icon></nb-icon>` component.
 */
var NbIconLibraries = /** @class */ (function () {
    function NbIconLibraries() {
        this.packs = new Map();
    }
    /**
     * Registers new Svg icon pack
     * @param {string} name
     * @param {NbIcon} icons
     * @param {NbIconPackParams} params
     */
    NbIconLibraries.prototype.registerSvgPack = function (name, icons, params) {
        if (params === void 0) { params = {}; }
        this.packs.set(name, {
            name: name,
            icons: new Map(Object.entries(icons)),
            params: params,
            type: NbIconPackType.SVG,
        });
    };
    /**
     * Registers new font pack
     * @param {string} name
     * @param {NbIconPackParams} params
     */
    NbIconLibraries.prototype.registerFontPack = function (name, params) {
        if (params === void 0) { params = {}; }
        this.packs.set(name, {
            name: name,
            params: params,
            icons: new Map(),
            type: NbIconPackType.FONT,
        });
    };
    /**
     * Returns pack by name
     * @param {string} name
     */
    NbIconLibraries.prototype.getPack = function (name) {
        return this.packs.get(name);
    };
    /**
     * Sets pack as a default
     * @param {string} name
     */
    NbIconLibraries.prototype.setDefaultPack = function (name) {
        if (!this.packs.has(name)) {
            throwPackNotFoundError(name);
        }
        this.defaultPack = this.packs.get(name);
    };
    /**
     * Returns Svg icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    NbIconLibraries.prototype.getSvgIcon = function (name, pack) {
        var iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type !== NbIconPackType.SVG) {
            throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'SVG');
        }
        var icon = this.getIconFromPack(name, iconsPack);
        return {
            name: name,
            pack: iconsPack.name,
            type: NbIconPackType.SVG,
            icon: this.createSvgIcon(name, icon, iconsPack.params),
        };
    };
    /**
     * Returns Font icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    NbIconLibraries.prototype.getFontIcon = function (name, pack) {
        var iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type !== NbIconPackType.FONT) {
            throwWrongPackTypeError(iconsPack.name, iconsPack.type, 'Font');
        }
        var icon = this.getIconFromPack(name, iconsPack, false);
        return {
            name: name,
            pack: iconsPack.name,
            type: NbIconPackType.FONT,
            icon: this.createFontIcon(name, icon ? icon : '', iconsPack.params),
        };
    };
    /**
     * Returns an icon
     * @param {string} name
     * @param {string} pack
     *
     * @returns NbIconDefinition
     */
    NbIconLibraries.prototype.getIcon = function (name, pack) {
        var iconsPack = pack ? this.getPackOrThrow(pack) : this.getDefaultPackOrThrow();
        if (iconsPack.type === NbIconPackType.SVG) {
            return this.getSvgIcon(name, pack);
        }
        return this.getFontIcon(name, pack);
    };
    NbIconLibraries.prototype.createSvgIcon = function (name, content, params) {
        return content instanceof NbSvgIcon ? content : new NbSvgIcon(name, content, params);
    };
    NbIconLibraries.prototype.createFontIcon = function (name, content, params) {
        return content instanceof NbFontIcon ? content : new NbFontIcon(name, content, params);
    };
    NbIconLibraries.prototype.getPackOrThrow = function (name) {
        var pack = this.packs.get(name);
        if (!pack) {
            throwPackNotFoundError(name);
        }
        return pack;
    };
    NbIconLibraries.prototype.getDefaultPackOrThrow = function () {
        if (!this.defaultPack) {
            throwNoDefaultPackError();
        }
        return this.defaultPack;
    };
    NbIconLibraries.prototype.getIconFromPack = function (name, pack, shouldThrow) {
        if (shouldThrow === void 0) { shouldThrow = true; }
        if (shouldThrow && !pack.icons.has(name)) {
            throwIconNotFoundError(name, pack.name);
        }
        return pack.icons.get(name);
    };
    NbIconLibraries.ngInjectableDef = ɵɵdefineInjectable({ factory: function NbIconLibraries_Factory() { return new NbIconLibraries(); }, token: NbIconLibraries, providedIn: "root" });
    NbIconLibraries = __decorate$26([
        Injectable({ providedIn: 'root' })
    ], NbIconLibraries);
    return NbIconLibraries;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$25 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$15 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Icon component. Allows to render both `svg` and `font` icons.
 * Starting from Nebular 4.0 uses [Eva Icons](https://akveo.github.io/eva-icons/) pack by default.
 *
 * Basic icon example:
 * @stacked-example(Showcase, icon/icon-showcase.component)
 *
 * Icon configuration:
 *
 * ```html
 * <nb-icon icon="star"></nb-icon>
 * ```
 * ### Installation
 *
 * By default Nebular comes without any pre-installed icon pack.
 * Starting with Nebular 4.0.0 we ship separate package called `@nebular/eva-icons`
 * which integrates SVG [Eva Icons](https://akveo.github.io/eva-icons/) pack to Nebular. To add it to your
 * project run:
 * ```sh
 * npm i @nebular/eva-icons@next
 * ```
 * This command will install Nebular Eva Icons pack. Then register `NbEvaIconsModule` into your app module or any child
 * module you need to have the icons in:
 * ```ts
 * import { NbEvaIconsModule } form '@nebular/eva-icons';
 *
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbEvaIconsModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * Last thing, import `NbIconModule` to your feature module where you need to show an icon:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbIconModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Icon can be colored using `status` input:
 * ```html
 * <nb-icon icon="star" status="warning"></nb-icon>
 * ```
 *
 * Colored icons:
 * @stacked-example(Colored Icons, icon/icon-colors.component)
 *
 * In case you need to specify an icon from a specific icon pack, this could be done using `pack` input property:
 * ```html
 * <nb-icon icon="star" pack="font-awesome"></nb-icon>
 * ```
 * Additional icon settings (if available by the icon pack) could be passed using `options` input:
 *
 * ```html
 * <nb-icon icon="star" [options]="{ animation: { type: 'zoom' } }"></nb-icon>
 * ```
 *
 * @styles
 *
 * icon-font-size:
 * icon-line-height:
 * icon-width:
 * icon-height:
 * icon-primary-color:
 * icon-info-color:
 * icon-success-color:
 * icon-warning-color:
 * icon-danger-color:
 */
var NbIconComponent = /** @class */ (function () {
    function NbIconComponent(sanitizer, iconLibrary, el, renderer) {
        this.sanitizer = sanitizer;
        this.iconLibrary = iconLibrary;
        this.el = el;
        this.renderer = renderer;
        this.prevClasses = [];
    }
    Object.defineProperty(NbIconComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbIconComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbIconComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbIconComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbIconComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    NbIconComponent.prototype.ngOnInit = function () {
        this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
    };
    NbIconComponent.prototype.ngOnChanges = function () {
        if (this.iconDef) {
            this.iconDef = this.renderIcon(this.icon, this.pack, this.options);
        }
    };
    NbIconComponent.prototype.renderIcon = function (name, pack, options) {
        var iconDefinition = this.iconLibrary.getIcon(name, pack);
        var content = iconDefinition.icon.getContent(options);
        if (content) {
            this.html = this.sanitizer.bypassSecurityTrustHtml(content);
        }
        this.assignClasses(iconDefinition.icon.getClasses(options));
        return iconDefinition;
    };
    NbIconComponent.prototype.assignClasses = function (classes) {
        var _this = this;
        this.prevClasses.forEach(function (className) {
            _this.renderer.removeClass(_this.el.nativeElement, className);
        });
        classes.forEach(function (className) {
            _this.renderer.addClass(_this.el.nativeElement, className);
        });
        this.prevClasses = classes;
    };
    __decorate$25([
        HostBinding('innerHtml'),
        __metadata$15("design:type", Object)
    ], NbIconComponent.prototype, "html", void 0);
    __decorate$25([
        HostBinding('class.status-primary'),
        __metadata$15("design:type", Object),
        __metadata$15("design:paramtypes", [])
    ], NbIconComponent.prototype, "primary", null);
    __decorate$25([
        HostBinding('class.status-info'),
        __metadata$15("design:type", Object),
        __metadata$15("design:paramtypes", [])
    ], NbIconComponent.prototype, "info", null);
    __decorate$25([
        HostBinding('class.status-success'),
        __metadata$15("design:type", Object),
        __metadata$15("design:paramtypes", [])
    ], NbIconComponent.prototype, "success", null);
    __decorate$25([
        HostBinding('class.status-warning'),
        __metadata$15("design:type", Object),
        __metadata$15("design:paramtypes", [])
    ], NbIconComponent.prototype, "warning", null);
    __decorate$25([
        HostBinding('class.status-danger'),
        __metadata$15("design:type", Object),
        __metadata$15("design:paramtypes", [])
    ], NbIconComponent.prototype, "danger", null);
    __decorate$25([
        Input(),
        __metadata$15("design:type", String)
    ], NbIconComponent.prototype, "icon", void 0);
    __decorate$25([
        Input(),
        __metadata$15("design:type", String)
    ], NbIconComponent.prototype, "pack", void 0);
    __decorate$25([
        Input(),
        __metadata$15("design:type", Object)
    ], NbIconComponent.prototype, "options", void 0);
    __decorate$25([
        Input(),
        __metadata$15("design:type", String)
    ], NbIconComponent.prototype, "status", void 0);
    NbIconComponent = __decorate$25([
        Component({
            selector: 'nb-icon',
            template: '',
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:inline-block}\n"]
        }),
        __metadata$15("design:paramtypes", [DomSanitizer,
            NbIconLibraries,
            ElementRef,
            Renderer2])
    ], NbIconComponent);
    return NbIconComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$24 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$14 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbIconModule = /** @class */ (function () {
    function NbIconModule(iconsLibrary) {
        this.iconsLibrary = iconsLibrary;
        this.essentialsPackName = 'nebular-essentials';
        // in case of consequent calls we don't need to enable `nebular-essentials` pack again
        if (this.iconsLibrary.getPack(this.essentialsPackName)) {
            return;
        }
        // tslint:disable:max-line-length
        this.iconsLibrary.registerSvgPack(this.essentialsPackName, {
            'chevron-down-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-down"><rect width="24" height="24" opacity="0"/><path d="M12 15.5a1 1 0 0 1-.71-.29l-4-4a1 1 0 1 1 1.42-1.42L12 13.1l3.3-3.18a1 1 0 1 1 1.38 1.44l-4 3.86a1 1 0 0 1-.68.28z"/></g></g></svg>',
            'chevron-up-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-up"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M16 14.5a1 1 0 0 1-.71-.29L12 10.9l-3.3 3.18a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.42l4-3.86a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.42 1 1 0 0 1-.69.28z"/></g></g></svg>',
            'chevron-left-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-left"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M13.36 17a1 1 0 0 1-.72-.31l-3.86-4a1 1 0 0 1 0-1.4l4-4a1 1 0 1 1 1.42 1.42L10.9 12l3.18 3.3a1 1 0 0 1 0 1.41 1 1 0 0 1-.72.29z"/></g></g></svg>',
            'chevron-right-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="chevron-right"><rect width="24" height="24" transform="rotate(-90 12 12)" opacity="0"/><path d="M10.5 17a1 1 0 0 1-.71-.29 1 1 0 0 1 0-1.42L13.1 12 9.92 8.69a1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0l3.86 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-.7.32z"/></g></g></svg>',
            'checkmark-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="checkmark"><rect width="24" height="24" opacity="0"/><path d="M9.86 18a1 1 0 0 1-.73-.32l-4.86-5.17a1 1 0 1 1 1.46-1.37l4.12 4.39 8.41-9.2a1 1 0 1 1 1.48 1.34l-9.14 10a1 1 0 0 1-.73.33z"/></g></g></svg>',
            'paper-plane-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="paper-plane"><rect width="24" height="24" opacity="0"/><path d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z"/></g></g></svg>',
            'file-text-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="file-text"><rect width="24" height="24" opacity="0"/><path d="M15 16H9a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"/><path d="M9 14h3a1 1 0 0 0 0-2H9a1 1 0 0 0 0 2z"/><path d="M19.74 8.33l-5.44-6a1 1 0 0 0-.74-.33h-7A2.53 2.53 0 0 0 4 4.5v15A2.53 2.53 0 0 0 6.56 22h10.88A2.53 2.53 0 0 0 20 19.5V9a1 1 0 0 0-.26-.67zM14 5l2.74 3h-2a.79.79 0 0 1-.74-.85zm3.44 15H6.56a.53.53 0 0 1-.56-.5v-15a.53.53 0 0 1 .56-.5H12v3.15A2.79 2.79 0 0 0 14.71 10H18v9.5a.53.53 0 0 1-.56.5z"/></g></g></svg>',
            'alert-triangle-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="alert-triangle"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M22.56 16.3L14.89 3.58a3.43 3.43 0 0 0-5.78 0L1.44 16.3a3 3 0 0 0-.05 3A3.37 3.37 0 0 0 4.33 21h15.34a3.37 3.37 0 0 0 2.94-1.66 3 3 0 0 0-.05-3.04zm-1.7 2.05a1.31 1.31 0 0 1-1.19.65H4.33a1.31 1.31 0 0 1-1.19-.65 1 1 0 0 1 0-1l7.68-12.73a1.48 1.48 0 0 1 2.36 0l7.67 12.72a1 1 0 0 1 .01 1.01z"/><circle cx="12" cy="16" r="1"/><path d="M12 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"/></g></g></svg>',
            'question-mark-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="question-mark"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"/><circle cx="12" cy="19" r="1"/></g></g></svg>',
            'email-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="email"><rect width="24" height="24" opacity="0"/><path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"/></g></g></svg>',
            'flash-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="flash"><rect width="24" height="24" opacity="0"/><path d="M11.11 23a1 1 0 0 1-.34-.06 1 1 0 0 1-.65-1.05l.77-7.09H5a1 1 0 0 1-.83-1.56l7.89-11.8a1 1 0 0 1 1.17-.38 1 1 0 0 1 .65 1l-.77 7.14H19a1 1 0 0 1 .83 1.56l-7.89 11.8a1 1 0 0 1-.83.44zM6.87 12.8H12a1 1 0 0 1 .74.33 1 1 0 0 1 .25.78l-.45 4.15 4.59-6.86H12a1 1 0 0 1-1-1.11l.45-4.15z"/></g></g></svg>',
            'search-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="search"><rect width="24" height="24" opacity="0"/><path d="M20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42zM5 11a6 6 0 1 1 6 6 6 6 0 0 1-6-6z"/></g></g></svg>',
            'close-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>',
            'collapse-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="collapse"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 9h-2.58l3.29-3.29a1 1 0 1 0-1.42-1.42L15 7.57V5a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2z"/><path d="M10 13H5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L9 16.42V19a1 1 0 0 0 1 1 1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/></g></g></svg>',
            'expand-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="expand"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M20 5a1 1 0 0 0-1-1h-5a1 1 0 0 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L18 7.42V10a1 1 0 0 0 1 1 1 1 0 0 0 1-1z"/><path d="M10.71 13.29a1 1 0 0 0-1.42 0L6 16.57V14a1 1 0 0 0-1-1 1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H7.42l3.29-3.29a1 1 0 0 0 0-1.42z"/></g></g></svg>',
            'minus-outline': '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="100%" height="100%" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="minus"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M19 13H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2z"/></g></g></svg>',
            'minus-bold-outline': '<svg xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" viewBox="0 0 8 2" width="100%" height="100%"><defs><rect id="nb-mbo" y="3" width="8" height="2" rx="1"/></defs><use xlink:href="#nb-mbo" transform="translate(0 -3)" fill-rule="evenodd"/></svg>',
            'checkmark-bold-outline': '<svg xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" viewBox="0 0 8 7" width="100%" height="100%"><defs><path id="nb-cbo" d="M6.039 1.43a1.11 1.11 0 0 1 1.517-.228c.483.342.588.998.234 1.466L4.431 7.1a1 1 0 0 1-1.492.115L.317 4.677a1.023 1.023 0 0 1 .002-1.483 1.113 1.113 0 0 1 1.535.002l1.641 1.59L6.04 1.428z"/></defs><use xlink:href="#nb-cbo" transform="translate(0 -1)" fill-rule="evenodd"/></svg>',
            'arrow-back': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/></g></g></svg>',
        });
        // tslint:enable:max-line-length
    }
    NbIconModule = __decorate$24([
        NgModule({
            imports: [
                CommonModule,
            ],
            declarations: [
                NbIconComponent,
            ],
            exports: [
                NbIconComponent,
            ],
        }),
        __metadata$14("design:paramtypes", [NbIconLibraries])
    ], NbIconModule);
    return NbIconModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$27 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$16 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var NbCardHeaderComponent = /** @class */ (function () {
    function NbCardHeaderComponent() {
    }
    NbCardHeaderComponent = __decorate$27([
        Component({
            selector: 'nb-card-header',
            template: "<ng-content></ng-content>"
        })
    ], NbCardHeaderComponent);
    return NbCardHeaderComponent;
}());
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset body section.
 */
var NbCardBodyComponent = /** @class */ (function () {
    function NbCardBodyComponent() {
    }
    NbCardBodyComponent = __decorate$27([
        Component({
            selector: 'nb-card-body',
            template: "<ng-content></ng-content>"
        })
    ], NbCardBodyComponent);
    return NbCardBodyComponent;
}());
/**
 * Component intended to be used within  the `<nb-card>` component.
 * Adds styles for a preset footer section.
 */
var NbCardFooterComponent = /** @class */ (function () {
    function NbCardFooterComponent() {
    }
    NbCardFooterComponent = __decorate$27([
        Component({
            selector: 'nb-card-footer',
            template: "<ng-content></ng-content>"
        })
    ], NbCardFooterComponent);
    return NbCardFooterComponent;
}());
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
var NbCardComponent = /** @class */ (function () {
    function NbCardComponent() {
        this._size = '';
        this._status = '';
    }
    Object.defineProperty(NbCardComponent.prototype, "size", {
        /**
         * Card size, available sizes:
         * tiny, small, medium, large, giant
         */
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "status", {
        /**
         * Card status:
         * primary, info, success, warning, danger
         */
        get: function () {
            return this._status;
        },
        set: function (value) {
            this._status = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "accent", {
        /**
         * Card accent (color of the top border):
         * primary, info, success, warning, danger
         */
        get: function () {
            return this._accent;
        },
        set: function (value) {
            this._accent = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "hasAccent", {
        get: function () {
            return this.accent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "primaryAccent", {
        get: function () {
            return this.accent === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "infoAccent", {
        get: function () {
            return this.accent === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "successAccent", {
        get: function () {
            return this.accent === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "warningAccent", {
        get: function () {
            return this.accent === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCardComponent.prototype, "dangerAccent", {
        get: function () {
            return this.accent === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    __decorate$27([
        Input(),
        __metadata$16("design:type", String),
        __metadata$16("design:paramtypes", [String])
    ], NbCardComponent.prototype, "size", null);
    __decorate$27([
        Input(),
        __metadata$16("design:type", String),
        __metadata$16("design:paramtypes", [String])
    ], NbCardComponent.prototype, "status", null);
    __decorate$27([
        Input(),
        __metadata$16("design:type", String),
        __metadata$16("design:paramtypes", [String])
    ], NbCardComponent.prototype, "accent", null);
    __decorate$27([
        HostBinding('class.size-tiny'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "tiny", null);
    __decorate$27([
        HostBinding('class.size-small'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "small", null);
    __decorate$27([
        HostBinding('class.size-medium'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "medium", null);
    __decorate$27([
        HostBinding('class.size-large'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "large", null);
    __decorate$27([
        HostBinding('class.size-giant'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "giant", null);
    __decorate$27([
        HostBinding('class.status-primary'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "primary", null);
    __decorate$27([
        HostBinding('class.status-info'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "info", null);
    __decorate$27([
        HostBinding('class.status-success'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "success", null);
    __decorate$27([
        HostBinding('class.status-warning'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "warning", null);
    __decorate$27([
        HostBinding('class.status-danger'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "danger", null);
    __decorate$27([
        HostBinding('class.accent'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "hasAccent", null);
    __decorate$27([
        HostBinding('class.accent-primary'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "primaryAccent", null);
    __decorate$27([
        HostBinding('class.accent-info'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "infoAccent", null);
    __decorate$27([
        HostBinding('class.accent-success'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "successAccent", null);
    __decorate$27([
        HostBinding('class.accent-warning'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "warningAccent", null);
    __decorate$27([
        HostBinding('class.accent-danger'),
        __metadata$16("design:type", Object),
        __metadata$16("design:paramtypes", [])
    ], NbCardComponent.prototype, "dangerAccent", null);
    NbCardComponent = __decorate$27([
        Component({
            selector: 'nb-card',
            template: "\n    <ng-content select=\"nb-card-header\"></ng-content>\n    <ng-content select=\"nb-card-body\"></ng-content>\n    <ng-content></ng-content>\n    <ng-content select=\"nb-card-footer\"></ng-content>\n  ",
            styles: [":host{display:flex;flex-direction:column}\n"]
        })
    ], NbCardComponent);
    return NbCardComponent;
}());

var __decorate$28 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$17 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * Reveal card example:
 * @stacked-example(My example, reveal-card/reveal-card-showcase.component)
 *
 * As a content Reveal card accepts two instances of `nb-card` - for front and back sides.
 *
 * Basic reveal card configuration:
 *
 * ```html
 * <nb-reveal-card>
 *   <nb-card-front>
 *     <nb-card>
 *       <nb-card-body>
 *         Front
 *       </nb-card-body>
 *     </nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card>
 *       <nb-card-body>
 *         Back
 *       </nb-card-body>
 *     </nb-card>
 *   </nb-card-back>
 * </nb-reveal-card>
 * ```
 *
 * ### Installation
 *
 * Import `NbCardModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbCardModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Reveal Card with header and footer:
 * @stacked-example(With Header & Footer, reveal-card/reveal-card-full.component)
 *
 * Colored reveal-cards could be simply configured by providing a `status` property:
 * @stacked-example(Colored Card, reveal-card/reveal-card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Card, reveal-card/reveal-card-accents.component)
 *
 * @additional-example(Multiple Sizes, reveal-card/reveal-card-sizes.component)
 */
var NbRevealCardComponent = /** @class */ (function () {
    function NbRevealCardComponent() {
        /**
         * Reveal state
         * @type boolean
         */
        this.revealed = false;
        /**
         * Show/hide toggle button to be able to control toggle from your code
         * @type {boolean}
         */
        this.showToggleButton = true;
    }
    NbRevealCardComponent.prototype.toggle = function () {
        this.revealed = !this.revealed;
    };
    __decorate$28([
        Input(),
        HostBinding('class.revealed'),
        __metadata$17("design:type", Boolean)
    ], NbRevealCardComponent.prototype, "revealed", void 0);
    __decorate$28([
        Input(),
        __metadata$17("design:type", Object)
    ], NbRevealCardComponent.prototype, "showToggleButton", void 0);
    NbRevealCardComponent = __decorate$28([
        Component({
            selector: 'nb-reveal-card',
            template: "\n    <ng-content select=\"nb-card-front\"></ng-content>\n    <div class=\"second-card-container\">\n      <ng-content select=\"nb-card-back\"></ng-content>\n    </div>\n    <a *ngIf=\"showToggleButton\" class=\"reveal-button\" (click)=\"toggle()\">\n      <nb-icon icon=\"chevron-down-outline\" pack=\"nebular-essentials\" aria-hidden=\"true\"></nb-icon>\n    </a>\n  ",
            styles: [":host{display:block;position:relative;overflow:hidden}:host.revealed .second-card-container{top:0;transition:none}:host.revealed .second-card-container ::ng-deep nb-card-back{top:0}:host.revealed .reveal-button{transform:none}:host ::ng-deep nb-card-front{display:block;height:100%}:host .second-card-container{position:absolute;top:100%;right:0;left:0;overflow:hidden;transition:top 0s 0.5s}:host .second-card-container ::ng-deep nb-card-back{position:absolute;left:0;top:100%;width:100%;transition:top 0.5s}:host .reveal-button{cursor:pointer;position:absolute;right:0;bottom:0;transform:rotate(180deg);transition:transform 0.3s}\n"]
        })
    ], NbRevealCardComponent);
    return NbRevealCardComponent;
}());

var __decorate$29 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$18 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * Flip card example:
 * @stacked-example(Showcase, flip-card/flip-card-showcase.component)
 *
 * As a content Flip card accepts two instances of `nb-card` - for front and back sides.
 *
 * Basic flip card configuration:
 *
 * ```html
 * <nb-flip-card>
 *   <nb-card-front>
 *     <nb-card>
 *       <nb-card-body>
 *         Front
 *       </nb-card-body>
 *     </nb-card>
 *   </nb-card-front>
 *   <nb-card-back>
 *     <nb-card>
 *       <nb-card-body>
 *         Back
 *       </nb-card-body>
 *     </nb-card>
 *   </nb-card-back>
 * </nb-flip-card>
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
 * Flip Card with header and footer:
 * @stacked-example(With Header & Footer, flip-card/flip-card-full.component.ts)
 *
 * Colored flip-cards could be simply configured by providing a `status` property:
 * @stacked-example(Colored Card, flip-card/flip-card-colors.component)
 *
 * It is also possible to assign an `accent` property for a slight card highlight
 * as well as combine it with `status`:
 * @stacked-example(Accent Card, flip-card/flip-card-accents.component)
 *
 * @additional-example(Multiple Sizes, flip-card/flip-card-sizes.component)
 *
 */
var NbFlipCardComponent = /** @class */ (function () {
    function NbFlipCardComponent() {
        /**
         * Flip state
         * @type boolean
         */
        this.flipped = false;
        /**
         * Show/hide toggle button to be able to control toggle from your code
         * @type {boolean}
         */
        this.showToggleButton = true;
    }
    NbFlipCardComponent.prototype.toggle = function () {
        this.flipped = !this.flipped;
    };
    __decorate$29([
        Input(),
        HostBinding('class.flipped'),
        __metadata$18("design:type", Boolean)
    ], NbFlipCardComponent.prototype, "flipped", void 0);
    __decorate$29([
        Input(),
        __metadata$18("design:type", Object)
    ], NbFlipCardComponent.prototype, "showToggleButton", void 0);
    NbFlipCardComponent = __decorate$29([
        Component({
            selector: 'nb-flip-card',
            template: "\n    <div class=\"flipcard-body\">\n      <div class=\"front-container\">\n        <ng-content select=\"nb-card-front\"></ng-content>\n        <a *ngIf=\"showToggleButton\" class=\"flip-button\" (click)=\"toggle()\">\n          <nb-icon icon=\"chevron-left-outline\" pack=\"nebular-essentials\" aria-hidden=\"true\"></nb-icon>\n        </a>\n      </div>\n      <div class=\"back-container\">\n        <ng-content select=\"nb-card-back\"></ng-content>\n        <a *ngIf=\"showToggleButton\" class=\"flip-button\" (click)=\"toggle()\">\n          <nb-icon icon=\"chevron-left-outline\" pack=\"nebular-essentials\" aria-hidden=\"true\"></nb-icon>\n        </a>\n      </div>\n    </div>\n  ",
            styles: [":host{display:block;perspective:1200px;position:relative}:host-context(.flipped) .flipcard-body{transform:rotateY(-180deg)}:host-context(.flipped) .flipcard-body .front-container{opacity:0;transition:opacity 0s 0.25s;backface-visibility:hidden}:host-context(.flipped) .flipcard-body .front-container .flip-button{opacity:0;z-index:-1}:host-context(.flipped) .flipcard-body .back-container{backface-visibility:visible}.flipcard-body{display:flex;transition:transform 0.5s;transform-style:preserve-3d}.flipcard-body .front-container,.flipcard-body .back-container{flex:1}.flipcard-body .front-container .flip-button,.flipcard-body .back-container .flip-button{cursor:pointer;position:absolute;right:0;bottom:0;opacity:1;transition:opacity 0s 0.15s}.flipcard-body .front-container{backface-visibility:visible;transition:opacity 0s 0.2s}.flipcard-body .back-container{backface-visibility:hidden;transform:rotateY(180deg)}\n"]
        })
    ], NbFlipCardComponent);
    return NbFlipCardComponent;
}());

var __decorate$30 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` components.
 *
 * Use it as a container for the front card.
 */
var NbCardFrontComponent = /** @class */ (function () {
    function NbCardFrontComponent() {
    }
    NbCardFrontComponent = __decorate$30([
        Component({
            selector: 'nb-card-front',
            template: '<ng-content select="nb-card"></ng-content>'
        })
    ], NbCardFrontComponent);
    return NbCardFrontComponent;
}());
/**
 * Component intended to be used within the `<nb-flip-card>` and `<nb-reveal-card>` components.
 *
 * Use it as a container for the back card.
 */
var NbCardBackComponent = /** @class */ (function () {
    function NbCardBackComponent() {
    }
    NbCardBackComponent = __decorate$30([
        Component({
            selector: 'nb-card-back',
            template: '<ng-content select="nb-card"></ng-content>'
        })
    ], NbCardBackComponent);
    return NbCardBackComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$23 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_CARD_COMPONENTS = [
    NbCardComponent,
    NbCardBodyComponent,
    NbCardFooterComponent,
    NbCardHeaderComponent,
    NbRevealCardComponent,
    NbFlipCardComponent,
    NbCardFrontComponent,
    NbCardBackComponent,
];
var NbCardModule = /** @class */ (function () {
    function NbCardModule() {
    }
    NbCardModule = __decorate$23([
        NgModule({
            imports: [
                NbSharedModule,
                NbIconModule,
            ],
            declarations: NB_CARD_COMPONENTS.slice(),
            exports: NB_CARD_COMPONENTS.slice(),
        })
    ], NbCardModule);
    return NbCardModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbCalendarViewMode;
(function (NbCalendarViewMode) {
    NbCalendarViewMode["YEAR"] = "year";
    NbCalendarViewMode["MONTH"] = "month";
    NbCalendarViewMode["DATE"] = "date";
})(NbCalendarViewMode || (NbCalendarViewMode = {}));
var NbCalendarSize;
(function (NbCalendarSize) {
    NbCalendarSize["MEDIUM"] = "medium";
    NbCalendarSize["LARGE"] = "large";
})(NbCalendarSize || (NbCalendarSize = {}));

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$32 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$19 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Calendar component provides a capability to choose a date.
 *
 * ```html
 * <nb-calendar [(date)]="date"></nb-calendar>
 * <nb-calendar [date]="date" (dateChange)="handleDateChange($event)"></nb-calendar>
 * ```
 *
 * Basic usage example
 * @stacked-example(Showcase, calendar/calendar-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCalendarModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCalendarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to select ranges you can use `NbCalendarRangeComponent`.
 *
 * ```html
 * <nb-calendar-range [(range)]="range"></nb-calendar-range>
 * <nb-calendar-range [range]="range" (rangeChange)="handleRangeChange($event)"></nb-calendar-range>
 * ```
 *
 * In order to use it, you have to import `NbCalendarRangeModule`.
 * @stacked-example(Range, calendar/calendar-range-showcase.component)
 *
 * The calendar component is supplied with a calendar header that contains navigate today button.
 * If you do not want to use it you can hide calendar header using `showHeader` property.
 * @stacked-example(Header, calendar/calendar-without-header.component)
 *
 * As you can see in the basic usage example calendar contains previous and next month days
 * which can be disabled using `boundingMonth` property.
 * @stacked-example(Bounding months, calendar/calendar-bounding-month.component)
 *
 * You can define starting view of the calendar by setting `startView` property.
 * Available values: year, month and date.
 * @stacked-example(Start view, calendar/calendar-start-view.component)
 *
 * You can use a larger version of the calendar by defining size property.
 * Available values: medium(which is default) and large.
 * @stacked-example(Size, calendar/calendar-size.component)
 *
 * Calendar supports min and max dates which disables values out of min-max range.
 * @stacked-example(Borders, calendar/calendar-min-max.component)
 *
 * Also, you can define custom filter property that should be predicate which receives
 * date and returns false if this date has to be disabled. In this example, we provide the filter
 * which disables weekdays.
 * @stacked-example(Filter, calendar/calendar-filter.component)
 *
 * If you need create custom cells you can easily provide custom components for
 * calendar. For examples if you want to show any average price under each date you can
 * just provide custom `dayCellComponent`. Custom cells for month and year can be provided
 * the same way, check API reference.
 * @stacked-example(Custom day cell, calendar/calendar-custom-day-cell-showcase.component)
 *
 * @styles
 *
 * calendar-width:
 * calendar-body-height:
 * calendar-border-radius:
 * calendar-text-color:
 * calendar-text-font-family:
 * calendar-text-font-size:
 * calendar-text-font-weight:
 * calendar-text-line-height:
 * calendar-header-text-color:
 * calendar-header-text-font-family:
 * calendar-header-title-text-font-size:
 * calendar-header-title-text-font-weight:
 * calendar-header-title-text-line-height:
 * calendar-header-sub-title-text-font-size:
 * calendar-header-sub-title-text-font-weight:
 * calendar-header-sub-title-text-line-height:
 * calendar-navigation-button-width:
 * calendar-cell-inactive-text-color:
 * calendar-cell-in-range-background-color:
 * calendar-cell-disabled-background-color:
 * calendar-cell-disabled-text-color:
 * calendar-cell-selected-background-color:
 * calendar-cell-selected-text-color:
 * calendar-cell-selected-text-font-size:
 * calendar-cell-selected-text-font-weight:
 * calendar-cell-selected-text-line-height:
 * calendar-cell-hover-background-color:
 * calendar-cell-hover-text-color:
 * calendar-cell-hover-text-font-size:
 * calendar-cell-hover-text-font-weight:
 * calendar-cell-hover-text-line-height:
 * calendar-cell-active-background-color:
 * calendar-cell-active-text-color:
 * calendar-cell-active-text-font-size:
 * calendar-cell-active-text-font-weight:
 * calendar-cell-active-text-line-height:
 * calendar-cell-today-background-color:
 * calendar-cell-today-text-color:
 * calendar-cell-today-text-font-size:
 * calendar-cell-today-text-font-weight:
 * calendar-cell-today-text-line-height:
 * calendar-day-cell-width:
 * calendar-day-cell-height:
 * calendar-month-cell-width:
 * calendar-month-cell-height:
 * calendar-year-cell-width:
 * calendar-year-cell-height:
 * calendar-weekday-width:
 * calendar-weekday-height:
 * calendar-weekday-text-color:
 * calendar-weekday-text-font-size:
 * calendar-weekday-text-font-weight:
 * calendar-weekday-text-line-height:
 * calendar-weekday-holiday-text-color:
 * calendar-large-width:
 * calendar-large-body-height:
 * calendar-day-cell-large-width:
 * calendar-day-cell-large-height:
 * calendar-month-cell-large-width:
 * calendar-month-cell-large-height:
 * calendar-year-cell-large-width:
 * calendar-year-cell-large-height:
 * */
var NbCalendarComponent = /** @class */ (function () {
    function NbCalendarComponent() {
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines starting view for calendar.
         * */
        this.startView = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Determines should we show calendars header or not.
         * */
        this.showHeader = true;
        /**
         * Emits date when selected.
         * */
        this.dateChange = new EventEmitter();
    }
    __decorate$32([
        Input(),
        __metadata$19("design:type", Boolean)
    ], NbCalendarComponent.prototype, "boundingMonth", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", String)
    ], NbCalendarComponent.prototype, "startView", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Object)
    ], NbCalendarComponent.prototype, "min", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Object)
    ], NbCalendarComponent.prototype, "max", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Function)
    ], NbCalendarComponent.prototype, "filter", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Type)
    ], NbCalendarComponent.prototype, "dayCellComponent", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Type)
    ], NbCalendarComponent.prototype, "monthCellComponent", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Type)
    ], NbCalendarComponent.prototype, "yearCellComponent", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", String)
    ], NbCalendarComponent.prototype, "size", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Object)
    ], NbCalendarComponent.prototype, "visibleDate", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Boolean)
    ], NbCalendarComponent.prototype, "showHeader", void 0);
    __decorate$32([
        Input(),
        __metadata$19("design:type", Object)
    ], NbCalendarComponent.prototype, "date", void 0);
    __decorate$32([
        Output(),
        __metadata$19("design:type", EventEmitter)
    ], NbCalendarComponent.prototype, "dateChange", void 0);
    NbCalendarComponent = __decorate$32([
        Component({
            selector: 'nb-calendar',
            template: "\n    <nb-base-calendar\n      [boundingMonth]=\"boundingMonth\"\n      [startView]=\"startView\"\n      [date]=\"date\"\n      [min]=\"min\"\n      [max]=\"max\"\n      [filter]=\"filter\"\n      [dayCellComponent]=\"dayCellComponent\"\n      [monthCellComponent]=\"monthCellComponent\"\n      [yearCellComponent]=\"yearCellComponent\"\n      [size]=\"size\"\n      [visibleDate]=\"visibleDate\"\n      [showHeader]=\"showHeader\"\n      (dateChange)=\"dateChange.emit($event)\"\n    ></nb-base-calendar>\n  "
        })
    ], NbCalendarComponent);
    return NbCalendarComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
function convertToBoolProperty(val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === '');
    }
    return !!val;
}

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$36 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$20 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate$36([
        Input(),
        __metadata$20("design:type", String)
    ], NbButtonComponent.prototype, "size", void 0);
    __decorate$36([
        Input(),
        __metadata$20("design:type", String)
    ], NbButtonComponent.prototype, "status", void 0);
    __decorate$36([
        Input(),
        __metadata$20("design:type", String)
    ], NbButtonComponent.prototype, "shape", void 0);
    __decorate$36([
        Input(),
        __metadata$20("design:type", String)
    ], NbButtonComponent.prototype, "appearance", void 0);
    __decorate$36([
        Input(),
        HostBinding('class.appearance-filled'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "filled", null);
    __decorate$36([
        Input(),
        HostBinding('class.appearance-outline'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "outline", null);
    __decorate$36([
        Input(),
        HostBinding('class.appearance-ghost'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "ghost", null);
    __decorate$36([
        Input(),
        HostBinding('class.appearance-hero'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "hero", null);
    __decorate$36([
        Input(),
        HostBinding('class.full-width'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "fullWidth", null);
    __decorate$36([
        Input(),
        HostBinding('attr.aria-disabled'),
        HostBinding('class.btn-disabled'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [Boolean])
    ], NbButtonComponent.prototype, "disabled", null);
    __decorate$36([
        HostBinding('attr.tabindex'),
        __metadata$20("design:type", String),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "tabbable", null);
    __decorate$36([
        HostBinding('class.size-tiny'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "tiny", null);
    __decorate$36([
        HostBinding('class.size-small'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "small", null);
    __decorate$36([
        HostBinding('class.size-medium'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "medium", null);
    __decorate$36([
        HostBinding('class.size-large'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "large", null);
    __decorate$36([
        HostBinding('class.size-giant'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "giant", null);
    __decorate$36([
        HostBinding('class.status-primary'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "primary", null);
    __decorate$36([
        HostBinding('class.status-info'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "info", null);
    __decorate$36([
        HostBinding('class.status-success'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "success", null);
    __decorate$36([
        HostBinding('class.status-warning'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "warning", null);
    __decorate$36([
        HostBinding('class.status-danger'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "danger", null);
    __decorate$36([
        HostBinding('class.shape-rectangle'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "rectangle", null);
    __decorate$36([
        HostBinding('class.shape-round'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "round", null);
    __decorate$36([
        HostBinding('class.shape-semi-round'),
        __metadata$20("design:type", Object),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "semiRound", null);
    __decorate$36([
        HostBinding('class.icon-start'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "iconLeft", null);
    __decorate$36([
        HostBinding('class.icon-end'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "iconRight", null);
    __decorate$36([
        HostBinding('class.transitions'),
        __metadata$20("design:type", Boolean),
        __metadata$20("design:paramtypes", [])
    ], NbButtonComponent.prototype, "transitions", null);
    __decorate$36([
        HostListener('click', ['$event']),
        __metadata$20("design:type", Function),
        __metadata$20("design:paramtypes", [Event]),
        __metadata$20("design:returntype", void 0)
    ], NbButtonComponent.prototype, "onClick", null);
    NbButtonComponent = __decorate$36([
        Component({
            selector: 'button[nbButton],a[nbButton],input[type="button"][nbButton],input[type="submit"][nbButton]',
            template: "\n    <ng-content></ng-content>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{appearance:none;text-align:center;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;white-space:nowrap;vertical-align:middle;user-select:none}:host:hover,:host:focus{text-decoration:none}:host.full-width{width:100%}:host ::ng-deep nb-icon{vertical-align:top}[dir=ltr] :host.icon-start:not(.icon-end) ::ng-deep nb-icon{margin-right:.75rem}[dir=rtl] :host.icon-start:not(.icon-end) ::ng-deep nb-icon{margin-left:.75rem}[dir=ltr] :host.icon-end:not(.icon-start) ::ng-deep nb-icon{margin-left:.75rem}[dir=rtl] :host.icon-end:not(.icon-start) ::ng-deep nb-icon{margin-right:.75rem}:host(.transitions){transition-duration:0.15s;transition-property:background-color,border-color,box-shadow,color;transition-timing-function:ease-in}\n"]
        }),
        __metadata$20("design:paramtypes", [Renderer2,
            ElementRef,
            ChangeDetectorRef])
    ], NbButtonComponent);
    return NbButtonComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$35 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_BUTTON_COMPONENTS = [
    NbButtonComponent,
];
var NbButtonModule = /** @class */ (function () {
    function NbButtonModule() {
    }
    NbButtonModule = __decorate$35([
        NgModule({
            imports: [
                NbSharedModule,
            ],
            declarations: NB_BUTTON_COMPONENTS.slice(),
            exports: NB_BUTTON_COMPONENTS.slice(),
        })
    ], NbButtonModule);
    return NbButtonModule;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbDateService = /** @class */ (function () {
    function NbDateService() {
        this.DAYS_IN_WEEK = 7;
    }
    NbDateService.prototype.setLocale = function (locale) {
        this.locale = locale;
    };
    /**
     * Checks if the date is between the start date and the end date.
     * */
    NbDateService.prototype.isBetween = function (date, start, end) {
        return this.compareDates(date, start) > 0 && this.compareDates(date, end) < 0;
    };
    
    /**
     * Checks is two dates have the same day.
     * */
    NbDateService.prototype.isSameDaySafe = function (date1, date2) {
        return date1 && date2 && this.isSameDay(date1, date2);
    };
    
    /**
     * Checks is two dates have the same month.
     * */
    NbDateService.prototype.isSameMonthSafe = function (date1, date2) {
        return date1 && date2 && this.isSameMonth(date1, date2);
    };
    /**
     * Checks is two dates have the same year.
     * */
    NbDateService.prototype.isSameYearSafe = function (date1, date2) {
        return date1 && date2 && this.isSameYear(date1, date2);
    };
    return NbDateService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var batch = function (target, batchSize, offset) {
    if (offset === void 0) { offset = 0; }
    return target.reduce(function (res, item, index) {
        var chunkIndex = Math.floor((index + offset) / batchSize);
        if (!res[chunkIndex]) {
            res[chunkIndex] = [];
        }
        res[chunkIndex].push(item);
        return res;
    }, []);
};
/**
 * returns array with numbers from zero to bound.
 * */
var range = function (bound, producer) {
    if (producer === void 0) { producer = function (i) { return i; }; }
    var arr = [];
    for (var i = 0; i < bound; i++) {
        arr.push(producer(i));
    }
    return arr;
};

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$37 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$21 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarMonthModelService = /** @class */ (function () {
    function NbCalendarMonthModelService(dateService) {
        this.dateService = dateService;
    }
    NbCalendarMonthModelService.prototype.createDaysGrid = function (activeMonth, boundingMonth) {
        if (boundingMonth === void 0) { boundingMonth = true; }
        var weeks = this.createDates(activeMonth);
        return this.withBoundingMonths(weeks, activeMonth, boundingMonth);
    };
    NbCalendarMonthModelService.prototype.createDates = function (activeMonth) {
        var days = this.createDateRangeForMonth(activeMonth);
        var startOfWeekDayDiff = this.getStartOfWeekDayDiff(activeMonth);
        return batch(days, this.dateService.DAYS_IN_WEEK, startOfWeekDayDiff);
    };
    NbCalendarMonthModelService.prototype.withBoundingMonths = function (weeks, activeMonth, boundingMonth) {
        var withBoundingMonths = weeks;
        if (this.isShouldAddPrevBoundingMonth(withBoundingMonths)) {
            withBoundingMonths = this.addPrevBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
        }
        if (this.isShouldAddNextBoundingMonth(withBoundingMonths)) {
            withBoundingMonths = this.addNextBoundingMonth(withBoundingMonths, activeMonth, boundingMonth);
        }
        return withBoundingMonths;
    };
    NbCalendarMonthModelService.prototype.addPrevBoundingMonth = function (weeks, activeMonth, boundingMonth) {
        var firstWeek = weeks.shift();
        var requiredItems = this.dateService.DAYS_IN_WEEK - firstWeek.length;
        firstWeek.unshift.apply(firstWeek, this.createPrevBoundingDays(activeMonth, boundingMonth, requiredItems));
        return [firstWeek].concat(weeks);
    };
    NbCalendarMonthModelService.prototype.addNextBoundingMonth = function (weeks, activeMonth, boundingMonth) {
        var lastWeek = weeks.pop();
        var requiredItems = this.dateService.DAYS_IN_WEEK - lastWeek.length;
        lastWeek.push.apply(lastWeek, this.createNextBoundingDays(activeMonth, boundingMonth, requiredItems));
        return weeks.concat([lastWeek]);
    };
    NbCalendarMonthModelService.prototype.createPrevBoundingDays = function (activeMonth, boundingMonth, requiredItems) {
        var month = this.dateService.addMonth(activeMonth, -1);
        var daysInMonth = this.dateService.getNumberOfDaysInMonth(month);
        return this.createDateRangeForMonth(month)
            .slice(daysInMonth - requiredItems)
            .map(function (date) { return boundingMonth ? date : null; });
    };
    NbCalendarMonthModelService.prototype.createNextBoundingDays = function (activeMonth, boundingMonth, requiredItems) {
        var month = this.dateService.addMonth(activeMonth, 1);
        return this.createDateRangeForMonth(month)
            .slice(0, requiredItems)
            .map(function (date) { return boundingMonth ? date : null; });
    };
    NbCalendarMonthModelService.prototype.getStartOfWeekDayDiff = function (date) {
        var startOfMonth = this.dateService.getMonthStart(date);
        return this.getWeekStartDiff(startOfMonth);
    };
    NbCalendarMonthModelService.prototype.getWeekStartDiff = function (date) {
        return (7 - this.dateService.getFirstDayOfWeek() + this.dateService.getDayOfWeek(date)) % 7;
    };
    NbCalendarMonthModelService.prototype.isShouldAddPrevBoundingMonth = function (weeks) {
        return weeks[0].length < this.dateService.DAYS_IN_WEEK;
    };
    NbCalendarMonthModelService.prototype.isShouldAddNextBoundingMonth = function (weeks) {
        return weeks[weeks.length - 1].length < this.dateService.DAYS_IN_WEEK;
    };
    NbCalendarMonthModelService.prototype.createDateRangeForMonth = function (date) {
        var _this = this;
        var daysInMonth = this.dateService.getNumberOfDaysInMonth(date);
        return range(daysInMonth, function (i) {
            var year = _this.dateService.getYear(date);
            var month = _this.dateService.getMonth(date);
            return _this.dateService.createDate(year, month, i + 1);
        });
    };
    NbCalendarMonthModelService = __decorate$37([
        Injectable(),
        __metadata$21("design:paramtypes", [NbDateService])
    ], NbCalendarMonthModelService);
    return NbCalendarMonthModelService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$38 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$22 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarDayCellComponent = /** @class */ (function () {
    function NbCalendarDayCellComponent(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    Object.defineProperty(NbCalendarDayCellComponent.prototype, "today", {
        get: function () {
            return this.dateService.isSameDaySafe(this.date, this.dateService.today());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayCellComponent.prototype, "boundingMonth", {
        get: function () {
            return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayCellComponent.prototype, "selected", {
        get: function () {
            return this.dateService.isSameDaySafe(this.date, this.selectedValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayCellComponent.prototype, "empty", {
        get: function () {
            return !this.date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayCellComponent.prototype, "disabled", {
        get: function () {
            return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayCellComponent.prototype, "day", {
        get: function () {
            return this.date && this.dateService.getDate(this.date);
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarDayCellComponent.prototype.onClick = function () {
        if (this.disabled || this.empty) {
            return;
        }
        this.select.emit(this.date);
    };
    NbCalendarDayCellComponent.prototype.smallerThanMin = function () {
        return this.date && this.min && this.dateService.compareDates(this.date, this.min) < 0;
    };
    NbCalendarDayCellComponent.prototype.greaterThanMax = function () {
        return this.date && this.max && this.dateService.compareDates(this.date, this.max) > 0;
    };
    NbCalendarDayCellComponent.prototype.dontFitFilter = function () {
        return this.date && this.filter && !this.filter(this.date);
    };
    __decorate$38([
        Input(),
        __metadata$22("design:type", Object)
    ], NbCalendarDayCellComponent.prototype, "date", void 0);
    __decorate$38([
        Input(),
        __metadata$22("design:type", Object)
    ], NbCalendarDayCellComponent.prototype, "selectedValue", void 0);
    __decorate$38([
        Input(),
        __metadata$22("design:type", Object)
    ], NbCalendarDayCellComponent.prototype, "visibleDate", void 0);
    __decorate$38([
        Input(),
        __metadata$22("design:type", Object)
    ], NbCalendarDayCellComponent.prototype, "min", void 0);
    __decorate$38([
        Input(),
        __metadata$22("design:type", Object)
    ], NbCalendarDayCellComponent.prototype, "max", void 0);
    __decorate$38([
        Input(),
        __metadata$22("design:type", Function)
    ], NbCalendarDayCellComponent.prototype, "filter", void 0);
    __decorate$38([
        Output(),
        __metadata$22("design:type", EventEmitter)
    ], NbCalendarDayCellComponent.prototype, "select", void 0);
    __decorate$38([
        HostBinding('class.today'),
        __metadata$22("design:type", Boolean),
        __metadata$22("design:paramtypes", [])
    ], NbCalendarDayCellComponent.prototype, "today", null);
    __decorate$38([
        HostBinding('class.bounding-month'),
        __metadata$22("design:type", Boolean),
        __metadata$22("design:paramtypes", [])
    ], NbCalendarDayCellComponent.prototype, "boundingMonth", null);
    __decorate$38([
        HostBinding('class.selected'),
        __metadata$22("design:type", Boolean),
        __metadata$22("design:paramtypes", [])
    ], NbCalendarDayCellComponent.prototype, "selected", null);
    __decorate$38([
        HostBinding('class.empty'),
        __metadata$22("design:type", Boolean),
        __metadata$22("design:paramtypes", [])
    ], NbCalendarDayCellComponent.prototype, "empty", null);
    __decorate$38([
        HostBinding('class.disabled'),
        __metadata$22("design:type", Boolean),
        __metadata$22("design:paramtypes", [])
    ], NbCalendarDayCellComponent.prototype, "disabled", null);
    __decorate$38([
        HostListener('click'),
        __metadata$22("design:type", Function),
        __metadata$22("design:paramtypes", []),
        __metadata$22("design:returntype", void 0)
    ], NbCalendarDayCellComponent.prototype, "onClick", null);
    NbCalendarDayCellComponent = __decorate$38([
        Component({
            selector: 'nb-calendar-day-cell',
            template: '{{ day }}',
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { 'class': 'day-cell' }
        }),
        __metadata$22("design:paramtypes", [NbDateService])
    ], NbCalendarDayCellComponent);
    return NbCalendarDayCellComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$39 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$23 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Provides capability pick days.
 * */
var NbCalendarDayPickerComponent = /** @class */ (function () {
    function NbCalendarDayPickerComponent(monthModel) {
        this.monthModel = monthModel;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonths = true;
        this.cellComponent = NbCalendarDayCellComponent;
        /**
         * Size of the component.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Fires newly selected date.
         * */
        this.dateChange = new EventEmitter();
    }
    Object.defineProperty(NbCalendarDayPickerComponent.prototype, "setCellComponent", {
        /**
         * Custom day cell component. Have to implement `NbCalendarCell` interface.
         * */
        set: function (cellComponent) {
            if (cellComponent) {
                this.cellComponent = cellComponent;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayPickerComponent.prototype, "medium", {
        get: function () {
            return this.size === NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarDayPickerComponent.prototype, "large", {
        get: function () {
            return this.size === NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarDayPickerComponent.prototype.ngOnChanges = function (_a) {
        var visibleDate = _a.visibleDate;
        if (visibleDate) {
            this.weeks = this.monthModel.createDaysGrid(this.visibleDate, this.boundingMonths);
        }
    };
    NbCalendarDayPickerComponent.prototype.onSelect = function (day) {
        this.dateChange.emit(day);
    };
    __decorate$39([
        Input(),
        __metadata$23("design:type", Object)
    ], NbCalendarDayPickerComponent.prototype, "visibleDate", void 0);
    __decorate$39([
        Input(),
        __metadata$23("design:type", Boolean)
    ], NbCalendarDayPickerComponent.prototype, "boundingMonths", void 0);
    __decorate$39([
        Input(),
        __metadata$23("design:type", Object)
    ], NbCalendarDayPickerComponent.prototype, "min", void 0);
    __decorate$39([
        Input(),
        __metadata$23("design:type", Object)
    ], NbCalendarDayPickerComponent.prototype, "max", void 0);
    __decorate$39([
        Input(),
        __metadata$23("design:type", Function)
    ], NbCalendarDayPickerComponent.prototype, "filter", void 0);
    __decorate$39([
        Input('cellComponent'),
        __metadata$23("design:type", Type),
        __metadata$23("design:paramtypes", [Type])
    ], NbCalendarDayPickerComponent.prototype, "setCellComponent", null);
    __decorate$39([
        Input(),
        __metadata$23("design:type", String)
    ], NbCalendarDayPickerComponent.prototype, "size", void 0);
    __decorate$39([
        Input(),
        __metadata$23("design:type", Object)
    ], NbCalendarDayPickerComponent.prototype, "date", void 0);
    __decorate$39([
        Output(),
        __metadata$23("design:type", Object)
    ], NbCalendarDayPickerComponent.prototype, "dateChange", void 0);
    __decorate$39([
        HostBinding('class.medium'),
        __metadata$23("design:type", Object),
        __metadata$23("design:paramtypes", [])
    ], NbCalendarDayPickerComponent.prototype, "medium", null);
    __decorate$39([
        HostBinding('class.large'),
        __metadata$23("design:type", Object),
        __metadata$23("design:paramtypes", [])
    ], NbCalendarDayPickerComponent.prototype, "large", null);
    NbCalendarDayPickerComponent = __decorate$39([
        Component({
            selector: 'nb-calendar-day-picker',
            template: "\n    <nb-calendar-days-names></nb-calendar-days-names>\n    <nb-calendar-picker\n      [data]=\"weeks\"\n      [visibleDate]=\"visibleDate\"\n      [selectedValue]=\"date\"\n      [cellComponent]=\"cellComponent\"\n      [min]=\"min\"\n      [max]=\"max\"\n      [filter]=\"filter\"\n      (select)=\"onSelect($event)\">\n    </nb-calendar-picker>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [" :host { display: block; } "]
        }),
        __metadata$23("design:paramtypes", [NbCalendarMonthModelService])
    ], NbCalendarDayPickerComponent);
    return NbCalendarDayPickerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$40 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$24 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarDaysNamesComponent = /** @class */ (function () {
    function NbCalendarDaysNamesComponent(dateService) {
        this.dateService = dateService;
    }
    NbCalendarDaysNamesComponent.prototype.ngOnInit = function () {
        var days = this.createDaysNames();
        this.days = this.shiftStartOfWeek(days);
    };
    NbCalendarDaysNamesComponent.prototype.createDaysNames = function () {
        return this.dateService.getDayOfWeekNames()
            .map(this.markIfHoliday);
    };
    NbCalendarDaysNamesComponent.prototype.shiftStartOfWeek = function (days) {
        for (var i = 0; i < this.dateService.getFirstDayOfWeek(); i++) {
            days.push(days.shift());
        }
        return days;
    };
    NbCalendarDaysNamesComponent.prototype.markIfHoliday = function (name, i) {
        return { name: name, isHoliday: i % 6 === 0 };
    };
    NbCalendarDaysNamesComponent = __decorate$40([
        Component({
            selector: 'nb-calendar-days-names',
            template: "\n    <div class=\"day\" *ngFor=\"let day of days\" [class.holiday]=\"day.isHoliday\">{{ day.name }}</div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:flex;justify-content:space-between}:host .day{display:flex;align-items:center;justify-content:center;margin:1px}\n"]
        }),
        __metadata$24("design:paramtypes", [NbDateService])
    ], NbCalendarDaysNamesComponent);
    return NbCalendarDaysNamesComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$41 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$25 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarHeaderComponent = /** @class */ (function () {
    function NbCalendarHeaderComponent(directionService, dateService) {
        this.directionService = directionService;
        this.dateService = dateService;
        this.navigateToday = new EventEmitter();
        this.date = this.dateService.today();
    }
    Object.defineProperty(NbCalendarHeaderComponent.prototype, "isRtl", {
        get: function () {
            return this.directionService.isRtl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarHeaderComponent.prototype, "isLtr", {
        get: function () {
            return this.directionService.isLtr();
        },
        enumerable: true,
        configurable: true
    });
    __decorate$41([
        Input(),
        __metadata$25("design:type", Object)
    ], NbCalendarHeaderComponent.prototype, "date", void 0);
    __decorate$41([
        Output(),
        __metadata$25("design:type", EventEmitter)
    ], NbCalendarHeaderComponent.prototype, "navigateToday", void 0);
    NbCalendarHeaderComponent = __decorate$41([
        Component({
            selector: 'nb-calendar-header',
            template: "\n    <div class=\"header\">\n      <span class=\"title\" (click)=\"navigateToday.emit()\">\n        {{ date | date: 'mediumDate' }}\n        <i [ngClass]=\"{ 'nb-arrow-dropright': isLtr, 'nb-arrow-dropleft': isRtl }\"></i>\n      </span>\n      <span class=\"sub-title\">Today</span>\n    </div>\n  "
        }),
        __metadata$25("design:paramtypes", [NbLayoutDirectionService, NbDateService])
    ], NbCalendarHeaderComponent);
    return NbCalendarHeaderComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$42 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$26 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarMonthCellComponent = /** @class */ (function () {
    function NbCalendarMonthCellComponent(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    Object.defineProperty(NbCalendarMonthCellComponent.prototype, "selected", {
        get: function () {
            return this.dateService.isSameMonthSafe(this.date, this.selectedValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarMonthCellComponent.prototype, "today", {
        get: function () {
            return this.dateService.isSameMonthSafe(this.date, this.dateService.today());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarMonthCellComponent.prototype, "disabled", {
        get: function () {
            return this.smallerThanMin() || this.greaterThanMax();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarMonthCellComponent.prototype, "month", {
        get: function () {
            return this.dateService.getMonthName(this.date);
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarMonthCellComponent.prototype.onClick = function () {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
    };
    NbCalendarMonthCellComponent.prototype.smallerThanMin = function () {
        return this.date && this.min && this.dateService.compareDates(this.monthEnd(), this.min) < 0;
    };
    NbCalendarMonthCellComponent.prototype.greaterThanMax = function () {
        return this.date && this.max && this.dateService.compareDates(this.monthStart(), this.max) > 0;
    };
    NbCalendarMonthCellComponent.prototype.monthStart = function () {
        return this.dateService.getMonthStart(this.date);
    };
    NbCalendarMonthCellComponent.prototype.monthEnd = function () {
        return this.dateService.getMonthEnd(this.date);
    };
    __decorate$42([
        Input(),
        __metadata$26("design:type", Object)
    ], NbCalendarMonthCellComponent.prototype, "date", void 0);
    __decorate$42([
        Input(),
        __metadata$26("design:type", Object)
    ], NbCalendarMonthCellComponent.prototype, "selectedValue", void 0);
    __decorate$42([
        Input(),
        __metadata$26("design:type", Object)
    ], NbCalendarMonthCellComponent.prototype, "min", void 0);
    __decorate$42([
        Input(),
        __metadata$26("design:type", Object)
    ], NbCalendarMonthCellComponent.prototype, "max", void 0);
    __decorate$42([
        Output(),
        __metadata$26("design:type", EventEmitter)
    ], NbCalendarMonthCellComponent.prototype, "select", void 0);
    __decorate$42([
        HostBinding('class.selected'),
        __metadata$26("design:type", Boolean),
        __metadata$26("design:paramtypes", [])
    ], NbCalendarMonthCellComponent.prototype, "selected", null);
    __decorate$42([
        HostBinding('class.today'),
        __metadata$26("design:type", Boolean),
        __metadata$26("design:paramtypes", [])
    ], NbCalendarMonthCellComponent.prototype, "today", null);
    __decorate$42([
        HostBinding('class.disabled'),
        __metadata$26("design:type", Boolean),
        __metadata$26("design:paramtypes", [])
    ], NbCalendarMonthCellComponent.prototype, "disabled", null);
    __decorate$42([
        HostListener('click'),
        __metadata$26("design:type", Function),
        __metadata$26("design:paramtypes", []),
        __metadata$26("design:returntype", void 0)
    ], NbCalendarMonthCellComponent.prototype, "onClick", null);
    NbCalendarMonthCellComponent = __decorate$42([
        Component({
            selector: 'nb-calendar-month-cell',
            template: "{{ month }}",
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { 'class': 'month-cell' }
        }),
        __metadata$26("design:paramtypes", [NbDateService])
    ], NbCalendarMonthCellComponent);
    return NbCalendarMonthCellComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$43 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$27 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MONTHS_IN_VIEW = 12;
var MONTHS_IN_COLUMN = 4;
var NbCalendarMonthPickerComponent = /** @class */ (function () {
    function NbCalendarMonthPickerComponent(dateService) {
        this.dateService = dateService;
        this.size = NbCalendarSize.MEDIUM;
        this.monthChange = new EventEmitter();
        this.cellComponent = NbCalendarMonthCellComponent;
    }
    Object.defineProperty(NbCalendarMonthPickerComponent.prototype, "_cellComponent", {
        set: function (cellComponent) {
            if (cellComponent) {
                this.cellComponent = cellComponent;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarMonthPickerComponent.prototype, "medium", {
        get: function () {
            return this.size === NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarMonthPickerComponent.prototype, "large", {
        get: function () {
            return this.size === NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarMonthPickerComponent.prototype.ngOnInit = function () {
        this.initMonths();
    };
    NbCalendarMonthPickerComponent.prototype.initMonths = function () {
        var date = this.dateService.getDate(this.month);
        var year = this.dateService.getYear(this.month);
        var firstMonth = this.dateService.createDate(year, 0, date);
        var months = [firstMonth];
        for (var monthIndex = 1; monthIndex < MONTHS_IN_VIEW; monthIndex++) {
            months.push(this.dateService.addMonth(firstMonth, monthIndex));
        }
        this.months = batch(months, MONTHS_IN_COLUMN);
    };
    NbCalendarMonthPickerComponent.prototype.onSelect = function (month) {
        this.monthChange.emit(month);
    };
    __decorate$43([
        Input(),
        __metadata$27("design:type", Object)
    ], NbCalendarMonthPickerComponent.prototype, "min", void 0);
    __decorate$43([
        Input(),
        __metadata$27("design:type", Object)
    ], NbCalendarMonthPickerComponent.prototype, "max", void 0);
    __decorate$43([
        Input(),
        __metadata$27("design:type", Function)
    ], NbCalendarMonthPickerComponent.prototype, "filter", void 0);
    __decorate$43([
        Input(),
        __metadata$27("design:type", String)
    ], NbCalendarMonthPickerComponent.prototype, "size", void 0);
    __decorate$43([
        Input(),
        __metadata$27("design:type", Object)
    ], NbCalendarMonthPickerComponent.prototype, "month", void 0);
    __decorate$43([
        Output(),
        __metadata$27("design:type", EventEmitter)
    ], NbCalendarMonthPickerComponent.prototype, "monthChange", void 0);
    __decorate$43([
        Input('cellComponent'),
        __metadata$27("design:type", Type),
        __metadata$27("design:paramtypes", [Type])
    ], NbCalendarMonthPickerComponent.prototype, "_cellComponent", null);
    __decorate$43([
        HostBinding('class.medium'),
        __metadata$27("design:type", Object),
        __metadata$27("design:paramtypes", [])
    ], NbCalendarMonthPickerComponent.prototype, "medium", null);
    __decorate$43([
        HostBinding('class.large'),
        __metadata$27("design:type", Object),
        __metadata$27("design:paramtypes", [])
    ], NbCalendarMonthPickerComponent.prototype, "large", null);
    NbCalendarMonthPickerComponent = __decorate$43([
        Component({
            selector: 'nb-calendar-month-picker',
            template: "\n    <nb-calendar-picker\n      [data]=\"months\"\n      [min]=\"min\"\n      [max]=\"max\"\n      [filter]=\"filter\"\n      [selectedValue]=\"month\"\n      [cellComponent]=\"cellComponent\"\n      (select)=\"onSelect($event)\">\n    </nb-calendar-picker>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata$27("design:paramtypes", [NbDateService])
    ], NbCalendarMonthPickerComponent);
    return NbCalendarMonthPickerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$44 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$28 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarNavigationComponent = /** @class */ (function () {
    function NbCalendarNavigationComponent() {
        this.changeMode = new EventEmitter(true);
    }
    __decorate$44([
        Input(),
        __metadata$28("design:type", Object)
    ], NbCalendarNavigationComponent.prototype, "date", void 0);
    __decorate$44([
        Output(),
        __metadata$28("design:type", Object)
    ], NbCalendarNavigationComponent.prototype, "changeMode", void 0);
    NbCalendarNavigationComponent = __decorate$44([
        Component({
            selector: 'nb-calendar-navigation',
            template: "\n    <button nbButton (click)=\"changeMode.emit()\">\n      {{ date | date: 'MMM yyyy' }}\n    </button>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["\n    :host {\n      display: flex;\n      justify-content: center;\n    }\n\n    :host button {\n      height: 3.125rem;\n    }\n  "]
        })
    ], NbCalendarNavigationComponent);
    return NbCalendarNavigationComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$45 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$29 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarPageableNavigationComponent = /** @class */ (function () {
    function NbCalendarPageableNavigationComponent(directionService) {
        this.directionService = directionService;
        this.changeMode = new EventEmitter();
        this.next = new EventEmitter();
        this.prev = new EventEmitter();
    }
    Object.defineProperty(NbCalendarPageableNavigationComponent.prototype, "isRtl", {
        get: function () {
            return this.directionService.isRtl();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarPageableNavigationComponent.prototype, "isLtr", {
        get: function () {
            return this.directionService.isLtr();
        },
        enumerable: true,
        configurable: true
    });
    __decorate$45([
        Input(),
        __metadata$29("design:type", Object)
    ], NbCalendarPageableNavigationComponent.prototype, "date", void 0);
    __decorate$45([
        Output(),
        __metadata$29("design:type", Object)
    ], NbCalendarPageableNavigationComponent.prototype, "changeMode", void 0);
    __decorate$45([
        Output(),
        __metadata$29("design:type", Object)
    ], NbCalendarPageableNavigationComponent.prototype, "next", void 0);
    __decorate$45([
        Output(),
        __metadata$29("design:type", Object)
    ], NbCalendarPageableNavigationComponent.prototype, "prev", void 0);
    NbCalendarPageableNavigationComponent = __decorate$45([
        Component({
            selector: 'nb-calendar-pageable-navigation',
            template: "\n    <button nbButton (click)=\"prev.emit()\" ghost>\n      <nb-icon [icon]=\"isLtr ? 'chevron-left-outline' : 'chevron-right-outline'\" pack=\"nebular-essentials\"></nb-icon>\n    </button>\n    <nb-calendar-navigation [date]=\"date\" (changeMode)=\"changeMode.emit()\"></nb-calendar-navigation>\n    <button nbButton (click)=\"next.emit()\" ghost>\n      <nb-icon [icon]=\"isLtr ? 'chevron-right-outline' : 'chevron-left-outline'\" pack=\"nebular-essentials\"></nb-icon>\n    </button>\n  ",
            styles: [":host{display:flex;align-items:center;justify-content:space-between}nb-calendar-navigation{margin:0 0.5rem}\n"]
        }),
        __metadata$29("design:paramtypes", [NbLayoutDirectionService])
    ], NbCalendarPageableNavigationComponent);
    return NbCalendarPageableNavigationComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$46 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$30 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarPickerComponent = /** @class */ (function () {
    function NbCalendarPickerComponent() {
        this.select = new EventEmitter();
    }
    __decorate$46([
        Input(),
        __metadata$30("design:type", Array)
    ], NbCalendarPickerComponent.prototype, "data", void 0);
    __decorate$46([
        Input(),
        __metadata$30("design:type", Object)
    ], NbCalendarPickerComponent.prototype, "visibleDate", void 0);
    __decorate$46([
        Input(),
        __metadata$30("design:type", Object)
    ], NbCalendarPickerComponent.prototype, "selectedValue", void 0);
    __decorate$46([
        Input(),
        __metadata$30("design:type", Type)
    ], NbCalendarPickerComponent.prototype, "cellComponent", void 0);
    __decorate$46([
        Input(),
        __metadata$30("design:type", Object)
    ], NbCalendarPickerComponent.prototype, "min", void 0);
    __decorate$46([
        Input(),
        __metadata$30("design:type", Object)
    ], NbCalendarPickerComponent.prototype, "max", void 0);
    __decorate$46([
        Input(),
        __metadata$30("design:type", Function)
    ], NbCalendarPickerComponent.prototype, "filter", void 0);
    __decorate$46([
        Output(),
        __metadata$30("design:type", EventEmitter)
    ], NbCalendarPickerComponent.prototype, "select", void 0);
    NbCalendarPickerComponent = __decorate$46([
        Component({
            selector: 'nb-calendar-picker',
            template: "\n    <nb-calendar-picker-row\n      *ngFor=\"let row of data\"\n      [row]=\"row\"\n      [visibleDate]=\"visibleDate\"\n      [selectedValue]=\"selectedValue\"\n      [component]=\"cellComponent\"\n      [min]=\"min\"\n      [max]=\"max\"\n      [filter]=\"filter\"\n      (select)=\"select.emit($event)\">\n    </nb-calendar-picker-row>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NbCalendarPickerComponent);
    return NbCalendarPickerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$47 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$31 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarPickerRowComponent = /** @class */ (function () {
    function NbCalendarPickerRowComponent(cfr) {
        this.cfr = cfr;
        this.select = new EventEmitter();
    }
    NbCalendarPickerRowComponent.prototype.ngOnChanges = function () {
        var _this = this;
        var factory = this.cfr.resolveComponentFactory(this.component);
        this.containerRef.clear();
        this.row.forEach(function (date) {
            var component = _this.containerRef.createComponent(factory);
            _this.patchWithContext(component.instance, date);
            component.changeDetectorRef.detectChanges();
        });
    };
    NbCalendarPickerRowComponent.prototype.patchWithContext = function (component, date) {
        component.visibleDate = this.visibleDate;
        component.selectedValue = this.selectedValue;
        component.date = date;
        component.min = this.min;
        component.max = this.max;
        component.filter = this.filter;
        component.select.subscribe(this.select.emit.bind(this.select));
    };
    __decorate$47([
        Input(),
        __metadata$31("design:type", Array)
    ], NbCalendarPickerRowComponent.prototype, "row", void 0);
    __decorate$47([
        Input(),
        __metadata$31("design:type", Object)
    ], NbCalendarPickerRowComponent.prototype, "selectedValue", void 0);
    __decorate$47([
        Input(),
        __metadata$31("design:type", Object)
    ], NbCalendarPickerRowComponent.prototype, "visibleDate", void 0);
    __decorate$47([
        Input(),
        __metadata$31("design:type", Type)
    ], NbCalendarPickerRowComponent.prototype, "component", void 0);
    __decorate$47([
        Input(),
        __metadata$31("design:type", Object)
    ], NbCalendarPickerRowComponent.prototype, "min", void 0);
    __decorate$47([
        Input(),
        __metadata$31("design:type", Object)
    ], NbCalendarPickerRowComponent.prototype, "max", void 0);
    __decorate$47([
        Input(),
        __metadata$31("design:type", Function)
    ], NbCalendarPickerRowComponent.prototype, "filter", void 0);
    __decorate$47([
        Output(),
        __metadata$31("design:type", EventEmitter)
    ], NbCalendarPickerRowComponent.prototype, "select", void 0);
    __decorate$47([
        ViewChild(TemplateRef, { read: ViewContainerRef, static: true }),
        __metadata$31("design:type", ViewContainerRef)
    ], NbCalendarPickerRowComponent.prototype, "containerRef", void 0);
    NbCalendarPickerRowComponent = __decorate$47([
        Component({
            selector: 'nb-calendar-picker-row',
            template: '<ng-template></ng-template>',
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: ["\n    :host {\n      display: flex;\n      justify-content: space-between;\n    }\n  "]
        }),
        __metadata$31("design:paramtypes", [ComponentFactoryResolver])
    ], NbCalendarPickerRowComponent);
    return NbCalendarPickerRowComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$48 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$32 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarYearCellComponent = /** @class */ (function () {
    function NbCalendarYearCellComponent(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    Object.defineProperty(NbCalendarYearCellComponent.prototype, "selected", {
        get: function () {
            return this.dateService.isSameYearSafe(this.date, this.selectedValue);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarYearCellComponent.prototype, "today", {
        get: function () {
            return this.dateService.isSameYearSafe(this.date, this.dateService.today());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarYearCellComponent.prototype, "disabled", {
        get: function () {
            return this.smallerThanMin() || this.greaterThanMax();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarYearCellComponent.prototype, "year", {
        get: function () {
            return this.dateService.getYear(this.date);
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarYearCellComponent.prototype.onClick = function () {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
    };
    NbCalendarYearCellComponent.prototype.smallerThanMin = function () {
        return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
    };
    NbCalendarYearCellComponent.prototype.greaterThanMax = function () {
        return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
    };
    NbCalendarYearCellComponent.prototype.yearStart = function () {
        return this.dateService.getYearStart(this.date);
    };
    NbCalendarYearCellComponent.prototype.yearEnd = function () {
        return this.dateService.getYearEnd(this.date);
    };
    __decorate$48([
        Input(),
        __metadata$32("design:type", Object)
    ], NbCalendarYearCellComponent.prototype, "date", void 0);
    __decorate$48([
        Input(),
        __metadata$32("design:type", Object)
    ], NbCalendarYearCellComponent.prototype, "min", void 0);
    __decorate$48([
        Input(),
        __metadata$32("design:type", Object)
    ], NbCalendarYearCellComponent.prototype, "max", void 0);
    __decorate$48([
        Input(),
        __metadata$32("design:type", Object)
    ], NbCalendarYearCellComponent.prototype, "selectedValue", void 0);
    __decorate$48([
        Output(),
        __metadata$32("design:type", EventEmitter)
    ], NbCalendarYearCellComponent.prototype, "select", void 0);
    __decorate$48([
        HostBinding('class.selected'),
        __metadata$32("design:type", Boolean),
        __metadata$32("design:paramtypes", [])
    ], NbCalendarYearCellComponent.prototype, "selected", null);
    __decorate$48([
        HostBinding('class.today'),
        __metadata$32("design:type", Boolean),
        __metadata$32("design:paramtypes", [])
    ], NbCalendarYearCellComponent.prototype, "today", null);
    __decorate$48([
        HostBinding('class.disabled'),
        __metadata$32("design:type", Boolean),
        __metadata$32("design:paramtypes", [])
    ], NbCalendarYearCellComponent.prototype, "disabled", null);
    __decorate$48([
        HostListener('click'),
        __metadata$32("design:type", Function),
        __metadata$32("design:paramtypes", []),
        __metadata$32("design:returntype", void 0)
    ], NbCalendarYearCellComponent.prototype, "onClick", null);
    NbCalendarYearCellComponent = __decorate$48([
        Component({
            selector: 'nb-calendar-year-cell',
            template: "{{ year }}",
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { 'class': 'year-cell' }
        }),
        __metadata$32("design:paramtypes", [NbDateService])
    ], NbCalendarYearCellComponent);
    return NbCalendarYearCellComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$49 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$33 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var YEARS_IN_VIEW = 20;
var YEARS_IN_COLUMN = 4;
var NbCalendarYearPickerComponent = /** @class */ (function () {
    function NbCalendarYearPickerComponent(dateService) {
        this.dateService = dateService;
        this.cellComponent = NbCalendarYearCellComponent;
        this.size = NbCalendarSize.MEDIUM;
        this.yearChange = new EventEmitter();
    }
    Object.defineProperty(NbCalendarYearPickerComponent.prototype, "_cellComponent", {
        set: function (cellComponent) {
            if (cellComponent) {
                this.cellComponent = cellComponent;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarYearPickerComponent.prototype, "medium", {
        get: function () {
            return this.size === NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarYearPickerComponent.prototype, "large", {
        get: function () {
            return this.size === NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarYearPickerComponent.prototype.ngOnChanges = function () {
        this.initYears();
    };
    NbCalendarYearPickerComponent.prototype.initYears = function () {
        var _this = this;
        var selectedYear = this.dateService.getYear(this.year);
        var startYear = Math.ceil(selectedYear - YEARS_IN_VIEW / 2);
        var years = range(YEARS_IN_VIEW).map(function (i) { return _this.createYearDateByIndex(i + startYear); });
        this.years = batch(years, YEARS_IN_COLUMN);
    };
    NbCalendarYearPickerComponent.prototype.onSelect = function (year) {
        this.yearChange.emit(year);
    };
    NbCalendarYearPickerComponent.prototype.createYearDateByIndex = function (i) {
        return this.dateService.createDate(i, this.dateService.getMonth(this.year), this.dateService.getDate(this.year));
    };
    __decorate$49([
        Input(),
        __metadata$33("design:type", Object)
    ], NbCalendarYearPickerComponent.prototype, "date", void 0);
    __decorate$49([
        Input(),
        __metadata$33("design:type", Object)
    ], NbCalendarYearPickerComponent.prototype, "min", void 0);
    __decorate$49([
        Input(),
        __metadata$33("design:type", Object)
    ], NbCalendarYearPickerComponent.prototype, "max", void 0);
    __decorate$49([
        Input(),
        __metadata$33("design:type", Function)
    ], NbCalendarYearPickerComponent.prototype, "filter", void 0);
    __decorate$49([
        Input('cellComponent'),
        __metadata$33("design:type", Type),
        __metadata$33("design:paramtypes", [Type])
    ], NbCalendarYearPickerComponent.prototype, "_cellComponent", null);
    __decorate$49([
        Input(),
        __metadata$33("design:type", String)
    ], NbCalendarYearPickerComponent.prototype, "size", void 0);
    __decorate$49([
        Input(),
        __metadata$33("design:type", Object)
    ], NbCalendarYearPickerComponent.prototype, "year", void 0);
    __decorate$49([
        Output(),
        __metadata$33("design:type", Object)
    ], NbCalendarYearPickerComponent.prototype, "yearChange", void 0);
    __decorate$49([
        HostBinding('class.medium'),
        __metadata$33("design:type", Object),
        __metadata$33("design:paramtypes", [])
    ], NbCalendarYearPickerComponent.prototype, "medium", null);
    __decorate$49([
        HostBinding('class.large'),
        __metadata$33("design:type", Object),
        __metadata$33("design:paramtypes", [])
    ], NbCalendarYearPickerComponent.prototype, "large", null);
    NbCalendarYearPickerComponent = __decorate$49([
        Component({
            selector: 'nb-calendar-year-picker',
            template: "\n    <nb-calendar-picker\n      [data]=\"years\"\n      [min]=\"min\"\n      [max]=\"max\"\n      [filter]=\"filter\"\n      [selectedValue]=\"date\"\n      [visibleDate]=\"year\"\n      [cellComponent]=\"cellComponent\"\n      (select)=\"onSelect($event)\">\n    </nb-calendar-picker>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata$33("design:paramtypes", [NbDateService])
    ], NbCalendarYearPickerComponent);
    return NbCalendarYearPickerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$8 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$50 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$34 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$9 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The `NbNativeDateService` is basic implementation of `NbDateService` using
 * native js date objects and angular localization services.
 * */
var NbNativeDateService = /** @class */ (function (_super) {
    __extends$8(NbNativeDateService, _super);
    function NbNativeDateService(locale) {
        var _this = _super.call(this) || this;
        _this.setLocale(locale);
        return _this;
    }
    NbNativeDateService.prototype.setLocale = function (locale) {
        _super.prototype.setLocale.call(this, locale);
        this.datePipe = new DatePipe(locale);
    };
    NbNativeDateService.prototype.isValidDateString = function (date, format) {
        return !isNaN(this.parse(date, format).getTime());
    };
    NbNativeDateService.prototype.today = function () {
        return new Date();
    };
    NbNativeDateService.prototype.getDate = function (date) {
        return date.getDate();
    };
    NbNativeDateService.prototype.getMonth = function (date) {
        return date.getMonth();
    };
    NbNativeDateService.prototype.getYear = function (date) {
        return date.getFullYear();
    };
    NbNativeDateService.prototype.getDayOfWeek = function (date) {
        return date.getDay();
    };
    /**
     * returns first day of the week, it can be 1 if week starts from monday
     * and 0 if from sunday and so on.
     * */
    NbNativeDateService.prototype.getFirstDayOfWeek = function () {
        return getLocaleFirstDayOfWeek(this.locale);
    };
    NbNativeDateService.prototype.getMonthName = function (date, style$$1) {
        if (style$$1 === void 0) { style$$1 = TranslationWidth.Abbreviated; }
        var index = date.getMonth();
        return this.getMonthNameByIndex(index, style$$1);
    };
    NbNativeDateService.prototype.getMonthNameByIndex = function (index, style$$1) {
        if (style$$1 === void 0) { style$$1 = TranslationWidth.Abbreviated; }
        return getLocaleMonthNames(this.locale, FormStyle.Format, style$$1)[index];
    };
    NbNativeDateService.prototype.getDayOfWeekNames = function () {
        return getLocaleDayNames(this.locale, FormStyle.Format, TranslationWidth.Short);
    };
    NbNativeDateService.prototype.format = function (date, format) {
        return this.datePipe.transform(date, format);
    };
    /**
     * We haven't got capability to parse date using formatting without third party libraries.
     * */
    NbNativeDateService.prototype.parse = function (date, format) {
        return new Date(Date.parse(date));
    };
    NbNativeDateService.prototype.addDay = function (date, num) {
        return this.createDate(date.getFullYear(), date.getMonth(), date.getDate() + num);
    };
    NbNativeDateService.prototype.addMonth = function (date, num) {
        var month = this.createDate(date.getFullYear(), date.getMonth() + num, 1);
        // In case of date has more days than calculated month js Date will change that month to the next one
        // because of the date overflow.
        month.setDate(Math.min(date.getDate(), this.getMonthEnd(month).getDate()));
        return month;
    };
    NbNativeDateService.prototype.addYear = function (date, num) {
        return this.createDate(date.getFullYear() + num, date.getMonth(), date.getDate());
    };
    NbNativeDateService.prototype.clone = function (date) {
        return new Date(date.getTime());
    };
    NbNativeDateService.prototype.compareDates = function (date1, date2) {
        return date1.getTime() - date2.getTime();
    };
    NbNativeDateService.prototype.createDate = function (year, month, date) {
        var result = new Date(year, month, date);
        // We need to correct for the fact that JS native Date treats years in range [0, 99] as
        // abbreviations for 19xx.
        if (year >= 0 && year < 100) {
            result.setFullYear(result.getFullYear() - 1900);
        }
        return result;
    };
    NbNativeDateService.prototype.getMonthEnd = function (date) {
        return this.createDate(date.getFullYear(), date.getMonth() + 1, 0);
    };
    NbNativeDateService.prototype.getMonthStart = function (date) {
        return this.createDate(date.getFullYear(), date.getMonth(), 1);
    };
    NbNativeDateService.prototype.getNumberOfDaysInMonth = function (date) {
        return this.getMonthEnd(date).getDate();
    };
    NbNativeDateService.prototype.getYearEnd = function (date) {
        return this.createDate(date.getFullYear(), 11, 31);
    };
    NbNativeDateService.prototype.getYearStart = function (date) {
        return this.createDate(date.getFullYear(), 0, 1);
    };
    NbNativeDateService.prototype.isSameDay = function (date1, date2) {
        return this.isSameMonth(date1, date2) &&
            date1.getDate() === date2.getDate();
    };
    NbNativeDateService.prototype.isSameMonth = function (date1, date2) {
        return this.isSameYear(date1, date2) &&
            date1.getMonth() === date2.getMonth();
    };
    NbNativeDateService.prototype.isSameYear = function (date1, date2) {
        return date1.getFullYear() === date2.getFullYear();
    };
    NbNativeDateService.prototype.getId = function () {
        return 'native';
    };
    NbNativeDateService = __decorate$50([
        Injectable(),
        __param$9(0, Inject(LOCALE_ID)),
        __metadata$34("design:paramtypes", [String])
    ], NbNativeDateService);
    return NbNativeDateService;
}(NbDateService));

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$34 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SERVICES = [
    { provide: NbDateService, useClass: NbNativeDateService },
    DatePipe,
    NbCalendarMonthModelService,
];
var COMPONENTS = [
    NbCalendarHeaderComponent,
    NbCalendarNavigationComponent,
    NbCalendarPageableNavigationComponent,
    NbCalendarDaysNamesComponent,
    NbCalendarYearPickerComponent,
    NbCalendarMonthPickerComponent,
    NbCalendarDayPickerComponent,
    NbCalendarDayCellComponent,
    NbCalendarMonthCellComponent,
    NbCalendarYearCellComponent,
    NbCalendarPickerRowComponent,
    NbCalendarPickerComponent,
];
/**
 * `NbCalendarKitModule` is a module that contains multiple useful components for building custom calendars.
 * So if you think our calendars is not enough powerful for you just use calendar-kit and build your own calendar!
 *
 * Available components:
 * - `NbCalendarDayPicker`
 * - `NbCalendarDayCell`
 * - `NbCalendarMonthPicker`
 * - `NbCalendarMonthCell`
 * - `NbCalendarYearPicker`
 * - `NbCalendarYearCell`
 * - `NbCalendarHeader`
 * - `NbCalendarNavigation`
 * - `NbCalendarPageableNavigation`
 *
 * For example you can easily build full calendar:
 * @stacked-example(Full calendar, calendar-kit/calendar-kit-full-calendar.component)
 * */
var NbCalendarKitModule = /** @class */ (function () {
    function NbCalendarKitModule() {
    }
    NbCalendarKitModule = __decorate$34([
        NgModule({
            imports: [NbSharedModule, NbButtonModule, NbIconModule],
            exports: COMPONENTS.slice(),
            declarations: COMPONENTS.slice(),
            providers: SERVICES.slice(),
            entryComponents: [
                NbCalendarDayCellComponent,
                NbCalendarMonthCellComponent,
                NbCalendarYearCellComponent,
            ],
        })
    ], NbCalendarKitModule);
    return NbCalendarKitModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$51 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$35 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The basis for calendar and range calendar components.
 * Encapsulates common behavior - store calendar state and perform navigation
 * between pickers.
 * */
var NbBaseCalendarComponent = /** @class */ (function () {
    function NbBaseCalendarComponent(dateService) {
        this.dateService = dateService;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines active view for calendar.
         * */
        this.activeViewMode = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Determines should we show calendars header or not.
         * */
        this.showHeader = true;
        /**
         * Emits date when selected.
         * */
        this.dateChange = new EventEmitter();
        this.ViewMode = NbCalendarViewMode;
    }
    NbBaseCalendarComponent.prototype.ngOnInit = function () {
        if (!this.visibleDate) {
            this.visibleDate = this.dateService.today();
        }
    };
    Object.defineProperty(NbBaseCalendarComponent.prototype, "medium", {
        get: function () {
            return this.size === NbCalendarSize.MEDIUM;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBaseCalendarComponent.prototype, "large", {
        get: function () {
            return this.size === NbCalendarSize.LARGE;
        },
        enumerable: true,
        configurable: true
    });
    NbBaseCalendarComponent.prototype.setViewMode = function (viewMode) {
        this.activeViewMode = viewMode;
    };
    NbBaseCalendarComponent.prototype.setVisibleDate = function (visibleDate) {
        this.visibleDate = visibleDate;
    };
    NbBaseCalendarComponent.prototype.prevMonth = function () {
        this.changeVisibleMonth(-1);
    };
    NbBaseCalendarComponent.prototype.nextMonth = function () {
        this.changeVisibleMonth(1);
    };
    NbBaseCalendarComponent.prototype.prevYears = function () {
        this.changeVisibleYear(-1);
    };
    NbBaseCalendarComponent.prototype.nextYears = function () {
        this.changeVisibleYear(1);
    };
    NbBaseCalendarComponent.prototype.navigateToday = function () {
        this.setViewMode(NbCalendarViewMode.DATE);
        this.visibleDate = this.dateService.today();
    };
    NbBaseCalendarComponent.prototype.changeVisibleMonth = function (direction) {
        this.visibleDate = this.dateService.addMonth(this.visibleDate, direction);
    };
    NbBaseCalendarComponent.prototype.changeVisibleYear = function (direction) {
        this.visibleDate = this.dateService.addYear(this.visibleDate, direction * YEARS_IN_VIEW);
    };
    __decorate$51([
        Input(),
        __metadata$35("design:type", Boolean)
    ], NbBaseCalendarComponent.prototype, "boundingMonth", void 0);
    __decorate$51([
        Input('startView'),
        __metadata$35("design:type", String)
    ], NbBaseCalendarComponent.prototype, "activeViewMode", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "min", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "max", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Function)
    ], NbBaseCalendarComponent.prototype, "filter", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Type)
    ], NbBaseCalendarComponent.prototype, "dayCellComponent", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Type)
    ], NbBaseCalendarComponent.prototype, "monthCellComponent", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Type)
    ], NbBaseCalendarComponent.prototype, "yearCellComponent", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", String)
    ], NbBaseCalendarComponent.prototype, "size", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "visibleDate", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Boolean)
    ], NbBaseCalendarComponent.prototype, "showHeader", void 0);
    __decorate$51([
        Input(),
        __metadata$35("design:type", Object)
    ], NbBaseCalendarComponent.prototype, "date", void 0);
    __decorate$51([
        Output(),
        __metadata$35("design:type", EventEmitter)
    ], NbBaseCalendarComponent.prototype, "dateChange", void 0);
    __decorate$51([
        HostBinding('class.medium'),
        __metadata$35("design:type", Object),
        __metadata$35("design:paramtypes", [])
    ], NbBaseCalendarComponent.prototype, "medium", null);
    __decorate$51([
        HostBinding('class.large'),
        __metadata$35("design:type", Object),
        __metadata$35("design:paramtypes", [])
    ], NbBaseCalendarComponent.prototype, "large", null);
    NbBaseCalendarComponent = __decorate$51([
        Component({
            selector: 'nb-base-calendar',
            template: "<nb-card>\n  <nb-card-header *ngIf=\"showHeader\">\n    <nb-calendar-header (navigateToday)=\"navigateToday()\"></nb-calendar-header>\n  </nb-card-header>\n\n  <nb-card-body [ngSwitch]=\"activeViewMode\">\n\n    <ng-container *ngSwitchCase=\"ViewMode.DATE\">\n\n      <nb-calendar-pageable-navigation\n        *ngSwitchCase=\"ViewMode.DATE\"\n        [date]=\"visibleDate\"\n        (next)=\"nextMonth()\"\n        (prev)=\"prevMonth()\"\n        (changeMode)=\"setViewMode(ViewMode.YEAR)\">\n      </nb-calendar-pageable-navigation>\n\n      <nb-calendar-day-picker\n        [boundingMonths]=\"boundingMonth\"\n        [cellComponent]=\"dayCellComponent\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [filter]=\"filter\"\n        [visibleDate]=\"visibleDate\"\n        [size]=\"size\"\n        [date]=\"date\"\n        (dateChange)=\"dateChange.emit($event)\">\n      </nb-calendar-day-picker>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"ViewMode.YEAR\">\n\n      <nb-calendar-pageable-navigation\n        [date]=\"visibleDate\"\n        (next)=\"nextYears()\"\n        (prev)=\"prevYears()\"\n        (changeMode)=\"setViewMode(ViewMode.DATE)\">\n      </nb-calendar-pageable-navigation>\n\n      <nb-calendar-year-picker\n        [cellComponent]=\"yearCellComponent\"\n        [date]=\"date\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [filter]=\"filter\"\n        [size]=\"size\"\n        [year]=\"visibleDate\"\n        (yearChange)=\"setVisibleDate($event); setViewMode(ViewMode.MONTH)\">\n      </nb-calendar-year-picker>\n\n    </ng-container>\n\n    <ng-container *ngSwitchCase=\"ViewMode.MONTH\">\n\n      <nb-calendar-navigation\n        [date]=\"visibleDate\"\n        (changeMode)=\"setViewMode(ViewMode.DATE)\">\n      </nb-calendar-navigation>\n\n      <nb-calendar-month-picker\n        [cellComponent]=\"monthCellComponent\"\n        [min]=\"min\"\n        [max]=\"max\"\n        [filter]=\"filter\"\n        [size]=\"size\"\n        [month]=\"visibleDate\"\n        (monthChange)=\"setVisibleDate($event); setViewMode(ViewMode.DATE)\">\n      </nb-calendar-month-picker>\n\n    </ng-container>\n\n  </nb-card-body>\n\n</nb-card>\n"
        }),
        __metadata$35("design:paramtypes", [NbDateService])
    ], NbBaseCalendarComponent);
    return NbBaseCalendarComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$33 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbBaseCalendarModule = /** @class */ (function () {
    function NbBaseCalendarModule() {
    }
    NbBaseCalendarModule = __decorate$33([
        NgModule({
            imports: [NbCalendarKitModule, NbSharedModule, NbCardModule],
            exports: [NbBaseCalendarComponent],
            declarations: [NbBaseCalendarComponent],
        })
    ], NbBaseCalendarModule);
    return NbBaseCalendarModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$31 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbCalendarModule = /** @class */ (function () {
    function NbCalendarModule() {
    }
    NbCalendarModule = __decorate$31([
        NgModule({
            imports: [NbBaseCalendarModule],
            exports: [NbCalendarComponent],
            declarations: [NbCalendarComponent],
        })
    ], NbCalendarModule);
    return NbCalendarModule;
}());

var __decorate$54 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$37 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbCalendarRangeDayCellComponent = /** @class */ (function () {
    function NbCalendarRangeDayCellComponent(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "inRange", {
        get: function () {
            return this.date && this.selectedValue
                && (this.selectedValue.start && this.dateService.compareDates(this.date, this.selectedValue.start) >= 0)
                && (this.selectedValue.end && this.dateService.compareDates(this.date, this.selectedValue.end) <= 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "start", {
        get: function () {
            return this.date && this.selectedValue && this.selectedValue.end
                && (this.selectedValue.start && this.dateService.isSameDay(this.date, this.selectedValue.start));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "end", {
        get: function () {
            return this.date && this.selectedValue &&
                (this.selectedValue.end && this.dateService.isSameDay(this.date, this.selectedValue.end));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "today", {
        get: function () {
            return this.date && this.dateService.isSameDay(this.date, this.dateService.today());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "boundingMonth", {
        get: function () {
            return !this.dateService.isSameMonthSafe(this.date, this.visibleDate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "selected", {
        get: function () {
            return this.date && this.selectedValue
                && (this.selectedValue.start && this.dateService.isSameDay(this.date, this.selectedValue.start)) || this.end;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "empty", {
        get: function () {
            return !this.date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "disabled", {
        get: function () {
            return this.smallerThanMin() || this.greaterThanMax() || this.dontFitFilter();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeDayCellComponent.prototype, "day", {
        get: function () {
            return this.date && this.dateService.getDate(this.date);
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarRangeDayCellComponent.prototype.onClick = function () {
        if (this.disabled || this.empty) {
            return;
        }
        this.select.emit(this.date);
    };
    NbCalendarRangeDayCellComponent.prototype.smallerThanMin = function () {
        return this.date && this.min && this.dateService.compareDates(this.date, this.min) < 0;
    };
    NbCalendarRangeDayCellComponent.prototype.greaterThanMax = function () {
        return this.date && this.max && this.dateService.compareDates(this.date, this.max) > 0;
    };
    NbCalendarRangeDayCellComponent.prototype.dontFitFilter = function () {
        return this.date && this.filter && !this.filter(this.date);
    };
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeDayCellComponent.prototype, "date", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeDayCellComponent.prototype, "selectedValue", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeDayCellComponent.prototype, "visibleDate", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeDayCellComponent.prototype, "min", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeDayCellComponent.prototype, "max", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Function)
    ], NbCalendarRangeDayCellComponent.prototype, "filter", void 0);
    __decorate$54([
        Output(),
        __metadata$37("design:type", EventEmitter)
    ], NbCalendarRangeDayCellComponent.prototype, "select", void 0);
    __decorate$54([
        HostBinding('class.in-range'),
        __metadata$37("design:type", Boolean),
        __metadata$37("design:paramtypes", [])
    ], NbCalendarRangeDayCellComponent.prototype, "inRange", null);
    __decorate$54([
        HostBinding('class.start'),
        __metadata$37("design:type", Boolean),
        __metadata$37("design:paramtypes", [])
    ], NbCalendarRangeDayCellComponent.prototype, "start", null);
    __decorate$54([
        HostBinding('class.end'),
        __metadata$37("design:type", Boolean),
        __metadata$37("design:paramtypes", [])
    ], NbCalendarRangeDayCellComponent.prototype, "end", null);
    NbCalendarRangeDayCellComponent = __decorate$54([
        Component({
            selector: 'nb-calendar-range-day-cell',
            template: "\n    <div\n      class=\"day-cell\"\n      [class.today]=\"today\"\n      [class.selected]=\"selected\"\n      [class.bounding-month]=\"boundingMonth\"\n      [class.start]=\"start\"\n      [class.end]=\"end\"\n      [class.in-range]=\"inRange\"\n      [class.disabled]=\"disabled\">\n      {{ day }}\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { '(click)': 'onClick()', 'class': 'range-cell' }
        }),
        __metadata$37("design:paramtypes", [NbDateService])
    ], NbCalendarRangeDayCellComponent);
    return NbCalendarRangeDayCellComponent;
}());
var NbCalendarRangeYearCellComponent = /** @class */ (function () {
    function NbCalendarRangeYearCellComponent(dateService) {
        this.dateService = dateService;
        this.select = new EventEmitter(true);
    }
    Object.defineProperty(NbCalendarRangeYearCellComponent.prototype, "selected", {
        get: function () {
            return this.selectedValue && this.dateService.isSameYear(this.date, this.selectedValue.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeYearCellComponent.prototype, "today", {
        get: function () {
            return this.date && this.dateService.isSameYear(this.date, this.dateService.today());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeYearCellComponent.prototype, "disabled", {
        get: function () {
            return this.smallerThanMin() || this.greaterThanMax();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeYearCellComponent.prototype, "year", {
        get: function () {
            return this.dateService.getYear(this.date);
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarRangeYearCellComponent.prototype.onClick = function () {
        if (this.disabled) {
            return;
        }
        this.select.emit(this.date);
    };
    NbCalendarRangeYearCellComponent.prototype.smallerThanMin = function () {
        return this.date && this.min && this.dateService.compareDates(this.yearEnd(), this.min) < 0;
    };
    NbCalendarRangeYearCellComponent.prototype.greaterThanMax = function () {
        return this.date && this.max && this.dateService.compareDates(this.yearStart(), this.max) > 0;
    };
    NbCalendarRangeYearCellComponent.prototype.yearStart = function () {
        return this.dateService.getYearStart(this.date);
    };
    NbCalendarRangeYearCellComponent.prototype.yearEnd = function () {
        return this.dateService.getYearEnd(this.date);
    };
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeYearCellComponent.prototype, "date", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeYearCellComponent.prototype, "min", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeYearCellComponent.prototype, "max", void 0);
    __decorate$54([
        Input(),
        __metadata$37("design:type", Object)
    ], NbCalendarRangeYearCellComponent.prototype, "selectedValue", void 0);
    __decorate$54([
        Output(),
        __metadata$37("design:type", EventEmitter)
    ], NbCalendarRangeYearCellComponent.prototype, "select", void 0);
    __decorate$54([
        HostBinding('class.selected'),
        __metadata$37("design:type", Boolean),
        __metadata$37("design:paramtypes", [])
    ], NbCalendarRangeYearCellComponent.prototype, "selected", null);
    __decorate$54([
        HostBinding('class.today'),
        __metadata$37("design:type", Boolean),
        __metadata$37("design:paramtypes", [])
    ], NbCalendarRangeYearCellComponent.prototype, "today", null);
    __decorate$54([
        HostBinding('class.disabled'),
        __metadata$37("design:type", Boolean),
        __metadata$37("design:paramtypes", [])
    ], NbCalendarRangeYearCellComponent.prototype, "disabled", null);
    __decorate$54([
        HostListener('click'),
        __metadata$37("design:type", Function),
        __metadata$37("design:paramtypes", []),
        __metadata$37("design:returntype", void 0)
    ], NbCalendarRangeYearCellComponent.prototype, "onClick", null);
    NbCalendarRangeYearCellComponent = __decorate$54([
        Component({
            selector: 'nb-calendar-range-year-cell',
            template: "{{ year }}",
            changeDetection: ChangeDetectionStrategy.OnPush,
            host: { 'class': 'year-cell' }
        }),
        __metadata$37("design:paramtypes", [NbDateService])
    ], NbCalendarRangeYearCellComponent);
    return NbCalendarRangeYearCellComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$53 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$36 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * CalendarRange component provides a capability to choose a date range.
 *
 * ```html
 * <nb-calendar [(date)]="date"></nb-calendar>
 * <nb-calendar [date]="date" (dateChange)="handleDateChange($event)"></nb-calendar>
 * ```
 *
 * Basic usage example
 * @stacked-example(Range, calendar/calendar-range-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCalendarRangeModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbCalendarRangeModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * CalendarRange component supports all of the Calendar component customization properties. More defails can be found
 * in the [Calendar component docs](docs/components/calendar).
 *
 * @styles
 *
 * calendar-width:
 * calendar-body-height:
 * calendar-border-radius:
 * calendar-text-color:
 * calendar-text-font-family:
 * calendar-text-font-size:
 * calendar-text-font-weight:
 * calendar-text-line-height:
 * calendar-header-text-color:
 * calendar-header-text-font-family:
 * calendar-header-title-text-font-size:
 * calendar-header-title-text-font-weight:
 * calendar-header-title-text-line-height:
 * calendar-header-sub-title-text-font-size:
 * calendar-header-sub-title-text-font-weight:
 * calendar-header-sub-title-text-line-height:
 * calendar-navigation-button-width:
 * calendar-cell-inactive-text-color:
 * calendar-cell-disabled-background-color:
 * calendar-cell-disabled-text-color:
 * calendar-cell-selected-background-color:
 * calendar-cell-selected-text-color:
 * calendar-cell-selected-text-font-size:
 * calendar-cell-selected-text-font-weight:
 * calendar-cell-selected-text-line-height:
 * calendar-cell-hover-background-color:
 * calendar-cell-hover-text-color:
 * calendar-cell-hover-text-font-size:
 * calendar-cell-hover-text-font-weight:
 * calendar-cell-hover-text-line-height:
 * calendar-cell-active-background-color:
 * calendar-cell-active-text-color:
 * calendar-cell-active-text-font-size:
 * calendar-cell-active-text-font-weight:
 * calendar-cell-active-text-line-height:
 * calendar-cell-today-background-color:
 * calendar-cell-today-text-color:
 * calendar-cell-today-text-font-size:
 * calendar-cell-today-text-font-weight:
 * calendar-cell-today-text-line-height:
 * calendar-day-cell-width:
 * calendar-day-cell-height:
 * calendar-month-cell-width:
 * calendar-month-cell-height:
 * calendar-year-cell-width:
 * calendar-year-cell-height:
 * calendar-weekday-width:
 * calendar-weekday-height:
 * calendar-weekday-text-color:
 * calendar-weekday-text-font-size:
 * calendar-weekday-text-font-weight:
 * calendar-weekday-text-line-height:
 * calendar-weekday-holiday-text-color:
 * calendar-cell-in-range-background-color:
 * calendar-large-width:
 * calendar-large-body-height:
 * calendar-day-cell-large-width:
 * calendar-day-cell-large-height:
 * calendar-month-cell-large-width:
 * calendar-month-cell-large-height:
 * calendar-year-cell-large-width:
 * calendar-year-cell-large-height:
 * */
var NbCalendarRangeComponent = /** @class */ (function () {
    function NbCalendarRangeComponent(dateService) {
        this.dateService = dateService;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        this.boundingMonth = true;
        /**
         * Defines starting view for the calendar.
         * */
        this.startView = NbCalendarViewMode.DATE;
        this.dayCellComponent = NbCalendarRangeDayCellComponent;
        this.yearCellComponent = NbCalendarRangeYearCellComponent;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        this.size = NbCalendarSize.MEDIUM;
        /**
         * Determines should we show calendars header or not.
         * */
        this.showHeader = true;
        /**
         * Emits range when start selected and emits again when end selected.
         * */
        this.rangeChange = new EventEmitter();
    }
    Object.defineProperty(NbCalendarRangeComponent.prototype, "_cellComponent", {
        /**
         * Custom day cell component. Have to implement `NbCalendarCell` interface.
         * */
        set: function (cellComponent) {
            if (cellComponent) {
                this.dayCellComponent = cellComponent;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCalendarRangeComponent.prototype, "_yearCellComponent", {
        /**
         * Custom year cell component. Have to implement `NbCalendarCell` interface.
         * */
        set: function (cellComponent) {
            if (cellComponent) {
                this.yearCellComponent = cellComponent;
            }
        },
        enumerable: true,
        configurable: true
    });
    NbCalendarRangeComponent.prototype.onChange = function (date) {
        this.initDateIfNull();
        this.handleSelected(date);
    };
    NbCalendarRangeComponent.prototype.initDateIfNull = function () {
        if (!this.range) {
            this.range = { start: null, end: null };
        }
    };
    NbCalendarRangeComponent.prototype.handleSelected = function (date) {
        if (this.selectionStarted()) {
            this.selectEnd(date);
        }
        else {
            this.selectStart(date);
        }
    };
    NbCalendarRangeComponent.prototype.selectionStarted = function () {
        var _a = this.range, start = _a.start, end = _a.end;
        return start && !end;
    };
    NbCalendarRangeComponent.prototype.selectStart = function (start) {
        this.selectRange({ start: start });
    };
    NbCalendarRangeComponent.prototype.selectEnd = function (date) {
        var start = this.range.start;
        if (this.dateService.compareDates(date, start) > 0) {
            this.selectRange({ start: start, end: date });
        }
        else {
            this.selectRange({ start: date, end: start });
        }
    };
    NbCalendarRangeComponent.prototype.selectRange = function (range) {
        this.range = range;
        this.rangeChange.emit(range);
    };
    __decorate$53([
        Input(),
        __metadata$36("design:type", Boolean)
    ], NbCalendarRangeComponent.prototype, "boundingMonth", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", String)
    ], NbCalendarRangeComponent.prototype, "startView", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Object)
    ], NbCalendarRangeComponent.prototype, "min", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Object)
    ], NbCalendarRangeComponent.prototype, "max", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Function)
    ], NbCalendarRangeComponent.prototype, "filter", void 0);
    __decorate$53([
        Input('dayCellComponent'),
        __metadata$36("design:type", Type),
        __metadata$36("design:paramtypes", [Type])
    ], NbCalendarRangeComponent.prototype, "_cellComponent", null);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Type)
    ], NbCalendarRangeComponent.prototype, "monthCellComponent", void 0);
    __decorate$53([
        Input('yearCellComponent'),
        __metadata$36("design:type", Type),
        __metadata$36("design:paramtypes", [Type])
    ], NbCalendarRangeComponent.prototype, "_yearCellComponent", null);
    __decorate$53([
        Input(),
        __metadata$36("design:type", String)
    ], NbCalendarRangeComponent.prototype, "size", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Object)
    ], NbCalendarRangeComponent.prototype, "visibleDate", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Boolean)
    ], NbCalendarRangeComponent.prototype, "showHeader", void 0);
    __decorate$53([
        Input(),
        __metadata$36("design:type", Object)
    ], NbCalendarRangeComponent.prototype, "range", void 0);
    __decorate$53([
        Output(),
        __metadata$36("design:type", EventEmitter)
    ], NbCalendarRangeComponent.prototype, "rangeChange", void 0);
    NbCalendarRangeComponent = __decorate$53([
        Component({
            selector: 'nb-calendar-range',
            template: "\n    <nb-base-calendar\n      [date]=\"range\"\n      (dateChange)=\"onChange($event)\"\n      [min]=\"min\"\n      [max]=\"max\"\n      [filter]=\"filter\"\n      [startView]=\"startView\"\n      [boundingMonth]=\"boundingMonth\"\n      [dayCellComponent]=\"dayCellComponent\"\n      [monthCellComponent]=\"monthCellComponent\"\n      [yearCellComponent]=\"yearCellComponent\"\n      [visibleDate]=\"visibleDate\"\n      [showHeader]=\"showHeader\"\n      [size]=\"size\"\n    ></nb-base-calendar>\n  "
        }),
        __metadata$36("design:paramtypes", [NbDateService])
    ], NbCalendarRangeComponent);
    return NbCalendarRangeComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$52 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbCalendarRangeModule = /** @class */ (function () {
    function NbCalendarRangeModule() {
    }
    NbCalendarRangeModule = __decorate$52([
        NgModule({
            imports: [NbBaseCalendarModule],
            exports: [NbCalendarRangeComponent],
            declarations: [
                NbCalendarRangeComponent,
                NbCalendarRangeDayCellComponent,
                NbCalendarRangeYearCellComponent,
            ],
            entryComponents: [NbCalendarRangeDayCellComponent, NbCalendarRangeYearCellComponent],
        })
    ], NbCalendarRangeModule);
    return NbCalendarRangeModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
function isUrlPathEqual(path, link) {
    var locationPath = getPathPartOfUrl(path);
    return link === locationPath;
}
function isUrlPathContain(path, link) {
    var locationPath = getPathPartOfUrl(path);
    var endOfUrlSegmentRegExp = /\/|^$/;
    return locationPath.startsWith(link) &&
        locationPath.slice(link.length).charAt(0).search(endOfUrlSegmentRegExp) !== -1;
}
function getPathPartOfUrl(url) {
    return url.match(/.*?(?=[?;#]|$)/)[0];
}
function getFragmentPartOfUrl(url) {
    var matched = url.match(/#(.+)/);
    return matched ? matched[1] : '';
}
function isFragmentEqual(path, fragment) {
    return getFragmentPartOfUrl(path) === fragment;
}
function isFragmentContain(path, fragment) {
    return getFragmentPartOfUrl(path).includes(fragment);
}

var __decorate$57 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$39 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * This service determines whether we should scroll the layout back to top.
 * This occurs when the page is changed, so when current url PATH is not equal to the previous one.
 *
 *  TODO: this is most likely a temporary solutions as recently Angular introduces ViewportScroll
 *  and scroll restoration process
 */
var NbRestoreScrollTopHelper = /** @class */ (function () {
    function NbRestoreScrollTopHelper(router) {
        this.router = router;
    }
    NbRestoreScrollTopHelper.prototype.shouldRestore = function () {
        var _this = this;
        return this.router.events
            .pipe(startWith(null), filter(function (event) { return event === null || event instanceof NavigationEnd; }), pairwise(), map(function (_a) {
            var prev = _a[0], current = _a[1];
            return _this.pageChanged(prev, current);
        }), filter(function (res) { return !!res; }));
    };
    NbRestoreScrollTopHelper.prototype.pageChanged = function (prev, current) {
        return !prev || getPathPartOfUrl(prev.url) !== getPathPartOfUrl(current.url);
    };
    NbRestoreScrollTopHelper = __decorate$57([
        Injectable(),
        __metadata$39("design:paramtypes", [Router])
    ], NbRestoreScrollTopHelper);
    return NbRestoreScrollTopHelper;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$56 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$38 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$10 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Layout container component.
 * When using with Nebular Theme System it is required that all child components should be placed inside.
 *
 * Basic example of two column layout with header:
 *
 * @stacked-example(Showcase, layout/layout-showcase.component)
 *
 * Can contain the following components inside:
 *
 * ```html
 * <nb-layout>
 *  <nb-layout-header></nb-layout-header>
 *  <nb-layout-footer></nb-layout-footer>
 *  <nb-layout-column></nb-layout-column>
 *  <nb-sidebar></nb-sidebar>
 * </nb-layout>
 * ```
 * ### Installation
 *
 * Import `NbLayoutModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbLayoutModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbLayoutModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbLayoutModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 * By default the layout fills up the whole view-port.
 * The window scrollbars are disabled on the body and moved inside of the nb-layout, so that the scrollbars
 * won't mess with the fixed nb-header.
 *
 * The child components are projected into a flexible layout structure allowing to adjust the layout behavior
 * based on the settings provided.
 *
 * The layout content (columns) becomes centered when the window width is more than
 * the value specified in the theme variable `layout-content-width`.
 *
 * The layout also contains the area on the very top (the first child of the nb-layout), which could be used
 * to dynamically append some components like modals or spinners/loaders
 * so that they are located on top of the elements hierarchy.
 * More details are under the `ThemeService` section.
 *
 * The layout component is also responsible for changing application themes.
 * It listens to the `themeChange` event and change a theme CSS class appended to body.
 * Based on the class appended, specific CSS-theme is applied to the application.
 * More details of the Theme System could be found here [Enabling Theme System](#/docs/concepts/theme-system)
 *
 * A simple layout with footer:
 *
 * @stacked-example(Layout With Footer, layout/layout-w-footer.component)
 *
 * It is possible to ask the layout to center the columns (notice: we added a `center` attribute
 * to the layout:
 *
 * ```html
 * <nb-layout center>
 *   <nb-layout-header>Awesome Company</nb-layout-header>
 *
 *   <nb-layout-column>
 *     Hello World!
 *   </nb-layout-column>
 *
 *   <nb-layout-footer>Contact us</nb-layout-footer>
 * </nb-layout>
 * ```
 *
 * @styles
 *
 * layout-background-color:
 * layout-text-color:
 * layout-text-font-family:
 * layout-text-font-size:
 * layout-text-font-weight:
 * layout-text-line-height:
 * layout-min-height:
 * layout-content-width:
 * layout-window-mode-min-width:
 * layout-window-mode-max-width:
 * layout-window-mode-background-color:
 * layout-window-mode-padding-top:
 * layout-window-shadow:
 * layout-padding:
 * layout-medium-padding:
 * layout-small-padding:
 * layout-scrollbar-background-color:
 * layout-scrollbar-color:
 * layout-scrollbar-width:
 */
var NbLayoutComponent = /** @class */ (function () {
    function NbLayoutComponent(themeService, spinnerService, elementRef, renderer, window, document, platformId, layoutDirectionService, scrollService, rulerService, scrollTop, overlayContainer) {
        var _this = this;
        this.themeService = themeService;
        this.spinnerService = spinnerService;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.window = window;
        this.document = document;
        this.platformId = platformId;
        this.layoutDirectionService = layoutDirectionService;
        this.scrollService = scrollService;
        this.rulerService = rulerService;
        this.scrollTop = scrollTop;
        this.overlayContainer = overlayContainer;
        this.centerValue = false;
        this.restoreScrollTopValue = true;
        this.windowModeValue = false;
        this.withScrollValue = false;
        this.withSubheader = false;
        this.overlayScrollBlock = false;
        this.afterViewInit$ = new BehaviorSubject(null);
        this.alive = true;
        this.registerAsOverlayContainer();
        this.themeService.onThemeChange()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (theme) {
            var body = _this.document.getElementsByTagName('body')[0];
            if (theme.previous) {
                _this.renderer.removeClass(body, "nb-theme-" + theme.previous);
            }
            _this.renderer.addClass(body, "nb-theme-" + theme.name);
        });
        this.themeService.onAppendLayoutClass()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (className) {
            _this.renderer.addClass(_this.elementRef.nativeElement, className);
        });
        this.themeService.onRemoveLayoutClass()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (className) {
            _this.renderer.removeClass(_this.elementRef.nativeElement, className);
        });
        this.spinnerService.registerLoader(new Promise(function (resolve, reject) {
            _this.afterViewInit$
                .pipe(takeWhile(function () { return _this.alive; }))
                .subscribe(function (_) { return resolve(); });
        }));
        this.spinnerService.load();
        this.rulerService.onGetDimensions()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (_a) {
            var listener = _a.listener;
            listener.next(_this.getDimensions());
            listener.complete();
        });
        this.scrollService.onGetPosition()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (_a) {
            var listener = _a.listener;
            listener.next(_this.getScrollPosition());
            listener.complete();
        });
        this.scrollTop
            .shouldRestore()
            .pipe(filter(function () { return _this.restoreScrollTopValue; }), takeWhile(function () { return _this.alive; }))
            .subscribe(function () {
            _this.scroll(0, 0);
        });
        this.scrollService
            .onScrollableChange()
            .pipe(filter(function () { return _this.withScrollValue; }))
            .subscribe(function (scrollable) {
            var root = _this.document.documentElement;
            var scrollBlockClass = 'nb-global-scrollblock';
            _this.overlayScrollBlock = !scrollable;
            /**
             * In case when Nebular Layout custom scroll `withScroll` mode is enabled
             * we need to disable default CDK scroll blocker (@link NbBlockScrollStrategyAdapter) on HTML element
             * so that it won't add additional positioning.
             */
            if (!scrollable) {
                _this.renderer.addClass(root, scrollBlockClass);
            }
            else {
                _this.renderer.removeClass(root, scrollBlockClass);
            }
        });
        if (isPlatformBrowser(this.platformId)) {
            // trigger first time so that after the change we have the initial value
            this.themeService.changeWindowWidth(this.window.innerWidth);
        }
    }
    Object.defineProperty(NbLayoutComponent.prototype, "center", {
        /**
         * Defines whether the layout columns will be centered after some width
         * @param {boolean} val
         */
        set: function (val) {
            this.centerValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "windowMode", {
        /**
         * Defines whether the layout enters a 'window' mode, when the layout content (including sidebars and fixed header)
         * becomes centered by width with a margin from the top of the screen, like a floating window.
         * Automatically enables `withScroll` mode, as in the window mode scroll must be inside the layout and cannot be on
         * window. (TODO: check this)
         * @param {boolean} val
         */
        set: function (val) {
            this.windowModeValue = convertToBoolProperty(val);
            this.withScroll = this.windowModeValue;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "withScroll", {
        /**
         * Defines whether to move the scrollbars to layout or leave it at the body level.
         * Automatically set to true when `windowMode` is enabled.
         * @param {boolean} val
         */
        set: function (val) {
            this.withScrollValue = convertToBoolProperty(val);
            // TODO: is this the best way of doing it? as we don't have access to body from theme styles
            // TODO: add e2e test
            var body = this.document.getElementsByTagName('body')[0];
            if (this.withScrollValue) {
                this.renderer.setStyle(body, 'overflow', 'hidden');
            }
            else {
                this.renderer.setStyle(body, 'overflow', 'initial');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutComponent.prototype, "restoreScrollTop", {
        /**
         * Restores scroll to the top of the page after navigation
         * @param {boolean} val
         */
        set: function (val) {
            this.restoreScrollTopValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbLayoutComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.layoutDirectionService.onDirectionChange()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (direction) { return _this.document.dir = direction; });
        this.scrollService.onManualScroll()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (_a) {
            var x = _a.x, y = _a.y;
            return _this.scroll(x, y);
        });
        this.afterViewInit$.next(true);
    };
    NbLayoutComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        this.unregisterAsOverlayContainer();
    };
    NbLayoutComponent.prototype.onScroll = function ($event) {
        this.scrollService.fireScrollChange($event);
    };
    NbLayoutComponent.prototype.onResize = function (event) {
        this.themeService.changeWindowWidth(event.target.innerWidth);
    };
    /**
     * Returns scroll and client height/width
     *
     * Depending on the current scroll mode (`withScroll=true`) returns sizes from the body element
     * or from the `.scrollable-container`
     * @returns {NbLayoutDimensions}
     */
    NbLayoutComponent.prototype.getDimensions = function () {
        var clientWidth, clientHeight, scrollWidth, scrollHeight = 0;
        if (this.withScrollValue) {
            var container = this.scrollableContainerRef.nativeElement;
            clientWidth = container.clientWidth;
            clientHeight = container.clientHeight;
            scrollWidth = container.scrollWidth;
            scrollHeight = container.scrollHeight;
        }
        else {
            var _a = this.document, documentElement = _a.documentElement, body = _a.body;
            clientWidth = documentElement.clientWidth || body.clientWidth;
            clientHeight = documentElement.clientHeight || body.clientHeight;
            scrollWidth = documentElement.scrollWidth || body.scrollWidth;
            scrollHeight = documentElement.scrollHeight || body.scrollHeight;
        }
        return {
            clientWidth: clientWidth,
            clientHeight: clientHeight,
            scrollWidth: scrollWidth,
            scrollHeight: scrollHeight,
        };
    };
    /**
     * Returns scroll position of current scroll container.
     *
     * If `withScroll` = true, returns scroll position of the `.scrollable-container` element,
     * otherwise - of the scrollable element of the window (which may be different depending of a browser)
     *
     * @returns {NbScrollPosition}
     */
    NbLayoutComponent.prototype.getScrollPosition = function () {
        if (!isPlatformBrowser(this.platformId)) {
            return { x: 0, y: 0 };
        }
        if (this.withScrollValue) {
            var container = this.scrollableContainerRef.nativeElement;
            return { x: container.scrollLeft, y: container.scrollTop };
        }
        var documentRect = this.document.documentElement.getBoundingClientRect();
        var x = -documentRect.left || this.document.body.scrollLeft || this.window.scrollX ||
            this.document.documentElement.scrollLeft || 0;
        var y = -documentRect.top || this.document.body.scrollTop || this.window.scrollY ||
            this.document.documentElement.scrollTop || 0;
        return { x: x, y: y };
    };
    NbLayoutComponent.prototype.registerAsOverlayContainer = function () {
        if (this.overlayContainer.setContainer) {
            this.overlayContainer.setContainer(this.elementRef.nativeElement);
        }
    };
    NbLayoutComponent.prototype.unregisterAsOverlayContainer = function () {
        if (this.overlayContainer.clearContainer) {
            this.overlayContainer.clearContainer();
        }
    };
    NbLayoutComponent.prototype.scroll = function (x, y) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        var _a = this.getScrollPosition(), currentX = _a.x, currentY = _a.y;
        x = x == null ? currentX : x;
        y = y == null ? currentY : y;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (this.withScrollValue) {
            var scrollable = this.scrollableContainerRef.nativeElement;
            if (scrollable.scrollTo) {
                scrollable.scrollTo(x, y);
            }
            else {
                scrollable.scrollLeft = x;
                scrollable.scrollTop = y;
            }
        }
        else {
            this.window.scrollTo(x, y);
        }
    };
    __decorate$56([
        HostBinding('class.window-mode'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutComponent.prototype, "windowModeValue", void 0);
    __decorate$56([
        HostBinding('class.with-scroll'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutComponent.prototype, "withScrollValue", void 0);
    __decorate$56([
        HostBinding('class.with-subheader'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutComponent.prototype, "withSubheader", void 0);
    __decorate$56([
        HostBinding('class.overlay-scroll-block'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutComponent.prototype, "overlayScrollBlock", void 0);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutComponent.prototype, "center", null);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutComponent.prototype, "windowMode", null);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutComponent.prototype, "withScroll", null);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutComponent.prototype, "restoreScrollTop", null);
    __decorate$56([
        ViewChild('layoutTopDynamicArea', { read: ViewContainerRef, static: false }),
        __metadata$38("design:type", ViewContainerRef)
    ], NbLayoutComponent.prototype, "veryTopRef", void 0);
    __decorate$56([
        ViewChild('scrollableContainer', { read: ElementRef, static: false }),
        __metadata$38("design:type", ElementRef)
    ], NbLayoutComponent.prototype, "scrollableContainerRef", void 0);
    __decorate$56([
        HostListener('window:scroll', ['$event']),
        __metadata$38("design:type", Function),
        __metadata$38("design:paramtypes", [Object]),
        __metadata$38("design:returntype", void 0)
    ], NbLayoutComponent.prototype, "onScroll", null);
    __decorate$56([
        HostListener('window:resize', ['$event']),
        __metadata$38("design:type", Function),
        __metadata$38("design:paramtypes", [Object]),
        __metadata$38("design:returntype", void 0)
    ], NbLayoutComponent.prototype, "onResize", null);
    NbLayoutComponent = __decorate$56([
        Component({
            selector: 'nb-layout',
            template: "\n    <div class=\"scrollable-container\" #scrollableContainer (scroll)=\"onScroll($event)\">\n      <div class=\"layout\">\n        <ng-content select=\"nb-layout-header:not([subheader])\"></ng-content>\n        <div class=\"layout-container\">\n          <ng-content select=\"nb-sidebar\"></ng-content>\n          <div class=\"content\" [class.center]=\"centerValue\">\n            <ng-content select=\"nb-layout-header[subheader]\"></ng-content>\n            <div class=\"columns\">\n              <ng-content select=\"nb-layout-column\"></ng-content>\n            </div>\n            <ng-content select=\"nb-layout-footer\"></ng-content>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            styles: [":host{-webkit-font-smoothing:antialiased}[dir=ltr] :host{text-align:left}[dir=rtl] :host{text-align:right}:host .layout{display:flex;flex-direction:column}:host ::ng-deep nb-layout-header{display:block}:host ::ng-deep nb-layout-header nav{align-items:center;justify-content:flex-start;display:flex}:host ::ng-deep nb-layout-header.fixed{position:fixed;top:0;left:0;right:0;z-index:1040}:host .layout-container{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row}[dir=ltr] :host .layout-container ::ng-deep nb-sidebar.left{order:0}[dir=rtl] :host .layout-container ::ng-deep nb-sidebar.left{order:2}[dir=ltr] :host .layout-container ::ng-deep nb-sidebar.right{order:2}[dir=rtl] :host .layout-container ::ng-deep nb-sidebar.right{order:0}:host .layout-container ::ng-deep nb-sidebar.end{order:2}:host .layout-container ::ng-deep nb-sidebar .fixed{position:fixed;width:100%;overflow-y:auto;height:100%}:host .layout-container .content{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:column;min-width:0}:host .layout-container .content.center{max-width:100%;position:relative;margin-left:auto;margin-right:auto}:host .layout-container .content .columns{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row;width:100%}:host .layout-container .content .columns ::ng-deep nb-layout-column{order:1;flex:1 0;min-width:0}[dir=ltr] :host .layout-container .content .columns ::ng-deep nb-layout-column.left{order:0}[dir=rtl] :host .layout-container .content .columns ::ng-deep nb-layout-column.left{order:2}:host .layout-container .content .columns ::ng-deep nb-layout-column.start{order:0}:host .layout-container .content ::ng-deep nb-layout-footer{display:block;margin-top:auto}:host .layout-container .content ::ng-deep nb-layout-footer nav{justify-content:center;display:flex}\n"]
        }),
        __param$10(4, Inject(NB_WINDOW)),
        __param$10(5, Inject(NB_DOCUMENT)),
        __param$10(6, Inject(PLATFORM_ID)),
        __metadata$38("design:paramtypes", [NbThemeService,
            NbSpinnerService,
            ElementRef,
            Renderer2, Object, Object, Object,
            NbLayoutDirectionService,
            NbLayoutScrollService,
            NbLayoutRulerService,
            NbRestoreScrollTopHelper,
            NbOverlayContainerAdapter])
    ], NbLayoutComponent);
    return NbLayoutComponent;
}());
/**
 * A container component which determines a content position inside of the layout.
 * The layout could contain unlimited columns (not including the sidebars).
 *
 * By default the columns are ordered from the left to the right,
 * but it's also possible to overwrite this behavior by setting a `left` attribute to the column,
 * moving it to the very first position:
 *
 * @stacked-example(Column Left, layout/layout-column-left.component)
 */
var NbLayoutColumnComponent = /** @class */ (function () {
    function NbLayoutColumnComponent() {
    }
    Object.defineProperty(NbLayoutColumnComponent.prototype, "left", {
        /**
         * Move the column to the very left position in the layout.
         * @param {boolean} val
         */
        set: function (val) {
            this.leftValue = convertToBoolProperty(val);
            this.startValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutColumnComponent.prototype, "start", {
        /**
         * Make columnt first in the layout.
         * @param {boolean} val
         */
        set: function (val) {
            this.startValue = convertToBoolProperty(val);
            this.leftValue = false;
        },
        enumerable: true,
        configurable: true
    });
    __decorate$56([
        HostBinding('class.left'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutColumnComponent.prototype, "leftValue", void 0);
    __decorate$56([
        HostBinding('class.start'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutColumnComponent.prototype, "startValue", void 0);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutColumnComponent.prototype, "left", null);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutColumnComponent.prototype, "start", null);
    NbLayoutColumnComponent = __decorate$56([
        Component({
            selector: 'nb-layout-column',
            template: "\n    <ng-content></ng-content>\n  "
        })
    ], NbLayoutColumnComponent);
    return NbLayoutColumnComponent;
}());
/**
 * Page header component.
 * Located on top of the page above the layout columns and sidebars.
 * Could be made `fixed` by setting the corresponding property. In the fixed mode the header becomes
 * sticky to the top of the nb-layout (to of the page). Here's an example:
 *
 * @stacked-example(Fixed Header, layout/layout-fixed-header.component)
 *
 * In a pair with sidebar it is possible to setup a configuration when header is placed on a side of the sidebar
 * and not on top of it. To achieve this simply put a `subheader` property to the header like this:
 * ```html
 * <nb-layout-header subheader></nb-layout-header>
 * ```
 * @stacked-example(Subheader, layout/layout-sidebar-subheader.component)
 * Note that in such configuration sidebar shadow is removed and header cannot be make `fixed`.
 *
 * Same way you can put both `fixed` and `clipped` headers adding creating a sub-header for your app:
 *
 * @stacked-example(Subheader, layout/layout-subheader.component)
 *
 * @styles
 *
 * header-background-color:
 * header-text-color:
 * header-text-font-family:
 * header-text-font-size:
 * header-text-font-weight:
 * header-text-line-height:
 * header-height:
 * header-padding:
 * header-shadow:
 */
var NbLayoutHeaderComponent = /** @class */ (function () {
    function NbLayoutHeaderComponent(layout) {
        this.layout = layout;
    }
    Object.defineProperty(NbLayoutHeaderComponent.prototype, "fixed", {
        /**
         * Makes the header sticky to the top of the nb-layout.
         * @param {boolean} val
         */
        set: function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbLayoutHeaderComponent.prototype, "subheader", {
        /**
         * Places header on a side of the sidebar, and not above.
         * Disables fixed mode for this header and remove a shadow from the sidebar.
         * @param {boolean} val
         */
        set: function (val) {
            this.subheaderValue = convertToBoolProperty(val);
            this.fixedValue = false;
            this.layout.withSubheader = this.subheaderValue;
        },
        enumerable: true,
        configurable: true
    });
    __decorate$56([
        HostBinding('class.fixed'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutHeaderComponent.prototype, "fixedValue", void 0);
    __decorate$56([
        HostBinding('class.subheader'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutHeaderComponent.prototype, "subheaderValue", void 0);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutHeaderComponent.prototype, "fixed", null);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutHeaderComponent.prototype, "subheader", null);
    NbLayoutHeaderComponent = __decorate$56([
        Component({
            selector: 'nb-layout-header',
            template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  "
        }),
        __metadata$38("design:paramtypes", [NbLayoutComponent])
    ], NbLayoutHeaderComponent);
    return NbLayoutHeaderComponent;
}());
/**
 * Page footer.
 * Located under the nb-layout content (specifically, under the columns).
 * Could be made `fixed`, becoming sticky to the bottom of the view port (window).
 *
 * @styles
 *
 * footer-background-color:
 * footer-text-color:
 * footer-text-font-family:
 * footer-text-font-size:
 * footer-text-font-weight:
 * footer-text-line-height:
 * footer-text-highlight-color:
 * footer-height:
 * footer-padding:
 * footer-divider-color:
 * footer-divider-style:
 * footer-divider-width:
 * footer-shadow:
 */
var NbLayoutFooterComponent = /** @class */ (function () {
    function NbLayoutFooterComponent() {
    }
    Object.defineProperty(NbLayoutFooterComponent.prototype, "fixed", {
        /**
         * Makes the footer sticky to the bottom of the window.
         * @param {boolean} val
         */
        set: function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    __decorate$56([
        HostBinding('class.fixed'),
        __metadata$38("design:type", Boolean)
    ], NbLayoutFooterComponent.prototype, "fixedValue", void 0);
    __decorate$56([
        Input(),
        __metadata$38("design:type", Boolean),
        __metadata$38("design:paramtypes", [Boolean])
    ], NbLayoutFooterComponent.prototype, "fixed", null);
    NbLayoutFooterComponent = __decorate$56([
        Component({
            selector: 'nb-layout-footer',
            template: "\n    <nav [class.fixed]=\"fixedValue\">\n      <ng-content></ng-content>\n    </nav>\n  "
        })
    ], NbLayoutFooterComponent);
    return NbLayoutFooterComponent;
}());

var __decorate$55 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_LAYOUT_COMPONENTS = [
    NbLayoutComponent,
    NbLayoutColumnComponent,
    NbLayoutFooterComponent,
    NbLayoutHeaderComponent,
];
var NbLayoutModule = /** @class */ (function () {
    function NbLayoutModule() {
    }
    NbLayoutModule = __decorate$55([
        NgModule({
            imports: [
                NbSharedModule,
            ],
            declarations: NB_LAYOUT_COMPONENTS.slice(),
            providers: [
                NbRestoreScrollTopHelper,
            ],
            exports: NB_LAYOUT_COMPONENTS.slice(),
        })
    ], NbLayoutModule);
    return NbLayoutModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate$60 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$41 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var itemClick$ = new Subject();
var addItems$ = new ReplaySubject(1);
var navigateHome$ = new ReplaySubject(1);
var getSelectedItem$ = new ReplaySubject(1);
var itemSelect$ = new ReplaySubject(1);
var itemHover$ = new ReplaySubject(1);
var submenuToggle$ = new ReplaySubject(1);
var collapseAll$ = new ReplaySubject(1);
// TODO: check if we need both URL and LINK
/**
 *
 *
 * Menu Item options example
 * @stacked-example(Menu Link Parameters, menu/menu-link-params.component)
 *
 *
 */
var NbMenuItem = /** @class */ (function () {
    function NbMenuItem() {
        /**
         * Item is selected when partly or fully equal to the current url
         * @type {string}
         */
        this.pathMatch = 'full';
    }
    /**
     * @returns item parents in top-down order
     */
    NbMenuItem.getParents = function (item) {
        var parents = [];
        var parent = item.parent;
        while (parent) {
            parents.unshift(parent);
            parent = parent.parent;
        }
        return parents;
    };
    NbMenuItem.isParent = function (item, possibleChild) {
        return possibleChild.parent
            ? possibleChild.parent === item || this.isParent(item, possibleChild.parent)
            : false;
    };
    return NbMenuItem;
}());
// TODO: map select events to router change events
// TODO: review the interface
/**
 *
 *
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 * @stacked-example(Menu Service, menu/menu-service.component)
 *
 *
 */
var NbMenuService = /** @class */ (function () {
    function NbMenuService() {
    }
    /**
     * Add items to the end of the menu items list
     * @param {List<NbMenuItem>} items
     * @param {string} tag
     */
    NbMenuService.prototype.addItems = function (items, tag) {
        addItems$.next({ tag: tag, items: items });
    };
    /**
     * Collapses all menu items
     * @param {string} tag
     */
    NbMenuService.prototype.collapseAll = function (tag) {
        collapseAll$.next({ tag: tag });
    };
    /**
     * Navigate to the home menu item
     * @param {string} tag
     */
    NbMenuService.prototype.navigateHome = function (tag) {
        navigateHome$.next({ tag: tag });
    };
    /**
     * Returns currently selected item. Won't subscribe to the future events.
     * @param {string} tag
     * @returns {Observable<{tag: string; item: NbMenuItem}>}
     */
    NbMenuService.prototype.getSelectedItem = function (tag) {
        var listener = new BehaviorSubject(null);
        getSelectedItem$.next({ tag: tag, listener: listener });
        return listener.asObservable();
    };
    NbMenuService.prototype.onItemClick = function () {
        return itemClick$.pipe(share());
    };
    NbMenuService.prototype.onItemSelect = function () {
        return itemSelect$.pipe(share());
    };
    NbMenuService.prototype.onItemHover = function () {
        return itemHover$.pipe(share());
    };
    NbMenuService.prototype.onSubmenuToggle = function () {
        return submenuToggle$.pipe(share());
    };
    NbMenuService = __decorate$60([
        Injectable()
    ], NbMenuService);
    return NbMenuService;
}());
var NbMenuInternalService = /** @class */ (function () {
    function NbMenuInternalService(location) {
        this.location = location;
    }
    NbMenuInternalService.prototype.prepareItems = function (items) {
        var _this = this;
        var defaultItem = new NbMenuItem();
        items.forEach(function (i) {
            _this.applyDefaults(i, defaultItem);
            _this.setParent(i);
        });
    };
    NbMenuInternalService.prototype.selectFromUrl = function (items, tag, collapseOther) {
        if (collapseOther === void 0) { collapseOther = false; }
        var selectedItem = this.findItemByUrl(items);
        if (selectedItem) {
            this.selectItem(selectedItem, items, collapseOther, tag);
        }
    };
    NbMenuInternalService.prototype.selectItem = function (item, items, collapseOther, tag) {
        if (collapseOther === void 0) { collapseOther = false; }
        var unselectedItems = this.resetSelection(items);
        var collapsedItems = collapseOther ? this.collapseItems(items) : [];
        for (var _i = 0, _a = NbMenuItem.getParents(item); _i < _a.length; _i++) {
            var parent_1 = _a[_i];
            parent_1.selected = true;
            // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
            if (!unselectedItems.includes(parent_1)) {
                this.itemSelect(parent_1, tag);
            }
            var wasNotExpanded = !parent_1.expanded;
            parent_1.expanded = true;
            var i = collapsedItems.indexOf(parent_1);
            // emit event only for items that weren't expanded before.
            // 'collapsedItems' contains items that were expanded, so no need to emit event.
            // in case 'collapseOther' is false, 'collapsedItems' will be empty,
            // so also check if item isn't expanded already ('wasNotExpanded').
            if (i === -1 && wasNotExpanded) {
                this.submenuToggle(parent_1, tag);
            }
            else {
                collapsedItems.splice(i, 1);
            }
        }
        item.selected = true;
        // emit event only for items that weren't selected before ('unselectedItems' contains items that were selected)
        if (!unselectedItems.includes(item)) {
            this.itemSelect(item, tag);
        }
        // remaining items which wasn't expanded back after expanding all currently selected items
        for (var _b = 0, collapsedItems_1 = collapsedItems; _b < collapsedItems_1.length; _b++) {
            var collapsedItem = collapsedItems_1[_b];
            this.submenuToggle(collapsedItem, tag);
        }
    };
    NbMenuInternalService.prototype.collapseAll = function (items, tag, except) {
        var collapsedItems = this.collapseItems(items, except);
        for (var _i = 0, collapsedItems_2 = collapsedItems; _i < collapsedItems_2.length; _i++) {
            var item = collapsedItems_2[_i];
            this.submenuToggle(item, tag);
        }
    };
    NbMenuInternalService.prototype.onAddItem = function () {
        return addItems$.pipe(share());
    };
    NbMenuInternalService.prototype.onNavigateHome = function () {
        return navigateHome$.pipe(share());
    };
    NbMenuInternalService.prototype.onCollapseAll = function () {
        return collapseAll$.pipe(share());
    };
    NbMenuInternalService.prototype.onGetSelectedItem = function () {
        return getSelectedItem$.pipe(share());
    };
    NbMenuInternalService.prototype.itemHover = function (item, tag) {
        itemHover$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.submenuToggle = function (item, tag) {
        submenuToggle$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.itemSelect = function (item, tag) {
        itemSelect$.next({ tag: tag, item: item });
    };
    NbMenuInternalService.prototype.itemClick = function (item, tag) {
        itemClick$.next({ tag: tag, item: item });
    };
    /**
     * Unselect all given items deeply.
     * @param items array of items to unselect.
     * @returns items which selected value was changed.
     */
    NbMenuInternalService.prototype.resetSelection = function (items) {
        var unselectedItems = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.selected) {
                unselectedItems.push(item);
            }
            item.selected = false;
            if (item.children) {
                unselectedItems.push.apply(unselectedItems, this.resetSelection(item.children));
            }
        }
        return unselectedItems;
    };
    /**
     * Collapse all given items deeply.
     * @param items array of items to collapse.
     * @param except menu item which shouldn't be collapsed, also disables collapsing for parents of this item.
     * @returns items which expanded value was changed.
     */
    NbMenuInternalService.prototype.collapseItems = function (items, except) {
        var collapsedItems = [];
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            if (except && (item === except || NbMenuItem.isParent(item, except))) {
                continue;
            }
            if (item.expanded) {
                collapsedItems.push(item);
            }
            item.expanded = false;
            if (item.children) {
                collapsedItems.push.apply(collapsedItems, this.collapseItems(item.children));
            }
        }
        return collapsedItems;
    };
    NbMenuInternalService.prototype.applyDefaults = function (item, defaultItem) {
        var _this = this;
        var menuItem = __assign({}, item);
        Object.assign(item, defaultItem, menuItem);
        item.children && item.children.forEach(function (child) {
            _this.applyDefaults(child, defaultItem);
        });
    };
    NbMenuInternalService.prototype.setParent = function (item) {
        var _this = this;
        item.children && item.children.forEach(function (child) {
            child.parent = item;
            _this.setParent(child);
        });
    };
    /**
     * Find deepest item which link matches current URL path.
     * @param items array of items to search in.
     * @returns found item of undefined.
     */
    NbMenuInternalService.prototype.findItemByUrl = function (items) {
        var _this = this;
        var selectedItem;
        items.some(function (item) {
            if (item.children) {
                selectedItem = _this.findItemByUrl(item.children);
            }
            if (!selectedItem && _this.isSelectedInUrl(item)) {
                selectedItem = item;
            }
            return selectedItem;
        });
        return selectedItem;
    };
    NbMenuInternalService.prototype.isSelectedInUrl = function (item) {
        var exact = item.pathMatch === 'full';
        var link = item.link;
        var isSelectedInPath = exact
            ? isUrlPathEqual(this.location.path(), link)
            : isUrlPathContain(this.location.path(), link);
        if (isSelectedInPath && item.fragment != null) {
            return exact
                ? isFragmentEqual(this.location.path(), item.fragment)
                : isFragmentContain(this.location.path(), item.fragment);
        }
        return isSelectedInPath;
    };
    NbMenuInternalService = __decorate$60([
        Injectable(),
        __metadata$41("design:paramtypes", [Location])
    ], NbMenuInternalService);
    return NbMenuInternalService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$59 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$40 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$11 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbToggleStates;
(function (NbToggleStates) {
    NbToggleStates["Expanded"] = "expanded";
    NbToggleStates["Collapsed"] = "collapsed";
})(NbToggleStates || (NbToggleStates = {}));
var NbMenuItemComponent = /** @class */ (function () {
    function NbMenuItemComponent(menuService, directionService) {
        this.menuService = menuService;
        this.directionService = directionService;
        this.menuItem = null;
        this.hoverItem = new EventEmitter();
        this.toggleSubMenu = new EventEmitter();
        this.selectItem = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.alive = true;
    }
    NbMenuItemComponent.prototype.ngDoCheck = function () {
        this.toggleState = this.menuItem.expanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed;
    };
    NbMenuItemComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.menuService.onSubmenuToggle()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (_a) {
            var item = _a.item;
            return item === _this.menuItem;
        }), map(function (_a) {
            var item = _a.item;
            return item.expanded;
        }))
            .subscribe(function (isExpanded) { return _this.toggleState = isExpanded ? NbToggleStates.Expanded : NbToggleStates.Collapsed; });
    };
    NbMenuItemComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbMenuItemComponent.prototype.onToggleSubMenu = function (item) {
        this.toggleSubMenu.emit(item);
    };
    NbMenuItemComponent.prototype.onHoverItem = function (item) {
        this.hoverItem.emit(item);
    };
    NbMenuItemComponent.prototype.onSelectItem = function (item) {
        this.selectItem.emit(item);
    };
    NbMenuItemComponent.prototype.onItemClick = function (item) {
        this.itemClick.emit(item);
    };
    NbMenuItemComponent.prototype.getExpandStateIcon = function () {
        if (this.menuItem.expanded) {
            return 'chevron-down-outline';
        }
        return this.directionService.isLtr()
            ? 'chevron-left-outline'
            : 'chevron-right-outline';
    };
    __decorate$59([
        Input(),
        __metadata$40("design:type", Object)
    ], NbMenuItemComponent.prototype, "menuItem", void 0);
    __decorate$59([
        Output(),
        __metadata$40("design:type", Object)
    ], NbMenuItemComponent.prototype, "hoverItem", void 0);
    __decorate$59([
        Output(),
        __metadata$40("design:type", Object)
    ], NbMenuItemComponent.prototype, "toggleSubMenu", void 0);
    __decorate$59([
        Output(),
        __metadata$40("design:type", Object)
    ], NbMenuItemComponent.prototype, "selectItem", void 0);
    __decorate$59([
        Output(),
        __metadata$40("design:type", Object)
    ], NbMenuItemComponent.prototype, "itemClick", void 0);
    NbMenuItemComponent = __decorate$59([
        Component({
            selector: '[nbMenuItem]',
            template: "<span *ngIf=\"menuItem.group\">\n  <nb-icon class=\"menu-icon\" [icon]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  {{ menuItem.title }}\n</span>\n<a *ngIf=\"menuItem.link && !menuItem.url && !menuItem.children && !menuItem.group\"\n   [routerLink]=\"menuItem.link\"\n   [queryParams]=\"menuItem.queryParams\"\n   [fragment]=\"menuItem.fragment\"\n   [skipLocationChange]=\"menuItem.skipLocationChange\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"onItemClick(menuItem);\">\n  <nb-icon class=\"menu-icon\" [icon]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"menuItem.url && !menuItem.children && !menuItem.link && !menuItem.group\"\n   [attr.href]=\"menuItem.url\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"onSelectItem(menuItem)\">\n  <nb-icon class=\"menu-icon\" [icon]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"!menuItem.children && !menuItem.link && !menuItem.url && !menuItem.group\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   (click)=\"$event.preventDefault(); onItemClick(menuItem);\">\n  <nb-icon class=\"menu-icon\" [icon]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n</a>\n<a *ngIf=\"menuItem.children\"\n   (click)=\"$event.preventDefault(); onToggleSubMenu(menuItem);\"\n   [attr.target]=\"menuItem.target\"\n   [attr.title]=\"menuItem.title\"\n   [class.active]=\"menuItem.selected\"\n   (mouseenter)=\"onHoverItem(menuItem)\"\n   href=\"#\">\n  <nb-icon class=\"menu-icon\" [icon]=\"menuItem.icon\" *ngIf=\"menuItem.icon\"></nb-icon>\n  <span class=\"menu-title\">{{ menuItem.title }}</span>\n  <nb-icon class=\"expand-state\" [icon]=\"getExpandStateIcon()\" pack=\"nebular-essentials\"></nb-icon>\n</a>\n<ul *ngIf=\"menuItem.children\"\n    [class.collapsed]=\"!(menuItem.children && menuItem.expanded)\"\n    [class.expanded]=\"menuItem.expanded\"\n    [@toggle]=\"toggleState\"\n    class=\"menu-items\">\n  <ng-container *ngFor=\"let item of menuItem.children\">\n    <li nbMenuItem *ngIf=\"!item.hidden\"\n        [menuItem]=\"item\"\n        [class.menu-group]=\"item.group\"\n        (hoverItem)=\"onHoverItem($event)\"\n        (toggleSubMenu)=\"onToggleSubMenu($event)\"\n        (selectItem)=\"onSelectItem($event)\"\n        (itemClick)=\"onItemClick($event)\"\n        class=\"menu-item\">\n    </li>\n  </ng-container>\n</ul>\n",
            animations: [
                trigger('toggle', [
                    state(NbToggleStates.Collapsed, style({ height: '0', margin: '0' })),
                    state(NbToggleStates.Expanded, style({ height: '*' })),
                    transition(NbToggleStates.Collapsed + " <=> " + NbToggleStates.Expanded, animate(300)),
                ]),
            ]
        }),
        __metadata$40("design:paramtypes", [NbMenuService,
            NbLayoutDirectionService])
    ], NbMenuItemComponent);
    return NbMenuItemComponent;
}());
/**
 * Vertical menu component.
 *
 * Accepts a list of menu items and renders them accordingly. Supports multi-level menus.
 *
 * Basic example
 * @stacked-example(Showcase, menu/menu-showcase.component)
 *
 * ```ts
 * // ...
 * items: NbMenuItem[] = [
 *  {
 *    title: home,
 *    link: '/'
 *  },
 *  {
 *    title: dashboard,
 *    link: 'dashboard'
 *  }
 * ];
 * // ...
 * <nb-menu [items]="items"></nb-menu>
 * ```
 * ### Installation
 *
 * Import `NbMenuModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbMenuModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbMenuModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Two-level menu example
 * @stacked-example(Two Levels, menu/menu-children.component)
 *
 *
 * Autocollapse menu example
 * @stacked-example(Autocollapse Menu, menu/menu-autocollapse.component)
 *
 *
 * @styles
 *
 * menu-background-color:
 * menu-text-color:
 * menu-text-font-family:
 * menu-text-font-size:
 * menu-text-font-weight:
 * menu-text-line-height:
 * menu-group-text-color:
 * menu-item-border-radius:
 * menu-item-padding:
 * menu-item-hover-background-color:
 * menu-item-hover-cursor:
 * menu-item-hover-text-color:
 * menu-item-icon-hover-color:
 * menu-item-active-background-color:
 * menu-item-active-text-color:
 * menu-item-icon-active-color:
 * menu-item-icon-color:
 * menu-item-icon-margin:
 * menu-item-icon-width:
 * menu-item-divider-color:
 * menu-item-divider-style:
 * menu-item-divider-width:
 * menu-submenu-background-color:
 * menu-submenu-text-color:
 * menu-submenu-margin:
 * menu-submenu-padding:
 * menu-submenu-item-border-color:
 * menu-submenu-item-border-style:
 * menu-submenu-item-border-width:
 * menu-submenu-item-border-radius:
 * menu-submenu-item-padding:
 * menu-submenu-item-hover-background-color:
 * menu-submenu-item-hover-border-color:
 * menu-submenu-item-hover-text-color:
 * menu-submenu-item-icon-hover-color:
 * menu-submenu-item-active-background-color:
 * menu-submenu-item-active-border-color:
 * menu-submenu-item-active-text-color:
 * menu-submenu-item-icon-active-color:
 * menu-submenu-item-active-hover-background-color:
 * menu-submenu-item-active-hover-border-color:
 * menu-submenu-item-active-hover-text-color:
 * menu-submenu-item-icon-active-hover-color:
 */
var NbMenuComponent = /** @class */ (function () {
    function NbMenuComponent(window, menuInternalService, router) {
        this.window = window;
        this.menuInternalService = menuInternalService;
        this.router = router;
        this._autoCollapse = false;
        this.alive = true;
    }
    Object.defineProperty(NbMenuComponent.prototype, "autoCollapse", {
        /**
         * Collapse all opened submenus on the toggle event
         * Default value is "false"
         * @type boolean
         */
        get: function () {
            return this._autoCollapse;
        },
        set: function (value) {
            this._autoCollapse = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService
            .onAddItem()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function (data) { return _this.onAddItem(data); });
        this.menuInternalService
            .onNavigateHome()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function () { return _this.navigateHome(); });
        this.menuInternalService
            .onGetSelectedItem()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function (data) {
            data.listener.next({ tag: _this.tag, item: _this.getSelectedItem(_this.items) });
        });
        this.menuInternalService
            .onCollapseAll()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return _this.compareTag(data.tag); }))
            .subscribe(function () { return _this.collapseAll(); });
        this.router.events
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function () {
            _this.menuInternalService.selectFromUrl(_this.items, _this.tag, _this.autoCollapse);
        });
    };
    NbMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.menuInternalService.selectFromUrl(_this.items, _this.tag, _this.autoCollapse); });
    };
    NbMenuComponent.prototype.onAddItem = function (data) {
        var _a;
        (_a = this.items).push.apply(_a, data.items);
        this.menuInternalService.prepareItems(this.items);
        this.menuInternalService.selectFromUrl(this.items, this.tag, this.autoCollapse);
    };
    NbMenuComponent.prototype.onHoverItem = function (item) {
        this.menuInternalService.itemHover(item, this.tag);
    };
    NbMenuComponent.prototype.onToggleSubMenu = function (item) {
        if (this.autoCollapse) {
            this.menuInternalService.collapseAll(this.items, this.tag, item);
        }
        item.expanded = !item.expanded;
        this.menuInternalService.submenuToggle(item, this.tag);
    };
    // TODO: is not fired on page reload
    NbMenuComponent.prototype.onSelectItem = function (item) {
        this.menuInternalService.selectItem(item, this.items, this.autoCollapse, this.tag);
    };
    NbMenuComponent.prototype.onItemClick = function (item) {
        this.menuInternalService.itemClick(item, this.tag);
    };
    NbMenuComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbMenuComponent.prototype.navigateHome = function () {
        var homeItem = this.getHomeItem(this.items);
        if (homeItem) {
            if (homeItem.link) {
                this.router.navigate([homeItem.link], { queryParams: homeItem.queryParams, fragment: homeItem.fragment });
            }
            if (homeItem.url) {
                this.window.location.href = homeItem.url;
            }
        }
    };
    NbMenuComponent.prototype.collapseAll = function () {
        this.menuInternalService.collapseAll(this.items, this.tag);
    };
    NbMenuComponent.prototype.getHomeItem = function (items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item.home) {
                return item;
            }
            var homeItem = item.children && this.getHomeItem(item.children);
            if (homeItem) {
                return homeItem;
            }
        }
    };
    NbMenuComponent.prototype.compareTag = function (tag) {
        return !tag || tag === this.tag;
    };
    NbMenuComponent.prototype.getSelectedItem = function (items) {
        var _this = this;
        var selected = null;
        items.forEach(function (item) {
            if (item.selected) {
                selected = item;
            }
            if (item.selected && item.children && item.children.length > 0) {
                selected = _this.getSelectedItem(item.children);
            }
        });
        return selected;
    };
    __decorate$59([
        Input(),
        __metadata$40("design:type", String)
    ], NbMenuComponent.prototype, "tag", void 0);
    __decorate$59([
        Input(),
        __metadata$40("design:type", Array)
    ], NbMenuComponent.prototype, "items", void 0);
    __decorate$59([
        Input(),
        __metadata$40("design:type", Boolean),
        __metadata$40("design:paramtypes", [Boolean])
    ], NbMenuComponent.prototype, "autoCollapse", null);
    NbMenuComponent = __decorate$59([
        Component({
            selector: 'nb-menu',
            template: "\n    <ul class=\"menu-items\">\n      <ng-container *ngFor=\"let item of items\">\n        <li nbMenuItem *ngIf=\"!item.hidden\"\n            [menuItem]=\"item\"\n            [class.menu-group]=\"item.group\"\n            (hoverItem)=\"onHoverItem($event)\"\n            (toggleSubMenu)=\"onToggleSubMenu($event)\"\n            (selectItem)=\"onSelectItem($event)\"\n            (itemClick)=\"onItemClick($event)\"\n            class=\"menu-item\">\n        </li>\n      </ng-container>\n    </ul>\n  ",
            styles: [":host ::ng-deep{display:block}:host ::ng-deep .menu-items,:host ::ng-deep .menu-item>.menu-items{list-style-type:none;overflow:hidden}:host ::ng-deep .menu-item a{display:flex;color:inherit;text-decoration:none;align-items:center}:host ::ng-deep .menu-item a .menu-title{flex:1 0 auto}[dir=rtl] :host ::ng-deep .menu-item a .menu-title{text-align:right}:host ::ng-deep .menu-group span{display:flex}\n"]
        }),
        __param$11(0, Inject(NB_WINDOW)),
        __metadata$40("design:paramtypes", [Object, NbMenuInternalService,
            Router])
    ], NbMenuComponent);
    return NbMenuComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$58 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var nbMenuComponents = [NbMenuComponent, NbMenuItemComponent];
var NB_MENU_PROVIDERS = [NbMenuService, NbMenuInternalService];
var NbMenuModule = /** @class */ (function () {
    function NbMenuModule() {
    }
    NbMenuModule_1 = NbMenuModule;
    NbMenuModule.forRoot = function () {
        return {
            ngModule: NbMenuModule_1,
            providers: NB_MENU_PROVIDERS.slice(),
        };
    };
    var NbMenuModule_1;
    NbMenuModule = NbMenuModule_1 = __decorate$58([
        NgModule({
            imports: [NbSharedModule, NbIconModule],
            declarations: nbMenuComponents.slice(),
            exports: nbMenuComponents.slice(),
        })
    ], NbMenuModule);
    return NbMenuModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$62 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$42 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate$62([
        HostBinding('class.full-width'),
        __metadata$42("design:type", Boolean)
    ], NbRouteTabsetComponent.prototype, "fullWidthValue", void 0);
    __decorate$62([
        Input(),
        __metadata$42("design:type", Array)
    ], NbRouteTabsetComponent.prototype, "tabs", void 0);
    __decorate$62([
        Input(),
        __metadata$42("design:type", Object)
    ], NbRouteTabsetComponent.prototype, "activeLinkOptions", void 0);
    __decorate$62([
        Input(),
        __metadata$42("design:type", Boolean),
        __metadata$42("design:paramtypes", [Boolean])
    ], NbRouteTabsetComponent.prototype, "fullWidth", null);
    __decorate$62([
        Output(),
        __metadata$42("design:type", Object)
    ], NbRouteTabsetComponent.prototype, "changeTab", void 0);
    NbRouteTabsetComponent = __decorate$62([
        Component({
            selector: 'nb-route-tabset',
            template: "\n    <ul class=\"route-tabset\">\n      <ng-container *ngFor=\"let tab of tabs\">\n        <li *ngIf=\"tab.disabled; else enabled\"\n            [class.responsive]=\"tab.responsive\"\n            class=\"route-tab disabled\"\n            tabindex=\"-1\">\n          <a tabindex=\"-1\" class=\"tab-link\">\n            <nb-icon *ngIf=\"tab.icon\" [icon]=\"tab.icon\"></nb-icon>\n            <span *ngIf=\"tab.title\" class=\"tab-text\">{{ tab.title }}</span>\n          </a>\n        </li>\n\n        <ng-template #enabled>\n          <li (click)=\"$event.preventDefault(); selectTab(tab)\"\n              [routerLink]=\"tab.route\"\n              routerLinkActive=\"active\"\n              [routerLinkActiveOptions]=\"activeLinkOptions\"\n              [class.responsive]=\"tab.responsive\"\n              tabindex=\"0\"\n              class=\"route-tab\">\n            <a tabindex=\"-1\" class=\"tab-link\">\n              <nb-icon *ngIf=\"tab.icon\" [icon]=\"tab.icon\"></nb-icon>\n              <span *ngIf=\"tab.title\" class=\"tab-text\">{{ tab.title }}</span>\n            </a>\n          </li>\n        </ng-template>\n      </ng-container>\n    </ul>\n    <router-outlet></router-outlet>\n  ",
            styles: [".route-tabset{display:flex;flex-direction:row;list-style-type:none;margin:0}.route-tabset .route-tab{margin-bottom:-1px;text-align:center;padding:0}.route-tabset .route-tab.active a::before{display:block}.route-tabset .route-tab a{position:relative;text-decoration:none;display:inline-block}.route-tabset .route-tab a::before{position:absolute;content:'';width:100%;border-radius:3px;bottom:-2px;left:0}.route-tabset .route-tab a nb-icon{vertical-align:middle}[dir=ltr] .route-tabset .route-tab a nb-icon+span{margin-left:.5rem}[dir=rtl] .route-tabset .route-tab a nb-icon+span{margin-right:.5rem}:host.full-width .route-tabset{justify-content:space-around}\n"]
        })
    ], NbRouteTabsetComponent);
    return NbRouteTabsetComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$61 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbRouteTabsetModule = /** @class */ (function () {
    function NbRouteTabsetModule() {
    }
    NbRouteTabsetModule = __decorate$61([
        NgModule({
            imports: [
                NbSharedModule,
                NbIconModule,
            ],
            declarations: [
                NbRouteTabsetComponent,
            ],
            exports: [
                NbRouteTabsetComponent,
            ],
        })
    ], NbRouteTabsetModule);
    return NbRouteTabsetModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$65 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Sidebar service.
 *
 * Root module service to control the sidebar from any part of the app.
 *
 * Allows you to change sidebar state dynamically from any part of the app:
 * @stacked-example(Sidebar State, sidebar/sidebar-toggle.component)
 */
var NbSidebarService = /** @class */ (function () {
    function NbSidebarService() {
        this.toggle$ = new Subject();
        this.expand$ = new Subject();
        this.collapse$ = new Subject();
    }
    /**
     * Subscribe to toggle events
     *
     * @returns Observable<{ compact: boolean, tag: string }>
     */
    NbSidebarService.prototype.onToggle = function () {
        return this.toggle$.pipe(share());
    };
    /**
     * Subscribe to expand events
     * @returns Observable<{ tag: string }>
     */
    NbSidebarService.prototype.onExpand = function () {
        return this.expand$.pipe(share());
    };
    /**
     * Subscribe to collapse evens
     * @returns Observable<{ tag: string }>
     */
    NbSidebarService.prototype.onCollapse = function () {
        return this.collapse$.pipe(share());
    };
    /**
     * Toggle a sidebar
     * @param {boolean} compact
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    NbSidebarService.prototype.toggle = function (compact, tag) {
        if (compact === void 0) { compact = false; }
        this.toggle$.next({ compact: compact, tag: tag });
    };
    /**
     * Expands a sidebar
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    NbSidebarService.prototype.expand = function (tag) {
        this.expand$.next({ tag: tag });
    };
    /**
     * Collapses a sidebar
     * @param {string} tag If you have multiple sidebars on the page, mark them with `tag` input property and pass it here
     * to specify which sidebar you want to control
     */
    NbSidebarService.prototype.collapse = function (tag) {
        this.collapse$.next({ tag: tag });
    };
    NbSidebarService = __decorate$65([
        Injectable()
    ], NbSidebarService);
    return NbSidebarService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$64 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$43 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Sidebar header container.
 *
 * Placeholder which contains a sidebar header content,
 * placed at the very top of the sidebar outside of the scroll area.
 */
var NbSidebarHeaderComponent = /** @class */ (function () {
    function NbSidebarHeaderComponent() {
    }
    NbSidebarHeaderComponent = __decorate$64([
        Component({
            selector: 'nb-sidebar-header',
            template: "\n    <ng-content></ng-content>\n  "
        })
    ], NbSidebarHeaderComponent);
    return NbSidebarHeaderComponent;
}());
/**
 * Sidebar footer container.
 *
 * Placeholder which contains a sidebar footer content,
 * placed at the very bottom of the sidebar outside of the scroll area.
 */
var NbSidebarFooterComponent = /** @class */ (function () {
    function NbSidebarFooterComponent() {
    }
    NbSidebarFooterComponent = __decorate$64([
        Component({
            selector: 'nb-sidebar-footer',
            template: "\n    <ng-content></ng-content>\n  "
        })
    ], NbSidebarFooterComponent);
    return NbSidebarFooterComponent;
}());
/**
 * Layout sidebar component.
 *
 * @stacked-example(Showcase, sidebar/sidebar-showcase.component)
 *
 * ### Installation
 *
 * Import `NbSidebarModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSidebarModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * and `NbSidebarModule` to your feature module where the component should be shown:
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSidebarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Sidebar can be placed on the left or the right side of the layout,
 * or on start/end position of layout (depends on document direction, left to right or right to left)
 * It can be fixed (shown above the content) or can push the layout when opened.
 *
 * There are three states - `expanded`, `collapsed`, `compacted`.
 * By default sidebar content is fixed and saves its position while the page is being scrolled.
 *
 * Compacted sidebar example:
 * @stacked-example(Compacted Sidebar, sidebar/sidebar-compacted.component)
 *
 * Sidebar also supports a `responsive` behavior, listening to window size change and changing its size respectably.
 *
 * In a pair with header it is possible to setup a configuration when header is placed on a side of the sidebar
 * and not on top of it. To achieve this simply put a `subheader` property to the header like this:
 * ```html
 * <nb-layout-header subheader></nb-layout-header>
 * ```
 * @stacked-example(Subheader, layout/layout-sidebar-subheader.component)
 * Note that in such configuration sidebar shadow is removed and header cannot be make `fixed`.
 *
 * @additional-example(Right Sidebar, sidebar/sidebar-right.component)
 * @additional-example(Fixed Sidebar, sidebar/sidebar-fixed.component)
 *
 * @styles
 *
 * sidebar-background-color:
 * sidebar-text-color:
 * sidebar-text-font-family:
 * sidebar-text-font-size:
 * sidebar-text-font-weight:
 * sidebar-text-line-height:
 * sidebar-height:
 * sidebar-width:
 * sidebar-width-compact:
 * sidebar-padding:
 * sidebar-header-height:
 * sidebar-footer-height:
 * sidebar-shadow:
 * sidebar-menu-item-highlight-color:
 * sidebar-scrollbar-background-color:
 * sidebar-scrollbar-color:
 * sidebar-scrollbar-width:
 */
var NbSidebarComponent = /** @class */ (function () {
    function NbSidebarComponent(sidebarService, themeService, element) {
        this.sidebarService = sidebarService;
        this.themeService = themeService;
        this.element = element;
        this.responsiveValue = false;
        this.alive = true;
        this.containerFixedValue = true;
        this.fixedValue = false;
        this.rightValue = false;
        this.leftValue = true;
        this.startValue = false;
        this.endValue = false;
        // TODO: get width by the key and define only max width for the tablets and mobiles
        /**
         * Controls on which screen sizes sidebar should be switched to compacted state.
         * Works only when responsive mode is on.
         * Default values are `['xs', 'is', 'sm', 'md', 'lg']`.
         *
         * @type string[]
         */
        this.compactedBreakpoints = ['xs', 'is', 'sm', 'md', 'lg'];
        /**
         * Controls on which screen sizes sidebar should be switched to collapsed state.
         * Works only when responsive mode is on.
         * Default values are `['xs', 'is']`.
         *
         * @type string[]
         */
        this.collapsedBreakpoints = ['xs', 'is'];
        this.responsiveState = NbSidebarComponent_1.RESPONSIVE_STATE_PC;
    }
    NbSidebarComponent_1 = NbSidebarComponent;
    Object.defineProperty(NbSidebarComponent.prototype, "expanded", {
        // TODO: rename stateValue to state (take a look to the card component)
        get: function () {
            return this.stateValue === NbSidebarComponent_1.STATE_EXPANDED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "collapsed", {
        get: function () {
            return this.stateValue === NbSidebarComponent_1.STATE_COLLAPSED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "compacted", {
        get: function () {
            return this.stateValue === NbSidebarComponent_1.STATE_COMPACTED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "right", {
        /**
         * Places sidebar on the right side
         * @type {boolean}
         */
        set: function (val) {
            this.rightValue = convertToBoolProperty(val);
            this.leftValue = !this.rightValue;
            this.startValue = false;
            this.endValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "left", {
        /**
         * Places sidebar on the left side
         * @type {boolean}
         */
        set: function (val) {
            this.leftValue = convertToBoolProperty(val);
            this.rightValue = !this.leftValue;
            this.startValue = false;
            this.endValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "start", {
        /**
         * Places sidebar on the start edge of layout
         * @type {boolean}
         */
        set: function (val) {
            this.startValue = convertToBoolProperty(val);
            this.endValue = !this.startValue;
            this.leftValue = false;
            this.rightValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "end", {
        /**
         * Places sidebar on the end edge of layout
         * @type {boolean}
         */
        set: function (val) {
            this.endValue = convertToBoolProperty(val);
            this.startValue = !this.endValue;
            this.leftValue = false;
            this.rightValue = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "fixed", {
        /**
         * Makes sidebar fixed (shown above the layout content)
         * @type {boolean}
         */
        set: function (val) {
            this.fixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "containerFixed", {
        /**
         * Makes sidebar container fixed
         * @type {boolean}
         */
        set: function (val) {
            this.containerFixedValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "state", {
        /**
         * Initial sidebar state, `expanded`|`collapsed`|`compacted`
         * @type {string}
         */
        set: function (val) {
            this.stateValue = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSidebarComponent.prototype, "responsive", {
        /**
         * Makes sidebar listen to media query events and change its behaviour
         * @type {boolean}
         */
        set: function (val) {
            this.responsiveValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    NbSidebarComponent.prototype.toggleResponsive = function (enabled) {
        if (enabled) {
            this.mediaQuerySubscription = this.onMediaQueryChanges();
        }
        else if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    };
    NbSidebarComponent.prototype.ngOnChanges = function (changes) {
        if (changes.responsive) {
            this.toggleResponsive(this.responsiveValue);
        }
    };
    NbSidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sidebarService.onToggle()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.toggle(data.compact);
            }
        });
        this.sidebarService.onExpand()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.expand();
            }
        });
        this.sidebarService.onCollapse()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (data) {
            if (!_this.tag || _this.tag === data.tag) {
                _this.collapse();
            }
        });
    };
    NbSidebarComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        if (this.mediaQuerySubscription) {
            this.mediaQuerySubscription.unsubscribe();
        }
    };
    // TODO: this is more of a workaround, should be a better way to make components communicate to each other
    NbSidebarComponent.prototype.onClick = function (event) {
        var menu = this.element.nativeElement.querySelector('nb-menu');
        if (menu && menu.contains(event.target)) {
            var link = event.target;
            var linkChildren = ['span', 'i'];
            // if we clicked on span - get the link
            if (linkChildren.includes(link.tagName.toLowerCase()) && link.parentNode) {
                link = event.target.parentNode;
            }
            // we only expand if an item has children
            if (link && link.nextElementSibling && link.nextElementSibling.classList.contains('menu-items')) {
                this.expand();
            }
        }
    };
    /**
     * Collapses the sidebar
     */
    NbSidebarComponent.prototype.collapse = function () {
        this.state = NbSidebarComponent_1.STATE_COLLAPSED;
    };
    /**
     * Expands the sidebar
     */
    NbSidebarComponent.prototype.expand = function () {
        this.state = NbSidebarComponent_1.STATE_EXPANDED;
    };
    /**
     * Compacts the sidebar (minimizes)
     */
    NbSidebarComponent.prototype.compact = function () {
        this.state = NbSidebarComponent_1.STATE_COMPACTED;
    };
    /**
     * Toggles sidebar state (expanded|collapsed|compacted)
     * @param {boolean} compact If true, then sidebar state will be changed between expanded & compacted,
     * otherwise - between expanded & collapsed. False by default.
     *
     * Toggle sidebar state
     *
     * ```ts
     * this.sidebar.toggle(true);
     * ```
     */
    NbSidebarComponent.prototype.toggle = function (compact) {
        if (compact === void 0) { compact = false; }
        if (this.responsiveEnabled()) {
            if (this.responsiveState === NbSidebarComponent_1.RESPONSIVE_STATE_MOBILE) {
                compact = false;
            }
        }
        var closedStates = [NbSidebarComponent_1.STATE_COMPACTED, NbSidebarComponent_1.STATE_COLLAPSED];
        if (compact) {
            this.state = closedStates.includes(this.stateValue) ?
                NbSidebarComponent_1.STATE_EXPANDED : NbSidebarComponent_1.STATE_COMPACTED;
        }
        else {
            this.state = closedStates.includes(this.stateValue) ?
                NbSidebarComponent_1.STATE_EXPANDED : NbSidebarComponent_1.STATE_COLLAPSED;
        }
    };
    NbSidebarComponent.prototype.onMediaQueryChanges = function () {
        var _this = this;
        return this.themeService.onMediaQueryChange()
            .subscribe(function (_a) {
            var prev = _a[0], current = _a[1];
            var isCollapsed = _this.collapsedBreakpoints.includes(current.name);
            var isCompacted = _this.compactedBreakpoints.includes(current.name);
            if (isCompacted) {
                _this.fixed = _this.containerFixedValue;
                _this.compact();
                _this.responsiveState = NbSidebarComponent_1.RESPONSIVE_STATE_TABLET;
            }
            if (isCollapsed) {
                _this.fixed = true;
                _this.collapse();
                _this.responsiveState = NbSidebarComponent_1.RESPONSIVE_STATE_MOBILE;
            }
            if (!isCollapsed && !isCompacted && prev.width < current.width) {
                _this.expand();
                _this.fixed = false;
                _this.responsiveState = NbSidebarComponent_1.RESPONSIVE_STATE_PC;
            }
        });
    };
    NbSidebarComponent.prototype.responsiveEnabled = function () {
        return this.responsiveValue;
    };
    var NbSidebarComponent_1;
    NbSidebarComponent.STATE_EXPANDED = 'expanded';
    NbSidebarComponent.STATE_COLLAPSED = 'collapsed';
    NbSidebarComponent.STATE_COMPACTED = 'compacted';
    NbSidebarComponent.RESPONSIVE_STATE_MOBILE = 'mobile';
    NbSidebarComponent.RESPONSIVE_STATE_TABLET = 'tablet';
    NbSidebarComponent.RESPONSIVE_STATE_PC = 'pc';
    __decorate$64([
        HostBinding('class.fixed'),
        __metadata$43("design:type", Boolean)
    ], NbSidebarComponent.prototype, "fixedValue", void 0);
    __decorate$64([
        HostBinding('class.right'),
        __metadata$43("design:type", Boolean)
    ], NbSidebarComponent.prototype, "rightValue", void 0);
    __decorate$64([
        HostBinding('class.left'),
        __metadata$43("design:type", Boolean)
    ], NbSidebarComponent.prototype, "leftValue", void 0);
    __decorate$64([
        HostBinding('class.start'),
        __metadata$43("design:type", Boolean)
    ], NbSidebarComponent.prototype, "startValue", void 0);
    __decorate$64([
        HostBinding('class.end'),
        __metadata$43("design:type", Boolean)
    ], NbSidebarComponent.prototype, "endValue", void 0);
    __decorate$64([
        HostBinding('class.expanded'),
        __metadata$43("design:type", Object),
        __metadata$43("design:paramtypes", [])
    ], NbSidebarComponent.prototype, "expanded", null);
    __decorate$64([
        HostBinding('class.collapsed'),
        __metadata$43("design:type", Object),
        __metadata$43("design:paramtypes", [])
    ], NbSidebarComponent.prototype, "collapsed", null);
    __decorate$64([
        HostBinding('class.compacted'),
        __metadata$43("design:type", Object),
        __metadata$43("design:paramtypes", [])
    ], NbSidebarComponent.prototype, "compacted", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "right", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "left", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "start", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "end", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "fixed", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "containerFixed", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", String),
        __metadata$43("design:paramtypes", [String])
    ], NbSidebarComponent.prototype, "state", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Boolean),
        __metadata$43("design:paramtypes", [Boolean])
    ], NbSidebarComponent.prototype, "responsive", null);
    __decorate$64([
        Input(),
        __metadata$43("design:type", String)
    ], NbSidebarComponent.prototype, "tag", void 0);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Array)
    ], NbSidebarComponent.prototype, "compactedBreakpoints", void 0);
    __decorate$64([
        Input(),
        __metadata$43("design:type", Array)
    ], NbSidebarComponent.prototype, "collapsedBreakpoints", void 0);
    NbSidebarComponent = NbSidebarComponent_1 = __decorate$64([
        Component({
            selector: 'nb-sidebar',
            template: "\n    <div class=\"main-container\"\n         [class.main-container-fixed]=\"containerFixedValue\">\n      <ng-content select=\"nb-sidebar-header\"></ng-content>\n      <div class=\"scrollable\" (click)=\"onClick($event)\">\n        <ng-content></ng-content>\n      </div>\n      <ng-content select=\"nb-sidebar-footer\"></ng-content>\n    </div>\n  ",
            styles: [":host{display:flex;flex-direction:column;overflow:hidden;z-index:auto;order:0}:host .scrollable{overflow-y:auto;overflow-x:hidden;flex:1}:host .main-container{transform:translate3d(0, 0, 0);display:flex;flex-direction:column}:host .main-container-fixed{position:fixed}:host.right{margin-right:0;margin-left:auto}[dir=ltr] :host.right{order:4}[dir=rtl] :host.right{order:0}:host.end{order:4}[dir=ltr] :host.end{margin-right:0;margin-left:auto}[dir=rtl] :host.end{margin-left:0;margin-right:auto}:host.fixed{position:fixed;height:100%;z-index:999;top:0;bottom:0;left:0}:host.fixed.right{right:0}[dir=ltr] :host.fixed.start{left:0}[dir=rtl] :host.fixed.start{right:0}[dir=ltr] :host.fixed.end{right:0}[dir=rtl] :host.fixed.end{left:0}:host ::ng-deep nb-sidebar-footer{margin-top:auto;display:block}:host ::ng-deep nb-sidebar-header{display:block}\n"]
        }),
        __metadata$43("design:paramtypes", [NbSidebarService,
            NbThemeService,
            ElementRef])
    ], NbSidebarComponent);
    return NbSidebarComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$63 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_SIDEBAR_COMPONENTS = [
    NbSidebarComponent,
    NbSidebarFooterComponent,
    NbSidebarHeaderComponent,
];
var NB_SIDEBAR_PROVIDERS = [
    NbSidebarService,
];
var NbSidebarModule = /** @class */ (function () {
    function NbSidebarModule() {
    }
    NbSidebarModule_1 = NbSidebarModule;
    NbSidebarModule.forRoot = function () {
        return {
            ngModule: NbSidebarModule_1,
            providers: NB_SIDEBAR_PROVIDERS.slice(),
        };
    };
    var NbSidebarModule_1;
    NbSidebarModule = NbSidebarModule_1 = __decorate$63([
        NgModule({
            imports: [
                NbSharedModule,
            ],
            declarations: NB_SIDEBAR_COMPONENTS.slice(),
            exports: NB_SIDEBAR_COMPONENTS.slice(),
        })
    ], NbSidebarModule);
    return NbSidebarModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$67 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$44 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Specific tab container.
 *
 * ```ts
 * <nb-tab tabTitle="Users"
 *   badgeText="99+"
 *   badgeStatus="danger">
 *   <p>List of <strong>users</strong>.</p>
 * </nb-tab>
 ```
 */
var NbTabComponent = /** @class */ (function () {
    function NbTabComponent() {
        this.activeValue = false;
        this.responsiveValue = false;
        this.disabledValue = false;
        this.init = false;
    }
    Object.defineProperty(NbTabComponent.prototype, "disabled", {
        /**
         * Item is disabled and cannot be opened.
         * @type {boolean}
         */
        get: function () {
            return this.disabledValue;
        },
        set: function (val) {
            this.disabledValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTabComponent.prototype, "responsive", {
        get: function () {
            return this.responsiveValue;
        },
        /**
         * Show only icons when width is smaller than `tabs-icon-only-max-width`
         * @type {boolean}
         */
        set: function (val) {
            this.responsiveValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTabComponent.prototype, "active", {
        /**
         * Specifies active tab
         * @returns {boolean}
         */
        get: function () {
            return this.activeValue;
        },
        set: function (val) {
            this.activeValue = convertToBoolProperty(val);
            if (this.activeValue) {
                this.init = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTabComponent.prototype, "lazyLoad", {
        /**
         * Lazy load content before tab selection
         * TODO: rename, as lazy is by default, and this is more `instant load`
         * @param {boolean} val
         */
        set: function (val) {
            this.init = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabComponent.prototype, "tabTitle", void 0);
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabComponent.prototype, "tabIcon", void 0);
    __decorate$67([
        Input('disabled'),
        HostBinding('class.disabled'),
        __metadata$44("design:type", Boolean),
        __metadata$44("design:paramtypes", [Boolean])
    ], NbTabComponent.prototype, "disabled", null);
    __decorate$67([
        Input(),
        __metadata$44("design:type", Boolean),
        __metadata$44("design:paramtypes", [Boolean])
    ], NbTabComponent.prototype, "responsive", null);
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabComponent.prototype, "route", void 0);
    __decorate$67([
        HostBinding('class.content-active'),
        __metadata$44("design:type", Boolean)
    ], NbTabComponent.prototype, "activeValue", void 0);
    __decorate$67([
        Input(),
        __metadata$44("design:type", Boolean),
        __metadata$44("design:paramtypes", [Boolean])
    ], NbTabComponent.prototype, "active", null);
    __decorate$67([
        Input(),
        __metadata$44("design:type", Boolean),
        __metadata$44("design:paramtypes", [Boolean])
    ], NbTabComponent.prototype, "lazyLoad", null);
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabComponent.prototype, "badgeText", void 0);
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabComponent.prototype, "badgeStatus", void 0);
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabComponent.prototype, "badgePosition", void 0);
    NbTabComponent = __decorate$67([
        Component({
            selector: 'nb-tab',
            template: "\n    <ng-container *ngIf=\"init\">\n      <ng-content></ng-content>\n    </ng-container>\n  "
        })
    ], NbTabComponent);
    return NbTabComponent;
}());
// TODO: Combine tabset with route-tabset, so that we can:
// - have similar interface
// - easy to migrate from one to another
// - can mix them both (route/content tab)
/**
 *
 * Dynamic tabset component.
 * @stacked-example(Showcase, tabset/tabset-showcase.component)
 *
 * Basic tabset example
 *
 * ```html
 * <nb-tabset>
 *  <nb-tab tabTitle="Simple Tab #1">
 *    Tab content 1
 *  </nb-tab>
 *  <nb-tab tabTitle="Simple Tab #2">
 *    Tab content 2
 *  </nb-tab>
 * </nb-tabset>
 * ```
 *
 * ### Installation
 *
 * Import `NbTabsetModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTabsetModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * It is also possible to set a badge to a particular tab:
 * @stacked-example(Tab With Badge, tabset/tabset-badge.component)
 *
 * and we can set it to full a width of a parent component
 * @stacked-example(Full Width, tabset/tabset-width.component)
 *
 * `tabIcon` should be used to add an icon to the tab. Icon can also be combined with title.
 * `responsive` tab property if set allows you to hide the title on smaller screens
 * (`tabs-icon-only-max-width` property) for better responsive behaviour. You can open the following example and make
 * your screen smaller - titles will be hidden in the last tabset in the list:
 *
 * @stacked-example(Icon, tabset/tabset-icon.component)
 *
 * It is also possible to disable a tab using `disabled` property:
 * @stacked-example(Disabled Tab, tabset/tabset-disabled.component)
 *
 * @styles
 *
 * tabset-background-color:
 * tabset-border-radius:
 * tabset-shadow:
 * tabset-tab-background-color:
 * tabset-tab-padding:
 * tabset-tab-text-color:
 * tabset-tab-text-font-family:
 * tabset-tab-text-font-size:
 * tabset-tab-text-font-weight:
 * tabset-tab-text-line-height:
 * tabset-tab-text-transform:
 * tabset-tab-underline-width:
 * tabset-tab-underline-color:
 * tabset-tab-active-background-color:
 * tabset-tab-active-text-color:
 * tabset-tab-active-underline-color:
 * tabset-tab-focus-background-color:
 * tabset-tab-focus-text-color:
 * tabset-tab-focus-underline-color:
 * tabset-tab-hover-background-color:
 * tabset-tab-hover-text-color:
 * tabset-tab-hover-underline-color:
 * tabset-tab-disabled-background-color:
 * tabset-tab-disabled-text-color:
 * tabset-tab-disabled-underline-color:
 * tabset-divider-color:
 * tabset-divider-style:
 * tabset-divider-width:
 * tabset-content-background-color:
 * tabset-content-padding:
 * tabset-content-text-color:
 * tabset-content-text-font-family:
 * tabset-content-text-font-size:
 * tabset-content-text-font-weight:
 * tabset-content-text-line-height:
 * tabset-scrollbar-color:
 * tabset-scrollbar-background-color:
 * tabset-scrollbar-width:
 * tabset-tab-text-hide-breakpoint:
 */
var NbTabsetComponent = /** @class */ (function () {
    function NbTabsetComponent(route, changeDetectorRef) {
        this.route = route;
        this.changeDetectorRef = changeDetectorRef;
        this.fullWidthValue = false;
        /**
         * Emits when tab is selected
         * @type EventEmitter<any>
         */
        this.changeTab = new EventEmitter();
    }
    Object.defineProperty(NbTabsetComponent.prototype, "fullWidth", {
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
    // TODO: refactoring this component, avoid change detection loop
    NbTabsetComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.route.params
            .pipe(map(function (params) {
            return _this.tabs.find(function (tab) { return _this.routeParam ? tab.route === params[_this.routeParam] : tab.active; });
        }), delay(0), map(function (tab) { return tab || _this.tabs.first; }), filter(function (tab) { return !!tab; }))
            .subscribe(function (tabToSelect) {
            _this.selectTab(tabToSelect);
            _this.changeDetectorRef.markForCheck();
        });
    };
    // TODO: navigate to routeParam
    NbTabsetComponent.prototype.selectTab = function (selectedTab) {
        if (!selectedTab.disabled) {
            this.tabs.forEach(function (tab) { return tab.active = tab === selectedTab; });
            this.changeTab.emit(selectedTab);
        }
    };
    __decorate$67([
        ContentChildren(NbTabComponent),
        __metadata$44("design:type", QueryList)
    ], NbTabsetComponent.prototype, "tabs", void 0);
    __decorate$67([
        HostBinding('class.full-width'),
        __metadata$44("design:type", Boolean)
    ], NbTabsetComponent.prototype, "fullWidthValue", void 0);
    __decorate$67([
        Input(),
        __metadata$44("design:type", Boolean),
        __metadata$44("design:paramtypes", [Boolean])
    ], NbTabsetComponent.prototype, "fullWidth", null);
    __decorate$67([
        Input(),
        __metadata$44("design:type", String)
    ], NbTabsetComponent.prototype, "routeParam", void 0);
    __decorate$67([
        Output(),
        __metadata$44("design:type", Object)
    ], NbTabsetComponent.prototype, "changeTab", void 0);
    NbTabsetComponent = __decorate$67([
        Component({
            selector: 'nb-tabset',
            template: "\n    <ul class=\"tabset\">\n      <li *ngFor=\"let tab of tabs\"\n          (click)=\"selectTab(tab)\"\n          (keyup.space)=\"selectTab(tab)\"\n          (keyup.enter)=\"selectTab(tab)\"\n          [class.responsive]=\"tab.responsive\"\n          [class.active]=\"tab.active\"\n          [class.disabled]=\"tab.disabled\"\n          [attr.tabindex]=\"tab.disabled ? -1 : 0\"\n          class=\"tab\">\n        <a href (click)=\"$event.preventDefault()\" tabindex=\"-1\" class=\"tab-link\">\n          <nb-icon *ngIf=\"tab.tabIcon\" [icon]=\"tab.tabIcon\"></nb-icon>\n          <span *ngIf=\"tab.tabTitle\" class=\"tab-text\">{{ tab.tabTitle }}</span>\n        </a>\n        <nb-badge *ngIf=\"tab.badgeText\"\n          [text]=\"tab.badgeText\"\n          [status]=\"tab.badgeStatus\"\n          [position]=\"tab.badgePosition\">\n        </nb-badge>\n      </li>\n    </ul>\n    <ng-content select=\"nb-tab\"></ng-content>\n  ",
            styles: [":host{display:block}:host.full-width .tabset{justify-content:space-around}:host ::ng-deep nb-tab{flex:1;-ms-flex:1 1 auto;overflow:auto;display:none}:host ::ng-deep nb-tab.content-active{display:block}:host .tabset{display:flex;flex-direction:row;list-style-type:none;margin:0;padding:0}:host .tabset .tab{margin-bottom:-1px;text-align:center;position:relative}:host .tabset .tab.active a::before{display:block}:host .tabset .tab a{display:flex;position:relative;text-decoration:none}:host .tabset .tab a::before{position:absolute;content:'';width:100%;border-radius:3px;bottom:-2px;left:0}:host .tabset .tab a nb-icon{vertical-align:middle}[dir=ltr] :host .tabset .tab a nb-icon+span{margin-left:.5rem}[dir=rtl] :host .tabset .tab a nb-icon+span{margin-right:.5rem}\n"]
        }),
        __metadata$44("design:paramtypes", [ActivatedRoute,
            ChangeDetectorRef])
    ], NbTabsetComponent);
    return NbTabsetComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$69 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$45 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Badge is a simple labeling component.
 * It can be used to add additional information to any content or highlight unread items.
 *
 * Element is absolute positioned, so parent should be
 * [positioned element](https://developer.mozilla.org/en-US/docs/Web/CSS/position).
 * It means parent `position` should be set to anything except `static`, e.g. `relative`,
 * `absolute`, `fixed`, or `sticky`.
 *
 * ### Installation
 *
 * Import `NbBadgeModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbBadgeModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Badge with default position and status(color):
 *
 * ```html
 * <nb-badge text="badgeText"></nb-badge>
 * ```
 *
 * For example, badge can be placed into nb-card header:
 * @stacked-example(Showcase, badge/badge-showcase.component)
 *
 * Badge located on the bottom right with warning status:
 *
 * ```html
 * <nb-badge text="badgeText" status="warning" position="bottom right">
 * </nb-badge>
 * ```
 *
 * @styles
 *
 * badge-border-radius:
 * badge-text-font-family:
 * badge-text-font-size:
 * badge-text-font-weight:
 * badge-text-line-height:
 * badge-padding:
 * badge-primary-background-color:
 * badge-primary-text-color:
 * badge-success-background-color:
 * badge-success-text-color:
 * badge-info-background-color:
 * badge-info-text-color:
 * badge-warning-background-color:
 * badge-warning-text-color:
 * badge-danger-background-color:
 * badge-danger-text-color:
 */
var NbBadgeComponent = /** @class */ (function () {
    function NbBadgeComponent() {
        /**
         * Text to display
         * @type string
         */
        this.text = '';
        this._defaultPosition = 'top right';
        this._position = this._defaultPosition;
        /**
         * Badge status (adds specific styles):
         * 'primary', 'info', 'success', 'warning', 'danger'
         */
        this.status = 'primary';
    }
    Object.defineProperty(NbBadgeComponent.prototype, "position", {
        /**
         * Badge position
         *
         * Can be set to any class or to one of predefined positions:
         * 'top left', 'top right', 'bottom left', 'bottom right',
         * 'top start', 'top end', 'bottom start', 'bottom end'
         * @type string
         */
        get: function () {
            return this._position;
        },
        set: function (value) {
            this._position = value || this._defaultPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "top", {
        get: function () {
            return this.position.includes('top');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "right", {
        get: function () {
            return this.position.includes('right');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "bottom", {
        get: function () {
            return this.position.includes('bottom');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "left", {
        get: function () {
            return this.position.includes('left');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "start", {
        get: function () {
            return this.position.includes('start');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBadgeComponent.prototype, "end", {
        get: function () {
            return this.position.includes('end');
        },
        enumerable: true,
        configurable: true
    });
    __decorate$69([
        Input(),
        __metadata$45("design:type", String)
    ], NbBadgeComponent.prototype, "text", void 0);
    __decorate$69([
        Input(),
        __metadata$45("design:type", String),
        __metadata$45("design:paramtypes", [String])
    ], NbBadgeComponent.prototype, "position", null);
    __decorate$69([
        Input(),
        __metadata$45("design:type", String)
    ], NbBadgeComponent.prototype, "status", void 0);
    __decorate$69([
        HostBinding('class.status-primary'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "primary", null);
    __decorate$69([
        HostBinding('class.status-success'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "success", null);
    __decorate$69([
        HostBinding('class.status-info'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "info", null);
    __decorate$69([
        HostBinding('class.status-warning'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "warning", null);
    __decorate$69([
        HostBinding('class.status-danger'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "danger", null);
    __decorate$69([
        HostBinding('class.position-top'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "top", null);
    __decorate$69([
        HostBinding('class.position-right'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "right", null);
    __decorate$69([
        HostBinding('class.position-bottom'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "bottom", null);
    __decorate$69([
        HostBinding('class.position-left'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "left", null);
    __decorate$69([
        HostBinding('class.position-start'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "start", null);
    __decorate$69([
        HostBinding('class.position-end'),
        __metadata$45("design:type", Boolean),
        __metadata$45("design:paramtypes", [])
    ], NbBadgeComponent.prototype, "end", null);
    NbBadgeComponent = __decorate$69([
        Component({
            selector: 'nb-badge',
            template: "{{text}}",
            styles: [":host{position:absolute;text-align:center;white-space:nowrap;vertical-align:baseline}:host(.position-top){top:0}:host(.position-right){right:0}:host(.position-bottom){bottom:0}:host(.position-left){left:0}[dir=ltr] :host(.position-start){left:0}[dir=rtl] :host(.position-start){right:0}[dir=ltr] :host(.position-end){right:0}[dir=rtl] :host(.position-end){left:0}\n"]
        })
    ], NbBadgeComponent);
    return NbBadgeComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$68 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbBadgeModule = /** @class */ (function () {
    function NbBadgeModule() {
    }
    NbBadgeModule = __decorate$68([
        NgModule({
            exports: [NbBadgeComponent],
            declarations: [NbBadgeComponent],
        })
    ], NbBadgeModule);
    return NbBadgeModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$66 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_TABSET_COMPONENTS = [
    NbTabsetComponent,
    NbTabComponent,
];
var NbTabsetModule = /** @class */ (function () {
    function NbTabsetModule() {
    }
    NbTabsetModule = __decorate$66([
        NgModule({
            imports: [
                NbSharedModule,
                NbBadgeModule,
                NbIconModule,
            ],
            declarations: NB_TABSET_COMPONENTS.slice(),
            exports: NB_TABSET_COMPONENTS.slice(),
        })
    ], NbTabsetModule);
    return NbTabsetModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$71 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$46 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Represents a component showing a user avatar (picture) with a user name on the right.
 * @stacked-example(Showcase, user/user-showcase.component)
 *
 * ```ts
 *   <nb-user name="John Doe" title="Engineer"></nb-user>
 * ```
 *
 * ### Installation
 *
 * Import `NbUserModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbUserModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Available in multiple sizes:
 * @stacked-example(Multiple Sizes, user/user-sizes.component)
 *
 *
 * You can hide unnecessary captions (name, title or both):
 * @stacked-example(Hide captions in user component, user/user-hide-captions.component)
 *
 *
 * You can set custom avatar background-color, user image (as link or BASE64 string) and disable user initials:
 * @stacked-example(Avatar image settings, user/user-avatar-settings.component)
 *
 * Component shape could be controlled with `shape` input.
 * @stacked-example(Shapes, user/user-shape.component)
 *
 * @styles
 *
 * user-picture-box-background-color:
 * user-picture-box-border-color:
 * user-picture-box-border-width:
 * user-initials-text-color:
 * user-initials-text-font-family:
 * user-initials-text-font-weight:
 * user-name-text-color:
 * user-name-text-font-family:
 * user-name-text-font-weight:
 * user-title-text-color:
 * user-title-text-font-family:
 * user-title-text-font-weight:
 * user-rectangle-border-radius:
 * user-semi-round-border-radius:
 * user-round-border-radius:
 * user-tiny-height:
 * user-tiny-width:
 * user-tiny-initials-text-font-size:
 * user-tiny-initials-text-line-height:
 * user-tiny-name-text-font-size:
 * user-tiny-name-text-line-height:
 * user-tiny-title-text-font-size:
 * user-tiny-title-text-line-height:
 * user-small-height:
 * user-small-width:
 * user-small-initials-text-font-size:
 * user-small-initials-text-line-height:
 * user-small-name-text-font-size:
 * user-small-name-text-line-height:
 * user-small-title-text-font-size:
 * user-small-title-text-line-height:
 * user-medium-height:
 * user-medium-width:
 * user-medium-initials-text-font-size:
 * user-medium-initials-text-line-height:
 * user-medium-name-text-font-size:
 * user-medium-name-text-line-height:
 * user-medium-title-text-font-size:
 * user-medium-title-text-line-height:
 * user-large-height:
 * user-large-width:
 * user-large-initials-text-font-size:
 * user-large-initials-text-line-height:
 * user-large-name-text-font-size:
 * user-large-name-text-line-height:
 * user-large-title-text-font-size:
 * user-large-title-text-line-height:
 * user-giant-height:
 * user-giant-width:
 * user-giant-initials-text-font-size:
 * user-giant-initials-text-line-height:
 * user-giant-name-text-font-size:
 * user-giant-name-text-line-height:
 * user-giant-title-text-font-size:
 * user-giant-title-text-line-height:
 */
var NbUserComponent = /** @class */ (function () {
    function NbUserComponent(domSanitizer) {
        this.domSanitizer = domSanitizer;
        /**
         * Specifies a name to be shown on the right of a user picture
         * @type string
         */
        this.name = 'Anonymous';
        /**
         * Size of the component.
         * Possible values: `tiny`, `small`, `medium` (default), `large`, 'giant'.
         */
        this.size = 'medium';
        /**
         * Shape of the picture box.
         * Possible values: `rectangle`, `semi-round`, `round`.
         */
        this.shape = 'round';
        this._showName = true;
        this._showTitle = true;
        this._showInitials = true;
    }
    Object.defineProperty(NbUserComponent.prototype, "picture", {
        /**
         * Absolute path to a user picture or base64 image.
         * User name initials will be shown if no picture specified (JD for John Doe).
         * @type string
         */
        set: function (value) {
            this.imageBackgroundStyle = value ? this.domSanitizer.bypassSecurityTrustStyle("url(" + value + ")") : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "showName", {
        /**
         * Whether to show a user name or not
         */
        get: function () {
            return this._showName;
        },
        set: function (val) {
            this._showName = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "showTitle", {
        /**
         * Whether to show a user title or not
         * @type boolean
         */
        get: function () {
            return this._showTitle;
        },
        set: function (val) {
            this._showTitle = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "showInitials", {
        /**
         * Whether to show a user initials (if no picture specified) or not
         * @type boolean
         */
        get: function () {
            return this._showInitials;
        },
        set: function (val) {
            this._showInitials = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "onlyPicture", {
        /**
         * Whether to show only a picture or also show the name and title
         * @type boolean
         */
        get: function () {
            return !this.showName && !this.showTitle;
        },
        set: function (val) {
            this.showName = this.showTitle = !convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "rectangle", {
        get: function () {
            return this.shape === 'rectangle';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "semiRound", {
        get: function () {
            return this.shape === 'semi-round';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbUserComponent.prototype, "round", {
        get: function () {
            return this.shape === 'round';
        },
        enumerable: true,
        configurable: true
    });
    NbUserComponent.prototype.getInitials = function () {
        if (this.name) {
            var names = this.name.split(' ');
            return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
    };
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "name", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "title", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String),
        __metadata$46("design:paramtypes", [String])
    ], NbUserComponent.prototype, "picture", null);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "color", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "size", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "shape", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [Boolean])
    ], NbUserComponent.prototype, "showName", null);
    __decorate$71([
        Input(),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [Boolean])
    ], NbUserComponent.prototype, "showTitle", null);
    __decorate$71([
        Input(),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [Boolean])
    ], NbUserComponent.prototype, "showInitials", null);
    __decorate$71([
        Input(),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [Boolean])
    ], NbUserComponent.prototype, "onlyPicture", null);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "badgeText", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "badgeStatus", void 0);
    __decorate$71([
        Input(),
        __metadata$46("design:type", String)
    ], NbUserComponent.prototype, "badgePosition", void 0);
    __decorate$71([
        HostBinding('class.size-tiny'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "tiny", null);
    __decorate$71([
        HostBinding('class.size-small'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "small", null);
    __decorate$71([
        HostBinding('class.size-medium'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "medium", null);
    __decorate$71([
        HostBinding('class.size-large'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "large", null);
    __decorate$71([
        HostBinding('class.size-giant'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "giant", null);
    __decorate$71([
        HostBinding('class.shape-rectangle'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "rectangle", null);
    __decorate$71([
        HostBinding('class.shape-semi-round'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "semiRound", null);
    __decorate$71([
        HostBinding('class.shape-round'),
        __metadata$46("design:type", Boolean),
        __metadata$46("design:paramtypes", [])
    ], NbUserComponent.prototype, "round", null);
    NbUserComponent = __decorate$71([
        Component({
            selector: 'nb-user',
            template: "<div class=\"user-container\">\n  <div *ngIf=\"imageBackgroundStyle\" class=\"user-picture image\" [style.background-image]=\"imageBackgroundStyle\">\n    <nb-badge *ngIf=\"badgeText\" [text]=\"badgeText\" [status]=\"badgeStatus\" [position]=\"badgePosition\"></nb-badge>\n  </div>\n  <div *ngIf=\"!imageBackgroundStyle\" class=\"user-picture initials\" [style.background-color]=\"color\">\n    <ng-container *ngIf=\"showInitials\">\n      {{ getInitials() }}\n    </ng-container>\n    <nb-badge *ngIf=\"badgeText\" [text]=\"badgeText\" [status]=\"badgeStatus\" [position]=\"badgePosition\"></nb-badge>\n  </div>\n\n  <div class=\"info-container\">\n    <div *ngIf=\"showName && name\" class=\"user-name\">{{ name }}</div>\n    <div *ngIf=\"showTitle && title\" class=\"user-title\">{{ title }}</div>\n  </div>\n</div>\n",
            styles: [":host{display:flex}:host .user-container{position:relative;display:flex;align-items:center}:host .user-picture{position:relative;flex-shrink:0}:host .user-picture.image{background-size:cover;background-repeat:no-repeat}:host .user-picture.initials{display:flex;align-items:center;justify-content:center}[dir=rtl] :host .user-name,[dir=rtl] :host .user-title{text-align:right}[dir=ltr] :host .info-container{margin-left:.5rem}[dir=rtl] :host .info-container{margin-right:.5rem}\n"]
        }),
        __metadata$46("design:paramtypes", [DomSanitizer])
    ], NbUserComponent);
    return NbUserComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$70 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_USER_COMPONENTS = [
    NbUserComponent,
];
var NbUserModule = /** @class */ (function () {
    function NbUserModule() {
    }
    NbUserModule = __decorate$70([
        NgModule({
            imports: [
                NbSharedModule,
                NbBadgeModule,
            ],
            declarations: NB_USER_COMPONENTS.slice(),
            exports: NB_USER_COMPONENTS.slice(),
        })
    ], NbUserModule);
    return NbUserModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$73 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$47 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Action item, display a link with an icon, or any other content provided instead.
 */
var NbActionComponent = /** @class */ (function () {
    function NbActionComponent() {
        /**
         * Optional title for mouseover
         * @type string
         */
        this.title = '';
        this._disabled = false;
    }
    Object.defineProperty(NbActionComponent.prototype, "disabled", {
        /**
         * Visually disables the item
         * @type boolean
         */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "link", void 0);
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "href", void 0);
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "title", void 0);
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "icon", void 0);
    __decorate$73([
        Input(),
        HostBinding('class.disabled'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [Boolean])
    ], NbActionComponent.prototype, "disabled", null);
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "badgeText", void 0);
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "badgeStatus", void 0);
    __decorate$73([
        Input(),
        __metadata$47("design:type", String)
    ], NbActionComponent.prototype, "badgePosition", void 0);
    NbActionComponent = __decorate$73([
        Component({
            selector: 'nb-action',
            template: "\n    <ng-container *ngIf=\"icon; else projectedContent\">\n      <a class=\"icon-container\"\n         [routerLink]=\"link\"\n         [title]=\"title\"\n         *ngIf=\"link\">\n        <nb-icon [icon]=\"icon\"></nb-icon>\n      </a>\n      <a class=\"icon-container\"\n         [href]=\"href\"\n         [title]=\"title\"\n         *ngIf=\"href && !link\">\n        <nb-icon [icon]=\"icon\"></nb-icon>\n      </a>\n      <a class=\"icon-container\"\n         href=\"#\"\n         [title]=\"title\"\n         *ngIf=\"!href && !link\"\n         (click)=\"$event.preventDefault()\">\n        <nb-icon [icon]=\"icon\"></nb-icon>\n      </a>\n    </ng-container>\n\n    <ng-template #projectedContent>\n      <ng-content></ng-content>\n    </ng-template>\n\n    <nb-badge *ngIf=\"badgeText\"\n              [text]=\"badgeText\"\n              [status]=\"badgeStatus\"\n              [position]=\"badgePosition\">\n    </nb-badge>\n  ",
            styles: [":host{background:transparent;display:flex;flex-wrap:wrap;align-items:center;position:relative}:host(.disabled){cursor:not-allowed}:host(.disabled) a,:host(.disabled) nb-icon{cursor:not-allowed}:host-context(nb-actions.full-width){justify-content:center;width:100%}a.icon-container:hover,a.icon-container:focus{text-decoration:none}nb-icon:hover{cursor:pointer}\n"]
        })
    ], NbActionComponent);
    return NbActionComponent;
}());
/**
 * Shows a horizontal list of actions, available in multiple sizes.
 * Aligns items vertically.
 *
 * @stacked-example(Showcase, action/action-showcase.component)
 *
 * Basic actions setup:
 * ```html
 * <nb-actions size="small">
 *   <nb-action icon="nb-search"></nb-action>
 *   <nb-action icon="nb-power-circled"></nb-action>
 *   <nb-action icon="nb-person"></nb-action>
 * </nb-actions>
 * ```
 * ### Installation
 *
 * Import `NbActionsModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbActionsModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Multiple sizes example:
 * @stacked-example(Multiple Sizes, action/action-sizes.component)
 *
 * It is also possible to specify a `badge` value:
 *
 * @stacked-example(Action Badge, action/action-badge.component)
 *
 * and we can set it to full a width of a parent component
 * @stacked-example(Full Width, action/action-width.component)
 *
 * @styles
 *
 * actions-background-color:
 * actions-divider-color:
 * actions-divider-style:
 * actions-divider-width:
 * actions-icon-color:
 * actions-text-color:
 * actions-text-font-family:
 * actions-text-font-weight:
 * actions-text-line-height:
 * actions-disabled-icon-color:
 * actions-disabled-text-color:
 * actions-tiny-height:
 * actions-tiny-icon-height:
 * actions-tiny-padding:
 * actions-tiny-text-font-size:
 * actions-small-height:
 * actions-small-icon-height:
 * actions-small-padding:
 * actions-small-text-font-size:
 * actions-medium-height:
 * actions-medium-icon-height:
 * actions-medium-padding:
 * actions-medium-text-font-size:
 * actions-large-height:
 * actions-large-icon-height:
 * actions-large-padding:
 * actions-large-text-font-size:
 * actions-giant-height:
 * actions-giant-icon-height:
 * actions-giant-padding:
 * actions-giant-text-font-size:
 */
var NbActionsComponent = /** @class */ (function () {
    function NbActionsComponent() {
        this._size = 'small';
        this._fullWidth = false;
    }
    Object.defineProperty(NbActionsComponent.prototype, "size", {
        /**
         * Size of the component: 'tiny', 'small' (default), 'medium', 'large', 'giant'
         */
        get: function () {
            return this._size;
        },
        set: function (value) {
            this._size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "fullWidth", {
        /**
         * Component will fill full width of the container
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
    Object.defineProperty(NbActionsComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbActionsComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    __decorate$73([
        Input(),
        __metadata$47("design:type", String),
        __metadata$47("design:paramtypes", [String])
    ], NbActionsComponent.prototype, "size", null);
    __decorate$73([
        Input(),
        HostBinding('class.full-width'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [Boolean])
    ], NbActionsComponent.prototype, "fullWidth", null);
    __decorate$73([
        HostBinding('class.size-tiny'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [])
    ], NbActionsComponent.prototype, "tiny", null);
    __decorate$73([
        HostBinding('class.size-small'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [])
    ], NbActionsComponent.prototype, "small", null);
    __decorate$73([
        HostBinding('class.size-medium'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [])
    ], NbActionsComponent.prototype, "medium", null);
    __decorate$73([
        HostBinding('class.size-large'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [])
    ], NbActionsComponent.prototype, "large", null);
    __decorate$73([
        HostBinding('class.size-giant'),
        __metadata$47("design:type", Boolean),
        __metadata$47("design:paramtypes", [])
    ], NbActionsComponent.prototype, "giant", null);
    NbActionsComponent = __decorate$73([
        Component({
            selector: 'nb-actions',
            template: "\n    <ng-content select=\"nb-action\"></ng-content>\n  ",
            styles: [":host{display:flex;align-items:center}\n"]
        })
    ], NbActionsComponent);
    return NbActionsComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$72 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_ACTIONS_COMPONENTS = [
    NbActionComponent,
    NbActionsComponent,
];
var NbActionsModule = /** @class */ (function () {
    function NbActionsModule() {
    }
    NbActionsModule = __decorate$72([
        NgModule({
            imports: [
                NbSharedModule,
                NbBadgeModule,
                NbIconModule,
            ],
            declarations: NB_ACTIONS_COMPONENTS.slice(),
            exports: NB_ACTIONS_COMPONENTS.slice(),
        })
    ], NbActionsModule);
    return NbActionsModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$76 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Search component service, connects your code to a page-level search component.
 */
var NbSearchService = /** @class */ (function () {
    function NbSearchService() {
        this.searchSubmittings$ = new Subject();
        this.searchActivations$ = new Subject();
        this.searchDeactivations$ = new Subject();
        this.searchInput$ = new Subject();
    }
    /***
     * Activate (open) search component
     * @param {string} searchType
     * @param {string} tag
     */
    NbSearchService.prototype.activateSearch = function (searchType, tag) {
        this.searchActivations$.next({ searchType: searchType, tag: tag });
    };
    /**
     * Deactibate (close) search component
     * @param {string} searchType
     * @param {string} tag
     */
    NbSearchService.prototype.deactivateSearch = function (searchType, tag) {
        this.searchDeactivations$.next({ searchType: searchType, tag: tag });
    };
    /**
     * Trigger search submit
     * @param {string} term
     * @param {string} tag
     */
    NbSearchService.prototype.submitSearch = function (term, tag) {
        this.searchSubmittings$.next({ term: term, tag: tag });
    };
    /**
     * Trigger search submit by input event
     * @param {string} term
     * @param {string} tag
     */
    NbSearchService.prototype.searchInput = function (term, tag) {
        this.searchInput$.next({ term: term, tag: tag });
    };
    /**
     * Subscribe to 'activate' event
     * @returns Observable<{searchType: string; tag?: string}>
     */
    NbSearchService.prototype.onSearchActivate = function () {
        return this.searchActivations$.pipe(share());
    };
    /**
     * Subscribe to 'deactivate' event
     * @returns Observable<{searchType: string; tag?: string}>
     */
    NbSearchService.prototype.onSearchDeactivate = function () {
        return this.searchDeactivations$.pipe(share());
    };
    /**
     * Subscribe to 'submit' event (when submit button clicked)
     * @returns Observable<{term: string; tag?: string}>
     */
    NbSearchService.prototype.onSearchSubmit = function () {
        return this.searchSubmittings$.pipe(share());
    };
    /**
     * Subscribe to input event
     * @returns Observable<{term: string; tag?: string}>
     */
    NbSearchService.prototype.onSearchInput = function () {
        return this.searchInput$.pipe(share());
    };
    NbSearchService = __decorate$76([
        Injectable()
    ], NbSearchService);
    return NbSearchService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$75 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$48 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * search-field-component is used under the hood by nb-search component
 * can't be used itself
 */
var NbSearchFieldComponent = /** @class */ (function () {
    function NbSearchFieldComponent() {
        this.show = false;
        this.close = new EventEmitter();
        this.search = new EventEmitter();
        this.searchInput = new EventEmitter();
    }
    NbSearchFieldComponent_1 = NbSearchFieldComponent;
    Object.defineProperty(NbSearchFieldComponent.prototype, "showClass", {
        get: function () {
            return this.show;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalZoomin", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_MODAL_ZOOMIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "rotateLayout", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_ROTATE_LAYOUT;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalMove", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_MODAL_MOVE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "curtain", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_CURTAIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "columnCurtain", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_COLUMN_CURTAIN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalDrop", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_MODAL_DROP;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSearchFieldComponent.prototype, "modalHalf", {
        get: function () {
            return this.type === NbSearchFieldComponent_1.TYPE_MODAL_HALF;
        },
        enumerable: true,
        configurable: true
    });
    NbSearchFieldComponent.prototype.ngOnChanges = function (_a) {
        var show = _a.show;
        var becameHidden = !show.isFirstChange() && show.currentValue === false;
        if (becameHidden && this.inputElement) {
            this.inputElement.nativeElement.value = '';
        }
        this.focusInput();
    };
    NbSearchFieldComponent.prototype.ngAfterViewInit = function () {
        this.focusInput();
    };
    NbSearchFieldComponent.prototype.emitClose = function () {
        this.close.emit();
    };
    NbSearchFieldComponent.prototype.submitSearch = function (term) {
        if (term) {
            this.search.emit(term);
        }
    };
    NbSearchFieldComponent.prototype.emitSearchInput = function (term) {
        this.searchInput.emit(term);
    };
    NbSearchFieldComponent.prototype.focusInput = function () {
        if (this.show && this.inputElement) {
            this.inputElement.nativeElement.focus();
        }
    };
    var NbSearchFieldComponent_1;
    NbSearchFieldComponent.TYPE_MODAL_ZOOMIN = 'modal-zoomin';
    NbSearchFieldComponent.TYPE_ROTATE_LAYOUT = 'rotate-layout';
    NbSearchFieldComponent.TYPE_MODAL_MOVE = 'modal-move';
    NbSearchFieldComponent.TYPE_CURTAIN = 'curtain';
    NbSearchFieldComponent.TYPE_COLUMN_CURTAIN = 'column-curtain';
    NbSearchFieldComponent.TYPE_MODAL_DROP = 'modal-drop';
    NbSearchFieldComponent.TYPE_MODAL_HALF = 'modal-half';
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchFieldComponent.prototype, "type", void 0);
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchFieldComponent.prototype, "placeholder", void 0);
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchFieldComponent.prototype, "hint", void 0);
    __decorate$75([
        Input(),
        __metadata$48("design:type", Object)
    ], NbSearchFieldComponent.prototype, "show", void 0);
    __decorate$75([
        Output(),
        __metadata$48("design:type", Object)
    ], NbSearchFieldComponent.prototype, "close", void 0);
    __decorate$75([
        Output(),
        __metadata$48("design:type", Object)
    ], NbSearchFieldComponent.prototype, "search", void 0);
    __decorate$75([
        Output(),
        __metadata$48("design:type", Object)
    ], NbSearchFieldComponent.prototype, "searchInput", void 0);
    __decorate$75([
        ViewChild('searchInput', { static: false }),
        __metadata$48("design:type", ElementRef)
    ], NbSearchFieldComponent.prototype, "inputElement", void 0);
    __decorate$75([
        HostBinding('class.show'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "showClass", null);
    __decorate$75([
        HostBinding('class.modal-zoomin'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "modalZoomin", null);
    __decorate$75([
        HostBinding('class.rotate-layout'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "rotateLayout", null);
    __decorate$75([
        HostBinding('class.modal-move'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "modalMove", null);
    __decorate$75([
        HostBinding('class.curtain'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "curtain", null);
    __decorate$75([
        HostBinding('class.column-curtain'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "columnCurtain", null);
    __decorate$75([
        HostBinding('class.modal-drop'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "modalDrop", null);
    __decorate$75([
        HostBinding('class.modal-half'),
        __metadata$48("design:type", Object),
        __metadata$48("design:paramtypes", [])
    ], NbSearchFieldComponent.prototype, "modalHalf", null);
    NbSearchFieldComponent = NbSearchFieldComponent_1 = __decorate$75([
        Component({
            selector: 'nb-search-field',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"search\" (keyup.esc)=\"emitClose()\">\n      <button (click)=\"emitClose()\" nbButton ghost class=\"close-button\">\n        <nb-icon icon=\"close-outline\" pack=\"nebular-essentials\"></nb-icon>\n      </button>\n      <div class=\"form-wrapper\">\n        <form class=\"form\" (keyup.enter)=\"submitSearch(searchInput.value)\">\n          <div class=\"form-content\">\n            <input class=\"search-input\"\n                   #searchInput\n                   (input)=\"emitSearchInput(searchInput.value)\"\n                   autocomplete=\"off\"\n                   [attr.placeholder]=\"placeholder\"\n                   tabindex=\"-1\"\n                   (blur)=\"focusInput()\"/>\n          </div>\n          <span class=\"info\">{{ hint }}</span>\n        </form>\n      </div>\n    </div>\n  ",
            styles: [":host button{margin:0;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}:host input{border-top:0;border-right:0;border-left:0;background:transparent;border-radius:0;line-height:1;display:inline-block;box-sizing:border-box;padding:0.05rem 0;-webkit-appearance:none}:host input:focus{outline:none}:host input::placeholder{opacity:0.3}:host span{font-size:90%;font-weight:bold;display:block;width:75%;margin:0 auto;padding:0.85rem 0;text-align:right}:host.modal-zoomin{display:block}:host.modal-zoomin .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity 0.5s}:host.modal-zoomin .search::before,:host.modal-zoomin .search::after{content:'';position:absolute;width:calc(100% + 15px);height:calc(100% + 15px);pointer-events:none}:host.modal-zoomin .search::before{top:0;left:0;border-right-width:0;border-bottom-width:0;transform:translate3d(-15px, -15px, 0)}:host.modal-zoomin .search::after{right:0;bottom:0;border-top-width:0;border-left-width:0;transform:translate3d(15px, 15px, 0)}:host.modal-zoomin .search button{position:absolute;top:3rem;font-size:2.5rem}[dir=ltr] :host.modal-zoomin .search button{right:3rem}[dir=rtl] :host.modal-zoomin .search button{left:3rem}:host.modal-zoomin .search input{font-size:10vw;width:75%}:host.modal-zoomin .search button{opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.modal-zoomin .search form{opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.modal-zoomin.show .search{pointer-events:auto;opacity:1}:host.modal-zoomin.show .search::before,:host.modal-zoomin.show .search::after{transform:translate3d(0, 0, 0);transition:transform 0.5s}:host.modal-zoomin.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.modal-zoomin.show .search form{opacity:1;transform:scale3d(1, 1, 1)}@media screen and (max-width: 40rem){:host.modal-zoomin form{margin:5rem 0 1rem}:host.modal-zoomin span{text-align:left}}\n", "::ng-deep nb-layout.rotate-layout{position:fixed;overflow:hidden;width:100%}::ng-deep nb-layout.rotate-layout .scrollable-container{position:relative;z-index:10001;transition:transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)}::ng-deep nb-layout.rotate-layout.with-search .scrollable-container{transition:transform 0.5s cubic-bezier(0.2, 1, 0.3, 1);transform-origin:50vw 50vh;transform:perspective(1000px) translate3d(0, 50vh, 0) rotate3d(1, 0, 0, 30deg);pointer-events:none}:host.rotate-layout{position:absolute;display:block;width:100vw;height:100vh;pointer-events:none;opacity:0;transition-property:opacity;transition-delay:0.4s}:host.rotate-layout .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:50vh;pointer-events:none;opacity:0;transition:opacity 0.5s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}:host.rotate-layout .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}[dir=ltr] :host.rotate-layout .search button{right:3rem}[dir=rtl] :host.rotate-layout .search button{left:3rem}:host.rotate-layout .search form{margin:5rem 0;opacity:0;transform:scale3d(0.7, 0.7, 1);transition:opacity 0.5s, transform 0.5s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}:host.rotate-layout .search input{font-size:7vw;width:75%}:host.rotate-layout.show{opacity:1;transition-delay:0s}:host.rotate-layout.show .search{pointer-events:auto;opacity:1}:host.rotate-layout.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.rotate-layout.show .search form{opacity:1;transform:scale3d(1, 1, 1)}\n", "::ng-deep nb-layout.modal-move .layout{transition:transform 0.5s}::ng-deep nb-layout.modal-move.with-search .layout{transform:scale3d(0.8, 0.8, 1);pointer-events:none}:host.modal-move .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;position:fixed;z-index:1050;top:0;left:0;width:100%;height:100vh;pointer-events:none;opacity:0;transition:opacity 0.5s}:host.modal-move .search button{position:absolute;top:3rem;font-size:2.5rem;opacity:0;transition:opacity 0.5s}[dir=ltr] :host.modal-move .search button{right:3rem}[dir=rtl] :host.modal-move .search button{left:3rem}:host.modal-move .search form{margin:5rem 0;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.modal-move .search input{font-size:10vw;width:75%;transform:scale3d(0, 1, 1);transform-origin:0 50%;transition:transform 0.3s}:host.modal-move.show .search{pointer-events:auto;opacity:1}:host.modal-move.show .search button{opacity:1}:host.modal-move.show .search form{opacity:1;transform:scale3d(1, 1, 1)}:host.modal-move.show .search input{transform:scale3d(1, 1, 1);transition-duration:0.5s}@media screen and (max-width: 40rem){:host.modal-move span{text-align:left}}\n", ":host.curtain .search{position:fixed;z-index:1050;top:0;left:100%;overflow:hidden;height:100vh;width:100%;padding:3rem;pointer-events:none;transition:transform 0.3s;transition-delay:0.4s;transition-timing-function:ease-out}:host.curtain .search::after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;transition:transform 0.3s;transition-timing-function:ease-out}:host.curtain .search button{font-size:2.5rem;position:absolute;top:3rem;transition:opacity 0.1s;transition-delay:0.3s}[dir=ltr] :host.curtain .search button{right:3rem}[dir=rtl] :host.curtain .search button{left:3rem}:host.curtain .search form{width:50%;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.5s, transform 0.5s}:host.curtain .search input{width:100%;font-size:6vw}:host.curtain.show .search{width:100%;pointer-events:auto;transform:translate3d(-100%, 0, 0);transition-delay:0s}:host.curtain.show .search::after{transform:translate3d(100%, 0, 0);transition-delay:0.4s}:host.curtain.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.curtain.show .search form{opacity:1;transform:scale3d(1, 1, 1)}@media screen and (max-width: 40em){:host.curtain span{width:90%}:host.curtain input{font-size:2em;width:90%}}::ng-deep nb-layout.curtain .scrollable-container{position:relative;z-index:0}\n", "::ng-deep nb-layout.column-curtain.with-search .layout{pointer-events:none}:host.column-curtain{display:block;position:fixed;z-index:1050;top:0;left:50%;overflow:hidden;width:50%;height:100vh;pointer-events:none}:host.column-curtain::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;transform:scale3d(0, 1, 1);transform-origin:0 50%;transition:transform 0.3s;transition-timing-function:cubic-bezier(0.86, 0, 0.07, 1)}:host.column-curtain .search{position:relative;padding:2.5rem 1.5rem 0;background:transparent}:host.column-curtain .search button{position:absolute;top:2rem;font-size:2.5rem;opacity:0;transition:opacity 0.5s}[dir=ltr] :host.column-curtain .search button{right:2rem}[dir=rtl] :host.column-curtain .search button{left:2rem}:host.column-curtain .search form{width:85%;transform:translate3d(-150%, 0, 0);transition:transform 0.3s}:host.column-curtain .search input{font-size:2.5rem;width:100%}:host.column-curtain .search span{font-size:85%}:host.column-curtain.show{pointer-events:auto}:host.column-curtain.show::before{transform:scale3d(1, 1, 1)}:host.column-curtain.show .search form{transform:translate3d(0, 0, 0);transition-delay:0.15s;transition-timing-function:cubic-bezier(0.86, 0, 0.07, 1)}:host.column-curtain.show .search button{opacity:1;z-index:100}@media screen and (max-width: 40rem){:host.column-curtain span{width:90%}:host.column-curtain input{font-size:2rem;width:90%}}\n", "::ng-deep nb-layout.modal-drop .layout{position:relative;transition:transform 0.4s, opacity 0.4s;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1)}::ng-deep nb-layout.modal-drop.with-search .layout{opacity:0;transform:scale3d(0.9, 0.9, 1);pointer-events:none}:host.modal-drop .search{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;z-index:1050;position:fixed;top:0;left:0;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-drop .search::before{content:'';position:absolute;top:0;right:0;width:100%;height:100%;opacity:0;transition:opacity 0.4s}:host.modal-drop .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;opacity:0;transition:opacity 0.4s}[dir=ltr] :host.modal-drop .search button{right:3rem}[dir=rtl] :host.modal-drop .search button{left:3rem}:host.modal-drop .search form{position:relative;margin:5rem 0 2rem}:host.modal-drop .search input{font-size:6vw;width:60%;padding:0.25rem;text-align:center;opacity:0;transition:opacity 0.4s}:host.modal-drop .search span{position:relative;z-index:9;display:block;width:60%;padding:0.85rem 0;opacity:0;transform:translate3d(0, -50px, 0);transition:opacity 0.4s, transform 0.4s}:host.modal-drop .search .form-content{position:relative;z-index:10;overflow:hidden;transform:translate3d(0, -50px, 0);transition:transform 0.4s}:host.modal-drop .search .form-content::after{content:'';position:absolute;top:0;left:20%;width:60%;height:105%;opacity:0;transform-origin:50% 0}:host.modal-drop.show .search{pointer-events:auto}:host.modal-drop.show .search::before{opacity:1}:host.modal-drop.show .search button{opacity:1}:host.modal-drop.show .search .form-content{transform:translate3d(0, 0, 0);transition:none}:host.modal-drop.show .search .form-content::after{animation:scaleUpDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards}:host.modal-drop.show .search input{opacity:1;transition:opacity 0s 0.4s}:host.modal-drop.show .search span{opacity:1;transform:translate3d(0, 0, 0);transition-delay:0.4s;transition-timing-function:ease-out}@keyframes scaleUpDown{0%{opacity:1;transform:scale3d(1, 0, 1)}50%{transform:scale3d(1, 1, 1);transform-origin:50% 0;transition-timing-function:ease-out}50.1%{transform-origin:50% 100%;transition-timing-function:ease-out}100%{opacity:1;transform:scale3d(1, 0, 1);transform-origin:50% 100%;transition-timing-function:ease-out}}@media screen and (max-width: 40rem){:host.modal-drop form{margin:2rem 0}:host.modal-drop input{width:100%;left:0}}\n", "::ng-deep nb-layout.modal-half .layout{transition:transform 0.6s, opacity 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}::ng-deep nb-layout.modal-half.with-search .layout{transform:scale3d(0.8, 0.8, 1);pointer-events:none}:host.modal-half .search{text-align:center;position:fixed;z-index:1050;top:0;left:0;overflow:hidden;width:100%;height:100vh;background:none;pointer-events:none}:host.modal-half .search::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;opacity:0;transition:opacity 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}:host.modal-half .search button{font-size:2.5rem;position:absolute;top:3rem;display:block;z-index:100;opacity:0;transform:scale3d(0.8, 0.8, 1);transition:opacity 0.6s, transform 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1)}[dir=ltr] :host.modal-half .search button{right:3rem}[dir=rtl] :host.modal-half .search button{left:3rem}:host.modal-half .search .form-wrapper{position:absolute;display:flex;justify-content:center;align-items:center;width:100%;height:50%;transition:transform 0.6s;transition-timing-function:cubic-bezier(0.2, 1, 0.3, 1);transform:translate3d(0, -100%, 0)}:host.modal-half .search form{width:75%;margin:0 auto}:host.modal-half .search input{font-size:7vw;width:100%}:host.modal-half.show .search{pointer-events:auto}:host.modal-half.show .search::before{opacity:1}:host.modal-half.show .search button{opacity:1;transform:scale3d(1, 1, 1)}:host.modal-half.show .search .form-wrapper{transform:translate3d(0, 0, 0)}\n"]
        })
    ], NbSearchFieldComponent);
    return NbSearchFieldComponent;
}());
/**
 * Beautiful full-page search control.
 *
 * @stacked-example(Showcase, search/search-showcase.component)
 *
 * Basic setup:
 *
 * ```ts
 *  <nb-search type="rotate-layout"></nb-search>
 * ```
 * ### Installation
 *
 * Import `NbSearchModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSearchModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Several animation types are available:
 * modal-zoomin, rotate-layout, modal-move, curtain, column-curtain, modal-drop, modal-half
 *
 * It is also possible to handle search event using `NbSearchService`:
 *
 * @stacked-example(Search Event, search/search-event.component)
 *
 * @styles
 *
 * search-background-color:
 * search-divider-color:
 * search-divider-style:
 * search-divider-width:
 * search-extra-background-color:
 * search-text-color:
 * search-text-font-family:
 * search-text-font-size:
 * search-text-font-weight:
 * search-text-line-height:
 * search-placeholder-text-color:
 * search-info-text-color:
 * search-info-text-font-family:
 * search-info-text-font-size:
 * search-info-text-font-weight:
 * search-info-text-line-height:
 */
var NbSearchComponent = /** @class */ (function () {
    function NbSearchComponent(searchService, themeService, router, overlayService, changeDetector) {
        this.searchService = searchService;
        this.themeService = themeService;
        this.router = router;
        this.overlayService = overlayService;
        this.changeDetector = changeDetector;
        this.alive = true;
        this.showSearchField = false;
        /**
         * Search input placeholder
         * @type {string}
         */
        this.placeholder = 'Search...';
        /**
         * Hint showing under the input field to improve user experience
         *
         * @type {string}
         */
        this.hint = 'Hit enter to search';
    }
    NbSearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (event) { return event instanceof NavigationEnd; }))
            .subscribe(function () { return _this.hideSearch(); });
        this.searchService.onSearchActivate()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return !_this.tag || data.tag === _this.tag; }))
            .subscribe(function () { return _this.openSearch(); });
        this.searchService.onSearchDeactivate()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (data) { return !_this.tag || data.tag === _this.tag; }))
            .subscribe(function () { return _this.hideSearch(); });
    };
    NbSearchComponent.prototype.ngOnDestroy = function () {
        if (this.overlayRef && this.overlayRef.hasAttached()) {
            this.removeLayoutClasses();
            this.overlayRef.detach();
        }
        this.alive = false;
    };
    NbSearchComponent.prototype.openSearch = function () {
        var _this = this;
        if (!this.overlayRef) {
            this.overlayRef = this.overlayService.create();
            this.overlayRef.attach(this.searchFieldPortal);
        }
        this.themeService.appendLayoutClass(this.type);
        of(null).pipe(delay(0)).subscribe(function () {
            _this.themeService.appendLayoutClass('with-search');
            _this.showSearchField = true;
            _this.changeDetector.detectChanges();
        });
    };
    NbSearchComponent.prototype.hideSearch = function () {
        this.removeLayoutClasses();
        this.showSearchField = false;
        this.changeDetector.detectChanges();
        this.searchButton.nativeElement.focus();
    };
    NbSearchComponent.prototype.search = function (term) {
        this.searchService.submitSearch(term, this.tag);
        this.hideSearch();
    };
    NbSearchComponent.prototype.emitInput = function (term) {
        this.searchService.searchInput(term, this.tag);
    };
    NbSearchComponent.prototype.emitActivate = function () {
        this.searchService.activateSearch(this.type, this.tag);
    };
    NbSearchComponent.prototype.emitDeactivate = function () {
        this.searchService.deactivateSearch(this.type, this.tag);
    };
    NbSearchComponent.prototype.removeLayoutClasses = function () {
        var _this = this;
        this.themeService.removeLayoutClass('with-search');
        of(null).pipe(delay(500)).subscribe(function () {
            _this.themeService.removeLayoutClass(_this.type);
        });
    };
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchComponent.prototype, "tag", void 0);
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchComponent.prototype, "placeholder", void 0);
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchComponent.prototype, "hint", void 0);
    __decorate$75([
        Input(),
        __metadata$48("design:type", String)
    ], NbSearchComponent.prototype, "type", void 0);
    __decorate$75([
        ViewChild(NbPortalDirective, { static: false }),
        __metadata$48("design:type", NbPortalDirective)
    ], NbSearchComponent.prototype, "searchFieldPortal", void 0);
    __decorate$75([
        ViewChild('searchButton', { read: ElementRef, static: false }),
        __metadata$48("design:type", ElementRef)
    ], NbSearchComponent.prototype, "searchButton", void 0);
    NbSearchComponent = __decorate$75([
        Component({
            selector: 'nb-search',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <button #searchButton class=\"start-search\" (click)=\"emitActivate()\" nbButton ghost>\n      <nb-icon icon=\"search-outline\" pack=\"nebular-essentials\"></nb-icon>\n    </button>\n    <nb-search-field\n      *nbPortal\n      [show]=\"showSearchField\"\n      [type]=\"type\"\n      [placeholder]=\"placeholder\"\n      [hint]=\"hint\"\n      (search)=\"search($event)\"\n      (searchInput)=\"emitInput($event)\"\n      (close)=\"emitDeactivate()\">\n    </nb-search-field>\n  ",
            styles: [":host button{font-size:2rem;margin:0 auto;padding:0;cursor:pointer;border:none;background:none}:host button:focus{box-shadow:none;outline:none}::ng-deep nb-layout.with-search .scrollable-container{position:relative;z-index:0}\n"]
        }),
        __metadata$48("design:paramtypes", [NbSearchService,
            NbThemeService,
            Router,
            NbOverlayService,
            ChangeDetectorRef])
    ], NbSearchComponent);
    return NbSearchComponent;
}());

var __decorate$74 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbSearchModule = /** @class */ (function () {
    function NbSearchModule() {
    }
    NbSearchModule = __decorate$74([
        NgModule({
            imports: [
                NbSharedModule,
                NbOverlayModule,
                NbIconModule,
                NbButtonModule,
            ],
            declarations: [
                NbSearchComponent,
                NbSearchFieldComponent,
            ],
            exports: [
                NbSearchComponent,
                NbSearchFieldComponent,
            ],
            providers: [
                NbSearchService,
            ],
            entryComponents: [
                NbSearchFieldComponent,
            ],
        })
    ], NbSearchModule);
    return NbSearchModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$77 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$49 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Styled checkbox component
 *
 * @stacked-example(Showcase, checkbox/checkbox-showcase.component)
 *
 * ### Installation
 *
 * Import `NbCheckboxComponent` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbCheckboxModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Can have one of the following statuses: danger, success or warning
 *
 * @stacked-example(Colored Checkboxes, checkbox/checkbox-status.component)
 *
 * Indeterminate state is also supported:
 * @stacked-example(Indeterminate Checkbox, checkbox/checkbox-indeterminate.component)
 *
 * @additional-example(Disabled Checkbox, checkbox/checkbox-disabled.component)
 *
 * @styles
 *
 * checkbox-height:
 * checkbox-width:
 * checkbox-background-color:
 * checkbox-border-color:
 * checkbox-border-style:
 * checkbox-border-width:
 * checkbox-border-radius:
 * checkbox-outline-width:
 * checkbox-outline-color:
 * checkbox-text-color:
 * checkbox-text-font-family:
 * checkbox-text-font-size:
 * checkbox-text-font-weight:
 * checkbox-text-line-height:
 * checkbox-disabled-background-color:
 * checkbox-disabled-border-color:
 * checkbox-disabled-checkmark-color:
 * checkbox-disabled-text-color:
 * checkbox-primary-background-color:
 * checkbox-primary-border-color:
 * checkbox-primary-checked-background-color:
 * checkbox-primary-checked-border-color:
 * checkbox-primary-checked-checkmark-color:
 * checkbox-primary-indeterminate-background-color:
 * checkbox-primary-indeterminate-border-color:
 * checkbox-primary-indeterminate-checkmark-color:
 * checkbox-primary-focus-border-color:
 * checkbox-primary-hover-background-color:
 * checkbox-primary-hover-border-color:
 * checkbox-primary-active-background-color:
 * checkbox-primary-active-border-color:
 * checkbox-success-background-color:
 * checkbox-success-border-color:
 * checkbox-success-checked-background-color:
 * checkbox-success-checked-border-color:
 * checkbox-success-checked-checkmark-color:
 * checkbox-success-indeterminate-background-color:
 * checkbox-success-indeterminate-border-color:
 * checkbox-success-indeterminate-checkmark-color:
 * checkbox-success-focus-border-color:
 * checkbox-success-hover-background-color:
 * checkbox-success-hover-border-color:
 * checkbox-success-active-background-color:
 * checkbox-success-active-border-color:
 * checkbox-warning-background-color:
 * checkbox-warning-border-color:
 * checkbox-warning-checked-background-color:
 * checkbox-warning-checked-border-color:
 * checkbox-warning-checked-checkmark-color:
 * checkbox-warning-indeterminate-background-color:
 * checkbox-warning-indeterminate-border-color:
 * checkbox-warning-indeterminate-checkmark-color:
 * checkbox-warning-focus-border-color:
 * checkbox-warning-hover-background-color:
 * checkbox-warning-hover-border-color:
 * checkbox-warning-active-background-color:
 * checkbox-warning-active-border-color:
 * checkbox-danger-background-color:
 * checkbox-danger-border-color:
 * checkbox-danger-checked-background-color:
 * checkbox-danger-checked-border-color:
 * checkbox-danger-checked-checkmark-color:
 * checkbox-danger-indeterminate-background-color:
 * checkbox-danger-indeterminate-border-color:
 * checkbox-danger-indeterminate-checkmark-color:
 * checkbox-danger-focus-border-color:
 * checkbox-danger-hover-background-color:
 * checkbox-danger-hover-border-color:
 * checkbox-danger-active-background-color:
 * checkbox-danger-active-border-color:
 * checkbox-info-background-color:
 * checkbox-info-border-color:
 * checkbox-info-checked-background-color:
 * checkbox-info-checked-border-color:
 * checkbox-info-checked-checkmark-color:
 * checkbox-info-indeterminate-background-color:
 * checkbox-info-indeterminate-border-color:
 * checkbox-info-indeterminate-checkmark-color:
 * checkbox-info-focus-border-color:
 * checkbox-info-hover-background-color:
 * checkbox-info-hover-border-color:
 * checkbox-info-active-background-color:
 * checkbox-info-active-border-color:
 */
var NbCheckboxComponent = /** @class */ (function () {
    function NbCheckboxComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.onChange = function () { };
        this.onTouched = function () { };
        this._checked = false;
        this._disabled = false;
        /**
         * Checkbox status.
         * Possible values are: `primary` (default), `success`, `warning`, `danger`, `info`
         */
        this.status = '';
        this._indeterminate = false;
        /**
         * Output when checked state is changed by a user
         * @type EventEmitter<boolean>
         */
        this.checkedChange = new EventEmitter();
    }
    NbCheckboxComponent_1 = NbCheckboxComponent;
    Object.defineProperty(NbCheckboxComponent.prototype, "value", {
        /**
         * Checkbox value
         * @deprecated
         * @breaking-change Remove @5.0.0
         */
        get: function () {
            return this.checked;
        },
        /**
         * @deprecated
         * @breaking-change Remove @5.0.0
         */
        set: function (value) {
            console.warn('NbCheckbox: `value` is deprecated and will be removed in 5.0.0. Use `checked` instead.');
            this.checked = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            this._checked = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "disabled", {
        /**
         * Controls input disabled state
         */
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "indeterminate", {
        /**
         * Controls checkbox indeterminate state
         */
        get: function () {
            return this._indeterminate;
        },
        set: function (value) {
            this._indeterminate = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "valueChange", {
        /**
         * Output when checked state is changed by a user
         * @deprecated
         * @breaking-change Remove @5.0.0
         * @type EventEmitter<boolean>
         */
        get: function () {
            console.warn('NbCheckbox: `valueChange` is deprecated and will be removed in 5.0.0. Use `checkedChange` instead.');
            return this.checkedChange;
        },
        set: function (valueChange) {
            this.checkedChange = valueChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbCheckboxComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    NbCheckboxComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbCheckboxComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbCheckboxComponent.prototype.writeValue = function (val) {
        this._checked = val;
        this.changeDetector.detectChanges();
    };
    NbCheckboxComponent.prototype.setDisabledState = function (val) {
        this.disabled = convertToBoolProperty(val);
    };
    NbCheckboxComponent.prototype.setTouched = function () {
        this.onTouched();
    };
    NbCheckboxComponent.prototype.updateValueAndIndeterminate = function (event) {
        var input = event.target;
        this.checked = input.checked;
        this.checkedChange.emit(this.checked);
        this.onChange(this.checked);
        this.indeterminate = input.indeterminate;
    };
    var NbCheckboxComponent_1;
    __decorate$77([
        Input(),
        __metadata$49("design:type", Boolean),
        __metadata$49("design:paramtypes", [Boolean])
    ], NbCheckboxComponent.prototype, "value", null);
    __decorate$77([
        Input(),
        __metadata$49("design:type", Boolean),
        __metadata$49("design:paramtypes", [Boolean])
    ], NbCheckboxComponent.prototype, "checked", null);
    __decorate$77([
        Input(),
        __metadata$49("design:type", Boolean),
        __metadata$49("design:paramtypes", [Boolean])
    ], NbCheckboxComponent.prototype, "disabled", null);
    __decorate$77([
        Input(),
        __metadata$49("design:type", String)
    ], NbCheckboxComponent.prototype, "status", void 0);
    __decorate$77([
        Input(),
        __metadata$49("design:type", Boolean),
        __metadata$49("design:paramtypes", [Boolean])
    ], NbCheckboxComponent.prototype, "indeterminate", null);
    __decorate$77([
        Output(),
        __metadata$49("design:type", EventEmitter),
        __metadata$49("design:paramtypes", [EventEmitter])
    ], NbCheckboxComponent.prototype, "valueChange", null);
    __decorate$77([
        Output(),
        __metadata$49("design:type", Object)
    ], NbCheckboxComponent.prototype, "checkedChange", void 0);
    __decorate$77([
        HostBinding('class.status-primary'),
        __metadata$49("design:type", Object),
        __metadata$49("design:paramtypes", [])
    ], NbCheckboxComponent.prototype, "primary", null);
    __decorate$77([
        HostBinding('class.status-success'),
        __metadata$49("design:type", Object),
        __metadata$49("design:paramtypes", [])
    ], NbCheckboxComponent.prototype, "success", null);
    __decorate$77([
        HostBinding('class.status-warning'),
        __metadata$49("design:type", Object),
        __metadata$49("design:paramtypes", [])
    ], NbCheckboxComponent.prototype, "warning", null);
    __decorate$77([
        HostBinding('class.status-danger'),
        __metadata$49("design:type", Object),
        __metadata$49("design:paramtypes", [])
    ], NbCheckboxComponent.prototype, "danger", null);
    __decorate$77([
        HostBinding('class.status-info'),
        __metadata$49("design:type", Object),
        __metadata$49("design:paramtypes", [])
    ], NbCheckboxComponent.prototype, "info", null);
    NbCheckboxComponent = NbCheckboxComponent_1 = __decorate$77([
        Component({
            selector: 'nb-checkbox',
            template: "\n    <label class=\"label\">\n      <input type=\"checkbox\" class=\"native-input visually-hidden\"\n             [disabled]=\"disabled\"\n             [checked]=\"value\"\n             (change)=\"updateValueAndIndeterminate($event)\"\n             (blur)=\"setTouched()\"\n             [indeterminate]=\"indeterminate\">\n      <span [class.indeterminate]=\"indeterminate\" [class.checked]=\"value\" class=\"custom-checkbox\">\n        <nb-icon *ngIf=\"indeterminate\" icon=\"minus-bold-outline\" pack=\"nebular-essentials\"></nb-icon>\n        <nb-icon *ngIf=\"value && !indeterminate\" icon=\"checkmark-bold-outline\" pack=\"nebular-essentials\"></nb-icon>\n      </span>\n      <span class=\"text\">\n        <ng-content></ng-content>\n      </span>\n    </label>\n  ",
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NbCheckboxComponent_1; }),
                    multi: true,
                }],
            styles: [":host .label{position:relative;display:inline-flex;align-items:center;margin:0;min-height:inherit;padding:0.375rem 1.5rem 0.375rem 0}:host .custom-checkbox{flex-shrink:0;transition-duration:0.15s;transition-property:background-color,border,box-shadow;transition-timing-function:ease-in}:host .text{transition:color 0.15s ease-in}[dir=ltr] :host .text{padding-left:.6875rem}[dir=rtl] :host .text{padding-right:.6875rem}\n"]
        }),
        __metadata$49("design:paramtypes", [ChangeDetectorRef])
    ], NbCheckboxComponent);
    return NbCheckboxComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$78 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbCheckboxModule = /** @class */ (function () {
    function NbCheckboxModule() {
    }
    NbCheckboxModule = __decorate$78([
        NgModule({
            imports: [
                NbSharedModule,
                NbIconModule,
            ],
            declarations: [NbCheckboxComponent],
            exports: [NbCheckboxComponent],
        })
    ], NbCheckboxModule);
    return NbCheckboxModule;
}());

var __decorate$80 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$51 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbDynamicOverlay = /** @class */ (function () {
    function NbDynamicOverlay(overlay, componentFactoryResolver, zone) {
        this.overlay = overlay;
        this.componentFactoryResolver = componentFactoryResolver;
        this.zone = zone;
        this.context = {};
        this.positionStrategyChange$ = new Subject();
        this.alive = true;
    }
    Object.defineProperty(NbDynamicOverlay.prototype, "isAttached", {
        get: function () {
            return this.ref && this.ref.hasAttached();
        },
        enumerable: true,
        configurable: true
    });
    NbDynamicOverlay.prototype.create = function (componentType, content, context, positionStrategy) {
        this.setContentAndContext(content, context);
        this.setComponent(componentType);
        this.setPositionStrategy(positionStrategy);
        return this;
    };
    NbDynamicOverlay.prototype.setContent = function (content) {
        this.content = content;
        if (this.container) {
            this.updateContext();
        }
    };
    NbDynamicOverlay.prototype.setContext = function (context) {
        this.context = context;
        if (this.container) {
            this.updateContext();
        }
    };
    NbDynamicOverlay.prototype.setContentAndContext = function (content, context) {
        this.content = content;
        this.context = context;
        if (this.container) {
            this.updateContext();
        }
    };
    NbDynamicOverlay.prototype.setComponent = function (componentType) {
        this.componentType = componentType;
        // in case the component is shown we recreate it and show it back
        if (this.ref && this.isAttached) {
            this.dispose();
            this.show();
        }
        else if (this.ref && !this.isAttached) {
            this.dispose();
        }
    };
    NbDynamicOverlay.prototype.setPositionStrategy = function (positionStrategy) {
        var _this = this;
        this.positionStrategyChange$.next();
        this.positionStrategy = positionStrategy;
        this.positionStrategy.positionChange
            .pipe(takeWhile(function () { return _this.alive; }), takeUntil(this.positionStrategyChange$), filter(function () { return !!_this.container; }))
            .subscribe(function (position) { return patch(_this.container, { position: position }); });
        if (this.ref) {
            this.ref.updatePositionStrategy(this.positionStrategy);
        }
    };
    NbDynamicOverlay.prototype.show = function () {
        if (!this.ref) {
            this.createOverlay();
        }
        this.renderContainer();
    };
    NbDynamicOverlay.prototype.hide = function () {
        if (!this.ref) {
            return;
        }
        this.ref.detach();
        this.container = null;
    };
    NbDynamicOverlay.prototype.toggle = function () {
        if (this.isAttached) {
            this.hide();
        }
        else {
            this.show();
        }
    };
    NbDynamicOverlay.prototype.dispose = function () {
        this.alive = false;
        this.hide();
        if (this.ref) {
            this.ref.dispose();
            this.ref = null;
        }
    };
    NbDynamicOverlay.prototype.getContainer = function () {
        return this.container;
    };
    NbDynamicOverlay.prototype.createOverlay = function () {
        this.ref = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
        this.updatePositionWhenStable();
    };
    NbDynamicOverlay.prototype.renderContainer = function () {
        var containerContext = this.createContainerContext();
        if (!this.container) {
            this.container = createContainer(this.ref, this.componentType, containerContext, this.componentFactoryResolver);
        }
        this.container.instance.renderContent();
    };
    NbDynamicOverlay.prototype.updateContext = function () {
        var containerContext = this.createContainerContext();
        Object.assign(this.container.instance, containerContext);
        this.container.instance.renderContent();
        this.container.changeDetectorRef.detectChanges();
    };
    NbDynamicOverlay.prototype.createContainerContext = function () {
        return {
            content: this.content,
            context: this.context,
            cfr: this.componentFactoryResolver,
        };
    };
    /**
     * Dimensions of the container may change after content update. So we listen to zone.stable event to
     * reposition the container.
     */
    NbDynamicOverlay.prototype.updatePositionWhenStable = function () {
        var _this = this;
        this.zone.onStable
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () {
            _this.ref && _this.ref.updatePosition();
        });
    };
    NbDynamicOverlay = __decorate$80([
        Injectable(),
        __metadata$51("design:paramtypes", [NbOverlayService,
            ComponentFactoryResolver,
            NgZone])
    ], NbDynamicOverlay);
    return NbDynamicOverlay;
}());

var __extends$9 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$81 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$52 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbDynamicOverlayChange = /** @class */ (function (_super) {
    __extends$9(NbDynamicOverlayChange, _super);
    function NbDynamicOverlayChange(previousValue, currentValue, firstChange) {
        if (firstChange === void 0) { firstChange = false; }
        return _super.call(this, previousValue, currentValue, firstChange) || this;
    }
    NbDynamicOverlayChange.prototype.isChanged = function () {
        return this.currentValue !== this.previousValue;
    };
    return NbDynamicOverlayChange;
}(SimpleChange));
var NbDynamicOverlayHandler = /** @class */ (function () {
    function NbDynamicOverlayHandler(positionBuilder, triggerStrategyBuilder, dynamicOverlayService) {
        this.positionBuilder = positionBuilder;
        this.triggerStrategyBuilder = triggerStrategyBuilder;
        this.dynamicOverlayService = dynamicOverlayService;
        this._context = {};
        this._trigger = NbTrigger.NOOP;
        this._position = NbPosition.TOP;
        this._adjustment = NbAdjustment.NOOP;
        this._offset = 15;
        this.changes = {};
    }
    NbDynamicOverlayHandler.prototype.host = function (host) {
        this.changes.host = new NbDynamicOverlayChange(this._host, host);
        this._host = host;
        return this;
    };
    NbDynamicOverlayHandler.prototype.trigger = function (trigger$$1) {
        this.changes.trigger = new NbDynamicOverlayChange(this._trigger, trigger$$1);
        this._trigger = trigger$$1;
        return this;
    };
    NbDynamicOverlayHandler.prototype.position = function (position) {
        this.changes.position = new NbDynamicOverlayChange(this._position, position);
        this._position = position;
        return this;
    };
    NbDynamicOverlayHandler.prototype.adjustment = function (adjustment) {
        this.changes.adjustment = new NbDynamicOverlayChange(this._adjustment, adjustment);
        this._adjustment = adjustment;
        return this;
    };
    NbDynamicOverlayHandler.prototype.componentType = function (componentType) {
        this.changes.componentType = new NbDynamicOverlayChange(this._componentType, componentType);
        this._componentType = componentType;
        return this;
    };
    NbDynamicOverlayHandler.prototype.content = function (content) {
        this.changes.content = new NbDynamicOverlayChange(this._content, content);
        this._content = content;
        return this;
    };
    NbDynamicOverlayHandler.prototype.context = function (context) {
        this.changes.context = new NbDynamicOverlayChange(this._context, context);
        this._context = context;
        return this;
    };
    NbDynamicOverlayHandler.prototype.offset = function (offset) {
        this.changes.offset = new NbDynamicOverlayChange(this._offset, offset);
        this._offset = offset;
        return this;
    };
    NbDynamicOverlayHandler.prototype.build = function () {
        if (!this._componentType || !this._host) {
            throw Error("NbDynamicOverlayHandler: at least 'componentType' and 'host' should be\n      passed before building a dynamic overlay.");
        }
        this.dynamicOverlay = this.dynamicOverlayService.create(this._componentType, this._content, this._context, this.createPositionStrategy());
        this.connect();
        this.clearChanges();
        return this.dynamicOverlay;
    };
    NbDynamicOverlayHandler.prototype.rebuild = function () {
        /**
         * we should not throw here
         * as we use rebuilt in lifecycle hooks
         * which it could be called before the build
         * so we just ignore this call
         */
        if (!this.dynamicOverlay) {
            return;
        }
        if (this.isPositionStrategyUpdateRequired()) {
            this.dynamicOverlay.setPositionStrategy(this.createPositionStrategy());
        }
        if (this.isTriggerStrategyUpdateRequired()) {
            this.connect();
        }
        if (this.isContainerRerenderRequired()) {
            this.dynamicOverlay.setContentAndContext(this._content, this._context);
        }
        if (this.isComponentTypeUpdateRequired()) {
            this.dynamicOverlay.setComponent(this._componentType);
        }
        this.clearChanges();
        return this.dynamicOverlay;
    };
    NbDynamicOverlayHandler.prototype.connect = function () {
        if (!this.dynamicOverlay) {
            throw new Error("NbDynamicOverlayHandler: cannot connect to DynamicOverlay\n      as it is not created yet. Call build() first");
        }
        this.disconnect();
        this.subscribeOnTriggers(this.dynamicOverlay);
    };
    NbDynamicOverlayHandler.prototype.disconnect = function () {
        if (this.triggerStrategy) {
            this.triggerStrategy.destroy();
        }
    };
    NbDynamicOverlayHandler.prototype.destroy = function () {
        this.disconnect();
        this.clearChanges();
        if (this.dynamicOverlay) {
            this.dynamicOverlay.dispose();
        }
    };
    NbDynamicOverlayHandler.prototype.createPositionStrategy = function () {
        return this.positionBuilder
            .connectedTo(this._host)
            .position(this._position)
            .adjustment(this._adjustment)
            .offset(this._offset);
    };
    NbDynamicOverlayHandler.prototype.subscribeOnTriggers = function (dynamicOverlay) {
        this.triggerStrategy = this.triggerStrategyBuilder
            .trigger(this._trigger)
            .host(this._host.nativeElement)
            .container(function () { return dynamicOverlay.getContainer(); })
            .build();
        this.triggerStrategy.show$.subscribe(function () { return dynamicOverlay.show(); });
        this.triggerStrategy.hide$.subscribe(function () { return dynamicOverlay.hide(); });
    };
    NbDynamicOverlayHandler.prototype.isContainerRerenderRequired = function () {
        return this.isContentUpdated()
            || this.isContextUpdated()
            || this.isPositionStrategyUpdateRequired();
    };
    NbDynamicOverlayHandler.prototype.isPositionStrategyUpdateRequired = function () {
        return this.isAdjustmentUpdated() || this.isPositionUpdated() || this.isOffsetUpdated() || this.isHostUpdated();
    };
    NbDynamicOverlayHandler.prototype.isTriggerStrategyUpdateRequired = function () {
        return this.isTriggerUpdated() || this.isHostUpdated();
    };
    NbDynamicOverlayHandler.prototype.isComponentTypeUpdateRequired = function () {
        return this.isComponentTypeUpdated();
    };
    NbDynamicOverlayHandler.prototype.isComponentTypeUpdated = function () {
        return this.changes.componentType && this.changes.componentType.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isContentUpdated = function () {
        return this.changes.content && this.changes.content.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isContextUpdated = function () {
        return this.changes.context && this.changes.context.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isAdjustmentUpdated = function () {
        return this.changes.adjustment && this.changes.adjustment.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isPositionUpdated = function () {
        return this.changes.position && this.changes.position.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isHostUpdated = function () {
        return this.changes.host && this.changes.host.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isTriggerUpdated = function () {
        return this.changes.trigger && this.changes.trigger.isChanged();
    };
    NbDynamicOverlayHandler.prototype.isOffsetUpdated = function () {
        return this.changes.offset && this.changes.offset.isChanged();
    };
    NbDynamicOverlayHandler.prototype.clearChanges = function () {
        this.changes = {};
    };
    NbDynamicOverlayHandler = __decorate$81([
        Injectable(),
        __metadata$52("design:paramtypes", [NbPositionBuilderService,
            NbTriggerStrategyBuilderService,
            NbDynamicOverlay])
    ], NbDynamicOverlayHandler);
    return NbDynamicOverlayHandler;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$10 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$82 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$53 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Overlay container.
 * Renders provided content inside.
 *
 * @styles
 *
 * popover-text-color:
 * popover-text-font-family:
 * popover-text-font-size:
 * popover-text-font-weight:
 * popover-text-line-height:
 * popover-background-color:
 * popover-border-width:
 * popover-border-color:
 * popover-border-radius:
 * popover-shadow:
 * popover-arrow-size:
 * popover-padding:
 * */
var NbPopoverComponent = /** @class */ (function (_super) {
    __extends$10(NbPopoverComponent, _super);
    function NbPopoverComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbPopoverComponent.prototype.renderContent = function () {
        this.detachContent();
        this.attachContent();
    };
    NbPopoverComponent.prototype.detachContent = function () {
        this.overlayContainer.detach();
    };
    NbPopoverComponent.prototype.attachContent = function () {
        if (this.content instanceof TemplateRef) {
            this.attachTemplate();
        }
        else if (this.content instanceof Type) {
            this.attachComponent();
        }
        else {
            this.attachString();
        }
    };
    NbPopoverComponent.prototype.attachTemplate = function () {
        this.overlayContainer
            .attachTemplatePortal(new NbTemplatePortal(this.content, null, { $implicit: this.context }));
    };
    NbPopoverComponent.prototype.attachComponent = function () {
        var portal = new NbComponentPortal(this.content, null, null, this.cfr);
        var ref = this.overlayContainer.attachComponentPortal(portal, this.context);
        ref.changeDetectorRef.detectChanges();
    };
    NbPopoverComponent.prototype.attachString = function () {
        this.overlayContainer.attachStringContent(this.content);
    };
    __decorate$82([
        ViewChild(NbOverlayContainerComponent, { static: false }),
        __metadata$53("design:type", NbOverlayContainerComponent)
    ], NbPopoverComponent.prototype, "overlayContainer", void 0);
    __decorate$82([
        Input(),
        __metadata$53("design:type", Object)
    ], NbPopoverComponent.prototype, "content", void 0);
    __decorate$82([
        Input(),
        __metadata$53("design:type", Object)
    ], NbPopoverComponent.prototype, "context", void 0);
    __decorate$82([
        Input(),
        __metadata$53("design:type", ComponentFactoryResolver)
    ], NbPopoverComponent.prototype, "cfr", void 0);
    NbPopoverComponent = __decorate$82([
        Component({
            selector: 'nb-popover',
            template: "\n    <span class=\"arrow\"></span>\n    <nb-overlay-container></nb-overlay-container>\n  ",
            styles: [":host .arrow{position:absolute;width:0;height:0}\n"]
        })
    ], NbPopoverComponent);
    return NbPopoverComponent;
}(NbPositionedContainer));

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$79 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$50 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Powerful popover directive, which provides the best UX for your users.
 *
 * @stacked-example(Showcase, popover/popover-showcase.component)
 *
 * Popover can accept different content such as:
 * TemplateRef
 *
 * ```html
 * <button [nbPopover]="templateRef"></button>
 * <ng-template #templateRef>
 *   <span>Hello, Popover!</span>
 * </ng-template>
 * ```
 * ### Installation
 *
 * Import `NbPopoverModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbPopoverModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Custom components
 *
 * ```html
 * <button [nbPopover]="MyPopoverComponent"></button>
 * ```
 *
 * Both custom components and templateRef popovers can receive *contentContext* property
 * that will be passed to the content props.
 *
 * Primitive types
 *
 * ```html
 * <button nbPopover="Hello, Popover!"></button>
 * ```
 *
 * Popover has different placements, such as: top, bottom, left, right, start and end
 * which can be used as following:
 *
 * @stacked-example(Placements, popover/popover-placements.component)
 *
 * By default popover will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change position of the popover container.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```html
 * <button nbPopover="Hello, Popover!" [nbPopoverAdjustment]="false"></button>
 * ```
 *
 * Popover has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 *
 * @stacked-example(Available Triggers, popover/popover-modes.component.html)
 *
 * Noop mode is especially useful when you need to control Popover programmatically, for example show/hide
 * as a result of some third-party action, like HTTP request or validation check:
 *
 * @stacked-example(Manual Control, popover/popover-noop.component)
 *
 * Below are examples for manual popover settings control, both via template binding and code.
 * @stacked-example(Popover Settings, popover/popover-dynamic.component)
 *
 * Please note, while manipulating Popover setting via code, you need to call `rebuild()` method to apply the settings
 * changed.
 * @stacked-example(Popover Settings Code, popover/popover-dynamic-code.component)
 *
 * @additional-example(Template Ref, popover/popover-template-ref.component)
 * @additional-example(Custom Component, popover/popover-custom-component.component)
 * */
var NbPopoverDirective = /** @class */ (function () {
    function NbPopoverDirective(hostRef, dynamicOverlayHandler) {
        this.hostRef = hostRef;
        this.dynamicOverlayHandler = dynamicOverlayHandler;
        /**
         * Container content context. Will be applied to the rendered component.
         * */
        this.context = {};
        /**
         * Position will be calculated relatively host element based on the position.
         * Can be top, right, bottom, left, start or end.
         * */
        this.position = NbPosition.TOP;
        /**
         * Container position will be changes automatically based on this strategy if container can't fit view port.
         * Set this property to any falsy value if you want to disable automatically adjustment.
         * Available values: clockwise, counterclockwise.
         * */
        this.adjustment = NbAdjustment.CLOCKWISE;
        /**
         * Describes when the container will be shown.
         * Available options: `click`, `hover`, `hint`, `focus` and `noop`
         * */
        this.trigger = NbTrigger.CLICK;
    }
    NbPopoverDirective.prototype.ngOnInit = function () {
        this.dynamicOverlayHandler
            .host(this.hostRef)
            .componentType(NbPopoverComponent);
    };
    NbPopoverDirective.prototype.ngOnChanges = function () {
        this.rebuild();
    };
    NbPopoverDirective.prototype.ngAfterViewInit = function () {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .build();
    };
    NbPopoverDirective.prototype.rebuild = function () {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .rebuild();
    };
    NbPopoverDirective.prototype.show = function () {
        this.dynamicOverlay.show();
    };
    NbPopoverDirective.prototype.hide = function () {
        this.dynamicOverlay.hide();
    };
    NbPopoverDirective.prototype.toggle = function () {
        this.dynamicOverlay.toggle();
    };
    NbPopoverDirective.prototype.ngOnDestroy = function () {
        this.dynamicOverlayHandler.destroy();
    };
    NbPopoverDirective.prototype.configureDynamicOverlay = function () {
        return this.dynamicOverlayHandler
            .position(this.position)
            .trigger(this.trigger)
            .adjustment(this.adjustment)
            .content(this.content)
            .context(this.context);
    };
    __decorate$79([
        Input('nbPopover'),
        __metadata$50("design:type", Object)
    ], NbPopoverDirective.prototype, "content", void 0);
    __decorate$79([
        Input('nbPopoverContext'),
        __metadata$50("design:type", Object)
    ], NbPopoverDirective.prototype, "context", void 0);
    __decorate$79([
        Input('nbPopoverPlacement'),
        __metadata$50("design:type", String)
    ], NbPopoverDirective.prototype, "position", void 0);
    __decorate$79([
        Input('nbPopoverAdjustment'),
        __metadata$50("design:type", String)
    ], NbPopoverDirective.prototype, "adjustment", void 0);
    __decorate$79([
        Input('nbPopoverTrigger'),
        __metadata$50("design:type", String)
    ], NbPopoverDirective.prototype, "trigger", void 0);
    NbPopoverDirective = __decorate$79([
        Directive({
            selector: '[nbPopover]',
            providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
        }),
        __metadata$50("design:paramtypes", [ElementRef,
            NbDynamicOverlayHandler])
    ], NbPopoverDirective);
    return NbPopoverDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$83 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbPopoverModule = /** @class */ (function () {
    function NbPopoverModule() {
    }
    NbPopoverModule = __decorate$83([
        NgModule({
            imports: [NbOverlayModule],
            declarations: [NbPopoverDirective, NbPopoverComponent],
            exports: [NbPopoverDirective],
            entryComponents: [NbPopoverComponent],
        })
    ], NbPopoverModule);
    return NbPopoverModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$11 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$85 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$55 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Context menu component used as content within NbContextMenuDirective.
 *
 * @styles
 *
 * context-menu-background-color:
 * context-menu-border-color:
 * context-menu-border-style:
 * context-menu-border-width:
 * context-menu-border-radius:
 * context-menu-min-width:
 * context-menu-max-width:
 * context-menu-shadow:
 * */
var NbContextMenuComponent = /** @class */ (function (_super) {
    __extends$11(NbContextMenuComponent, _super);
    function NbContextMenuComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.items = [];
        _this.context = { items: [] };
        return _this;
    }
    /**
     * The method is empty since we don't need to do anything additionally
     * render is handled by change detection
     */
    NbContextMenuComponent.prototype.renderContent = function () { };
    __decorate$85([
        Input(),
        __metadata$55("design:type", Array)
    ], NbContextMenuComponent.prototype, "items", void 0);
    __decorate$85([
        Input(),
        __metadata$55("design:type", String)
    ], NbContextMenuComponent.prototype, "tag", void 0);
    __decorate$85([
        Input(),
        __metadata$55("design:type", Object)
    ], NbContextMenuComponent.prototype, "context", void 0);
    NbContextMenuComponent = __decorate$85([
        Component({
            selector: 'nb-context-menu',
            template: "\n    <nb-menu class=\"context-menu\" [items]=\"context.items\" [tag]=\"context.tag\"></nb-menu>\n  "
        })
    ], NbContextMenuComponent);
    return NbContextMenuComponent;
}(NbPositionedContainer));

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$84 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$54 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Full featured context menu directive.
 *
 * @stacked-example(Showcase, context-menu/context-menu-showcase.component)
 *
 * Just pass menu items array:
 *
 * ```html
 * <button [nbContextMenu]="items"></button>
 * ...
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * ### Installation
 *
 * Import `NbContextMenuModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbContextMenuModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to handle context menu clicks you have to pass `nbContextMenuTag`
 * param and register to events using NbMenuService.
 * `NbContextMenu` renders plain `NbMenu` inside, so
 * you have to work with it just like with `NbMenu` component:
 *
 * @stacked-example(Menu item click, context-menu/context-menu-click.component)
 *
 * Context menu has different placements, such as: top, bottom, left and right
 * which can be used as following:
 *
 * ```html
 * <button [nbContextMenu]="items" nbContextMenuPlacement="right"></button>
 * ```
 *
 * ```ts
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 *
 * By default context menu will try to adjust itself to maximally fit viewport
 * and provide the best user experience. It will try to change position of the context menu.
 * If you wanna disable this behaviour just set it falsy value.
 *
 * ```html
 * <button [nbContextMenu]="items" nbContextMenuAdjustment="counterclockwise"></button>
 * ```
 *
 * ```ts
 * items = [{ title: 'Profile' }, { title: 'Log out' }];
 * ```
 * Context menu has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 *
 * @stacked-example(Available Triggers, context-menu/context-menu-modes.component.html)
 *
 * Noop mode is especially useful when you need to control Popover programmatically, for example show/hide
 * as a result of some third-party action, like HTTP request or validation check:
 *
 * @stacked-example(Manual Control, context-menu/context-menu-noop.component)
 *
 * @stacked-example(Manual Control, context-menu/context-menu-right-click.component)
 * */
var NbContextMenuDirective = /** @class */ (function () {
    function NbContextMenuDirective(hostRef, menuService, dynamicOverlayHandler) {
        this.hostRef = hostRef;
        this.menuService = menuService;
        this.dynamicOverlayHandler = dynamicOverlayHandler;
        /**
         * Position will be calculated relatively host element based on the position.
         * Can be top, right, bottom and left.
         * */
        this.position = NbPosition.BOTTOM;
        /**
         * Container position will be changes automatically based on this strategy if container can't fit view port.
         * Set this property to any falsy value if you want to disable automatically adjustment.
         * Available values: clockwise, counterclockwise.
         * */
        this.adjustment = NbAdjustment.CLOCKWISE;
        /**
         * Describes when the container will be shown.
         * Available options: `click`, `hover`, `hint`, `focus` and `noop`
         * */
        this.trigger = NbTrigger.CLICK;
        this.alive = true;
        this._items = [];
    }
    Object.defineProperty(NbContextMenuDirective.prototype, "items", {
        /**
         * Basic menu items, will be passed to the internal NbMenuComponent.
         * */
        set: function (items) {
            this.validateItems(items);
            this._items = items;
        },
        enumerable: true,
        configurable: true
    });
    
    NbContextMenuDirective.prototype.ngOnInit = function () {
        this.dynamicOverlayHandler
            .host(this.hostRef)
            .componentType(NbContextMenuComponent);
    };
    NbContextMenuDirective.prototype.ngOnChanges = function () {
        this.rebuild();
    };
    NbContextMenuDirective.prototype.ngAfterViewInit = function () {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .build();
        this.subscribeOnItemClick();
    };
    NbContextMenuDirective.prototype.rebuild = function () {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .rebuild();
    };
    NbContextMenuDirective.prototype.show = function () {
        this.dynamicOverlay.show();
    };
    NbContextMenuDirective.prototype.hide = function () {
        this.dynamicOverlay.hide();
    };
    NbContextMenuDirective.prototype.toggle = function () {
        this.dynamicOverlay.toggle();
    };
    NbContextMenuDirective.prototype.ngOnDestroy = function () {
        this.dynamicOverlayHandler.destroy();
    };
    NbContextMenuDirective.prototype.configureDynamicOverlay = function () {
        return this.dynamicOverlayHandler
            .position(this.position)
            .trigger(this.trigger)
            .adjustment(this.adjustment)
            .context({
            position: this.position,
            items: this._items,
            tag: this.tag,
        });
    };
    /*
     * NbMenuComponent will crash if don't pass menu items to it.
     * So, we just validating them and throw custom obvious error.
     * */
    NbContextMenuDirective.prototype.validateItems = function (items) {
        if (!items || !items.length) {
            throw Error("List of menu items expected, but given: " + items);
        }
    };
    NbContextMenuDirective.prototype.subscribeOnItemClick = function () {
        var _this = this;
        this.menuService.onItemClick()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (_a) {
            var tag = _a.tag;
            return tag === _this.tag;
        }))
            .subscribe(function () { return _this.hide(); });
    };
    __decorate$84([
        Input('nbContextMenuPlacement'),
        __metadata$54("design:type", String)
    ], NbContextMenuDirective.prototype, "position", void 0);
    __decorate$84([
        Input('nbContextMenuAdjustment'),
        __metadata$54("design:type", String)
    ], NbContextMenuDirective.prototype, "adjustment", void 0);
    __decorate$84([
        Input('nbContextMenuTag'),
        __metadata$54("design:type", String)
    ], NbContextMenuDirective.prototype, "tag", void 0);
    __decorate$84([
        Input('nbContextMenu'),
        __metadata$54("design:type", Array),
        __metadata$54("design:paramtypes", [Array])
    ], NbContextMenuDirective.prototype, "items", null);
    __decorate$84([
        Input('nbContextMenuTrigger'),
        __metadata$54("design:type", String)
    ], NbContextMenuDirective.prototype, "trigger", void 0);
    NbContextMenuDirective = __decorate$84([
        Directive({
            selector: '[nbContextMenu]',
            providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
        }),
        __metadata$54("design:paramtypes", [ElementRef,
            NbMenuService,
            NbDynamicOverlayHandler])
    ], NbContextMenuDirective);
    return NbContextMenuDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$86 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbContextMenuModule = /** @class */ (function () {
    function NbContextMenuModule() {
    }
    NbContextMenuModule = __decorate$86([
        NgModule({
            imports: [CommonModule, NbOverlayModule, NbMenuModule],
            exports: [NbContextMenuDirective],
            declarations: [NbContextMenuDirective, NbContextMenuComponent],
            entryComponents: [NbContextMenuComponent],
        })
    ], NbContextMenuModule);
    return NbContextMenuModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$87 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$56 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Progress Bar is a component for indicating progress.
 *
 * Simple usage:
 *
 * ```html
 * <nb-progress-bar [value]="50"></nb-progress-bar>
 * ```
 * ### Installation
 *
 * Import `NbProgressBarModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbProgressBarModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Progress bar accepts property `value` in range 0-100
 * @stacked-example(Progress bar, progress-bar/progress-bar-showcase.component)
 *
 * Progress bar background could be configured by providing a `status` property:
 * @stacked-example(Progress bar status, progress-bar/progress-bar-status.component)
 *
 * Progress bar size (height and font-size) could be configured by providing a `size` property:
 * @stacked-example(Progress bar size, progress-bar/progress-bar-size.component)
 *
 * `displayValue` property shows current value inside progress bar. It's also possible to add custom text inside:
 * @stacked-example(Progress bar value, progress-bar/progress-bar-value.component)
 *
 * Progress bar supports `width` and `background-color` transition:
 * @stacked-example(Progress bar interactive, progress-bar/progress-bar-interactive.component)
 *
 * @styles
 *
 * progress-bar-animation-duration:
 * progress-bar-border-radius:
 * progress-bar-text-font-family:
 * progress-bar-tiny-height:
 * progress-bar-tiny-text-font-size:
 * progress-bar-tiny-text-font-weight:
 * progress-bar-tiny-text-line-height:
 * progress-bar-small-height:
 * progress-bar-small-text-font-size:
 * progress-bar-small-text-font-weight:
 * progress-bar-small-text-line-height:
 * progress-bar-medium-height:
 * progress-bar-medium-text-font-size:
 * progress-bar-medium-text-font-weight:
 * progress-bar-medium-text-line-height:
 * progress-bar-large-height:
 * progress-bar-large-text-font-size:
 * progress-bar-large-text-font-weight:
 * progress-bar-large-text-line-height:
 * progress-bar-giant-height:
 * progress-bar-giant-text-font-size:
 * progress-bar-giant-text-font-weight:
 * progress-bar-giant-text-line-height:
 * progress-bar-primary-background-color:
 * progress-bar-primary-filled-background-color:
 * progress-bar-primary-text-color:
 * progress-bar-success-background-color:
 * progress-bar-success-filled-background-color:
 * progress-bar-success-text-color:
 * progress-bar-info-background-color:
 * progress-bar-info-filled-background-color:
 * progress-bar-info-text-color:
 * progress-bar-warning-background-color:
 * progress-bar-warning-filled-background-color:
 * progress-bar-warning-text-color:
 * progress-bar-danger-background-color:
 * progress-bar-danger-filled-background-color:
 * progress-bar-danger-text-color:
 */
var NbProgressBarComponent = /** @class */ (function () {
    function NbProgressBarComponent() {
        /**
         * Progress bar value in percent (0 - 100)
         */
        this.value = 0;
        /**
         * Progress bar background (`primary` (default), `info`, `success`, `warning`, `danger`)
         */
        this.status = 'primary';
        /**
         * Progress bar size (`tiny`, `small`, `medium` (default), `large`, `giant`)
         */
        this.size = 'medium';
        /**
         * Displays value inside progress bar
         */
        this.displayValue = false;
    }
    Object.defineProperty(NbProgressBarComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbProgressBarComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    __decorate$87([
        Input(),
        __metadata$56("design:type", Number)
    ], NbProgressBarComponent.prototype, "value", void 0);
    __decorate$87([
        Input(),
        __metadata$56("design:type", String)
    ], NbProgressBarComponent.prototype, "status", void 0);
    __decorate$87([
        Input(),
        __metadata$56("design:type", String)
    ], NbProgressBarComponent.prototype, "size", void 0);
    __decorate$87([
        Input(),
        __metadata$56("design:type", Boolean)
    ], NbProgressBarComponent.prototype, "displayValue", void 0);
    __decorate$87([
        HostBinding('class.size-tiny'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "tiny", null);
    __decorate$87([
        HostBinding('class.size-small'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "small", null);
    __decorate$87([
        HostBinding('class.size-medium'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "medium", null);
    __decorate$87([
        HostBinding('class.size-large'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "large", null);
    __decorate$87([
        HostBinding('class.size-giant'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "giant", null);
    __decorate$87([
        HostBinding('class.status-primary'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "primary", null);
    __decorate$87([
        HostBinding('class.status-success'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "success", null);
    __decorate$87([
        HostBinding('class.status-info'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "info", null);
    __decorate$87([
        HostBinding('class.status-warning'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "warning", null);
    __decorate$87([
        HostBinding('class.status-danger'),
        __metadata$56("design:type", Boolean),
        __metadata$56("design:paramtypes", [])
    ], NbProgressBarComponent.prototype, "danger", null);
    NbProgressBarComponent = __decorate$87([
        Component({
            selector: 'nb-progress-bar',
            template: "\n    <div class=\"progress-container\">\n      <div class=\"progress-value\" [style.width.%]=\"value\">\n        <span *ngIf=\"displayValue\">{{ value }}%</span>\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            styles: [":host{display:block}.progress-container{overflow:hidden}.progress-value{height:100%;text-align:center;overflow:hidden}\n"]
        })
    ], NbProgressBarComponent);
    return NbProgressBarComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$88 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbProgressBarModule = /** @class */ (function () {
    function NbProgressBarModule() {
    }
    NbProgressBarModule = __decorate$88([
        NgModule({
            imports: [
                NbSharedModule,
            ],
            declarations: [NbProgressBarComponent],
            exports: [NbProgressBarComponent],
        })
    ], NbProgressBarModule);
    return NbProgressBarModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$89 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$57 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate$89([
        Input(),
        __metadata$57("design:type", String)
    ], NbAlertComponent.prototype, "size", void 0);
    __decorate$89([
        Input(),
        __metadata$57("design:type", String)
    ], NbAlertComponent.prototype, "status", void 0);
    __decorate$89([
        Input(),
        __metadata$57("design:type", String)
    ], NbAlertComponent.prototype, "accent", void 0);
    __decorate$89([
        Input(),
        __metadata$57("design:type", String)
    ], NbAlertComponent.prototype, "outline", void 0);
    __decorate$89([
        Input(),
        HostBinding('class.closable'),
        __metadata$57("design:type", Boolean),
        __metadata$57("design:paramtypes", [Boolean])
    ], NbAlertComponent.prototype, "closable", null);
    __decorate$89([
        Output(),
        __metadata$57("design:type", Object)
    ], NbAlertComponent.prototype, "close", void 0);
    __decorate$89([
        HostBinding('class.size-tiny'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "tiny", null);
    __decorate$89([
        HostBinding('class.size-small'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "small", null);
    __decorate$89([
        HostBinding('class.size-medium'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "medium", null);
    __decorate$89([
        HostBinding('class.size-large'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "large", null);
    __decorate$89([
        HostBinding('class.size-giant'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "giant", null);
    __decorate$89([
        HostBinding('class.status-primary'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "primary", null);
    __decorate$89([
        HostBinding('class.status-success'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "success", null);
    __decorate$89([
        HostBinding('class.status-info'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "info", null);
    __decorate$89([
        HostBinding('class.status-warning'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "warning", null);
    __decorate$89([
        HostBinding('class.status-danger'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "danger", null);
    __decorate$89([
        HostBinding('class.accent-primary'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "primaryAccent", null);
    __decorate$89([
        HostBinding('class.accent-success'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "successAccent", null);
    __decorate$89([
        HostBinding('class.accent-info'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "infoAccent", null);
    __decorate$89([
        HostBinding('class.accent-warning'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "warningAccent", null);
    __decorate$89([
        HostBinding('class.accent-danger'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "dangerAccent", null);
    __decorate$89([
        HostBinding('class.outline-primary'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "primaryOutline", null);
    __decorate$89([
        HostBinding('class.outline-success'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "successOutline", null);
    __decorate$89([
        HostBinding('class.outline-info'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "infoOutline", null);
    __decorate$89([
        HostBinding('class.outline-warning'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "warningOutline", null);
    __decorate$89([
        HostBinding('class.outline-danger'),
        __metadata$57("design:type", Object),
        __metadata$57("design:paramtypes", [])
    ], NbAlertComponent.prototype, "dangerOutline", null);
    NbAlertComponent = __decorate$89([
        Component({
            selector: 'nb-alert',
            template: "\n    <button *ngIf=\"closable\" type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"onClose()\">\n      <span aria-hidden=\"true\">&times;</span>\n    </button>\n    <ng-content></ng-content>\n  ",
            styles: [":host{display:flex;flex-direction:column;position:relative}[dir=ltr] :host .close{right:0}[dir=rtl] :host .close{left:0}.close{position:absolute;top:0;color:inherit;background-color:transparent;border:0;appearance:none}\n"]
        })
    ], NbAlertComponent);
    return NbAlertComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$90 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbAlertModule = /** @class */ (function () {
    function NbAlertModule() {
    }
    NbAlertModule = __decorate$90([
        NgModule({
            imports: [
                NbSharedModule,
            ],
            declarations: [
                NbAlertComponent,
            ],
            exports: [
                NbAlertComponent,
            ],
        })
    ], NbAlertModule);
    return NbAlertModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$92 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$59 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Chat form component.
 *
 * Show a message form with a send message button.
 *
 * ```ts
 * <nb-chat-form showButton="true" buttonIcon="nb-send">
 * </nb-chat-form>
 * ```
 *
 * When `[dropFiles]="true"` handles files drag&drop with a file preview.
 *
 * Drag & drop available for files and images:
 * @stacked-example(Drag & Drop Chat, chat/chat-drop.component)
 *
 * New message could be tracked outside by using `(send)` output.
 *
 * ```ts
 * <nb-chat-form (send)="onNewMessage($event)">
 * </nb-chat-form>
 *
 * // ...
 *
 * onNewMessage({ message: string, files: any[] }) {
 *   this.service.sendToServer(message, files);
 * }
 * ```
 */
var NbChatFormComponent = /** @class */ (function () {
    function NbChatFormComponent(cd, domSanitizer) {
        this.cd = cd;
        this.domSanitizer = domSanitizer;
        this.status = '';
        this.inputFocus = false;
        this.inputHover = false;
        this.droppedFiles = [];
        this.imgDropTypes = ['image/png', 'image/jpeg', 'image/gif'];
        /**
         * Predefined message text
         * @type {string}
         */
        this.message = '';
        /**
         * Send button title
         * @type {string}
         */
        this.buttonTitle = '';
        /**
         * Send button icon, shown if `buttonTitle` is empty
         * @type {string}
         */
        this.buttonIcon = 'paper-plane-outline';
        /**
         * Show send button
         * @type {boolean}
         */
        this.showButton = true;
        /**
         * Show send button
         * @type {boolean}
         */
        this.dropFiles = false;
        /**
         *
         * @type {EventEmitter<{ message: string, files: File[] }>}
         */
        this.send = new EventEmitter();
        this.fileOver = false;
    }
    NbChatFormComponent.prototype.onDrop = function (event) {
        var _this = this;
        if (this.dropFiles) {
            event.preventDefault();
            event.stopPropagation();
            this.fileOver = false;
            if (event.dataTransfer && event.dataTransfer.files) {
                var _loop_1 = function (file) {
                    var res = file;
                    if (this_1.imgDropTypes.includes(file.type)) {
                        var fr = new FileReader();
                        fr.onload = function (e) {
                            res.src = e.target.result;
                            res.urlStyle = _this.domSanitizer.bypassSecurityTrustStyle("url(" + res.src + ")");
                            _this.cd.detectChanges();
                        };
                        fr.readAsDataURL(file);
                    }
                    this_1.droppedFiles.push(res);
                };
                var this_1 = this;
                for (var _i = 0, _a = event.dataTransfer.files; _i < _a.length; _i++) {
                    var file = _a[_i];
                    _loop_1(file);
                }
            }
        }
    };
    NbChatFormComponent.prototype.removeFile = function (file) {
        var index = this.droppedFiles.indexOf(file);
        if (index >= 0) {
            this.droppedFiles.splice(index, 1);
        }
    };
    NbChatFormComponent.prototype.onDragOver = function () {
        if (this.dropFiles) {
            this.fileOver = true;
        }
    };
    NbChatFormComponent.prototype.onDragLeave = function () {
        if (this.dropFiles) {
            this.fileOver = false;
        }
    };
    NbChatFormComponent.prototype.sendMessage = function () {
        if (this.droppedFiles.length || String(this.message).trim().length) {
            this.send.emit({ message: this.message, files: this.droppedFiles });
            this.message = '';
            this.droppedFiles = [];
        }
    };
    NbChatFormComponent.prototype.setStatus = function (status) {
        if (this.status !== status) {
            this.status = status;
            this.cd.detectChanges();
        }
    };
    NbChatFormComponent.prototype.getInputStatus = function () {
        if (this.fileOver) {
            return this.status || 'primary';
        }
        if (this.inputFocus || this.inputHover) {
            return this.status;
        }
        return '';
    };
    __decorate$92([
        Input(),
        __metadata$59("design:type", String)
    ], NbChatFormComponent.prototype, "message", void 0);
    __decorate$92([
        Input(),
        __metadata$59("design:type", String)
    ], NbChatFormComponent.prototype, "buttonTitle", void 0);
    __decorate$92([
        Input(),
        __metadata$59("design:type", String)
    ], NbChatFormComponent.prototype, "buttonIcon", void 0);
    __decorate$92([
        Input(),
        __metadata$59("design:type", Boolean)
    ], NbChatFormComponent.prototype, "showButton", void 0);
    __decorate$92([
        Input(),
        __metadata$59("design:type", Boolean)
    ], NbChatFormComponent.prototype, "dropFiles", void 0);
    __decorate$92([
        Output(),
        __metadata$59("design:type", Object)
    ], NbChatFormComponent.prototype, "send", void 0);
    __decorate$92([
        HostBinding('class.file-over'),
        __metadata$59("design:type", Object)
    ], NbChatFormComponent.prototype, "fileOver", void 0);
    __decorate$92([
        HostListener('drop', ['$event']),
        __metadata$59("design:type", Function),
        __metadata$59("design:paramtypes", [Object]),
        __metadata$59("design:returntype", void 0)
    ], NbChatFormComponent.prototype, "onDrop", null);
    __decorate$92([
        HostListener('dragover'),
        __metadata$59("design:type", Function),
        __metadata$59("design:paramtypes", []),
        __metadata$59("design:returntype", void 0)
    ], NbChatFormComponent.prototype, "onDragOver", null);
    __decorate$92([
        HostListener('dragleave'),
        __metadata$59("design:type", Function),
        __metadata$59("design:paramtypes", []),
        __metadata$59("design:returntype", void 0)
    ], NbChatFormComponent.prototype, "onDragLeave", null);
    NbChatFormComponent = __decorate$92([
        Component({
            selector: 'nb-chat-form',
            template: "\n    <div class=\"dropped-files\" *ngIf=\"droppedFiles?.length\">\n      <ng-container *ngFor=\"let file of droppedFiles\">\n        <div *ngIf=\"file.urlStyle\" [style.background-image]=\"file.urlStyle\">\n          <span class=\"remove\" (click)=\"removeFile(file)\">&times;</span>\n        </div>\n\n        <div>\n          <nb-icon *ngIf=\"!file.urlStyle\" icon=\"file-text-outline\" pack=\"nebular-essentials\"></nb-icon>\n          <span class=\"remove\" (click)=\"removeFile(file)\">&times;</span>\n        </div>\n      </ng-container>\n    </div>\n    <div class=\"message-row\">\n      <input nbInput\n             fullWidth\n             [status]=\"getInputStatus()\"\n             (focus)=\"inputFocus = true\"\n             (blur)=\"inputFocus = false\"\n             (mouseenter)=\"inputHover = true\"\n             (mouseleave)=\"inputHover = false\"\n             [(ngModel)]=\"message\"\n             [class.with-button]=\"showButton\"\n             type=\"text\"\n             placeholder=\"{{ fileOver ? 'Drop file to send' : 'Type a message' }}\"\n             (keyup.enter)=\"sendMessage()\">\n      <button nbButton\n              [status]=\"status || 'primary'\"\n              *ngIf=\"showButton\"\n              [class.with-icon]=\"!buttonTitle\"\n              (click)=\"sendMessage()\"\n              class=\"send-button\">\n        <nb-icon *ngIf=\"!buttonTitle; else title\" [icon]=\"buttonIcon\" pack=\"nebular-essentials\"></nb-icon>\n        <ng-template #title>{{ buttonTitle }}</ng-template>\n      </button>\n    </div>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata$59("design:paramtypes", [ChangeDetectorRef, DomSanitizer])
    ], NbChatFormComponent);
    return NbChatFormComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$93 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$60 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Chat message component.
 *
 * Multiple message types are available through a `type` property, such as
 * - text - simple text message
 * - file - could be a file preview or a file icon
 * if multiple files are provided grouped files are shown
 * - quote - quotes a message with specific quote styles
 * - map - shows a google map picture by provided [latitude] and [longitude] properties
 *
 * @stacked-example(Available Types, chat/chat-message-types-showcase.component)
 *
 * Message with attached files:
 * ```html
 * <nb-chat-message
 *   type="file"
 *   [files]="[ { url: '...' } ]"
 *   message="Hello world!">
 * </nb-chat-message>
 * ```
 *
 * Map message:
 * ```html
 * <nb-chat-message
 *   type="map"
 *   [latitude]="53.914"
 *   [longitude]="27.59"
 *   message="Here I am">
 * </nb-chat-message>
 * ```
 *
 * @styles
 *
 * chat-message-background:
 * chat-message-text-color:
 * chat-message-reply-background-color:
 * chat-message-reply-text-color:
 * chat-message-avatar-background-color:
 * chat-message-sender-text-color:
 * chat-message-quote-background-color:
 * chat-message-quote-text-color:
 * chat-message-file-text-color:
 * chat-message-file-background-color:
 */
var NbChatMessageComponent = /** @class */ (function () {
    function NbChatMessageComponent(domSanitizer) {
        this.domSanitizer = domSanitizer;
        this._reply = false;
    }
    Object.defineProperty(NbChatMessageComponent.prototype, "flyInOut", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatMessageComponent.prototype, "notReply", {
        get: function () {
            return !this.reply;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatMessageComponent.prototype, "reply", {
        /**
         * Determines if a message is a reply
         */
        get: function () {
            return this._reply;
        },
        set: function (value) {
            this._reply = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatMessageComponent.prototype, "avatar", {
        /**
         * Message send avatar
         * @type {string}
         */
        set: function (value) {
            this.avatarStyle = value ? this.domSanitizer.bypassSecurityTrustStyle("url(" + value + ")") : null;
        },
        enumerable: true,
        configurable: true
    });
    NbChatMessageComponent.prototype.getInitials = function () {
        if (this.sender) {
            var names = this.sender.split(' ');
            return names.map(function (n) { return n.charAt(0); }).splice(0, 2).join('').toUpperCase();
        }
        return '';
    };
    __decorate$93([
        HostBinding('@flyInOut'),
        __metadata$60("design:type", Object),
        __metadata$60("design:paramtypes", [])
    ], NbChatMessageComponent.prototype, "flyInOut", null);
    __decorate$93([
        HostBinding('class.not-reply'),
        __metadata$60("design:type", Object),
        __metadata$60("design:paramtypes", [])
    ], NbChatMessageComponent.prototype, "notReply", null);
    __decorate$93([
        Input(),
        HostBinding('class.reply'),
        __metadata$60("design:type", Boolean),
        __metadata$60("design:paramtypes", [Boolean])
    ], NbChatMessageComponent.prototype, "reply", null);
    __decorate$93([
        Input(),
        __metadata$60("design:type", String)
    ], NbChatMessageComponent.prototype, "message", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", String)
    ], NbChatMessageComponent.prototype, "sender", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", Date)
    ], NbChatMessageComponent.prototype, "date", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", Array)
    ], NbChatMessageComponent.prototype, "files", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", String)
    ], NbChatMessageComponent.prototype, "quote", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", Number)
    ], NbChatMessageComponent.prototype, "latitude", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", Number)
    ], NbChatMessageComponent.prototype, "longitude", void 0);
    __decorate$93([
        Input(),
        __metadata$60("design:type", String),
        __metadata$60("design:paramtypes", [String])
    ], NbChatMessageComponent.prototype, "avatar", null);
    __decorate$93([
        Input(),
        __metadata$60("design:type", String)
    ], NbChatMessageComponent.prototype, "type", void 0);
    NbChatMessageComponent = __decorate$93([
        Component({
            selector: 'nb-chat-message',
            template: "\n    <div class=\"avatar\" [style.background-image]=\"avatarStyle\" *ngIf=\"!reply\">\n      <ng-container *ngIf=\"!avatarStyle\">\n        {{ getInitials() }}\n      </ng-container>\n    </div>\n    <div class=\"message\">\n      <ng-container [ngSwitch]=\"type\">\n\n        <nb-chat-message-file *ngSwitchCase=\"'file'\"\n                              [sender]=\"sender\" [date]=\"date\" [message]=\"message\" [files]=\"files\">\n        </nb-chat-message-file>\n\n        <nb-chat-message-quote *ngSwitchCase=\"'quote'\"\n                              [sender]=\"sender\" [date]=\"date\" [message]=\"message\" [quote]=\"quote\">\n        </nb-chat-message-quote>\n\n        <nb-chat-message-map *ngSwitchCase=\"'map'\"\n                              [sender]=\"sender\" [date]=\"date\"\n                              [message]=\"message\" [latitude]=\"latitude\" [longitude]=\"longitude\">\n        </nb-chat-message-map>\n\n        <nb-chat-message-text *ngSwitchDefault\n                              [sender]=\"sender\" [date]=\"date\" [message]=\"message\">\n        </nb-chat-message-text>\n      </ng-container>\n    </div>\n  ",
            animations: [
                trigger('flyInOut', [
                    state('in', style({ transform: 'translateX(0)' })),
                    transition('void => *', [
                        style({ transform: 'translateX(-100%)' }),
                        animate(80),
                    ]),
                    transition('* => void', [
                        animate(80, style({ transform: 'translateX(100%)' })),
                    ]),
                ]),
            ],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata$60("design:paramtypes", [DomSanitizer])
    ], NbChatMessageComponent);
    return NbChatMessageComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$91 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$58 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Conversational UI collection - a set of components for chat-like UI construction.
 *
 * Main features:
 * - different message types support (text, image, file, file group, map, etc)
 * - drag & drop for images and files with preview
 * - different UI styles
 * - custom action buttons (coming soon)
 *
 * Here's a complete example build in a bot-like app. Type `help` to be able to receive different message types.
 * Enjoy the conversation and the beautiful UI.
 * @stacked-example(Showcase, chat/chat-showcase.component)
 *
 * Basic chat configuration and usage:
 * ```ts
 * <nb-chat title="Nebular Conversational UI">
 *       <nb-chat-message *ngFor="let msg of messages"
 *                        [type]="msg.type"
 *                        [message]="msg.text"
 *                        [reply]="msg.reply"
 *                        [sender]="msg.user.name"
 *                        [date]="msg.date"
 *                        [files]="msg.files"
 *                        [quote]="msg.quote"
 *                        [latitude]="msg.latitude"
 *                        [longitude]="msg.longitude"
 *                        [avatar]="msg.user.avatar">
 *   </nb-chat-message>
 *
 *   <nb-chat-form (send)="sendMessage($event)" [dropFiles]="true">
 *   </nb-chat-form>
 * </nb-chat>
 * ```
 * ### Installation
 *
 * Import `NbChatModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbChatModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * If you need to provide an API key for a `map` message type (which is required by Google Maps)
 * you may use `NbChatModule.forRoot({ ... })` call if this is a global app configuration
 * or `NbChatModule.forChild({ ... })` for a feature module configuration:
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' }),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * There are three main components:
 * ```ts
 * <nb-chat>
 * </nb-chat> // chat container
 *
 * <nb-chat-form>
 * </nb-chat-form> // chat form with drag&drop files feature
 *
 * <nb-chat-message>
 * </nb-chat-message> // chat message, available multiple types
 * ```
 *
 * Two users conversation showcase:
 * @stacked-example(Conversation, chat/chat-conversation-showcase.component)
 *
 * Chat UI is also available in different colors by specifying a `[status]` input:
 *
 * @stacked-example(Colored Chat, chat/chat-colors.component)
 *
 * Also it is possible to configure sizes through `[size]` input:
 *
 * @stacked-example(Chat Sizes, chat/chat-sizes.component)
 *
 * @styles
 *
 * chat-background-color:
 * chat-border:
 * chat-border-radius:
 * chat-shadow:
 * chat-padding:
 * chart-scrollbar-color:
 * chart-scrollbar-background-color:
 * chart-scrollbar-width:
 * chat-text-color:
 * chat-text-font-family:
 * chat-text-font-size:
 * chat-text-font-weight:
 * chat-text-line-height:
 * chat-header-text-color:
 * chat-header-text-font-family:
 * chat-header-text-font-size:
 * chat-header-text-font-weight:
 * chat-header-text-line-height:
 * chat-tiny-height:
 * chat-small-height:
 * chat-medium-height:
 * chat-large-height:
 * chat-giant-height:
 * chat-primary-background-color:
 * chat-primary-text-color:
 * chat-success-background-color:
 * chat-success-text-color:
 * chat-info-background-color:
 * chat-info-text-color:
 * chat-warning-background-color:
 * chat-warning-text-color:
 * chat-danger-background-color:
 * chat-danger-text-color:
 * chat-divider-color:
 * chat-divider-style:
 * chat-divider-width:
 */
var NbChatComponent = /** @class */ (function () {
    function NbChatComponent() {
        this._scrollBottom = true;
    }
    Object.defineProperty(NbChatComponent.prototype, "scrollBottom", {
        /**
         * Scroll chat to the bottom of the list when a new message arrives
         */
        get: function () {
            return this._scrollBottom;
        },
        set: function (value) {
            this._scrollBottom = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbChatComponent.prototype.ngOnChanges = function (changes) {
        if ('status' in changes) {
            this.updateFormStatus();
        }
    };
    NbChatComponent.prototype.ngAfterContentInit = function () {
        this.updateFormStatus();
    };
    NbChatComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.messages.changes
            .subscribe(function (messages) {
            _this.messages = messages;
            _this.updateView();
        });
        this.updateView();
    };
    NbChatComponent.prototype.updateView = function () {
        if (this.scrollBottom) {
            this.scrollListBottom();
        }
    };
    NbChatComponent.prototype.scrollListBottom = function () {
        this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
    };
    NbChatComponent.prototype.updateFormStatus = function () {
        if (this.chatForm) {
            this.chatForm.setStatus(this.status);
        }
    };
    Object.defineProperty(NbChatComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbChatComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    __decorate$91([
        Input(),
        __metadata$58("design:type", String)
    ], NbChatComponent.prototype, "title", void 0);
    __decorate$91([
        Input(),
        __metadata$58("design:type", String)
    ], NbChatComponent.prototype, "size", void 0);
    __decorate$91([
        Input(),
        __metadata$58("design:type", String)
    ], NbChatComponent.prototype, "status", void 0);
    __decorate$91([
        Input(),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [Boolean])
    ], NbChatComponent.prototype, "scrollBottom", null);
    __decorate$91([
        ViewChild('scrollable', { static: false }),
        __metadata$58("design:type", ElementRef)
    ], NbChatComponent.prototype, "scrollable", void 0);
    __decorate$91([
        ContentChildren(NbChatMessageComponent),
        __metadata$58("design:type", QueryList)
    ], NbChatComponent.prototype, "messages", void 0);
    __decorate$91([
        ContentChild(NbChatFormComponent, { static: false }),
        __metadata$58("design:type", NbChatFormComponent)
    ], NbChatComponent.prototype, "chatForm", void 0);
    __decorate$91([
        HostBinding('class.size-tiny'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "tiny", null);
    __decorate$91([
        HostBinding('class.size-small'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "small", null);
    __decorate$91([
        HostBinding('class.size-medium'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "medium", null);
    __decorate$91([
        HostBinding('class.size-large'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "large", null);
    __decorate$91([
        HostBinding('class.size-giant'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "giant", null);
    __decorate$91([
        HostBinding('class.status-primary'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "primary", null);
    __decorate$91([
        HostBinding('class.status-success'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "success", null);
    __decorate$91([
        HostBinding('class.status-info'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "info", null);
    __decorate$91([
        HostBinding('class.status-warning'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "warning", null);
    __decorate$91([
        HostBinding('class.status-danger'),
        __metadata$58("design:type", Boolean),
        __metadata$58("design:paramtypes", [])
    ], NbChatComponent.prototype, "danger", null);
    NbChatComponent = __decorate$91([
        Component({
            selector: 'nb-chat',
            template: "\n    <div class=\"header\">{{ title }}</div>\n    <div class=\"scrollable\" #scrollable>\n      <div class=\"messages\">\n        <ng-content select=\"nb-chat-message\"></ng-content>\n        <p class=\"no-messages\" *ngIf=\"!messages?.length\">SSSSSSSSSSSSSSSS</p>\n      </div>\n    </div>\n    <div class=\"form\">\n      <ng-content select=\"nb-chat-form\"></ng-content>\n    </div>\n  ",
            styles: [":host{display:flex;flex-direction:column;position:relative;height:100%}\n"]
        })
    ], NbChatComponent);
    return NbChatComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbChatOptions = /** @class */ (function () {
    function NbChatOptions() {
    }
    return NbChatOptions;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$94 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$61 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Chat message component.
 */
var NbChatMessageMapComponent = /** @class */ (function () {
    function NbChatMessageMapComponent(options) {
        this.mapKey = options.messageGoogleMapKey;
    }
    Object.defineProperty(NbChatMessageMapComponent.prototype, "file", {
        get: function () {
            return {
                // tslint:disable-next-line:max-line-length
                url: "https://maps.googleapis.com/maps/api/staticmap?center=" + this.latitude + "," + this.longitude + "&zoom=12&size=400x400&key=" + this.mapKey,
                type: 'image/png',
                icon: 'location',
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate$94([
        Input(),
        __metadata$61("design:type", String)
    ], NbChatMessageMapComponent.prototype, "message", void 0);
    __decorate$94([
        Input(),
        __metadata$61("design:type", String)
    ], NbChatMessageMapComponent.prototype, "sender", void 0);
    __decorate$94([
        Input(),
        __metadata$61("design:type", Date)
    ], NbChatMessageMapComponent.prototype, "date", void 0);
    __decorate$94([
        Input(),
        __metadata$61("design:type", Number)
    ], NbChatMessageMapComponent.prototype, "latitude", void 0);
    __decorate$94([
        Input(),
        __metadata$61("design:type", Number)
    ], NbChatMessageMapComponent.prototype, "longitude", void 0);
    NbChatMessageMapComponent = __decorate$94([
        Component({
            selector: 'nb-chat-message-map',
            template: "\n    <nb-chat-message-file [files]=\"[file]\" [message]=\"message\" [sender]=\"sender\" [date]=\"date\"></nb-chat-message-file>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata$61("design:paramtypes", [NbChatOptions])
    ], NbChatMessageMapComponent);
    return NbChatMessageMapComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __assign$1 = (this && this.__assign) || function () {
    __assign$1 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$1.apply(this, arguments);
};
var __decorate$95 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$62 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Chat message component.
 */
var NbChatMessageFileComponent = /** @class */ (function () {
    function NbChatMessageFileComponent(cd, domSanitizer) {
        this.cd = cd;
        this.domSanitizer = domSanitizer;
    }
    Object.defineProperty(NbChatMessageFileComponent.prototype, "files", {
        /**
         * Message file path
         * @type {Date}
         */
        set: function (files) {
            var _this = this;
            this.readyFiles = (files || []).map(function (file) {
                var isImage = _this.isImage(file);
                return __assign$1({}, file, { urlStyle: isImage && _this.domSanitizer.bypassSecurityTrustStyle("url(" + file.url + ")"), isImage: isImage });
            });
            this.cd.detectChanges();
        },
        enumerable: true,
        configurable: true
    });
    NbChatMessageFileComponent.prototype.isImage = function (file) {
        return ['image/png', 'image/jpeg', 'image/gif'].includes(file.type);
    };
    __decorate$95([
        Input(),
        __metadata$62("design:type", String)
    ], NbChatMessageFileComponent.prototype, "message", void 0);
    __decorate$95([
        Input(),
        __metadata$62("design:type", String)
    ], NbChatMessageFileComponent.prototype, "sender", void 0);
    __decorate$95([
        Input(),
        __metadata$62("design:type", Date)
    ], NbChatMessageFileComponent.prototype, "date", void 0);
    __decorate$95([
        Input(),
        __metadata$62("design:type", Array),
        __metadata$62("design:paramtypes", [Array])
    ], NbChatMessageFileComponent.prototype, "files", null);
    NbChatMessageFileComponent = __decorate$95([
        Component({
            selector: 'nb-chat-message-file',
            template: "\n    <nb-chat-message-text [sender]=\"sender\" [date]=\"date\" [message]=\"message\">\n      {{ message }}\n    </nb-chat-message-text>\n\n    <ng-container *ngIf=\"readyFiles?.length > 1\">\n      <div class=\"message-content-group\">\n        <a *ngFor=\"let file of readyFiles\" [href]=\"file.url\" target=\"_blank\">\n          <nb-icon [icon]=\"file.icon\" *ngIf=\"!file.urlStyle && file.icon\"></nb-icon>\n          <div *ngIf=\"file.urlStyle\" [style.background-image]=\"file.urlStyle\"></div>\n        </a>\n      </div>\n    </ng-container>\n\n    <ng-container *ngIf=\"readyFiles?.length === 1\">\n      <a [href]=\"readyFiles[0].url\" target=\"_blank\">\n        <nb-icon [icon]=\"readyFiles[0].icon\" *ngIf=\"!readyFiles[0].urlStyle && readyFiles[0].icon\"></nb-icon>\n        <div *ngIf=\"readyFiles[0].urlStyle\" [style.background-image]=\"readyFiles[0].urlStyle\"></div>\n      </a>\n    </ng-container>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __metadata$62("design:paramtypes", [ChangeDetectorRef, DomSanitizer])
    ], NbChatMessageFileComponent);
    return NbChatMessageFileComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$96 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$63 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Chat message component.
 */
var NbChatMessageQuoteComponent = /** @class */ (function () {
    function NbChatMessageQuoteComponent() {
    }
    __decorate$96([
        Input(),
        __metadata$63("design:type", String)
    ], NbChatMessageQuoteComponent.prototype, "message", void 0);
    __decorate$96([
        Input(),
        __metadata$63("design:type", String)
    ], NbChatMessageQuoteComponent.prototype, "sender", void 0);
    __decorate$96([
        Input(),
        __metadata$63("design:type", Date)
    ], NbChatMessageQuoteComponent.prototype, "date", void 0);
    __decorate$96([
        Input(),
        __metadata$63("design:type", String)
    ], NbChatMessageQuoteComponent.prototype, "quote", void 0);
    NbChatMessageQuoteComponent = __decorate$96([
        Component({
            selector: 'nb-chat-message-quote',
            template: "\n    <p class=\"sender\" *ngIf=\"sender || date\">{{ sender }} <time>{{ date  | date:'shortTime' }}</time></p>\n    <p class=\"quote\">\n      {{ quote }}\n    </p>\n    <nb-chat-message-text [message]=\"message\">\n      {{ message }}\n    </nb-chat-message-text>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NbChatMessageQuoteComponent);
    return NbChatMessageQuoteComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$97 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$64 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Chat message component.
 */
var NbChatMessageTextComponent = /** @class */ (function () {
    function NbChatMessageTextComponent() {
    }
    __decorate$97([
        Input(),
        __metadata$64("design:type", String)
    ], NbChatMessageTextComponent.prototype, "sender", void 0);
    __decorate$97([
        Input(),
        __metadata$64("design:type", String)
    ], NbChatMessageTextComponent.prototype, "message", void 0);
    __decorate$97([
        Input(),
        __metadata$64("design:type", Date)
    ], NbChatMessageTextComponent.prototype, "date", void 0);
    NbChatMessageTextComponent = __decorate$97([
        Component({
            selector: 'nb-chat-message-text',
            template: "\n    <p class=\"sender\" *ngIf=\"sender || date\">{{ sender }} <time>{{ date  | date:'shortTime' }}</time></p>\n    <p class=\"text\" *ngIf=\"message\">{{ message }}</p>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NbChatMessageTextComponent);
    return NbChatMessageTextComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$100 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$65 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Basic input directive.
 *
 * ```html
 * <input nbInput></input>
 * ```
 *
 * ### Installation
 *
 * Import `NbInputModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbInputModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Default input size is `medium`:
 * @stacked-example(Showcase, input/input-showcase.component)
 *
 * Inputs are available in multiple colors using `status` property:
 * @stacked-example(Input Colors, input/input-colors.component)
 *
 * There are three input sizes:
 *
 * @stacked-example(Input Sizes, input/input-sizes.component)
 *
 * Inputs available in different shapes, which could be combined with the other properties:
 * @stacked-example(Input Shapes, input/input-shapes.component)
 *
 * `nbInput` could be applied to the following selectors - `input`, `textarea`:
 * @stacked-example(Input Elements, input/input-types.component)
 *
 * You can add `fullWidth` attribute to make element fill container:
 * @stacked-example(Full width inputs, input/input-full-width.component)
 *
 * Or you can bind control with form controls or ngModel:
 * @stacked-example(Input form binding, input/input-form.component)
 *
 * @styles
 *
 * input-background-color:
 * input-border-style:
 * input-border-width:
 * input-outline-color:
 * input-outline-width:
 * input-placeholder-text-color:
 * input-placeholder-text-font-family:
 * input-text-color:
 * input-text-font-family:
 * input-border-color:
 * input-focus-border-color:
 * input-hover-border-color:
 * input-disabled-border-color:
 * input-disabled-background-color:
 * input-disabled-text-color:
 * input-disabled-placeholder-text-color:
 * input-primary-border-color:
 * input-primary-focus-border-color:
 * input-primary-hover-border-color:
 * input-success-border-color:
 * input-success-focus-border-color:
 * input-success-hover-border-color:
 * input-info-border-color:
 * input-info-focus-border-color:
 * input-info-hover-border-color:
 * input-warning-border-color:
 * input-warning-focus-border-color:
 * input-warning-hover-border-color:
 * input-danger-border-color:
 * input-danger-focus-border-color:
 * input-danger-hover-border-color:
 * input-rectangle-border-radius:
 * input-semi-round-border-radius:
 * input-round-border-radius:
 * input-tiny-text-font-size:
 * input-tiny-text-font-weight:
 * input-tiny-text-line-height:
 * input-tiny-placeholder-text-font-size:
 * input-tiny-placeholder-text-font-weight:
 * input-tiny-placeholder-text-line-height:
 * input-tiny-padding:
 * input-tiny-max-width:
 * input-small-text-font-size:
 * input-small-text-font-weight:
 * input-small-text-line-height:
 * input-small-placeholder-text-font-size:
 * input-small-placeholder-text-font-weight:
 * input-small-placeholder-text-line-height:
 * input-small-padding:
 * input-small-max-width:
 * input-medium-text-font-size:
 * input-medium-text-font-weight:
 * input-medium-text-line-height:
 * input-medium-placeholder-text-font-size:
 * input-medium-placeholder-text-font-weight:
 * input-medium-placeholder-text-line-height:
 * input-medium-padding:
 * input-medium-max-width:
 * input-large-text-font-size:
 * input-large-text-font-weight:
 * input-large-text-line-height:
 * input-large-placeholder-text-font-size:
 * input-large-placeholder-text-font-weight:
 * input-large-placeholder-text-line-height:
 * input-large-padding:
 * input-large-max-width:
 * input-giant-text-font-size:
 * input-giant-text-font-weight:
 * input-giant-text-line-height:
 * input-giant-placeholder-text-font-size:
 * input-giant-placeholder-text-font-weight:
 * input-giant-placeholder-text-line-height:
 * input-giant-padding:
 * input-giant-max-width:
 */
var NbInputDirective = /** @class */ (function () {
    function NbInputDirective() {
        /**
         * Field size modifications. Possible values: `small`, `medium` (default), `large`.
         */
        this.fieldSize = 'medium';
        /**
         * Field status (adds specific styles):
         * `primary`, `info`, `success`, `warning`, `danger`
         */
        this.status = '';
        /**
         * Field shapes modifications. Possible values: `rectangle` (default), `round`, `semi-round`.
         */
        this.shape = 'rectangle';
        this._fullWidth = false;
    }
    Object.defineProperty(NbInputDirective.prototype, "fullWidth", {
        /**
         * If set element will fill container. `false` by default.
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
    Object.defineProperty(NbInputDirective.prototype, "tiny", {
        get: function () {
            return this.fieldSize === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "small", {
        get: function () {
            return this.fieldSize === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "medium", {
        get: function () {
            return this.fieldSize === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "large", {
        get: function () {
            return this.fieldSize === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "giant", {
        get: function () {
            return this.fieldSize === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "rectangle", {
        get: function () {
            return this.shape === 'rectangle';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "semiRound", {
        get: function () {
            return this.shape === 'semi-round';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInputDirective.prototype, "round", {
        get: function () {
            return this.shape === 'round';
        },
        enumerable: true,
        configurable: true
    });
    __decorate$100([
        Input(),
        __metadata$65("design:type", String)
    ], NbInputDirective.prototype, "fieldSize", void 0);
    __decorate$100([
        Input(),
        __metadata$65("design:type", String)
    ], NbInputDirective.prototype, "status", void 0);
    __decorate$100([
        Input(),
        __metadata$65("design:type", String)
    ], NbInputDirective.prototype, "shape", void 0);
    __decorate$100([
        Input(),
        HostBinding('class.input-full-width'),
        __metadata$65("design:type", Boolean),
        __metadata$65("design:paramtypes", [Boolean])
    ], NbInputDirective.prototype, "fullWidth", null);
    __decorate$100([
        HostBinding('class.size-tiny'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "tiny", null);
    __decorate$100([
        HostBinding('class.size-small'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "small", null);
    __decorate$100([
        HostBinding('class.size-medium'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "medium", null);
    __decorate$100([
        HostBinding('class.size-large'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "large", null);
    __decorate$100([
        HostBinding('class.size-giant'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "giant", null);
    __decorate$100([
        HostBinding('class.status-primary'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "primary", null);
    __decorate$100([
        HostBinding('class.status-info'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "info", null);
    __decorate$100([
        HostBinding('class.status-success'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "success", null);
    __decorate$100([
        HostBinding('class.status-warning'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "warning", null);
    __decorate$100([
        HostBinding('class.status-danger'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "danger", null);
    __decorate$100([
        HostBinding('class.shape-rectangle'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "rectangle", null);
    __decorate$100([
        HostBinding('class.shape-semi-round'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "semiRound", null);
    __decorate$100([
        HostBinding('class.shape-round'),
        __metadata$65("design:type", Object),
        __metadata$65("design:paramtypes", [])
    ], NbInputDirective.prototype, "round", null);
    NbInputDirective = __decorate$100([
        Directive({
            selector: 'input[nbInput],textarea[nbInput]',
        })
    ], NbInputDirective);
    return NbInputDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$99 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_INPUT_COMPONENTS = [
    NbInputDirective,
];
var NbInputModule = /** @class */ (function () {
    function NbInputModule() {
    }
    NbInputModule = __decorate$99([
        NgModule({
            imports: [NbSharedModule],
            declarations: NB_INPUT_COMPONENTS,
            exports: NB_INPUT_COMPONENTS,
        })
    ], NbInputModule);
    return NbInputModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$98 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_CHAT_COMPONENTS = [
    NbChatComponent,
    NbChatMessageComponent,
    NbChatFormComponent,
    NbChatMessageTextComponent,
    NbChatMessageFileComponent,
    NbChatMessageQuoteComponent,
    NbChatMessageMapComponent,
];
var NbChatModule = /** @class */ (function () {
    function NbChatModule() {
    }
    NbChatModule_1 = NbChatModule;
    NbChatModule.forRoot = function (options) {
        return {
            ngModule: NbChatModule_1,
            providers: [
                { provide: NbChatOptions, useValue: options || {} },
            ],
        };
    };
    NbChatModule.forChild = function (options) {
        return {
            ngModule: NbChatModule_1,
            providers: [
                { provide: NbChatOptions, useValue: options || {} },
            ],
        };
    };
    var NbChatModule_1;
    NbChatModule = NbChatModule_1 = __decorate$98([
        NgModule({
            imports: [
                NbSharedModule,
                NbIconModule,
                NbInputModule,
                NbButtonModule,
            ],
            declarations: NB_CHAT_COMPONENTS.slice(),
            exports: NB_CHAT_COMPONENTS.slice(),
        })
    ], NbChatModule);
    return NbChatModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$101 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$66 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Styled spinner component
 *
 * @styles
 *
 * spinner-background-color:
 * spinner-circle-filled-color:
 * spinner-circle-empty-color:
 * spinner-text-color:
 * spinner-text-font-family:
 * spinner-text-font-size:
 * spinner-text-font-weight:
 * spinner-text-line-height:
 * spinner-primary-circle-filled-color:
 * spinner-primary-circle-empty-color:
 * spinner-info-circle-filled-color:
 * spinner-info-circle-empty-color:
 * spinner-success-circle-filled-color:
 * spinner-success-circle-empty-color:
 * spinner-warning-circle-filled-color:
 * spinner-warning-circle-empty-color:
 * spinner-danger-circle-filled-color:
 * spinner-danger-circle-empty-color:
 * spinner-height-tiny:
 * spinner-height-small:
 * spinner-height-medium:
 * spinner-height-large:
 * spinner-height-giant:
 */
var NbSpinnerComponent = /** @class */ (function () {
    function NbSpinnerComponent() {
        /**
         * Loading text that is shown near the icon
         * @type string
         */
        this.message = 'Loading...';
        /**
         * Spinner size, available sizes:
         * tiny, small, medium, large, giant
         * @param {string} value
         */
        this.size = 'medium';
    }
    Object.defineProperty(NbSpinnerComponent.prototype, "tiny", {
        get: function () {
            return this.size === 'tiny';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "small", {
        get: function () {
            return this.size === 'small';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "medium", {
        get: function () {
            return this.size === 'medium';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "large", {
        get: function () {
            return this.size === 'large';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "giant", {
        get: function () {
            return this.size === 'giant';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "primary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "info", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "success", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "warning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbSpinnerComponent.prototype, "danger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    __decorate$101([
        Input(),
        __metadata$66("design:type", String)
    ], NbSpinnerComponent.prototype, "message", void 0);
    __decorate$101([
        Input(),
        __metadata$66("design:type", String)
    ], NbSpinnerComponent.prototype, "size", void 0);
    __decorate$101([
        Input(),
        __metadata$66("design:type", String)
    ], NbSpinnerComponent.prototype, "status", void 0);
    __decorate$101([
        HostBinding('class.size-tiny'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "tiny", null);
    __decorate$101([
        HostBinding('class.size-small'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "small", null);
    __decorate$101([
        HostBinding('class.size-medium'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "medium", null);
    __decorate$101([
        HostBinding('class.size-large'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "large", null);
    __decorate$101([
        HostBinding('class.size-giant'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "giant", null);
    __decorate$101([
        HostBinding('class.status-primary'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "primary", null);
    __decorate$101([
        HostBinding('class.status-info'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "info", null);
    __decorate$101([
        HostBinding('class.status-success'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "success", null);
    __decorate$101([
        HostBinding('class.status-warning'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "warning", null);
    __decorate$101([
        HostBinding('class.status-danger'),
        __metadata$66("design:type", Object),
        __metadata$66("design:paramtypes", [])
    ], NbSpinnerComponent.prototype, "danger", null);
    NbSpinnerComponent = __decorate$101([
        Component({
            selector: 'nb-spinner',
            template: "\n    <span class=\"spin-circle\"></span>\n    <span class=\"message\" *ngIf=\"message\">{{ message }}</span>\n  ",
            styles: [":host{opacity:1;position:absolute;border-radius:inherit;top:0;right:0;left:0;bottom:0;overflow:hidden;z-index:9999;display:flex;justify-content:center;align-items:center;visibility:visible}:host .spin-circle{animation:spin 0.8s infinite linear;border-radius:50%;border-style:solid;border-width:0.125em;width:1em;height:1em}:host .message{margin-left:0.5rem}\n"]
        })
    ], NbSpinnerComponent);
    return NbSpinnerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$102 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$67 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Styled spinner directive
 *
 * @stacked-example(Spinner Showcase, spinner/spinner-card.component)
 *
 *
 * ```ts
 * <nb-card [nbSpinner]="loading" nbSpinnerStatus="danger">
 *   <nb-card-body>Card Content</nb-card-body>
 * </nb-card>
 * ```
 *
 * ### Installation
 *
 * Import `NbSpinnerModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbSpinnerModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * Could be colored using `status` property
 *
 * @stacked-example(Spinner Colors, spinner/spinner-colors.component)
 *
 * Available in different sizes with `size` property:
 *
 * @stacked-example(Spinner Sizes, spinner/spinner-sizes.component)
 *
 * It is also possible to place it into the button:
 * @stacked-example(Buttons with spinner, spinner/spinner-button.component)
 *
 * Or tabs:
 * @stacked-example(Spinner in tabs, spinner/spinner-tabs.component)
 */
var NbSpinnerDirective = /** @class */ (function () {
    function NbSpinnerDirective(directiveView, componentFactoryResolver, renderer, directiveElement) {
        this.directiveView = directiveView;
        this.componentFactoryResolver = componentFactoryResolver;
        this.renderer = renderer;
        this.directiveElement = directiveElement;
        this.shouldShow = false;
        /**
         * Spinner size. Possible values: `tiny`, `small`, `medium` (default), `large`, `giant`
         */
        this.spinnerSize = 'medium';
        this.isSpinnerExist = false;
    }
    Object.defineProperty(NbSpinnerDirective.prototype, "nbSpinner", {
        /**
         * Directive value - show or hide spinner
         * @param {boolean} val
         */
        set: function (val) {
            if (this.componentFactory) {
                if (val) {
                    this.show();
                }
                else {
                    this.hide();
                }
            }
            else {
                this.shouldShow = val;
            }
        },
        enumerable: true,
        configurable: true
    });
    NbSpinnerDirective.prototype.ngOnInit = function () {
        this.componentFactory = this.componentFactoryResolver.resolveComponentFactory(NbSpinnerComponent);
        if (this.shouldShow) {
            this.show();
        }
    };
    NbSpinnerDirective.prototype.hide = function () {
        if (this.isSpinnerExist) {
            this.directiveView.remove();
            this.isSpinnerExist = false;
        }
    };
    NbSpinnerDirective.prototype.show = function () {
        if (!this.isSpinnerExist) {
            this.spinner = this.directiveView.createComponent(this.componentFactory);
            this.setInstanceInputs(this.spinner.instance);
            this.spinner.changeDetectorRef.detectChanges();
            this.renderer.appendChild(this.directiveElement.nativeElement, this.spinner.location.nativeElement);
            this.isSpinnerExist = true;
        }
    };
    NbSpinnerDirective.prototype.setInstanceInputs = function (instance) {
        instance.message = this.spinnerMessage;
        typeof this.spinnerStatus !== 'undefined' && (instance.status = this.spinnerStatus);
        typeof this.spinnerSize !== 'undefined' && (instance.size = this.spinnerSize);
    };
    __decorate$102([
        Input('nbSpinnerMessage'),
        __metadata$67("design:type", String)
    ], NbSpinnerDirective.prototype, "spinnerMessage", void 0);
    __decorate$102([
        Input('nbSpinnerStatus'),
        __metadata$67("design:type", String)
    ], NbSpinnerDirective.prototype, "spinnerStatus", void 0);
    __decorate$102([
        Input('nbSpinnerSize'),
        __metadata$67("design:type", String)
    ], NbSpinnerDirective.prototype, "spinnerSize", void 0);
    __decorate$102([
        Input('nbSpinner'),
        __metadata$67("design:type", Boolean),
        __metadata$67("design:paramtypes", [Boolean])
    ], NbSpinnerDirective.prototype, "nbSpinner", null);
    __decorate$102([
        HostBinding('class.nb-spinner-container'),
        __metadata$67("design:type", Object)
    ], NbSpinnerDirective.prototype, "isSpinnerExist", void 0);
    NbSpinnerDirective = __decorate$102([
        Directive({ selector: '[nbSpinner]' }),
        __metadata$67("design:paramtypes", [ViewContainerRef,
            ComponentFactoryResolver,
            Renderer2,
            ElementRef])
    ], NbSpinnerDirective);
    return NbSpinnerDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$103 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbSpinnerModule = /** @class */ (function () {
    function NbSpinnerModule() {
    }
    NbSpinnerModule = __decorate$103([
        NgModule({
            imports: [
                NbSharedModule,
            ],
            exports: [NbSpinnerComponent, NbSpinnerDirective],
            declarations: [NbSpinnerComponent, NbSpinnerDirective],
            entryComponents: [NbSpinnerComponent],
        })
    ], NbSpinnerModule);
    return NbSpinnerModule;
}());

var NB_STEPPER = new InjectionToken('Nebular Stepper Component');

var __decorate$105 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$69 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$12 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Component intended to be used within  the `<nb-stepper>` component.
 * Container for a step
 */
var NbStepComponent = /** @class */ (function () {
    function NbStepComponent(stepper) {
        this._completed = false;
        this.interacted = false;
        this.stepper = stepper;
    }
    Object.defineProperty(NbStepComponent.prototype, "isLabelTemplate", {
        /**
         * Check that label is a TemplateRef.
         *
         * @return boolean
         * */
        get: function () {
            return this.label instanceof TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepComponent.prototype, "completed", {
        /**
         * Whether step is marked as completed.
         *
         * @type {boolean}
         */
        get: function () {
            return this._completed || this.isCompleted;
        },
        set: function (value) {
            this._completed = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepComponent.prototype, "isCompleted", {
        get: function () {
            return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Mark step as selected
     * */
    NbStepComponent.prototype.select = function () {
        this.stepper.selected = this;
    };
    /**
     * Reset step and stepControl state
     * */
    NbStepComponent.prototype.reset = function () {
        this.interacted = false;
        if (this.stepControl) {
            this.stepControl.reset();
        }
    };
    __decorate$105([
        ViewChild(TemplateRef, { static: true }),
        __metadata$69("design:type", TemplateRef)
    ], NbStepComponent.prototype, "content", void 0);
    __decorate$105([
        Input(),
        __metadata$69("design:type", AbstractControl)
    ], NbStepComponent.prototype, "stepControl", void 0);
    __decorate$105([
        Input(),
        __metadata$69("design:type", Object)
    ], NbStepComponent.prototype, "label", void 0);
    __decorate$105([
        Input(),
        __metadata$69("design:type", Boolean)
    ], NbStepComponent.prototype, "hidden", void 0);
    __decorate$105([
        Input(),
        __metadata$69("design:type", Boolean),
        __metadata$69("design:paramtypes", [Boolean])
    ], NbStepComponent.prototype, "completed", null);
    NbStepComponent = __decorate$105([
        Component({
            selector: 'nb-step',
            template: "\n    <ng-template>\n      <ng-content></ng-content>\n    </ng-template>\n  "
        }),
        __param$12(0, Inject(NB_STEPPER)),
        __metadata$69("design:paramtypes", [Object])
    ], NbStepComponent);
    return NbStepComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$104 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$68 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Stepper component
 *
 * @stacked-example(Showcase, stepper/stepper-showcase.component)
 *
 * ### Installation
 *
 * Import `NbStepperModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbStepperModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If step label is string you can pass it as `label` attribute. Otherwise ng-template should be used:
 * ```html
 * // ...
 * <nb-stepper orientation="horizontal">
 *   <nb-step label="step number one">
 *       // ... step content here
 *   </nb-step>
 *   <nb-step label="stepLabel">
 *       <ng-template #stepLabel>
 *           <div>
 *               step number two
 *           </div>
 *       </ng-template>
 *       // ... step content here
 *   </nb-step>
 * </nb-stepper>
 * ```
 *
 * When linear mode enabled user can't move forward unless current step is complete.
 * @stacked-example(Linear, stepper/stepper-linear.component)
 *
 * Specify `[stepControl]="form"` and stepper allow go to the next step only if form is valid.
 * You can disable it via `linear` mode setting.
 * ```html
 * // ...
 * <nb-stepper  orientation="horizontal">
 *   <nb-step label="step number one" [stepControl]="form">
 *     <form [formGroup]="form">
 *       // ...
 *     </form>
 *   </nb-step>
 *    // ...
 * </nb-stepper>
 * ```
 *
 * @stacked-example(Validation, stepper/stepper-validation.component)
 *
 * Stepper component has two layout options - `vertical` & `horizontal`
 * @stacked-example(Vertical, stepper/stepper-vertical.component)
 *
 * `disableStepNavigation` disables navigation by clicking on steps, so user can navigate only using
 * 'nbStepperPrevious' and 'nbStepperNext' buttons.
 * @stacked-example(Disabled steps navigation, stepper/stepper-disabled-step-nav.component)
 *
 * @styles
 *
 * stepper-step-text-color:
 * stepper-step-text-font-family:
 * stepper-step-text-font-size:
 * stepper-step-text-font-weight:
 * stepper-step-text-line-height:
 * stepper-step-active-text-color:
 * stepper-step-completed-text-color:
 * stepper-step-index-border-color:
 * stepper-step-index-border-style:
 * stepper-step-index-border-width:
 * stepper-step-index-border-radius:
 * stepper-step-index-width:
 * stepper-step-index-active-border-color:
 * stepper-step-index-completed-background-color:
 * stepper-step-index-completed-border-color:
 * stepper-step-index-completed-text-color:
 * stepper-connector-background-color:
 * stepper-connector-completed-background-color:
 * stepper-horizontal-connector-margin:
 * stepper-vertical-connector-margin:
 * stepper-step-content-padding:
 */
var NbStepperComponent = /** @class */ (function () {
    function NbStepperComponent() {
        this._selectedIndex = 0;
        this._disableStepNavigation = false;
        /**
         * Stepper orientation - `horizontal`|`vertical`
         */
        this.orientation = 'horizontal';
        this._linear = true;
    }
    NbStepperComponent_1 = NbStepperComponent;
    Object.defineProperty(NbStepperComponent.prototype, "selectedIndex", {
        /**
         * Selected step index
         */
        get: function () {
            return this._selectedIndex;
        },
        set: function (index) {
            if (!this.steps) {
                this._selectedIndex = index;
                return;
            }
            this.markCurrentStepInteracted();
            if (this.canBeSelected(index)) {
                this._selectedIndex = index;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "disableStepNavigation", {
        get: function () {
            return this._disableStepNavigation;
        },
        /**
         * Disables navigation by clicking on steps. False by default
         * @param {boolean} value
         */
        set: function (value) {
            this._disableStepNavigation = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "selected", {
        /**
         * Selected step component
         */
        get: function () {
            return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
        },
        set: function (step) {
            if (!this.steps) {
                return;
            }
            this.selectedIndex = this.steps.toArray().indexOf(step);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "linear", {
        get: function () {
            return this._linear;
        },
        /**
         * Allow moving forward only if the current step is complete
         * @default true
         */
        set: function (value) {
            this._linear = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "vertical", {
        get: function () {
            return this.orientation === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbStepperComponent.prototype, "horizontal", {
        get: function () {
            return this.orientation === 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Navigate to next step
     * */
    NbStepperComponent.prototype.next = function () {
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.steps.length - 1);
    };
    /**
     * Navigate to previous step
     * */
    NbStepperComponent.prototype.previous = function () {
        this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
    };
    /**
     * Reset stepper and stepControls to initial state
     * */
    NbStepperComponent.prototype.reset = function () {
        this._selectedIndex = 0;
        this.steps.forEach(function (step) { return step.reset(); });
    };
    NbStepperComponent.prototype.isStepSelected = function (step) {
        return this.selected === step;
    };
    NbStepperComponent.prototype.isStepValid = function (index) {
        return this.steps.toArray()[index].completed;
    };
    NbStepperComponent.prototype.canBeSelected = function (indexToCheck) {
        var noSteps = !this.steps || this.steps.length === 0;
        if (noSteps || indexToCheck < 0 || indexToCheck >= this.steps.length) {
            return false;
        }
        if (indexToCheck <= this.selectedIndex || !this.linear) {
            return true;
        }
        var isAllStepsValid = true;
        for (var i = this.selectedIndex; i < indexToCheck; i++) {
            if (!this.isStepValid(i)) {
                isAllStepsValid = false;
                break;
            }
        }
        return isAllStepsValid;
    };
    NbStepperComponent.prototype.markCurrentStepInteracted = function () {
        if (this.selected) {
            this.selected.interacted = true;
        }
    };
    var NbStepperComponent_1;
    __decorate$104([
        Input(),
        __metadata$68("design:type", Number),
        __metadata$68("design:paramtypes", [Number])
    ], NbStepperComponent.prototype, "selectedIndex", null);
    __decorate$104([
        Input(),
        __metadata$68("design:type", Boolean),
        __metadata$68("design:paramtypes", [Boolean])
    ], NbStepperComponent.prototype, "disableStepNavigation", null);
    __decorate$104([
        Input(),
        __metadata$68("design:type", NbStepComponent),
        __metadata$68("design:paramtypes", [NbStepComponent])
    ], NbStepperComponent.prototype, "selected", null);
    __decorate$104([
        Input(),
        __metadata$68("design:type", String)
    ], NbStepperComponent.prototype, "orientation", void 0);
    __decorate$104([
        Input(),
        __metadata$68("design:type", Boolean),
        __metadata$68("design:paramtypes", [Boolean])
    ], NbStepperComponent.prototype, "linear", null);
    __decorate$104([
        HostBinding('class.vertical'),
        __metadata$68("design:type", Object),
        __metadata$68("design:paramtypes", [])
    ], NbStepperComponent.prototype, "vertical", null);
    __decorate$104([
        HostBinding('class.horizontal'),
        __metadata$68("design:type", Object),
        __metadata$68("design:paramtypes", [])
    ], NbStepperComponent.prototype, "horizontal", null);
    __decorate$104([
        ContentChildren(NbStepComponent),
        __metadata$68("design:type", QueryList)
    ], NbStepperComponent.prototype, "steps", void 0);
    NbStepperComponent = NbStepperComponent_1 = __decorate$104([
        Component({
            selector: 'nb-stepper',
            template: "<ng-template><ng-content select=\"nb-step\"></ng-content></ng-template>\n<div class=\"header\">\n  <ng-container *ngFor=\"let step of steps; let index = index; let first = first\">\n\n    <div *ngIf=\"!first && !step.hidden\"\n         [class.connector-past]=\"index <= selectedIndex\"\n         class=\"connector\"></div>\n\n    <div *ngIf=\"!step.hidden\" class=\"step\"\n         [class.selected]=\"isStepSelected(step)\"\n         [class.completed]=\"!isStepSelected(step) && step.completed\"\n         [class.noninteractive]=\"disableStepNavigation\"\n         (click)=\"!disableStepNavigation && step.select()\">\n      <div class=\"label-index\">\n        <span *ngIf=\"!step.completed || isStepSelected(step)\">{{ index + 1 }}</span>\n        <nb-icon *ngIf=\"!isStepSelected(step) && step.completed\" icon=\"checkmark-outline\" pack=\"nebular-essentials\">\n        </nb-icon>\n      </div>\n      <div class=\"label\">\n        <ng-container *ngIf=\"step.isLabelTemplate\">\n          <ng-container *ngTemplateOutlet=\"step.label\"></ng-container>\n        </ng-container>\n        <span *ngIf=\"!step.isLabelTemplate\">{{ step.label }}</span>\n      </div>\n    </div>\n  </ng-container>\n</div>\n<div class=\"step-content\">\n  <ng-container [ngTemplateOutlet]=\"selected?.content\"></ng-container>\n</div>\n",
            providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent_1 }],
            styles: [":host(.horizontal) .header .step{flex-direction:column}:host(.horizontal) .header .connector{height:2px}:host(.horizontal) .label-index{margin-bottom:10px}:host(.vertical){display:flex;height:100%}:host(.vertical) .header{flex-direction:column}:host(.vertical) .header .label{margin:0 10px}:host(.vertical) .header .connector{width:2px}.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px}.header .connector{flex:auto}.header .step{display:flex;align-items:center;cursor:pointer}.header .step.noninteractive{cursor:default}.header .label-index{display:flex;justify-content:center;align-items:center}.header .label{width:max-content}\n"]
        })
    ], NbStepperComponent);
    return NbStepperComponent;
}());

var __decorate$106 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$70 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbStepperNextDirective = /** @class */ (function () {
    function NbStepperNextDirective(stepper) {
        this.stepper = stepper;
        this.type = 'submit';
    }
    NbStepperNextDirective.prototype.onClick = function () {
        this.stepper.next();
    };
    __decorate$106([
        Input(), HostBinding('attr.type'),
        __metadata$70("design:type", String)
    ], NbStepperNextDirective.prototype, "type", void 0);
    __decorate$106([
        HostListener('click'),
        __metadata$70("design:type", Function),
        __metadata$70("design:paramtypes", []),
        __metadata$70("design:returntype", void 0)
    ], NbStepperNextDirective.prototype, "onClick", null);
    NbStepperNextDirective = __decorate$106([
        Directive({
            selector: 'button[nbStepperNext]',
        }),
        __metadata$70("design:paramtypes", [NbStepperComponent])
    ], NbStepperNextDirective);
    return NbStepperNextDirective;
}());
var NbStepperPreviousDirective = /** @class */ (function () {
    function NbStepperPreviousDirective(stepper) {
        this.stepper = stepper;
        this.type = 'button';
    }
    NbStepperPreviousDirective.prototype.onClick = function () {
        this.stepper.previous();
    };
    __decorate$106([
        Input(), HostBinding('attr.type'),
        __metadata$70("design:type", String)
    ], NbStepperPreviousDirective.prototype, "type", void 0);
    __decorate$106([
        HostListener('click'),
        __metadata$70("design:type", Function),
        __metadata$70("design:paramtypes", []),
        __metadata$70("design:returntype", void 0)
    ], NbStepperPreviousDirective.prototype, "onClick", null);
    NbStepperPreviousDirective = __decorate$106([
        Directive({
            selector: 'button[nbStepperPrevious]',
        }),
        __metadata$70("design:paramtypes", [NbStepperComponent])
    ], NbStepperPreviousDirective);
    return NbStepperPreviousDirective;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$107 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbStepperModule = /** @class */ (function () {
    function NbStepperModule() {
    }
    NbStepperModule = __decorate$107([
        NgModule({
            imports: [
                NbSharedModule,
                NbIconModule,
            ],
            declarations: [
                NbStepperComponent,
                NbStepComponent,
                NbStepperNextDirective,
                NbStepperPreviousDirective,
            ],
            exports: [
                NbStepperComponent,
                NbStepComponent,
                NbStepperNextDirective,
                NbStepperPreviousDirective,
            ],
        })
    ], NbStepperModule);
    return NbStepperModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$108 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$71 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * An accordion allows to toggle the display of sections of content
 *
 * Basic example
 * @stacked-example(Showcase, accordion/accordion-showcase.component)
 *
 * ```ts
 * <nb-accordion>
 *  <nb-accordion-item>
 *   <nb-accordion-item-header>Product Details</nb-accordion-item-header>
 *   <nb-accordion-item-body>
 *     Item Content
 *   </nb-accordion-item-body>
 *  </nb-accordion-item>
 * </nb-accordion>
 * ```
 * ### Installation
 *
 * Import `NbAccordionModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbAccordionModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * With `multi` mode accordion can have multiple items expanded:
 * @stacked-example(Multiple expanded items, accordion/accordion-multi.component)
 *
 * `NbAccordionItemComponent` has several methods, for example it is possible to trigger item click/toggle:
 * @stacked-example(Expand API, accordion/accordion-toggle.component)
 *
 * @styles
 *
 * accordion-border-radius:
 * accordion-padding:
 * accordion-shadow:
 * accordion-header-text-color:
 * accordion-header-text-font-family:
 * accordion-header-text-font-size:
 * accordion-header-text-font-weight:
 * accordion-header-text-line-height:
 * accordion-header-disabled-text-color:
 * accordion-header-border-color:
 * accordion-header-border-style:
 * accordion-header-border-width:
 * accordion-item-background-color:
 * accordion-item-text-color:
 * accordion-item-text-font-family:
 * accordion-item-text-font-size:
 * accordion-item-text-font-weight:
 * accordion-item-text-line-height:
 */
var NbAccordionComponent = /** @class */ (function () {
    function NbAccordionComponent() {
        this.openCloseItems = new Subject();
        this.multiValue = false;
    }
    Object.defineProperty(NbAccordionComponent.prototype, "multi", {
        /**
         *  Allow multiple items to be expanded at the same time.
         * @type {boolean}
         */
        get: function () {
            return this.multiValue;
        },
        set: function (val) {
            this.multiValue = convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Opens all enabled accordion items.
     */
    NbAccordionComponent.prototype.openAll = function () {
        if (this.multi) {
            this.openCloseItems.next(false);
        }
    };
    /**
     * Closes all enabled accordion items.
     */
    NbAccordionComponent.prototype.closeAll = function () {
        this.openCloseItems.next(true);
    };
    __decorate$108([
        Input('multi'),
        __metadata$71("design:type", Boolean),
        __metadata$71("design:paramtypes", [Boolean])
    ], NbAccordionComponent.prototype, "multi", null);
    NbAccordionComponent = __decorate$108([
        Component({
            selector: 'nb-accordion',
            template: "\n    <ng-content select=\"nb-accordion-item\"></ng-content>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NbAccordionComponent);
    return NbAccordionComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$109 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$72 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$13 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Component intended to be used within `<nb-accordion>` component
 */
var NbAccordionItemComponent = /** @class */ (function () {
    function NbAccordionItemComponent(accordion, cd) {
        this.accordion = accordion;
        this.cd = cd;
        /**
         * Emits whenever the expanded state of the accordion changes.
         * Primarily used to facilitate two-way binding.
         */
        this.collapsedChange = new EventEmitter();
        this.accordionItemInvalidate = new Subject();
        this.collapsedValue = true;
        this.disabledValue = false;
        this.alive = true;
    }
    Object.defineProperty(NbAccordionItemComponent.prototype, "collapsed", {
        /**
         * Item is collapse (`true` by default)
         * @type {boolean}
         */
        get: function () {
            return this.collapsedValue;
        },
        set: function (val) {
            this.collapsedValue = convertToBoolProperty(val);
            this.collapsedChange.emit(this.collapsedValue);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAccordionItemComponent.prototype, "expanded", {
        /**
         * Item is expanded (`false` by default)
         * @type {boolean}
         */
        get: function () {
            return !this.collapsed;
        },
        set: function (val) {
            this.collapsedValue = !convertToBoolProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAccordionItemComponent.prototype, "disabled", {
        /**
         * Item is disabled and cannot be opened.
         * @type {boolean}
         */
        get: function () {
            return this.disabledValue;
        },
        set: function (val) {
            this.disabledValue = convertToBoolProperty(val);
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Open/close the item
     */
    NbAccordionItemComponent.prototype.toggle = function () {
        if (!this.disabled) {
            // we need this temporary variable as `openCloseItems.next` will change current value we need to save
            var willSet = !this.collapsed;
            if (!this.accordion.multi) {
                this.accordion.openCloseItems.next(true);
            }
            this.collapsed = willSet;
        }
    };
    /**
     * Open the item.
     */
    NbAccordionItemComponent.prototype.open = function () {
        !this.disabled && (this.collapsed = false);
    };
    /**
     * Collapse the item.
     */
    NbAccordionItemComponent.prototype.close = function () {
        !this.disabled && (this.collapsed = true);
    };
    NbAccordionItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accordion.openCloseItems
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (collapsed) {
            !_this.disabled && (_this.collapsed = collapsed);
        });
    };
    NbAccordionItemComponent.prototype.ngOnChanges = function (changes) {
        this.accordionItemInvalidate.next(true);
    };
    NbAccordionItemComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
        this.accordionItemInvalidate.complete();
    };
    NbAccordionItemComponent.prototype.invalidate = function () {
        this.accordionItemInvalidate.next(true);
        this.cd.markForCheck();
    };
    __decorate$109([
        Input('collapsed'),
        HostBinding('class.collapsed'),
        __metadata$72("design:type", Boolean),
        __metadata$72("design:paramtypes", [Boolean])
    ], NbAccordionItemComponent.prototype, "collapsed", null);
    __decorate$109([
        Input('expanded'),
        HostBinding('class.expanded'),
        __metadata$72("design:type", Boolean),
        __metadata$72("design:paramtypes", [Boolean])
    ], NbAccordionItemComponent.prototype, "expanded", null);
    __decorate$109([
        Input('disabled'),
        HostBinding('class.disabled'),
        __metadata$72("design:type", Boolean),
        __metadata$72("design:paramtypes", [Boolean])
    ], NbAccordionItemComponent.prototype, "disabled", null);
    __decorate$109([
        Output(),
        __metadata$72("design:type", Object)
    ], NbAccordionItemComponent.prototype, "collapsedChange", void 0);
    NbAccordionItemComponent = __decorate$109([
        Component({
            selector: 'nb-accordion-item',
            template: "\n    <ng-content select=\"nb-accordion-item-header\"></ng-content>\n    <ng-content select=\"nb-accordion-item-body\"></ng-content>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:flex;flex-direction:column}\n"]
        }),
        __param$13(0, Host()),
        __metadata$72("design:paramtypes", [NbAccordionComponent, ChangeDetectorRef])
    ], NbAccordionItemComponent);
    return NbAccordionItemComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$110 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$73 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$14 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var accordionItemBodyTrigger = trigger('accordionItemBody', [
    state('collapsed', style({
        overflow: 'hidden',
        visibility: 'hidden',
        height: 0,
    })),
    state('expanded', style({
        overflow: 'hidden',
        visibility: 'visible',
    })),
    transition('collapsed => expanded', animate('100ms ease-in')),
    transition('expanded => collapsed', animate('100ms ease-out')),
]);
/**
 * Component intended to be used within `<nb-accordion-item>` component
 */
var NbAccordionItemBodyComponent = /** @class */ (function () {
    function NbAccordionItemBodyComponent(accordionItem, cd) {
        this.accordionItem = accordionItem;
        this.cd = cd;
        this.alive = true;
    }
    Object.defineProperty(NbAccordionItemBodyComponent.prototype, "state", {
        get: function () {
            return this.accordionItem.collapsed ? 'collapsed' : 'expanded';
        },
        enumerable: true,
        configurable: true
    });
    NbAccordionItemBodyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accordionItem.accordionItemInvalidate
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.cd.markForCheck(); });
    };
    NbAccordionItemBodyComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbAccordionItemBodyComponent = __decorate$110([
        Component({
            selector: 'nb-accordion-item-body',
            template: "\n    <div [@accordionItemBody]=\"{ value: state }\">\n      <div class=\"item-body\">\n        <ng-content></ng-content>\n      </div>\n    </div>\n  ",
            animations: [accordionItemBodyTrigger],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param$14(0, Host()),
        __metadata$73("design:paramtypes", [NbAccordionItemComponent, ChangeDetectorRef])
    ], NbAccordionItemBodyComponent);
    return NbAccordionItemBodyComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$111 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$74 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$15 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Component intended to be used within `<nb-accordion-item>` component
 */
var NbAccordionItemHeaderComponent = /** @class */ (function () {
    function NbAccordionItemHeaderComponent(accordionItem, cd) {
        this.accordionItem = accordionItem;
        this.cd = cd;
        this.alive = true;
    }
    Object.defineProperty(NbAccordionItemHeaderComponent.prototype, "isCollapsed", {
        get: function () {
            return this.accordionItem.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAccordionItemHeaderComponent.prototype, "expanded", {
        get: function () {
            return !this.accordionItem.collapsed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAccordionItemHeaderComponent.prototype, "tabbable", {
        // issue #794
        get: function () {
            return this.accordionItem.disabled ? '-1' : '0';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbAccordionItemHeaderComponent.prototype, "disabled", {
        get: function () {
            return this.accordionItem.disabled;
        },
        enumerable: true,
        configurable: true
    });
    NbAccordionItemHeaderComponent.prototype.toggle = function () {
        this.accordionItem.toggle();
    };
    Object.defineProperty(NbAccordionItemHeaderComponent.prototype, "state", {
        get: function () {
            if (this.isCollapsed) {
                return 'collapsed';
            }
            if (this.expanded) {
                return 'expanded';
            }
        },
        enumerable: true,
        configurable: true
    });
    NbAccordionItemHeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.accordionItem.accordionItemInvalidate
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.cd.markForCheck(); });
    };
    NbAccordionItemHeaderComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    __decorate$111([
        HostBinding('class.accordion-item-header-collapsed'),
        __metadata$74("design:type", Boolean),
        __metadata$74("design:paramtypes", [])
    ], NbAccordionItemHeaderComponent.prototype, "isCollapsed", null);
    __decorate$111([
        HostBinding('class.accordion-item-header-expanded'),
        HostBinding('attr.aria-expanded'),
        __metadata$74("design:type", Boolean),
        __metadata$74("design:paramtypes", [])
    ], NbAccordionItemHeaderComponent.prototype, "expanded", null);
    __decorate$111([
        HostBinding('attr.tabindex'),
        __metadata$74("design:type", String),
        __metadata$74("design:paramtypes", [])
    ], NbAccordionItemHeaderComponent.prototype, "tabbable", null);
    __decorate$111([
        HostBinding('attr.aria-disabled'),
        __metadata$74("design:type", Boolean),
        __metadata$74("design:paramtypes", [])
    ], NbAccordionItemHeaderComponent.prototype, "disabled", null);
    __decorate$111([
        HostListener('click'),
        __metadata$74("design:type", Function),
        __metadata$74("design:paramtypes", []),
        __metadata$74("design:returntype", void 0)
    ], NbAccordionItemHeaderComponent.prototype, "toggle", null);
    NbAccordionItemHeaderComponent = __decorate$111([
        Component({
            selector: 'nb-accordion-item-header',
            template: "\n    <ng-content select=\"nb-accordion-item-title\"></ng-content>\n    <ng-content select=\"nb-accordion-item-description\"></ng-content>\n    <ng-content></ng-content>\n    <nb-icon icon=\"chevron-down-outline\" pack=\"nebular-essentials\" [@expansionIndicator]=\"state\" *ngIf=\"!disabled\" >\n    </nb-icon>\n  ",
            animations: [
                trigger('expansionIndicator', [
                    state('expanded', style({
                        transform: 'rotate(180deg)',
                    })),
                    transition('collapsed => expanded', animate('100ms ease-in')),
                    transition('expanded => collapsed', animate('100ms ease-out')),
                ]),
            ],
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:flex;align-items:center;cursor:pointer}:host:focus{outline:0}\n"]
        }),
        __param$15(0, Host()),
        __metadata$74("design:paramtypes", [NbAccordionItemComponent, ChangeDetectorRef])
    ], NbAccordionItemHeaderComponent);
    return NbAccordionItemHeaderComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$112 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_ACCORDION_COMPONENTS = [
    NbAccordionComponent,
    NbAccordionItemComponent,
    NbAccordionItemHeaderComponent,
    NbAccordionItemBodyComponent,
];
var NbAccordionModule = /** @class */ (function () {
    function NbAccordionModule() {
    }
    NbAccordionModule = __decorate$112([
        NgModule({
            imports: [CommonModule, NbIconModule],
            exports: NB_ACCORDION_COMPONENTS.slice(),
            declarations: NB_ACCORDION_COMPONENTS.slice(),
            providers: [],
        })
    ], NbAccordionModule);
    return NbAccordionModule;
}());

var __decorate$113 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$75 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * List is a container component that wraps `nb-list-item` component.
 *
 * Basic example:
 * @stacked-example(Simple list, list/simple-list-showcase.component)
 *
 * `nb-list-item` accepts arbitrary content, so you can create a list of any components.
 *
 * ### Installation
 *
 * Import `NbListModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbListModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * List of users:
 * @stacked-example(Users list, list/users-list-showcase.component)
 *
 * @styles
 *
 * list-item-divider-color:
 * list-item-divider-style:
 * list-item-divider-width:
 * list-item-padding:
 * list-item-text-color:
 * list-item-font-family:
 * list-item-font-size:
 * list-item-font-weight:
 * list-item-line-height:
 */
var NbListComponent = /** @class */ (function () {
    function NbListComponent() {
        /**
         * Role attribute value
         *
         * @type {string}
         */
        this.role = 'list';
    }
    __decorate$113([
        Input(),
        HostBinding('attr.role'),
        __metadata$75("design:type", Object)
    ], NbListComponent.prototype, "role", void 0);
    NbListComponent = __decorate$113([
        Component({
            selector: 'nb-list',
            template: "<ng-content select=\"nb-list-item\"></ng-content>",
            styles: [":host{display:flex;flex-direction:column;flex:1 1 auto;overflow:auto}\n"]
        })
    ], NbListComponent);
    return NbListComponent;
}());
/**
 * List item component is a grouping component that accepts arbitrary content.
 * It should be direct child of `nb-list` componet.
 */
var NbListItemComponent = /** @class */ (function () {
    function NbListItemComponent() {
        /**
         * Role attribute value
         *
         * @type {string}
         */
        this.role = 'listitem';
    }
    __decorate$113([
        Input(),
        HostBinding('attr.role'),
        __metadata$75("design:type", Object)
    ], NbListItemComponent.prototype, "role", void 0);
    NbListItemComponent = __decorate$113([
        Component({
            selector: 'nb-list-item',
            template: "<ng-content></ng-content>",
            styles: [":host{flex-shrink:0}\n"]
        })
    ], NbListItemComponent);
    return NbListItemComponent;
}());

var __decorate$115 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$76 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * List pager directive
 *
 * Directive allows you to determine page of currently viewing items.
 *
 */
var NbListPageTrackerDirective = /** @class */ (function () {
    function NbListPageTrackerDirective() {
        var _this = this;
        this.alive = true;
        /**
         * Page to start counting with.
         */
        this.startPage = 1;
        /**
         * Emits when another page become visible.
         */
        this.pageChange = new EventEmitter();
        this.observer = new IntersectionObserver(function (entries) { return _this.checkForPageChange(entries); }, { threshold: 0.5 });
    }
    NbListPageTrackerDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.listItems && this.listItems.length) {
            this.observeItems();
        }
        this.listItems.changes
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.observeItems(); });
    };
    NbListPageTrackerDirective.prototype.ngOnDestroy = function () {
        this.observer.disconnect && this.observer.disconnect();
    };
    NbListPageTrackerDirective.prototype.observeItems = function () {
        var _this = this;
        this.listItems.forEach(function (i) { return _this.observer.observe(i.nativeElement); });
    };
    NbListPageTrackerDirective.prototype.checkForPageChange = function (entries) {
        var mostVisiblePage = this.findMostVisiblePage(entries);
        if (mostVisiblePage && this.currentPage !== mostVisiblePage) {
            this.currentPage = mostVisiblePage;
            this.pageChange.emit(this.currentPage);
        }
    };
    NbListPageTrackerDirective.prototype.findMostVisiblePage = function (entries) {
        var intersectionRatioByPage = new Map();
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            if (entry.intersectionRatio < 0.5) {
                continue;
            }
            var elementIndex = this.elementIndex(entry.target);
            if (elementIndex === -1) {
                continue;
            }
            var page = this.startPage + Math.floor(elementIndex / this.pageSize);
            var ratio = entry.intersectionRatio;
            if (intersectionRatioByPage.has(page)) {
                ratio += intersectionRatioByPage.get(page);
            }
            intersectionRatioByPage.set(page, ratio);
        }
        var maxRatio = 0;
        var mostVisiblePage;
        intersectionRatioByPage.forEach(function (ratio, page) {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                mostVisiblePage = page;
            }
        });
        return mostVisiblePage;
    };
    NbListPageTrackerDirective.prototype.elementIndex = function (element) {
        return element.parentElement && element.parentElement.children
            ? Array.from(element.parentElement.children).indexOf(element)
            : -1;
    };
    __decorate$115([
        Input(),
        __metadata$76("design:type", Number)
    ], NbListPageTrackerDirective.prototype, "pageSize", void 0);
    __decorate$115([
        Input(),
        __metadata$76("design:type", Number)
    ], NbListPageTrackerDirective.prototype, "startPage", void 0);
    __decorate$115([
        Output(),
        __metadata$76("design:type", Object)
    ], NbListPageTrackerDirective.prototype, "pageChange", void 0);
    __decorate$115([
        ContentChildren(NbListItemComponent, { read: ElementRef }),
        __metadata$76("design:type", QueryList)
    ], NbListPageTrackerDirective.prototype, "listItems", void 0);
    NbListPageTrackerDirective = __decorate$115([
        Directive({
            selector: '[nbListPageTracker]',
        }),
        __metadata$76("design:paramtypes", [])
    ], NbListPageTrackerDirective);
    return NbListPageTrackerDirective;
}());

var __decorate$116 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$77 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbScrollableContainerDimentions = /** @class */ (function () {
    function NbScrollableContainerDimentions() {
    }
    return NbScrollableContainerDimentions;
}());
/**
 * Infinite List Directive
 *
 * ```html
 *  <nb-list nbInfiniteList [threshold]="500" (bottomThreshold)="loadNext()">
 *    <nb-list-item *ngFor="let item of items"></nb-list-item>
 *  </nb-list>
 * ```
 *
 * @stacked-example(Simple infinite list, infinite-list/infinite-list-showcase.component)
 *
 * Directive will notify when list scrolled up or down to a given threshold.
 * By default it listen to scroll of list on which applied, but also can be set to listen to window scroll.
 *
 * @stacked-example(Scroll modes, infinite-list/infinite-list-scroll-modes.component)
 *
 * To improve UX of infinite lists, it's better to keep current page in url,
 * so user able to return to the last viewed page or to share a link to this page.
 * `nbListPageTracker` directive will help you to know, what page user currently viewing.
 * Just put it on a list, set page size and it will calculate page that currently in viewport.
 * You can [open the example](example/infinite-list/infinite-news-list.component)
 * in a new tab to check out this feature.
 *
 * @stacked-example(Infinite list with pager, infinite-list/infinite-news-list.component)
 *
 * @stacked-example(Infinite list with placeholders at the top, infinite-list/infinite-list-placeholders.component)
 *
 */
var NbInfiniteListDirective = /** @class */ (function () {
    function NbInfiniteListDirective(elementRef, scrollService, dimensionsService) {
        this.elementRef = elementRef;
        this.scrollService = scrollService;
        this.dimensionsService = dimensionsService;
        this.alive = true;
        this.windowScroll = false;
        /**
         * Emits when distance between list bottom and current scroll position is less than threshold.
         */
        this.bottomThreshold = new EventEmitter(true);
        /**
         * Emits when distance between list top and current scroll position is less than threshold.
         */
        this.topThreshold = new EventEmitter(true);
    }
    Object.defineProperty(NbInfiniteListDirective.prototype, "elementScroll", {
        get: function () {
            return !this.windowScroll;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbInfiniteListDirective.prototype, "listenWindowScroll", {
        /**
         * By default component observes list scroll position.
         * If set to `true`, component will observe position of page scroll instead.
         */
        set: function (value) {
            this.windowScroll = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbInfiniteListDirective.prototype.onElementScroll = function () {
        if (this.elementScroll) {
            this.checkPosition(this.elementRef.nativeElement);
        }
    };
    NbInfiniteListDirective.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.scrollService.onScroll()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.windowScroll; }), switchMap(function () { return _this.getContainerDimensions(); }))
            .subscribe(function (dimentions) { return _this.checkPosition(dimentions); });
        this.listItems.changes
            .pipe(takeWhile(function () { return _this.alive; }), 
        // For some reason, changes are emitted before list item removed from dom,
        // so dimensions will be incorrect.
        // Check every 50ms for a second if dom and query are in sync.
        // Once they synchronized, we can get proper dimensions.
        switchMap(function () { return interval(50).pipe(takeUntil(timer(1000)), filter(function () { return _this.inSyncWithDom(); }), take(1)); }), switchMap(function () { return _this.getContainerDimensions(); }))
            .subscribe(function (dimentions) { return _this.checkPosition(dimentions); });
        this.getContainerDimensions().subscribe(function (dimentions) { return _this.checkPosition(dimentions); });
    };
    NbInfiniteListDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbInfiniteListDirective.prototype.checkPosition = function (_a) {
        var scrollHeight = _a.scrollHeight, scrollTop = _a.scrollTop, clientHeight = _a.clientHeight;
        var initialCheck = this.lastScrollPosition == null;
        var manualCheck = this.lastScrollPosition === scrollTop;
        var scrollUp = scrollTop < this.lastScrollPosition;
        var scrollDown = scrollTop > this.lastScrollPosition;
        var distanceToBottom = scrollHeight - scrollTop - clientHeight;
        if ((initialCheck || manualCheck || scrollDown) && distanceToBottom <= this.threshold) {
            this.bottomThreshold.emit();
        }
        if ((initialCheck || scrollUp) && scrollTop <= this.threshold) {
            this.topThreshold.emit();
        }
        this.lastScrollPosition = scrollTop;
    };
    NbInfiniteListDirective.prototype.getContainerDimensions = function () {
        if (this.elementScroll) {
            var _a = this.elementRef.nativeElement, scrollTop = _a.scrollTop, scrollHeight = _a.scrollHeight, clientHeight = _a.clientHeight;
            return of({ scrollTop: scrollTop, scrollHeight: scrollHeight, clientHeight: clientHeight });
        }
        return forkJoin(this.scrollService.getPosition(), this.dimensionsService.getDimensions())
            .pipe(map(function (_a) {
            var scrollPosition = _a[0], dimensions = _a[1];
            return ({
                scrollTop: scrollPosition.y,
                scrollHeight: dimensions.scrollHeight,
                clientHeight: dimensions.clientHeight,
            });
        }));
    };
    NbInfiniteListDirective.prototype.inSyncWithDom = function () {
        return this.elementRef.nativeElement.children.length === this.listItems.length;
    };
    __decorate$116([
        Input(),
        __metadata$77("design:type", Number)
    ], NbInfiniteListDirective.prototype, "threshold", void 0);
    __decorate$116([
        Input(),
        __metadata$77("design:type", Object),
        __metadata$77("design:paramtypes", [Object])
    ], NbInfiniteListDirective.prototype, "listenWindowScroll", null);
    __decorate$116([
        Output(),
        __metadata$77("design:type", Object)
    ], NbInfiniteListDirective.prototype, "bottomThreshold", void 0);
    __decorate$116([
        Output(),
        __metadata$77("design:type", Object)
    ], NbInfiniteListDirective.prototype, "topThreshold", void 0);
    __decorate$116([
        HostListener('scroll'),
        __metadata$77("design:type", Function),
        __metadata$77("design:paramtypes", []),
        __metadata$77("design:returntype", void 0)
    ], NbInfiniteListDirective.prototype, "onElementScroll", null);
    __decorate$116([
        ContentChildren(NbListItemComponent),
        __metadata$77("design:type", QueryList)
    ], NbInfiniteListDirective.prototype, "listItems", void 0);
    NbInfiniteListDirective = __decorate$116([
        Directive({
            selector: '[nbInfiniteList]',
        }),
        __metadata$77("design:paramtypes", [ElementRef,
            NbLayoutScrollService,
            NbLayoutRulerService])
    ], NbInfiniteListDirective);
    return NbInfiniteListDirective;
}());

var __decorate$114 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var components = [
    NbListComponent,
    NbListItemComponent,
    NbListPageTrackerDirective,
    NbInfiniteListDirective,
];
var NbListModule = /** @class */ (function () {
    function NbListModule() {
    }
    NbListModule = __decorate$114([
        NgModule({
            declarations: components,
            exports: components,
        })
    ], NbListModule);
    return NbListModule;
}());

var __extends$12 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$117 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbDirectionality = /** @class */ (function (_super) {
    __extends$12(NbDirectionality, _super);
    function NbDirectionality() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbDirectionality = __decorate$117([
        Injectable()
    ], NbDirectionality);
    return NbDirectionality;
}(Directionality));

var __extends$13 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$118 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbBidiModule = /** @class */ (function (_super) {
    __extends$13(NbBidiModule, _super);
    function NbBidiModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbBidiModule = __decorate$118([
        NgModule({
            providers: [
                { provide: NbDirectionality, useExisting: Directionality },
            ],
        })
    ], NbBidiModule);
    return NbBidiModule;
}(BidiModule));

var __extends$15 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NbPlatform$1 = /** @class */ (function (_super) {
    __extends$15(NbPlatform, _super);
    function NbPlatform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbPlatform;
}(Platform));

var __extends$14 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$119 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbPlatformModule = /** @class */ (function (_super) {
    __extends$14(NbPlatformModule, _super);
    function NbPlatformModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbPlatformModule = __decorate$119([
        NgModule({
            providers: [
                { provide: NbPlatform$1, useExisting: Platform },
            ],
        })
    ], NbPlatformModule);
    return NbPlatformModule;
}(PlatformModule));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license infornbion.
 */
var __extends$16 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$120 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$78 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Cell definition for the nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var NbCellDefDirective = /** @class */ (function (_super) {
    __extends$16(NbCellDefDirective, _super);
    function NbCellDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbCellDefDirective_1 = NbCellDefDirective;
    var NbCellDefDirective_1;
    NbCellDefDirective = NbCellDefDirective_1 = __decorate$120([
        Directive({
            selector: '[nbCellDef]',
            providers: [{ provide: CdkCellDef, useExisting: NbCellDefDirective_1 }],
        })
    ], NbCellDefDirective);
    return NbCellDefDirective;
}(CdkCellDef));
/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var NbHeaderCellDefDirective = /** @class */ (function (_super) {
    __extends$16(NbHeaderCellDefDirective, _super);
    function NbHeaderCellDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbHeaderCellDefDirective_1 = NbHeaderCellDefDirective;
    var NbHeaderCellDefDirective_1;
    NbHeaderCellDefDirective = NbHeaderCellDefDirective_1 = __decorate$120([
        Directive({
            selector: '[nbHeaderCellDef]',
            providers: [{ provide: CdkHeaderCellDef, useExisting: NbHeaderCellDefDirective_1 }],
        })
    ], NbHeaderCellDefDirective);
    return NbHeaderCellDefDirective;
}(CdkHeaderCellDef));
/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
var NbFooterCellDefDirective = /** @class */ (function (_super) {
    __extends$16(NbFooterCellDefDirective, _super);
    function NbFooterCellDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbFooterCellDefDirective_1 = NbFooterCellDefDirective;
    var NbFooterCellDefDirective_1;
    NbFooterCellDefDirective = NbFooterCellDefDirective_1 = __decorate$120([
        Directive({
            selector: '[nbFooterCellDef]',
            providers: [{ provide: CdkFooterCellDef, useExisting: NbFooterCellDefDirective_1 }],
        })
    ], NbFooterCellDefDirective);
    return NbFooterCellDefDirective;
}(CdkFooterCellDef));
var NB_SORT_HEADER_COLUMN_DEF = new InjectionToken('NB_SORT_HEADER_COLUMN_DEF');
/**
 * Column definition for the nb-table.
 * Defines a set of cells available for a table column.
 */
var NbColumnDefDirective = /** @class */ (function (_super) {
    __extends$16(NbColumnDefDirective, _super);
    function NbColumnDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbColumnDefDirective_1 = NbColumnDefDirective;
    var NbColumnDefDirective_1;
    __decorate$120([
        Input('nbColumnDef'),
        __metadata$78("design:type", String)
    ], NbColumnDefDirective.prototype, "name", void 0);
    __decorate$120([
        Input(),
        __metadata$78("design:type", Boolean)
    ], NbColumnDefDirective.prototype, "sticky", void 0);
    __decorate$120([
        Input(),
        __metadata$78("design:type", Boolean)
    ], NbColumnDefDirective.prototype, "stickyEnd", void 0);
    NbColumnDefDirective = NbColumnDefDirective_1 = __decorate$120([
        Directive({
            selector: '[nbColumnDef]',
            providers: [
                { provide: CdkColumnDef, useExisting: NbColumnDefDirective_1 },
                { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbColumnDefDirective_1 },
            ],
        })
    ], NbColumnDefDirective);
    return NbColumnDefDirective;
}(CdkColumnDef));
/** Header cell template container that adds the right classes and role. */
var NbHeaderCellDirective = /** @class */ (function (_super) {
    __extends$16(NbHeaderCellDirective, _super);
    function NbHeaderCellDirective(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("nb-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    NbHeaderCellDirective = __decorate$120([
        Directive({
            selector: 'nb-header-cell, th[nbHeaderCell]',
            host: {
                'class': 'nb-header-cell',
                'role': 'columnheader',
            },
        }),
        __metadata$78("design:paramtypes", [NbColumnDefDirective,
            ElementRef])
    ], NbHeaderCellDirective);
    return NbHeaderCellDirective;
}(CdkHeaderCell));
/** Footer cell template container that adds the right classes and role. */
var NbFooterCellDirective = /** @class */ (function (_super) {
    __extends$16(NbFooterCellDirective, _super);
    function NbFooterCellDirective(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("nb-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    NbFooterCellDirective = __decorate$120([
        Directive({
            selector: 'nb-footer-cell, td[nbFooterCell]',
            host: {
                'class': 'nb-footer-cell',
                'role': 'gridcell',
            },
        }),
        __metadata$78("design:paramtypes", [NbColumnDefDirective,
            ElementRef])
    ], NbFooterCellDirective);
    return NbFooterCellDirective;
}(CdkFooterCell));
/** Cell template container that adds the right classes and role. */
var NbCellDirective = /** @class */ (function (_super) {
    __extends$16(NbCellDirective, _super);
    function NbCellDirective(columnDef, elementRef) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        elementRef.nativeElement.classList.add("nb-column-" + columnDef.cssClassFriendlyName);
        return _this;
    }
    NbCellDirective = __decorate$120([
        Directive({
            selector: 'nb-cell, td[nbCell]',
            host: {
                'class': 'nb-cell',
                'role': 'gridcell',
            },
        }),
        __metadata$78("design:paramtypes", [NbColumnDefDirective,
            ElementRef])
    ], NbCellDirective);
    return NbCellDirective;
}(CdkCell));

var __extends$17 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NbDataSource = /** @class */ (function (_super) {
    __extends$17(NbDataSource, _super);
    function NbDataSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbDataSource;
}(DataSource));

var __extends$18 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$121 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$79 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbDataRowOutletDirective = /** @class */ (function (_super) {
    __extends$18(NbDataRowOutletDirective, _super);
    function NbDataRowOutletDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbDataRowOutletDirective_1 = NbDataRowOutletDirective;
    var NbDataRowOutletDirective_1;
    NbDataRowOutletDirective = NbDataRowOutletDirective_1 = __decorate$121([
        Directive({
            selector: '[nbRowOutlet]',
            providers: [{ provide: DataRowOutlet, useExisting: NbDataRowOutletDirective_1 }],
        })
    ], NbDataRowOutletDirective);
    return NbDataRowOutletDirective;
}(DataRowOutlet));
var NbHeaderRowOutletDirective = /** @class */ (function (_super) {
    __extends$18(NbHeaderRowOutletDirective, _super);
    function NbHeaderRowOutletDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbHeaderRowOutletDirective_1 = NbHeaderRowOutletDirective;
    var NbHeaderRowOutletDirective_1;
    NbHeaderRowOutletDirective = NbHeaderRowOutletDirective_1 = __decorate$121([
        Directive({
            selector: '[nbHeaderRowOutlet]',
            providers: [{ provide: HeaderRowOutlet, useExisting: NbHeaderRowOutletDirective_1 }],
        })
    ], NbHeaderRowOutletDirective);
    return NbHeaderRowOutletDirective;
}(HeaderRowOutlet));
var NbFooterRowOutletDirective = /** @class */ (function (_super) {
    __extends$18(NbFooterRowOutletDirective, _super);
    function NbFooterRowOutletDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbFooterRowOutletDirective_1 = NbFooterRowOutletDirective;
    var NbFooterRowOutletDirective_1;
    NbFooterRowOutletDirective = NbFooterRowOutletDirective_1 = __decorate$121([
        Directive({
            selector: '[nbFooterRowOutlet]',
            providers: [{ provide: FooterRowOutlet, useExisting: NbFooterRowOutletDirective_1 }],
        })
    ], NbFooterRowOutletDirective);
    return NbFooterRowOutletDirective;
}(FooterRowOutlet));
var NbCellOutletDirective = /** @class */ (function (_super) {
    __extends$18(NbCellOutletDirective, _super);
    function NbCellOutletDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbCellOutletDirective_1 = NbCellOutletDirective;
    var NbCellOutletDirective_1;
    NbCellOutletDirective = NbCellOutletDirective_1 = __decorate$121([
        Directive({
            selector: '[nbCellOutlet]',
            providers: [{ provide: CdkCellOutlet, useExisting: NbCellOutletDirective_1 }],
        })
    ], NbCellOutletDirective);
    return NbCellOutletDirective;
}(CdkCellOutlet));
/**
 * Header row definition for the nb-table.
 * Captures the header row's template and other header properties such as the columns to display.
 */
var NbHeaderRowDefDirective = /** @class */ (function (_super) {
    __extends$18(NbHeaderRowDefDirective, _super);
    function NbHeaderRowDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbHeaderRowDefDirective_1 = NbHeaderRowDefDirective;
    var NbHeaderRowDefDirective_1;
    __decorate$121([
        Input('nbHeaderRowDef'),
        __metadata$79("design:type", Object)
    ], NbHeaderRowDefDirective.prototype, "columns", void 0);
    __decorate$121([
        Input('nbHeaderRowDefSticky'),
        __metadata$79("design:type", Boolean)
    ], NbHeaderRowDefDirective.prototype, "sticky", void 0);
    NbHeaderRowDefDirective = NbHeaderRowDefDirective_1 = __decorate$121([
        Directive({
            selector: '[nbHeaderRowDef]',
            providers: [{ provide: CdkHeaderRowDef, useExisting: NbHeaderRowDefDirective_1 }],
        })
    ], NbHeaderRowDefDirective);
    return NbHeaderRowDefDirective;
}(CdkHeaderRowDef));
/**
 * Footer row definition for the nb-table.
 * Captures the footer row's template and other footer properties such as the columns to display.
 */
var NbFooterRowDefDirective = /** @class */ (function (_super) {
    __extends$18(NbFooterRowDefDirective, _super);
    function NbFooterRowDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbFooterRowDefDirective_1 = NbFooterRowDefDirective;
    var NbFooterRowDefDirective_1;
    __decorate$121([
        Input('nbFooterRowDef'),
        __metadata$79("design:type", Object)
    ], NbFooterRowDefDirective.prototype, "columns", void 0);
    __decorate$121([
        Input('nbFooterRowDefSticky'),
        __metadata$79("design:type", Boolean)
    ], NbFooterRowDefDirective.prototype, "sticky", void 0);
    NbFooterRowDefDirective = NbFooterRowDefDirective_1 = __decorate$121([
        Directive({
            selector: '[nbFooterRowDef]',
            providers: [{ provide: CdkFooterRowDef, useExisting: NbFooterRowDefDirective_1 }],
        })
    ], NbFooterRowDefDirective);
    return NbFooterRowDefDirective;
}(CdkFooterRowDef));
/**
 * Data row definition for the nb-table.
 * Captures the data row's template and other properties such as the columns to display and
 * a when predicate that describes when this row should be used.
 */
var NbRowDefDirective = /** @class */ (function (_super) {
    __extends$18(NbRowDefDirective, _super);
    function NbRowDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbRowDefDirective_1 = NbRowDefDirective;
    var NbRowDefDirective_1;
    __decorate$121([
        Input('nbRowDefColumns'),
        __metadata$79("design:type", Object)
    ], NbRowDefDirective.prototype, "columns", void 0);
    __decorate$121([
        Input('nbRowDefWhen'),
        __metadata$79("design:type", Function)
    ], NbRowDefDirective.prototype, "when", void 0);
    NbRowDefDirective = NbRowDefDirective_1 = __decorate$121([
        Directive({
            selector: '[nbRowDef]',
            providers: [{ provide: CdkRowDef, useExisting: NbRowDefDirective_1 }],
        })
    ], NbRowDefDirective);
    return NbRowDefDirective;
}(CdkRowDef));
/** Footer template container that contains the cell outlet. Adds the right class and role. */
var NbHeaderRowComponent = /** @class */ (function (_super) {
    __extends$18(NbHeaderRowComponent, _super);
    function NbHeaderRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbHeaderRowComponent_1 = NbHeaderRowComponent;
    var NbHeaderRowComponent_1;
    NbHeaderRowComponent = NbHeaderRowComponent_1 = __decorate$121([
        Component({
            selector: 'nb-header-row, tr[nbHeaderRow]',
            template: "\n    <ng-container nbCellOutlet></ng-container>",
            host: {
                'class': 'nb-header-row',
                'role': 'row',
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [{ provide: CdkHeaderRow, useExisting: NbHeaderRowComponent_1 }]
        })
    ], NbHeaderRowComponent);
    return NbHeaderRowComponent;
}(CdkHeaderRow));
/** Footer template container that contains the cell outlet. Adds the right class and role. */
var NbFooterRowComponent = /** @class */ (function (_super) {
    __extends$18(NbFooterRowComponent, _super);
    function NbFooterRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbFooterRowComponent_1 = NbFooterRowComponent;
    var NbFooterRowComponent_1;
    NbFooterRowComponent = NbFooterRowComponent_1 = __decorate$121([
        Component({
            selector: 'nb-footer-row, tr[nbFooterRow]',
            template: "\n    <ng-container nbCellOutlet></ng-container>",
            host: {
                'class': 'nb-footer-row',
                'role': 'row',
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [{ provide: CdkFooterRow, useExisting: NbFooterRowComponent_1 }]
        })
    ], NbFooterRowComponent);
    return NbFooterRowComponent;
}(CdkFooterRow));
/** Data row template container that contains the cell outlet. Adds the right class and role. */
var NbRowComponent = /** @class */ (function (_super) {
    __extends$18(NbRowComponent, _super);
    function NbRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbRowComponent_1 = NbRowComponent;
    var NbRowComponent_1;
    NbRowComponent = NbRowComponent_1 = __decorate$121([
        Component({
            selector: 'nb-row, tr[nbRow]',
            template: "\n    <ng-container nbCellOutlet></ng-container>",
            host: {
                'class': 'nb-row',
                'role': 'row',
            },
            providers: [{ provide: CdkRow, useExisting: NbRowComponent_1 }],
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], NbRowComponent);
    return NbRowComponent;
}(CdkRow));

var __extends$19 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$122 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$80 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$16 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NB_TABLE_TEMPLATE = "\n  <ng-container nbHeaderRowOutlet></ng-container>\n  <ng-container nbRowOutlet></ng-container>\n  <ng-container nbFooterRowOutlet></ng-container>";
var NbTable = /** @class */ (function (_super) {
    __extends$19(NbTable, _super);
    function NbTable(differs, changeDetectorRef, elementRef, role, dir, document, platform) {
        return _super.call(this, differs, changeDetectorRef, elementRef, role, dir, document, platform) || this;
    }
    NbTable = __decorate$122([
        __param$16(3, Attribute('role')),
        __param$16(5, Inject(NB_DOCUMENT)),
        __metadata$80("design:paramtypes", [IterableDiffers,
            ChangeDetectorRef,
            ElementRef, String, NbDirectionality, Object, NbPlatform$1])
    ], NbTable);
    return NbTable;
}(CdkTable));
var COMPONENTS$1 = [
    NbTable,
    // Template defs
    NbHeaderCellDefDirective,
    NbHeaderRowDefDirective,
    NbColumnDefDirective,
    NbCellDefDirective,
    NbRowDefDirective,
    NbFooterCellDefDirective,
    NbFooterRowDefDirective,
    // Outlets
    NbDataRowOutletDirective,
    NbHeaderRowOutletDirective,
    NbFooterRowOutletDirective,
    NbCellOutletDirective,
    // Cell directives
    NbHeaderCellDirective,
    NbCellDirective,
    NbFooterCellDirective,
    // Row directives
    NbHeaderRowComponent,
    NbRowComponent,
    NbFooterRowComponent,
];
var NbTableModule = /** @class */ (function (_super) {
    __extends$19(NbTableModule, _super);
    function NbTableModule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbTableModule = __decorate$122([
        NgModule({
            imports: [NbBidiModule, NbPlatformModule],
            declarations: COMPONENTS$1.slice(),
            exports: COMPONENTS$1.slice(),
        })
    ], NbTableModule);
    return NbTableModule;
}(CdkTableModule));

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_DIALOG_CONFIG = new InjectionToken('Default dialog options');
/**
 * Describes all available options that may be passed to the NbDialogService.
 * */
var NbDialogConfig = /** @class */ (function () {
    function NbDialogConfig(config) {
        /**
         * If true than overlay will render backdrop under a dialog.
         * */
        this.hasBackdrop = true;
        /**
         * Class that'll be assigned to the backdrop element.
         * */
        this.backdropClass = 'overlay-backdrop';
        /**
         * If true then mouse clicks by backdrop will close a dialog.
         * */
        this.closeOnBackdropClick = true;
        /**
         * If true then escape press will close a dialog.
         * */
        this.closeOnEsc = true;
        /**
         * Disables scroll on content under dialog if true and does nothing otherwise.
         * */
        this.hasScroll = false;
        /**
         * Focuses dialog automatically after open if true.
         * */
        this.autoFocus = true;
        Object.assign(this, config);
    }
    return NbDialogConfig;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
/**
 * The `NbDialogRef` helps to manipulate dialog after it was created.
 * The dialog can be dismissed by using `close` method of the dialogRef.
 * You can access rendered component as `content` property of the dialogRef.
 * `onBackdropClick` streams click events on the backdrop of the dialog.
 * */
var NbDialogRef = /** @class */ (function () {
    function NbDialogRef(overlayRef) {
        this.overlayRef = overlayRef;
        this.onClose$ = new Subject();
        this.onClose = this.onClose$.asObservable();
        this.onBackdropClick = this.overlayRef.backdropClick();
    }
    /**
     * Hides dialog.
     * */
    NbDialogRef.prototype.close = function (res) {
        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.onClose$.next(res);
        this.onClose$.complete();
    };
    return NbDialogRef;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$124 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$82 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Container component for each dialog.
 * All the dialogs will be attached to it.
 * // TODO add animations
 * */
var NbDialogContainerComponent = /** @class */ (function () {
    function NbDialogContainerComponent(config, elementRef, focusTrapFactory) {
        this.config = config;
        this.elementRef = elementRef;
        this.focusTrapFactory = focusTrapFactory;
    }
    NbDialogContainerComponent.prototype.ngOnInit = function () {
        if (this.config.autoFocus) {
            this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
            this.focusTrap.blurPreviouslyFocusedElement();
            this.focusTrap.focusInitialElement();
        }
    };
    NbDialogContainerComponent.prototype.ngOnDestroy = function () {
        if (this.config.autoFocus && this.focusTrap) {
            this.focusTrap.restoreFocus();
        }
    };
    NbDialogContainerComponent.prototype.attachComponentPortal = function (portal) {
        return this.portalOutlet.attachComponentPortal(portal);
    };
    NbDialogContainerComponent.prototype.attachTemplatePortal = function (portal) {
        return this.portalOutlet.attachTemplatePortal(portal);
    };
    __decorate$124([
        ViewChild(NbPortalOutletDirective, { static: true }),
        __metadata$82("design:type", NbPortalOutletDirective)
    ], NbDialogContainerComponent.prototype, "portalOutlet", void 0);
    NbDialogContainerComponent = __decorate$124([
        Component({
            selector: 'nb-dialog-container',
            template: '<ng-template nbPortalOutlet></ng-template>'
        }),
        __metadata$82("design:paramtypes", [NbDialogConfig,
            ElementRef,
            NbFocusTrapFactoryService])
    ], NbDialogContainerComponent);
    return NbDialogContainerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __assign$2 = (this && this.__assign) || function () {
    __assign$2 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$2.apply(this, arguments);
};
var __decorate$123 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$81 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$17 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The `NbDialogService` helps to open dialogs.
 *
 * @stacked-example(Showcase, dialog/dialog-showcase.component)
 *
 * A new dialog is opened by calling the `open` method with a component to be loaded and an optional configuration.
 * `open` method will return `NbDialogRef` that can be used for the further manipulations.
 *
 * ### Installation
 *
 * Import `NbDialogModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbDialogModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * If you are using it in a lazy loaded module than you have to install it with `NbDialogModule.forChild()`:
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbDialogModule.forChild(config),
 *   ],
 * })
 * export class LazyLoadedModule { }
 * ```
 *
 * ### Usage
 *
 * ```ts
 * const dialogRef = this.dialogService.open(MyDialogComponent, { ... });
 * ```
 *
 * `NbDialogRef` gives capability access reference to the rendered dialog component,
 * destroy dialog and some other options described below.
 *
 * Also, you can inject `NbDialogRef` in dialog component.
 *
 * ```ts
 * this.dialogService.open(MyDialogComponent, { ... });
 *
 * // my-dialog.component.ts
 * constructor(protected dialogRef: NbDialogRef) {
 * }
 *
 * close() {
 *   this.dialogRef.close();
 * }
 * ```
 *
 * Instead of component you can create dialog from TemplateRef:
 *
 * @stacked-example(Template ref, dialog/dialog-template.component)
 *
 * The dialog may return result through `NbDialogRef`. Calling component can receive this result with `onClose`
 * stream of `NbDialogRef`.
 *
 * @stacked-example(Result, dialog/dialog-result.component)
 *
 * ### Configuration
 *
 * As we mentioned above, `open` method of the `NbDialogService` may receive optional configuration options.
 * Also, you can provide global dialogs configuration through `NbDialogModule.forRoot({ ... })`.
 *
 * This config may contain the following:
 *
 * `context` - both, template and component may receive data through `config.context` property.
 * For components, this data will be assigned through inputs.
 * For templates, you can access it inside template as $implicit.
 *
 * ```ts
 * this.dialogService.open(template, { context: 'pass data in template' });
 * ```
 *
 * ```html
 * <ng-template let-some-additional-data>
 *   {{ some-additional-data }}
 * <ng-template/>
 * ```
 *
 * `hasBackdrop` - determines is service have to render backdrop under the dialog.
 * Default is true.
 * @stacked-example(Backdrop, dialog/dialog-has-backdrop.component)
 *
 * `closeOnBackdropClick` - close dialog on backdrop click if true.
 * Default is true.
 * @stacked-example(Backdrop click, dialog/dialog-backdrop-click.component)
 *
 * `closeOnEsc` - close dialog on escape button on the keyboard.
 * Default is true.
 * @stacked-example(Escape hit, dialog/dialog-esc.component)
 *
 * `hasScroll` - Disables scroll on content under dialog if true and does nothing otherwise.
 * Default is false.
 * Please, open dialogs in the separate window and try to scroll.
 * @stacked-example(Scroll, dialog/dialog-scroll.component)
 *
 * `autoFocus` - Focuses dialog automatically after open if true. It's useful to prevent misclicks on
 * trigger elements and opening multiple dialogs.
 * Default is true.
 *
 * As you can see, if you open dialog with auto focus dialog will focus first focusable element
 * or just blur previously focused automatically.
 * Otherwise, without auto focus, the focus will stay on the previously focused element.
 * Please, open dialogs in the separate window and try to click on the button without focus
 * and then hit space any times. Multiple same dialogs will be opened.
 * @stacked-example(Auto focus, dialog/dialog-auto-focus.component)
 * */
var NbDialogService = /** @class */ (function () {
    function NbDialogService(document, globalConfig, positionBuilder, overlay, injector, cfr) {
        this.document = document;
        this.globalConfig = globalConfig;
        this.positionBuilder = positionBuilder;
        this.overlay = overlay;
        this.injector = injector;
        this.cfr = cfr;
    }
    /**
     * Opens new instance of the dialog, may receive optional config.
     * */
    NbDialogService.prototype.open = function (content, userConfig) {
        if (userConfig === void 0) { userConfig = {}; }
        var config = new NbDialogConfig(__assign$2({}, this.globalConfig, userConfig));
        var overlayRef = this.createOverlay(config);
        var dialogRef = new NbDialogRef(overlayRef);
        var container = this.createContainer(config, overlayRef);
        this.createContent(config, content, container, dialogRef);
        this.registerCloseListeners(config, overlayRef, dialogRef);
        return dialogRef;
    };
    NbDialogService.prototype.createOverlay = function (config) {
        var positionStrategy = this.createPositionStrategy();
        var scrollStrategy = this.createScrollStrategy(config.hasScroll);
        return this.overlay.create({
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
        });
    };
    NbDialogService.prototype.createPositionStrategy = function () {
        return this.positionBuilder
            .global()
            .centerVertically()
            .centerHorizontally();
    };
    NbDialogService.prototype.createScrollStrategy = function (hasScroll) {
        if (hasScroll) {
            return this.overlay.scrollStrategies.noop();
        }
        else {
            return this.overlay.scrollStrategies.block();
        }
    };
    NbDialogService.prototype.createContainer = function (config, overlayRef) {
        var injector = new NbPortalInjector(this.createInjector(config), new WeakMap([[NbDialogConfig, config]]));
        var containerPortal = new NbComponentPortal(NbDialogContainerComponent, null, injector, this.cfr);
        var containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    };
    NbDialogService.prototype.createContent = function (config, content, container, dialogRef) {
        if (content instanceof TemplateRef) {
            var portal = this.createTemplatePortal(config, content, dialogRef);
            container.attachTemplatePortal(portal);
        }
        else {
            var portal = this.createComponentPortal(config, content, dialogRef);
            dialogRef.componentRef = container.attachComponentPortal(portal);
            if (config.context) {
                Object.assign(dialogRef.componentRef.instance, __assign$2({}, config.context));
            }
        }
    };
    NbDialogService.prototype.createTemplatePortal = function (config, content, dialogRef) {
        return new NbTemplatePortal(content, null, { $implicit: config.context, dialogRef: dialogRef });
    };
    /**
     * We're creating portal with custom injector provided through config or using global injector.
     * This approach provides us capability inject `NbDialogRef` in dialog component.
     * */
    NbDialogService.prototype.createComponentPortal = function (config, content, dialogRef) {
        var injector = this.createInjector(config);
        var portalInjector = new NbPortalInjector(injector, new WeakMap([[NbDialogRef, dialogRef]]));
        return new NbComponentPortal(content, config.viewContainerRef, portalInjector);
    };
    NbDialogService.prototype.createInjector = function (config) {
        return config.viewContainerRef && config.viewContainerRef.injector || this.injector;
    };
    NbDialogService.prototype.registerCloseListeners = function (config, overlayRef, dialogRef) {
        if (config.closeOnBackdropClick) {
            overlayRef.backdropClick().subscribe(function () { return dialogRef.close(); });
        }
        if (config.closeOnEsc) {
            fromEvent(this.document, 'keyup')
                .pipe(filter(function (event) { return event.keyCode === 27; }))
                .subscribe(function () { return dialogRef.close(); });
        }
    };
    NbDialogService = __decorate$123([
        Injectable(),
        __param$17(0, Inject(NB_DOCUMENT)),
        __param$17(1, Inject(NB_DIALOG_CONFIG)),
        __metadata$81("design:paramtypes", [Object, Object, NbPositionBuilderService,
            NbOverlayService,
            Injector,
            ComponentFactoryResolver])
    ], NbDialogService);
    return NbDialogService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$125 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbDialogModule = /** @class */ (function () {
    function NbDialogModule() {
    }
    NbDialogModule_1 = NbDialogModule;
    NbDialogModule.forRoot = function (dialogConfig) {
        if (dialogConfig === void 0) { dialogConfig = {}; }
        return {
            ngModule: NbDialogModule_1,
            providers: [
                NbDialogService,
                { provide: NB_DIALOG_CONFIG, useValue: dialogConfig },
            ],
        };
    };
    NbDialogModule.forChild = function (dialogConfig) {
        if (dialogConfig === void 0) { dialogConfig = {}; }
        return {
            ngModule: NbDialogModule_1,
            providers: [
                NbDialogService,
                { provide: NB_DIALOG_CONFIG, useValue: dialogConfig },
            ],
        };
    };
    var NbDialogModule_1;
    NbDialogModule = NbDialogModule_1 = __decorate$125([
        NgModule({
            imports: [NbSharedModule, NbOverlayModule],
            declarations: [NbDialogContainerComponent],
            entryComponents: [NbDialogContainerComponent],
        })
    ], NbDialogModule);
    return NbDialogModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NbToast = /** @class */ (function () {
    function NbToast() {
    }
    return NbToast;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$129 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$85 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The `NbToastComponent` is responsible for rendering each toast with appropriate styles.
 *
 * @styles
 *
 * toastr-background-color:
 * toastr-border-color:
 * toastr-border-style:
 * toastr-border-width:
 * toastr-border-radius:
 * toastr-padding:
 * toastr-shadow:
 * toastr-text-color:
 * toastr-text-font-family:
 * toastr-text-font-size:
 * toastr-text-font-weight:
 * toastr-text-line-height:
 * toastr-title-text-font-family:
 * toastr-title-text-font-size:
 * toastr-title-text-font-weight:
 * toastr-title-text-line-height:
 * toastr-destroyable-hover-background-color:
 * toastr-destroyable-hover-border-color:
 * toastr-primary-background-color:
 * toastr-primary-border-color:
 * toastr-primary-text-color:
 * toastr-icon-primary-background-color:
 * toastr-icon-primary-color:
 * toastr-destroyable-hover-primary-background-color:
 * toastr-destroyable-hover-primary-border-color:
 * toastr-success-background-color:
 * toastr-success-border-color:
 * toastr-success-text-color:
 * toastr-icon-success-background-color:
 * toastr-icon-success-color:
 * toastr-destroyable-hover-success-background-color:
 * toastr-destroyable-hover-success-border-color:
 * toastr-info-background-color:
 * toastr-info-border-color:
 * toastr-info-text-color:
 * toastr-icon-info-background-color:
 * toastr-icon-info-color:
 * toastr-destroyable-hover-info-background-color:
 * toastr-destroyable-hover-info-border-color:
 * toastr-warning-background-color:
 * toastr-warning-border-color:
 * toastr-warning-text-color:
 * toastr-icon-warning-background-color:
 * toastr-icon-warning-color:
 * toastr-destroyable-hover-warning-background-color:
 * toastr-destroyable-hover-warning-border-color:
 * toastr-danger-background-color:
 * toastr-danger-border-color:
 * toastr-danger-text-color:
 * toastr-icon-danger-background-color:
 * toastr-icon-danger-color:
 * toastr-destroyable-hover-danger-background-color:
 * toastr-destroyable-hover-danger-border-color:
 * */
var NbToastComponent = /** @class */ (function () {
    function NbToastComponent() {
        this.destroy = new EventEmitter();
    }
    Object.defineProperty(NbToastComponent.prototype, "success", {
        get: function () {
            return this.toast.config.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "info", {
        get: function () {
            return this.toast.config.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "warning", {
        get: function () {
            return this.toast.config.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "primary", {
        get: function () {
            return this.toast.config.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "danger", {
        get: function () {
            return this.toast.config.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "destroyByClick", {
        get: function () {
            return this.toast.config.destroyByClick;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "hasIcon", {
        get: function () {
            return this.toast.config.hasIcon && !!this.toast.config.status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "customIcon", {
        get: function () {
            return !!this.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "icon", {
        get: function () {
            return this.toast.config.icon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbToastComponent.prototype, "iconPack", {
        get: function () {
            return this.toast.config.iconPack;
        },
        enumerable: true,
        configurable: true
    });
    NbToastComponent.prototype.onClick = function () {
        this.destroy.emit();
    };
    __decorate$129([
        Input(),
        __metadata$85("design:type", NbToast)
    ], NbToastComponent.prototype, "toast", void 0);
    __decorate$129([
        Output(),
        __metadata$85("design:type", EventEmitter)
    ], NbToastComponent.prototype, "destroy", void 0);
    __decorate$129([
        HostBinding('class.status-success'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "success", null);
    __decorate$129([
        HostBinding('class.status-info'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "info", null);
    __decorate$129([
        HostBinding('class.status-warning'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "warning", null);
    __decorate$129([
        HostBinding('class.status-primary'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "primary", null);
    __decorate$129([
        HostBinding('class.status-danger'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "danger", null);
    __decorate$129([
        HostBinding('class.destroy-by-click'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "destroyByClick", null);
    __decorate$129([
        HostBinding('class.has-icon'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "hasIcon", null);
    __decorate$129([
        HostBinding('class.custom-icon'),
        __metadata$85("design:type", Boolean),
        __metadata$85("design:paramtypes", [])
    ], NbToastComponent.prototype, "customIcon", null);
    __decorate$129([
        HostListener('click'),
        __metadata$85("design:type", Function),
        __metadata$85("design:paramtypes", []),
        __metadata$85("design:returntype", void 0)
    ], NbToastComponent.prototype, "onClick", null);
    NbToastComponent = __decorate$129([
        Component({
            selector: 'nb-toast',
            template: "<div class=\"icon-container\" *ngIf=\"hasIcon && icon\">\n  <nb-icon [icon]=\"icon\" [pack]=\"iconPack\"></nb-icon>\n</div>\n<div class=\"content-container\">\n  <span class=\"title\">{{ toast.title }}</span>\n  <div class=\"message\">{{ toast.message }}</div>\n</div>\n",
            styles: [":host{display:flex;align-items:center;width:25rem;margin:0.5rem}:host .title{font-weight:800;margin-right:0.25rem}:host>.content-container{line-height:1.25}:host>.content-container>.message{font-weight:300}:host.default .content-container,:host:not(.has-icon) .content-container{display:flex;flex-direction:row}:host.destroy-by-click{cursor:pointer}:host nb-icon{font-size:2.5rem}:host svg{width:2.5rem;height:2.5rem}\n"]
        })
    ], NbToastComponent);
    return NbToastComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$128 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$84 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var voidState = style({
    transform: 'translateX({{ direction }}110%)',
    height: 0,
    marginLeft: '0',
    marginRight: '0',
    marginTop: '0',
    marginBottom: '0',
});
var defaultOptions = { params: { direction: '' } };
var NbToastrContainerComponent = /** @class */ (function () {
    function NbToastrContainerComponent(layoutDirection, positionHelper) {
        this.layoutDirection = layoutDirection;
        this.positionHelper = positionHelper;
        this.content = [];
        this.alive = true;
    }
    NbToastrContainerComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.layoutDirection.onDirectionChange()
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.onDirectionChange(); });
    };
    NbToastrContainerComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbToastrContainerComponent.prototype.onDirectionChange = function () {
        var direction = this.positionHelper.isRightPosition(this.position) ? '' : '-';
        this.fadeIn = { value: '', params: { direction: direction } };
    };
    __decorate$128([
        Input(),
        __metadata$84("design:type", Array)
    ], NbToastrContainerComponent.prototype, "content", void 0);
    __decorate$128([
        Input(),
        __metadata$84("design:type", Object)
    ], NbToastrContainerComponent.prototype, "context", void 0);
    __decorate$128([
        Input(),
        __metadata$84("design:type", String)
    ], NbToastrContainerComponent.prototype, "position", void 0);
    __decorate$128([
        ViewChildren(NbToastComponent),
        __metadata$84("design:type", QueryList)
    ], NbToastrContainerComponent.prototype, "toasts", void 0);
    NbToastrContainerComponent = __decorate$128([
        Component({
            selector: 'nb-toastr-container',
            template: "\n    <nb-toast [@fadeIn]=\"fadeIn\" *ngFor=\"let toast of content\" [toast]=\"toast\"></nb-toast>",
            animations: [
                trigger('fadeIn', [
                    transition(':enter', [voidState, animate(100)], defaultOptions),
                    transition(':leave', [animate(100, voidState)], defaultOptions),
                ]),
            ]
        }),
        __metadata$84("design:paramtypes", [NbLayoutDirectionService,
            NbPositionHelper])
    ], NbToastrContainerComponent);
    return NbToastrContainerComponent;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_TOASTR_CONFIG = new InjectionToken('Default toastr options');
/**
 * The `NbToastrConfig` class describes configuration of the `NbToastrService.show` and global toastr configuration.
 * */
var NbToastrConfig = /** @class */ (function () {
    function NbToastrConfig(config) {
        /**
         * Determines where on the screen toast have to be rendered.
         * */
        this.position = NbGlobalLogicalPosition.TOP_END;
        /**
         * Status chooses color scheme for the toast.
         * */
        this.status = 'primary';
        /**
         * Duration is timeout between toast appears and disappears.
         * */
        this.duration = 3000;
        /**
         * Destroy by click means you can hide the toast by clicking it.
         * */
        this.destroyByClick = true;
        /**
         * If preventDuplicates is true then the next toast with the same title and message will not be rendered.
         * */
        this.preventDuplicates = false;
        /**
         * Determines render icon or not.
         * */
        this.hasIcon = true;
        /**
         * Icon name that can be provided to render custom icon.
         * */
        this.icon = 'email';
        /**
         * Toast status icon-class mapping.
         * */
        this.icons = {
            danger: 'flash-outline',
            success: 'checkmark-outline',
            info: 'question-mark-outline',
            warning: 'alert-triangle-outline',
            primary: 'email-outline',
        };
        this.patchIcon(config);
        Object.assign(this, config);
    }
    NbToastrConfig.prototype.patchIcon = function (config) {
        if (!('icon' in config)) {
            config.icon = this.icons[config.status || 'primary'];
            config.iconPack = 'nebular-essentials';
        }
    };
    return NbToastrConfig;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __assign$3 = (this && this.__assign) || function () {
    __assign$3 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$3.apply(this, arguments);
};
var __decorate$127 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$83 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$18 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbToastRef = /** @class */ (function () {
    function NbToastRef(toastContainer, toast) {
        this.toastContainer = toastContainer;
        this.toast = toast;
    }
    NbToastRef.prototype.close = function () {
        this.toastContainer.destroy(this.toast);
    };
    return NbToastRef;
}());
var NbToastContainer = /** @class */ (function () {
    function NbToastContainer(position, containerRef, positionHelper) {
        this.position = position;
        this.containerRef = containerRef;
        this.positionHelper = positionHelper;
        this.toasts = [];
    }
    Object.defineProperty(NbToastContainer.prototype, "nativeElement", {
        get: function () {
            return this.containerRef.location.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    NbToastContainer.prototype.attach = function (toast) {
        if (toast.config.preventDuplicates && this.isDuplicate(toast)) {
            return;
        }
        var toastComponent = this.attachToast(toast);
        if (toast.config.destroyByClick) {
            this.subscribeOnClick(toastComponent, toast);
        }
        if (toast.config.duration) {
            this.setDestroyTimeout(toast);
        }
        this.prevToast = toast;
        return new NbToastRef(this, toast);
    };
    NbToastContainer.prototype.destroy = function (toast) {
        this.toasts = this.toasts.filter(function (t) { return t !== toast; });
        this.updateContainer();
    };
    NbToastContainer.prototype.isDuplicate = function (toast) {
        return this.prevToast
            && this.prevToast.message === toast.message
            && this.prevToast.title === toast.title;
    };
    NbToastContainer.prototype.attachToast = function (toast) {
        if (this.positionHelper.isTopPosition(toast.config.position)) {
            return this.attachToTop(toast);
        }
        else {
            return this.attachToBottom(toast);
        }
    };
    NbToastContainer.prototype.attachToTop = function (toast) {
        this.toasts.unshift(toast);
        this.updateContainer();
        return this.containerRef.instance.toasts.first;
    };
    NbToastContainer.prototype.attachToBottom = function (toast) {
        this.toasts.push(toast);
        this.updateContainer();
        return this.containerRef.instance.toasts.last;
    };
    NbToastContainer.prototype.setDestroyTimeout = function (toast) {
        var _this = this;
        setTimeout(function () { return _this.destroy(toast); }, toast.config.duration);
    };
    NbToastContainer.prototype.subscribeOnClick = function (toastComponent, toast) {
        var _this = this;
        toastComponent.destroy.subscribe(function () { return _this.destroy(toast); });
    };
    NbToastContainer.prototype.updateContainer = function () {
        patch(this.containerRef, { content: this.toasts, position: this.position });
    };
    return NbToastContainer;
}());
var NbToastrContainerRegistry = /** @class */ (function () {
    function NbToastrContainerRegistry(overlay, positionBuilder, positionHelper, cfr, document) {
        this.overlay = overlay;
        this.positionBuilder = positionBuilder;
        this.positionHelper = positionHelper;
        this.cfr = cfr;
        this.document = document;
        this.overlays = new Map();
    }
    NbToastrContainerRegistry.prototype.get = function (position) {
        var logicalPosition = this.positionHelper.toLogicalPosition(position);
        var container = this.overlays.get(logicalPosition);
        if (!container || !this.existsInDom(container)) {
            this.instantiateContainer(logicalPosition);
        }
        return this.overlays.get(logicalPosition);
    };
    NbToastrContainerRegistry.prototype.instantiateContainer = function (position) {
        var container = this.createContainer(position);
        this.overlays.set(position, container);
    };
    NbToastrContainerRegistry.prototype.createContainer = function (position) {
        var positionStrategy = this.positionBuilder.global().position(position);
        var ref = this.overlay.create({ positionStrategy: positionStrategy });
        var containerRef = ref.attach(new NbComponentPortal(NbToastrContainerComponent, null, null, this.cfr));
        return new NbToastContainer(position, containerRef, this.positionHelper);
    };
    NbToastrContainerRegistry.prototype.existsInDom = function (toastContainer) {
        return this.document.contains(toastContainer.nativeElement);
    };
    NbToastrContainerRegistry = __decorate$127([
        Injectable(),
        __param$18(4, Inject(NB_DOCUMENT)),
        __metadata$83("design:paramtypes", [NbOverlayService,
            NbPositionBuilderService,
            NbPositionHelper,
            ComponentFactoryResolver, Object])
    ], NbToastrContainerRegistry);
    return NbToastrContainerRegistry;
}());
/**
 * The `NbToastrService` provides a capability to build toast notifications.
 *
 * @stacked-example(Showcase, toastr/toastr-showcase.component)
 *
 * `NbToastrService.show(message, title, config)` accepts three params, title and config are optional.
 *
 * ### Installation
 *
 * Import `NbToastrModule.forRoot()` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbToastrModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * ### Usage
 *
 * Calling `NbToastrService.show(...)` will render new toast and return `NbToastrRef` with
 * help of which you may close newly created toast by calling `close` method.
 *
 * ```ts
 * const toastRef: NbToastRef = this.toastrService.show(...);
 * toastRef.close();
 * ```
 *
 * Config accepts following options:
 *
 * `position` - determines where on the screen toast will be rendered.
 * Default is `top-end`.
 *
 * @stacked-example(Position, toastr/toastr-positions.component)
 *
 * `status` - coloring and icon of the toast.
 * Default is `primary`
 *
 * @stacked-example(Status, toastr/toastr-statuses.component)
 *
 * `duration` - the time after which the toast will be destroyed.
 * `0` means endless toast, that may be destroyed by click only.
 * Default is 3000 ms.
 *
 * @stacked-example(Duration, toastr/toastr-duration.component)
 *
 * `destroyByClick` - provides a capability to destroy toast by click.
 * Default is true.
 *
 * @stacked-example(Destroy by click, toastr/toastr-destroy-by-click.component)
 *
 * `preventDuplicates` - don't create new toast if it has the same title and the same message with previous one.
 * Default is false.
 *
 * @stacked-example(Prevent duplicates, toastr/toastr-prevent-duplicates.component)
 *
 * `hasIcon` - if true then render toast icon.
 * `icon` - you can pass icon class that will be applied into the toast.
 *
 * @stacked-example(Has icon, toastr/toastr-icon.component)
 * */
var NbToastrService = /** @class */ (function () {
    function NbToastrService(globalConfig, containerRegistry) {
        this.globalConfig = globalConfig;
        this.containerRegistry = containerRegistry;
    }
    /**
     * Shows toast with message, title and user config.
     * */
    NbToastrService.prototype.show = function (message, title, userConfig) {
        var config = new NbToastrConfig(__assign$3({}, this.globalConfig, userConfig));
        var container = this.containerRegistry.get(config.position);
        var toast = { message: message, title: title, config: config };
        return container.attach(toast);
    };
    /**
     * Shows success toast with message, title and user config.
     * */
    NbToastrService.prototype.success = function (message, title, config) {
        return this.show(message, title, __assign$3({}, config, { status: 'success' }));
    };
    /**
     * Shows info toast with message, title and user config.
     * */
    NbToastrService.prototype.info = function (message, title, config) {
        return this.show(message, title, __assign$3({}, config, { status: 'info' }));
    };
    /**
     * Shows warning toast with message, title and user config.
     * */
    NbToastrService.prototype.warning = function (message, title, config) {
        return this.show(message, title, __assign$3({}, config, { status: 'warning' }));
    };
    /**
     * Shows primary toast with message, title and user config.
     * */
    NbToastrService.prototype.primary = function (message, title, config) {
        return this.show(message, title, __assign$3({}, config, { status: 'primary' }));
    };
    /**
     * Shows danger toast with message, title and user config.
     * */
    NbToastrService.prototype.danger = function (message, title, config) {
        return this.show(message, title, __assign$3({}, config, { status: 'danger' }));
    };
    /**
     * Shows default toast with message, title and user config.
     * */
    NbToastrService.prototype.default = function (message, title, config) {
        return this.show(message, title, __assign$3({}, config, { status: '' }));
    };
    NbToastrService = __decorate$127([
        Injectable(),
        __param$18(0, Inject(NB_TOASTR_CONFIG)),
        __metadata$83("design:paramtypes", [NbToastrConfig,
            NbToastrContainerRegistry])
    ], NbToastrService);
    return NbToastrService;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$126 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbToastrModule = /** @class */ (function () {
    function NbToastrModule() {
    }
    NbToastrModule_1 = NbToastrModule;
    NbToastrModule.forRoot = function (toastrConfig) {
        if (toastrConfig === void 0) { toastrConfig = {}; }
        return {
            ngModule: NbToastrModule_1,
            providers: [
                NbToastrService,
                NbToastrContainerRegistry,
                { provide: NB_TOASTR_CONFIG, useValue: toastrConfig },
            ],
        };
    };
    var NbToastrModule_1;
    NbToastrModule = NbToastrModule_1 = __decorate$126([
        NgModule({
            imports: [NbSharedModule, NbOverlayModule, NbIconModule],
            declarations: [NbToastrContainerComponent, NbToastComponent],
            entryComponents: [NbToastrContainerComponent, NbToastComponent],
        })
    ], NbToastrModule);
    return NbToastrModule;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$131 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$86 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Tooltip container.
 * Renders provided tooltip inside.
 *
 * @styles
 *
 * tooltip-background-color:
 * tooltip-border-color:
 * tooltip-border-style:
 * tooltip-border-width:
 * tooltip-border-radius:
 * tooltip-padding:
 * tooltip-text-color:
 * tooltip-text-font-family:
 * tooltip-text-font-size:
 * tooltip-text-font-weight:
 * tooltip-text-line-height:
 * tooltip-max-width:
 * tooltip-primary-background-color:
 * tooltip-primary-text-color:
 * tooltip-info-background-color:
 * tooltip-info-text-color:
 * tooltip-success-background-color:
 * tooltip-success-text-color:
 * tooltip-warning-background-color:
 * tooltip-warning-text-color:
 * tooltip-danger-background-color:
 * tooltip-danger-text-color:
 * tooltip-shadow:
 */
var NbTooltipComponent = /** @class */ (function () {
    function NbTooltipComponent() {
        /**
         * Popover position relatively host element.
         * */
        this.position = NbPosition.TOP;
        this.context = {};
    }
    Object.defineProperty(NbTooltipComponent.prototype, "binding", {
        get: function () {
            return this.position + " " + this.statusClass;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTooltipComponent.prototype, "show", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTooltipComponent.prototype, "statusClass", {
        get: function () {
            return this.context.status ? "status-" + this.context.status : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * The method is empty since we don't need to do anything additionally
     * render is handled by change detection
     */
    NbTooltipComponent.prototype.renderContent = function () { };
    __decorate$131([
        Input(),
        __metadata$86("design:type", String)
    ], NbTooltipComponent.prototype, "content", void 0);
    __decorate$131([
        Input(),
        __metadata$86("design:type", String)
    ], NbTooltipComponent.prototype, "position", void 0);
    __decorate$131([
        HostBinding('class'),
        __metadata$86("design:type", Object),
        __metadata$86("design:paramtypes", [])
    ], NbTooltipComponent.prototype, "binding", null);
    __decorate$131([
        HostBinding('@showTooltip'),
        __metadata$86("design:type", Object),
        __metadata$86("design:paramtypes", [])
    ], NbTooltipComponent.prototype, "show", null);
    __decorate$131([
        Input(),
        __metadata$86("design:type", Object)
    ], NbTooltipComponent.prototype, "context", void 0);
    NbTooltipComponent = __decorate$131([
        Component({
            selector: 'nb-tooltip',
            template: "\n    <span class=\"arrow\"></span>\n    <div class=\"content\">\n      <nb-icon *ngIf=\"context?.icon\" [icon]=\"context.icon\"></nb-icon>\n      <span *ngIf=\"content\">{{ content }}</span>\n    </div>\n  ",
            animations: [
                trigger('showTooltip', [
                    state('in', style({ opacity: 1 })),
                    transition('void => *', [
                        style({ opacity: 0 }),
                        animate(100),
                    ]),
                    transition('* => void', [
                        animate(100, style({ opacity: 0 })),
                    ]),
                ]),
            ],
            styles: [":host{z-index:10000}:host .content{display:flex;align-items:center}:host.right .content{flex-direction:row-reverse}:host .arrow{position:absolute;width:0;height:0}:host nb-icon{font-size:1.1em;min-width:1em}:host nb-icon+span{margin-left:0.5rem}:host.right nb-icon+span{margin-right:0.5rem}:host .arrow{border-left:6px solid transparent;border-right:6px solid transparent}:host.bottom .arrow{top:-6px;left:calc(50% - 6px)}:host.left .arrow{right:-8px;top:calc(50% - 2.4px);transform:rotate(90deg)}:host.top .arrow{bottom:-6px;left:calc(50% - 6px);transform:rotate(180deg)}:host.right .arrow{left:-8px;top:calc(50% - 2.4px);transform:rotate(270deg)}\n"]
        })
    ], NbTooltipComponent);
    return NbTooltipComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$132 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$87 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 *
 * Tooltip directive for small text/icon hints.
 *
 * ### Installation
 *
 * Import `NbTooltipModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTooltipModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * @stacked-example(Showcase, tooltip/tooltip-showcase.component)
 *
 * Tooltip can accept a hint text and/or an icon:
 * @stacked-example(With Icon, tooltip/tooltip-with-icon.component)
 *
 * Same way as Popover, tooltip can accept placement position with `nbTooltipPlacement` property:
 * @stacked-example(Placements, tooltip/tooltip-placements.component)
 *
 * It is also possible to specify tooltip color using `nbTooltipStatus` property:
 * @stacked-example(Colored Tooltips, tooltip/tooltip-colors.component)
 *
 * Tooltip has a number of triggers which provides an ability to show and hide the component in different ways:
 *
 * - Click mode shows the component when a user clicks on the host element and hides when the user clicks
 * somewhere on the document outside the component.
 * - Hint provides capability to show the component when the user hovers over the host element
 * and hide when the user hovers out of the host.
 * - Hover works like hint mode with one exception - when the user moves mouse from host element to
 * the container element the component remains open, so that it is possible to interact with it content.
 * - Focus mode is applied when user focuses the element.
 * - Noop mode - the component won't react to the user interaction.
 */
var NbTooltipDirective = /** @class */ (function () {
    function NbTooltipDirective(hostRef, dynamicOverlayHandler) {
        this.hostRef = hostRef;
        this.dynamicOverlayHandler = dynamicOverlayHandler;
        this.context = {};
        /**
         * Position will be calculated relatively host element based on the position.
         * Can be top, right, bottom, left, start or end.
         */
        this.position = NbPosition.TOP;
        /**
         * Container position will be changes automatically based on this strategy if container can't fit view port.
         * Set this property to any falsy value if you want to disable automatically adjustment.
         * Available values: clockwise, counterclockwise.
         */
        this.adjustment = NbAdjustment.CLOCKWISE;
        /**
         * Describes when the container will be shown.
         * Available options: `click`, `hover`, `hint`, `focus` and `noop`
         * */
        this.trigger = NbTrigger.HINT;
    }
    Object.defineProperty(NbTooltipDirective.prototype, "icon", {
        /**
         *
         * @param {string} icon
         */
        set: function (icon) {
            this.context = Object.assign(this.context, { icon: icon });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTooltipDirective.prototype, "status", {
        /**
         *
         * @param {string} status
         */
        set: function (status) {
            this.context = Object.assign(this.context, { status: status });
        },
        enumerable: true,
        configurable: true
    });
    NbTooltipDirective.prototype.ngOnInit = function () {
        this.dynamicOverlayHandler
            .host(this.hostRef)
            .componentType(NbTooltipComponent)
            .offset(8);
    };
    NbTooltipDirective.prototype.ngOnChanges = function () {
        this.rebuild();
    };
    NbTooltipDirective.prototype.ngAfterViewInit = function () {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .build();
    };
    NbTooltipDirective.prototype.rebuild = function () {
        this.dynamicOverlay = this.configureDynamicOverlay()
            .rebuild();
    };
    NbTooltipDirective.prototype.show = function () {
        this.dynamicOverlay.show();
    };
    NbTooltipDirective.prototype.hide = function () {
        this.dynamicOverlay.hide();
    };
    NbTooltipDirective.prototype.toggle = function () {
        this.dynamicOverlay.toggle();
    };
    NbTooltipDirective.prototype.ngOnDestroy = function () {
        this.dynamicOverlayHandler.destroy();
    };
    NbTooltipDirective.prototype.configureDynamicOverlay = function () {
        return this.dynamicOverlayHandler
            .position(this.position)
            .trigger(this.trigger)
            .adjustment(this.adjustment)
            .content(this.content)
            .context(this.context);
    };
    __decorate$132([
        Input('nbTooltip'),
        __metadata$87("design:type", String)
    ], NbTooltipDirective.prototype, "content", void 0);
    __decorate$132([
        Input('nbTooltipPlacement'),
        __metadata$87("design:type", String)
    ], NbTooltipDirective.prototype, "position", void 0);
    __decorate$132([
        Input('nbTooltipAdjustment'),
        __metadata$87("design:type", String)
    ], NbTooltipDirective.prototype, "adjustment", void 0);
    __decorate$132([
        Input('nbTooltipIcon'),
        __metadata$87("design:type", String),
        __metadata$87("design:paramtypes", [String])
    ], NbTooltipDirective.prototype, "icon", null);
    __decorate$132([
        Input('nbTooltipStatus'),
        __metadata$87("design:type", String),
        __metadata$87("design:paramtypes", [String])
    ], NbTooltipDirective.prototype, "status", null);
    __decorate$132([
        Input('nbTooltipTrigger'),
        __metadata$87("design:type", String)
    ], NbTooltipDirective.prototype, "trigger", void 0);
    NbTooltipDirective = __decorate$132([
        Directive({
            selector: '[nbTooltip]',
            providers: [NbDynamicOverlayHandler, NbDynamicOverlay],
        }),
        __metadata$87("design:paramtypes", [ElementRef,
            NbDynamicOverlayHandler])
    ], NbTooltipDirective);
    return NbTooltipDirective;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$130 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbTooltipModule = /** @class */ (function () {
    function NbTooltipModule() {
    }
    NbTooltipModule = __decorate$130([
        NgModule({
            imports: [NbSharedModule, NbOverlayModule, NbIconModule],
            declarations: [NbTooltipComponent, NbTooltipDirective],
            exports: [NbTooltipDirective],
            entryComponents: [NbTooltipComponent],
        })
    ], NbTooltipModule);
    return NbTooltipModule;
}());

var __extends$20 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var NbFocusKeyManager = /** @class */ (function (_super) {
    __extends$20(NbFocusKeyManager, _super);
    function NbFocusKeyManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NbFocusKeyManager;
}(FocusKeyManager));

var NB_SELECT_INJECTION_TOKEN = new InjectionToken('NB_SELECT_INJECTION_TOKEN');

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$135 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$89 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$20 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbOptionComponent = /** @class */ (function () {
    function NbOptionComponent(parent, elementRef, cd) {
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
    Object.defineProperty(NbOptionComponent.prototype, "disabled", {
        get: function () {
            return this._disabled || this.disabledByGroup;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionComponent.prototype, "click", {
        get: function () {
            return this.click$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NbOptionComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    Object.defineProperty(NbOptionComponent.prototype, "withCheckbox", {
        /**
         * Determines should we render checkbox.
         * */
        get: function () {
            return this.multiple && this.value != null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionComponent.prototype, "content", {
        get: function () {
            return this.elementRef.nativeElement.textContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionComponent.prototype, "multiple", {
        get: function () {
            return this.parent.multiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionComponent.prototype, "selectedClass", {
        get: function () {
            return this.selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionComponent.prototype, "disabledAttribute", {
        get: function () {
            return this.disabled ? '' : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionComponent.prototype, "tabindex", {
        get: function () {
            return '-1';
        },
        enumerable: true,
        configurable: true
    });
    NbOptionComponent.prototype.onClick = function (event) {
        this.click$.next(this);
        // Prevent scroll on space click, etc.
        event.preventDefault();
    };
    NbOptionComponent.prototype.select = function () {
        this.setSelection(true);
    };
    NbOptionComponent.prototype.deselect = function () {
        this.setSelection(false);
    };
    /**
     * Sets disabled by group state and marks component for check.
     */
    NbOptionComponent.prototype.setDisabledByGroupState = function (disabled) {
        if (this.disabledByGroup !== disabled) {
            this.disabledByGroup = disabled;
            this.cd.markForCheck();
        }
    };
    NbOptionComponent.prototype.setSelection = function (selected) {
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
    };
    NbOptionComponent.prototype.focus = function () {
        this.elementRef.nativeElement.focus();
    };
    NbOptionComponent.prototype.getLabel = function () {
        return this.content;
    };
    __decorate$135([
        Input(),
        __metadata$89("design:type", Object)
    ], NbOptionComponent.prototype, "value", void 0);
    __decorate$135([
        Input(),
        __metadata$89("design:type", Boolean),
        __metadata$89("design:paramtypes", [Boolean])
    ], NbOptionComponent.prototype, "disabled", null);
    __decorate$135([
        Output(),
        __metadata$89("design:type", EventEmitter)
    ], NbOptionComponent.prototype, "selectionChange", void 0);
    __decorate$135([
        HostBinding('class.selected'),
        __metadata$89("design:type", Boolean),
        __metadata$89("design:paramtypes", [])
    ], NbOptionComponent.prototype, "selectedClass", null);
    __decorate$135([
        HostBinding('attr.disabled'),
        __metadata$89("design:type", String),
        __metadata$89("design:paramtypes", [])
    ], NbOptionComponent.prototype, "disabledAttribute", null);
    __decorate$135([
        HostBinding('tabIndex'),
        __metadata$89("design:type", Object),
        __metadata$89("design:paramtypes", [])
    ], NbOptionComponent.prototype, "tabindex", null);
    __decorate$135([
        HostListener('click', ['$event']),
        HostListener('keydown.space', ['$event']),
        HostListener('keydown.enter', ['$event']),
        __metadata$89("design:type", Function),
        __metadata$89("design:paramtypes", [Event]),
        __metadata$89("design:returntype", void 0)
    ], NbOptionComponent.prototype, "onClick", null);
    NbOptionComponent = __decorate$135([
        Component({
            selector: 'nb-option',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <nb-checkbox *ngIf=\"withCheckbox\"\n                 [value]=\"selected\"\n                 [disabled]=\"disabled\"\n                 aria-hidden=\"true\">\n    </nb-checkbox>\n    <ng-content></ng-content>\n  ",
            styles: ["/*!\n * @license\n * Copyright Akveo. All Rights Reserved.\n * Licensed under the MIT License. See License.txt in the project root for license information.\n */:host{display:flex;transition-duration:0.15s;transition-property:background-color,color;transition-timing-function:ease-in}:host:hover{cursor:pointer}:host nb-checkbox{display:flex;pointer-events:none}:host nb-checkbox ::ng-deep .label{padding:0}:host([disabled]){pointer-events:none}\n"]
        }),
        __param$20(0, Inject(NB_SELECT_INJECTION_TOKEN)),
        __metadata$89("design:paramtypes", [Object, ElementRef,
            ChangeDetectorRef])
    ], NbOptionComponent);
    return NbOptionComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$134 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$88 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$19 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbSelectLabelComponent = /** @class */ (function () {
    function NbSelectLabelComponent() {
    }
    NbSelectLabelComponent = __decorate$134([
        Component({
            selector: 'nb-select-label',
            template: '<ng-content></ng-content>'
        })
    ], NbSelectLabelComponent);
    return NbSelectLabelComponent;
}());
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
    __decorate$134([
        Input(),
        __metadata$88("design:type", String)
    ], NbSelectComponent.prototype, "size", void 0);
    __decorate$134([
        Input(),
        __metadata$88("design:type", String)
    ], NbSelectComponent.prototype, "status", void 0);
    __decorate$134([
        Input(),
        __metadata$88("design:type", String)
    ], NbSelectComponent.prototype, "shape", void 0);
    __decorate$134([
        Input(),
        __metadata$88("design:type", String)
    ], NbSelectComponent.prototype, "appearance", void 0);
    __decorate$134([
        Input(),
        HostBinding('class.appearance-outline'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "outline", null);
    __decorate$134([
        Input(),
        HostBinding('class.appearance-filled'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "filled", null);
    __decorate$134([
        Input(),
        HostBinding('class.appearance-hero'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "hero", null);
    __decorate$134([
        Input(),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "disabled", null);
    __decorate$134([
        Input(),
        HostBinding('class.full-width'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "fullWidth", null);
    __decorate$134([
        Input(),
        __metadata$88("design:type", String)
    ], NbSelectComponent.prototype, "placeholder", void 0);
    __decorate$134([
        Input(),
        __metadata$88("design:type", Object),
        __metadata$88("design:paramtypes", [Object])
    ], NbSelectComponent.prototype, "selected", null);
    __decorate$134([
        Input(),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [Boolean])
    ], NbSelectComponent.prototype, "multiple", null);
    __decorate$134([
        Output(),
        __metadata$88("design:type", EventEmitter)
    ], NbSelectComponent.prototype, "selectedChange", void 0);
    __decorate$134([
        ContentChildren(NbOptionComponent, { descendants: true }),
        __metadata$88("design:type", QueryList)
    ], NbSelectComponent.prototype, "options", void 0);
    __decorate$134([
        ContentChild(NbSelectLabelComponent, { static: false }),
        __metadata$88("design:type", Object)
    ], NbSelectComponent.prototype, "customLabel", void 0);
    __decorate$134([
        ViewChild(NbPortalDirective, { static: false }),
        __metadata$88("design:type", NbPortalDirective)
    ], NbSelectComponent.prototype, "portal", void 0);
    __decorate$134([
        ViewChild('selectButton', { read: ElementRef, static: false }),
        __metadata$88("design:type", ElementRef)
    ], NbSelectComponent.prototype, "button", void 0);
    __decorate$134([
        HostBinding('class.open'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "isOpen", null);
    __decorate$134([
        HostBinding('class.size-tiny'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "tiny", null);
    __decorate$134([
        HostBinding('class.size-small'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "small", null);
    __decorate$134([
        HostBinding('class.size-medium'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "medium", null);
    __decorate$134([
        HostBinding('class.size-large'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "large", null);
    __decorate$134([
        HostBinding('class.size-giant'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "giant", null);
    __decorate$134([
        HostBinding('class.status-primary'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "primary", null);
    __decorate$134([
        HostBinding('class.status-info'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "info", null);
    __decorate$134([
        HostBinding('class.status-success'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "success", null);
    __decorate$134([
        HostBinding('class.status-warning'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "warning", null);
    __decorate$134([
        HostBinding('class.status-danger'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "danger", null);
    __decorate$134([
        HostBinding('class.shape-rectangle'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "rectangle", null);
    __decorate$134([
        HostBinding('class.shape-round'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "round", null);
    __decorate$134([
        HostBinding('class.shape-semi-round'),
        __metadata$88("design:type", Boolean),
        __metadata$88("design:paramtypes", [])
    ], NbSelectComponent.prototype, "semiRound", null);
    NbSelectComponent = NbSelectComponent_1 = __decorate$134([
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
        __param$19(0, Inject(NB_DOCUMENT)),
        __metadata$88("design:paramtypes", [Object, NbOverlayService,
            ElementRef,
            NbPositionBuilderService,
            NbTriggerStrategyBuilderService,
            ChangeDetectorRef])
    ], NbSelectComponent);
    return NbSelectComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$136 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$90 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbOptionGroupComponent = /** @class */ (function () {
    function NbOptionGroupComponent() {
        this.alive = true;
        this._disabled = false;
    }
    Object.defineProperty(NbOptionGroupComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (value) {
            this._disabled = convertToBoolProperty(value);
            if (this.options) {
                this.updateOptionsDisabledState();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbOptionGroupComponent.prototype, "disabledAttribute", {
        get: function () {
            return this.disabled ? '' : null;
        },
        enumerable: true,
        configurable: true
    });
    NbOptionGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.options.length) {
            this.asyncUpdateOptionsDisabledState();
        }
        this.options.changes
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.asyncUpdateOptionsDisabledState(); });
    };
    NbOptionGroupComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    /**
     * Sets disabled state for each option to current group disabled state.
     */
    NbOptionGroupComponent.prototype.updateOptionsDisabledState = function () {
        var _this = this;
        this.options.forEach(function (option) { return option.setDisabledByGroupState(_this.disabled); });
    };
    /**
     * Updates options disabled state after promise resolution.
     * This way change detection will be triggered after options state updated.
     * Use this method when updating options during change detection run (e.g. QueryList.changes, lifecycle hooks).
     */
    NbOptionGroupComponent.prototype.asyncUpdateOptionsDisabledState = function () {
        var _this = this;
        Promise.resolve().then(function () { return _this.updateOptionsDisabledState(); });
    };
    __decorate$136([
        Input(),
        __metadata$90("design:type", String)
    ], NbOptionGroupComponent.prototype, "title", void 0);
    __decorate$136([
        Input(),
        __metadata$90("design:type", Boolean),
        __metadata$90("design:paramtypes", [Boolean])
    ], NbOptionGroupComponent.prototype, "disabled", null);
    __decorate$136([
        HostBinding('attr.disabled'),
        __metadata$90("design:type", String),
        __metadata$90("design:paramtypes", [])
    ], NbOptionGroupComponent.prototype, "disabledAttribute", null);
    __decorate$136([
        ContentChildren(NbOptionComponent, { descendants: true }),
        __metadata$90("design:type", QueryList)
    ], NbOptionGroupComponent.prototype, "options", void 0);
    NbOptionGroupComponent = __decorate$136([
        Component({
            selector: 'nb-option-group',
            changeDetection: ChangeDetectionStrategy.OnPush,
            template: "\n    <span class=\"option-group-title\">{{ title }}</span>\n    <ng-content select=\"nb-option, ng-container\"></ng-content>\n  ",
            styles: [":host{display:block}.option-group-title{display:block}\n"]
        })
    ], NbOptionGroupComponent);
    return NbOptionGroupComponent;
}());

var __decorate$133 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NB_SELECT_COMPONENTS = [
    NbSelectComponent,
    NbOptionComponent,
    NbOptionGroupComponent,
    NbSelectLabelComponent,
];
var NbSelectModule = /** @class */ (function () {
    function NbSelectModule() {
    }
    NbSelectModule = __decorate$133([
        NgModule({
            imports: [
                NbSharedModule,
                NbOverlayModule,
                NbButtonModule,
                NbInputModule,
                NbCardModule,
                NbCheckboxModule,
                NbIconModule,
            ],
            exports: NB_SELECT_COMPONENTS.slice(),
            declarations: NB_SELECT_COMPONENTS.slice(),
        })
    ], NbSelectModule);
    return NbSelectModule;
}());

var NbWindowState;
(function (NbWindowState) {
    NbWindowState["MINIMIZED"] = "minimized";
    NbWindowState["MAXIMIZED"] = "maximized";
    NbWindowState["FULL_SCREEN"] = "full-screen";
})(NbWindowState || (NbWindowState = {}));
/**
 * Window configuration options.
 */
var NbWindowConfig = /** @class */ (function () {
    function NbWindowConfig() {
        var configs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            configs[_i] = arguments[_i];
        }
        /**
         * Window title.
         */
        this.title = '';
        /**
         * Initial window state. Full screen by default.
         */
        this.initialState = NbWindowState.FULL_SCREEN;
        /**
         * If true than backdrop will be rendered behind window.
         * By default set to true.
         */
        this.hasBackdrop = true;
        /**
         * If set to true mouse clicks on backdrop will close a window.
         * Default is true.
         */
        this.closeOnBackdropClick = true;
        /**
         * If true then escape press will close a window.
         * Default is true.
         */
        this.closeOnEsc = true;
        /**
         * Class to be applied to the window.
         */
        this.windowClass = '';
        /**
         * Both, template and component may receive data through `config.context` property.
         * For components, this data will be set as component properties.
         * For templates, you can access it inside template as $implicit.
         */
        this.context = {};
        /**
         * Where the attached component should live in Angular's *logical* component tree.
         * This affects what is available for injection and the change detection order for the
         * component instantiated inside of the window. This does not affect where the window
         * content will be rendered.
         */
        this.viewContainerRef = null;
        Object.assign.apply(Object, [this].concat(configs));
    }
    return NbWindowConfig;
}());
var NB_WINDOW_CONTENT = new InjectionToken('Nebular Window Content');
var NB_WINDOW_CONFIG = new InjectionToken('Nebular Window Config');
var NB_WINDOW_CONTEXT = new InjectionToken('Nebular Window Context');

/**
 * The `NbWindowRef` helps to manipulate window after it was created.
 * The window can be dismissed by using `close` method of the windowRef.
 * You can access rendered component as `componentRef` property of the windowRef.
 */
var NbWindowRef = /** @class */ (function () {
    function NbWindowRef(config) {
        this.config = config;
        this.stateChange$ = new ReplaySubject(1);
        this._closed = false;
        this.closed$ = new Subject();
        this.state = config.initialState;
    }
    Object.defineProperty(NbWindowRef.prototype, "state", {
        /**
         * Current window state.
         */
        get: function () {
            return this.stateValue;
        },
        set: function (newState) {
            if (newState && this.stateValue !== newState) {
                this.prevStateValue = this.state;
                this.stateValue = newState;
                this.stateChange$.next({ oldState: this.prevStateValue, newState: newState });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbWindowRef.prototype, "stateChange", {
        /**
         * Emits when window state change.
         */
        get: function () {
            return this.stateChange$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbWindowRef.prototype, "onClose", {
        /**
         * Emits when window was closed.
         */
        get: function () {
            return this.closed$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Minimize window.
     */
    NbWindowRef.prototype.minimize = function () {
        this.state = NbWindowState.MINIMIZED;
    };
    /**
     * Maximize window.
     */
    NbWindowRef.prototype.maximize = function () {
        this.state = NbWindowState.MAXIMIZED;
    };
    /**
     * Set window on top.
     */
    NbWindowRef.prototype.fullScreen = function () {
        this.state = NbWindowState.FULL_SCREEN;
    };
    NbWindowRef.prototype.toPreviousState = function () {
        this.state = this.prevStateValue;
    };
    /**
     * Closes window.
     * */
    NbWindowRef.prototype.close = function () {
        if (this._closed) {
            return;
        }
        this._closed = true;
        this.componentRef.destroy();
        this.stateChange$.complete();
        this.closed$.next();
        this.closed$.complete();
    };
    return NbWindowRef;
}());

var __decorate$139 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$92 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbWindowsContainerComponent = /** @class */ (function () {
    function NbWindowsContainerComponent() {
    }
    __decorate$139([
        ViewChild('viewContainerRef', { read: ViewContainerRef, static: true }),
        __metadata$92("design:type", ViewContainerRef)
    ], NbWindowsContainerComponent.prototype, "viewContainerRef", void 0);
    NbWindowsContainerComponent = __decorate$139([
        Component({
            selector: 'nb-windows-container',
            template: "<ng-container #viewContainerRef></ng-container>",
            styles: [":host{display:flex;align-items:flex-end;overflow-x:auto}:host ::ng-deep nb-window:not(.full-screen){margin:0 2rem}\n"]
        })
    ], NbWindowsContainerComponent);
    return NbWindowsContainerComponent;
}());

var __decorate$140 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$93 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$22 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbWindowComponent = /** @class */ (function () {
    function NbWindowComponent(content, context, windowRef, config, focusTrapFactory, elementRef, renderer) {
        this.content = content;
        this.context = context;
        this.windowRef = windowRef;
        this.config = config;
        this.focusTrapFactory = focusTrapFactory;
        this.elementRef = elementRef;
        this.renderer = renderer;
    }
    Object.defineProperty(NbWindowComponent.prototype, "isFullScreen", {
        get: function () {
            return this.windowRef.state === NbWindowState.FULL_SCREEN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbWindowComponent.prototype, "maximized", {
        get: function () {
            return this.windowRef.state === NbWindowState.MAXIMIZED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbWindowComponent.prototype, "minimized", {
        get: function () {
            return this.windowRef.state === NbWindowState.MINIMIZED;
        },
        enumerable: true,
        configurable: true
    });
    NbWindowComponent.prototype.ngOnInit = function () {
        this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
        this.focusTrap.blurPreviouslyFocusedElement();
        this.focusTrap.focusInitialElement();
        if (this.config.windowClass) {
            this.renderer.addClass(this.elementRef.nativeElement, this.config.windowClass);
        }
    };
    NbWindowComponent.prototype.ngAfterViewChecked = function () {
        if (!this.overlayContainer || this.overlayContainer.isAttached) {
            return;
        }
        if (this.content instanceof TemplateRef) {
            this.attachTemplate();
        }
        else {
            this.attachComponent();
        }
    };
    NbWindowComponent.prototype.ngOnDestroy = function () {
        if (this.focusTrap) {
            this.focusTrap.restoreFocus();
        }
        this.close();
    };
    NbWindowComponent.prototype.minimize = function () {
        if (this.windowRef.state === NbWindowState.MINIMIZED) {
            this.windowRef.toPreviousState();
        }
        else {
            this.windowRef.minimize();
        }
    };
    NbWindowComponent.prototype.maximize = function () {
        this.windowRef.maximize();
    };
    NbWindowComponent.prototype.fullScreen = function () {
        this.windowRef.fullScreen();
    };
    NbWindowComponent.prototype.maximizeOrFullScreen = function () {
        if (this.windowRef.state === NbWindowState.MINIMIZED) {
            this.maximize();
        }
        else {
            this.fullScreen();
        }
    };
    NbWindowComponent.prototype.close = function () {
        this.windowRef.close();
    };
    NbWindowComponent.prototype.attachTemplate = function () {
        this.overlayContainer
            .attachTemplatePortal(new NbTemplatePortal(this.content, null, this.context));
    };
    NbWindowComponent.prototype.attachComponent = function () {
        var portal = new NbComponentPortal(this.content, null, null, this.cfr);
        var ref = this.overlayContainer.attachComponentPortal(portal, this.context);
        ref.changeDetectorRef.detectChanges();
    };
    __decorate$140([
        Input(),
        __metadata$93("design:type", ComponentFactoryResolver)
    ], NbWindowComponent.prototype, "cfr", void 0);
    __decorate$140([
        HostBinding('class.full-screen'),
        __metadata$93("design:type", Object),
        __metadata$93("design:paramtypes", [])
    ], NbWindowComponent.prototype, "isFullScreen", null);
    __decorate$140([
        HostBinding('class.maximized'),
        __metadata$93("design:type", Object),
        __metadata$93("design:paramtypes", [])
    ], NbWindowComponent.prototype, "maximized", null);
    __decorate$140([
        HostBinding('class.minimized'),
        __metadata$93("design:type", Object),
        __metadata$93("design:paramtypes", [])
    ], NbWindowComponent.prototype, "minimized", null);
    __decorate$140([
        ViewChild(NbOverlayContainerComponent, { static: false }),
        __metadata$93("design:type", NbOverlayContainerComponent)
    ], NbWindowComponent.prototype, "overlayContainer", void 0);
    NbWindowComponent = __decorate$140([
        Component({
            selector: 'nb-window',
            template: "\n    <nb-card>\n      <nb-card-header>\n        <div cdkFocusInitial class=\"title\" tabindex=\"-1\">{{ config.title }}</div>\n\n        <div class=\"buttons\">\n          <button nbButton ghost (click)=\"minimize()\">\n            <nb-icon icon=\"minus-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n          <button nbButton ghost *ngIf=\"isFullScreen\" (click)=\"maximize()\">\n            <nb-icon icon=\"collapse-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n          <button nbButton ghost *ngIf=\"minimized || maximized\" (click)=\"maximizeOrFullScreen()\">\n            <nb-icon icon=\"expand-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n          <button nbButton ghost (click)=\"close()\">\n            <nb-icon icon=\"close-outline\" pack=\"nebular-essentials\"></nb-icon>\n          </button>\n        </div>\n      </nb-card-header>\n      <nb-card-body *ngIf=\"maximized || isFullScreen\">\n        <nb-overlay-container></nb-overlay-container>\n      </nb-card-body>\n    </nb-card>\n  ",
            styles: [":host{flex:1 0 auto;min-width:20rem}:host nb-card{margin:0}:host nb-card-header{display:flex;justify-content:space-between;align-items:center;overflow:hidden}:host .title{flex:1 0 auto;margin-right:3rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}:host .buttons{width:9.5rem;display:flex;justify-content:space-evenly}:host .buttons [nbButton]{flex:0 0 3rem}:host(.full-screen){position:fixed;top:50%;left:50%;transform:translate(-50%, -50%)}:host(.maximized) nb-card{border-bottom-left-radius:0;border-bottom-right-radius:0}:host(.minimized) nb-card{border-bottom-left-radius:0;border-bottom-right-radius:0;height:auto}:host(.minimized) nb-card nb-card-header{border-bottom:none}\n"]
        }),
        __param$22(0, Inject(NB_WINDOW_CONTENT)),
        __param$22(1, Inject(NB_WINDOW_CONTEXT)),
        __metadata$93("design:paramtypes", [Object, Object,
            NbWindowRef,
            NbWindowConfig,
            NbFocusTrapFactoryService,
            ElementRef,
            Renderer2])
    ], NbWindowComponent);
    return NbWindowComponent;
}());

var __decorate$138 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$91 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$21 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The `NbWindowService` can be used to open windows.
 *
 * @stacked-example(Showcase, window/window-showcase.component)
 *
 * ### Installation
 *
 * Import `NbWindowModule` to your app module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbWindowModule.forRoot(config),
 *   ],
 * })
 * export class AppModule { }
 * ```
 *
 * If you are using it in a lazy loaded module than you have to install `NbWindowModule.forChild`:
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbWindowModule.forChild(config),
 *   ],
 * })
 * export class LazyLoadedModule { }
 * ```
 *
 * ### Usage
 *
 * A new window can be opened by calling the `open` method with a component or template to be loaded
 * and an optional configuration.
 * `open` method will return `NbWindowRef` that can be used for the further manipulations.
 *
 * ```ts
 * const windowRef = this.windowService.open(MyComponent, { ... });
 * ```
 *
 * `NbWindowRef` gives you ability manipulate opened window.
 * Also, you can inject `NbWindowRef` inside provided component which rendered in window.
 *
 * ```ts
 * this.windowService.open(MyWindowComponent, { ... });
 *
 * // my.component.ts
 * constructor(protected windowRef: NbWindowRef) {
 * }
 *
 * minimize() {
 *   this.windowRef.minimize();
 * }
 *
 * close() {
 *   this.windowRef.close();
 * }
 * ```
 *
 * Instead of component you can create window from TemplateRef. As usual you can access context provided via config
 * via `let-` variables. Also you can get reference to the `NbWindowRef` in context's `windowRef` property.
 *
 * @stacked-example(Window content from TemplateRef, window/template-window.component)
 *
 * ### Configuration
 *
 * As mentioned above, `open` method of the `NbWindowService` may receive optional configuration options.
 * Also, you can modify default windows configuration through `NbWindowModule.forRoot({ ... })`.
 * You can read about all available options on [API tab](docs/components/window/api#nbwindowconfig).
 *
 * @stacked-example(Configuration, window/windows-backdrop.component)
 */
var NbWindowService = /** @class */ (function () {
    function NbWindowService(componentFactoryResolver, overlayService, overlayPositionBuilder, blockScrollStrategy, defaultWindowsConfig, cfr) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.overlayService = overlayService;
        this.overlayPositionBuilder = overlayPositionBuilder;
        this.blockScrollStrategy = blockScrollStrategy;
        this.defaultWindowsConfig = defaultWindowsConfig;
        this.cfr = cfr;
        this.openWindows = [];
    }
    /**
     * Opens new window.
     * @param windowContent
     * @param windowConfig
     * */
    NbWindowService.prototype.open = function (windowContent, windowConfig) {
        if (windowConfig === void 0) { windowConfig = {}; }
        if (this.windowsContainerViewRef == null) {
            this.createWindowsContainer();
        }
        var config = new NbWindowConfig(this.defaultWindowsConfig, windowConfig);
        var windowRef = new NbWindowRef(config);
        windowRef.componentRef = this.appendWindow(windowContent, config, windowRef);
        this.openWindows.push(windowRef);
        this.subscribeToEvents(windowRef);
        return windowRef;
    };
    NbWindowService.prototype.createWindowsContainer = function () {
        this.overlayRef = this.overlayService.create({
            scrollStrategy: this.overlayService.scrollStrategies.noop(),
            positionStrategy: this.overlayPositionBuilder.global().bottom().right(),
            hasBackdrop: true,
        });
        var windowsContainerPortal = new NbComponentPortal(NbWindowsContainerComponent, null, null, this.cfr);
        var overlayRef = this.overlayRef.attach(windowsContainerPortal);
        this.windowsContainerViewRef = overlayRef.instance.viewContainerRef;
    };
    NbWindowService.prototype.appendWindow = function (content, config, windowRef) {
        var context = content instanceof TemplateRef
            ? { $implicit: config.context, windowRef: windowRef }
            : config.context;
        var providers = [
            { provide: NB_WINDOW_CONTENT, useValue: content },
            { provide: NB_WINDOW_CONTEXT, useValue: context },
            { provide: NbWindowConfig, useValue: config },
            { provide: NbWindowRef, useValue: windowRef },
        ];
        var parentInjector = config.viewContainerRef
            ? config.viewContainerRef.injector
            : this.windowsContainerViewRef.injector;
        var injector = Injector.create({ parent: parentInjector, providers: providers });
        var windowFactory = this.componentFactoryResolver.resolveComponentFactory(NbWindowComponent);
        var ref = this.windowsContainerViewRef.createComponent(windowFactory, null, injector);
        ref.instance.cfr = this.cfr;
        ref.changeDetectorRef.detectChanges();
        return ref;
    };
    NbWindowService.prototype.subscribeToEvents = function (windowRef) {
        var _this = this;
        if (windowRef.config.closeOnBackdropClick) {
            this.overlayRef.backdropClick().subscribe(function () { return windowRef.close(); });
        }
        if (windowRef.config.closeOnEsc) {
            this.overlayRef.keydownEvents()
                .pipe(filter(function (event) { return event.keyCode === 27; }))
                .subscribe(function () { return windowRef.close(); });
        }
        windowRef.stateChange.subscribe(function () { return _this.checkAndUpdateOverlay(); });
        windowRef.onClose.subscribe(function () {
            _this.openWindows.splice(_this.openWindows.indexOf(windowRef), 1);
            _this.checkAndUpdateOverlay();
        });
    };
    NbWindowService.prototype.checkAndUpdateOverlay = function () {
        var fullScreenWindows = this.openWindows.filter(function (w) { return w.state === NbWindowState.FULL_SCREEN; });
        if (fullScreenWindows.length > 0) {
            this.blockScrollStrategy.enable();
        }
        else {
            this.blockScrollStrategy.disable();
        }
        if (fullScreenWindows.some(function (w) { return w.config.hasBackdrop; })) {
            this.overlayRef.backdropElement.removeAttribute('hidden');
        }
        else {
            this.overlayRef.backdropElement.setAttribute('hidden', '');
        }
    };
    NbWindowService = __decorate$138([
        Injectable(),
        __param$21(4, Inject(NB_WINDOW_CONFIG)),
        __metadata$91("design:paramtypes", [ComponentFactoryResolver,
            NbOverlayService,
            NbOverlayPositionBuilder,
            NbBlockScrollStrategyAdapter,
            NbWindowConfig,
            ComponentFactoryResolver])
    ], NbWindowService);
    return NbWindowService;
}());

var __decorate$137 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbWindowModule = /** @class */ (function () {
    function NbWindowModule() {
    }
    NbWindowModule_1 = NbWindowModule;
    NbWindowModule.forRoot = function (defaultConfig) {
        return {
            ngModule: NbWindowModule_1,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    };
    NbWindowModule.forChild = function (defaultConfig) {
        return {
            ngModule: NbWindowModule_1,
            providers: [
                NbWindowService,
                { provide: NB_WINDOW_CONFIG, useValue: defaultConfig },
            ],
        };
    };
    var NbWindowModule_1;
    NbWindowModule = NbWindowModule_1 = __decorate$137([
        NgModule({
            imports: [CommonModule, NbOverlayModule, NbCardModule, NbIconModule, NbButtonModule],
            declarations: [
                NbWindowsContainerComponent,
                NbWindowComponent,
            ],
            entryComponents: [NbWindowsContainerComponent, NbWindowComponent],
        })
    ], NbWindowModule);
    return NbWindowModule;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$142 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$94 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$23 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The `NbDatepickerAdapter` instances provide way how to parse, format and validate
 * different date types.
 * */
var NbDatepickerAdapter = /** @class */ (function () {
    function NbDatepickerAdapter() {
    }
    return NbDatepickerAdapter;
}());
/**
 * Datepicker is an control that can pick any values anyway.
 * It has to be bound to the datepicker directive through nbDatepicker input.
 * */
var NbDatepicker = /** @class */ (function () {
    function NbDatepicker() {
    }
    return NbDatepicker;
}());
var NB_DATE_ADAPTER = new InjectionToken('Datepicker Adapter');
var NB_DATE_SERVICE_OPTIONS = new InjectionToken('Date service options');
/**
 * The `NbDatepickerDirective` is form control that gives you ability to select dates and ranges. The datepicker
 * is shown when input receives a `focus` event.
 *
 * ```html
 * <input [nbDatepicker]="datepicker">
 * <nb-datepicker #datepicker></nb-datepicker>
 * ```
 *
 * @stacked-example(Showcase, datepicker/datepicker-showcase.component)
 *
 * ### Installation
 *
 * Import `NbDatepickerModule.forRoot()` to your root module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbDatepickerModule.forRoot(),
 *   ],
 * })
 * export class AppModule { }
 * ```
 * And `NbDatepickerModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *   	// ...
 *     NbDatepickerModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 * ### Usage
 *
 * If you want to use range selection, you have to use `NbRangepickerComponent` instead:
 *
 * ```html
 * <input [nbDatepicker]="rangepicker">
 * <nb-rangepicker #rangepicker></nb-rangepicker>
 * ```
 *
 * Both range and date pickers support all parameters as calendar, so, check `NbCalendarComponent` for additional
 * info.
 *
 * @stacked-example(Range showcase, datepicker/rangepicker-showcase.component)
 *
 * Datepicker is the form control so it can be bound with angular forms through ngModel and form controls.
 *
 * @stacked-example(Forms, datepicker/datepicker-forms.component)
 *
 * `NbDatepickerDirective` may be validated using `min` and `max` dates passed to the datepicker.
 * And `filter` predicate that receives date object and has to return a boolean value.
 *
 * @stacked-example(Validation, datepicker/datepicker-validation.component)
 *
 * The `NbDatepickerComponent` supports date formatting:
 *
 * ```html
 * <input [nbDatepicker]="datepicker">
 * <nb-datepicker #datepicker format="MM\dd\yyyy"></nb-datepicker>
 * ```
 *
 * ## Formatting Issue
 *
 * By default, datepicker uses angulars `LOCALE_ID` token for localization and `DatePipe` for dates formatting.
 * And native `Date.parse(...)` for dates parsing. But native `Date.parse` function doesn't support formats.
 * To provide custom formatting you have to use one of the following packages:
 *
 * - `@nebular/moment` - provides moment date adapter that uses moment for date objects. This means datepicker than
 * will operate only moment date objects. If you want to use it you have to install it: `npm i @nebular/moment`, and
 * import `NbMomentDateModule` from this package.
 *
 * - `@nebular/date-fns` - adapter for popular date-fns library. This way is preferred if you need only date formatting.
 * Because date-fns is treeshakable, tiny and operates native date objects. If you want to use it you have to
 * install it: `npm i @nebular/date-fns`, and import `NbDateFnsDateModule` from this package.
 *
 * ### NbDateFnsDateModule
 *
 * Format is required when using `NbDateFnsDateModule`. You can set it via `format` input on datepicker component:
 * ```html
 * <nb-datepicker format="dd.MM.yyyy"></nb-datepicker>
 * ```
 * Also format can be set globally with `NbDateFnsDateModule.forRoot({ format: 'dd.MM.yyyy' })` and
 * `NbDateFnsDateModule.forChild({ format: 'dd.MM.yyyy' })` methods.
 *
 * Please note to use some of the formatting tokens you also need to pass `{ awareOfUnicodeTokens: true }` to date-fns
 * parse and format functions. You can configure options passed this functions by setting `formatOptions` and
 * `parseOptions` of options object passed to `NbDateFnsDateModule.forRoot` and `NbDateFnsDateModule.forChild` methods.
 * ```ts
 * NbDateFnsDateModule.forRoot({
 *   parseOptions: { awareOfUnicodeTokens: true },
 *   formatOptions: { awareOfUnicodeTokens: true },
 * })
 * ```
 * Further info on `date-fns` formatting tokens could be found at
 * [date-fns docs](https://date-fns.org/v2.0.0-alpha.27/docs/Unicode-Tokens).
 *
 * You can also use `parseOptions` and `formatOptions` to provide locale.
 * ```ts
 * import { eo } from 'date-fns/locale';
 *
 * @NgModule({
 *   imports: [
 *     NbDateFnsDateModule.forRoot({
 *       parseOptions: { locale: eo },
 *       formatOptions: { locale: eo },
 *     }),
 *   ],
 * })
 * ```
 *
 * @styles
 *
 * datepicker-text-color:
 * datepicker-background-color:
 * datepicker-border-color:
 * datepicker-border-style:
 * datepicker-border-width:
 * datepicker-border-radius:
 * datepicker-shadow:
 * datepicker-arrow-size:
 * */
var NbDatepickerDirective = /** @class */ (function () {
    function NbDatepickerDirective(document, datepickerAdapters, hostRef, dateService, changeDetector) {
        var _this = this;
        this.document = document;
        this.datepickerAdapters = datepickerAdapters;
        this.hostRef = hostRef;
        this.dateService = dateService;
        this.changeDetector = changeDetector;
        this.alive = true;
        this.isDatepickerReady = false;
        this.onChange = function () { };
        this.onTouched = function () { };
        /**
         * Form control validators will be called in validators context, so, we need to bind them.
         * */
        this.validator = Validators.compose([
            this.parseValidator,
            this.minValidator,
            this.maxValidator,
            this.filterValidator,
        ].map(function (fn) { return fn.bind(_this); }));
        this.subscribeOnInputChange();
    }
    NbDatepickerDirective_1 = NbDatepickerDirective;
    Object.defineProperty(NbDatepickerDirective.prototype, "setPicker", {
        /**
         * Provides datepicker component.
         * */
        set: function (picker) {
            this.picker = picker;
            this.setupPicker();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbDatepickerDirective.prototype, "input", {
        /**
         * Returns html input element.
         * */
        get: function () {
            return this.hostRef.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbDatepickerDirective.prototype, "inputValue", {
        /**
         * Returns host input value.
         * */
        get: function () {
            return this.input.value;
        },
        enumerable: true,
        configurable: true
    });
    NbDatepickerDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    /**
     * Writes value in picker and html input element.
     * */
    NbDatepickerDirective.prototype.writeValue = function (value) {
        if (this.isDatepickerReady) {
            this.writePicker(value);
            this.writeInput(value);
        }
        else {
            this.queue = value;
        }
    };
    NbDatepickerDirective.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbDatepickerDirective.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbDatepickerDirective.prototype.setDisabledState = function (isDisabled) {
        this.input.disabled = isDisabled;
    };
    /**
     * Form control validation based on picker validator config.
     * */
    NbDatepickerDirective.prototype.validate = function () {
        return this.validator(null);
    };
    /**
     * Hides picker, focuses the input
     */
    NbDatepickerDirective.prototype.hidePicker = function () {
        this.input.focus();
        this.picker.hide();
    };
    /**
     * Validates that we can parse value correctly.
     * */
    NbDatepickerDirective.prototype.parseValidator = function () {
        /**
         * Date services treat empty string as invalid date.
         * That's why we're getting invalid formControl in case of empty input which is not required.
         * */
        if (this.inputValue === '') {
            return null;
        }
        var isValid = this.datepickerAdapter.isValid(this.inputValue, this.picker.format);
        return isValid ? null : { nbDatepickerParse: { value: this.inputValue } };
    };
    /**
     * Validates passed value is greater than min.
     * */
    NbDatepickerDirective.prototype.minValidator = function () {
        var config = this.picker.getValidatorConfig();
        var date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
        return (!config.min || !date || this.dateService.compareDates(config.min, date) <= 0) ?
            null : { nbDatepickerMin: { min: config.min, actual: date } };
    };
    /**
     * Validates passed value is smaller than max.
     * */
    NbDatepickerDirective.prototype.maxValidator = function () {
        var config = this.picker.getValidatorConfig();
        var date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
        return (!config.max || !date || this.dateService.compareDates(config.max, date) >= 0) ?
            null : { nbDatepickerMax: { max: config.max, actual: date } };
    };
    /**
     * Validates passed value satisfy the filter.
     * */
    NbDatepickerDirective.prototype.filterValidator = function () {
        var config = this.picker.getValidatorConfig();
        var date = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
        return (!config.filter || !date || config.filter(date)) ?
            null : { nbDatepickerFilter: true };
    };
    /**
     * Chooses datepicker adapter based on passed picker component.
     * */
    NbDatepickerDirective.prototype.chooseDatepickerAdapter = function () {
        var _this = this;
        this.datepickerAdapter = this.datepickerAdapters.find(function (_a) {
            var picker = _a.picker;
            return _this.picker instanceof picker;
        });
        if (this.noDatepickerAdapterProvided()) {
            throw new Error('No datepickerAdapter provided for picker');
        }
    };
    /**
     * Attaches picker to the host input element and subscribes on value changes.
     * */
    NbDatepickerDirective.prototype.setupPicker = function () {
        var _this = this;
        this.chooseDatepickerAdapter();
        this.picker.attach(this.hostRef);
        if (this.inputValue) {
            this.picker.value = this.datepickerAdapter.parse(this.inputValue, this.picker.format);
        }
        // In case datepicker component placed after the input with datepicker directive,
        // we can't read `this.picker.format` on first change detection run,
        // since it's not bound yet, so we have to wait for datepicker component initialization.
        if (!this.isDatepickerReady) {
            this.picker.init
                .pipe(takeWhile(function () { return _this.alive; }), take(1), tap(function () { return _this.isDatepickerReady = true; }), filter(function () { return !!_this.queue; }))
                .subscribe(function () {
                _this.writeValue(_this.queue);
                _this.onChange(_this.queue);
                _this.changeDetector.detectChanges();
                _this.queue = undefined;
            });
        }
        this.picker.valueChange
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (value) {
            _this.writePicker(value);
            _this.writeInput(value);
            _this.onChange(value);
            if (_this.picker.shouldHide()) {
                _this.hidePicker();
            }
        });
        merge(this.picker.blur, fromEvent(this.input, 'blur').pipe(filter(function () { return !_this.picker.isShown && _this.document.activeElement !== _this.input; }))).pipe(takeWhile(function () { return _this.alive; }), take(1)).subscribe(function () { return _this.onTouched(); });
    };
    NbDatepickerDirective.prototype.writePicker = function (value) {
        this.picker.value = value;
    };
    NbDatepickerDirective.prototype.writeInput = function (value) {
        var stringRepresentation = this.datepickerAdapter.format(value, this.picker.format);
        this.hostRef.nativeElement.value = stringRepresentation;
    };
    /**
     * Validates if no datepicker adapter provided.
     * */
    NbDatepickerDirective.prototype.noDatepickerAdapterProvided = function () {
        return !this.datepickerAdapter || !(this.datepickerAdapter instanceof NbDatepickerAdapter);
    };
    NbDatepickerDirective.prototype.subscribeOnInputChange = function () {
        var _this = this;
        fromEvent(this.input, 'input')
            .pipe(map(function () { return _this.inputValue; }), takeWhile(function () { return _this.alive; }))
            .subscribe(function (value) { return _this.handleInputChange(value); });
    };
    /**
     * Parses input value and write if it isn't null.
     * */
    NbDatepickerDirective.prototype.handleInputChange = function (value) {
        var date = this.parseInputValue(value);
        this.onChange(date);
        this.writePicker(date);
    };
    NbDatepickerDirective.prototype.parseInputValue = function (value) {
        if (this.datepickerAdapter.isValid(value, this.picker.format)) {
            return this.datepickerAdapter.parse(value, this.picker.format);
        }
        return null;
    };
    var NbDatepickerDirective_1;
    __decorate$142([
        Input('nbDatepicker'),
        __metadata$94("design:type", NbDatepicker),
        __metadata$94("design:paramtypes", [NbDatepicker])
    ], NbDatepickerDirective.prototype, "setPicker", null);
    NbDatepickerDirective = NbDatepickerDirective_1 = __decorate$142([
        Directive({
            selector: 'input[nbDatepicker]',
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NbDatepickerDirective_1; }),
                    multi: true,
                },
                {
                    provide: NG_VALIDATORS,
                    useExisting: forwardRef(function () { return NbDatepickerDirective_1; }),
                    multi: true,
                },
            ],
        }),
        __param$23(0, Inject(NB_DOCUMENT)),
        __param$23(1, Inject(NB_DATE_ADAPTER)),
        __metadata$94("design:paramtypes", [Object, Array, ElementRef,
            NbDateService,
            ChangeDetectorRef])
    ], NbDatepickerDirective);
    return NbDatepickerDirective;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$21 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$143 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$95 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbDatepickerContainerComponent = /** @class */ (function (_super) {
    __extends$21(NbDatepickerContainerComponent, _super);
    function NbDatepickerContainerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbDatepickerContainerComponent.prototype.attach = function (portal) {
        return this.overlayContainer.attachComponentPortal(portal);
    };
    __decorate$143([
        ViewChild(NbOverlayContainerComponent, { static: true }),
        __metadata$95("design:type", NbOverlayContainerComponent)
    ], NbDatepickerContainerComponent.prototype, "overlayContainer", void 0);
    NbDatepickerContainerComponent = __decorate$143([
        Component({
            selector: 'nb-datepicker-container',
            template: "\n    <span class=\"arrow\"></span>\n    <nb-overlay-container></nb-overlay-container>\n  ",
            styles: [":host .arrow{position:absolute;width:0;height:0}:host ::ng-deep nb-overlay-container .primitive-overlay{padding:0.75rem 1rem}\n"]
        })
    ], NbDatepickerContainerComponent);
    return NbDatepickerContainerComponent;
}(NbPositionedContainer));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$22 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$144 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$96 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$24 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
var NbBasePicker = /** @class */ (function (_super) {
    __extends$22(NbBasePicker, _super);
    function NbBasePicker(document, positionBuilder, triggerStrategyBuilder, overlay, cfr, dateService, dateServiceOptions) {
        var _this = _super.call(this) || this;
        _this.document = document;
        _this.positionBuilder = positionBuilder;
        _this.triggerStrategyBuilder = triggerStrategyBuilder;
        _this.overlay = overlay;
        _this.cfr = cfr;
        _this.dateService = dateService;
        _this.dateServiceOptions = dateServiceOptions;
        /**
         * Defines if we should render previous and next months
         * in the current month view.
         * */
        _this.boundingMonth = true;
        /**
         * Defines starting view for calendar.
         * */
        _this.startView = NbCalendarViewMode.DATE;
        /**
         * Size of the calendar and entire components.
         * Can be 'medium' which is default or 'large'.
         * */
        _this.size = NbCalendarSize.MEDIUM;
        /**
         * Hide picker when a date or a range is selected, `true` by default
         * @type {boolean}
         */
        _this.hideOnSelect = true;
        _this.init$ = new ReplaySubject();
        /**
         * Stream of picker changes. Required to be the subject because picker hides and shows and picker
         * change stream becomes recreated.
         * */
        _this.onChange$ = new Subject();
        _this.alive = true;
        _this.blur$ = new Subject();
        return _this;
    }
    Object.defineProperty(NbBasePicker.prototype, "picker", {
        /**
         * Returns picker instance.
         * */
        get: function () {
            return this.pickerRef && this.pickerRef.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBasePicker.prototype, "valueChange", {
        /**
         * Stream of picker value changes.
         * */
        get: function () {
            return this.onChange$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBasePicker.prototype, "isShown", {
        get: function () {
            return this.ref && this.ref.hasAttached();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBasePicker.prototype, "init", {
        get: function () {
            return this.init$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbBasePicker.prototype, "blur", {
        /**
         * Emits when datepicker looses focus.
         */
        get: function () {
            return this.blur$.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    NbBasePicker.prototype.ngOnInit = function () {
        this.checkFormat();
    };
    NbBasePicker.prototype.ngOnChanges = function (changes) {
        if (changes.format && !changes.format.isFirstChange()) {
            this.checkFormat();
        }
    };
    NbBasePicker.prototype.ngAfterViewInit = function () {
        this.init$.next();
    };
    NbBasePicker.prototype.ngOnDestroy = function () {
        this.alive = false;
        this.hide();
        this.init$.complete();
        if (this.ref) {
            this.ref.dispose();
        }
        this.triggerStrategy.destroy();
    };
    /**
     * Datepicker knows nothing about host html input element.
     * So, attach method attaches datepicker to the host input element.
     * */
    NbBasePicker.prototype.attach = function (hostRef) {
        this.hostRef = hostRef;
        this.subscribeOnTriggers();
    };
    NbBasePicker.prototype.getValidatorConfig = function () {
        return { min: this.min, max: this.max, filter: this.filter };
    };
    NbBasePicker.prototype.show = function () {
        if (!this.ref) {
            this.createOverlay();
        }
        this.openDatepicker();
    };
    NbBasePicker.prototype.shouldHide = function () {
        return this.hideOnSelect && !!this.value;
    };
    NbBasePicker.prototype.hide = function () {
        if (this.ref) {
            this.ref.detach();
        }
        // save current value if picker was rendered
        if (this.picker) {
            this.queue = this.value;
            this.pickerRef.destroy();
            this.pickerRef = null;
            this.container = null;
        }
    };
    NbBasePicker.prototype.createOverlay = function () {
        this.positionStrategy = this.createPositionStrategy();
        this.ref = this.overlay.create({
            positionStrategy: this.positionStrategy,
            scrollStrategy: this.overlay.scrollStrategies.reposition(),
        });
        this.subscribeOnPositionChange();
    };
    NbBasePicker.prototype.openDatepicker = function () {
        this.container = this.ref.attach(new NbComponentPortal(NbDatepickerContainerComponent, null, null, this.cfr));
        this.instantiatePicker();
        this.subscribeOnValueChange();
        this.writeQueue();
        this.patchWithInputs();
    };
    NbBasePicker.prototype.createPositionStrategy = function () {
        return this.positionBuilder
            .connectedTo(this.hostRef)
            .position(NbPosition.BOTTOM)
            .adjustment(NbAdjustment.COUNTERCLOCKWISE);
    };
    NbBasePicker.prototype.subscribeOnPositionChange = function () {
        var _this = this;
        this.positionStrategy.positionChange
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function (position) { return patch(_this.container, { position: position }); });
    };
    NbBasePicker.prototype.createTriggerStrategy = function () {
        var _this = this;
        return this.triggerStrategyBuilder
            .trigger(NbTrigger.FOCUS)
            .host(this.hostRef.nativeElement)
            .container(function () { return _this.container; })
            .build();
    };
    NbBasePicker.prototype.subscribeOnTriggers = function () {
        var _this = this;
        this.triggerStrategy = this.createTriggerStrategy();
        this.triggerStrategy.show$.subscribe(function () { return _this.show(); });
        this.triggerStrategy.hide$.subscribe(function () {
            _this.blur$.next();
            _this.hide();
        });
    };
    NbBasePicker.prototype.instantiatePicker = function () {
        this.pickerRef = this.container.instance.attach(new NbComponentPortal(this.pickerClass, null, null, this.cfr));
    };
    /**
     * Subscribes on picker value changes and emit data through this.onChange$ subject.
     * */
    NbBasePicker.prototype.subscribeOnValueChange = function () {
        var _this = this;
        this.pickerValueChange.subscribe(function (date) {
            _this.onChange$.next(date);
        });
    };
    NbBasePicker.prototype.patchWithInputs = function () {
        this.picker.boundingMonth = this.boundingMonth;
        this.picker.startView = this.startView;
        this.picker.min = this.min;
        this.picker.max = this.max;
        this.picker.filter = this.filter;
        this.picker._cellComponent = this.dayCellComponent;
        this.picker.monthCellComponent = this.monthCellComponent;
        this.picker._yearCellComponent = this.yearCellComponent;
        this.picker.size = this.size;
        this.picker.visibleDate = this.visibleDate;
    };
    NbBasePicker.prototype.checkFormat = function () {
        if (this.dateService.getId() === 'native' && this.format) {
            throw new Error('Can\'t format native date. To use custom formatting you have to install @nebular/moment or ' +
                '@nebular/date-fns package and import NbMomentDateModule or NbDateFnsDateModule accordingly.' +
                'More information at "Formatting issue" ' +
                'https://akveo.github.io/nebular/docs/components/datepicker/overview#nbdatepickercomponent');
        }
        var isFormatSet = this.format || (this.dateServiceOptions && this.dateServiceOptions.format);
        if (this.dateService.getId() === 'date-fns' && !isFormatSet) {
            throw new Error('format is required when using NbDateFnsDateModule');
        }
    };
    __decorate$144([
        Input(),
        __metadata$96("design:type", String)
    ], NbBasePicker.prototype, "format", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Boolean)
    ], NbBasePicker.prototype, "boundingMonth", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", String)
    ], NbBasePicker.prototype, "startView", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Object)
    ], NbBasePicker.prototype, "min", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Object)
    ], NbBasePicker.prototype, "max", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Function)
    ], NbBasePicker.prototype, "filter", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Type)
    ], NbBasePicker.prototype, "dayCellComponent", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Type)
    ], NbBasePicker.prototype, "monthCellComponent", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Type)
    ], NbBasePicker.prototype, "yearCellComponent", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", String)
    ], NbBasePicker.prototype, "size", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Object)
    ], NbBasePicker.prototype, "visibleDate", void 0);
    __decorate$144([
        Input(),
        __metadata$96("design:type", Boolean)
    ], NbBasePicker.prototype, "hideOnSelect", void 0);
    NbBasePicker = __decorate$144([
        __param$24(0, Inject(NB_DOCUMENT)),
        __param$24(6, Optional()), __param$24(6, Inject(NB_DATE_SERVICE_OPTIONS)),
        __metadata$96("design:paramtypes", [Object, NbPositionBuilderService,
            NbTriggerStrategyBuilderService,
            NbOverlayService,
            ComponentFactoryResolver,
            NbDateService, Object])
    ], NbBasePicker);
    return NbBasePicker;
}(NbDatepicker));
/**
 * The DatePicker components itself.
 * Provides a proxy to `NbCalendar` options as well as custom picker options.
 */
var NbDatepickerComponent = /** @class */ (function (_super) {
    __extends$22(NbDatepickerComponent, _super);
    function NbDatepickerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickerClass = NbCalendarComponent;
        return _this;
    }
    Object.defineProperty(NbDatepickerComponent.prototype, "date", {
        /**
         * Date which will be rendered as selected.
         * */
        set: function (date) {
            this.value = date;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbDatepickerComponent.prototype, "dateChange", {
        /**
         * Emits date when selected.
         * */
        get: function () {
            return this.valueChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbDatepickerComponent.prototype, "value", {
        get: function () {
            return this.picker ? this.picker.date : undefined;
        },
        set: function (date) {
            if (!this.picker) {
                this.queue = date;
                return;
            }
            if (date) {
                this.visibleDate = date;
                this.picker.visibleDate = date;
                this.picker.date = date;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbDatepickerComponent.prototype, "pickerValueChange", {
        get: function () {
            return this.picker.dateChange;
        },
        enumerable: true,
        configurable: true
    });
    NbDatepickerComponent.prototype.writeQueue = function () {
        if (this.queue) {
            var date = this.queue;
            this.queue = null;
            this.value = date;
        }
    };
    __decorate$144([
        Input(),
        __metadata$96("design:type", Object),
        __metadata$96("design:paramtypes", [Object])
    ], NbDatepickerComponent.prototype, "date", null);
    __decorate$144([
        Output(),
        __metadata$96("design:type", EventEmitter),
        __metadata$96("design:paramtypes", [])
    ], NbDatepickerComponent.prototype, "dateChange", null);
    NbDatepickerComponent = __decorate$144([
        Component({
            selector: 'nb-datepicker',
            template: ''
        })
    ], NbDatepickerComponent);
    return NbDatepickerComponent;
}(NbBasePicker));
/**
 * The RangeDatePicker components itself.
 * Provides a proxy to `NbCalendarRange` options as well as custom picker options.
 */
var NbRangepickerComponent = /** @class */ (function (_super) {
    __extends$22(NbRangepickerComponent, _super);
    function NbRangepickerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickerClass = NbCalendarRangeComponent;
        return _this;
    }
    Object.defineProperty(NbRangepickerComponent.prototype, "range", {
        /**
         * Range which will be rendered as selected.
         * */
        set: function (range) {
            this.value = range;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRangepickerComponent.prototype, "rangeChange", {
        /**
         * Emits range when start selected and emits again when end selected.
         * */
        get: function () {
            return this.valueChange;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRangepickerComponent.prototype, "value", {
        get: function () {
            return this.picker ? this.picker.range : undefined;
        },
        set: function (range) {
            if (!this.picker) {
                this.queue = range;
                return;
            }
            if (range) {
                var visibleDate = range && range.start;
                this.visibleDate = visibleDate;
                this.picker.visibleDate = visibleDate;
                this.picker.range = range;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRangepickerComponent.prototype, "pickerValueChange", {
        get: function () {
            return this.picker.rangeChange;
        },
        enumerable: true,
        configurable: true
    });
    NbRangepickerComponent.prototype.shouldHide = function () {
        return _super.prototype.shouldHide.call(this) && !!(this.value && this.value.start && this.value.end);
    };
    NbRangepickerComponent.prototype.writeQueue = function () {
        if (this.queue) {
            var range = this.queue;
            this.queue = null;
            this.value = range;
        }
    };
    __decorate$144([
        Input(),
        __metadata$96("design:type", Object),
        __metadata$96("design:paramtypes", [Object])
    ], NbRangepickerComponent.prototype, "range", null);
    __decorate$144([
        Output(),
        __metadata$96("design:type", EventEmitter),
        __metadata$96("design:paramtypes", [])
    ], NbRangepickerComponent.prototype, "rangeChange", null);
    NbRangepickerComponent = __decorate$144([
        Component({
            selector: 'nb-rangepicker',
            template: ''
        })
    ], NbRangepickerComponent);
    return NbRangepickerComponent;
}(NbBasePicker));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$23 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$145 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$97 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbDateAdapterService = /** @class */ (function (_super) {
    __extends$23(NbDateAdapterService, _super);
    function NbDateAdapterService(dateService) {
        var _this = _super.call(this) || this;
        _this.dateService = dateService;
        _this.picker = NbDatepickerComponent;
        return _this;
    }
    NbDateAdapterService.prototype.parse = function (date, format) {
        return this.dateService.parse(date, format);
    };
    NbDateAdapterService.prototype.format = function (date, format) {
        return this.dateService.format(date, format);
    };
    NbDateAdapterService.prototype.isValid = function (date, format) {
        return this.dateService.isValidDateString(date, format);
    };
    NbDateAdapterService = __decorate$145([
        Injectable(),
        __metadata$97("design:paramtypes", [NbDateService])
    ], NbDateAdapterService);
    return NbDateAdapterService;
}(NbDatepickerAdapter));
var NbRangeAdapterService = /** @class */ (function (_super) {
    __extends$23(NbRangeAdapterService, _super);
    function NbRangeAdapterService(dateService) {
        var _this = _super.call(this) || this;
        _this.dateService = dateService;
        _this.picker = NbRangepickerComponent;
        return _this;
    }
    NbRangeAdapterService.prototype.parse = function (range, format) {
        var _a = range.split('-').map(function (subDate) { return subDate.trim(); }), start = _a[0], end = _a[1];
        return {
            start: this.dateService.parse(start, format),
            end: this.dateService.parse(end, format),
        };
    };
    NbRangeAdapterService.prototype.format = function (range, format) {
        if (!range) {
            return '';
        }
        var start = this.dateService.format(range.start, format);
        var isStartValid = this.dateService.isValidDateString(start, format);
        if (!isStartValid) {
            return '';
        }
        var end = this.dateService.format(range.end, format);
        var isEndValid = this.dateService.isValidDateString(end, format);
        if (isEndValid) {
            return start + " - " + end;
        }
        else {
            return start;
        }
    };
    NbRangeAdapterService.prototype.isValid = function (range, format) {
        var _a = range.split('-').map(function (subDate) { return subDate.trim(); }), start = _a[0], end = _a[1];
        return this.dateService.isValidDateString(start, format) && this.dateService.isValidDateString(end, format);
    };
    NbRangeAdapterService = __decorate$145([
        Injectable(),
        __metadata$97("design:paramtypes", [NbDateService])
    ], NbRangeAdapterService);
    return NbRangeAdapterService;
}(NbDatepickerAdapter));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$141 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbDatepickerModule = /** @class */ (function () {
    function NbDatepickerModule() {
    }
    NbDatepickerModule_1 = NbDatepickerModule;
    NbDatepickerModule.forRoot = function () {
        return {
            ngModule: NbDatepickerModule_1,
            providers: [
                DatePipe,
                {
                    provide: NB_DATE_ADAPTER,
                    multi: true,
                    useClass: NbDateAdapterService,
                },
                {
                    provide: NB_DATE_ADAPTER,
                    multi: true,
                    useClass: NbRangeAdapterService,
                },
            ],
        };
    };
    var NbDatepickerModule_1;
    NbDatepickerModule = NbDatepickerModule_1 = __decorate$141([
        NgModule({
            imports: [NbOverlayModule, NbCalendarModule, NbCalendarRangeModule],
            exports: [NbDatepickerDirective, NbDatepickerComponent, NbRangepickerComponent],
            declarations: [NbDatepickerDirective, NbDatepickerContainerComponent, NbDatepickerComponent, NbRangepickerComponent],
            entryComponents: [NbCalendarComponent, NbCalendarRangeComponent, NbDatepickerContainerComponent],
        })
    ], NbDatepickerModule);
    return NbDatepickerModule;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$147 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$98 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * The `NbRadioComponent` provides the same functionality as native `<input type="radio">`
 * with Nebular styles and animations.
 *
 * @stacked-example(Showcase, radio/radio-showcase.component)
 *
 * ### Installation
 *
 * Import `NbRadioModule` to your feature module.
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbRadioModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * Radio buttons should be wrapped in `nb-radio-group` to provide form bindings.
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * You can disable some radios in the group using a `disabled` attribute.
 *
 * @stacked-example(Disabled, radio/radio-disabled.component)
 *
 *
 * @styles
 *
 * radio-width:
 * radio-height:
 * radio-background-color:
 * radio-border-color:
 * radio-border-style:
 * radio-border-width:
 * radio-text-color:
 * radio-text-font-family:
 * radio-text-font-size:
 * radio-text-font-weight:
 * radio-text-line-height:
 * radio-outline-color:
 * radio-outline-width:
 * radio-disabled-border-color:
 * radio-disabled-text-color:
 * radio-disabled-inner-circle-color:
 * radio-primary-border-color:
 * radio-primary-inner-circle-color:
 * radio-primary-focus-border-color:
 * radio-primary-focus-inner-circle-color:
 * radio-primary-hover-border-color:
 * radio-primary-hover-inner-circle-color:
 * radio-primary-active-border-color:
 * radio-primary-active-inner-circle-color:
 * radio-success-border-color:
 * radio-success-inner-circle-color:
 * radio-success-focus-border-color:
 * radio-success-focus-inner-circle-color:
 * radio-success-hover-border-color:
 * radio-success-hover-inner-circle-color:
 * radio-success-active-border-color:
 * radio-success-active-inner-circle-color:
 * radio-warning-border-color:
 * radio-warning-inner-circle-color:
 * radio-warning-focus-border-color:
 * radio-warning-focus-inner-circle-color:
 * radio-warning-hover-border-color:
 * radio-warning-hover-inner-circle-color:
 * radio-warning-active-border-color:
 * radio-warning-active-inner-circle-color:
 * radio-danger-border-color:
 * radio-danger-inner-circle-color:
 * radio-danger-focus-border-color:
 * radio-danger-focus-inner-circle-color:
 * radio-danger-hover-border-color:
 * radio-danger-hover-inner-circle-color:
 * radio-danger-active-border-color:
 * radio-danger-active-inner-circle-color:
 * radio-info-border-color:
 * radio-info-inner-circle-color:
 * radio-info-focus-border-color:
 * radio-info-focus-inner-circle-color:
 * radio-info-hover-border-color:
 * radio-info-hover-inner-circle-color:
 * radio-info-active-border-color:
 * radio-info-active-inner-circle-color:
 * */
var NbRadioComponent = /** @class */ (function () {
    function NbRadioComponent(cd) {
        this.cd = cd;
        this._checked = false;
        this._disabled = false;
        this.valueChange = new EventEmitter();
        this.blur = new EventEmitter();
    }
    Object.defineProperty(NbRadioComponent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            if (this._name !== value) {
                this._name = value;
                this.cd.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "checked", {
        get: function () {
            return this._checked;
        },
        set: function (value) {
            var boolValue = convertToBoolProperty(value);
            if (this._checked !== boolValue) {
                this._checked = boolValue;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            if (this._value !== value) {
                this._value = value;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            var boolValue = convertToBoolProperty(disabled);
            if (this._disabled !== boolValue) {
                this._disabled = boolValue;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            if (this._status !== value) {
                this._status = value;
                this.cd.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isPrimary", {
        get: function () {
            return this.status === 'primary';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isSuccess", {
        get: function () {
            return this.status === 'success';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isWarning", {
        get: function () {
            return this.status === 'warning';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isDanger", {
        get: function () {
            return this.status === 'danger';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioComponent.prototype, "isInfo", {
        get: function () {
            return this.status === 'info';
        },
        enumerable: true,
        configurable: true
    });
    NbRadioComponent.prototype.onChange = function (event) {
        event.stopPropagation();
        this.checked = true;
        this.valueChange.emit(this.value);
    };
    NbRadioComponent.prototype.onClick = function (event) {
        event.stopPropagation();
    };
    __decorate$147([
        Input(),
        __metadata$98("design:type", String),
        __metadata$98("design:paramtypes", [String])
    ], NbRadioComponent.prototype, "name", null);
    __decorate$147([
        Input(),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [Boolean])
    ], NbRadioComponent.prototype, "checked", null);
    __decorate$147([
        Input(),
        __metadata$98("design:type", Object),
        __metadata$98("design:paramtypes", [Object])
    ], NbRadioComponent.prototype, "value", null);
    __decorate$147([
        Input(),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [Boolean])
    ], NbRadioComponent.prototype, "disabled", null);
    __decorate$147([
        Input(),
        __metadata$98("design:type", String),
        __metadata$98("design:paramtypes", [String])
    ], NbRadioComponent.prototype, "status", null);
    __decorate$147([
        Output(),
        __metadata$98("design:type", EventEmitter)
    ], NbRadioComponent.prototype, "valueChange", void 0);
    __decorate$147([
        Output(),
        __metadata$98("design:type", EventEmitter)
    ], NbRadioComponent.prototype, "blur", void 0);
    __decorate$147([
        HostBinding('class.status-primary'),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [])
    ], NbRadioComponent.prototype, "isPrimary", null);
    __decorate$147([
        HostBinding('class.status-success'),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [])
    ], NbRadioComponent.prototype, "isSuccess", null);
    __decorate$147([
        HostBinding('class.status-warning'),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [])
    ], NbRadioComponent.prototype, "isWarning", null);
    __decorate$147([
        HostBinding('class.status-danger'),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [])
    ], NbRadioComponent.prototype, "isDanger", null);
    __decorate$147([
        HostBinding('class.status-info'),
        __metadata$98("design:type", Boolean),
        __metadata$98("design:paramtypes", [])
    ], NbRadioComponent.prototype, "isInfo", null);
    NbRadioComponent = __decorate$147([
        Component({
            selector: 'nb-radio',
            template: "\n    <label>\n      <input\n        type=\"radio\"\n        class=\"native-input visually-hidden\"\n        [name]=\"name\"\n        [value]=\"value\"\n        [checked]=\"checked\"\n        [disabled]=\"disabled\"\n        (change)=\"onChange($event)\"\n        (click)=\"onClick($event)\">\n      <span class=\"outer-circle\"></span>\n      <span class=\"inner-circle\"></span>\n      <span class=\"text\">\n        <ng-content></ng-content>\n      </span>\n    </label>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:block;position:relative}:host label{display:inline-flex;margin:0;min-height:inherit;padding:0.375rem 1.5rem 0.375rem 0;align-items:center}:host .outer-circle,:host .inner-circle{border-radius:50%;position:absolute;top:50%;left:0;transform:translateY(-50%)}:host .inner-circle{transform:translateY(-50%) scale(0.65)}[dir=ltr] :host .text{padding-left:.5rem}[dir=rtl] :host .text{padding-right:.5rem}\n"]
        }),
        __metadata$98("design:paramtypes", [ChangeDetectorRef])
    ], NbRadioComponent);
    return NbRadioComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$148 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$99 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$25 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * The `NbRadioGroupComponent` is the wrapper for `nb-radio` button.
 * It provides form bindings:
 *
 * ```html
 * <nb-radio-group [(ngModel)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Also, you can use `value` and `valueChange` for binding without forms.
 *
 * ```html
 * <nb-radio-group [(value)]="selectedOption">
 *   <nb-radio value="1">Option 1</nb-radio>
 *   <nb-radio value="2">Option 2</nb-radio>
 *   <nb-radio value="3">Option 3</nb-radio>
 * </nb-radio-group>
 * ```
 *
 * Radio items name has to be provided through `name` input property of the radio group.
 *
 * ```html
 * <nb-radio-group name="my-radio-group">
 *   ...
 * </nb-radio-group>
 * ```
 *
 * You can change radio group status by setting `status` input.
 * @stacked-example(Statuses, radio/radio-statuses.component)
 *
 * Also, you can disable the whole group using `disabled` attribute.
 * @stacked-example(Disabled group, radio/radio-disabled-group.component)
 *
 * */
var NbRadioGroupComponent = /** @class */ (function () {
    function NbRadioGroupComponent(hostElement, platformId, document) {
        this.hostElement = hostElement;
        this.platformId = platformId;
        this.document = document;
        this.alive = true;
        this.isTouched = false;
        this.onChange = function (value) { };
        this.onTouched = function () { };
        this._status = '';
        this.valueChange = new EventEmitter();
    }
    NbRadioGroupComponent_1 = NbRadioGroupComponent;
    Object.defineProperty(NbRadioGroupComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.updateValues();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioGroupComponent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (name) {
            this._name = name;
            this.updateNames();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioGroupComponent.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
            this._disabled = convertToBoolProperty(disabled);
            this.updateDisabled();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbRadioGroupComponent.prototype, "status", {
        /**
         * Radio buttons status.
         * Possible values are `primary` (default), `success`, `warning`, `danger`, `info`.
         */
        get: function () {
            return this._status;
        },
        set: function (value) {
            if (this._status !== value) {
                this._status = value;
                this.updateStatus();
            }
        },
        enumerable: true,
        configurable: true
    });
    NbRadioGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        // In case option 'name' isn't set on nb-radio component,
        // we need to set it's name right away, so it won't overlap with options
        // without names from other radio groups. Otherwise they all would have
        // same name and will be considered as options from one group so only the
        // last option will stay selected.
        this.updateNames();
        Promise.resolve().then(function () { return _this.updateAndSubscribeToRadios(); });
        this.radios.changes
            .pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () {
            // 'changes' emit during change detection run and we can't update
            // option properties right of since they already was initialized.
            // Instead we schedule microtask to update radios after change detection
            // run is finished.
            Promise.resolve().then(function () { return _this.updateAndSubscribeToRadios(); });
        });
    };
    NbRadioGroupComponent.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbRadioGroupComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    NbRadioGroupComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    NbRadioGroupComponent.prototype.writeValue = function (value) {
        this.value = value;
        if (typeof value !== 'undefined') {
            this.updateValues();
        }
    };
    NbRadioGroupComponent.prototype.updateAndSubscribeToRadios = function () {
        this.updateNames();
        this.updateValues();
        this.updateDisabled();
        this.updateStatus();
        this.subscribeOnRadiosValueChange();
        this.subscribeOnRadiosBlur();
    };
    NbRadioGroupComponent.prototype.updateNames = function () {
        var _this = this;
        if (this.radios) {
            this.radios.forEach(function (radio) { return radio.name = _this.name; });
        }
    };
    NbRadioGroupComponent.prototype.updateValues = function () {
        var _this = this;
        if (this.radios && typeof this.value !== 'undefined') {
            this.radios.forEach(function (radio) { return radio.checked = radio.value === _this.value; });
        }
    };
    NbRadioGroupComponent.prototype.updateDisabled = function () {
        var _this = this;
        if (this.radios && typeof this.disabled !== 'undefined') {
            this.radios.forEach(function (radio) { return radio.disabled = _this.disabled; });
        }
    };
    NbRadioGroupComponent.prototype.subscribeOnRadiosValueChange = function () {
        var _this = this;
        if (!this.radios || !this.radios.length) {
            return;
        }
        merge.apply(void 0, this.radios.map(function (radio) { return radio.valueChange; })).pipe(takeWhile(function () { return _this.alive; }), takeUntil(this.radios.changes))
            .subscribe(function (value) {
            _this.writeValue(value);
            _this.propagateValue(value);
        });
    };
    NbRadioGroupComponent.prototype.propagateValue = function (value) {
        this.valueChange.emit(value);
        this.onChange(value);
    };
    NbRadioGroupComponent.prototype.subscribeOnRadiosBlur = function () {
        var _this = this;
        var hasNoRadios = !this.radios || !this.radios.length;
        if (!isPlatformBrowser(this.platformId) || this.isTouched || hasNoRadios) {
            return;
        }
        var hostElement = this.hostElement.nativeElement;
        fromEvent(hostElement, 'focusin')
            .pipe(takeWhile(function () { return _this.alive; }), filter(function (event) { return hostElement.contains(event.target); }), switchMap(function () { return merge(fromEvent(_this.document, 'focusin'), fromEvent(_this.document, 'click')); }), filter(function (event) { return !hostElement.contains(event.target); }), take(1), takeUntil(this.radios.changes))
            .subscribe(function () { return _this.markTouched(); });
    };
    NbRadioGroupComponent.prototype.markTouched = function () {
        this.isTouched = true;
        this.onTouched();
    };
    NbRadioGroupComponent.prototype.updateStatus = function () {
        var _this = this;
        if (this.radios) {
            this.radios.forEach(function (radio) { return radio.status = _this.status; });
        }
    };
    var NbRadioGroupComponent_1;
    __decorate$148([
        Input(),
        __metadata$99("design:type", Object),
        __metadata$99("design:paramtypes", [Object])
    ], NbRadioGroupComponent.prototype, "value", null);
    __decorate$148([
        Input(),
        __metadata$99("design:type", String),
        __metadata$99("design:paramtypes", [String])
    ], NbRadioGroupComponent.prototype, "name", null);
    __decorate$148([
        Input(),
        __metadata$99("design:type", Boolean),
        __metadata$99("design:paramtypes", [Boolean])
    ], NbRadioGroupComponent.prototype, "disabled", null);
    __decorate$148([
        Input(),
        __metadata$99("design:type", String),
        __metadata$99("design:paramtypes", [String])
    ], NbRadioGroupComponent.prototype, "status", null);
    __decorate$148([
        ContentChildren(NbRadioComponent, { descendants: true }),
        __metadata$99("design:type", QueryList)
    ], NbRadioGroupComponent.prototype, "radios", void 0);
    __decorate$148([
        Output(),
        __metadata$99("design:type", EventEmitter)
    ], NbRadioGroupComponent.prototype, "valueChange", void 0);
    NbRadioGroupComponent = NbRadioGroupComponent_1 = __decorate$148([
        Component({
            selector: 'nb-radio-group',
            template: "\n    <ng-content select=\"nb-radio\"></ng-content>",
            providers: [
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(function () { return NbRadioGroupComponent_1; }),
                    multi: true,
                },
            ],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param$25(1, Inject(PLATFORM_ID)),
        __param$25(2, Inject(NB_DOCUMENT)),
        __metadata$99("design:paramtypes", [ElementRef, Object, Object])
    ], NbRadioGroupComponent);
    return NbRadioGroupComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$146 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbRadioModule = /** @class */ (function () {
    function NbRadioModule() {
    }
    NbRadioModule = __decorate$146([
        NgModule({
            imports: [],
            exports: [NbRadioComponent, NbRadioGroupComponent],
            declarations: [NbRadioComponent, NbRadioGroupComponent],
        })
    ], NbRadioModule);
    return NbRadioModule;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_DEFAULT_ROW_LEVEL = 0;
/**
 * Implicit context of cells and rows
 */
var NbTreeGridPresentationNode = /** @class */ (function () {
    function NbTreeGridPresentationNode(
    /**
     * Data object associated with row
     */
    data, children, 
    /**
     * Row expand state
     */
    expanded, level) {
        this.data = data;
        this.children = children;
        this.expanded = expanded;
        this.level = level;
    }
    /**
     * True if row has child rows
     */
    NbTreeGridPresentationNode.prototype.hasChildren = function () {
        return !!this.children && !!this.children.length;
    };
    return NbTreeGridPresentationNode;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __assign$4 = (this && this.__assign) || function () {
    __assign$4 = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign$4.apply(this, arguments);
};
var __decorate$152 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbTreeGridDataService = /** @class */ (function () {
    function NbTreeGridDataService() {
        this.defaultGetters = {
            dataGetter: function (node) { return node.data; },
            childrenGetter: function (d) { return d.children || undefined; },
            expandedGetter: function (d) { return !!d.expanded; },
        };
    }
    NbTreeGridDataService.prototype.toPresentationNodes = function (nodes, customGetters, level) {
        if (level === void 0) { level = NB_DEFAULT_ROW_LEVEL; }
        var getters = __assign$4({}, this.defaultGetters, customGetters);
        return this.mapNodes(nodes, getters, level);
    };
    NbTreeGridDataService.prototype.mapNodes = function (nodes, getters, level) {
        var _this = this;
        var dataGetter = getters.dataGetter, childrenGetter = getters.childrenGetter, expandedGetter = getters.expandedGetter;
        return nodes.map(function (node) {
            var childrenNodes = childrenGetter(node);
            var children;
            if (childrenNodes) {
                children = _this.toPresentationNodes(childrenNodes, getters, level + 1);
            }
            return new NbTreeGridPresentationNode(dataGetter(node), children, expandedGetter(node), level);
        });
    };
    NbTreeGridDataService.prototype.flattenExpanded = function (nodes) {
        var _this = this;
        return nodes.reduce(function (res, node) {
            res.push(node);
            if (node.expanded && node.hasChildren()) {
                res.push.apply(res, _this.flattenExpanded(node.children));
            }
            return res;
        }, []);
    };
    NbTreeGridDataService.prototype.copy = function (nodes) {
        var _this = this;
        return nodes.map(function (node) {
            var children;
            if (node.hasChildren()) {
                children = _this.copy(node.children);
            }
            return new NbTreeGridPresentationNode(node.data, children, node.expanded, node.level);
        });
    };
    NbTreeGridDataService = __decorate$152([
        Injectable()
    ], NbTreeGridDataService);
    return NbTreeGridDataService;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$153 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Service used to filter tree grid data. Searched searchString in all object values.
 * If you need custom filter, you can extend this service and override filterPredicate or whole filter method.
 */
var NbTreeGridFilterService = /** @class */ (function () {
    function NbTreeGridFilterService() {
    }
    NbTreeGridFilterService.prototype.filter = function (query, data) {
        var _this = this;
        if (!query) {
            return data;
        }
        return data.reduce(function (filtered, node) {
            var filteredChildren;
            if (node.children) {
                filteredChildren = _this.filter(query, node.children);
                node.children = filteredChildren;
            }
            node.expanded = false;
            if (filteredChildren && filteredChildren.length) {
                node.expanded = true;
                filtered.push(node);
            }
            else if (_this.filterPredicate(node.data, query)) {
                filtered.push(node);
            }
            return filtered;
        }, []);
    };
    NbTreeGridFilterService.prototype.filterPredicate = function (data, searchQuery) {
        var preparedQuery = searchQuery.trim().toLocaleLowerCase();
        for (var _i = 0, _a = Object.values(data); _i < _a.length; _i++) {
            var val = _a[_i];
            var preparedVal = ("" + val).trim().toLocaleLowerCase();
            if (preparedVal.includes(preparedQuery)) {
                return true;
            }
        }
        return false;
    };
    NbTreeGridFilterService = __decorate$153([
        Injectable()
    ], NbTreeGridFilterService);
    return NbTreeGridFilterService;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$155 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$102 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$27 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbSortDirection;
(function (NbSortDirection) {
    NbSortDirection["ASCENDING"] = "asc";
    NbSortDirection["DESCENDING"] = "desc";
    NbSortDirection["NONE"] = "";
})(NbSortDirection || (NbSortDirection = {}));
var sortDirections = [
    NbSortDirection.ASCENDING,
    NbSortDirection.DESCENDING,
    NbSortDirection.NONE,
];
/**
 * Directive triggers sort method of passed object when sort header changes direction
 */
var NbSortDirective = /** @class */ (function () {
    function NbSortDirective() {
        this.sort = new EventEmitter();
    }
    NbSortDirective.prototype.emitSort = function (sortRequest) {
        if (this.sortable && this.sortable.sort) {
            this.sortable.sort(sortRequest);
        }
        this.sort.emit(sortRequest);
    };
    __decorate$155([
        Input('nbSort'),
        __metadata$102("design:type", Object)
    ], NbSortDirective.prototype, "sortable", void 0);
    __decorate$155([
        Output(),
        __metadata$102("design:type", EventEmitter)
    ], NbSortDirective.prototype, "sort", void 0);
    NbSortDirective = __decorate$155([
        Directive({ selector: '[nbSort]' })
    ], NbSortDirective);
    return NbSortDirective;
}());
/**
 * Directive for headers sort icons. Mark you icon implementation with this structural directive and
 * it'll set template's implicit context with current direction. Context also has `isAscending`,
 * `isDescending` and `isNone` properties.
 */
var NbSortHeaderIconDirective = /** @class */ (function () {
    function NbSortHeaderIconDirective() {
    }
    NbSortHeaderIconDirective = __decorate$155([
        Directive({ selector: '[nbSortHeaderIcon]' })
    ], NbSortHeaderIconDirective);
    return NbSortHeaderIconDirective;
}());
var NbSortIconComponent = /** @class */ (function () {
    function NbSortIconComponent() {
        this.direction = NbSortDirection.NONE;
    }
    NbSortIconComponent.prototype.isAscending = function () {
        return this.direction === NbSortDirection.ASCENDING;
    };
    NbSortIconComponent.prototype.isDescending = function () {
        return this.direction === NbSortDirection.DESCENDING;
    };
    NbSortIconComponent.prototype.isDirectionSet = function () {
        return this.isAscending() || this.isDescending();
    };
    __decorate$155([
        Input(),
        __metadata$102("design:type", String)
    ], NbSortIconComponent.prototype, "direction", void 0);
    NbSortIconComponent = __decorate$155([
        Component({
            selector: 'nb-sort-icon',
            template: "\n    <ng-container *ngIf=\"isDirectionSet()\">\n      <nb-icon *ngIf=\"isAscending()\" icon=\"chevron-down-outline\" pack=\"nebular-essentials\" aria-hidden=\"true\"></nb-icon>\n      <nb-icon *ngIf=\"isDescending()\" icon=\"chevron-up-outline\" pack=\"nebular-essentials\" aria-hidden=\"true\"></nb-icon>\n    </ng-container>\n  "
        })
    ], NbSortIconComponent);
    return NbSortIconComponent;
}());
/**
 * Marks header as sort header so it emitting sort event when clicked.
 */
var NbSortHeaderComponent = /** @class */ (function () {
    function NbSortHeaderComponent(sort, columnDef) {
        this.sort = sort;
        this.columnDef = columnDef;
        this.disabledValue = false;
    }
    Object.defineProperty(NbSortHeaderComponent.prototype, "disabled", {
        get: function () {
            return this.disabledValue;
        },
        /**
         * Disable sort header
         */
        set: function (value) {
            this.disabledValue = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbSortHeaderComponent.prototype.sortIfEnabled = function () {
        if (!this.disabled) {
            this.sortData();
        }
    };
    NbSortHeaderComponent.prototype.isAscending = function () {
        return this.direction === NbSortDirection.ASCENDING;
    };
    NbSortHeaderComponent.prototype.isDescending = function () {
        return this.direction === NbSortDirection.DESCENDING;
    };
    NbSortHeaderComponent.prototype.sortData = function () {
        var sortRequest = this.createSortRequest();
        this.sort.emitSort(sortRequest);
    };
    NbSortHeaderComponent.prototype.getIconContext = function () {
        return {
            $implicit: this.direction,
            isAscending: this.isAscending(),
            isDescending: this.isDescending(),
            isNone: !this.isAscending() && !this.isDescending(),
        };
    };
    NbSortHeaderComponent.prototype.getDisabledAttributeValue = function () {
        return this.disabled ? '' : null;
    };
    NbSortHeaderComponent.prototype.createSortRequest = function () {
        this.direction = this.getNextDirection();
        return { direction: this.direction, column: this.columnDef.name };
    };
    NbSortHeaderComponent.prototype.getNextDirection = function () {
        var sortDirectionCycle = sortDirections;
        var nextDirectionIndex = sortDirectionCycle.indexOf(this.direction) + 1;
        if (nextDirectionIndex >= sortDirectionCycle.length) {
            nextDirectionIndex = 0;
        }
        return sortDirectionCycle[nextDirectionIndex];
    };
    __decorate$155([
        ContentChild(NbSortHeaderIconDirective, { read: TemplateRef, static: false }),
        __metadata$102("design:type", TemplateRef)
    ], NbSortHeaderComponent.prototype, "sortIcon", void 0);
    __decorate$155([
        Input('nbSortHeader'),
        __metadata$102("design:type", String)
    ], NbSortHeaderComponent.prototype, "direction", void 0);
    __decorate$155([
        Input(),
        HostBinding('class.disabled'),
        __metadata$102("design:type", Boolean),
        __metadata$102("design:paramtypes", [Object])
    ], NbSortHeaderComponent.prototype, "disabled", null);
    __decorate$155([
        HostListener('click'),
        __metadata$102("design:type", Function),
        __metadata$102("design:paramtypes", []),
        __metadata$102("design:returntype", void 0)
    ], NbSortHeaderComponent.prototype, "sortIfEnabled", null);
    NbSortHeaderComponent = __decorate$155([
        Component({
            selector: '[nbSortHeader]',
            template: "\n    <button\n      class=\"nb-tree-grid-header-change-sort-button\"\n      type=\"button\"\n      [attr.disabled]=\"getDisabledAttributeValue()\"\n      (click)=\"sortData()\">\n      <ng-content></ng-content>\n    </button>\n    <nb-sort-icon *ngIf=\"!sortIcon; else customIcon\" [direction]=\"direction\"></nb-sort-icon>\n    <ng-template #customIcon [ngTemplateOutlet]=\"sortIcon\" [ngTemplateOutletContext]=\"getIconContext()\"></ng-template>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param$27(1, Inject(NB_SORT_HEADER_COLUMN_DEF)),
        __metadata$102("design:paramtypes", [NbSortDirective, Object])
    ], NbSortHeaderComponent);
    return NbSortHeaderComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$154 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Service used to sort tree grid data. Uses Array.prototype.sort method.
 * If you need custom sorting, you can extend this service and override comparator or whole sort method.
 */
var NbTreeGridSortService = /** @class */ (function () {
    function NbTreeGridSortService() {
    }
    NbTreeGridSortService.prototype.sort = function (request, data) {
        var _this = this;
        if (!request) {
            return data;
        }
        var sorted = data.sort(function (na, nb) { return _this.comparator(request, na, nb); });
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var node = data_1[_i];
            if (node.children) {
                node.children = this.sort(request, node.children);
            }
        }
        return sorted;
    };
    NbTreeGridSortService.prototype.comparator = function (request, na, nb) {
        var key = request.column;
        var dir = request.direction;
        var a = na.data[key];
        var b = nb.data[key];
        var res = 0;
        if (a > b) {
            res = 1;
        }
        if (a < b) {
            res = -1;
        }
        return dir === NbSortDirection.ASCENDING ? res : res * -1;
    };
    NbTreeGridSortService = __decorate$154([
        Injectable()
    ], NbTreeGridSortService);
    return NbTreeGridSortService;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$156 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NbTreeGridService = /** @class */ (function () {
    function NbTreeGridService() {
    }
    NbTreeGridService.prototype.expand = function (data, row, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var node = this.find(data, row);
        node.expanded = true;
        if (options.deep && node.hasChildren()) {
            node.children.forEach(function (n) { return _this.expand(data, n.data, options); });
        }
    };
    NbTreeGridService.prototype.collapse = function (data, row, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        var node = this.find(data, row);
        node.expanded = false;
        if (options.deep && node.hasChildren()) {
            node.children.forEach(function (n) { return _this.collapse(data, n.data, options); });
        }
    };
    NbTreeGridService.prototype.toggle = function (data, row, options) {
        if (options === void 0) { options = {}; }
        var node = this.find(data, row);
        if (node.expanded) {
            this.collapse(data, row, options);
        }
        else {
            this.expand(data, row, options);
        }
    };
    NbTreeGridService.prototype.find = function (data, row) {
        var toCheck = data.slice();
        for (var _i = 0, toCheck_1 = toCheck; _i < toCheck_1.length; _i++) {
            var node = toCheck_1[_i];
            if (node.data === row) {
                return node;
            }
            toCheck.push.apply(toCheck, node.children);
        }
    };
    NbTreeGridService = __decorate$156([
        Injectable()
    ], NbTreeGridService);
    return NbTreeGridService;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$25 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$151 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$101 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbTreeGridDataSource = /** @class */ (function (_super) {
    __extends$25(NbTreeGridDataSource, _super);
    function NbTreeGridDataSource(sortService, filterService, treeGridService, treeGridDataService) {
        var _this = _super.call(this) || this;
        _this.sortService = sortService;
        _this.filterService = filterService;
        _this.treeGridService = treeGridService;
        _this.treeGridDataService = treeGridDataService;
        /** Stream emitting render data to the table (depends on ordered data changes). */
        _this.renderData = new BehaviorSubject([]);
        _this.filterRequest = new BehaviorSubject('');
        _this.sortRequest = new BehaviorSubject(null);
        return _this;
    }
    NbTreeGridDataSource.prototype.setData = function (data, customGetters) {
        var presentationData = [];
        if (data) {
            presentationData = this.treeGridDataService.toPresentationNodes(data, customGetters);
        }
        this.data = new BehaviorSubject(presentationData);
        this.updateChangeSubscription();
    };
    NbTreeGridDataSource.prototype.connect = function (collectionViewer) {
        return this.renderData;
    };
    NbTreeGridDataSource.prototype.disconnect = function (collectionViewer) {
    };
    NbTreeGridDataSource.prototype.expand = function (row) {
        this.treeGridService.expand(this.data.value, row);
        this.data.next(this.data.value);
    };
    NbTreeGridDataSource.prototype.collapse = function (row) {
        this.treeGridService.collapse(this.data.value, row);
        this.data.next(this.data.value);
    };
    NbTreeGridDataSource.prototype.toggle = function (row, options) {
        this.treeGridService.toggle(this.data.value, row, options);
        this.data.next(this.data.value);
    };
    NbTreeGridDataSource.prototype.toggleByIndex = function (dataIndex, options) {
        var node = this.renderData.value && this.renderData.value[dataIndex];
        if (node) {
            this.toggle(node.data, options);
        }
    };
    NbTreeGridDataSource.prototype.getLevel = function (rowIndex) {
        var row = this.renderData.value[rowIndex];
        return row ? row.level : NB_DEFAULT_ROW_LEVEL;
    };
    NbTreeGridDataSource.prototype.sort = function (sortRequest) {
        this.sortRequest.next(sortRequest);
    };
    NbTreeGridDataSource.prototype.filter = function (searchQuery) {
        this.filterRequest.next(searchQuery);
    };
    NbTreeGridDataSource.prototype.updateChangeSubscription = function () {
        var _this = this;
        var dataStream = this.data;
        var filteredData = combineLatest(dataStream, this.filterRequest)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this.treeGridDataService.copy(data);
        }), map(function (data) { return _this.filterData(data); }));
        var sortedData = combineLatest(filteredData, this.sortRequest)
            .pipe(map(function (_a) {
            var data = _a[0];
            return _this.sortData(data);
        }));
        sortedData
            .pipe(map(function (data) { return _this.treeGridDataService.flattenExpanded(data); }))
            .subscribe(function (data) { return _this.renderData.next(data); });
    };
    NbTreeGridDataSource.prototype.filterData = function (data) {
        return this.filterService.filter(this.filterRequest.value, data);
    };
    NbTreeGridDataSource.prototype.sortData = function (data) {
        return this.sortService.sort(this.sortRequest.value, data);
    };
    return NbTreeGridDataSource;
}(NbDataSource));
var NbTreeGridDataSourceBuilder = /** @class */ (function () {
    function NbTreeGridDataSourceBuilder(filterService, sortService, treeGridService, treeGridDataService) {
        this.filterService = filterService;
        this.sortService = sortService;
        this.treeGridService = treeGridService;
        this.treeGridDataService = treeGridDataService;
    }
    NbTreeGridDataSourceBuilder.prototype.create = function (data, customGetters) {
        var dataSource = new NbTreeGridDataSource(this.sortService, this.filterService, this.treeGridService, this.treeGridDataService);
        dataSource.setData(data, customGetters);
        return dataSource;
    };
    NbTreeGridDataSourceBuilder = __decorate$151([
        Injectable(),
        __metadata$101("design:paramtypes", [NbTreeGridFilterService,
            NbTreeGridSortService,
            NbTreeGridService,
            NbTreeGridDataService])
    ], NbTreeGridDataSourceBuilder);
    return NbTreeGridDataSourceBuilder;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var NB_TREE_GRID = new InjectionToken('NB_TREE_GRID');

var NbCdkRowDef = CdkRowDef;
var NbCdkRow = CdkRow;
var NbCdkCellDef = CdkCellDef;
var NbCdkHeaderRowDef = CdkHeaderRowDef;
var NbCdkHeaderRow = CdkHeaderRow;
var NbCdkHeaderCellDef = CdkHeaderCellDef;
var NbCdkFooterRowDef = CdkFooterRowDef;
var NbCdkFooterRow = CdkFooterRow;
var NbCdkFooterCellDef = CdkFooterCellDef;
var NbCdkColumnDef = CdkColumnDef;
var NbCdkCell = CdkCell;
var NbCdkHeaderCell = CdkHeaderCell;
var NbCdkFooterCell = CdkFooterCell;

var __extends$26 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$157 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$103 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$28 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NB_ROW_DOUBLE_CLICK_DELAY = 200;
/**
 * Cells container. Adds the right class and role.
 */
var NbTreeGridRowComponent = /** @class */ (function (_super) {
    __extends$26(NbTreeGridRowComponent, _super);
    function NbTreeGridRowComponent(tree, elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.doubleClick$ = new Subject();
        /**
         * Time to wait for second click to expand row deeply.
         * 200ms by default.
         */
        _this.doubleClickDelay = NB_ROW_DOUBLE_CLICK_DELAY;
        /**
         * Toggle row on click. Enabled by default.
         */
        _this.clickToToggle = true;
        _this.tree = tree;
        return _this;
    }
    NbTreeGridRowComponent_1 = NbTreeGridRowComponent;
    NbTreeGridRowComponent.prototype.toggleIfEnabledNode = function () {
        var _this = this;
        if (!this.clickToToggle) {
            return;
        }
        timer(NB_ROW_DOUBLE_CLICK_DELAY)
            .pipe(take(1), takeUntil(this.doubleClick$))
            .subscribe(function () { return _this.tree.toggleRow(_this); });
    };
    NbTreeGridRowComponent.prototype.toggleIfEnabledNodeDeep = function () {
        if (!this.clickToToggle) {
            return;
        }
        this.doubleClick$.next();
        this.tree.toggleRow(this, { deep: true });
    };
    NbTreeGridRowComponent.prototype.ngOnDestroy = function () {
        this.doubleClick$.complete();
    };
    var NbTreeGridRowComponent_1;
    __decorate$157([
        Input(),
        __metadata$103("design:type", Number)
    ], NbTreeGridRowComponent.prototype, "doubleClickDelay", void 0);
    __decorate$157([
        Input(),
        __metadata$103("design:type", Boolean)
    ], NbTreeGridRowComponent.prototype, "clickToToggle", void 0);
    __decorate$157([
        HostListener('click'),
        __metadata$103("design:type", Function),
        __metadata$103("design:paramtypes", []),
        __metadata$103("design:returntype", void 0)
    ], NbTreeGridRowComponent.prototype, "toggleIfEnabledNode", null);
    __decorate$157([
        HostListener('dblclick'),
        __metadata$103("design:type", Function),
        __metadata$103("design:paramtypes", []),
        __metadata$103("design:returntype", void 0)
    ], NbTreeGridRowComponent.prototype, "toggleIfEnabledNodeDeep", null);
    NbTreeGridRowComponent = NbTreeGridRowComponent_1 = __decorate$157([
        Component({
            selector: 'tr[nbTreeGridRow]',
            template: "<ng-container nbCellOutlet></ng-container>",
            host: {
                'class': 'nb-tree-grid-row',
                'role': 'row',
            },
            providers: [{ provide: NbCdkRow, useExisting: NbTreeGridRowComponent_1 }],
            changeDetection: ChangeDetectionStrategy.OnPush
        }),
        __param$28(0, Inject(NB_TREE_GRID)),
        __metadata$103("design:paramtypes", [Object, ElementRef])
    ], NbTreeGridRowComponent);
    return NbTreeGridRowComponent;
}(NbRowComponent));
var NbTreeGridHeaderRowComponent = /** @class */ (function (_super) {
    __extends$26(NbTreeGridHeaderRowComponent, _super);
    function NbTreeGridHeaderRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbTreeGridHeaderRowComponent_1 = NbTreeGridHeaderRowComponent;
    var NbTreeGridHeaderRowComponent_1;
    NbTreeGridHeaderRowComponent = NbTreeGridHeaderRowComponent_1 = __decorate$157([
        Component({
            selector: 'tr[nbTreeGridHeaderRow]',
            template: "\n    <ng-container nbCellOutlet></ng-container>",
            host: {
                'class': 'nb-tree-grid-header-row',
                'role': 'row',
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [{ provide: NbCdkHeaderRow, useExisting: NbTreeGridHeaderRowComponent_1 }]
        })
    ], NbTreeGridHeaderRowComponent);
    return NbTreeGridHeaderRowComponent;
}(NbHeaderRowComponent));
var NbTreeGridFooterRowComponent = /** @class */ (function (_super) {
    __extends$26(NbTreeGridFooterRowComponent, _super);
    function NbTreeGridFooterRowComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbTreeGridFooterRowComponent_1 = NbTreeGridFooterRowComponent;
    var NbTreeGridFooterRowComponent_1;
    NbTreeGridFooterRowComponent = NbTreeGridFooterRowComponent_1 = __decorate$157([
        Component({
            selector: 'tr[nbTreeGridFooterRow]',
            template: "\n    <ng-container nbCellOutlet></ng-container>",
            host: {
                'class': 'nb-tree-grid-footer-row',
                'role': 'row',
            },
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [{ provide: NbCdkFooterRow, useExisting: NbTreeGridFooterRowComponent_1 }]
        })
    ], NbTreeGridFooterRowComponent);
    return NbTreeGridFooterRowComponent;
}(NbFooterRowComponent));

var __decorate$158 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$104 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbColumnsService = /** @class */ (function () {
    function NbColumnsService(differs) {
        this.differs = differs;
        this.columnHide$ = new Subject();
        this.columnShow$ = new Subject();
    }
    NbColumnsService.prototype.setColumns = function (columns) {
        if (!this.changesDiffer) {
            this.changesDiffer = this.differs.find(columns || []).create();
        }
        if (this.changesDiffer.diff(columns)) {
            this.allColumns = Array.from(columns);
            this.visibleColumns = Array.from(columns);
        }
    };
    NbColumnsService.prototype.getVisibleColumns = function () {
        return this.visibleColumns;
    };
    NbColumnsService.prototype.hideColumn = function (column) {
        var toRemove = this.visibleColumns.indexOf(column);
        if (toRemove > -1) {
            this.visibleColumns.splice(toRemove, 1);
            this.columnHide$.next();
        }
    };
    NbColumnsService.prototype.showColumn = function (column) {
        if (this.visibleColumns.includes(column)) {
            return;
        }
        this.visibleColumns.splice(this.findInsertIndex(column), 0, column);
        this.columnShow$.next();
    };
    NbColumnsService.prototype.onColumnsChange = function () {
        return merge(this.columnShow$, this.columnHide$);
    };
    NbColumnsService.prototype.findInsertIndex = function (column) {
        var initialIndex = this.allColumns.indexOf(column);
        if (initialIndex === 0 || !this.visibleColumns.length) {
            return 0;
        }
        if (initialIndex === this.allColumns.length - 1) {
            return this.visibleColumns.length;
        }
        var leftSiblingIndex = initialIndex - 1;
        for (var i = leftSiblingIndex; i >= 0; i--) {
            var leftSibling = this.allColumns[i];
            var index = this.visibleColumns.indexOf(leftSibling);
            if (index !== -1) {
                return index + 1;
            }
        }
        var rightSiblingIndex = initialIndex + 1;
        for (var i = rightSiblingIndex; i < this.allColumns.length; i++) {
            var rightSibling = this.allColumns[i];
            var index = this.visibleColumns.indexOf(rightSibling);
            if (index !== -1) {
                return index;
            }
        }
        throw new Error("Can't restore column position.");
    };
    NbColumnsService = __decorate$158([
        Injectable(),
        __metadata$104("design:paramtypes", [IterableDiffers])
    ], NbColumnsService);
    return NbColumnsService;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$24 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$150 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$100 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$26 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Tree grid component that can be used to display nested rows of data.
 * Supports filtering and sorting.
 * @stacked-example(Showcase, tree-grid/tree-grid-showcase.component)
 *
 * ### Installation
 *
 * Import `NbTreeGridModule` to your feature module.
 * ```ts
 * @NgModule({
 *   imports: [
 *     // ...
 *     NbTreeGridModule,
 *   ],
 * })
 * export class PageModule { }
 * ```
 *
 * ### Usage
 *
 * As the most basic usage you need to define [nbTreeGridRowDef](docs/components/treegrid/api#nbtreegridrowdefdirective)
 * where you should pass columns to display in rows and
 * [nbTreeGridColumnDef](docs/components/treegrid/api#nbtreegridcolumndefdirective) - component containing cell
 * definitions for each column passed to row definition.
 * @stacked-example(Basic, tree-grid/tree-grid-basic.component)
 *
 * `NbTreeGridComponent`'s source input and `NbTreeGridDataSourceBuilder.create` expecting data to be an array of
 * objects with `data`, `children` and `expanded` properties. If your data doesn't match this interface, you can pass
 * getter functions for each property as arguments to `NbTreeGridDataSourceBuilder.create` method.
 * @stacked-example(Custom node structure, tree-grid/tree-grid-custom-node-structure.component)
 *
 * To use sorting you can add `nbSort` directive to table and subscribe to `sort` method. When user click on header,
 * sort event will be emitted. Event object contain clicked column name and desired sort direction.
 * @stacked-example(Sortable, tree-grid/tree-grid-sortable.component)
 *
 * You can use `Data Source Builder` to create `NbTreeGridDataSource` which would have toggle, sort and
 * filter methods. Then you can call this methods to change sort or toggle rows programmatically. Also `nbSort` and
 * `nbFilterInput` directives both support `NbTreeGridDataSource`, so you can pass it directly as an input and
 * directives will trigger sort, toggle themselves.
 * @stacked-example(Data Source Builder, tree-grid/tree-grid-showcase.component)
 *
 * You can create responsive grid by setting `hideOn` and `showOn` inputs of
 * [nbTreeGridColumnDef](docs/components/tree-grid/api#nbtreegridcolumndefdirective) directive.
 * When viewport reaches specified width grid hides or shows columns.
 * @stacked-example(Responsive columns, tree-grid/tree-grid-responsive.component)
 *
 * To customize sort or row toggle icons you can use `nbSortHeaderIcon` and `nbTreeGridRowToggle` directives
 * respectively. `nbSortHeaderIcon` is a structural directive and it's implicit context set to current direction.
 * Also context has three properties: `isAscending`, `isDescending` and `isNone`.
 * @stacked-example(Custom icons, tree-grid/tree-grid-custom-icons.component)
 *
 * By default, row to toggle happens when user clicks anywhere in the row. Also double click expands row deeply.
 * To disable this you can set `[clickToToggle]="false"` input of `nbTreeGridRow`.
 * @stacked-example(Disable click toggle, tree-grid/tree-grid-disable-click-toggle.component)
 *
 * @styles
 *
 * tree-grid-cell-border-width:
 * tree-grid-cell-border-style:
 * tree-grid-cell-border-color:
 * tree-grid-row-min-height:
 * tree-grid-cell-padding:
 * tree-grid-header-background-color:
 * tree-grid-header-text-color:
 * tree-grid-header-text-font-family:
 * tree-grid-header-text-font-size:
 * tree-grid-header-text-font-weight:
 * tree-grid-header-text-line-height:
 * tree-grid-footer-background-color:
 * tree-grid-footer-text-color:
 * tree-grid-footer-text-font-family:
 * tree-grid-footer-text-font-size:
 * tree-grid-footer-text-font-weight:
 * tree-grid-footer-text-line-height:
 * tree-grid-row-background-color:
 * tree-grid-row-even-background-color:
 * tree-grid-row-hover-background-color:
 * tree-grid-row-text-color:
 * tree-grid-row-text-font-family:
 * tree-grid-row-text-font-size:
 * tree-grid-row-text-font-weight:
 * tree-grid-row-text-line-height:
 * tree-grid-sort-header-button-background-color:
 * tree-grid-sort-header-button-border:
 * tree-grid-sort-header-button-padding:
 */
var NbTreeGridComponent = /** @class */ (function (_super) {
    __extends$24(NbTreeGridComponent, _super);
    function NbTreeGridComponent(dataSourceBuilder, differs, changeDetectorRef, elementRef, role, dir, document, platform, window) {
        var _this = _super.call(this, differs, changeDetectorRef, elementRef, role, dir, document, platform) || this;
        _this.dataSourceBuilder = dataSourceBuilder;
        _this.window = window;
        _this.alive = true;
        _this.levelPadding = '';
        _this.equalColumnsWidthValue = false;
        _this.treeClass = true;
        _this.platform = platform;
        return _this;
    }
    NbTreeGridComponent_1 = NbTreeGridComponent;
    Object.defineProperty(NbTreeGridComponent.prototype, "source", {
        /**
         * The table's data
         * @param data
         * @type {<T>[] | NbTreeGridDataSource}
         */
        set: function (data) {
            if (!data) {
                return;
            }
            if (data instanceof NbTreeGridDataSource) {
                this._source = data;
            }
            else {
                this._source = this.dataSourceBuilder.create(data);
            }
            this.dataSource = this._source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridComponent.prototype, "equalColumnsWidth", {
        get: function () {
            return this.equalColumnsWidthValue;
        },
        /**
         * Make all columns equal width. False by default.
         */
        set: function (value) {
            this.equalColumnsWidthValue = convertToBoolProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.checkDefsCount();
        var rowsChange$ = merge(this._contentRowDefs.changes, this._contentHeaderRowDefs.changes, this._contentFooterRowDefs.changes);
        rowsChange$.pipe(takeWhile(function () { return _this.alive; }))
            .subscribe(function () { return _this.checkDefsCount(); });
        if (this.platform.isBrowser) {
            this.updateVisibleColumns();
            var windowResize$ = fromEvent(this.window, 'resize').pipe(debounceTime(50));
            merge(rowsChange$, this._contentColumnDefs.changes, windowResize$)
                .pipe(takeWhile(function () { return _this.alive; }))
                .subscribe(function () { return _this.updateVisibleColumns(); });
        }
    };
    NbTreeGridComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
        this.alive = false;
    };
    NbTreeGridComponent.prototype.toggleRow = function (row, options) {
        this._source.toggleByIndex(this.getDataIndex(row), options);
    };
    NbTreeGridComponent.prototype.toggleCellRow = function (cell) {
        this.toggleRow(this.findCellRow(cell));
    };
    NbTreeGridComponent.prototype.getColumnWidth = function () {
        if (this.equalColumnsWidth) {
            return 100 / this.getColumnsCount() + "%";
        }
        return '';
    };
    NbTreeGridComponent.prototype.getCellLevel = function (cell, columnName) {
        var isFirstColumn = this.isFirstColumn(columnName);
        var row = isFirstColumn && this.findCellRow(cell);
        var level = row && this.getRowLevel(row);
        if (level || level === 0) {
            return level;
        }
        return NB_DEFAULT_ROW_LEVEL;
    };
    NbTreeGridComponent.prototype.getDataIndex = function (row) {
        var rowEl = row.elementRef.nativeElement;
        var parent = rowEl.parentElement;
        if (parent) {
            return Array.from(parent.children)
                .filter(function (child) { return child.hasAttribute('nbtreegridrow'); })
                .indexOf(rowEl);
        }
        return -1;
    };
    NbTreeGridComponent.prototype.getRowLevel = function (row) {
        return this._source.getLevel(this.getDataIndex(row));
    };
    NbTreeGridComponent.prototype.getColumns = function () {
        var columns = (this._contentHeaderRowDefs.length
            ? this._contentHeaderRowDefs.first
            : this._contentRowDefs.first).columns;
        return Array.from(columns || []);
    };
    NbTreeGridComponent.prototype.getColumnsCount = function () {
        return this.getColumns().length;
    };
    NbTreeGridComponent.prototype.isFirstColumn = function (columnName) {
        return this.getColumns()[0] === columnName;
    };
    NbTreeGridComponent.prototype.findCellRow = function (cell) {
        var cellRowElement = cell.elementRef.nativeElement.parentElement;
        return this.rows.toArray()
            .find(function (row) {
            return row.elementRef.nativeElement === cellRowElement;
        });
    };
    NbTreeGridComponent.prototype.checkDefsCount = function () {
        if (this._contentRowDefs.length > 1) {
            throw new Error("Found multiple row definitions");
        }
        if (this._contentHeaderRowDefs.length > 1) {
            throw new Error("Found multiple header row definitions");
        }
        if (this._contentFooterRowDefs.length > 1) {
            throw new Error("Found multiple footer row definitions");
        }
    };
    NbTreeGridComponent.prototype.updateVisibleColumns = function () {
        var width = this.window.innerWidth;
        var columnDefs = this._contentColumnDefs;
        var columnsToHide = columnDefs
            .filter(function (col) { return col.shouldHide(width); })
            .map(function (col) { return col.name; });
        var columnsToShow = columnDefs
            .filter(function (col) { return col.shouldShow(width); })
            .map(function (col) { return col.name; });
        if (!columnsToHide.length && !columnsToShow.length) {
            return;
        }
        var rowDefs = [
            this._contentHeaderRowDefs.first,
            this._contentRowDefs.first,
            this._contentFooterRowDefs.first,
        ].filter(function (d) { return !!d; });
        for (var _i = 0, rowDefs_1 = rowDefs; _i < rowDefs_1.length; _i++) {
            var rowDef = rowDefs_1[_i];
            for (var _a = 0, columnsToHide_1 = columnsToHide; _a < columnsToHide_1.length; _a++) {
                var column = columnsToHide_1[_a];
                rowDef.hideColumn(column);
            }
            for (var _b = 0, columnsToShow_1 = columnsToShow; _b < columnsToShow_1.length; _b++) {
                var column = columnsToShow_1[_b];
                rowDef.showColumn(column);
            }
        }
    };
    var NbTreeGridComponent_1;
    __decorate$150([
        Input('nbTreeGrid'),
        __metadata$100("design:type", Object),
        __metadata$100("design:paramtypes", [Object])
    ], NbTreeGridComponent.prototype, "source", null);
    __decorate$150([
        Input(),
        __metadata$100("design:type", String)
    ], NbTreeGridComponent.prototype, "levelPadding", void 0);
    __decorate$150([
        Input(),
        __metadata$100("design:type", Boolean),
        __metadata$100("design:paramtypes", [Boolean])
    ], NbTreeGridComponent.prototype, "equalColumnsWidth", null);
    __decorate$150([
        ContentChildren(NbTreeGridRowComponent),
        __metadata$100("design:type", QueryList)
    ], NbTreeGridComponent.prototype, "rows", void 0);
    __decorate$150([
        HostBinding('class.nb-tree-grid'),
        __metadata$100("design:type", Object)
    ], NbTreeGridComponent.prototype, "treeClass", void 0);
    NbTreeGridComponent = NbTreeGridComponent_1 = __decorate$150([
        Component({
            selector: 'table[nbTreeGrid]',
            template: NB_TABLE_TEMPLATE,
            changeDetection: ChangeDetectionStrategy.OnPush,
            providers: [
                { provide: NB_TREE_GRID, useExisting: NbTreeGridComponent_1 },
                NbColumnsService,
            ],
            styles: [":host{table-layout:fixed;border-spacing:0;border-collapse:collapse;width:100%;max-width:100%;overflow:auto}::ng-deep .nb-tree-grid-cell,::ng-deep .nb-tree-grid-header-cell,::ng-deep .nb-tree-grid-footer-cell{overflow:hidden}\n"]
        }),
        __param$26(4, Attribute('role')),
        __param$26(6, Inject(NB_DOCUMENT)),
        __param$26(8, Inject(NB_WINDOW)),
        __metadata$100("design:paramtypes", [NbTreeGridDataSourceBuilder,
            IterableDiffers,
            ChangeDetectorRef,
            ElementRef, String, NbDirectionality, Object, NbPlatform$1, Object])
    ], NbTreeGridComponent);
    return NbTreeGridComponent;
}(NbTable));

var __extends$27 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$159 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$105 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Data row definition for the tree-grid.
 * Captures the header row's template and columns to display.
 */
var NbTreeGridRowDefDirective = /** @class */ (function (_super) {
    __extends$27(NbTreeGridRowDefDirective, _super);
    function NbTreeGridRowDefDirective(template, differs, columnsService) {
        var _this = _super.call(this, template, differs) || this;
        _this.columnsService = columnsService;
        return _this;
    }
    NbTreeGridRowDefDirective_1 = NbTreeGridRowDefDirective;
    Object.defineProperty(NbTreeGridRowDefDirective.prototype, "columns", {
        get: function () {
            return this.columnsService.getVisibleColumns();
        },
        /**
         * Columns to be displayed on this row
         */
        set: function (value) {
            this.columnsService.setColumns(value);
        },
        enumerable: true,
        configurable: true
    });
    /** @docs-private */
    NbTreeGridRowDefDirective.prototype.hideColumn = function (column) {
        this.columnsService.hideColumn(column);
    };
    /** @docs-private */
    NbTreeGridRowDefDirective.prototype.showColumn = function (column) {
        this.columnsService.showColumn(column);
    };
    var NbTreeGridRowDefDirective_1;
    __decorate$159([
        Input('nbTreeGridRowDefColumns'),
        __metadata$105("design:type", Object),
        __metadata$105("design:paramtypes", [Object])
    ], NbTreeGridRowDefDirective.prototype, "columns", null);
    NbTreeGridRowDefDirective = NbTreeGridRowDefDirective_1 = __decorate$159([
        Directive({
            selector: '[nbTreeGridRowDef]',
            providers: [{ provide: NbCdkRowDef, useExisting: NbTreeGridRowDefDirective_1 }],
        }),
        __metadata$105("design:paramtypes", [TemplateRef,
            IterableDiffers,
            NbColumnsService])
    ], NbTreeGridRowDefDirective);
    return NbTreeGridRowDefDirective;
}(NbRowDefDirective));
var NbTreeGridHeaderRowDefDirective = /** @class */ (function (_super) {
    __extends$27(NbTreeGridHeaderRowDefDirective, _super);
    function NbTreeGridHeaderRowDefDirective(template, differs, columnsService) {
        var _this = _super.call(this, template, differs) || this;
        _this.columnsService = columnsService;
        return _this;
    }
    NbTreeGridHeaderRowDefDirective_1 = NbTreeGridHeaderRowDefDirective;
    Object.defineProperty(NbTreeGridHeaderRowDefDirective.prototype, "columns", {
        get: function () {
            return this.columnsService.getVisibleColumns();
        },
        /**
         * Columns to be displayed on this row
         */
        set: function (value) {
            this.columnsService.setColumns(value);
        },
        enumerable: true,
        configurable: true
    });
    /** @docs-private */
    NbTreeGridHeaderRowDefDirective.prototype.hideColumn = function (column) {
        this.columnsService.hideColumn(column);
    };
    /** @docs-private */
    NbTreeGridHeaderRowDefDirective.prototype.showColumn = function (column) {
        this.columnsService.showColumn(column);
    };
    var NbTreeGridHeaderRowDefDirective_1;
    __decorate$159([
        Input('nbTreeGridHeaderRowDef'),
        __metadata$105("design:type", Object),
        __metadata$105("design:paramtypes", [Object])
    ], NbTreeGridHeaderRowDefDirective.prototype, "columns", null);
    NbTreeGridHeaderRowDefDirective = NbTreeGridHeaderRowDefDirective_1 = __decorate$159([
        Directive({
            selector: '[nbTreeGridHeaderRowDef]',
            providers: [{ provide: NbCdkHeaderRowDef, useExisting: NbTreeGridHeaderRowDefDirective_1 }],
        }),
        __metadata$105("design:paramtypes", [TemplateRef,
            IterableDiffers,
            NbColumnsService])
    ], NbTreeGridHeaderRowDefDirective);
    return NbTreeGridHeaderRowDefDirective;
}(NbHeaderRowDefDirective));
var NbTreeGridFooterRowDefDirective = /** @class */ (function (_super) {
    __extends$27(NbTreeGridFooterRowDefDirective, _super);
    function NbTreeGridFooterRowDefDirective(template, differs, columnsService) {
        var _this = _super.call(this, template, differs) || this;
        _this.columnsService = columnsService;
        return _this;
    }
    NbTreeGridFooterRowDefDirective_1 = NbTreeGridFooterRowDefDirective;
    Object.defineProperty(NbTreeGridFooterRowDefDirective.prototype, "columns", {
        get: function () {
            return this.columnsService.getVisibleColumns();
        },
        /**
         * Columns to be displayed on this row
         */
        set: function (value) {
            this.columnsService.setColumns(value);
        },
        enumerable: true,
        configurable: true
    });
    /** @docs-private */
    NbTreeGridFooterRowDefDirective.prototype.hideColumn = function (column) {
        this.columnsService.hideColumn(column);
    };
    /** @docs-private */
    NbTreeGridFooterRowDefDirective.prototype.showColumn = function (column) {
        this.columnsService.showColumn(column);
    };
    var NbTreeGridFooterRowDefDirective_1;
    __decorate$159([
        Input('nbTreeGridFooterRowDef'),
        __metadata$105("design:type", Object),
        __metadata$105("design:paramtypes", [Object])
    ], NbTreeGridFooterRowDefDirective.prototype, "columns", null);
    NbTreeGridFooterRowDefDirective = NbTreeGridFooterRowDefDirective_1 = __decorate$159([
        Directive({
            selector: '[nbTreeGridFooterRowDef]',
            providers: [{ provide: NbCdkFooterRowDef, useExisting: NbTreeGridFooterRowDefDirective_1 }],
        }),
        __metadata$105("design:paramtypes", [TemplateRef,
            IterableDiffers,
            NbColumnsService])
    ], NbTreeGridFooterRowDefDirective);
    return NbTreeGridFooterRowDefDirective;
}(NbFooterRowDefDirective));
/**
 * Cell definition for a nb-table.
 * Captures the template of a column's data row cell as well as cell-specific properties.
 */
var NbTreeGridCellDefDirective = /** @class */ (function (_super) {
    __extends$27(NbTreeGridCellDefDirective, _super);
    function NbTreeGridCellDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbTreeGridCellDefDirective_1 = NbTreeGridCellDefDirective;
    var NbTreeGridCellDefDirective_1;
    NbTreeGridCellDefDirective = NbTreeGridCellDefDirective_1 = __decorate$159([
        Directive({
            selector: '[nbTreeGridCellDef]',
            providers: [{ provide: NbCdkCellDef, useExisting: NbTreeGridCellDefDirective_1 }],
        })
    ], NbTreeGridCellDefDirective);
    return NbTreeGridCellDefDirective;
}(NbCellDefDirective));
/**
 * Header cell definition for the nb-table.
 * Captures the template of a column's header cell and as well as cell-specific properties.
 */
var NbTreeGridHeaderCellDefDirective = /** @class */ (function (_super) {
    __extends$27(NbTreeGridHeaderCellDefDirective, _super);
    function NbTreeGridHeaderCellDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbTreeGridHeaderCellDefDirective_1 = NbTreeGridHeaderCellDefDirective;
    var NbTreeGridHeaderCellDefDirective_1;
    NbTreeGridHeaderCellDefDirective = NbTreeGridHeaderCellDefDirective_1 = __decorate$159([
        Directive({
            selector: '[nbTreeGridHeaderCellDef]',
            providers: [{ provide: NbCdkHeaderCellDef, useExisting: NbTreeGridHeaderCellDefDirective_1 }],
        })
    ], NbTreeGridHeaderCellDefDirective);
    return NbTreeGridHeaderCellDefDirective;
}(NbHeaderCellDefDirective));
/**
 * Footer cell definition for the nb-table.
 * Captures the template of a column's footer cell and as well as cell-specific properties.
 */
var NbTreeGridFooterCellDefDirective = /** @class */ (function (_super) {
    __extends$27(NbTreeGridFooterCellDefDirective, _super);
    function NbTreeGridFooterCellDefDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NbTreeGridFooterCellDefDirective_1 = NbTreeGridFooterCellDefDirective;
    var NbTreeGridFooterCellDefDirective_1;
    NbTreeGridFooterCellDefDirective = NbTreeGridFooterCellDefDirective_1 = __decorate$159([
        Directive({
            selector: '[nbTreeGridFooterCellDef]',
            providers: [{ provide: NbCdkFooterCellDef, useExisting: NbTreeGridFooterCellDefDirective_1 }],
        })
    ], NbTreeGridFooterCellDefDirective);
    return NbTreeGridFooterCellDefDirective;
}(NbFooterCellDefDirective));

var __extends$29 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$161 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$107 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * Column definition for the tree-grid.
 * Defines a set of cells available for a table column.
 */
var NbTreeGridColumnDefDirective = /** @class */ (function (_super) {
    __extends$29(NbTreeGridColumnDefDirective, _super);
    function NbTreeGridColumnDefDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hideOnValue = null;
        _this.showOnValue = null;
        return _this;
    }
    NbTreeGridColumnDefDirective_1 = NbTreeGridColumnDefDirective;
    Object.defineProperty(NbTreeGridColumnDefDirective.prototype, "hideOn", {
        /**
         * Amount of pixels of viewport at which column should be hidden.
         * type number
         */
        get: function () {
            return this.hideOnValue;
        },
        set: function (value) {
            this.hideOnValue = !value && value !== 0
                ? null
                : parseInt(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridColumnDefDirective.prototype, "showOn", {
        /**
         * Amount of pixels of viewport at which column should be shown.
         * type number
         */
        get: function () {
            return this.showOnValue;
        },
        set: function (value) {
            this.showOnValue = !value && value !== 0
                ? null
                : parseInt(value, 10);
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridColumnDefDirective.prototype.ngOnChanges = function () {
        if (this.hideOn != null && this.showOn != null) {
            throw new Error("hideOn and showOn are mutually exclusive and can't be used simultaneously.");
        }
    };
    NbTreeGridColumnDefDirective.prototype.shouldHide = function (width) {
        return !this.shouldShow(width);
    };
    NbTreeGridColumnDefDirective.prototype.shouldShow = function (width) {
        if (this.hideOn == null && this.showOn == null) {
            return true;
        }
        if (this.hideOn != null) {
            return width > this.hideOn;
        }
        return width >= this.showOn;
    };
    var NbTreeGridColumnDefDirective_1;
    __decorate$161([
        Input('nbTreeGridColumnDef'),
        __metadata$107("design:type", String)
    ], NbTreeGridColumnDefDirective.prototype, "name", void 0);
    __decorate$161([
        Input(),
        __metadata$107("design:type", Number),
        __metadata$107("design:paramtypes", [Number])
    ], NbTreeGridColumnDefDirective.prototype, "hideOn", null);
    __decorate$161([
        Input(),
        __metadata$107("design:type", Number),
        __metadata$107("design:paramtypes", [Number])
    ], NbTreeGridColumnDefDirective.prototype, "showOn", null);
    NbTreeGridColumnDefDirective = NbTreeGridColumnDefDirective_1 = __decorate$161([
        Directive({
            selector: '[nbTreeGridColumnDef]',
            providers: [
                { provide: NbCdkColumnDef, useExisting: NbTreeGridColumnDefDirective_1 },
                { provide: NB_SORT_HEADER_COLUMN_DEF, useExisting: NbTreeGridColumnDefDirective_1 },
            ],
        })
    ], NbTreeGridColumnDefDirective);
    return NbTreeGridColumnDefDirective;
}(NbColumnDefDirective));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$28 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$160 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$106 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param$29 = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NbTreeGridCellDirective = /** @class */ (function (_super) {
    __extends$28(NbTreeGridCellDirective, _super);
    function NbTreeGridCellDirective(columnDef, elementRef, tree, platformId, window, sanitizer, directionService, columnService, cd) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.platformId = platformId;
        _this.window = window;
        _this.sanitizer = sanitizer;
        _this.directionService = directionService;
        _this.columnService = columnService;
        _this.cd = cd;
        _this.alive = true;
        _this.initialLeftPadding = '';
        _this.initialRightPadding = '';
        _this.tree = tree;
        _this.columnDef = columnDef;
        _this.elementRef = elementRef;
        return _this;
    }
    NbTreeGridCellDirective_1 = NbTreeGridCellDirective;
    Object.defineProperty(NbTreeGridCellDirective.prototype, "columnWidth", {
        get: function () {
            this.latestWidth = this.tree.getColumnWidth();
            return this.latestWidth || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridCellDirective.prototype, "leftPadding", {
        get: function () {
            if (this.directionService.isLtr()) {
                return this.getStartPadding();
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NbTreeGridCellDirective.prototype, "rightPadding", {
        get: function () {
            if (this.directionService.isRtl()) {
                return this.getStartPadding();
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (isPlatformBrowser(this.platformId)) {
            var style$$1 = this.window.getComputedStyle(this.elementRef.nativeElement);
            this.initialLeftPadding = style$$1.paddingLeft;
            this.initialRightPadding = style$$1.paddingRight;
        }
        this.columnService.onColumnsChange()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.latestWidth !== _this.tree.getColumnWidth(); }))
            .subscribe(function () { return _this.cd.detectChanges(); });
    };
    NbTreeGridCellDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    NbTreeGridCellDirective.prototype.toggleRow = function () {
        this.tree.toggleCellRow(this);
    };
    Object.defineProperty(NbTreeGridCellDirective.prototype, "initialStartPadding", {
        get: function () {
            return this.directionService.isLtr()
                ? this.initialLeftPadding
                : this.initialRightPadding;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridCellDirective.prototype.getStartPadding = function () {
        var rowLevel = this.tree.getCellLevel(this, this.columnDef.name);
        if (rowLevel === NB_DEFAULT_ROW_LEVEL) {
            return null;
        }
        var nestingLevel = rowLevel + 1;
        var padding = '';
        if (this.tree.levelPadding) {
            padding = "calc(" + this.tree.levelPadding + " * " + nestingLevel + ")";
        }
        else if (this.initialStartPadding) {
            padding = "calc(" + this.initialStartPadding + " * " + nestingLevel + ")";
        }
        if (!padding) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustStyle(padding);
    };
    var NbTreeGridCellDirective_1;
    __decorate$160([
        HostBinding('style.width'),
        __metadata$106("design:type", String),
        __metadata$106("design:paramtypes", [])
    ], NbTreeGridCellDirective.prototype, "columnWidth", null);
    __decorate$160([
        HostBinding('style.padding-left'),
        __metadata$106("design:type", Object),
        __metadata$106("design:paramtypes", [])
    ], NbTreeGridCellDirective.prototype, "leftPadding", null);
    __decorate$160([
        HostBinding('style.padding-right'),
        __metadata$106("design:type", Object),
        __metadata$106("design:paramtypes", [])
    ], NbTreeGridCellDirective.prototype, "rightPadding", null);
    NbTreeGridCellDirective = NbTreeGridCellDirective_1 = __decorate$160([
        Directive({
            selector: 'td[nbTreeGridCell]',
            host: {
                'class': 'nb-tree-grid-cell',
                'role': 'gridcell',
            },
            providers: [{ provide: NbCdkCell, useExisting: NbTreeGridCellDirective_1 }],
        }),
        __param$29(2, Inject(NB_TREE_GRID)),
        __param$29(3, Inject(PLATFORM_ID)),
        __param$29(4, Inject(NB_WINDOW)),
        __metadata$106("design:paramtypes", [NbTreeGridColumnDefDirective,
            ElementRef, Object, Object, Object, DomSanitizer,
            NbLayoutDirectionService,
            NbColumnsService,
            ChangeDetectorRef])
    ], NbTreeGridCellDirective);
    return NbTreeGridCellDirective;
}(NbCellDirective));
var NbTreeGridHeaderCellDirective = /** @class */ (function (_super) {
    __extends$28(NbTreeGridHeaderCellDirective, _super);
    function NbTreeGridHeaderCellDirective(columnDef, elementRef, tree, columnService, cd) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnService = columnService;
        _this.cd = cd;
        _this.alive = true;
        _this.tree = tree;
        return _this;
    }
    NbTreeGridHeaderCellDirective_1 = NbTreeGridHeaderCellDirective;
    Object.defineProperty(NbTreeGridHeaderCellDirective.prototype, "columnWidth", {
        get: function () {
            this.latestWidth = this.tree.getColumnWidth();
            return this.latestWidth || null;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridHeaderCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.columnService.onColumnsChange()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.latestWidth !== _this.tree.getColumnWidth(); }))
            .subscribe(function () { return _this.cd.detectChanges(); });
    };
    NbTreeGridHeaderCellDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    var NbTreeGridHeaderCellDirective_1;
    __decorate$160([
        HostBinding('style.width'),
        __metadata$106("design:type", String),
        __metadata$106("design:paramtypes", [])
    ], NbTreeGridHeaderCellDirective.prototype, "columnWidth", null);
    NbTreeGridHeaderCellDirective = NbTreeGridHeaderCellDirective_1 = __decorate$160([
        Directive({
            selector: 'th[nbTreeGridHeaderCell]',
            host: {
                'class': 'nb-tree-grid-header-cell',
                'role': 'columnheader',
            },
            providers: [{ provide: NbCdkHeaderCell, useExisting: NbTreeGridHeaderCellDirective_1 }],
        }),
        __param$29(2, Inject(NB_TREE_GRID)),
        __metadata$106("design:paramtypes", [NbTreeGridColumnDefDirective,
            ElementRef, Object, NbColumnsService,
            ChangeDetectorRef])
    ], NbTreeGridHeaderCellDirective);
    return NbTreeGridHeaderCellDirective;
}(NbHeaderCellDirective));
var NbTreeGridFooterCellDirective = /** @class */ (function (_super) {
    __extends$28(NbTreeGridFooterCellDirective, _super);
    function NbTreeGridFooterCellDirective(columnDef, elementRef, tree, columnService, cd) {
        var _this = _super.call(this, columnDef, elementRef) || this;
        _this.columnService = columnService;
        _this.cd = cd;
        _this.alive = true;
        _this.tree = tree;
        return _this;
    }
    NbTreeGridFooterCellDirective_1 = NbTreeGridFooterCellDirective;
    Object.defineProperty(NbTreeGridFooterCellDirective.prototype, "columnWidth", {
        get: function () {
            this.latestWidth = this.tree.getColumnWidth();
            return this.latestWidth || null;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridFooterCellDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.columnService.onColumnsChange()
            .pipe(takeWhile(function () { return _this.alive; }), filter(function () { return _this.latestWidth !== _this.tree.getColumnWidth(); }))
            .subscribe(function () { return _this.cd.detectChanges(); });
    };
    NbTreeGridFooterCellDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
    };
    var NbTreeGridFooterCellDirective_1;
    __decorate$160([
        HostBinding('style.width'),
        __metadata$106("design:type", String),
        __metadata$106("design:paramtypes", [])
    ], NbTreeGridFooterCellDirective.prototype, "columnWidth", null);
    NbTreeGridFooterCellDirective = NbTreeGridFooterCellDirective_1 = __decorate$160([
        Directive({
            selector: 'td[nbTreeGridFooterCell]',
            host: {
                'class': 'nb-tree-grid-footer-cell',
                'role': 'gridcell',
            },
            providers: [{ provide: NbCdkFooterCell, useExisting: NbTreeGridFooterCellDirective_1 }],
        }),
        __param$29(2, Inject(NB_TREE_GRID)),
        __metadata$106("design:paramtypes", [NbTreeGridColumnDefDirective,
            ElementRef, Object, NbColumnsService,
            ChangeDetectorRef])
    ], NbTreeGridFooterCellDirective);
    return NbTreeGridFooterCellDirective;
}(NbFooterCellDirective));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __extends$30 = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$162 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$108 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NbFilterDirective = /** @class */ (function () {
    function NbFilterDirective() {
    }
    NbFilterDirective.prototype.filter = function (filterRequest) {
        this.filterable.filter(filterRequest);
    };
    __decorate$162([
        Input('nbFilter'),
        __metadata$108("design:type", Object)
    ], NbFilterDirective.prototype, "filterable", void 0);
    NbFilterDirective = __decorate$162([
        Directive({ selector: '[nbFilter]' })
    ], NbFilterDirective);
    return NbFilterDirective;
}());
/**
 * Helper directive to trigger data source's filter method when user types in input
 */
var NbFilterInputDirective = /** @class */ (function (_super) {
    __extends$30(NbFilterInputDirective, _super);
    function NbFilterInputDirective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.search$ = new Subject();
        _this.alive = true;
        /**
         * Debounce time before triggering filter method. Set in milliseconds.
         * Default 200.
         */
        _this.debounceTime = 200;
        return _this;
    }
    NbFilterInputDirective_1 = NbFilterInputDirective;
    NbFilterInputDirective.prototype.ngOnInit = function () {
        var _this = this;
        this.search$
            .pipe(takeWhile(function () { return _this.alive; }), debounceTime(this.debounceTime))
            .subscribe(function (query) {
            _super.prototype.filter.call(_this, query);
        });
    };
    NbFilterInputDirective.prototype.ngOnDestroy = function () {
        this.alive = false;
        this.search$.complete();
    };
    NbFilterInputDirective.prototype.filter = function (event) {
        this.search$.next(event.target.value);
    };
    var NbFilterInputDirective_1;
    __decorate$162([
        Input('nbFilterInput'),
        __metadata$108("design:type", Object)
    ], NbFilterInputDirective.prototype, "filterable", void 0);
    __decorate$162([
        Input(),
        __metadata$108("design:type", Number)
    ], NbFilterInputDirective.prototype, "debounceTime", void 0);
    __decorate$162([
        HostListener('input', ['$event']),
        __metadata$108("design:type", Function),
        __metadata$108("design:paramtypes", [Object]),
        __metadata$108("design:returntype", void 0)
    ], NbFilterInputDirective.prototype, "filter", null);
    NbFilterInputDirective = NbFilterInputDirective_1 = __decorate$162([
        Directive({
            selector: '[nbFilterInput]',
            providers: [{ provide: NbFilterDirective, useExisting: NbFilterInputDirective_1 }],
        })
    ], NbFilterInputDirective);
    return NbFilterInputDirective;
}(NbFilterDirective));

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$163 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$109 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * When using custom row toggle, apply this directive on your toggle to toggle row on element click.
 */
var NbTreeGridRowToggleDirective = /** @class */ (function () {
    function NbTreeGridRowToggleDirective(cell) {
        this.cell = cell;
    }
    NbTreeGridRowToggleDirective.prototype.toggleRow = function ($event) {
        this.cell.toggleRow();
        $event.stopPropagation();
    };
    __decorate$163([
        HostListener('click', ['$event']),
        __metadata$109("design:type", Function),
        __metadata$109("design:paramtypes", [Event]),
        __metadata$109("design:returntype", void 0)
    ], NbTreeGridRowToggleDirective.prototype, "toggleRow", null);
    NbTreeGridRowToggleDirective = __decorate$163([
        Directive({
            selector: '[nbTreeGridRowToggle]',
        }),
        __metadata$109("design:paramtypes", [NbTreeGridCellDirective])
    ], NbTreeGridRowToggleDirective);
    return NbTreeGridRowToggleDirective;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$164 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata$110 = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/**
 * NbTreeGridRowToggleComponent
 */
var NbTreeGridRowToggleComponent = /** @class */ (function () {
    function NbTreeGridRowToggleComponent(cell) {
        this.cell = cell;
    }
    Object.defineProperty(NbTreeGridRowToggleComponent.prototype, "expanded", {
        get: function () {
            return this.expandedValue;
        },
        set: function (value) {
            this.expandedValue = value;
        },
        enumerable: true,
        configurable: true
    });
    NbTreeGridRowToggleComponent.prototype.toggleRow = function ($event) {
        this.cell.toggleRow();
        $event.stopPropagation();
    };
    __decorate$164([
        Input(),
        __metadata$110("design:type", Boolean),
        __metadata$110("design:paramtypes", [Boolean])
    ], NbTreeGridRowToggleComponent.prototype, "expanded", null);
    __decorate$164([
        HostListener('click', ['$event']),
        __metadata$110("design:type", Function),
        __metadata$110("design:paramtypes", [Event]),
        __metadata$110("design:returntype", void 0)
    ], NbTreeGridRowToggleComponent.prototype, "toggleRow", null);
    NbTreeGridRowToggleComponent = __decorate$164([
        Component({
            selector: 'nb-tree-grid-row-toggle',
            template: "\n    <button class=\"row-toggle-button\" [attr.aria-label]=\"expanded ? 'collapse' : 'expand'\">\n      <nb-icon [icon]=\"expanded ? 'chevron-down-outline' : 'chevron-right-outline'\"\n               pack=\"nebular-essentials\"\n               aria-hidden=\"true\">\n      </nb-icon>\n    </button>\n  ",
            styles: ["\n    button {\n      background: transparent;\n      border: none;\n      padding: 0;\n    }\n  "]
        }),
        __metadata$110("design:paramtypes", [NbTreeGridCellDirective])
    ], NbTreeGridRowToggleComponent);
    return NbTreeGridRowToggleComponent;
}());

/*
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate$149 = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var COMPONENTS$2 = [
    // Tree Grid
    NbTreeGridComponent,
    NbTreeGridRowDefDirective,
    NbTreeGridRowComponent,
    NbTreeGridCellDefDirective,
    NbTreeGridCellDirective,
    NbTreeGridHeaderRowDefDirective,
    NbTreeGridHeaderRowComponent,
    NbTreeGridHeaderCellDefDirective,
    NbTreeGridHeaderCellDirective,
    NbTreeGridFooterRowDefDirective,
    NbTreeGridFooterRowComponent,
    NbTreeGridFooterCellDefDirective,
    NbTreeGridFooterCellDirective,
    NbTreeGridColumnDefDirective,
    // Sort directives
    NbSortDirective,
    NbSortHeaderComponent,
    NbSortIconComponent,
    // Filter directives
    NbFilterDirective,
    NbFilterInputDirective,
    NbTreeGridRowToggleDirective,
    NbTreeGridRowToggleComponent,
    NbSortHeaderIconDirective,
];
var NbTreeGridModule = /** @class */ (function () {
    function NbTreeGridModule() {
    }
    NbTreeGridModule = __decorate$149([
        NgModule({
            imports: [CommonModule, NbTableModule, NbIconModule],
            declarations: COMPONENTS$2.slice(),
            exports: [NbTableModule].concat(COMPONENTS$2),
            providers: [
                NbTreeGridSortService,
                NbTreeGridFilterService,
                NbTreeGridService,
                NbTreeGridDataService,
                NbTreeGridDataSourceBuilder,
            ],
        })
    ], NbTreeGridModule);
    return NbTreeGridModule;
}());

/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
// TODO: export all components

/**
 * Generated bundle index. Do not edit.
 */

export { NbScrollStrategyOptions as ɵb, NbPlatform$1 as ɵd, NbMenuInternalService as ɵa, NbSharedModule as ɵc, NbCalendarHeaderComponent, NbCalendarDayCellComponent, NbCalendarYearPickerComponent, YEARS_IN_VIEW, YEARS_IN_COLUMN, NbCalendarMonthPickerComponent, MONTHS_IN_VIEW, MONTHS_IN_COLUMN, NbCalendarDayPickerComponent, NbCalendarNavigationComponent, NbCalendarPageableNavigationComponent, NbCalendarDaysNamesComponent, NbCalendarMonthCellComponent, NbCalendarYearCellComponent, NbCalendarPickerRowComponent, NbCalendarPickerComponent, NbCalendarMonthModelService, NbNativeDateService, NbDateService, NbMenuService, NbMenuItem, NbBlockScrollStrategyAdapter, NB_THEME_OPTIONS, NB_MEDIA_BREAKPOINTS, NB_BUILT_IN_JS_THEMES, NB_JS_THEMES, NB_WINDOW, NB_DOCUMENT, nbWindowFactory, NbThemeModule, NbThemeService, NbSpinnerService, DEFAULT_MEDIA_BREAKPOINTS, NbMediaBreakpointsService, NbColorHelper, NbLayoutDirection, NB_LAYOUT_DIRECTION, NbLayoutDirectionService, NbLayoutScrollService, NbLayoutRulerService, BUILT_IN_THEMES, NbJSThemesRegistry, CORPORATE_THEME, COSMIC_THEME, DEFAULT_THEME, NbCardModule, NbCardHeaderComponent, NbCardBodyComponent, NbCardFooterComponent, NbCardComponent, NbFlipCardComponent, NbRevealCardComponent, NbCardFrontComponent, NbCardBackComponent, NbCalendarModule, NbCalendarComponent, NbCalendarRangeModule, NbCalendarRangeComponent, NbBaseCalendarComponent, NbBaseCalendarModule, NbCalendarRangeDayCellComponent, NbCalendarRangeYearCellComponent, NbCalendarViewMode, NbCalendarSize, NbCalendarKitModule, NbLayoutModule, NbLayoutComponent, NbLayoutColumnComponent, NbLayoutHeaderComponent, NbLayoutFooterComponent, NbRestoreScrollTopHelper, NbMenuModule, NbToggleStates, NbMenuItemComponent, NbMenuComponent, NbRouteTabsetModule, NbRouteTabsetComponent, NbSidebarModule, NbSidebarService, NbSidebarHeaderComponent, NbSidebarFooterComponent, NbSidebarComponent, NbTabsetModule, NbTabComponent, NbTabsetComponent, NbUserModule, NbUserComponent, NbActionsModule, NbActionComponent, NbActionsComponent, NbSearchModule, NbSearchService, NbSearchFieldComponent, NbSearchComponent, NbCheckboxComponent, NbCheckboxModule, NbBadgeComponent, NbBadgeModule, NbPopoverDirective, NbPopoverModule, NbPopoverComponent, NbContextMenuDirective, NbContextMenuComponent, NbContextMenuModule, NbProgressBarComponent, NbProgressBarModule, NbAlertComponent, NbAlertModule, NbChatComponent, NbChatMessageComponent, NbChatMessageMapComponent, NbChatMessageFileComponent, NbChatMessageQuoteComponent, NbChatMessageTextComponent, NbChatFormComponent, NbChatModule, NbChatOptions, NbSpinnerComponent, NbSpinnerDirective, NbSpinnerModule, NB_STEPPER, NbStepperComponent, NbStepComponent, NbStepperNextDirective, NbStepperPreviousDirective, NbStepperModule, NbAccordionComponent, NbAccordionItemComponent, NbAccordionItemBodyComponent, NbAccordionItemHeaderComponent, NbAccordionModule, NbButtonComponent, NbButtonModule, NbListComponent, NbListItemComponent, NbListModule, NbListPageTrackerDirective, NbScrollableContainerDimentions, NbInfiniteListDirective, NbInputDirective, NbInputModule, NbOverlayModule, patch, createContainer, NbOverlayService, NbAdjustment, NbPosition, NbAdjustableConnectedPositionStrategy, NbGlobalPositionStrategy, NbPositionBuilderService, NbPositionedContainer, NbOverlayContainerComponent, NbTrigger, NbTriggerStrategyBase, NbClickTriggerStrategy, NbHoverTriggerStrategy, NbHintTriggerStrategy, NbFocusTriggerStrategy, NbNoopTriggerStrategy, NbTriggerStrategyBuilderService, NbPortalDirective, NbPortalOutletDirective, NbComponentPortal, NbOverlay, NbPlatform, NbOverlayPositionBuilder, NbTemplatePortal, NbOverlayContainer, NbFlexibleConnectedPositionStrategy, NbPortalInjector, NbCdkMappingModule, NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbPositionHelper, NbDynamicOverlay, NbDynamicOverlayChange, NbDynamicOverlayHandler, NbA11yModule, NbFocusTrap, NbFocusTrapFactoryService, NbCdkAdapterModule, NbOverlayContainerAdapter, NbScrollDispatcherAdapter, NbViewportRulerAdapter, NbDirectionality, NbBidiModule, NbPlatformModule, NbCellDefDirective, NbHeaderCellDefDirective, NbFooterCellDefDirective, NB_SORT_HEADER_COLUMN_DEF, NbColumnDefDirective, NbHeaderCellDirective, NbFooterCellDirective, NbCellDirective, NbDataSource, NbDataRowOutletDirective, NbHeaderRowOutletDirective, NbFooterRowOutletDirective, NbCellOutletDirective, NbHeaderRowDefDirective, NbFooterRowDefDirective, NbRowDefDirective, NbHeaderRowComponent, NbFooterRowComponent, NbRowComponent, NB_TABLE_TEMPLATE, NbTable, NbTableModule, NB_DIALOG_CONFIG, NbDialogConfig, NbDialogRef, NbDialogService, NbDialogModule, NbToastrModule, NbToastRef, NbToastContainer, NbToastrContainerRegistry, NbToastrService, NbToast, NbToastComponent, NB_TOASTR_CONFIG, NbToastrConfig, NbToastrContainerComponent, NbTooltipModule, NbTooltipDirective, NbTooltipComponent, NbSelectModule, NbSelectLabelComponent, NbSelectComponent, NbOptionComponent, NbOptionGroupComponent, NB_SELECT_INJECTION_TOKEN, NbWindowModule, NbWindowService, NbWindowRef, NbWindowState, NbWindowConfig, NB_WINDOW_CONTENT, NB_WINDOW_CONFIG, NB_WINDOW_CONTEXT, NbWindowComponent, NbWindowsContainerComponent, NbDatepickerModule, NbDatepickerAdapter, NbDatepicker, NB_DATE_ADAPTER, NB_DATE_SERVICE_OPTIONS, NbDatepickerDirective, NbDateAdapterService, NbRangeAdapterService, NbDatepickerContainerComponent, NbBasePicker, NbDatepickerComponent, NbRangepickerComponent, NbDialogContainerComponent, NbRadioModule, NbRadioGroupComponent, NbRadioComponent, NbTreeGridModule, NbTreeGridComponent, NB_ROW_DOUBLE_CLICK_DELAY, NbTreeGridRowComponent, NbTreeGridHeaderRowComponent, NbTreeGridFooterRowComponent, NB_TREE_GRID, NbSortDirection, NbSortDirective, NbSortHeaderIconDirective, NbSortIconComponent, NbSortHeaderComponent, NbTreeGridRowToggleComponent, NbTreeGridColumnDefDirective, NbTreeGridCellDirective, NbTreeGridHeaderCellDirective, NbTreeGridFooterCellDirective, NbTreeGridRowDefDirective, NbTreeGridHeaderRowDefDirective, NbTreeGridFooterRowDefDirective, NbTreeGridCellDefDirective, NbTreeGridHeaderCellDefDirective, NbTreeGridFooterCellDefDirective, NbFilterDirective, NbFilterInputDirective, NbTreeGridRowToggleDirective, NB_DEFAULT_ROW_LEVEL, NbTreeGridPresentationNode, NbTreeGridDataSource, NbTreeGridDataSourceBuilder, NbTreeGridDataService, NbTreeGridFilterService, NbTreeGridService, NbTreeGridSortService, NbColumnsService, NbIconModule, NbIconComponent, NbFontIcon, NbSvgIcon, NbIconPackType, NbIconDefinition, NbIconLibraries };
