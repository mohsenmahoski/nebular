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
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbCalendarRangeDayCellComponent, NbCalendarRangeYearCellComponent } from './calendar-range-cells';
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
let NbCalendarRangeComponent = class NbCalendarRangeComponent {
    constructor(dateService) {
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
    /**
     * Custom day cell component. Have to implement `NbCalendarCell` interface.
     * */
    set _cellComponent(cellComponent) {
        if (cellComponent) {
            this.dayCellComponent = cellComponent;
        }
    }
    /**
     * Custom year cell component. Have to implement `NbCalendarCell` interface.
     * */
    set _yearCellComponent(cellComponent) {
        if (cellComponent) {
            this.yearCellComponent = cellComponent;
        }
    }
    onChange(date) {
        this.initDateIfNull();
        this.handleSelected(date);
    }
    initDateIfNull() {
        if (!this.range) {
            this.range = { start: null, end: null };
        }
    }
    handleSelected(date) {
        if (this.selectionStarted()) {
            this.selectEnd(date);
        }
        else {
            this.selectStart(date);
        }
    }
    selectionStarted() {
        const { start, end } = this.range;
        return start && !end;
    }
    selectStart(start) {
        this.selectRange({ start });
    }
    selectEnd(date) {
        const { start } = this.range;
        if (this.dateService.compareDates(date, start) > 0) {
            this.selectRange({ start, end: date });
        }
        else {
            this.selectRange({ start: date, end: start });
        }
    }
    selectRange(range) {
        this.range = range;
        this.rangeChange.emit(range);
    }
};
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbCalendarRangeComponent.prototype, "boundingMonth", void 0);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarRangeComponent.prototype, "startView", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeComponent.prototype, "min", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeComponent.prototype, "max", void 0);
__decorate([
    Input(),
    __metadata("design:type", Function)
], NbCalendarRangeComponent.prototype, "filter", void 0);
__decorate([
    Input('dayCellComponent'),
    __metadata("design:type", Type),
    __metadata("design:paramtypes", [Type])
], NbCalendarRangeComponent.prototype, "_cellComponent", null);
__decorate([
    Input(),
    __metadata("design:type", Type)
], NbCalendarRangeComponent.prototype, "monthCellComponent", void 0);
__decorate([
    Input('yearCellComponent'),
    __metadata("design:type", Type),
    __metadata("design:paramtypes", [Type])
], NbCalendarRangeComponent.prototype, "_yearCellComponent", null);
__decorate([
    Input(),
    __metadata("design:type", String)
], NbCalendarRangeComponent.prototype, "size", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeComponent.prototype, "visibleDate", void 0);
__decorate([
    Input(),
    __metadata("design:type", Boolean)
], NbCalendarRangeComponent.prototype, "showHeader", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], NbCalendarRangeComponent.prototype, "range", void 0);
__decorate([
    Output(),
    __metadata("design:type", EventEmitter)
], NbCalendarRangeComponent.prototype, "rangeChange", void 0);
NbCalendarRangeComponent = __decorate([
    Component({
        selector: 'nb-calendar-range',
        template: `
    <nb-base-calendar
      [date]="range"
      (dateChange)="onChange($event)"
      [min]="min"
      [max]="max"
      [filter]="filter"
      [startView]="startView"
      [boundingMonth]="boundingMonth"
      [dayCellComponent]="dayCellComponent"
      [monthCellComponent]="monthCellComponent"
      [yearCellComponent]="yearCellComponent"
      [visibleDate]="visibleDate"
      [showHeader]="showHeader"
      [size]="size"
    ></nb-base-calendar>
  `
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarRangeComponent);
export { NbCalendarRangeComponent };
//# sourceMappingURL=calendar-range.component.js.map