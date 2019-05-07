import React, {Component, Fragment} from 'react';
import ArtistForm from "../../components/ArtistForm/ArtistForm";
import {connect} from "react-redux";
import {addArtist} from "../../store/actions/artistsActions";

class NewArtist extends Component {
    render() {
        return (
            <Fragment>
                <h3 className="mb-3">Add new artist</h3>
                <ArtistForm
                    error={this.props.error}
                    onSubmit={this.props.addArtist}
                />
            </Fragment>

        );
    }
}

const mapStateToProps = state => ({
    error: state.artists.error
});

const mapDispatchToProps = dispatch => ({
    addArtist: artistData => dispatch(addArtist(artistData))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewArtist);
