import React from 'react';
import {apiURL} from "../../../constants";
import {NavLink as RouterNavLink} from "react-router-dom";
import {Button, Card, CardBody, CardFooter, CardImg, CardTitle, Col} from "reactstrap";

const Box = props => {
    return (
        <Col xs="12" sm="6" md="4">
            <Card className="mb-4">
                {props.image
                    ? <RouterNavLink to={props.routePath}>
                        <CardImg top width="100%" src={`${apiURL}/uploads/${props.image}`} alt={props.title}/>
                    </RouterNavLink>
                    : null
                }
                <CardBody>
                    <CardTitle tag={RouterNavLink} to={props.routePath}>
                        {props.title}
                    </CardTitle>
                </CardBody>
                {props.user && props.user.role === 'admin'
                    ? <CardFooter className="d-flex justify-content-between">
                        {props.isPublished
                            ? <Button size="sm" color="secondary" onClick={props.onTogglePublish}>Unpublish</Button>
                            : <Button size="sm" color="success" onClick={props.onTogglePublish}>Publish</Button>
                        }
                        <Button size="sm" color="danger" onClick={props.onDelete}>Delete</Button>
                    </CardFooter>
                    : null
                }
            </Card>
        </Col>
    );
};

export default Box;
