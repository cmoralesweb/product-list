import { useSetPageClass } from "@/presentation/context";

export function CartPage() {
  useSetPageClass("cart-page");

  return (
    <>
      <h1 className={"page-title"}>Cart</h1>
      <p>Coming soon</p>
    </>
  );
}
