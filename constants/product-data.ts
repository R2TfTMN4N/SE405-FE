import { ImageSourcePropType } from "react-native";

export type Product = {
  id: string;
  name: string;
  price: number;
  discount?: number;
  image: ImageSourcePropType;
  category?: number;
  brand?: string;
};

export type ProductFilters = {
  category?: number;
  searchQuery?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const PRODUCT_DATA: Product[] = [
  {
    id: "1",
    name: "Wireless Earbuds A1",
    price: 1290000,
    discount: 15,
    image: require("../assets/images/product1.png"),
    category: 1,
    brand: "SoundMax",
  },
  {
    id: "2",
    name: "Cotton Tee Classic",
    price: 320000,
    discount: 10,
    image: require("../assets/images/product1.png"),
    category: 2,
    brand: "Northwind",
  },
  {
    id: "3",
    name: "Running Sneakers Flex",
    price: 1900000,
    image: require("../assets/images/product1.png"),
    category: 3,
    brand: "Stride",
  },
  {
    id: "4",
    name: "City Backpack 20L",
    price: 780000,
    discount: 12,
    image: require("../assets/images/product1.png"),
    category: 4,
    brand: "TrailPro",
  },
  {
    id: "5",
    name: "Ceramic Desk Lamp",
    price: 650000,
    image: require("../assets/images/product1.png"),
    category: 5,
    brand: "Lumen",
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
  1: "Electronics",
  2: "Apparel",
  3: "Footwear",
  4: "Bags",
  5: "Home",
};

export const CATEGORY_OPTIONS: { label: string; value?: number }[] = [
  { label: "All", value: undefined },
  { label: CATEGORY_LABEL_MAP[1], value: 1 },
  { label: CATEGORY_LABEL_MAP[2], value: 2 },
  { label: CATEGORY_LABEL_MAP[3], value: 3 },
  { label: CATEGORY_LABEL_MAP[4], value: 4 },
  { label: CATEGORY_LABEL_MAP[5], value: 5 },
];

export const BRAND_OPTIONS: { label: string; value?: string }[] = [
  { label: "All", value: undefined },
  { label: "SoundMax", value: "SoundMax" },
  { label: "Northwind", value: "Northwind" },
  { label: "Stride", value: "Stride" },
  { label: "TrailPro", value: "TrailPro" },
  { label: "Lumen", value: "Lumen" },
];

export const formatPrice = (value: number) =>
  value.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
