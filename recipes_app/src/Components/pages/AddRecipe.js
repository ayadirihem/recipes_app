import React, {Component} from 'react';
import {withFormik, Formik} from 'formik';
import * as Yup from 'yup';
import {FormikTextField} from 'formik-material-fields';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { withStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import * as router from 'react-router';
import * as Firebase from "firebase/app";
import back from '../images/back.jpg';
/*global FB*/

const style = theme =>({
    container: {
        margin: theme.spacing(5),
        size : 100
     
    },
    form: {
        margin: theme.spacing(4)
    }
})



class AddRecipe extends Component{

    constructor(props){
        super(props);
        this.state={
            Title: '',
            ingredients: '',
            description: '',
            autheur: '',
            file: null,
            
        }
        
    }

     
    render(){
        const handleSubmit= (e) =>{
            const { match: { params }, history } = this.props;
            let {Title}= this.state;
            let {ingredients}= this.state;
            let {description} = this.state;
            let {autheur} = this.state;
            console.log("image:",file);
            const newrecipe = {
                Title: Title,
                ingredients: ingredients,
                description: description,
                autheur: autheur
            }
            console.log(newrecipe)
            Firebase.storage().ref(`/${file.name}`).put(file)
            .then(
              data =>{
                data.ref.getDownloadURL().then(url =>{
                  Firebase.database().ref('/').push({
                    Title: Title,
                    ingredients: ingredients,
                    description: description,
                    autheur: autheur,
                    url : url
                  });
                })
              }).then(function (error){
                  console.log(error);
                history.push('/')
            });
        }
        const {classes} = this.props;
        const {file} = this.state;
        console.log(file)
        return(
          <div className="AppAdd"  >
          <Button className="float-left" component={RouterLink} to='/'>
                    <ArrowBackOutlinedIcon />
                    </Button>
            <div className={classes.container}  >
                 
                
                <Box width={1} >
                <form className={classes.form} >
                    <Paper id="form" style={{
        backgroundSize: 'contain',
        backgroundPosition: 'right',
        backgroundImage: `url(${back})`,
        backgroundRepeat: 'no-repeat',
      }}>
                    <FormikTextField
                      
                      id="standard-basic" 
                      label="Title"
                      name="Title"
                      value={this.state.Title}
                      onChange={e =>this.setState({Title: e.target.value})}
                   />
                   <br></br>
                   <FormikTextField
                      className="textarea1"
                      id="standard-textarea"
                      name="ingredients"
                      label="ingredients"
                      placeholder="ingredients"
                      value={this.state.ingredients}
                      onChange={e =>this.setState({ingredients: e.target.value})}
                      multiline
                      fullwidth
                    /><br></br>
                    <FormikTextField
                      className="textarea1"
                      id="standard-multiline-static"
                      label="description"
                      name="description"
                      multiline
                      rows={6}
                      value={this.state.description}
                      onChange={e =>this.setState({description: e.target.value})}
                      fullwidth
                      /><br></br>
                      <FormikTextField
                      id="standard-basic"
                      className="editor1"
                      label="writer"
                      name="autheur"
                      value={this.state.autheur}
                      onChange={e =>this.setState({autheur: e.target.value})}
                   />
                        <script>
                            CKEDITOR.replace( 'editor1' );
                        </script>
                   <br></br>
                   <br />
                   <Formik initialValues={file}>
                    <div class="form-group">
                        <input 
                        title="add an image"
                        type="file" 
                        name="imageFile" 
                        onChange={e =>this.setState({file: e.target.files[0]})}
                        className="form-control-file" 
                        id="exampleFormControlFile1" />
                    </div>
                    </Formik>
                   <br></br>
                   <Formik>
                   <Button 
                   className="float-right"
                       variant="contained" 
                       color="secondary"
                       onClick={e =>{
                           handleSubmit();
                       }}
                       ><SaveIcon />Save</Button>
                       </Formik>
                    </Paper>
                    
                 </form>
                 </Box>
            </div>
            </div>

        )
    }
}

export default withFormik({
    mapPropsToValues : () =>({
        Title : '',
        ingredients: '',
        description : '',
        autheur:'',
        imageFile: null
    }),
    validateSchema: Yup.object().shape({
        Title: Yup.string().required(),
        ingredients: Yup.string().required(),
        description: Yup.string().required(),
        autheur: Yup.string().required()
    }),
    

}) (withStyles(style)  (withRouter(AddRecipe)));