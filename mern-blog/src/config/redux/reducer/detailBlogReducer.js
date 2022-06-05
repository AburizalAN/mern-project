const initialState = {
    data : {
        title : '',
        body : '',
        image : '',
    }
}

const detailBlogReducer = (state = initialState, action) => {
    if (action.type === 'SET_DETAIL_BLOG') {
        return {
            ...state,
            data : action.payload
        }
    }
    
    return state
}

export default detailBlogReducer;