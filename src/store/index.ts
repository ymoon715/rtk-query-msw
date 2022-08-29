import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { binanceApi } from './binanceApi';
/*
  if expired, tell user it expired and direct them to login page
  if not expired and still receive 403 error
    - show forbidden request.
    - Technically they should still not see forbidden request unless they come through a link that's not allowed for them to see.
*/

const reducers = combineReducers({
  [binanceApi.reducerPath]: binanceApi.reducer,
});
const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(binanceApi.middleware),
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
