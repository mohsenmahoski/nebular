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
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NbIconLibraries } from './icon-libraries';
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
    __decorate([
        HostBinding('innerHtml'),
        __metadata("design:type", Object)
    ], NbIconComponent.prototype, "html", void 0);
    __decorate([
        HostBinding('class.status-primary'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbIconComponent.prototype, "primary", null);
    __decorate([
        HostBinding('class.status-info'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbIconComponent.prototype, "info", null);
    __decorate([
        HostBinding('class.status-success'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbIconComponent.prototype, "success", null);
    __decorate([
        HostBinding('class.status-warning'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbIconComponent.prototype, "warning", null);
    __decorate([
        HostBinding('class.status-danger'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [])
    ], NbIconComponent.prototype, "danger", null);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbIconComponent.prototype, "icon", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbIconComponent.prototype, "pack", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], NbIconComponent.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], NbIconComponent.prototype, "status", void 0);
    NbIconComponent = __decorate([
        Component({
            selector: 'nb-icon',
            template: '',
            changeDetection: ChangeDetectionStrategy.OnPush,
            styles: [":host{display:inline-block}\n"]
        }),
        __metadata("design:paramtypes", [DomSanitizer,
            NbIconLibraries,
            ElementRef,
            Renderer2])
    ], NbIconComponent);
    return NbIconComponent;
}());
export { NbIconComponent };
//# sourceMappingURL=icon.component.js.map