import { Input, Button, Upload } from '../../components';
import { updateToAPI, postToAPI, setForm, setImgPreview } from '../../config/redux/action';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const CreateBlog = (props) => {
    useEffect(() => {
        console.log('params : ', props.match.params.id);
        const id = props.match.params.id;
        if (id) {
            setIsUpdate(true);
            axios.get(`http://localhost:4000/v1/blog/post/${id}`)
            .then(res => {
                const data = res.data.data;
                console.log('Res :', data);
                dispatch(setForm('title', data.title));
                dispatch(setForm('body', data.body));
                dispatch(setImgPreview(`http://localhost:4000/${data.image}`));
            })
            .catch(err => console.log('Err : ', err))
        }
    }, [props]);

    const [isUpdate, setIsUpdate] = useState(false);
    const {form, imgPreview} = useSelector(state => state.createReducerBlog);
    const {title, body, image} = form;
    const dispatch = useDispatch();

    const onSubmit = () => {

        if (isUpdate) {
            const id = props.match.params.id;
            updateToAPI(form, id);
        } else {
            postToAPI(form);
        }
    }

    const onImageUpload = (e) => {
        const file = e.target.files[0];
        dispatch(setForm('image', file));
        dispatch(setImgPreview(URL.createObjectURL(file)));
    }

    

    return (
        <section className="w-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <h3 className="mb-4"><b>{isUpdate ? `Update` : 'Create New'} Blog Post</b></h3>
                        <Input label="Post Title" className="form-control" type="text" value={title} onChange={e => dispatch(setForm('title', e.target.value))}/>
                        <Upload  className="form-control" onChange={e => onImageUpload(e)} img={imgPreview}/>
                        <div className="mb-3">
                            <label className="form-label">Content</label>
                            <textarea className="form-control" rows="10" value={body} onChange={e => dispatch(setForm('body', e.target.value))}></textarea>
                        </div>
                        <div className="text-end">
                            <Button title={isUpdate ? `Update`: `Save`} className="btn btn-primary mt-4" style={{width: 150}} onClick={onSubmit}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(CreateBlog);