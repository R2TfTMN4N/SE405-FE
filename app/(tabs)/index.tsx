import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import BagsIcon from "@/components/ui/categoryIcon/BagsIcon";
import ClothesIcon from "@/components/ui/categoryIcon/ClothesIcon";
import OtherIcon from "@/components/ui/categoryIcon/OtherIcon";
import ShoesIcon from "@/components/ui/categoryIcon/ShoesIcon";
import Header from "@/components/ui/Header";
import ProductCard from "@/components/ui/ProductCard";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const schemeRaw = useColorScheme();
  const scheme: keyof typeof Colors = (schemeRaw ??
    "light") as keyof typeof Colors;
  const tint: string = Colors[scheme].tint;
  const borderColor: string = Colors[scheme].border;

  const handleSeeAllCategoriesPress = () => {
    router.push("/categories");
  };

  const pushProductList = (params?: { category?: number }) => {
    const routeParams: Record<string, string> = {};
    if (params?.category !== undefined) {
      routeParams.category = String(params.category);
    }
    router.push({ pathname: "/productList", params: routeParams });
  };

  const handleSeeAllProductsPress = () => {
    pushProductList();
  };

  const handleCategoryItemPress = (category?: number) => {
    pushProductList(category ? { category } : undefined);
  };
  const categories = [
    {
      id: "1",
      name: "Electronics",
      image: <OtherIcon width={48} height={48} />,
      filter: 1,
    },
    {
      id: "2",
      name: "Apparel",
      image: <ClothesIcon width={48} height={48} />,
      filter: 2,
    },
    {
      id: "3",
      name: "Footwear",
      image: <ShoesIcon width={48} height={48} />,
      filter: 3,
    },
    {
      id: "4",
      name: "Bags",
      image: <BagsIcon width={48} height={48} />,
      filter: 4,
    },
    {
      id: "5",
      name: "Home",
      image: <OtherIcon width={48} height={48} />,
      filter: 5,
    },
  ];
  const products = [
    {
      id: "1",
      name: "Wireless Earbuds A1",
      price: 1290000,
      discount: 15,
      image: require("../../assets/images/product1.png"),
    },
    {
      id: "2",
      name: "Cotton Tee Classic",
      price: 320000,
      discount: 10,
      image: require("../../assets/images/product1.png"),
    },
    {
      id: "3",
      name: "Running Sneakers Flex",
      price: 1900000,
      image: require("../../assets/images/product1.png"),
    },
    {
      id: "4",
      name: "City Backpack 20L",
      price: 780000,
      discount: 12,
      image: require("../../assets/images/product1.png"),
    },
    {
      id: "5",
      name: "Ceramic Desk Lamp",
      price: 650000,
      image: require("../../assets/images/product1.png"),
    },
  ];
  return (
    <View>
      <ThemedView style={styles.container}>
        <Header />
        <ScrollView showsVerticalScrollIndicator={false}>
          <ThemedView style={styles.stepContainer}>
            <Image
              source={require("../../assets/images/banner/banner1.png")}
              style={styles.banner}
            />
          </ThemedView>
          <ThemedView>
            <ThemedView style={styles.headerSection}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
                Category
              </ThemedText>
              <Pressable
                onPress={() => {
                  handleSeeAllCategoriesPress();
                }}
              >
                <ThemedText type="link" style={{ color: tint }}>
                  See All
                </ThemedText>
              </Pressable>
            </ThemedView>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 12 }}
            >
              {categories.map((cat) => (
                <Pressable
                  key={cat.id}
                  style={[styles.categoryItem, { borderColor: borderColor }]}
                  onPress={() => handleCategoryItemPress(cat.filter)}
                >
                  {React.isValidElement(cat.image) ? (
                    <View style={styles.categoryIcon}>{cat.image}</View>
                  ) : (
                    <Image
                      source={cat.image as any}
                      style={styles.categoryIcon}
                    />
                  )}
                  <ThemedText style={{ marginTop: 6 }}>{cat.name}</ThemedText>
                </Pressable>
              ))}
            </ScrollView>
          </ThemedView>
          <ThemedView>
            <ThemedView style={styles.headerSection}>
              <ThemedText type="defaultSemiBold" style={{ fontSize: 20 }}>
                Lastest Product
              </ThemedText>
              <Pressable
                onPress={() => {
                  handleSeeAllProductsPress();
                }}
              >
                <ThemedText type="link" style={{ color: tint }}>
                  See All
                </ThemedText>
              </Pressable>
            </ThemedView>
            <ThemedView
              style={{
                gap: 10,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>
    </View>
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
  banner: {
    borderRadius: 12,
    height: 200,
    width: "100%",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginTop: 12,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    width: 130,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 12,
    borderColor: "#F4F5FD",
    borderWidth: 1,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
