import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Icon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
  style?: any;
  size?: number;
}) {
  return (
    <MaterialCommunityIcons size={props.size ? props.size : 24} {...props} />
  );
}
