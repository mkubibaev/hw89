import React from 'react';
import {Badge, Button, ListGroupItem} from "reactstrap";

const TrackListItem = props => {
    return (
        <ListGroupItem className="d-flex justify-content-between align-items-center">
            <div>
                <span className="mr-2">{props.number}. {props.title}</span>
                <Badge pill>{props.duration}</Badge>
            </div>
            {props.user && props.user.role === 'admin'
                ? <div>
                    {props.isPublished
                        ? <Button size="sm" color="secondary" className="mr-2" onClick={props.onTogglePublish}>
                            Unpublish
                        </Button>
                        : <Button size="sm" color="success" className="mr-2" onClick={props.onTogglePublish}>
                            Publish
                        </Button>
                    }
                    <Button size="sm" color="danger" onClick={props.onDelete}>
                        Delete
                    </Button>
                </div>
                : null
            }
        </ListGroupItem>
    );
};

export default TrackListItem;
