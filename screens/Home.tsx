import {
  Button,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";
import Icon from "../components/Icon";
import useUserStore from "../store/userStore";
import * as Haptics from "expo-haptics";
import { RootStackScreenProps } from "../types";

export default function Home({ navigation }: RootStackScreenProps<"Home">) {
  const user = useUserStore((state) => state.user);
  const logOut = useUserStore((state) => state.clear);
  const [status, setStatus] = useState<"granted" | "denied">("denied");
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const audioPermission = await Audio.requestPermissionsAsync();
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaPermission = await MediaLibrary.requestPermissionsAsync();

      if (
        audioPermission.status === "granted" &&
        cameraPermission.status === "granted" &&
        mediaPermission.status === "granted"
      ) {
        setStatus("granted");
      }
    })();
  }, []);

  if (status === "denied") {
    return (
      <View
        style={{
          flex: 1,
          marginTop: 64,
        }}
      >
        <Button
          title="Check permissions in settings"
          onPress={async () => {
            await Linking.openSettings();
          }}
        />
      </View>
    );
  }

  const recordVideo = async () => {
    if (!recording) {
      setRecording(true);
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      let video = await cameraRef.current?.recordAsync();
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (video) {
        await MediaLibrary.createAssetAsync(video.uri);
      }
    } else {
      setRecording(false);
      await cameraRef.current?.stopRecording();
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  return (
    <Camera
      ratio="16:9"
      style={{
        flex: 1,
      }}
      type={CameraType.front}
      ref={cameraRef}
    >
      <View style={styles.view}>
        <View style={styles.header}>
          <Pressable onPress={logOut} style={styles.backButton}>
            <Icon size={36} name="chevron-left" color="#fff" />
          </Pressable>
          <Text
            style={{
              fontSize: 24,
              color: "#fff",
              fontWeight: "500",
            }}
          >
            {user?.name}
          </Text>
          <View style={styles.backButton} />
        </View>
        <View style={styles.face} />
        <View style={styles.centerView}>
          <TouchableOpacity style={styles.button} onPress={recordVideo}>
            <View
              style={{
                width: recording ? 32 : "85%",
                height: recording ? 32 : "85%",
                backgroundColor: recording ? "red" : "#fafafa",
                borderRadius: recording ? 4 : 50,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backButton: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginTop: 64,
    paddingHorizontal: 16,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text_wrong: {
    marginBottom: 20,
  },
  face: {
    width: 250,
    height: 380,
    borderRadius: 150,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 72,
  },
  button: {
    width: 64,
    height: 64,
    backgroundColor: "transparent",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
    borderWidth: 2,
    borderColor: "#fafafa",
    marginBottom: 32,
  },
  centerView: {
    justifyContent: "center",
    alignItems: "center",
  },
});
