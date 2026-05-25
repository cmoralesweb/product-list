import { faker } from "@faker-js/faker";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { StorageSelector } from "./StorageSelector";

describe("StorageSelector", () => {
  it("renders a select with storage options", () => {
    const storages = [
      { code: faker.number.int(), name: `${faker.number.int()} GB` },
      { code: faker.number.int(), name: `${faker.number.int()} GB` },
    ];
    render(
      <StorageSelector options={storages} selected={null} onChange={vi.fn()} />,
    );
    for (const s of storages) {
      expect(screen.getByText(s.name)).toBeInTheDocument();
    }
  });

  it("calls onChange with the storage code when selection changes", async () => {
    const storages = [
      { code: 200, name: "128 GB" },
      { code: 201, name: "256 GB" },
    ];
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <StorageSelector
        options={storages}
        selected={null}
        onChange={onChange}
      />,
    );
    await user.selectOptions(screen.getByRole("combobox"), "201");
    expect(onChange).toHaveBeenCalledWith(201);
  });

  it("renders a label", () => {
    render(<StorageSelector options={[]} selected={null} onChange={vi.fn()} />);
    expect(screen.getByLabelText("Storage")).toBeInTheDocument();
  });
});
