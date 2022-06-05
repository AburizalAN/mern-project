import { combineReducers } from 'redux';
import homeReducer from './homeReducer';
import globalReducer from './globalReducer';
import createReducerBlog from './createReducerBlog';
import detailBlogReducer from './detailBlogReducer';

const reducer = combineReducers({homeReducer, globalReducer, createReducerBlog, detailBlogReducer});

export default reducer;