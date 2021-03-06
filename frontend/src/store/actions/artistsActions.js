import axios from '../../axios-api';
import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST, ADD_DATA_SUCCESS,
    FETCH_ARTISTS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "./actionTypes";
import {push} from "connected-react-router";


export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const addDataRequest = () => ({type: ADD_DATA_REQUEST});
export const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
export const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

export const fetchArtistsSuccess = artists => ({type: FETCH_ARTISTS_SUCCESS, artists});

export const fetchArtists = () => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get('/artists');
            dispatch(fetchArtistsSuccess(response.data))
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const addArtist = artistData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(addDataRequest());

        try {
            await axios.post('/artists', artistData, config);
            dispatch(addDataSuccess());
            dispatch(push('/'));
        } catch (e) {
            dispatch(addDataFailure(e))
        }
    }
};

export const deleteArtist = id => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            await axios.delete(`/artists/${id}`, config);
            dispatch(fetchArtists());
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
            await axios.post(`/artists/${id}/toggle_publish`, config);
            dispatch(fetchArtists());
        } catch (e) {
            console.log(e);
        }
    }
};
