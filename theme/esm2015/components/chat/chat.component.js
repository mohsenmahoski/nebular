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
import { Component, Input, HostBinding, ViewChild, ElementRef, ContentChildren, QueryList, ContentChild, } from '@angular/core';
import { convertToBoolProperty } from '../helpers';
import { NbChatFormComponent } from './chat-form.component';
import { NbChatMessageComponent } from './chat-message.component';
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
let NbChatComponent = class NbChatComponent {
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
    constructor() {
        this._scrollBottom = true;
    }
    /**
     * Scroll chat to the bottom of the list when a new message arrives
     */
    get scrollBottom() {
        return this._scrollBottom;
    }
    set scrollBottom(value) {
        this._scrollBottom = convertToBoolProperty(value);
    }
    ngOnChanges(changes) {
        if ('status' in changes) {
            this.updateFormStatus();
        }
    }
    ngAfterContentInit() {
        this.updateFormStatus();
    }
    ngAfterViewInit() {
        this.messages.changes
            .subscribe((messages) => {
            this.messages = messages;
            this.updateView();
        });
        this.updateView();
    }
    updateView() {
        if (this.scrollBottom) {
            this.scrollListBottom();
        }
    }
    scrollListBottom() {
        this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
    }
    updateFormStatus() {
        if (this.chatForm) {
            this.chatForm.setStatus(this.status);
        }
    }
    get tiny() {
        return this.size === 'tiny';
    }
    get small() {
        return this.size === 'small';
    }
    get medium() {
        return this.size === 'medium';
    }
    get large() {
        return this.size === 'large';
    }
    get giant() {
        return this.size === 'giant';
    }
    get primary() {
        return this.status === 'primary';
    }
    get success() {
        return this.status === 'success';
    }
    get info() {
        return this.status === 'info';
    }
    get warning() {
        return this.status === 'warning';
    }
    get danger() {
        return this.status === 'danger';
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatComponent.prototype, "title", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatComponent.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatComponent.prototype, "status", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], NbChatComponent.prototype, "scrollBottom", null);
__decorate([
    ViewChild('scrollable', { static: false }),
    __metadata("design:type", ElementRef)
], NbChatComponent.prototype, "scrollable", void 0);
__decorate([
    ContentChildren(NbChatMessageComponent),
    __metadata("design:type", QueryList)
], NbChatComponent.prototype, "messages", void 0);
__decorate([
    ContentChild(NbChatFormComponent, { static: false }),
    __metadata("design:type", NbChatFormComponent)
], NbChatComponent.prototype, "chatForm", void 0);
__decorate([
    HostBinding('class.size-tiny'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "tiny", null);
__decorate([
    HostBinding('class.size-small'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "small", null);
__decorate([
    HostBinding('class.size-medium'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "medium", null);
__decorate([
    HostBinding('class.size-large'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "large", null);
__decorate([
    HostBinding('class.size-giant'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "giant", null);
__decorate([
    HostBinding('class.status-primary'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "primary", null);
__decorate([
    HostBinding('class.status-success'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "success", null);
__decorate([
    HostBinding('class.status-info'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "info", null);
__decorate([
    HostBinding('class.status-warning'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "warning", null);
__decorate([
    HostBinding('class.status-danger'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], NbChatComponent.prototype, "danger", null);
NbChatComponent = __decorate([
    Component({
        selector: 'nb-chat',
        template: `
    <div class="header">{{ title }}</div>
    <div class="scrollable" #scrollable>
      <div class="messages">
        <ng-content select="nb-chat-message"></ng-content>
        <p class="no-messages" *ngIf="!messages?.length">sssssssssssssssssssss.</p>
      </div>
    </div>
    <div class="form">
      <ng-content select="nb-chat-form"></ng-content>
    </div>
  `,
        styles: [":host{display:flex;flex-direction:column;position:relative;height:100%}\n"]
    })
], NbChatComponent);
export { NbChatComponent };
//# sourceMappingURL=chat.component.js.map