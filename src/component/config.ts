import { CameraFeatureFlagsMap, CameraProps } from '@onecamera/core';
import { Theme } from '@fluentui/react-components';

export type AppState = {
  config: {
    effects: CameraEffectsType;
    shouldLoopVideoPlayback: boolean;
    shouldReflectPermissionsChanges: boolean;
    enableDynamicCanvas: boolean;
    videoOrientation: CameraVideoOrientation;
    disableSplitVideo: boolean;
    volume: number;
    countdownSeconds: number;
    language: Locale;
    theme: Theme;
    disableGlassBlur: boolean;
    featureFlagConfigs: Partial<CameraFeatureFlagsMap>;
  };
};

export type CameraEffectsType = NonNullable<CameraProps['effects']>;
export type CameraVideoOrientation = NonNullable<CameraProps['videoOrientation']>;
export type Locale = CameraProps['language'];
