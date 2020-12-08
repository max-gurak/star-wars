import { actionTypes } from '../actions/types';

const initialState = {
  loading: false,
  data: [],
  error: {
    status: null,
    data: {},
  },
};

export default function resident(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_RESIDENTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_RESIDENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case actionTypes.GET_RESIDENTS_ERROR:
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
