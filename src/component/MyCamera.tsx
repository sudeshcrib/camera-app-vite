import Camera, { BackdropType } from "@onecamera/core";
import * as wasmcv from "@skype/wasmcv";
import React, { useMemo, useState } from "react";
import initialState from "./initialState";
import { GenericProvider } from "@msstream/utilities-settings-store";
import { getRecorderFeatureFlagMap } from "./RecorderSetting";

const backdrop: BackdropType = {
  wasmcvPackage: wasmcv,
  useAPI: "WASMCV",
};

const externalLinks = {
  screenCaptureHelpCenterUrl: "https://aka.ms/recordscreen ",
};

const sessionRecoveryDBName = "Camera_SessionData";
const sessionRecoveryID = "SESSIONRECOVERYID";

// function createFFProvider(config: Record<string, unknown>) {
//   return new GenericProvider(
//     "RecorderDefaults",
//     config,
//     (str: string, data: unknown) => data[str as unknown].defaultValue
//   );
// }

export default function MyCamera() {
  const FeatureFlagDefaults = new GenericProvider(
    "RecorderDefaults",
    {
      ...getRecorderFeatureFlagMap(),
      TestFlag: {
        defaultValue: false,
        type: "boolean",
        friendlyName: "Overriding this from recorder",
      },
      isModeSelectorEnabled: {
        defaultValue: true,
        type: "boolean",
        friendlyName:
          "If enabled, will show the mode selector component and disable the mic-only button.",
      },
      isStickerTooltipsEnabled: {
        defaultValue: false,
        type: "boolean",
        friendlyName:
          "If enabled (default), will use sticker name to display a tooltip for stickers.",
      },
      isReleaseStreamsWhenUnmountingEnabled: {
        defaultValue: true,
        type: "boolean",
        friendlyName:
          "If enabled, the app will stop the active mediaStream tracks and remove the mediaStreams.",
      },
      isCardModeEnabled: {
        defaultValue: true,
        type: "boolean",
        friendlyName: "If enabled, will allow the user to enter card mode.",
      },
      isAugLoopStickersEnabled: {
        defaultValue: false,
        type: "boolean",
        friendlyName:
          "If enabled, pass in the AugLoop config to enable Hubble provided stickers.",
      },
      isCreateClipOnResumeEnabled: {
        defaultValue: false,
        type: "boolean",
        friendlyName:
          "If enabled, will create a new clip on resuming after a pause in recording",
      },
      isHubbleMusicEnabled: {
        defaultValue: false,
        type: "boolean",
        friendlyName:
          "If enabled, will use the Hubble CDN for music rather than Flipgrid CamAPI",
      },
      isMusicSearchEnabled: {
        defaultValue: false,
        type: "boolean",
        friendlyName: "If enabled, will display search bar in Music Menu",
      },
      isContentCardEnabled: {
        defaultValue: false,
        type: "boolean",
        friendlyName:
          "If enabled, will display Content Card in Bing Images Section",
      },
    },
    (str: string, data: any) => data[str as any].defaultValue
  );

  // const [stateMachineInitialState, setStateMachineInitialState] =
  //   useState("camera");
  const stateMachineInitialState = "camera";
  const stagesConfig = useMemo(
    () => ({
      states: {
        capture: {
          initial: stateMachineInitialState,
          states: {
            import_video: {
              on: {
                BACK: "camera",
              },
            },
          },
        },
      },
    }),
    [stateMachineInitialState]
  );

  return (
    <div>
      <Camera
        header={{
          onCloseButtonClick: () => {
            console.log("camera closed");
          },
        }}
        disableGlassBlur={false}
        audioCues={{
          volume: 0,
        }}
        countdown={{
          countdownSeconds: 3,
        }}
        enableDynamicCanvas={false}
        effects={{
          text: true,
          ink: true,
          photo: true,
          teleprompter: true,
        }}
        videoOrientation={"landscape"}
        language={"en-US"}
        externalLinks={externalLinks}
        // theme={initialState.config.theme}
        backdrop={backdrop}
        // cameraCallbacks={{
        //   onComplete: (propertyBag) =>
        //     console.log("passed on complete", { propertyBag }),
        //   onRequestClose: (propertyBag) => {
        //     console.log("passed on request close", { propertyBag });
        //   },
        //   onError: (error, propertyBag) =>
        //     console.error("passed on error", { error, propertyBag }),
        //   onPageUnload: (propertyBag) =>
        //     console.log("passed on page unload", { propertyBag }),
        // }}
        disableSplitVideo={false}
        shouldLoopVideoPlayback={true}
        thumbnailAspectRatio="4x5"
        shouldReflectPermissionsChanges={false}
        sessionRecoveryDBName={sessionRecoveryDBName}
        sessionRecoveryID={sessionRecoveryID}
        // featureFlagSettingsProviders={[
        //   createFFProvider(initialState.config.featureFlagConfigs),
        // ]}
        featureFlagSettingsProviders={[FeatureFlagDefaults]}
        stages={stagesConfig}
      />
      ;
    </div>
  );
}
