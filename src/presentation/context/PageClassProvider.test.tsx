import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useContext } from "react";
import { PageClassContext } from "./pageClassContext";
import { PageClassProvider } from "./PageClassProvider";

function TestDisplay() {
  const { pageClass } = useContext(PageClassContext);
  return <span data-testid="page-class">{pageClass}</span>;
}

function TestSetter({ className }: { className: string }) {
  const { setPageClass } = useContext(PageClassContext);
  return (
    <button onClick={() => setPageClass(className)}>Set {className}</button>
  );
}

describe("PageClassProvider", () => {
  it("provides initial empty pageClass", () => {
    render(
      <PageClassProvider>
        <TestDisplay />
      </PageClassProvider>,
    );
    expect(screen.getByTestId("page-class")).toHaveTextContent("");
  });

  it("updates pageClass when setPageClass is called", async () => {
    const className = faker.lorem.slug();
    const user = userEvent.setup();
    render(
      <PageClassProvider>
        <TestDisplay />
        <TestSetter className={className} />
      </PageClassProvider>,
    );

    await user.click(screen.getByRole("button", { name: `Set ${className}` }));
    expect(screen.getByTestId("page-class")).toHaveTextContent(className);
  });
});
