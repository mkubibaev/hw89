import {push} from "connected-react-router";
import axios from "../../axios-api";
import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST, ADD_DATA_SUCCESS,
    ADD_TRACKHISTORY_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_TRACKHISTORY_SUCCESS
} from "./actionTypes";

export const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
export const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

export const addDataRequest = () => ({type: ADD_DATA_REQUEST});
export const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
export const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

export const fetchTrackHistorySuccess = trackHistory => ({type: FETCH_TRACKHISTORY_SUCCESS, trackHistory});

export const fetchTrackHistory = () => {
    return async (dispatch, getState) => {
        const token = getState().users.user;
        const config = {headers: {'Authorization': token}};

        if (!token) {
            dispatch(push('/login'))
        } else {
            dispatch(fetchDataRequest());

            try {
                const response = await axios.get('/track_history', config);

                dispatch(fetchTrackHistorySuccess(response.data));
            } catch (e) {
                dispatch(fetchDataFailure(e));
            }
        }
    }
};

export const addTrackHistory = trackId => {
    return async (dispatch, getState) => {
        const token = getState().users.user;
        const config = {headers: {'Authorization': token}};

        if (!token) {
            dispatch(push('/login'));
        } else {
            dispatch(addDataRequest());

            try {
                await axios.post('/track_history', {track: trackId}, config);

                dispatch(addDataSuccess());
            } catch (e) {
                dispatch(addDataFailure(e))
            }
        }
    };
};
