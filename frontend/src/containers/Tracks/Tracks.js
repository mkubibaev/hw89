import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {ListGroup} from "reactstrap";

import {deleteTrack, fetchTracks, togglePublish} from "../../store/actions/tracksActions";
import {addTrackHistory} from "../../store/actions/trackHistoryActions";
import TrackListItem from "../../components/TrackListItem/TrackListItem";

class Tracks extends Component {

    componentDidMount() {
        this.props.fetchTracks(this.props.match.params.id);
    }

    handleDelete = trackId => {
        this.props.deleteTrack(trackId, this.props.match.params.id);
    };

    handleTogglePublish = trackId => {
        this.props.togglePublish(trackId, this.props.match.params.id);
    };

    render() {
        return (
            this.props.tracks[0]
            ? <Fragment>
                <h1 className="mb-3">{this.props.tracks[0].album.artist.name} - {this.props.tracks[0].album.title}</h1>
                <ListGroup>
                    {this.props.tracks.map(track => (
                        <TrackListItem
                            key={track._id}
                            number={track.number}
                            title={track.title}
                            duration={track.duration}
                            isPublished={track.isPublished}
                            user={this.props.user}
                            onClick={() => this.props.addTrackHistory(track._id)}
                            onDelete={() => this.handleDelete(track._id)}
                            onTogglePublish={() => this.handleTogglePublish(track._id)}
                        />
                    ))}
                </ListGroup>
            </Fragment>
            : null
        );
    }
}

const mapStateToProps = state => ({
    error: state.tracks.error,
    loading: state.tracks.loading,
    tracks: state.tracks.tracks,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchTracks: albumId => dispatch(fetchTracks(albumId)),
    addTrackHistory: trackId => dispatch(addTrackHistory(trackId)),
    deleteTrack: (trackId, albumId) => dispatch(deleteTrack(trackId, albumId)),
    togglePublish: (trackId, albumId) => dispatch(togglePublish(trackId, albumId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
