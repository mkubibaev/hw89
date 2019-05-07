import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {fetchAlbums} from "../../store/actions/albumsActions";

import {Row} from "reactstrap";
import Box from "../../components/UI/Box/Box";


class Albums extends Component {

    componentDidMount() {
        this.props.fetchAlbums(this.props.match.params.id);
    }

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
                            routePath={`/albums/${album._id}`}
                            year={album.year}
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
    albums: state.albums.albums
});

const mapDispatchToProps = dispatch => ({
    fetchAlbums: artistId => dispatch(fetchAlbums(artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Albums);
