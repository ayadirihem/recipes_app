
import React ,{Component} from 'react';
import {connect} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';
import * as AdminAction from '../store/actions/AdminAction';
import Link from '@material-ui/core/Link'
import Food from '../Components/pages/Food';
import Fab from '@material-ui/core/Fab';
import {fade,WithStyle, withStyles} from '@material-ui/core/styles';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { FormikTextField , FormikSelectField} from 'formik-material-fields';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import history from 'history';
import * as Firebase from "firebase/app";
const styles = theme => ({
    fab: {
        position : 'fixed',
        bottom: '50px',
        right: '50px'
    },
    margin: {
        marginLeft: '500px'
      },
})

class Recipes extends Component{
    
    constructor(props){
        super(props);
        this.state= {
            recipes : [],
            search: '',
            error: ''
        }
    }
    componentWillMount(){
      let messagesRef = Firebase.database().ref('/');
        messagesRef.on('value', snapshot => {
          this.setState({recipes: Object.values(snapshot.val())});
          console.log(snapshot.val().key)
       })

  }

    render(){
        const {recipes} = this.state;
        const {classes} = this.props;
        const {search} = this.state;
        console.log(recipes);
        console.log(search)
        return(
            <div className="app-recipes">
                <nav class="navbar navbar-expand-lg navbar-light Back">
                     <h1 className="text-white">Food Recipe </h1>
                     
                     <span class="navbar-text quotes">
                           <p class="font-italic text-sm-right" style={{position: "fixed",
                                                                        color: "wheat",
                                                                        right: "100px"}}>"People who love to eat are always the best people."-JULIA CHILD</p>
                      </span>
                </nav>
                <div>
            <div className={classes.margin} id="SearchAll">
              <Grid container spacing={1} alignItems="flex-end">
          <Grid item > 
          <SearchIcon className="search" />
          </Grid>
          <Grid item>
              <form>
          <TextField
              name="Search"
              label="Search"
              margin="normal"
              value={this.props.search}
              onChange={e =>this.setState({search: e.target.value})}
               />
               </form>
          </Grid>
        </Grid>
            </div>
              
          </div>
                <div class="container-fluid">
                   <div class="row">
                           {
                                search == ""?
                                    recipes.map((recipe,i) => {
                                        return (
                                            <Food key={i} {...recipe} ></Food>
                                        )
                                    })
                                :
                                            recipes.filter(recipe => recipe.Title.toLocaleLowerCase().includes(search) )
                                                .map((recipe,i) => {
                                                return (
                                                    <Food key={i} {...recipe} ></Food>
                                                )
                                            })


                          }
                    
                   </div>
                </div>
                <Fab component={RouterLink} to="/recipe/add" color="secondary" aria-label="Add" className={classes.fab}>
                <EditIcon />
                </Fab>

            </div>
        
        )
    }
}


/*const mapStateToProps = state =>{
    return{
        admin: state.admin
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        getRecipes: ()  =>{
            dispatch(AdminAction.getRecipes())
        }
    }
}
*/
export default withStyles(styles)(Recipes);