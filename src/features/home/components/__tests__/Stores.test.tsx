import {
  createStore,
  render,
  screen,
  userEvent,
  waitFor,
} from "@/test/test-utils";
import { PAGE_OFFSET } from "@/utils/constants";
import { useStores } from "../../api/getStores";
import { Stores } from "../Stores";

jest.mock("@/utils/constants", () => ({
  PAGE_OFFSET: 2,
}));
jest.mock("../../api/getStores", () => ({
  useStores: jest.fn(),
}));

const renderStores = async () => {
  const fakeStores = [
    await createStore(),
    await createStore(),
    await createStore(),
    await createStore(),
  ];

  (useStores as jest.Mock).mockImplementation(() => ({
    isLoading: false,
    data: fakeStores,
  }));

  await render(<Stores />);

  return {
    fakeStores,
  };
};

test("should render stores", async () => {
  const { fakeStores } = await renderStores();

  expect(screen.getByText(fakeStores[0].name)).toBeInTheDocument();
  expect(screen.getAllByTestId("store-card")).toHaveLength(PAGE_OFFSET);
});

test("should render stores skeleton when loading data", async () => {
  (useStores as jest.Mock).mockImplementation(() => ({
    isLoading: true,
    data: null,
  }));

  await render(<Stores />);

  expect(screen.getByTestId("stores-loader")).toBeInTheDocument();
});

test("should render stores not found", async () => {
  await renderStores();

  await render(<Stores search="sample search query" />);

  expect(screen.getByTestId("stores-not-found")).toBeInTheDocument();
});

test("should render stores error", async () => {
  (useStores as jest.Mock).mockImplementation(() => ({
    isLoading: false,
    data: null,
  }));

  await render(<Stores />);

  expect(screen.getByTestId("stores-error")).toBeInTheDocument();
});

test("should hide load more button when no more stores", async () => {
  await renderStores();

  const loadMoreBtn = screen.getByTestId("stores-load-more");

  expect(loadMoreBtn).toBeInTheDocument();

  userEvent.click(screen.getByTestId("stores-load-more"));

  await waitFor(() => expect(loadMoreBtn).not.toBeInTheDocument());
});
