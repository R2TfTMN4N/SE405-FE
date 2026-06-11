import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import FullButton from "@/components/ui/FullButton";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { checkoutCart } from "@/services/cartService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { jwtDecode } from "jwt-decode";
import React from "react";
import { ActivityIndicator, ColorSchemeName, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

const ResultCheckoutScreen: React.FC = () => {
  const { t } = useTranslation();
  const params = useLocalSearchParams<{
    items?: string;
    promoId?: string;
    promoCode?: string;
    discountAmount?: string;
    address?: string;
    paymentMethod?: string;
  }>();
  const schemeRaw = useColorScheme() as ColorSchemeName | undefined | null;
  const scheme: keyof typeof Colors = (schemeRaw ??
    "light") as keyof typeof Colors;
  const [status, setStatus] = React.useState<"loading" | "error">("loading");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  React.useEffect(() => {
    let mounted = true;

    const submitOrder = async () => {
      try {
        const token = await AsyncStorage.getItem("loginToken");
        const decoded = token ? (jwtDecode(token) as any) : null;
        const userId = decoded?.userid ?? decoded?.id;

        const rawItems = params.items ? JSON.parse(params.items) : [];
        const rawAddress = params.address ? JSON.parse(params.address) : null;
        const cartitemid = rawItems
          .map((item: any) => Number(item.id))
          .filter((id: number) => Number.isFinite(id));

        if (!userId || cartitemid.length === 0 || !rawAddress?.phone) {
          throw new Error("Missing checkout data");
        }

        await checkoutCart({
          userid: Number(userId),
          cartitemid,
          phonenumber: String(rawAddress.phone),
          address: `${rawAddress.fullName}, ${rawAddress.detailedAddress}, ${rawAddress.district}, ${rawAddress.province}, ${rawAddress.country}`,
          promotioncode: params.promoCode ?? "",
        });

        if (!mounted) return;
        router.replace("/checkout/result");
      } catch (error) {
        console.error("Checkout submission failed:", error);
        if (!mounted) return;
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : t("common.somethingWentWrong"),
        );
      }
    };

    submitOrder();

    return () => {
      mounted = false;
    };
  }, [params.address, params.items, params.promoCode, t]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedView style={styles.illustrationWrapper}>
          {status === "loading" ? (
            <ActivityIndicator size="large" color={Colors[scheme].tint} />
          ) : (
            <Image
              source={require("@/assets/images/successCheckout.png")}
              style={styles.illustration}
              contentFit="contain"
            />
          )}
        </ThemedView>
        {status === "loading" ? (
          <>
            <ThemedText type="title" style={styles.heading}>
              {t("checkoutPayment.title")}
            </ThemedText>
            <ThemedText
              style={[
                styles.subtitle,
                { color: Colors[scheme].secondaryText, textAlign: "center" },
              ]}
            >
              {t("common.loading")}
            </ThemedText>
          </>
        ) : (
          <>
            <ThemedText type="title" style={styles.heading}>
              {t("checkoutResult.title")}
            </ThemedText>
            <ThemedText
              style={[
                styles.subtitle,
                { color: Colors[scheme].secondaryText, textAlign: "center" },
              ]}
            >
              {errorMessage || t("checkoutResult.subtitle")}
            </ThemedText>
            <ThemedView style={styles.buttonsContainer}>
              <FullButton
                text={t("common.cancel")}
                onPress={() => {
                  router.back();
                }}
              />
            </ThemedView>
          </>
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default ResultCheckoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
  },
  content: {
    marginTop: 32,
    flex: 1,
  },
  illustrationWrapper: {
    backgroundColor: "#F9E0E0",
    borderRadius: 50,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  illustration: {
    width: "75%",
    height: 330,
    maxWidth: 300,
  },
  heading: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  fieldGroup: {
    marginTop: 32,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 15,
    marginTop: 8,
  },
  buttonsContainer: {
    marginTop: 32,
  },
});
