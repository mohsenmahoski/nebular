/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { InjectionToken } from '@angular/core';
import { NbGlobalPosition } from '../cdk/overlay/position-helper';
import { NbComponentStatus } from '../component-status';
declare type IconToClassMap = {
    [status in NbComponentStatus]: string;
};
export declare const NB_TOASTR_CONFIG: InjectionToken<NbToastrConfig>;
/**
 * The `NbToastrConfig` class describes configuration of the `NbToastrService.show` and global toastr configuration.
 * */
export declare class NbToastrConfig {
    /**
     * Determines where on the screen toast have to be rendered.
     * */
    position: NbGlobalPosition;
    /**
     * Status chooses color scheme for the toast.
     * */
    status: '' | NbComponentStatus;
    /**
     * Duration is timeout between toast appears and disappears.
     * */
    duration: number;
    /**
     * Destroy by click means you can hide the toast by clicking it.
     * */
    destroyByClick: boolean;
    /**
     * If preventDuplicates is true then the next toast with the same title and message will not be rendered.
     * */
    preventDuplicates: boolean;
    /**
     * Determines render icon or not.
     * */
    hasIcon: boolean;
    /**
     * Icon name that can be provided to render custom icon.
     * */
    icon: string;
    /**
     * Icon pack to look for the icon in.
     * */
    iconPack: string;
    /**
     * Toast status icon-class mapping.
     * */
    protected icons: IconToClassMap;
    constructor(config: Partial<NbToastrConfig>);
    protected patchIcon(config: Partial<NbToastrConfig>): void;
}
export {};
