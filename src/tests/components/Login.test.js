import React from "react";
import { render } from "@testing-library/react";
import Login from "../../components/Login";

describe("Login", () => {
  const validProps = {
    onSuccess: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(<Login {...validProps} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
