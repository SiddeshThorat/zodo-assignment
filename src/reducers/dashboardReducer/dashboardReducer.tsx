import { SET_LOADERS, SET_DATA, SET_SEARCH_TEXT } from "./action";
import { IDashboardState } from "./type";

const initialState: IDashboardState = {
  loaders: {
    fetching: false
  },
  data: [],
  totalPages: 0,
  currentPage: 1,
  searchText: ""
};

const dashboardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADERS: {
      return {
        ...state,
        loaders: {
          ...state.loaders,
          [action.payload.loadername]: action.payload.status
        }
      }
    }
    case SET_SEARCH_TEXT: {
      return {
        ...state,
        searchText: action.payload.searchText
      }
    }
    case SET_DATA: {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        loaders: {
          ...state.loaders,
          fetching: false
        }
      }
    }
    default:
      return state;
  }
};

export default dashboardReducer;