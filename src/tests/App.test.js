import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

test("renders learn react link", () => {
  const { asFragment } = render(<Router><App /></Router>);

  expect(asFragment()).toMatchSnapshot();
});
