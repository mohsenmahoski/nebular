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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild, ViewContainerRef, Inject, PLATFORM_ID, } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { filter, takeWhile } from 'rxjs/operators';
import { convertToBoolProperty } from '../helpers';
import { NbThemeService } from '../../services/theme.service';
import { NbSpinnerService } from '../../services/spinner.service';
import { NbLayoutDirectionService } from '../../services/direction.service';
import { NbRestoreScrollTopHelper } from './restore-scroll-top.service';
import { NbLayoutScrollService } from '../../services/scroll.service';
import { NbLayoutRulerService } from '../../services/ruler.service';
import { NB_WINDOW, NB_DOCUMENT } from '../../theme.options';
import { NbOverlayContainerAdapter } from '../cdk/adapter/overlay-container-adapter';
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
let NbLayoutComponent = class NbLayoutComponent {
    constructor(themeService, spinnerService, elementRef, renderer, window, document, platformId, layoutDirectionService, scrollService, rulerService, scrollTop, overlayContainer) {
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
            .pipe(takeWhile(() => this.alive))
            .subscribe((theme) => {
            const body = this.document.getElementsByTagName('body')[0];
            if (theme.previous) {
                this.renderer.removeClass(body, `nb-theme-${theme.previous}`);
            }
            this.renderer.addClass(body, `nb-theme-${theme.name}`);
        });
        this.themeService.onAppendLayoutClass()
            .pipe(takeWhile(() => this.alive))
            .subscribe((className) => {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        });
        this.themeService.onRemoveLayoutClass()
            .pipe(takeWhile(() => this.alive))
            .subscribe((className) => {
            this.renderer.removeClass(this.elementRef.nativeElement, className);
        });
        this.spinnerService.registerLoader(new Promise((resolve, reject) => {
            this.afterViewInit$
                .pipe(takeWhile(() => this.alive))
                .subscribe((_) => resolve());
        }));
        this.spinnerService.load();
        this.rulerService.onGetDimensions()
            .pipe(takeWhile(() => this.alive))
            .subscribe(({ listener }) => {
            listener.next(this.getDimensions());
            listener.complete();
        });
        this.scrollService.onGetPosition()
            .pipe(takeWhile(() => this.alive))
            .subscribe(({ listener }) => {
            listener.next(this.getScrollPosition());
            listener.complete();
        });
        this.scrollTop
            .shouldRestore()
            .pipe(filter(() => this.restoreScrollTopValue), takeWhile(() => this.alive))
            .subscribe(() => {
            this.scroll(0, 0);
        });
        this.scrollService
            .onScrollableChange()
            .pipe(filter(() => this.withScrollValue))
            .subscribe((scrollable) => {
            const root = this.document.documentElement;
            const scrollBlockClass = 'nb-global-scrollblock';
            this.overlayScrollBlock = !scrollable;
            /**
             * In case when Nebular Layout custom scroll `withScroll` mode is enabled
             * we need to disable default CDK scroll blocker (@link NbBlockScrollStrategyAdapter) on HTML element
             * so that it won't add additional positioning.
             */
            if (!scrollable) {
                this.renderer.addClass(root, scrollBlockClass);
            }
            else {
                this.renderer.removeClass(root, scrollBlockClass);
            }
        });
        if (isPlatformBrowser(this.platformId)) {
            // trigger first time so that after the change we have the initial value
            this.themeService.changeWindowWidth(this.window.innerWidth);
        }
    }
    /**
     * Defines whether the layout columns will be centered after some width
     * @param {boolean} val
     */
    set center(val) {
        this.centerValue = convertToBoolProperty(val);
    }
    /**
     * Defines whether the layout enters a 'window' mode, when the layout content (including sidebars and fixed header)
     * becomes centered by width with a margin from the top of the screen, like a floating window.
     * Automatically enables `withScroll` mode, as in the window mode scroll must be inside the layout and cannot be on
     * window. (TODO: check this)
     * @param {boolean} val
     */
    set windowMode(val) {
        this.windowModeValue = convertToBoolProperty(val);
        this.withScroll = this.windowModeValue;
    }
    /**
     * Defines whether to move the scrollbars to layout or leave it at the body level.
     * Automatically set to true when `windowMode` is enabled.
     * @param {boolean} val
     */
    set withScroll(val) {
        this.withScrollValue = convertToBoolProperty(val);
        // TODO: is this the best way of doing it? as we don't have access to body from theme styles
        // TODO: add e2e test
        const body = this.document.getElementsByTagName('body')[0];
        if (this.withScrollValue) {
            this.renderer.setStyle(body, 'overflow', 'hidden');
        }
        else {
            this.renderer.setStyle(body, 'overflow', 'initial');
        }
    }
    /**
     * Restores scroll to the top of the page after navigation
     * @param {boolean} val
     */
    set restoreScrollTop(val) {
        this.restoreScrollTopValue = convertToBoolProperty(val);
    }
    ngAfterViewInit() {
        this.layoutDirectionService.onDirectionChange()
            .pipe(takeWhile(() => this.alive))
            .subscribe(direction => this.document.dir = direction);
        this.scrollService.onManualScroll()
            .pipe(takeWhile(() => this.alive))
            .subscribe(({ x, y }) => this.scroll(x, y));
        this.afterViewInit$.next(true);
    }
    ngOnDestroy() {
        this.alive = false;
        this.unregisterAsOverlayContainer();
    }
    onScroll($event) {
        this.scrollService.fireScrollChange($event);
    }
    onResize(event) {
        this.themeService.changeWindowWidth(event.target.innerWidth);
    }
    /**
     * Returns scroll and client height/width
     *
     * Depending on the current scroll mode (`withScroll=true`) returns sizes from the body element
     * or from the `.scrollable-container`
     * @returns {NbLayoutDimensions}
     */
    getDimensions() {
        let clientWidth, clientHeight, scrollWidth, scrollHeight = 0;
        if (this.withScrollValue) {
            const container = this.scrollableContainerRef.nativeElement;
            clientWidth = container.clientWidth;
            clientHeight = container.clientHeight;
            scrollWidth = container.scrollWidth;
            scrollHeight = container.scrollHeight;
        }
        else {
            const { documentElement, body } = this.document;
            clientWidth = documentElement.clientWidth || body.clientWidth;
            clientHeight = documentElement.clientHeight || body.clientHeight;
            scrollWidth = documentElement.scrollWidth || body.scrollWidth;
            scrollHeight = documentElement.scrollHeight || body.scrollHeight;
        }
        return {
            clientWidth,
            clientHeight,
            scrollWidth,
            scrollHeight,
        };
    }
    /**
     * Returns scroll position of current scroll container.
     *
     * If `withScroll` = true, returns scroll position of the `.scrollable-container` element,
     * otherwise - of the scrollable element of the window (which may be different depending of a browser)
     *
     * @returns {NbScrollPosition}
     */
    getScrollPosition() {
        if (!isPlatformBrowser(this.platformId)) {
            return { x: 0, y: 0 };
        }
        if (this.withScrollValue) {
            const container = this.scrollableContainerRef.nativeElement;
            return { x: container.scrollLeft, y: container.scrollTop };
        }
        const documentRect = this.document.documentElement.getBoundingClientRect();
        const x = -documentRect.left || this.document.body.scrollLeft || this.window.scrollX ||
            this.document.documentElement.scrollLeft || 0;
        const y = -documentRect.top || this.document.body.scrollTop || this.window.scrollY ||
            this.document.documentElement.scrollTop || 0;
        return { x, y };
    }
    registerAsOverlayContainer() {
        if (this.overlayContainer.setContainer) {
            this.overlayContainer.setContainer(this.elementRef.nativeElement);
        }
    }
    unregisterAsOverlayContainer() {
        if (this.overlayContainer.clearContainer) {
            this.overlayContainer.clearContainer();
        }
    }
    scroll(x = null, y = null) {
        const { x: currentX, y: currentY } = this.getScrollPosition();
        x = x == null ? currentX : x;
        y = y == null ? currentY : y;
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        if (this.withScrollValue) {
            const scrollable = this.scrollableContainerRef.nativeElement;
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
    }
};
__decorate([
    HostBinding('class.window-mode'),
    __metadata("design:type", Boolean)
], NbLayoutComponent.prototype, "windowModeValue", void 0);
__decorate([
    HostBinding('class.with-scroll'),
    __metadata("design:type", Boolean)
], NbLayoutComponent.prototype, "withScrollValue", void 0);
__decorate([
    HostBinding('class.with-subheader'),
    __metadata("design:type", Boolean)
], NbLayoutComponent.prototype, "withSubheader", void 0);
__decorate([
    HostBinding('class.overlay-scroll-block'),
    __metadata("design:type", Boolean)
], NbLayoutComponent.prototype, "overlayScrollBlock", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutComponent.prototype, "center", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutComponent.prototype, "windowMode", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutComponent.prototype, "withScroll", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutComponent.prototype, "restoreScrollTop", null);
__decorate([
    ViewChild('layoutTopDynamicArea', { read: ViewContainerRef, static: false }),
    __metadata("design:type", ViewContainerRef)
], NbLayoutComponent.prototype, "veryTopRef", void 0);
__decorate([
    ViewChild('scrollableContainer', { read: ElementRef, static: false }),
    __metadata("design:type", ElementRef)
], NbLayoutComponent.prototype, "scrollableContainerRef", void 0);
__decorate([
    HostListener('window:scroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NbLayoutComponent.prototype, "onScroll", null);
__decorate([
    HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NbLayoutComponent.prototype, "onResize", null);
NbLayoutComponent = __decorate([
    Component({
        selector: 'nb-layout',
        template: `
    <div class="scrollable-container" #scrollableContainer (scroll)="onScroll($event)">
      <div class="layout">
        <div class="layout-container">
          <div class="content" [class.center]="centerValue">
           <ng-content select="nb-layout-header:not([subheader])"></ng-content>
            <ng-content select="nb-layout-header[subheader]"></ng-content>
            <div class="main-content">
                <ng-content select="nb-sidebar"></ng-content>
                <div class="columns">
                  <ng-content select="nb-layout-column"></ng-content>
                  <ng-content select="nb-layout-footer"></ng-content>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  `,
        styles: [":host{-webkit-font-smoothing:antialiased}[dir=ltr] :host{text-align:left}[dir=rtl] :host{text-align:right}:host .layout{display:flex;flex-direction:column}:host ::ng-deep nb-layout-header{display:block}:host ::ng-deep nb-layout-header nav{align-items:center;justify-content:flex-start;display:flex}:host ::ng-deep nb-layout-header.fixed{position:fixed;top:0;left:0;right:0;z-index:1040}:host .layout-container{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row}[dir=ltr] :host .layout-container ::ng-deep nb-sidebar.left{order:0}[dir=rtl] :host .layout-container ::ng-deep nb-sidebar.left{order:2}[dir=ltr] :host .layout-container ::ng-deep nb-sidebar.right{order:2}[dir=rtl] :host .layout-container ::ng-deep nb-sidebar.right{order:0}:host .layout-container ::ng-deep nb-sidebar.end{order:2}:host .layout-container ::ng-deep nb-sidebar .fixed{position:fixed;width:100%;overflow-y:auto;height:100%}:host .layout-container .content{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:column;min-width:0}:host .layout-container .content.center{max-width:100%;position:relative;margin-left:auto;margin-right:auto}:host .layout-container .content .columns{display:flex;flex:1;-ms-flex:1 1 auto;flex-direction:row;width:100%}:host .layout-container .content .columns ::ng-deep nb-layout-column{order:1;flex:1 0;min-width:0}[dir=ltr] :host .layout-container .content .columns ::ng-deep nb-layout-column.left{order:0}[dir=rtl] :host .layout-container .content .columns ::ng-deep nb-layout-column.left{order:2}:host .layout-container .content .columns ::ng-deep nb-layout-column.start{order:0}:host .layout-container .content ::ng-deep nb-layout-footer{display:block;margin-top:auto}:host .layout-container .content ::ng-deep nb-layout-footer nav{justify-content:center;display:flex}\n"]
    }),
    __param(4, Inject(NB_WINDOW)),
    __param(5, Inject(NB_DOCUMENT)),
    __param(6, Inject(PLATFORM_ID)),
    __metadata("design:paramtypes", [NbThemeService,
        NbSpinnerService,
        ElementRef,
        Renderer2, Object, Object, Object,
        NbLayoutDirectionService,
        NbLayoutScrollService,
        NbLayoutRulerService,
        NbRestoreScrollTopHelper,
        NbOverlayContainerAdapter])
], NbLayoutComponent);
export { NbLayoutComponent };
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
let NbLayoutColumnComponent = class NbLayoutColumnComponent {
    /**
     * Move the column to the very left position in the layout.
     * @param {boolean} val
     */
    set left(val) {
        this.leftValue = convertToBoolProperty(val);
        this.startValue = false;
    }
    /**
     * Make columnt first in the layout.
     * @param {boolean} val
     */
    set start(val) {
        this.startValue = convertToBoolProperty(val);
        this.leftValue = false;
    }
};
__decorate([
    HostBinding('class.left'),
    __metadata("design:type", Boolean)
], NbLayoutColumnComponent.prototype, "leftValue", void 0);
__decorate([
    HostBinding('class.start'),
    __metadata("design:type", Boolean)
], NbLayoutColumnComponent.prototype, "startValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutColumnComponent.prototype, "left", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutColumnComponent.prototype, "start", null);
NbLayoutColumnComponent = __decorate([
    Component({
        selector: 'nb-layout-column',
        template: `
    <ng-content></ng-content>
  `
    })
], NbLayoutColumnComponent);
export { NbLayoutColumnComponent };
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
let NbLayoutHeaderComponent = class NbLayoutHeaderComponent {
    constructor(layout) {
        this.layout = layout;
    }
    /**
     * Makes the header sticky to the top of the nb-layout.
     * @param {boolean} val
     */
    set fixed(val) {
        this.fixedValue = convertToBoolProperty(val);
    }
    /**
     * Places header on a side of the sidebar, and not above.
     * Disables fixed mode for this header and remove a shadow from the sidebar.
     * @param {boolean} val
     */
    set subheader(val) {
        this.subheaderValue = convertToBoolProperty(val);
        this.fixedValue = false;
        this.layout.withSubheader = this.subheaderValue;
    }
};
__decorate([
    HostBinding('class.fixed'),
    __metadata("design:type", Boolean)
], NbLayoutHeaderComponent.prototype, "fixedValue", void 0);
__decorate([
    HostBinding('class.subheader'),
    __metadata("design:type", Boolean)
], NbLayoutHeaderComponent.prototype, "subheaderValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutHeaderComponent.prototype, "fixed", null);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutHeaderComponent.prototype, "subheader", null);
NbLayoutHeaderComponent = __decorate([
    Component({
        selector: 'nb-layout-header',
        template: `
    <nav [class.fixed]="fixedValue">
      <ng-content></ng-content>
    </nav>
  `
    }),
    __metadata("design:paramtypes", [NbLayoutComponent])
], NbLayoutHeaderComponent);
export { NbLayoutHeaderComponent };
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
let NbLayoutFooterComponent = class NbLayoutFooterComponent {
    /**
     * Makes the footer sticky to the bottom of the window.
     * @param {boolean} val
     */
    set fixed(val) {
        this.fixedValue = convertToBoolProperty(val);
    }
};
__decorate([
    HostBinding('class.fixed'),
    __metadata("design:type", Boolean)
], NbLayoutFooterComponent.prototype, "fixedValue", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbLayoutFooterComponent.prototype, "fixed", null);
NbLayoutFooterComponent = __decorate([
    Component({
        selector: 'nb-layout-footer',
        template: `
    <nav [class.fixed]="fixedValue">
      <ng-content></ng-content>
    </nav>
  `
    })
], NbLayoutFooterComponent);
export { NbLayoutFooterComponent };
//# sourceMappingURL=layout.component.js.map