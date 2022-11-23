import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import SideBar from "../../components/SideBar";
import cities from "../../data/cities";

const RenderWithRouter = () => {
  return (
    <Router>
      <SideBar />
    </Router>
  );
};

describe("SideBar", () => {
  test("snapshot", () => {
    const { asFragment } = render(<RenderWithRouter />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders cities", () => {
    render(<RenderWithRouter />);

    expect(screen.getByText(/filter by city/i)).toBeInstanceOf(
      HTMLHeadingElement
    );
    expect(screen.getAllByRole("link")).toHaveLength(cities.length + 2);
    cities.forEach((city) => {
      expect(screen.getByText(city)).toHaveAttribute(
        "href",
        `/?query={"city":"${city}"}`
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
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    expect(screen.getByAltText("search")).toHaveAttribute("src", "search.png");
  });
});
