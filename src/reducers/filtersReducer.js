export const filtersReducer = (state, action) => {
    switch (action.type) {
      case 'SET_MIN_PRICE':
        return {
          ...state,
          minPrice: action.payload,
        };
      case 'SET_CATEGORY':
        return {
          ...state,
          category: action.payload,
        };
      default:
        return state;
    }
  };