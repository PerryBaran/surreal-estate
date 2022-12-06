import React from "react";
import { render } from "@testing-library/react";
import Loader from "../../components/Loader";

describe("Loader", () => {
  const validProps = {
    loading: true,
    size: 40,
  };

  test("snapshot", () => {
    const { asFragment } = render(
      <Loader loading={validProps.loading} size={validProps.size} />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
