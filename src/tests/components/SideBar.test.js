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

    expect(screen.getAllByRole("link")).toHaveLength(cities.length);

    cities.forEach((city) => {
      expect(screen.getByText(city)).toHaveAttribute(
        "href",
        `/?query={"city":"${city}"}`
      );
    });
  });
});
