import { ElementRef, SimpleChange, Type } from '@angular/core';
import { NbTrigger, NbTriggerStrategy, NbTriggerStrategyBuilderService } from '../overlay-trigger';
import { NbAdjustableConnectedPositionStrategy, NbAdjustment, NbPosition, NbPositionBuilderService } from '../overlay-position';
import { NbRenderableContainer } from '../overlay-container';
import { NbOverlayContent } from '../overlay-service';
import { NbDynamicOverlay } from './dynamic-overlay';
export declare class NbDynamicOverlayChange extends SimpleChange {
    constructor(previousValue: any, currentValue: any, firstChange?: boolean);
    isChanged(): boolean;
}
export declare class NbDynamicOverlayHandler {
    private positionBuilder;
    private triggerStrategyBuilder;
    private dynamicOverlayService;
    protected _componentType: Type<NbRenderableContainer>;
    protected _host: ElementRef;
    protected _context: Object;
    protected _content: NbOverlayContent;
    protected _trigger: NbTrigger;
    protected _position: NbPosition;
    protected _adjustment: NbAdjustment;
    protected _offset: number;
    protected dynamicOverlay: NbDynamicOverlay;
    protected triggerStrategy: NbTriggerStrategy;
    protected positionStrategy: NbAdjustableConnectedPositionStrategy;
    protected changes: {
        [key: string]: NbDynamicOverlayChange;
    };
    constructor(positionBuilder: NbPositionBuilderService, triggerStrategyBuilder: NbTriggerStrategyBuilderService, dynamicOverlayService: NbDynamicOverlay);
    host(host: ElementRef): this;
    trigger(trigger: NbTrigger): this;
    position(position: NbPosition): this;
    adjustment(adjustment: NbAdjustment): this;
    componentType(componentType: Type<NbRenderableContainer>): this;
    content(content: NbOverlayContent): this;
    context(context: {}): this;
    offset(offset: number): this;
    build(): NbDynamicOverlay;
    rebuild(): NbDynamicOverlay;
    connect(): void;
    disconnect(): void;
    destroy(): void;
    protected createPositionStrategy(): NbAdjustableConnectedPositionStrategy;
    protected subscribeOnTriggers(dynamicOverlay: NbDynamicOverlay): void;
    protected isContainerRerenderRequired(): boolean;
    protected isPositionStrategyUpdateRequired(): boolean;
    protected isTriggerStrategyUpdateRequired(): boolean;
    protected isComponentTypeUpdateRequired(): boolean;
    protected isComponentTypeUpdated(): boolean;
    protected isContentUpdated(): boolean;
    protected isContextUpdated(): boolean;
    protected isAdjustmentUpdated(): boolean;
    protected isPositionUpdated(): boolean;
    protected isHostUpdated(): boolean;
    protected isTriggerUpdated(): boolean;
    protected isOffsetUpdated(): boolean;
    protected clearChanges(): void;
}
