import {
    FETCH_ARTISTS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "../actions/actionTypes";

const initialState = {
    artists: [],
    error: null,
    loading: true
};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false};

        case FETCH_ARTISTS_SUCCESS:
            return {...state, artists: action.artists, loading: false};

        default:
            return state
    }
};

export default artistsReducer;
