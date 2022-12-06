import React from "react";
import { render } from "@testing-library/react";
import Login from "../../components/Login";

describe("Login", () => {
  const validProps = {
    onSuccess: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(<Login onSuccess={validProps.onSuccess} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
