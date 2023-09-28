import { getCameraFeatureFlagMap } from '@onecamera/core';
import { teamsDarkTheme } from '@fluentui/react-components';
import { AppState } from './config';

const initialState: AppState = {
  config: {
    effects: {
      ink: true,
      mirrorVideo: true,
      micOnly: true,
      photo: true,
      text: true,
      teleprompter: true,
      stickyNotes: true,
    },
    shouldLoopVideoPlayback: true,
    shouldReflectPermissionsChanges: false,
    enableDynamicCanvas: false,
    videoOrientation: 'landscape',
    disableSplitVideo: false,
    volume: 1,
    countdownSeconds: 3,
    language: 'en-US',
    theme: teamsDarkTheme,
    disableGlassBlur: false,
    featureFlagConfigs: getCameraFeatureFlagMap(),
  },
};

export default initialState;
