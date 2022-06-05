import {Button, BlogItem} from '../../components';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataBlog } from '../../config/redux/action';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from 'axios';

const Home = () => {

    const [counter, setCounter] = useState(1);
    
    //const [dataBlogs, setDataBlog] = useState([]);
    const { dataBlog, page } = useSelector(state => state.homeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setDataBlog(counter));
    }, [dispatch, counter]);

    const history = useHistory();

    const previous = () => {
        setCounter(counter <= 1 ? 1 : counter - 1);
        console.log(counter);
    }

    const next = () => {
        setCounter(counter >= page.totalPage ? page.totalPage : counter + 1);
        console.log(counter);
    }

    const confirmDelete = (id) => {
        confirmAlert({
        title: 'Confirm to Delete',
            message: 'Are you sure want to delete this?',
            buttons: [
            {
                label: 'Yes',
                onClick: () => {
                    axios.delete(`http://localhost:4000/v1/blog/post/${id}`)
                    .then(res => {
                        console.log('success Delete : ', res);
                        dispatch(setDataBlog(counter));
                    })
                    .catch(err => console.log('err : ', err))
                }
            },
            {
                label: 'No',
                onClick: () => console.log('User Tidak Setuju')
            }
            ]
        });
    }

    return (
        <section className="w-100">
            <div className="container">
                <div className="text-end mb-4">
                    <Button title="Create Blog Post" className="btn btn-primary" onClick={() => history.push('/create-blog')}/>
                </div>
                <div className="row">
                    {dataBlog.map( data => (
                        <BlogItem key={data._id} data={data} onDelete={confirmDelete} className="col-lg-4 mb-4 d-flex"/>
                    ))}
                </div>
                <ul className="pagination mt-4">
                    <li className="page-item me-2"><a className="page-link" onClick={previous} style={{cursor: 'pointer'}}>previous</a></li>
                    <li className="page-item me-2"><a className="page-link" onClick={next} style={{cursor: 'pointer'}}>next</a></li>
                    <span>page <span>{page.currentPage}</span> / <span>{page.totalPage}</span></span>
                </ul>
            </div>
        </section>
    )
}

export default Home;