import { actionTypes } from '../../actions/types';

const initialState = {
  loading: false,
  loadingMore: false,
  data: {
    count: 0,
    results: [],
  },
  error: null
};

export default function planetList(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PLANETS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PLANETS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case actionTypes.GET_NEXT_PLANETS_START:
      return {
        ...state,
        loadingMore: true,
      };
    case actionTypes.GET_NEXT_PLANETS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          next: action.payload.next,
          previous: action.payload.previous,
          results: state.data.results.concat(action.payload.results),
        },
        loadingMore: false,
      };
    default:
      return state;
  }
}
