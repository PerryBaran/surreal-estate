import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SideBar from "../../components/SideBar";

const RenderWithRouter = (props) => {
  return (
    <Router>
      <SideBar {...props} />
    </Router>
  );
};

describe("SideBar", () => {
  describe("falsey userId", () => {
    const validProps = {
      cities: ["Leeds", "Manchester"],
      types: ["Flat", "Detached"],
      userId: "",
      filterByFavourites: false,
      handleFilterFavourites: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<RenderWithRouter {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(<RenderWithRouter {...validProps} />);

      expect(
        screen.queryByText(/fitler by favourites/i)
      ).not.toBeInTheDocument();
      expect(screen.getByText(/filter by city/i)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getAllByRole("link")).toHaveLength(
        validProps.cities.length + validProps.types.length + 2 // Link for each city, type and price (ascending, descending)
      );
      validProps.cities.forEach((city) => {
        expect(screen.getByText(city)).toHaveAttribute(
          "href",
          `/?query={"city":"${city}"}`
        );
      });
      validProps.types.forEach((type) => {
        expect(screen.getByText(type)).toHaveAttribute(
          "href",
          `/?query={"type":"${type}"}`
        );
      });
      expect(screen.getByText(/sort by price/i)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByText(/ascending/i)).toHaveAttribute(
        "href",
        `/?sort={"price":-1}`
      );
      expect(screen.getByText(/descending/i)).toHaveAttribute(
        "href",
        `/?sort={"price":1}`
      );
      expect(screen.getByText(/search by title/i)).toBeInstanceOf(
        HTMLHeadingElement
      );
      expect(screen.getByRole("textbox")).toHaveAttribute("id", "query");
      expect(screen.getByText(/reset/i)).toBeInstanceOf(HTMLButtonElement);
      expect(screen.getByAltText("search")).toHaveAttribute(
        "src",
        "search.png"
      );
    });
  });

  describe("truthy userId", () => {
    const validProps = {
      cities: ["Leeds", "Manchester"],
      types: ["Flat", "Detached"],
      userId: "76yhh64b",
      filterByFavourites: false,
      handleFilterFavourites: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<RenderWithRouter {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders favourite checkbox", () => {
      render(<RenderWithRouter {...validProps} />);

      expect(screen.getByText(/filter by favourites/i)).toBeInTheDocument();
    });

    test("clicking links adds and removes from query string", () => {
      render(<RenderWithRouter {...validProps} />);

      const city = validProps.cities[0];
      const type = validProps.types[0];
      const cityLink = screen.getByText(city);
      const typeLink = screen.getByText(type);

      fireEvent.click(cityLink);
      expect(typeLink).toHaveAttribute(
        "href",
        `/?query={"city":"${city}","type":"${type}"}`
      );
      fireEvent.click(cityLink);
      expect(typeLink).toHaveAttribute("href", `/?query={"type":"${type}"}`);
    });

    test("reset button", () => {
      render(<RenderWithRouter {...validProps} />);

      const city = validProps.cities[0];
      const type = validProps.types[0];
      const cityLink = screen.getByText(city);
      const typeLink = screen.getByText(type);
      const reset = screen.getByText(/reset/i);

      fireEvent.click(cityLink);
      expect(typeLink).toHaveAttribute(
        "href",
        `/?query={"city":"${city}","type":"${type}"}`
      );
      fireEvent.click(reset);
      expect(typeLink).toHaveAttribute("href", `/?query={"type":"${type}"}`);
    });
  });
});
