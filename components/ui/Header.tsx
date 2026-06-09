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

type HeaderProps = {
  mode?: "search";
};

const Header: FC<HeaderProps> = ({ mode }: HeaderProps): React.ReactElement => {
  const router = useRouter();
  const navigation = useNavigation();
  const schemeRaw: ColorSchemeName | undefined = useColorScheme();
  const scheme: keyof typeof Colors = (schemeRaw ??
    "light") as keyof typeof Colors;
  const iconColor: string = Colors[scheme].text;
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
    <ThemedView style={styles.headerContainer}>
      <ThemedView style={styles.logoContainer}>
        <Image source={logoSource} style={styles.logo} />
        <ThemedText type="title" style={[styles.title, { color: iconColor }]}>
          ShopEase
        </ThemedText>
      </ThemedView>

      {mode !== "search" && (
        <ThemedView style={styles.rightContainer}>
          <Pressable
            onPress={() => {
              router.push("/notifications");
            }}
            style={{ marginRight: 12 }}
          >
            <IconSymbol size={28} name="bell.fill" color={iconColor} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
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
          >
            <IconSymbol size={28} name="search.fill" color={iconColor} />
          </Pressable>
          <Pressable onPress={() => {}} style={{ marginLeft: 12 }}>
            <Image
              source={require("../../assets/images/avatar/light-avatar.png")}
              style={styles.avatar}
            />
          </Pressable>
        </ThemedView>
      )}

      {mode === "search" && (
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  rightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    height: 48,
    width: 48,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  profilePopup: {
    position: "absolute",
    top: 60,
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    zIndex: 1,
  },
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});
