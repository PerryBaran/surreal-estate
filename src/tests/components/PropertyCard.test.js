import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyCard from "../../components/PropertyCard";

describe("PropertyCard", () => {
  describe("falsy userId", () => {
    const validProps = {
      _id: "4refsf",
      title: "2 bed flat",
      type: "flat",
      bathrooms: "1",
      bedrooms: "2",
      price: "5000",
      city: "Leeds",
      email: "not.real@email.com",
      userId: "",
      onSaveProperty: jest.fn(),
      onRemoveProperty: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<PropertyCard {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(<PropertyCard {...validProps} />);
      const bathroomsImg = screen.getByAltText("bathrooms");
      const bedroomsImg = screen.getByAltText("bedrooms");
      const emailImg = screen.getByAltText("email");

      expect(screen.getByAltText("property")).toHaveAttribute(
        "src",
        "card.png"
      );
      expect(screen.getByText(validProps.title)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByText(new RegExp(validProps.city))).toHaveTextContent(
        `${validProps.type} - ${validProps.city}`
      );
      expect(bathroomsImg).toHaveAttribute("alt", "bathrooms");
      expect(bathroomsImg).toHaveAttribute("src", "bath.png");
      expect(screen.getByText(validProps.bathrooms)).toBeInTheDocument();
      expect(bedroomsImg).toHaveAttribute("alt", "bedrooms");
      expect(bedroomsImg).toHaveAttribute("src", "bed.png");
      expect(screen.getByText(validProps.bedrooms)).toBeInTheDocument();
      expect(screen.getByText(new RegExp(validProps.price))).toHaveTextContent(
        `£ ${Number(validProps.price).toFixed(2)}`
      );
      expect(screen.getByText(/email/i).closest("a")).toHaveAttribute(
        "href",
        `mailto:${validProps.email}`
      );
      expect(emailImg).toHaveAttribute("src", "email.png");
      expect(emailImg.closest("a")).toHaveTextContent(/email/i);
    });
  });

  describe("truthy userId", () => {
    const validProps = {
      _id: "4refsf",
      title: "2 bed flat",
      type: "flat",
      bathrooms: "1",
      bedrooms: "2",
      price: "5000",
      city: "Leeds",
      email: "not.real@email.com",
      userId: "truthy",
      onSaveProperty: jest.fn(),
      onRemoveProperty: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<PropertyCard {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });

  describe("truthy userId and favouriteId", () => {
    const validProps = {
      _id: "4refsf",
      title: "2 bed flat",
      type: "flat",
      bathrooms: "1",
      bedrooms: "2",
      price: "5000",
      city: "Leeds",
      email: "not.real@email.com",
      userId: "truthy",
      favouriteId: "alsoTruthy",
      onSaveProperty: jest.fn(),
      onRemoveProperty: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<PropertyCard {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
