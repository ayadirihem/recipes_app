import React, {Component} from 'react';
import axios from 'axios';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import Button from '@material-ui/core/Button';
import {Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import * as Firebase from "firebase/app";
const styles = theme =>({
    root: {
        flexGrid : 1

    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }

})

class Detail extends Component {
    constructor(props){
        super(props);
        this.state= {
            details : []
        }
    }
    componentDidMount(){
        let idR = this.props.match.params.Title;
        /*axios.get(`http://localhost:8000/api/Recipes/${idR}`)
        .then(data =>{
            console.log(data.data)
            this.setState({details: data.data})
        })
        .catch(err =>{
            console.log(err)
        })*/
        let messagesRef = Firebase.database().ref('/').orderByChild('Title').equalTo(idR);
        messagesRef.on('value', snapshot => {
          this.setState({details: Object.values(snapshot.val())});
       })
    }

    render(){

        const {classes }= this.props
        let {details} = this.state;
        let Title = ""
        let autheur = ""
        let ingredients = ""
        let description = ""
        let url = null
        console.log(details[0]);
        for (var i = 0; i < details.length; i++) {
            console.log(details[i].Title)
            Title= details[i].Title;
            autheur = details[i].autheur;
            ingredients = details[i].ingredients;
            description = details[i].description;
            url = details[i].url
        }


        return(
            <div>
                <Button component={RouterLink} to='/'>
                    <ArrowBackOutlinedIcon />
                </Button>
                <div className={classes.root}>
                        <Grid container spacing={5} >
                     <Grid item xs={12}>
                    <Paper className={classes.paper}><h1 className="text-center">
                    {Title} by {autheur}</h1></Paper>
                     </Grid>
                     <Grid item xs={12}>
                       <img src={url} className="rounded imgs" alt={Title} />
                     </Grid>
                     <hr />
                     <Grid container  justify="center" item xs={12}>
                        <Paper id="design" className={classes.paper}>
                            <h3>Ingredients :</h3>
                            <p>{ingredients}</p>
                        </Paper>
                        <Paper id="design" className={classes.paper}>
                            <h3 >Description :</h3>
                            <p>{description}</p>
                        </Paper>
                       </Grid>
                     </Grid>
                     
                </div>
            </div>
        )
    }
}

export default (withStyles(styles)) (Detail);