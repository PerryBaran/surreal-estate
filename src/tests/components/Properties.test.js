import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Properties from "../../components/Properties";

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
      },
      {
        title: "titile 2",
        type: "type 2",
        bathrooms: "2",
        bedrooms: "2",
        price: "2000",
        city: "city 2",
        email: "fake@email.com",
      },
    ],
  };

  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue(mockResponse);
  });

  test("snapshot", () => {
    const { asFragment } = render(<Properties />);

    expect(asFragment()).toMatchSnapshot();
  });

  test("renders properties", async () => {
    render(<Properties />);

    await waitFor(() =>
      expect(screen.getAllByAltText("property")).toHaveLength(
        mockResponse.data.length
      )
    );
  });
});
