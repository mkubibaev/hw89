import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Artists from "./containers/Artists/Artists";
import NewArtist from "./containers/NewArtist/NewArtist";
import Albums from "./containers/Albums/Albums";
import NewAlbum from "./containers/NewAlbum/NewAlbum";
import Tracks from "./containers/Tracks/Tracks";
import NewTrack from "./containers/NewTrack/NewTrack";
import TrackHistory from "./containers/TrackHistory/TrackHistory";

const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props} /> : <Redirect to="/login" />
);


const Routes = ({user}) => {
    return (
        <Switch>
            <Route path="/" exact component={Artists}/>

            <ProtectedRoute
                isAllowed={user}
                path="/artists/new"
                exact
                component={NewArtist}
            />
            <ProtectedRoute
                isAllowed={user}
                path="/albums/new"
                exact
                component={NewAlbum}
            />
            <ProtectedRoute
                isAllowed={user}
                path="/tracks/new"
                exact
                component={NewTrack}
            />
            <ProtectedRoute
                isAllowed={user && (user.role === 'user' || user.role === 'admin')}
                path="/track-history"
                exact
                component={TrackHistory}
            />

            <Route path="/artists/:id" component={Albums}/>
            <Route path="/albums/:id" component={Tracks}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    );
};

export default Routes;
