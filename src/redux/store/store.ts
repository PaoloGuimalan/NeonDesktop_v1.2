import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setneoninterface, setsystemcmd, setuserauthentication } from '../actions/actions';

const combiner = combineReducers({
  userauthentication: setuserauthentication,
  systemcmd: setsystemcmd,
  neoninterface: setneoninterface
});

const store = configureStore({
  reducer: combiner
});

export default store;
