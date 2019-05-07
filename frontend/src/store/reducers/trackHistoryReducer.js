import {
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST, FETCH_TRACKHISTORY_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
    trackHistory: [],
    error: null,
    loading: true
};

const trackHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false};

        case FETCH_TRACKHISTORY_SUCCESS:
            return {...state, trackHistory: action.trackHistory, loading: false};

        default:
            return state
    }
};

export default trackHistoryReducer;
