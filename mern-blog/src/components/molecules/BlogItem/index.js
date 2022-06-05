import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

import './blogItem.scss';

const BlogItem = ({data, onDelete, ...props}) => {
    const history = useHistory();

    const {image, title, body, _id} = data;

    useEffect(() => {
        fetch(`http://localhost:8080/http://localhost:4000/${image}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [])

    return (
        <div {...props}>
            <div className="card">
                <img src={`http://localhost:4000/${image}`} className="card-img-top" />
                <div className="card-body d-flex flex-column">
                    <div className="card-title d-flex align-items-center">
                        <div><b>{title}</b></div>
                        <div className="text-end edit-wrapper" style={{flex : 1, minWidth: 120}}>
                            <a className="edit me-2" onClick={() => history.push(`/create-blog/${_id}`)}>edit</a> | <a className="delete ms-2" onClick={() => onDelete(_id)}>delete</a>
                        </div>
                    </div>
                    <div className="card-text mb-4">{body.slice(0, 50)}</div>
                    <a className="text-primary" style={{cursor: 'pointer'}} onClick={() => history.push(`/detail-blog/${_id}`)}>Baca lebih lengkap >></a>
                </div>
            </div>
        </div>
    )
}

export default BlogItem;