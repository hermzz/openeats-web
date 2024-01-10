import { createStore, applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import reducer from '../common/reducer'

let data = { user: JSON.parse(localStorage.getItem('user')) || { id: 0 } };
if (process.env.NODE_ENV === 'demo') {
  data = require('./demo/data.json');
}

const store = createStore(reducer, applyMiddleware(thunk))

export default store;


