// -----------------------------------------------------------------------
// <copyright company="Microsoft Corporation">
// Copyright (c) Microsoft Corporation. All rights reserved.
// </copyright>
// -----------------------------------------------------------------------

import { Setting, SettingDataType } from '@msstream/utilities-settings-store';

export type FeatureFlagInfo = {
  readonly defaultValue: SettingDataType;
  readonly type: SettingDataType;
  readonly friendlyName: string;
};

/**
 * Mapping between a FeatureFlagId and the associated FeatureFlagInfo. Fields are readonly so they cannot be modified after construction
 */
export type IFeatureFlagMap<T extends string> = {
  readonly [k in T]: FeatureFlagInfo;
};

/**
 * List of all known feature flags that are relevant for Recorder functionality.
 * Prevents duplicate entries in our IFeatureFlagMap
 */
export type RecorderFeatureFlags =
  | 'default'
  | 'TestFlag'
  | 'isPortraitCaptureEnabled'
  | 'isPortraitModeEnabled'
  | 'isPortraitGlobalControlEnabled'
  | 'isHubbleMusicEnabled'
  | 'isMusicSearchEnabled'
  | 'isContentCardEnabled';

export type RecorderFeatureFlagsMap = IFeatureFlagMap<RecorderFeatureFlags>;

const recorderFeatureFlagsMap: RecorderFeatureFlagsMap = {
  default: {
    defaultValue: true,
    type: 'boolean',
    friendlyName: 'Permanent flag for default case in featureFlagSwitch',
  },
  TestFlag: {
    defaultValue: true,
    type: 'boolean',
    friendlyName: 'Does nothing - purpose is to complete PR',
  },
  /**
   * - Creation Date:
   * - Ticket tracking FeatureFlag removal:
   */
  isPortraitCaptureEnabled: {
    defaultValue: false,
    type: 'boolean',
    friendlyName: 'If enabled, camera enablePortraitCropMode prop will be set to false, if not set by parent',
  },
  /**
   * - Creation Date:
   * - Ticket tracking FeatureFlag removal:
   */
  isPortraitModeEnabled: {
    defaultValue: false,
    type: 'boolean',
    friendlyName: 'If enabled, camera orientationToggle.modeSelector prop will be set to true, if not set by parent',
  },
  /**
   * - Creation Date:
   * - Ticket tracking FeatureFlag removal:
   */
  isPortraitGlobalControlEnabled: {
    defaultValue: false,
    type: 'boolean',
    friendlyName: 'If enabled, camera orientationToggle.globalControls prop will be set to true, if not set by parent',
  },
  /**
   * - Creation Date: 06/23/2023
   * - Flip Feature Flag: https://ecs.skype.com/Flip/VideoExperience/configurations/1098369
   * - Ticket tracking feature flag removal: https://dev.azure.com/OneCamera/SDK/_workitems/edit/8947
   */
  isHubbleMusicEnabled: {
    defaultValue: false,
    type: 'boolean',
    friendlyName: 'If enabled, will use the Hubble CDN for music rather than Flipgrid CamAPI',
  },

  /**
   * - Creation Date: 08/16/2023
   * - Flip Feature Flag: https://ecs.skype.com/Flip/VideoExperience/configurations/1118961
   * - Ticket tracking feature flag removal: https://dev.azure.com/OneCamera/SDK/_workitems/edit/9838
   */
  isMusicSearchEnabled: {
    defaultValue: false,
    type: 'boolean',
    friendlyName: 'If enabled, will display search within Music Menu',
  },
  /**
   * - Creation Date: 09/06/2023
   */
  isContentCardEnabled: {
    defaultValue: false,
    type: 'boolean',
    friendlyName: 'If enabled, will display Content Card',
  },
};

/**
 * Returns all the known feature flags for Recorder features (mapping Id to FeatureFlagInfo)
 */
export function getRecorderFeatureFlagMap(): RecorderFeatureFlagsMap {
  return {
    ...recorderFeatureFlagsMap,
  };
}
