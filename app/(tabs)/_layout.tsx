import { Tabs, useFocusEffect } from "expo-router";
import { Platform, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const scheme = colorScheme ?? "light";
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshAdminStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("loginToken");
      if (!token) {
        setIsAdmin(false);
        return;
      }

      let decoded: any = null;
      try {
        decoded = jwtDecode(token as string) as any;
      } catch {
        try {
          decoded = JSON.parse(token as string);
        } catch {
          decoded = null;
        }
      }

      if (!decoded) {
        setIsAdmin(false);
        return;
      }

      const roleValue = String(
        decoded?.roleid ?? decoded?.roleId ?? decoded?.role ?? decoded?.userRole ?? ""
      ).toLowerCase();

      const isAdminRole =
        Number(decoded?.roleid ?? decoded?.roleId ?? 0) === 2 ||
        roleValue === "admin" ||
        roleValue === "administrator" ||
        roleValue === "superadmin";

      setIsAdmin(Boolean(isAdminRole));
    } catch {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      await refreshAdminStatus();
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      let active = true;
      (async () => {
        if (!active) return;
        await refreshAdminStatus();
      })();
      return () => {
        active = false;
      };
    }, [])
  );

  return (
    <Tabs
      screenOptions={({ route }: { route: { name: string } }) => ({
        tabBarActiveTintColor: Colors[scheme].tint,
        tabBarInactiveTintColor: Colors[scheme].tabIconDefault,
        tabBarStyle:
          route.name === "cart"
            ? { display: "none" }
            : {
                position: "absolute",
                bottom: Platform.OS === "ios" ? 30 : 20,
                left: 20,
                right: 20,
                backgroundColor: Colors[scheme].background,
                borderRadius: 35,
                height: 70,
                paddingBottom: 0,
                paddingTop: 0,
                borderTopWidth: 0,
                elevation: 20,
                shadowColor: scheme === "dark" ? "#000" : Colors[scheme].tint,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.1,
                shadowRadius: 30,
              },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 2,
        },
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: () => (
          <View style={[StyleSheet.absoluteFill, { borderRadius: 35, overflow: "hidden", backgroundColor: Colors[scheme].background }]} />
        ),
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("layout.home"),
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <IconSymbol size={focused ? 28 : 24} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: t("layout.categories"),
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <IconSymbol size={focused ? 28 : 24} name="category.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t("layout.cart"),
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <IconSymbol size={focused ? 28 : 24} name="shopping-cart.fill" color={color} />
          ),
        }}
      />
      {isAdmin && (
        <Tabs.Screen
          name="admin"
          options={{
            title: t("layout.admin") || "Admin Center",
            tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
              <IconSymbol size={focused ? 28 : 24} name="settings.fill" color={color} />
            ),
          }}
        />
      )}
      <Tabs.Screen
        name="profile"
        options={{
          title: t("layout.profile"),
          tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => (
            <IconSymbol size={focused ? 28 : 24} name="account-box" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
