export const initialState = {
    clickedRecruit: {},
    isShow: false,
};

export const SHOW_DETAIL = 'SHOW_DETAIL';

export const showDetailAction = (data) => {
    console.log('sssdA', data)
    return {
        type: SHOW_DETAIL,
        data: data
    };
};

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SHOW_DETAIL: {
            console.log('showDetailAction', state, action)
            return {
                ...state,
                clickedRecruit: action.data,
                isShow: true,
            }
        }
        default: {
            console.log('showDetailAction default', state, action)
            return {
                ...state,
            }
        }
    }
}

export default reducer;