import { renderHook, act } from "@testing-library/react";
import useFetch from "./useFetch";
import { setLoaders } from "../reducers/dashboardReducer/action";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore();

describe("useFetch Hook", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      Dashboard: {
        data: [],
        loaders: { fetching: false },
        totalPages: 0,
        currentPage: 1,
        searchText: ""
      }
    });

    store.dispatch = jest.fn();
  });

  it("should dispatch setLoaders(false) if fetch fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error"))) as jest.Mock;

    const { result } = renderHook(() => useFetch(), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>
    });

    await act(async () => {
      await result.current.fetchData({ pageNumber: 1 });
    });

    expect(store.dispatch).toHaveBeenCalledWith(setLoaders({ loadername: "fetching", status: false }));
  });
});
