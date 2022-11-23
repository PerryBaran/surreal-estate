import React from "react";
import { render, screen } from "@testing-library/react";
import AddProperty from "../../components/AddProperty";

describe("AddProperty", () => {
  const validProps = ["Leeds", "Manchester"];

  test("snapshot", () => {
    const { asFragment } = render(<AddProperty cities={validProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(<AddProperty cities={validProps} />);
    const title = screen.getByLabelText(/title:/i);
    const type = screen.getByLabelText(/type:/i);
    const bedrooms = screen.getByLabelText(/bedrooms:/i);
    const bathrooms = screen.getByLabelText(/bathrooms/i);
    const price = screen.getByLabelText(/price:/i);
    const city = screen.getByLabelText(/city/i);
    const email = screen.getByLabelText(/email/i);
    const options = screen.getAllByRole("option");
    const [
      flat,
      detached,
      semiDetached,
      terraced,
      endOfTerrace,
      cottage,
      bungalow,
    ] = options;

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(title).toHaveAttribute("name", "title");
    expect(title).toHaveAttribute("placeholder", "2 bed flat");
    expect(type).toHaveAttribute("name", "type");
    expect(type).toHaveDisplayValue("Flat");
    expect(type).toContain(flat);
    expect(flat).toHaveTextContent(/flat/i);
    expect(flat).toHaveAttribute("value", "Flat");
    expect(type).toContain(detached);
    expect(detached).toHaveTextContent(/detached/i);
    expect(detached).toHaveAttribute("value", "Detached");
    expect(type).toContain(semiDetached);
    expect(semiDetached).toHaveTextContent(/semi-detached/i);
    expect(semiDetached).toHaveAttribute("value", "Semi-Detached");
    expect(type).toContain(terraced);
    expect(terraced).toHaveTextContent(/terraced/i);
    expect(terraced).toHaveAttribute("value", "Terraced");
    expect(type).toContain(endOfTerrace);
    expect(endOfTerrace).toHaveTextContent(/end of terrace/i);
    expect(endOfTerrace).toHaveAttribute("value", "End Of Terrace");
    expect(type).toContain(cottage);
    expect(cottage).toHaveTextContent(/cottage/i);
    expect(cottage).toHaveAttribute("value", "Cottage");
    expect(type).toContain(bungalow);
    expect(bungalow).toHaveTextContent(/bungalow/i);
    expect(bungalow).toHaveAttribute("value", "Bungalow");
    expect(bedrooms).toHaveAttribute("type", "number");
    expect(bedrooms).toHaveAttribute("name", "bedrooms");
    expect(bedrooms).toHaveDisplayValue("1");
    expect(bedrooms).toHaveAttribute("min", "1");
    expect(bedrooms).toHaveAttribute("max", "9");
    expect(bathrooms).toHaveAttribute("type", "number");
    expect(bathrooms).toHaveAttribute("name", "bathrooms");
    expect(bathrooms).toHaveDisplayValue("1");
    expect(bathrooms).toHaveAttribute("min", "1");
    expect(bathrooms).toHaveAttribute("max", "9");
    expect(price).toHaveAttribute("type", "number");
    expect(price).toHaveAttribute("name", "price");
    expect(price).toHaveDisplayValue("0");
    expect(price).toHaveAttribute("min", "0");
    expect(price).toHaveAttribute("step", "any");
    expect(city).toHaveAttribute("name", "city");
    expect(city).toHaveDisplayValue("Manchester");
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("name", "email");
    expect(email).toHaveAttribute("placeholder", "perry.baran@email.com");
    expect(email).toHaveDisplayValue("");
  });
});
