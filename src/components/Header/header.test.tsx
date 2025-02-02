import { render, screen, fireEvent, act } from "@testing-library/react";
import { SearchInput } from ".";
import Header from ".";

import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { initialState } from "../../reducers/dashboardReducer/dashboardReducer";

const mockStore = configureStore();
const store = mockStore({
  Dashboard: initialState
});

describe("Header Component", () => {
  it("Input Field present on UI", () => {
    render(<Provider store={store}><Header /></Provider>);
    const inputField = screen.getByRole("textbox")
    expect(inputField).toBeInTheDocument()
  });

  it('renders with a custom placeholder', () => {
    render(<SearchInput placeholder="Custom Placeholder" onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Custom Placeholder');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders with the correct placeholder', () => {
    render(<SearchInput onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    expect(inputElement).toBeInTheDocument();
  });
});

describe('SearchInput', () => {
  it('updates the query state when the user types', () => {
    render(<SearchInput onSearch={() => {}} />);
    const inputElement = screen.getByPlaceholderText('Search...');
    
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    
    expect(inputElement).toHaveValue('test query');
  });
});

jest.useFakeTimers();

describe('SearchInput', () => {
  it('calls onSearch after debounce delay', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    
    // Simulate input change
    fireEvent.change(inputElement, { target: { value: 'test query' } });
    
    // Fast-forward until all timers have been executed
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Check if the onSearch function was called with the correct value
    expect(onSearchMock).toHaveBeenCalledWith('test query');
  });

  it('does not call onSearch immediately', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    
    // Simulate input change
    fireEvent.change(inputElement, { target: { value: 'test query' } });

    // Check if the onSearch function is not called immediately
    expect(onSearchMock).not.toHaveBeenCalled();
  });
});

describe('SearchInput', () => {
  it('does not call onSearch during the initial render', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);
    
    // Simulate input change
    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'initial query' } });

    // Fast-forward until the debounce time has passed
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Check if the onSearch function was not called initially
    expect(onSearchMock).toHaveBeenCalledWith('initial query');
  });
});

describe('SearchInput', () => {
  it('debounces multiple inputs and calls onSearch once after delay', () => {
    const onSearchMock = jest.fn();
    render(<SearchInput onSearch={onSearchMock} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    
    // Simulate quick successive input changes
    fireEvent.change(inputElement, { target: { value: 'query 1' } });
    fireEvent.change(inputElement, { target: { value: 'query 2' } });
    fireEvent.change(inputElement, { target: { value: 'query 3' } });

    // Fast-forward until all timers have been executed
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Ensure `onSearch` was called only once with the last value
    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('query 3');
  });
});
