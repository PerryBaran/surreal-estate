import React from "react";
import { render, screen } from "@testing-library/react";
import PropertyCard from "../../components/PropertyCard";

describe("PropertyCard", () => {
  const validProps = {
    title: "2 bed flat",
    type: "flat",
    bathrooms: 1,
    bedrooms: 2,
    price: 5000,
    city: "Leeds",
    email: "not.real@email.com",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <PropertyCard
        title={validProps.title}
        type={validProps.type}
        bathrooms={validProps.bathrooms}
        bedrooms={validProps.bedrooms}
        price={validProps.price}
        city={validProps.city}
        email={validProps.email}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders props correctly", () => {
    render(
      <PropertyCard
        title={validProps.title}
        type={validProps.type}
        bathrooms={validProps.bathrooms}
        bedrooms={validProps.bedrooms}
        price={validProps.price}
        city={validProps.city}
        email={validProps.email}
      />
    );
    const bathroomsImg = screen.getByAltText("bathrooms");
    const bedroomsImg = screen.getByAltText("bedrooms");
    const emailImg = screen.getByAltText("email");

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
      `£ ${validProps.price.toFixed(2)}`
    );
    expect(screen.getByText(/email/i).closest("a")).toHaveAttribute(
      "href",
      `mailto:${validProps.email}`
    );
    expect(emailImg).toHaveAttribute("src", "email.png");
    expect(emailImg.closest("a")).toHaveTextContent(/email/i);
  });
});
