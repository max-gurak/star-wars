import { actionTypes } from 'app-actions/types';

const initialState = {
  loading: false,
  data: [],
  showResident: {},
  error: {
    status: null,
    data: {},
  },
};

export default function resident(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_RESIDENT_START:
    case actionTypes.GET_RESIDENTS_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_RESIDENT_SUCCESS:
      return {
        ...state,
        showResident: action.payload,
        loading: false,
      };
    case actionTypes.GET_RESIDENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case actionTypes.GET_RESIDENT_ERROR:
    case actionTypes.GET_RESIDENTS_ERROR:
      return {
        ...state,
        error: {
          status: action.payload.status,
          data: action.payload.data,
        },
        loading: false,
      };
    case actionTypes.CLEAR_RESIDENT_DATA:
      return {
        ...state,
        showResident: initialState.showResident,
      };
    case actionTypes.CLEAR_RESIDENTS_DATA:
      return initialState;
    default:
      return state;
  }
}
