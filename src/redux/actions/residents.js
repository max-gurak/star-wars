import Api from 'api/Api';
import { actionTypes } from './types';
import { find } from 'lodash';

const getResidentStarted = () => ({
  type: actionTypes.GET_RESIDENT_START
});

const getResidentSuccess = residents => ({
  type: actionTypes.GET_RESIDENT_SUCCESS,
  payload: residents,
});

const getResidentError = error => ({
  type: actionTypes.GET_RESIDENT_ERROR,
  payload: error,
});

const getResidentsStarted = () => ({
  type: actionTypes.GET_RESIDENTS_START
});

const getResidentsSuccess = residents => ({
  type: actionTypes.GET_RESIDENTS_SUCCESS,
  payload: residents,
});

const getResidentsError = error => ({
  type: actionTypes.GET_RESIDENTS_ERROR,
  payload: error,
});

const getResidentId = url => {
  const re = new RegExp('people\\/([0-9]+)\\/$', 'gi');

  return re.exec(url)[1] || 0;
};

const getResidentsIds = data => {
  const result = [];

  if (data.length) {
    data.forEach(url => result.push(getResidentId(url)));
  }

  return result;
};

export const getResident = id => async (dispatch, getState) => {
  dispatch(getResidentStarted());

  const { resident } = getState();
  const { data } = resident;

  if (data.length) {
    const match = find(data, item => item.url.indexOf(`people/${id}/`) > -1);

    if (match) {
      dispatch(getResidentSuccess(match));

      return;
    }
  }

  Api.get(`people/${id}`)
    .call()
    .then(res => {
      dispatch(getResidentSuccess(res.data));
    })
    .catch(err => {
      dispatch(getResidentError(err.message));
    });
};

export const getResidents = data => async dispatch => {
  dispatch(getResidentsStarted());

  const residentsIds = getResidentsIds(data);

  try {
    const residents = await residentsIds.map(async id => {
      const response = await Api.get(`people/${id}`).call();

      return response.data;
    });

    const result = await Promise.all(residents);

    dispatch(getResidentsSuccess(result));
  } catch (e) {
    dispatch(getResidentsError(e.response));
  }
};
