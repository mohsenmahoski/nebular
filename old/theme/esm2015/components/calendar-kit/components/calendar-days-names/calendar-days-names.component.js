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
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbDateService } from '../../services/date.service';
let NbCalendarDaysNamesComponent = class NbCalendarDaysNamesComponent {
    constructor(dateService) {
        this.dateService = dateService;
    }
    ngOnInit() {
        const days = this.createDaysNames();
        this.days = this.shiftStartOfWeek(days);
    }
    createDaysNames() {
        return this.dateService.getDayOfWeekNames()
            .map(this.markIfHoliday);
    }
    shiftStartOfWeek(days) {
        for (let i = 0; i < this.dateService.getFirstDayOfWeek(); i++) {
            days.push(days.shift());
        }
        return days;
    }
    markIfHoliday(name, i) {
        return { name, isHoliday: i % 6 === 0 };
    }
};
NbCalendarDaysNamesComponent = __decorate([
    Component({
        selector: 'nb-calendar-days-names',
        template: `
    <div class="day" *ngFor="let day of days" [class.holiday]="day.isHoliday">{{ day.name }}</div>
  `,
        changeDetection: ChangeDetectionStrategy.OnPush,
        styles: [":host{display:flex;justify-content:space-between}:host .day{display:flex;align-items:center;justify-content:center;margin:1px}\n"]
    }),
    __metadata("design:paramtypes", [NbDateService])
], NbCalendarDaysNamesComponent);
export { NbCalendarDaysNamesComponent };
//# sourceMappingURL=calendar-days-names.component.js.map