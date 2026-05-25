import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders the count", () => {
    const count = faker.number.int({ min: 1, max: 99 });
    render(<Badge count={count} />);
    expect(screen.getByText(String(count))).toBeInTheDocument();
  });

  it("returns null when count is 0", () => {
    const { container } = render(<Badge count={0} />);
    expect(container.firstChild).toBeNull();
  });
});
