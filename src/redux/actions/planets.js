import { find } from 'lodash';

import { Api } from 'base';
import { getResidents } from './residents';
import { actionTypes } from './types';

const getPlanetStarted = () => ({
  type: actionTypes.GET_PLANET_START
});

const getPlanetSuccess = recipes => ({
  type: actionTypes.GET_PLANET_SUCCESS,
  payload: recipes
});

const getPlanetError = error => ({
  type: actionTypes.GET_PLANET_ERROR,
  payload: error
});

export const clearPlanetData = () => ({
  type: actionTypes.CLEAR_PLANET_DATA
});

const getPlanetsStarted = () => ({
  type: actionTypes.GET_PLANETS_START
});

const getPlanetsSuccess = recipes => ({
  type: actionTypes.GET_PLANETS_SUCCESS,
  payload: recipes
});

const getPlanetsError = error => ({
  type: actionTypes.GET_PLANETS_ERROR,
  payload: error
});

const getNextPlanetsStarted = () => ({
  type: actionTypes.GET_NEXT_PLANETS_START
});

const getNextPlanetsSuccess = recipes => ({
  type: actionTypes.GET_NEXT_PLANETS_SUCCESS,
  payload: recipes
});

const getNextPlanetsError = error => ({
  type: actionTypes.GET_NEXT_PLANETS_ERROR,
  payload: error
});

export const getPlanet = id => (dispatch, getState) => {
  dispatch(getPlanetStarted());

  const { planet } = getState();
  const { results } = planet.list.data;

  if (results.length) {
    const match = find(
      results,
      item => item.url.indexOf(`planets/${id}/`) > -1
    );

    if (match) {
      dispatch(getPlanetSuccess(match));
      dispatch(getResidents(match.residents));

      return;
    }
  }

  Api.get(`planets/${id}`)
    .call()
    .then(res => {
      dispatch(getPlanetSuccess(res.data));
      dispatch(getResidents(res.data.residents));
    })
    .catch(err => {
      dispatch(getPlanetError(err.response));
    });
};

export const getPlanets = (page = 1) => dispatch => {
  dispatch(getPlanetsStarted());

  Api.get('planets', { page })
    .call()
    .then(res => {
      dispatch(getPlanetsSuccess(res.data));
    })
    .catch(err => {
      dispatch(getPlanetsError(err.response));
    });
};

export const loadMorePlanets = (page = 1) => dispatch => {
  dispatch(getNextPlanetsStarted());

  Api.get('planets')
    .withParams({ page })
    .call()
    .then(res => {
      dispatch(getNextPlanetsSuccess(res.data));
    })
    .catch(err => {
      dispatch(getNextPlanetsError(err.response));
    });
};
