import API from '../../api';

export const  getRecipes = () =>{
    return dispatch =>{
        API.getRecipes( res => {
            dispatch({
                type: 'GOT_RECIPES',
                payload: res.data
            })
        })
       
    }
}