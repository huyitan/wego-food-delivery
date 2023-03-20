import { render, screen, userEvent, waitFor, within } from "@/test/test-utils";

jest.mock("next/router", () => require("next-router-mock"));

import { Home } from "../Home";

test("should create, render home page", async () => {
  await render(<Home />);

  expect(await screen.findByTestId("navbar")).toBeInTheDocument();
  expect(await screen.findByTestId("categories")).toBeInTheDocument();
  expect(await screen.findByTestId("stores")).toBeInTheDocument();
});
