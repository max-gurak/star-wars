import Api from 'api/Api';
import { actionTypes } from './types';

const getPlanetStarted = () => ({
  type: actionTypes.GET_PLANET_START
});

const getPlanetSuccess = recipes => ({
  type: actionTypes.GET_PLANET_SUCCESS,
  payload: recipes,
});

const getPlanetsStarted = () => ({
  type: actionTypes.GET_PLANETS_START
});

const getPlanetsSuccess = recipes => ({
  type: actionTypes.GET_PLANETS_SUCCESS,
  payload: recipes,
});

const getNextPlanetsStarted = () => ({
  type: actionTypes.GET_NEXT_PLANETS_START
});

const getNextPlanetsSuccess = recipes => ({
  type: actionTypes.GET_NEXT_PLANETS_SUCCESS,
  payload: recipes,
});

export const getPlanet = id => dispatch => {
  dispatch(getPlanetStarted());

  Api.get(`planets/${id}`)
    .call()
    .then(res => {
      dispatch(getPlanetSuccess(res.data));
    })
    .catch(err => {
      // dispatch(getPlanetStarted(err.message));
      console.log(err);
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
      console.log(err);
      // dispatch(getPlanetsStarted(err.message));
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
      console.log(err);
      // dispatch(getPlanetsStarted(err.message));
    });
};

