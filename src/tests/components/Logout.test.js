import React from "react";
import { render } from "@testing-library/react";
import Logout from "../../components/Logout";

describe("Logout", () => {
  const validProps = {
    onSuccess: jest.fn(),
  };

  test("snapshot", () => {
    const { asFragment } = render(<Logout onSuccess={validProps.onSuccess} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
