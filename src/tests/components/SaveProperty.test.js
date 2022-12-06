import React from "react";
import { render, screen } from "@testing-library/react";
import SaveProperty from "../../components/SaveProperty";

describe("SaveProperty", () => {
  describe("falsey userId", () => {
    const validProps = {
      userId: "",
      _id: "5itfgnf",
      favouriteId: "845inf",
      onSaveProperty: jest.fn(),
      onRemoveProperty: jest.fn(),
    };

    test("returns null", () => {
      const { container } = render(<SaveProperty {...validProps} />);

      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("truthy favouriteId", () => {
    const validProps = {
      userId: "43654",
      _id: "5itfgnf",
      favouriteId: "845inf",
      onSaveProperty: jest.fn(),
      onRemoveProperty: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<SaveProperty {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(<SaveProperty {...validProps} />);

      expect(screen.getByText(/saved/i)).toBeInTheDocument();
      expect(screen.queryByText(/^save$/i)).not.toBeInTheDocument();
    });
  });

  describe("falsey favouriteId", () => {
    const validProps = {
      userId: "43654",
      _id: "5itfgnf",
      favouriteId: "",
      onSaveProperty: jest.fn(),
      onRemoveProperty: jest.fn(),
    };

    test("snapshot", () => {
      const { asFragment } = render(<SaveProperty {...validProps} />);

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(<SaveProperty {...validProps} />);

      expect(screen.queryByText(/saved/i)).not.toBeInTheDocument();
      expect(screen.getByText(/^save$/i)).toBeInTheDocument();
    });
  });
});
