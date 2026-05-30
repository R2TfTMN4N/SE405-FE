import { t } from "i18next";
import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image: ImageSourcePropType;
  categoriesid?: number;
  brand?: string;
};

export type ProductFilters = {
  categoriesid?: number;
  searchQuery?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const PRODUCT_DATA: Product[] = [
  {
    id: "1",
    name: " Shoes",
    price: 3200000,
    discount: 20,
    image: require("../assets/images/product1.png"),
    categoriesid: 1,
    brand: "SHoes",
  },
  {
    id: "2",
    name: "   Giày Lining Sonic Boom",
    price: 2900000,
    discount: 10,
    image: require("../assets/images/product1.png"),
    categoriesid: 1,
    brand: "Lining",
  },
  {
    id: "3",
    name: "Giày  ",
    price: 2100000,
    image: require("../assets/images/product1.png"),
    categoriesid: 3,
    brand: "Victor",
  },
  {
    id: "4",
    name: "Áo  ",
    price: 850000,
    discount: 15,
    image: require("../assets/images/product1.png"),
    categoriesid: 4,
    brand: "Adidas",
  },
  {
    id: "5",
    name: "Balo Adidas Barricade",
    price: 950000,
    image: require("../assets/images/product1.png"),
    categoriesid: 5,
    brand: "Adidas",
  },
];

export const PRICE_STEP = 50000;

export const PRICE_RANGE = (() => {
  const prices = PRODUCT_DATA.map((product) => product.price);
  const highestPrice =
    prices.length > 0 ? Math.max(...prices) : PRICE_STEP * 20;
  const roundedMax = Math.ceil(highestPrice / PRICE_STEP) * PRICE_STEP;
  return { min: 0, max: roundedMax || PRICE_STEP * 20 };
})();

export const CATEGORY_LABEL_MAP: Record<number, string> = {
  1: t("categories.rackets"),
  5: t("categories.shuttlecocks"),
  2: t("categories.shoes"),
  3: t("categories.clothes"),
  4: t("categories.bags"),
  6: t("categories.other"),
};

export const getCategoryOptions = (): { label: string; value?: number }[] => {
  return [
    { label: t("products.all"), value: undefined },
    { label: t("categories.rackets"), value: 1 },
    { label: t("categories.shuttlecocks"), value: 5 },
    { label: t("categories.shoes"), value: 2 },
    { label: t("categories.clothes"), value: 3 },
    { label: t("categories.bags"), value: 4 },
    { label: t("categories.other"), value: 6 },
  ];
};

export const BRAND_OPTIONS: { label: string; value?: string }[] = [
  { label: t("products.all"), value: undefined },
  { label: "Apple", value: "Apple" },
  { label: "Samsung", value: "Samsung" },
  { label: "Xiaomi", value: "Xiaomi" },
  { label: "Vivo", value: "Vivo" },
];

export const formatPrice = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
