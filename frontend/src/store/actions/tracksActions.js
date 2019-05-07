import axios from '../../axios-api';

import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST, ADD_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_TRACKS_SUCCESS
} from "./actionTypes";
import {push} from "connected-react-router";


export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const fetchTracksSuccess = tracks => ({type: FETCH_TRACKS_SUCCESS, tracks});

export const addDataRequest = () => ({type: ADD_DATA_REQUEST});
export const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
export const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

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

export const addTrack = trackData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(addDataRequest());

        try {
            await axios.post('/tracks', trackData, config);
            dispatch(addDataSuccess());
            dispatch(push('/'));
        } catch (e) {
            dispatch(addDataFailure(e))
        }
    }
};

export const deleteTrack = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            axios.delete(`/tracks/${id}`, config);
        } catch (e) {
            console.log(e);
        }
    }
};

export const togglePublish = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            axios.post(`/tracks/${id}/toggle_publish`, config);
        } catch (e) {
            console.log(e);
        }
    }
};
