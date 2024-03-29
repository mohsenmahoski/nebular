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
import { Component, EventEmitter, Input, Output, Type } from '@angular/core';
import { NbCalendarSize, NbCalendarViewMode } from '../calendar-kit/model';
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
let NbCalendarComponent = class NbCalendarComponent {
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
    constructor() {
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
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbCalendarComponent.prototype, "boundingMonth", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarComponent.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbCalendarComponent.prototype, "filter", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbCalendarComponent.prototype, "dayCellComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbCalendarComponent.prototype, "monthCellComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbCalendarComponent.prototype, "yearCellComponent", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarComponent.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarComponent.prototype, "visibleDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbCalendarComponent.prototype, "showHeader", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarComponent.prototype, "date", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbCalendarComponent.prototype, "dateChange", void 0);
NbCalendarComponent = __decorate([
    Component({
        selector: 'nb-calendar',
        template: `
    <nb-base-calendar
      [boundingMonth]="boundingMonth"
      [startView]="startView"
      [date]="date"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [size]="size"
      [visibleDate]="visibleDate"
      [showHeader]="showHeader"
      (dateChange)="dateChange.emit($event)"
    ></nb-base-calendar>
  `
    })
], NbCalendarComponent);
export { NbCalendarComponent };
//# sourceMappingURL=calendar.component.js.map