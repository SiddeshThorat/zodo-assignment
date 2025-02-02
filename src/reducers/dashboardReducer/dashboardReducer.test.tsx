import dashboardReducer, { initialState } from './dashboardReducer';
import { SET_LOADERS, SET_DATA, SET_SEARCH_TEXT } from './action';

describe('dashboardReducer', () => {
  // Test for the initial state
  it('should return the initial state', () => {
    const result = dashboardReducer(undefined, { type: '@@INIT' });
    expect(result).toEqual(initialState);
  });

  // Test for the SET_LOADERS action
  it('should handle SET_LOADERS action', () => {
    const action = {
      type: SET_LOADERS,
      payload: { loadername: 'fetching', status: true }
    };

    const result = dashboardReducer(initialState, action);

    expect(result.loaders.fetching).toBe(true);
  });

  // Test for the SET_SEARCH_TEXT action
  it('should handle SET_SEARCH_TEXT action', () => {
    const action = {
      type: SET_SEARCH_TEXT,
      payload: { searchText: 'example' }
    };

    const result = dashboardReducer(initialState, action);

    expect(result.searchText).toBe('example');
  });

  // Test for the SET_DATA action (append data)
  it('should handle SET_DATA action and append new data', () => {
    const action = {
      type: SET_DATA,
      payload: {
        data: [{ title: "Image URl", imageUrl: 'Movie URl' }],
        currentPage: 2,
        totalPages: 3
      }
    };

    const result = dashboardReducer(initialState, action);

    expect(result.data).toEqual([{ title: "Image URl", imageUrl: 'Movie URl' }]);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(3);
    expect(result.loaders.fetching).toBe(false);
  });

  // Test for the SET_DATA action (append multiple data)
  it('should append new data to the existing data array when SET_DATA is dispatched', () => {
    const initialStateWithData = {
      ...initialState,
      data: [{ title: "Image URL", imageUrl: 'Movie URL' }]
    };

    const action = {
      type: SET_DATA,
      payload: {
        data: [{ title: "Image URL 2", imageUrl: 'Movie URL 2' }],
        currentPage: 2,
        totalPages: 3
      }
    };

    const result = dashboardReducer(initialStateWithData, action);

    expect(result.data).toEqual([
      { title: "Image URL", imageUrl: 'Movie URL' },
      { title: "Image URL 2", imageUrl: 'Movie URL 2' }
    ]);
  });

  // Test for the SET_LOADERS action (update a loader other than 'fetching')
  it('should handle SET_LOADERS for a different loader', () => {
    const action = {
      type: SET_LOADERS,
      payload: { loadername: 'fetching', status: true }
    };

    const result = dashboardReducer(initialState, action);

    expect(result.loaders.fetching).toBe(true);
  });

  // Test for default case (no action type match)
  it('should return the state unchanged for unknown action types', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const result = dashboardReducer(initialState, unknownAction);
    expect(result).toEqual(initialState);
  });
});
