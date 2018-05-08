import { createStore } from 'redux';

import RootReducer from './reducers';
import Middleware from '../middleware';

export default createStore(RootReducer, Middleware);
