import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "./SearchInput";

describe("SearchInput", () => {
  it("renders a label and input", () => {
    render(<SearchInput value="" onChange={vi.fn()} />);
    expect(
      screen.getByLabelText("Search by brand or model"),
    ).toBeInTheDocument();
  });

  it("displays the given value", () => {
    const value = faker.lorem.word();
    render(<SearchInput value={value} onChange={vi.fn()} />);
    expect(screen.getByRole("searchbox")).toHaveValue(value);
  });

  it("calls onChange when user types", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<SearchInput value="" onChange={onChange} />);
    await user.type(screen.getByRole("searchbox"), "a");
    expect(onChange).toHaveBeenCalled();
  });
});
