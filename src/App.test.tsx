import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from './reducers/dashboardReducer/dashboardReducer';

const mockStore = configureStore();
const store = mockStore({
  Dashboard: initialState
});

describe("App Component", () => {
  it("renders all child components", () => {
    render(<Provider store={store}> <App /></Provider>);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("movie-stats")).toBeInTheDocument();
    expect(screen.getByTestId("cards-section")).toBeInTheDocument();
  });

  it("renders spinner components while fetching", () => {
    const store = mockStore({
      Dashboard: {...initialState, loaders: { fetching: true }}
    });
    render(<Provider store={store}><App /></Provider>);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("movie-stats")).toBeInTheDocument();
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });
});

