const initialStateGlobal = {
    name: "hello world",
}

const globalReducer = (state = initialStateGlobal, action) => {
    if (action.type === 'UPDATE_NAME') {
        return {
            ...state,
            name: action.value
        }
    }

    return state;
}

export default globalReducer;