import type { CartRepository } from "@/domain/ports";
import type { Cart, ProductSelection } from "@/domain/models";
import { HttpClient } from "@/infrastructure/api/httpClient";

interface AddToCartRequestDto {
  id: string;
  colorCode: number;
  storageCode: number;
}

interface AddToCartResponseDto {
  count: number;
}

export class CartApiAdapter implements CartRepository {
  constructor(private readonly http: HttpClient) {}

  async add(selection: ProductSelection): Promise<Cart> {
    const dto = await this.http.post<AddToCartRequestDto, AddToCartResponseDto>(
      "/api/cart",
      {
        id: selection.productId,
        colorCode: selection.colorCode,
        storageCode: selection.storageCode,
      },
    );
    return { count: dto.count };
  }
}
