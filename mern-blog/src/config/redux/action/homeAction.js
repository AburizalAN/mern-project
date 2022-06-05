import Axios from 'axios';

export const setDataBlog = (page) => {
    return (dispatch) => {
        Axios.get(`http://localhost:4000/v1/blog/posts?page=${page}&perPage=3`)
        .then(result => {
            console.log('data API', result.data);
            const {current_page, total_items, per_page} = result.data;
            dispatch({type: 'UPDATE_DATA_BLOG', payload: result.data.data});
            dispatch({
                type: 'UPDATE_PAGE', 
                payload: {
                    currentPage: current_page,
                    totalPage: Math.ceil(total_items / per_page)
                }})
        })
        .catch(err => {
            console.log('error : ', err);
        })
    }
}