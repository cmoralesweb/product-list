import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Select } from "./Select";

describe("Select", () => {
  it("renders all options", () => {
    const options = [
      { value: faker.string.uuid(), label: faker.lorem.word() },
      { value: faker.string.uuid(), label: faker.lorem.word() },
    ];
    render(<Select options={options} />);
    for (const opt of options) {
      expect(screen.getByText(opt.label)).toBeInTheDocument();
    }
  });

  it("passes additional className", () => {
    const cls = faker.lorem.word();
    const options = [{ value: "1", label: "A" }];
    render(<Select options={options} className={cls} />);
    expect(screen.getByRole("combobox")).toHaveClass(cls);
  });

  it("calls onChange when selection changes", async () => {
    const options = [
      { value: "1", label: "One" },
      { value: "2", label: "Two" },
    ];
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Select options={options} onChange={onChange} />);
    await user.selectOptions(screen.getByRole("combobox"), "2");
    expect(onChange).toHaveBeenCalled();
  });

  it("has default select class", () => {
    render(<Select options={[{ value: "1", label: "A" }]} />);
    expect(screen.getByRole("combobox")).toHaveClass("select");
  });
});
