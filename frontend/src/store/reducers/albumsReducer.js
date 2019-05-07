import {
    FETCH_ALBUM_SUCCESS,
    FETCH_ALBUMS_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST
} from "../actions/actionTypes";

const initialState = {
    albums: [],
    album: {},
    error: null,
    loading: true
};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false};

        case FETCH_ALBUMS_SUCCESS:
            return {...state, albums: action.albums, loading: false};

        case FETCH_ALBUM_SUCCESS:
            return {...state, album: action.album};

        default:
            return state
    }
};

export default albumReducer;
