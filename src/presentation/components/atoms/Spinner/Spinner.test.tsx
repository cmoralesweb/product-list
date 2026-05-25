import { render, screen } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("renders a spinner with aria-label", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders the spinner element", () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toHaveClass("spinner");
  });
});
