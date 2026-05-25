import { CartProvider, PageClassProvider } from "@/presentation/context";
import { AppRouter } from "@/presentation/router/AppRouter";
import {
  HttpClient,
  ProductApiAdapter,
  CartApiAdapter,
} from "@/infrastructure/api";
import { LocalStorageCacheAdapter } from "@/infrastructure/cache";

const http = new HttpClient();
const productRepo = new ProductApiAdapter(http);
const cartRepo = new CartApiAdapter(http);
const cache = new LocalStorageCacheAdapter();

export function App() {
  return (
    <CartProvider cartRepo={cartRepo} cache={cache}>
      <PageClassProvider>
        <AppRouter productRepo={productRepo} cache={cache} />
      </PageClassProvider>
    </CartProvider>
  );
}
