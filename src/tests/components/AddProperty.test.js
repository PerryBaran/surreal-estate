import React from "react";
import { render, screen } from "@testing-library/react";
import AddProperty from "../../components/AddProperty";

describe("AddProperty", () => {
  const validProps = {
    cities: ["Leeds", "Manchester"],
    types: ["Flat", "Detached"],
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <AddProperty cities={validProps.cities} types={validProps.types} />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(<AddProperty cities={validProps.cities} types={validProps.types} />);

    expect(screen.getByRole("form")).toBeInTheDocument();

    const title = screen.getByLabelText(/title:/i);

    expect(title).toHaveAttribute("placeholder", "2 bed flat");

    const typeSelect = screen.getByLabelText(/type:/i);

    expect(typeSelect).toHaveDisplayValue(validProps.types[0]);
    validProps.types.forEach((type) => {
      const option = screen.getByText(type);

      expect(typeSelect).toContain(option);
      expect(option).toHaveAttribute("value", type);
    });

    const bedrooms = screen.getByLabelText(/bedrooms:/i);

    expect(bedrooms).toHaveAttribute("type", "number");
    expect(bedrooms).toHaveDisplayValue("1");
    expect(bedrooms).toHaveAttribute("min", "1");
    expect(bedrooms).toHaveAttribute("max", "9");

    const bathrooms = screen.getByLabelText(/bathrooms/i);

    expect(bathrooms).toHaveAttribute("type", "number");
    expect(bathrooms).toHaveDisplayValue("1");
    expect(bathrooms).toHaveAttribute("min", "1");
    expect(bathrooms).toHaveAttribute("max", "9");

    const price = screen.getByLabelText(/price:/i);

    expect(price).toHaveAttribute("type", "number");
    expect(price).toHaveDisplayValue("0");
    expect(price).toHaveAttribute("min", "0");
    expect(price).toHaveAttribute("step", "any");

    const citySelect = screen.getByLabelText(/city/i);

    expect(citySelect).toHaveAttribute("name", "city");
    expect(citySelect).toHaveDisplayValue(validProps.cities[0]);
    validProps.cities.forEach((city) => {
      const option = screen.getByText(city);

      expect(citySelect).toContain(option);
      expect(option).toHaveAttribute("value", city);
    });

    const email = screen.getByLabelText(/email/i);

    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("placeholder", "perry.baran@email.com");
  });
});
