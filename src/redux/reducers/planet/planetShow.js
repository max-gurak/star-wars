import { actionTypes } from 'app-actions/types';

const initialState = {
  loading: false,
  data: {},
  error: {
    status: null,
    data: {},
  },
};

export default function planetShow(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_PLANET_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_PLANET_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case actionTypes.GET_PLANET_ERROR:
      return {
        ...state,
        error: {
          status: action.payload.status,
          data: action.payload.data,
        },
        loading: false,
      };
    case actionTypes.CLEAR_PLANET_DATA:
      return initialState;
    default:
      return state;
  }
}
