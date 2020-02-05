import { MERCURE_TEST } from '../actions/types';
  
  const initialState = {
    products: [],
    loading: false,
    selected: {}
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case MERCURE_TEST:
        return state;
      default:
        return state;
    }
  }