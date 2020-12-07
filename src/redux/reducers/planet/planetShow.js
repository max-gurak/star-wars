import { actionTypes } from '../../actions/types';

const initialState = {
  loading: false,
  data: {},
  error: null
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
    default:
      return state;
  }
}
