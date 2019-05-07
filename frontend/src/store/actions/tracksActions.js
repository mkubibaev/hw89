import axios from '../../axios-api';

import {FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_TRACKS_SUCCESS} from "./actionTypes";

export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});

export const fetchTracks = albumId => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(`/tracks?album=${albumId}`);
            dispatch(fetchTracksSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};
