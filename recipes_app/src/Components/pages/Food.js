import React, {Component} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Link from "@material-ui/core/Link";

//@material
import {withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia"
import Typography from '@material-ui/core/Typography';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import Button from '@material-ui/core/Button';


const useStyles = theme => ({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    card: {
        position: 'relative',
        marginTop: '55px',
        marginLeft: '07px',
        
    },
    arrow: {
      float: 'right',
      marginBottom: '10px'
    }
    
  });
  

class Food extends Component{

    
      

    render(){
        
        console.log(this.props.url);
        const {classes} = this.props;
        return(
            <div className={classes.root} >
                <div class="col-sm-6">
                 <Card className={classes.card} id="Card">
                    <CardHeader title={this.props.Title} subheader={this.props.autheur}/>
                    <CardMedia
                           className={classes.media}
                            image={this.props.url}
                            title={this.props.Title}
                        />
                    <CardContent>
                       <Button component={RouterLink} to={`/recipe/detail/${this.props.Title}`} className={classes.arrow}>
                         <DoubleArrowIcon  />
                         </Button>
                       
                    </CardContent>
                       
                  </Card>
                 </div>
            </div>
        )
    }
}

export default (withStyles(useStyles)) (Food);