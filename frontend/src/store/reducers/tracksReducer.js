import {
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_TRACKS_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    tracks: [],
    error: null,
    loading: true
};

const tracksReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false};

        case FETCH_TRACKS_SUCCESS:
            return {...state, tracks: action.tracks, loading: false};

        default:
            return state
    }
};

export default tracksReducer;
