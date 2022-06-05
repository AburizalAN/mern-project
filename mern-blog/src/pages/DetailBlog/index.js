import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailBlog } from '../../config/redux/action'; 


const postImage =  {
    width: `100%`,
    height: `300px`,
    objectFit: `cover`,
    objectPositon: `center`   
}

const DetailBlog = ({match}) => {
    //const [data, setData] = useState({});

    const { data } = useSelector(state => state.detailBlogReducer);
    const {title, body, image} = data;

    const dispatch = useDispatch();

    useEffect(() => {
        const id = match.params.id;
        dispatch(setDetailBlog(id));
    }, [])

    useEffect(() => {
        fetch(`http://localhost:4000/${image}`)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }, [image])

    return (
        <section>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <img src={`http://localhost:4000/${image}`} alt="image header" style={postImage} className="mb-5" />
                        <h2 className="mb-4"><b>{title}</b></h2>
                        <p>
                            {body}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(DetailBlog);