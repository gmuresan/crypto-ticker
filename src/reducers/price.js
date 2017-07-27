import { SET } from '../types/price';

const initialState = {
  price: 'Loading...',
  prices: [],
  average: 'Loading ...',
}

export default function reducer(state=initialState, action) {
  switch (action.type) {
    case SET:
      const oneMinuteAgo = Date.now() - (60 * 1000);
      const newPrices = state.prices.filter((price) => {
        return price.date > oneMinuteAgo;
      });
      newPrices.push(action.payload);
      const sum = newPrices.reduce((sum, price) => sum + price.price, 0);
      const average = sum / newPrices.length;
      const newState = { ...state, ...action.payload, prices: newPrices, average };
      return newState;
    default:
      return state
  }
}


