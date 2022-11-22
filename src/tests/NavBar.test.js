import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";

const RenderWithRouter = () => {
  return (
    <Router>
      <NavBar />
    </Router>
  );
};

describe("NavBar", () => {
  test("snapshot", () => {
    const { asFragment } = render(<RenderWithRouter />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("content", () => {
    render(<RenderWithRouter />);
    const links = screen.getAllByRole("link");

    expect(screen.getByAltText(/surreal estate/i)).toHaveAttribute(
      "src",
      "logo.png"
    );
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent(/view properties/i);
    expect(links[0]).toHaveAttribute("href", "/");
    expect(links[1]).toHaveTextContent(/add a property/i);
    expect(links[1]).toHaveAttribute("href", "/add-property");
  });
});
