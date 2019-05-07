import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import FormElement from "../UI/Form/FormElement";


class AlbumForm extends Component {
    state = {
        artist: '',
        title: '',
        year: '',
        image: null
    };

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            if (key) {
                formData.append(key, this.state[key]);
            }

        });

        this.props.onSubmit(formData);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.files[0]
        });
    };

    render() {
        return (
            <Form onSubmit={this.submitFormHandler}>

                <FormElement
                    propertyName="title"
                    title="Album title:"
                    type="text" required
                    onChange={this.inputChangeHandler}
                    value={this.state.name}
                />

                <FormElement
                    propertyName="artist"
                    title="Artist:"
                    type="select" required
                    onChange={this.inputChangeHandler}
                    value={this.state.artist}
                >
                    <option value="">Please select an artist</option>
                    {this.props.artists.map(artist => (
                        <option key={artist._id} value={artist._id}>{artist.name}</option>
                    ))}
                </FormElement>

                <FormElement
                    propertyName="year"
                    title="Year:"
                    type="text"
                    onChange={this.inputChangeHandler}
                    value={this.state.year}
                />

                <FormElement
                    propertyName="image"
                    title="Image:"
                    type="file"
                    onChange={this.fileChangeHandler}
                />

                <FormGroup row>
                    <Col sm={{offset: 2, size: 10}}>
                        <Button type="submit" color="info">Save</Button>
                    </Col>
                </FormGroup>
            </Form>
        );
    }
}

export default AlbumForm;
