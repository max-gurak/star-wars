import { actionTypes } from 'app-actions/types';

const initialState = {
  loading: false,
  loadingMore: false,
  data: {
    count: 0,
    results: [],
  },
  error: {
    status: null,
    data: {},
  },
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
        loading: true,
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
        loading: false,
        loadingMore: false,
      };
    case actionTypes.GET_PLANETS_ERROR:
    case actionTypes.GET_NEXT_PLANETS_ERROR:
      return {
        ...state,
        error: {
          status: action.payload.status,
          data: action.payload.data,
        },
        loading: false,
      };
    default:
      return state;
  }
}
