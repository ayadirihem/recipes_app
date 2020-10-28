import axios from 'axios';

const host= 'http://localhost:8000';

const API = {
    getRecipes: ( success) =>{
        axios.get(`${host}/api/Recipe/Recipe_find`)
        .then(res =>{
            success(res);
        })
    }
}

export default API;