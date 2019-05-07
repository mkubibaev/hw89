import React, {Component, Fragment} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {Container} from "reactstrap";

import {logoutUser} from "./store/actions/usersActions";
import Toolbar from "./components/UI/Toolbar/Toolbar";
import Artists from "./containers/Artists/Artists";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";
import Albums from "./containers/Albums/Albums";
import Tracks from "./containers/Tracks/Tracks";
import NewArtist from "./containers/NewArtist/NewArtist";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import NewTrack from "./containers/NewTrack/NewTrack";
import TrackHistory from "./containers/TrackHistory/TrackHistory";

class App extends Component {
    render() {
        return (
            <Fragment>
                <header>
                    <Toolbar
                        user={this.props.user}
                        logout={this.props.logoutUser}
                    />
                </header>
                <Container className="py-5">
                    <Switch>
                        <Route path="/" exact component={Artists}/>
                        <Route path="/artists/new" component={NewArtist}/>
                        <Route path="/artists/:id" component={Albums}/>
                        <Route path="/albums/new" component={NewAlbum}/>
                        <Route path="/albums/:id" component={Tracks}/>
                        <Route path="/tracks/new" component={NewTrack}/>
                        <Route path="/track-history" component={TrackHistory}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </Switch>
                </Container>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
