import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the error message", () => {
    const msg = faker.lorem.sentence();
    render(<ErrorMessage message={msg} />);
    expect(screen.getByText(msg)).toBeInTheDocument();
  });

  it("does not render retry button when onRetry is not provided", () => {
    render(<ErrorMessage message={faker.lorem.sentence()} />);
    expect(
      screen.queryByRole("button", { name: "Retry" }),
    ).not.toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    render(<ErrorMessage message={faker.lorem.sentence()} onRetry={vi.fn()} />);
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();
    render(<ErrorMessage message={faker.lorem.sentence()} onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: "Retry" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("has role alert", () => {
    render(<ErrorMessage message={faker.lorem.sentence()} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
