import React, {Component, Fragment} from 'react';
import AlbumForm from "../../components/AlbumForm/AlbumForm";
import {fetchArtists} from "../../store/actions/artistsActions";
import {connect} from "react-redux";
import {addAlbum} from "../../store/actions/albumsActions";

class NewAlbum extends Component {
    componentDidMount() {
        this.props.fetchArtists();
    }

    render() {
        return (
            <Fragment>
                <h3 className="mb-3">Add new album</h3>
                <AlbumForm
                    artists={this.props.artists}
                    error={this.props.error}
                    onSubmit={this.props.addAlbum}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.albums.error,
    artists: state.artists.artists
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists()),
    addAlbum: albumData => dispatch(addAlbum(albumData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAlbum);
