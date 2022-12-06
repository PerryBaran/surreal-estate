import React from "react";
import { render, screen } from "@testing-library/react";
import SaveProperty from "../../components/SaveProperty";

describe("SaveProperty", () => {
  const validProps = {
    userId: "43ref",
    _id: "5itfgnf",
    favouriteId: "845inf",
    onSaveProperty: jest.fn(),
    onRemoveProperty: jest.fn(),
  };

  test("falsey userId", () => {
    const { container } = render(
      <SaveProperty
        userId=""
        _id={validProps._id}
        favouriteId={validProps.favouriteId}
        onSaveProperty={validProps.onSaveProperty}
        onRemoveProperty={validProps.onRemoveProperty}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  describe("truthy favouriteId", () => {
    test("snapshot", () => {
      const { asFragment } = render(
        <SaveProperty
          userId={validProps.userId}
          _id={validProps._id}
          favouriteId={validProps.favouriteId}
          onSaveProperty={validProps.onSaveProperty}
          onRemoveProperty={validProps.onRemoveProperty}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(
        <SaveProperty
          userId={validProps.userId}
          _id={validProps._id}
          favouriteId={validProps.favouriteId}
          onSaveProperty={validProps.onSaveProperty}
          onRemoveProperty={validProps.onRemoveProperty}
        />
      );

      expect(screen.getByText(/saved/i)).toBeInTheDocument();
      expect(screen.queryByText(/^save$/i)).not.toBeInTheDocument();
    });
  });

  describe("falsey favouriteId", () => {
    test("snapshot", () => {
      const { asFragment } = render(
        <SaveProperty
          userId={validProps.userId}
          _id={validProps._id}
          favouriteId=""
          onSaveProperty={validProps.onSaveProperty}
          onRemoveProperty={validProps.onRemoveProperty}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders correctly", () => {
      render(
        <SaveProperty
          userId={validProps.userId}
          _id={validProps._id}
          favouriteId=""
          onSaveProperty={validProps.onSaveProperty}
          onRemoveProperty={validProps.onRemoveProperty}
        />
      );

      expect(screen.queryByText(/saved/i)).not.toBeInTheDocument();
      expect(screen.getByText(/^save$/i)).toBeInTheDocument();
    });
  });
});
