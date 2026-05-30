import { http } from "./http";

export function getPromotions(): Promise<any[]> {
    return http.get<any[]>('/promotions');
}

export function getSuggestPromotions(body: any): Promise<any[]> {
    return http.get<any[]>(`/promotions/promotion/suggest?userid=${body.userid}&orderTotal=${body.orderTotal}`);
}   