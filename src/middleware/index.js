import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

// Application Middleware
// Import any custom middlware here, and include it before
// the apiMiddlware in applyMiddlware().
import appendAPIHeaders from './appendAPIHeaders';
// import Logger from './Logger';

export default applyMiddleware(
  // Logger,
  appendAPIHeaders,
  apiMiddleware,
  thunk
);
