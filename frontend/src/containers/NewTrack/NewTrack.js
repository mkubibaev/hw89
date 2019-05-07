import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchAlbums} from "../../store/actions/albumsActions";
import TrackForm from "../../components/TrackForm/TrackForm";
import {addTrack} from "../../store/actions/tracksActions";

class NewTrack extends Component {
    componentDidMount() {
        this.props.fetchAlbums();
    }

    render() {
        return (
            <Fragment>
                <h3 className="mb-3">Add new track</h3>
                <TrackForm
                    error={this.props.error}
                    albums={this.props.albums}
                    onSubmit={this.props.addTrack}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.tracks.error,
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: () => dispatch(fetchAlbums()),
    addTrack: trackData => dispatch(addTrack(trackData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTrack);
