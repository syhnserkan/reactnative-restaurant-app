import { ADD_TO_CARD, DELETE_FROM_CARD, CLEAR_CARD } from "./type";

const initialState = {
  cards: [],
};

const Reducer = (state = initialState.cards, action) => {
  switch (action.type) {
    case ADD_TO_CARD:
      return [...state, action.payload];
    case DELETE_FROM_CARD:
      return state.filter((item) => item !== action.payload);
    case CLEAR_CARD:
      return (state = initialState.cards);
    default:
      return state;
  }
};

export default Reducer;
