import { ADD_TO_CARD, DELETE_FROM_CARD, CLEAR_CARD } from "./type";

const addToCard = (payload) => {
  return {
    type: ADD_TO_CARD,
    payload,
  };
};

const deleteFromCard = (payload) => {
  return {
    type: DELETE_FROM_CARD,
    payload,
  };
};

const clearCard = () => {
  return {
    type: CLEAR_CARD,
  };
};

export { addToCard, deleteFromCard, clearCard };
