import { createCategory, render, screen } from "@/test/test-utils";
import { useCategories } from "../../api/getCategories";
import { Categories } from "../Categories";

jest.mock("next/router", () => require("next-router-mock"));
jest.mock("../../api/getCategories", () => ({
  useCategories: jest.fn(),
}));

const renderCategories = async () => {
  const fakeCategories = [
    await createCategory(),
    await createCategory(),
    await createCategory(),
  ];

  (useCategories as jest.Mock).mockImplementation(() => ({
    isLoading: false,
    data: fakeCategories,
  }));

  await render(<Categories />);

  return {
    fakeCategories,
  };
};

test("should render categories", async () => {
  const { fakeCategories } = await renderCategories();

  expect(screen.getByText(fakeCategories[0].name)).toBeInTheDocument();
  // Expect number of categories (include all category)
  expect(screen.getAllByTestId("categories-item")).toHaveLength(
    fakeCategories.length + 1
  );
});

test("should render categories skeleton when loading data", async () => {
  (useCategories as jest.Mock).mockImplementation(() => ({
    isLoading: true,
    data: null,
  }));

  await render(<Categories />);

  expect(screen.getByTestId("categories-loader")).toBeInTheDocument();
});
