import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./pages/HomePage/HomePage", () => () => <div>HomePage Mock</div>);

describe("App Component", () => {
  test("renders without crashing", () => {
    render(<App />);
  });

  test("renders HomePage component", () => {
    render(<App />);
    expect(screen.getByText("HomePage Mock")).toBeInTheDocument();
  });
});
