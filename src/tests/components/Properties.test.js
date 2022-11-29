import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Properties from "../../components/Properties";

const RenderWithRouter = (props) => {
  return (
    <Router>
      <Properties {...props} />
    </Router>
  );
};

describe("Properties", () => {
  const mockResponse = {
    data: [
      {
        title: "title 1",
        type: "type 1",
        bathrooms: "1",
        bedrooms: "1",
        price: "1000",
        city: "city 1",
        email: "email@email.com",
        _id: "1324e5rtygujhgr",
      },
      {
        title: "titile 2",
        type: "type 2",
        bathrooms: "2",
        bedrooms: "2",
        price: "2000",
        city: "city 2",
        email: "fake@email.com",
        _id: "23uhgvdb",
      },
    ],
  };

  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue(mockResponse);
  });

  describe("falsey userId", () => {
    const validProps = {
      options: {
        cities: ["Leeds", "Manchester"],
        types: ["Flat", "Detached"],
      },
      userId: "",
    };

    test("snapshot", () => {
      const { asFragment } = render(
        <RenderWithRouter
          options={validProps.options}
          userId={validProps.userId}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });

    test("renders properties", async () => {
      render(
        <RenderWithRouter
          options={validProps.options}
          userId={validProps.userId}
        />
      );

      waitFor(() => {
        expect(screen.getAllByAltText("property")).toHaveLength(
          mockResponse.data.length
        );
      });
    });
  });

  describe("truthy userId", () => {
    const validProps = {
      options: {
        cities: ["Leeds", "Manchester"],
        types: ["Flat", "Detached"],
      },
      userId: "truthy",
    };

    test("snapshot", () => {
      const { asFragment } = render(
        <RenderWithRouter
          options={validProps.options}
          userId={validProps.userId}
        />
      );

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
