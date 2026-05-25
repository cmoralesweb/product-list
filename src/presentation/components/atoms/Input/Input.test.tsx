import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("passes additional className", () => {
    const cls = faker.lorem.word();
    render(<Input className={cls} />);
    expect(screen.getByRole("textbox")).toHaveClass(cls);
  });

  it("passes placeholder", () => {
    const placeholder = faker.lorem.words(2);
    render(<Input placeholder={placeholder} />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it("calls onChange when value changes", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Input onChange={onChange} />);
    const input = screen.getByRole("textbox");
    await user.type(input, "a");
    expect(onChange).toHaveBeenCalled();
  });

  it("applies default input class", () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toHaveClass("input");
  });
});
