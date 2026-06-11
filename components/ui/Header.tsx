import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { countUnreadNotifications } from "@/services/notificationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React, { FC } from "react";
import {
  ColorSchemeName,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
import { IconSymbol } from "./icon-symbol";

const HeaderFonts = {
  heading: "Poppins_600SemiBold",
} as const;

type HeaderProps = {
  mode?: "search";
};

const Header: FC<HeaderProps> = ({ mode }: HeaderProps): React.ReactElement => {
  const router = useRouter();
  const navigation = useNavigation();
  const schemeRaw: ColorSchemeName | undefined = useColorScheme();
  const scheme = (schemeRaw ?? "light") as keyof typeof Colors;
  const iconColor = Colors[scheme].text;
  const logoSource: ImageSourcePropType =
    scheme === "dark"
      ? require("../../assets/images/logo/dark-logo.png")
      : require("../../assets/images/logo/light-logo.png");

  const [unreadCount, setUnreadCount] = React.useState(0);

  const fetchUnreadCount = async () => {
    try {
      const token = await AsyncStorage.getItem("loginToken");
      if (token) {
        const decode = jwtDecode(token) as any;
        const count = await countUnreadNotifications(decode.userid);
        setUnreadCount(count);
      }
    } catch (error) {
      console.error("Failed to fetch unread count", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUnreadCount();
    }, []),
  );

  return (
    <ThemedView
      style={[
        styles.headerContainer,
        {
          borderBottomWidth: 1,
          borderBottomColor: Colors[scheme].border,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
      ]}
    >
      <ThemedView style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} />
        <ThemedText
          type="title"
          style={[
            styles.title,
            { color: iconColor, fontFamily: HeaderFonts.heading },
          ]}
        >
          ShopEase
        </ThemedText>
      </ThemedView>

      {mode !== "search" && (
        <ThemedView style={styles.rightContainer}>
          <Pressable
            onPress={() => {
              router.push("/notifications");
            }}
            style={({ pressed }) => [
              { marginRight: 12, opacity: pressed ? 0.8 : 1 },
            ]}
          >
            <IconSymbol size={24} name="bell.fill" color={iconColor} />
            {unreadCount > 0 && (
              <View
                style={[
                  styles.badge,
                  { backgroundColor: Colors[scheme].tint, borderColor: Colors[scheme].background },
                ]}
              >
                <ThemedText style={styles.badgeText}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </ThemedText>
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/search");
            }}
            style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
          >
            <IconSymbol size={26} name="search.fill" color={iconColor} />
          </Pressable>
          <Pressable
            onPress={() => {} }
            style={({ pressed }) => [
              { marginLeft: 12, opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Image
              source={require("../../assets/images/avatar/light-avatar.png")}
              style={[
                styles.avatar,
                { borderColor: Colors[scheme].border, borderWidth: 1 },
              ]}
            />
          </Pressable>
        </ThemedView>
      )}

      {mode === "search" && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <IconSymbol size={28} name="close" color={iconColor} />
        </Pressable>
      )}
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  logo: {
    height: 40,
    width: 40,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    marginLeft: 10,
    letterSpacing: -0.5,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    zIndex: 1,
    borderWidth: 1.5,
    borderColor: "#FFF",
  },
  badgeText: {
    color: "white",
    fontSize: 9,
    fontWeight: "bold",
  },
});
