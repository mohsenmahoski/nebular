/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { EventEmitter } from '@angular/core';
import { NbComponentSize } from '../component-size';
import { NbComponentStatus } from '../component-status';
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
export declare class NbAlertComponent {
    /**
     * Alert size, available sizes:
     * `tiny`, `small`, `medium`, `large`, `giant`
     * Unset by default.
     */
    size: '' | NbComponentSize;
    /**
     * Alert status (adds specific styles):
     * `primary`, `success`, `info`, `warning`, `danger`.
     * Unset by default.
     */
    status: '' | NbComponentStatus;
    /**
     * Alert accent (color of the top border):
     * `primary`, `success`, `info`, `warning`, `danger`.
     * Unset by default.
     */
    accent: '' | NbComponentStatus;
    /**
     * Alert outline (color of the border):
     * `primary`, `success`, `info`, `warning`, `danger`.
     * Unset by default.
     */
    outline: '' | NbComponentStatus;
    /**
     * Shows `close` icon
     */
    closable: boolean;
    protected _closable: boolean;
    /**
     * Emits when chip is removed
     * @type EventEmitter<any>
     */
    close: EventEmitter<{}>;
    /**
     * Emits the removed chip event
     */
    onClose(): void;
    readonly tiny: boolean;
    readonly small: boolean;
    readonly medium: boolean;
    readonly large: boolean;
    readonly giant: boolean;
    readonly primary: boolean;
    readonly success: boolean;
    readonly info: boolean;
    readonly warning: boolean;
    readonly danger: boolean;
    readonly primaryAccent: boolean;
    readonly successAccent: boolean;
    readonly infoAccent: boolean;
    readonly warningAccent: boolean;
    readonly dangerAccent: boolean;
    readonly primaryOutline: boolean;
    readonly successOutline: boolean;
    readonly infoOutline: boolean;
    readonly warningOutline: boolean;
    readonly dangerOutline: boolean;
}
