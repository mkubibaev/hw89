import {
    FETCH_ARTIST_SUCCESS,
    FETCH_ARTISTS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "../actions/actionTypes";

const initialState = {
    artists: [],
    artist: {},
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

        case FETCH_ARTIST_SUCCESS:
            return {...state, artist: action.artist};

        default:
            return state
    }
};

export default artistsReducer;
