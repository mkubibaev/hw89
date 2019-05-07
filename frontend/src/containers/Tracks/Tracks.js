import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";

import {fetchTracks} from "../../store/actions/tracksActions";
import {Badge, ListGroup, ListGroupItem} from "reactstrap";
import {addTrackHistory} from "../../store/actions/trackHistoryActions";

class Tracks extends Component {
    componentDidMount() {
        this.props.fetchTracks(this.props.match.params.id);
    }

    render() {
        return (
            this.props.tracks[0]
            ? <Fragment>
                <h1 className="mb-3">{this.props.tracks[0].album.artist.name} - {this.props.tracks[0].album.title}</h1>
                <ListGroup>
                    {this.props.tracks.map(track => (
                        <ListGroupItem
                            key={track._id}
                            className="justify-content-between"
                            onClick={() => this.props.addTrackHistory(track._id)}
                        >
                            <span>{track.number}. {track.title}</span>
                            <Badge>{track.duration}</Badge>
                        </ListGroupItem>
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
});

const mapDispatchToProps = dispatch => ({
    fetchTracks: albumId => dispatch(fetchTracks(albumId)),
    addTrackHistory: trackId => dispatch(addTrackHistory(trackId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Tracks);
