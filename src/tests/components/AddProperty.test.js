import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AddProperty from "../../components/AddProperty";
import * as postProperty from "../../requests/postProperty";

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

  describe("form tests", () => {
    beforeEach(() => {
      render(
        <AddProperty cities={validProps.cities} types={validProps.types} />
      );
    });

    test("content", () => {
      const title = screen.getByLabelText(/title/i);
      const typeSelect = screen.getByLabelText(/type/i);
      const bedrooms = screen.getByLabelText(/bedrooms/i);
      const bathrooms = screen.getByLabelText(/bathrooms/i);
      const price = screen.getByLabelText(/price/i);
      const citySelect = screen.getByLabelText(/city/i);
      const email = screen.getByLabelText(/email/i);

      expect(screen.getByRole("form")).toBeInTheDocument();
      expect(title).toHaveAttribute("placeholder", "2 bed flat");
      expect(typeSelect).toHaveDisplayValue(validProps.types[0]);
      validProps.types.forEach((type) => {
        const option = screen.getByText(type);

        expect(typeSelect).toContain(option);
        expect(option).toHaveAttribute("value", type);
      });
      expect(bedrooms).toHaveAttribute("type", "number");
      expect(bedrooms).toHaveDisplayValue("0");
      expect(bedrooms).toHaveAttribute("min", "0");
      expect(bathrooms).toHaveAttribute("type", "number");
      expect(bathrooms).toHaveDisplayValue("0");
      expect(bathrooms).toHaveAttribute("min", "0");
      expect(price).toHaveAttribute("type", "number");
      expect(price).toHaveDisplayValue("0");
      expect(price).toHaveAttribute("min", "0");
      expect(citySelect).toHaveDisplayValue(validProps.cities[0]);
      validProps.cities.forEach((city) => {
        const option = screen.getByText(city);

        expect(citySelect).toContain(option);
        expect(option).toHaveAttribute("value", city);
      });
      expect(email).toHaveAttribute("type", "email");
      expect(email).toHaveAttribute("placeholder", "fake.email@example.com");
    });

    describe("alerts", () => {
      test("missing title", () => {
        const submit = screen.getByText(/add/i);
        let alert = screen.queryByText(/please provide a valid title/i);

        expect(alert).not.toBeInTheDocument();
        fireEvent.click(submit);

        alert = screen.getByText(/please provide a valid title/i);

        expect(alert).toBeInTheDocument();
      });

      test("price must be more than 0", () => {
        const title = screen.getByLabelText(/title/i);
        const submit = screen.getByText(/add/i);

        let alert = screen.queryByText(/price must be more than 0/i);

        expect(alert).not.toBeInTheDocument();
        fireEvent.change(title, { target: { value: "title" } });
        fireEvent.click(submit);

        alert = screen.getByText(/price must be more than 0/i);

        expect(alert).toBeInTheDocument();
      });

      test("non valid email", () => {
        const title = screen.getByLabelText(/title/i);
        const price = screen.getByLabelText(/price/i);
        const submit = screen.getByText(/add/i);

        let alert = screen.queryByText(/please provide a valid email/i);

        expect(alert).not.toBeInTheDocument();
        fireEvent.change(title, { target: { value: "title" } });
        fireEvent.change(price, { target: { value: 20 } });
        fireEvent.click(submit);

        alert = screen.getByText(/please provide a valid email/i);

        expect(alert).toBeInTheDocument();
      });
    });
  });

  describe("mocked postProperty", () => {
    let mockPostProperty;

    beforeEach(() => {
      mockPostProperty = jest.spyOn(postProperty, "default");
    });

    test("on sucess", () => {
      mockPostProperty.mockResolvedValue();
      render(
        <AddProperty cities={validProps.cities} types={validProps.types} />
      );

      waitFor(() => {
        expect(screen.getByText(/property added/i)).toBeInTheDocument();
      });
    });

    test("on error", () => {
      const message = "error";
      mockPostProperty.mockRejectedValue({ message });

      render(
        <AddProperty cities={validProps.cities} types={validProps.types} />
      );

      waitFor(() => {
        expect(screen.getByText(message)).toBeInTheDocument();
      });
    });
  });
});
