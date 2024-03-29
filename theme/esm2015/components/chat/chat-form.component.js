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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, Output, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
let NbChatFormComponent = class NbChatFormComponent {
    constructor(cd, domSanitizer) {
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
    onDrop(event) {
        if (this.dropFiles) {
            event.preventDefault();
            event.stopPropagation();
            this.fileOver = false;
            if (event.dataTransfer && event.dataTransfer.files) {
                for (const file of event.dataTransfer.files) {
                    const res = file;
                    if (this.imgDropTypes.includes(file.type)) {
                        const fr = new FileReader();
                        fr.onload = (e) => {
                            res.src = e.target.result;
                            res.urlStyle = this.domSanitizer.bypassSecurityTrustStyle(`url(${res.src})`);
                            this.cd.detectChanges();
                        };
                        fr.readAsDataURL(file);
                    }
                    this.droppedFiles.push(res);
                }
            }
        }
    }
    removeFile(file) {
        const index = this.droppedFiles.indexOf(file);
        if (index >= 0) {
            this.droppedFiles.splice(index, 1);
        }
    }
    onDragOver() {
        if (this.dropFiles) {
            this.fileOver = true;
        }
    }
    onDragLeave() {
        if (this.dropFiles) {
            this.fileOver = false;
        }
    }
    sendMessage() {
        if (this.droppedFiles.length || String(this.message).trim().length) {
            this.send.emit({ message: this.message, files: this.droppedFiles });
            this.message = '';
            this.droppedFiles = [];
        }
    }
    setStatus(status) {
        if (this.status !== status) {
            this.status = status;
            this.cd.detectChanges();
        }
    }
    getInputStatus() {
        if (this.fileOver) {
            return this.status || 'primary';
        }
        if (this.inputFocus || this.inputHover) {
            return this.status;
        }
        return '';
    }
};
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatFormComponent.prototype, "message", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatFormComponent.prototype, "buttonTitle", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbChatFormComponent.prototype, "buttonIcon", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbChatFormComponent.prototype, "showButton", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbChatFormComponent.prototype, "dropFiles", void 0);
__decorate([
    Output(),
    __metadata("design:type", Object)
], NbChatFormComponent.prototype, "send", void 0);
__decorate([
    HostBinding('class.file-over'),
    __metadata("design:type", Object)
], NbChatFormComponent.prototype, "fileOver", void 0);
__decorate([
    HostListener('drop', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NbChatFormComponent.prototype, "onDrop", null);
__decorate([
    HostListener('dragover'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NbChatFormComponent.prototype, "onDragOver", null);
__decorate([
    HostListener('dragleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NbChatFormComponent.prototype, "onDragLeave", null);
NbChatFormComponent = __decorate([
    Component({
        selector: 'nb-chat-form',
        template: `
    <div class="dropped-files" *ngIf="droppedFiles?.length">
      <ng-container *ngFor="let file of droppedFiles">
        <div *ngIf="file.urlStyle" [style.background-image]="file.urlStyle">
          <span class="remove" (click)="removeFile(file)">&times;</span>
        </div>

        <div>
          <nb-icon *ngIf="!file.urlStyle" icon="file-text-outline" pack="nebular-essentials"></nb-icon>
          <span class="remove" (click)="removeFile(file)">&times;</span>
        </div>
      </ng-container>
    </div>
    <div class="message-row">
      <input nbInput
             fullWidth
             [status]="getInputStatus()"
             (focus)="inputFocus = true"
             (blur)="inputFocus = false"
             (mouseenter)="inputHover = true"
             (mouseleave)="inputHover = false"
             [(ngModel)]="message"
             [class.with-button]="showButton"
             type="text"
             placeholder="{{ fileOver ? 'فایل خود را اینجا قرار دهیدی.' : 'پیام خود را بنویسید ...' }}"
             (keyup.enter)="sendMessage()">
      <button nbButton
              [status]="status || 'primary'"
              *ngIf="showButton"
              [class.with-icon]="!buttonTitle"
              (click)="sendMessage()"
              class="send-button">
        <nb-icon *ngIf="!buttonTitle; else title" [icon]="buttonIcon" pack="nebular-essentials"></nb-icon>
        <ng-template #title>{{ buttonTitle }}</ng-template>
      </button>
    </div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [ChangeDetectorRef, DomSanitizer])
], NbChatFormComponent);
export { NbChatFormComponent };
//# sourceMappingURL=chat-form.component.js.map