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
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
/**
 * Chat message component.
 */
let NbChatMessageQuoteComponent = class NbChatMessageQuoteComponent {
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatMessageQuoteComponent.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatMessageQuoteComponent.prototype, "sender", void 0);
__decorate([
    Input(),
    __metadata("design:type", Date)
], NbChatMessageQuoteComponent.prototype, "date", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatMessageQuoteComponent.prototype, "quote", void 0);
NbChatMessageQuoteComponent = __decorate([
    Component({
        selector: 'nb-chat-message-quote',
        template: `
    <p class="sender" *ngIf="sender || date"><b>{{ sender }}</b> <time>{{ date  | date:'shortTime' }}</time></p>
    <p class="quote">
      {{ quote }}
    </p>
    <nb-chat-message-text [message]="message">
      {{ message }}
    </nb-chat-message-text>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    })
], NbChatMessageQuoteComponent);
export { NbChatMessageQuoteComponent };
//# sourceMappingURL=chat-message-quote.component.js.map