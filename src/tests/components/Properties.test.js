import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Properties from "../../components/Properties";

const RenderWithRouter = ({ cities }) => {
  return (
    <Router>
      <Properties cities={cities} />
    </Router>
  );
};

RenderWithRouter.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
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

  const validProps = ["leeds", "manchester"];

  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue(mockResponse);
  });

  test("snapshot", () => {
    const { asFragment } = render(<RenderWithRouter cities={validProps} />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders properties", async () => {
    render(<RenderWithRouter cities={validProps} />);

    waitFor(() => {
      expect(screen.getAllByAltText("property")).toHaveLength(
        mockResponse.data.length
      );
    });
  });
});
