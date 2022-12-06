import React from "react";
import { BrowserRouter as Router, matchPath } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import NavBar from "../../components/NavBar";

const RenderWithRouter = (props) => {
  return (
    <Router>
      <NavBar {...props} />
    </Router>
  );
};

describe("NavBar", () => {
  const validProps = {
    handleLogin: jest.fn(),
    handleLogout: jest.fn(),
    userId: "",
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <RenderWithRouter
        handleLogin={validProps.handleLogin}
        handleLogout={validProps.handleLogout}
        userId={validProps.userId}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("links", () => {
    render(
      <RenderWithRouter
        handleLogin={validProps.handleLogin}
        handleLogout={validProps.handleLogout}
        userId={validProps.userId}
      />
    );
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

  test("login rendered when userId is falsey", () => {
    render(
      <RenderWithRouter
        handleLogin={validProps.handleLogin}
        handleLogout={validProps.handleLogout}
        userId={validProps.userId}
      />
    );

    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
  });

  test("logout rendered when userId is truthy", () => {
    validProps.userId = "truthy";
    render(
      <RenderWithRouter
        handleLogin={validProps.handleLogin}
        handleLogout={validProps.handleLogout}
        userId={validProps.userId}
      />
    );

    expect(screen.queryByText(/login/i)).not.toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });
});
