import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {fetchTracks} from "../../store/actions/tracksActions";

class Tracks extends Component {
    componentDidMount() {
        this.props.fetchTracks(this.props.match.params.id);
    }

    render() {
        return (
            this.props.tracks[0]
            ? <Fragment>
                <h1 className="mb-3">{this.props.tracks[0].album.artist.name} - {this.props.tracks[0].album.title}</h1>

                <ul className="list-group">
                    {this.props.tracks.map(track => (
                        <li
                            key={track._id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onClick={() => this.props.addTrackHistory(track._id)}
                        >
                            {track.number}. {track.title}
                            <span className="badge badge-primary badge-pill">{track.duration}</span>
                        </li>
                    ))}
                </ul>
            </Fragment>
            : null
        );
    }
}

const mapStateToProps = state => ({
    error: state.tracks.error,
    loading: state.tracks.loading,
    tracks: state.tracks.tracks,
});

const mapDispatchToProps = dispatch => ({
    fetchTracks: albumId => dispatch(fetchTracks(albumId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
