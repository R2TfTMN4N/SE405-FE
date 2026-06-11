import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AccessoriesIcon from "@/components/ui/categoryIcon/AccessoriesIcon";
import ApparelIcon from "@/components/ui/categoryIcon/ApprealIcon";
import BagsIcon from "@/components/ui/categoryIcon/BagsIcon";
import ClothesIcon from "@/components/ui/categoryIcon/ClothesIcon";
import ElectronicsIcon from "@/components/ui/categoryIcon/ElectronicsIcon";
import HomeLivingIcon from "@/components/ui/categoryIcon/HomeAndLivingIcon";
import OtherIcon from "@/components/ui/categoryIcon/OtherIcon";
import RacketIcon from "@/components/ui/categoryIcon/RacketIcon";
import ShoesIcon from "@/components/ui/categoryIcon/ShoesIcon";
import ShuttlecockIcon from "@/components/ui/categoryIcon/ShuttlecockIcon";
import GoBackButton from "@/components/ui/GoBackButton";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ColorSchemeName,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function CategoriesScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const schemeRaw = useColorScheme() as ColorSchemeName | null | undefined;
  const scheme: keyof typeof Colors = (schemeRaw ??
    "light") as keyof typeof Colors;
  const borderColor: string = Colors[scheme].border;
  const categories = [
    {
      id: "1",
      name: t("categories.rackets"),
      image: <ElectronicsIcon width={60} height={60} />,
    },
    {
      id: "5",
      name: t("categories.shuttlecocks"),
      image: <HomeLivingIcon width={60} height={60} />,
    },
    {
      id: "2",
      name: t("categories.shoes"),
      image: <ShoesIcon width={60} height={60} />,
    },
    {
      id: "3",
      name: t("categories.clothes"),
      image: <ApparelIcon width={60} height={60} />,
    },
    {
      id: "4",
      name: t("categories.bags"),
      image: <AccessoriesIcon width={60} height={60} />,
    },
    {
      id: "6",
      name: t("categories.other"),
      image: <OtherIcon width={60} height={60} />,
    },
  ];
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <GoBackButton />
        <ThemedText type="title" style={{ fontSize: 20 }}>
          {t("categories.title")}
        </ThemedText>
      </ThemedView>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.categoryItem, { borderColor: borderColor }]}
            onPress={() => {
              router.push({
                pathname: "/productList",
                params: { categoriesid: item.id },
              });
            }}
          >
            <View style={styles.categoryRow}>
              <ThemedText style={styles.categoryLabel}>{item.name}</ThemedText>
              {React.isValidElement(item.image) ? (
                <View style={styles.categoryIcon}>{item.image}</View>
              ) : (
                <Image source={item.image as any} style={styles.categoryIcon} />
              )}
            </View>
          </Pressable>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 15,
    paddingTop: 50,
    position: "relative",
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    textAlign: "center",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  categoryItem: {
    width: "48%",
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  categoryLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
