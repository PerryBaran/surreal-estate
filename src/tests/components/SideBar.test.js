import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
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
});
