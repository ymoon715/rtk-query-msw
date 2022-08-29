import React from 'react';
import './App.css';
import { useGetTickerPriceChangeQuery } from './store/binanceApi';
function App() {
  const { isFetching, isError } = useGetTickerPriceChangeQuery(undefined);
  return (
    <div className="App">
      {isFetching ? 'Loading' : isError ? 'Error' : 'Success'}
    </div>
  );
}

export default App;
