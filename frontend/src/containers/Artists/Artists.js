import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Row} from "reactstrap";

import {fetchArtists} from "../../store/actions/artistsActions";
import Box from "../../components/UI/Box/Box";

class Artists extends Component {

    componentDidMount() {
        this.props.fetchArtists();
    }

    render() {
        return (
            <Fragment>
                <h1 className="mb-3">Artists</h1>
                <Row>
                    {this.props.artists.map(artist => (
                        <Box
                            key={artist._id}
                            title={artist.name}
                            image={artist.image}
                            routePath={`/artists/${artist._id}`}
                        />
                    ))}
                </Row>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.artists.error,
    loading: state.artists.loading,
    artists: state.artists.artists
});

const mapDispatchToProps = dispatch => ({
    fetchArtists: () => dispatch(fetchArtists())
});

export default connect(mapStateToProps, mapDispatchToProps)(Artists);
