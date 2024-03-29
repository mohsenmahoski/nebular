import { ComponentFactoryResolver, ComponentRef, OnChanges, ElementRef, EventEmitter, OnDestroy, Type, AfterViewInit, OnInit, SimpleChanges } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { NbOverlayRef } from '../cdk/overlay/mapping';
import { NbAdjustableConnectedPositionStrategy, NbPositionBuilderService } from '../cdk/overlay/overlay-position';
import { NbOverlayService } from '../cdk/overlay/overlay-service';
import { NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../cdk/overlay/overlay-trigger';
import { NbDatepickerContainerComponent } from './datepicker-container.component';
import { NbCalendarRange, NbCalendarRangeComponent } from '../calendar/calendar-range.component';
import { NbCalendarComponent } from '../calendar/calendar.component';
import { NbCalendarCell, NbCalendarSize, NbCalendarViewMode } from '../calendar-kit/model';
import { NbDateService } from '../calendar-kit/services/date.service';
import { NbDatepicker, NbPickerValidatorConfig } from './datepicker.directive';
/**
 * The `NbBasePicker` component concentrates overlay manipulation logic.
 * */
export declare abstract class NbBasePicker<D, T, P> extends NbDatepicker<T> implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    protected document: any;
    protected positionBuilder: NbPositionBuilderService;
    protected triggerStrategyBuilder: NbTriggerStrategyBuilderService;
    protected overlay: NbOverlayService;
    protected cfr: ComponentFactoryResolver;
    protected dateService: NbDateService<D>;
    protected dateServiceOptions: any;
    /**
     * Datepicker date format. Can be used only with date adapters (moment, date-fns) since native date
     * object doesn't support formatting.
     * */
    format: string;
    /**
     * Defines if we should render previous and next months
     * in the current month view.
     * */
    boundingMonth: boolean;
    /**
     * Defines starting view for calendar.
     * */
    startView: NbCalendarViewMode;
    /**
     * Minimum available date for selection.
     * */
    min: T;
    /**
     * Maximum available date for selection.
     * */
    max: T;
    /**
     * Predicate that decides which cells will be disabled.
     * */
    filter: (T: any) => boolean;
    /**
     * Custom day cell component. Have to implement `NbCalendarCell` interface.
     * */
    dayCellComponent: Type<NbCalendarCell<D, T>>;
    /**
     * Custom month cell component. Have to implement `NbCalendarCell` interface.
     * */
    monthCellComponent: Type<NbCalendarCell<D, T>>;
    /**
     * Custom year cell component. Have to implement `NbCalendarCell` interface.
     * */
    yearCellComponent: Type<NbCalendarCell<D, T>>;
    /**
     * Size of the calendar and entire components.
     * Can be 'medium' which is default or 'large'.
     * */
    size: NbCalendarSize;
    /**
     * Depending on this date a particular month is selected in the calendar
     */
    visibleDate: D;
    /**
     * Hide picker when a date or a range is selected, `true` by default
     * @type {boolean}
     */
    hideOnSelect: boolean;
    /**
     * Calendar component class that has to be instantiated inside overlay.
     * */
    protected abstract pickerClass: Type<P>;
    /**
     * Overlay reference object.
     * */
    protected ref: NbOverlayRef;
    /**
     * Datepicker container that contains instantiated picker.
     * */
    protected container: ComponentRef<NbDatepickerContainerComponent>;
    /**
     * Positioning strategy used by overlay.
     * */
    protected positionStrategy: NbAdjustableConnectedPositionStrategy;
    /**
     * Trigger strategy used by overlay
     * */
    protected triggerStrategy: NbTriggerStrategy;
    /**
     * HTML input reference to which datepicker connected.
     * */
    protected hostRef: ElementRef;
    protected init$: ReplaySubject<void>;
    /**
     * Stream of picker changes. Required to be the subject because picker hides and shows and picker
     * change stream becomes recreated.
     * */
    protected onChange$: Subject<T>;
    /**
     * Reference to the picker instance itself.
     * */
    protected pickerRef: ComponentRef<any>;
    protected alive: boolean;
    /**
     * Queue contains the last value that was applied to the picker when it was hidden.
     * This value will be passed to the picker as soon as it shown.
     * */
    protected queue: T | undefined;
    protected blur$: Subject<void>;
    constructor(document: any, positionBuilder: NbPositionBuilderService, triggerStrategyBuilder: NbTriggerStrategyBuilderService, overlay: NbOverlayService, cfr: ComponentFactoryResolver, dateService: NbDateService<D>, dateServiceOptions: any);
    /**
     * Returns picker instance.
     * */
    readonly picker: any;
    /**
     * Stream of picker value changes.
     * */
    readonly valueChange: Observable<T>;
    readonly isShown: boolean;
    readonly init: Observable<void>;
    /**
     * Emits when datepicker looses focus.
     */
    readonly blur: Observable<void>;
    protected abstract readonly pickerValueChange: Observable<T>;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /**
     * Datepicker knows nothing about host html input element.
     * So, attach method attaches datepicker to the host input element.
     * */
    attach(hostRef: ElementRef): void;
    getValidatorConfig(): NbPickerValidatorConfig<T>;
    show(): void;
    shouldHide(): boolean;
    hide(): void;
    protected abstract writeQueue(): any;
    protected createOverlay(): void;
    protected openDatepicker(): void;
    protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy;
    protected subscribeOnPositionChange(): void;
    protected createTriggerStrategy(): NbTriggerStrategy;
    protected subscribeOnTriggers(): void;
    protected instantiatePicker(): void;
    /**
     * Subscribes on picker value changes and emit data through this.onChange$ subject.
     * */
    protected subscribeOnValueChange(): void;
    protected patchWithInputs(): void;
    protected checkFormat(): void;
}
/**
 * The DatePicker components itself.
 * Provides a proxy to `NbCalendar` options as well as custom picker options.
 */
export declare class NbDatepickerComponent<D> extends NbBasePicker<D, D, NbCalendarComponent<D>> {
    protected pickerClass: Type<NbCalendarComponent<D>>;
    /**
     * Date which will be rendered as selected.
     * */
    date: D;
    /**
     * Emits date when selected.
     * */
    readonly dateChange: EventEmitter<D>;
    value: D | undefined;
    protected readonly pickerValueChange: Observable<D>;
    protected writeQueue(): void;
}
/**
 * The RangeDatePicker components itself.
 * Provides a proxy to `NbCalendarRange` options as well as custom picker options.
 */
export declare class NbRangepickerComponent<D> extends NbBasePicker<D, NbCalendarRange<D>, NbCalendarRangeComponent<D>> {
    protected pickerClass: Type<NbCalendarRangeComponent<D>>;
    /**
     * Range which will be rendered as selected.
     * */
    range: NbCalendarRange<D>;
    /**
     * Emits range when start selected and emits again when end selected.
     * */
    readonly rangeChange: EventEmitter<NbCalendarRange<D>>;
    value: NbCalendarRange<D> | undefined;
    protected readonly pickerValueChange: Observable<NbCalendarRange<D>>;
    shouldHide(): boolean;
    protected writeQueue(): void;
}
