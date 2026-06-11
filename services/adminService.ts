import { http } from './http';

export async function createProduct(body: any) {
  return http.post('/products', body);
}

export async function uploadProductImage(productid: number | string, imageUri: string) {
  const formData = new FormData();
  const fileName = imageUri.split('/').pop() || `product-${productid}.jpg`;
  const fileType = /\.(png)$/i.test(fileName) ? 'image/png' : 'image/jpeg';

  formData.append('productid', String(productid));
  formData.append('image', {
    uri: imageUri,
    name: fileName,
    type: fileType,
  } as any);

  return http.post('/imgproduct', formData);
}

export async function createPromotion(body: any) {
  return http.post('/promotions', body);
}

export async function createCategory(body: any) {
  return http.post('/categories', body);
}

export async function sendPromotionNotification(body: any) {
  return http.post('/notifications/send-pro-noti', body);
}

export default {
  createProduct,
  uploadProductImage,
  createPromotion,
  createCategory,
  sendPromotionNotification,
};
