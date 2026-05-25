import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    const label = faker.lorem.word();
    render(<Button>{label}</Button>);

    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<Button>OK</Button>);

    expect(screen.getByRole("button")).toHaveClass("btn--primary");
  });

  it("applies secondary variant", () => {
    render(<Button variant="secondary">OK</Button>);

    expect(screen.getByRole("button")).toHaveClass("btn--secondary");
  });

  it("disables the button when disabled is set", () => {
    render(<Button disabled>OK</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Click</Button>);
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("passes additional className", () => {
    const cls = faker.lorem.word();
    render(<Button className={cls}>OK</Button>);

    expect(screen.getByRole("button")).toHaveClass(cls);
  });
});
