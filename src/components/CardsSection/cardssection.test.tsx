// import { render, screen, fireEvent } from "@testing-library/react";
// import { Provider } from "react-redux";
// import configureStore from "redux-mock-store";
// import CardsSection from ".";
// import useFetch from "../../hooks/useFetch";
// import { vi } from 'vitest'
// import React from "react";

describe("Test file", () => {
  test("test", () => {
    
  })
})

// // Mock useFetch hook
// vi.mock("../../hooks/useFetch", () => ({
//   default: vi.fn(() => ({
//     fetchData: vi.fn(),
//   })),
// }));

// // Mock Redux store
// const mockStore = configureStore();
// const initialState = {
//   Dashboard: {
//     data: [
//       { title: "Movie 1", imageUrl: "image1.jpg" },
//       { title: "Movie 2", imageUrl: "image2.jpg" },
//     ],
//     loaders: { fetching: false },
//     currentPage: 1,
//     searchText: "",
//   },
// };

// describe("CardsSection Component", () => {
//   let store: any;

//   beforeEach(() => {
//     store = mockStore(initialState);
//   });

//   it("renders MovieGrid with correct props", () => {
//     render(
//       <Provider store={store}>
//         <CardsSection />
//       </Provider>
//     );

//     // Check if the cards section is rendered
//     expect(screen.getByTestId("cards-section")).toBeInTheDocument();

//     // Check if MovieGrid is rendered
//     expect(screen.getByText("Movie 1")).toBeInTheDocument();
//     expect(screen.getByText("Movie 2")).toBeInTheDocument();
//   });

//   it("filters movies based on searchText", () => {
//     store = mockStore({
//       Dashboard: {
//         ...initialState.Dashboard,
//         searchText: "Movie 1",
//       },
//     });

//     render(
//       <Provider store={store}>
//         <CardsSection />
//       </Provider>
//     );

//     expect(screen.getByText("Movie 1")).toBeInTheDocument();
//     expect(screen.queryByText("Movie 2")).toBeNull();
//   });

//   it("triggers fetchData when scrolled to bottom", async () => {
//     const fetchDataMock = vi.fn();
//     (useFetch as any).mockReturnValue({ fetchData: fetchDataMock });

//     render(
//       <Provider store={store}>
//         <CardsSection />
//       </Provider>
//     );

//     const scrollContainer = screen.getByTestId("cards-section");

//     // Simulate scroll to bottom
//     fireEvent.scroll(scrollContainer, {
//       target: { scrollTop: 100, scrollHeight: 200, clientHeight: 100 },
//     });

//     expect(fetchDataMock).toHaveBeenCalledWith({ pageNumber: 2 });
//   });

//   it("cleans up scroll event listener on unmount", () => {
//     const removeEventListenerMock = vi.fn();
//     const addEventListenerMock = vi.fn(() => removeEventListenerMock);

//     const mockRef = {
//       current: {
//         addEventListener: addEventListenerMock,
//         removeEventListener: removeEventListenerMock,
//       },
//     };

//     vi.spyOn(React, "useRef").mockReturnValue(mockRef);

//     const { unmount } = render(
//       <Provider store={store}>
//         <CardsSection />
//       </Provider>
//     );

//     unmount();
//     expect(removeEventListenerMock).toHaveBeenCalled();
//   });
// });
