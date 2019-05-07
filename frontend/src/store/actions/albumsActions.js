import axios from '../../axios-api';
import {FETCH_ALBUM_SUCCESS, FETCH_ALBUMS_SUCCESS, FETCH_DATA_FAILURE, FETCH_DATA_REQUEST} from "./actionTypes";


export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const fetchAlbumsSuccess = albums => ({type: FETCH_ALBUMS_SUCCESS, albums});
export const fetchAlbumSuccess = album => ({type: FETCH_ALBUM_SUCCESS, album});


export const fetchAlbums = artistId => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(`/albums?artist=${artistId}`);
            dispatch(fetchAlbumsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const fetchAlbum = albumId => {
    return async dispatch => {
        dispatch (fetchDataRequest());

        try {
            const response = await axios.get(`/albums/${albumId}`);
            dispatch(fetchAlbumSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};
