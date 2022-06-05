import Axios from "axios"

export const setDetailBlog = (id) => {
    return (dispatch) => {
        Axios.get(`http://localhost:4000/v1/blog/post/${id}`)
        .then(res => {
            console.log('res : ', res.data.data)
            dispatch({type : 'SET_DETAIL_BLOG', payload : res.data.data})
        })
        .catch(err => console.log('err : ', err))
    }
}

