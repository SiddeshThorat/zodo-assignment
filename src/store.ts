import { createStore, combineReducers } from 'redux';
import dashboardReducer from './reducers/dashboardReducer/dashboardReducer';

const rootReducer = combineReducers({
  Dashboard: dashboardReducer
});

const store = createStore(rootReducer);

export default store;