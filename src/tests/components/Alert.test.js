import React from "react";
import { render, screen } from "@testing-library/react";
import Alert from "../../components/Alert";

describe("Alert", () => {
  describe("error", () => {
    const validProps = { message: "Error!" };

    test("snapshot", () => {
      const { asFragment } = render(<Alert message={validProps.message} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders props correctly", () => {
      render(<Alert message={validProps.message} />);

      expect(screen.getByText(validProps.message)).toBeInTheDocument();
    });
  });

  describe("success", () => {
    const validProps = {
      message: "Success!",
    };

    test("snapshot", () => {
      const { asFragment } = render(
        <Alert message={validProps.message} success />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(<Alert message={validProps.message} success />);

      expect(screen.getByText(validProps.message)).toBeInTheDocument();
    });
  });

  describe("no message", () => {
    const validProps = {
      message: "",
    };

    test("snapshot", () => {
      const { asFragment } = render(<Alert message={validProps.message} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      const { container } = render(<Alert message={validProps.message} />);

      expect(container).toBeEmptyDOMElement();
    });
  });
});
