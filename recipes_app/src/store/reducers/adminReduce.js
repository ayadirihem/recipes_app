const defaultState = {
    recipes: []

}
const admin = (state = defaultState, action) =>{
    switch(action.type){
        case 'GOT_RECIPES':
            return {
                ...state,
                recipes: action.payload
            }
        default: {
            return state
        }
    }
}
export default admin;