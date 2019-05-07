import axios from '../../axios-api';
import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST, ADD_DATA_SUCCESS,
    FETCH_ALBUMS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "./actionTypes";
import {push} from "connected-react-router";


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
        const token = getState().users.user;
        const config = {headers: {'Authorization': token}};

        if (!token) {
            dispatch(push('/login'));
        } else {
            dispatch(addDataRequest());

            try {
                await axios.post('/albums', albumData, config);
                dispatch(addDataSuccess());
                dispatch(push('/'));
            } catch (e) {
                dispatch(addDataFailure(e))
            }
        }
    }
};

