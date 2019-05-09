import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {deleteAlbum, fetchAlbums, togglePublish} from "../../store/actions/albumsActions";

import {Row} from "reactstrap";
import Box from "../../components/UI/Box/Box";



class Albums extends Component {

    componentDidMount() {
        this.props.fetchAlbums(this.props.match.params.id);
    }

    handleDelete = albumId => {
        this.props.deleteAlbum(albumId, this.props.match.params.id);
    };

    handleTogglePublish = albumId => {
        this.props.togglePublish(albumId, this.props.match.params.id);
    };

    render() {
        return (
            this.props.albums[0]
            ? <Fragment>
                <h1 className="mb-3">{this.props.albums[0].artist.name}'s albums</h1>
                <Row>
                    {this.props.albums.map(album => (
                        <Box
                            key={album._id}
                            title={album.title}
                            image={album.image}
                            year={album.year}
                            isPublished={album.isPublished}
                            routePath={`/albums/${album._id}`}
                            user={this.props.user}
                            onDelete={() => this.handleDelete(album._id)}
                            onTogglePublish={() => this.handleTogglePublish(album._id)}
                        />
                    ))}
                </Row>
            </Fragment>
            : null
        );
    }
}
const mapStateToProps = state => ({
    error: state.albums.error,
    loading: state.albums.loading,
    albums: state.albums.albums,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: artistId => dispatch(fetchAlbums(artistId)),
    deleteAlbum: (albumId, artistId) => dispatch(deleteAlbum(albumId, artistId)),
    togglePublish: (albumId, artistId) => dispatch(togglePublish(albumId, artistId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
