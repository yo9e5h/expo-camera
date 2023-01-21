import { Pressable } from "react-native";
import { Text } from "./Themed";

const BigColoredButton = ({
  onPress,
  disabled,
  text,
  children,
  style,
}: {
  onPress: () => void;
  disabled?: boolean;
  text?: string;
  children?: React.ReactNode;
  style?: any;
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          paddingVertical: 16,
          backgroundColor: "#0EA5E9",
          marginVertical: 16,
          borderRadius: 8,
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "center",
        },
        pressed && {
          opacity: 0.5,
        },
        style,
      ]}
    >
      {children}
      {text && (
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
            fontWeight: "600",
          }}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default BigColoredButton;
