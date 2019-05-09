import axios from '../../axios-api';
import {push} from "connected-react-router";
import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST, ADD_DATA_SUCCESS,
    FETCH_ALBUMS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "./actionTypes";


export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const addDataRequest = () => ({type: ADD_DATA_REQUEST});
export const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
export const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});


export const fetchAlbums = artistId => {
    return async dispatch => {
        let url = '/albums';

        if (artistId) {
            url += `?artist=${artistId}`
        }

        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(url);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const addAlbum = albumData => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        dispatch(addDataRequest());

        try {
            await axios.post('/albums', albumData, config);
            dispatch(addDataSuccess());
            dispatch(push('/'));
        } catch (e) {
            dispatch(addDataFailure(e))
        }

    }
};

export const deleteAlbum = (albumId, artistId)  => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            await axios.delete(`/albums/${albumId}`, config);
            dispatch(fetchAlbums(artistId));
        } catch (e) {
            console.log(e);
        }
    }
};

export const togglePublish = (albumId, artistId) => {
    return async (dispatch, getState) => {
        const token = getState().users.user.token;
        const config = {headers: {'Authorization': token}};

        try {
            await axios.post(`/albums/${albumId}/toggle_publish`, config);
            dispatch(fetchAlbums(artistId));
        } catch (e) {
            console.log(e);
        }
    }
};

