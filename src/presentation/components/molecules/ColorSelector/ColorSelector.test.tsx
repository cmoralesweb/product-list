import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorSelector } from "./ColorSelector";

describe("ColorSelector", () => {
  it("renders a select with color options", () => {
    const colors = [
      { code: faker.number.int(), name: faker.color.human() },
      { code: faker.number.int(), name: faker.color.human() },
    ];
    render(
      <ColorSelector options={colors} selected={null} onChange={vi.fn()} />,
    );
    for (const c of colors) {
      expect(screen.getByText(c.name)).toBeInTheDocument();
    }
  });

  it("calls onChange with the color code when selection changes", async () => {
    const colors = [
      { code: 100, name: "Black" },
      { code: 101, name: "White" },
    ];
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <ColorSelector options={colors} selected={null} onChange={onChange} />,
    );
    await user.selectOptions(screen.getByRole("combobox"), "101");
    expect(onChange).toHaveBeenCalledWith(101);
  });

  it("renders a label", () => {
    render(<ColorSelector options={[]} selected={null} onChange={vi.fn()} />);
    expect(screen.getByLabelText("Color")).toBeInTheDocument();
  });
});
