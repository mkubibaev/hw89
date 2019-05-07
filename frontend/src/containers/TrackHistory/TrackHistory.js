import React, {Component, Fragment} from 'react';
import {fetchTrackHistory} from "../../store/actions/trackHistoryActions";
import {connect} from "react-redux";

class TrackHistory extends Component {
    componentDidMount() {
        this.props.fetchTrackHistory()
    }

    render() {
        return (
            <Fragment>
                <h2 className="mb-2">Track history</h2>
                {this.props.trackHistory.map(item => {
                    const date = new Date(item.datetime).toLocaleString('ru-Ru');
                    return (
                        <div
                            key={item._id}
                            className="border p-2 mb-2"
                        >
                            <p>Artist: {item.track.album.artist.name}</p>
                            <p>Track: {item.track.title}</p>
                            <p>Album: {item.track.album.title}</p>
                            <p>DateTime: {date}</p>
                        </div>
                    )
                })}
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.trackHistory.error,
    trackHistory: state.trackHistory.trackHistory
});

const mapDispatchToPros = dispatch => ({
    fetchTrackHistory: () => dispatch(fetchTrackHistory())
});

export default connect(mapStateToProps, mapDispatchToPros)(TrackHistory);
