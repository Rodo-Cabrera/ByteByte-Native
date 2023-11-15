export const AuthReducer = (state={}, action) => {
    switch (action.type) {
        case 'LOGIN': 
            return {
                ...state,
                user: action.payload.user,
                isLogged: true,
                isLoading: false,
                errorMsg: ''
            }
            case 'ERROR': 
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading: false,
                errorMsg: action.payload.errorMsg
            }

            case 'ERROR':
            return {
                ...state,
                user: null,
                isLogged: false,
                isLoading: false,
                errorMsg: ''
            }
            
    
        default:
            return state;
    }
}