import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API from '../adapters/API'
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

const useStyles = makeStyles({
  card: {
    width: '100%'
  },
  media: {
    height: 300,
    backgroundSize: 'contain'
  },
  avatar: {
    margin: '1vh',
    width: 60,
    height: 60,
  }
});

const HeadlineCard = ({ id, title, description, url, source, url_to_image, savedArticles, toggleSavedArticle, loggedIn, published_at}) => {
    
  const classes = useStyles();

  const saveArticle = () => {
    API.postUserArticle(id)
      .then(() => toggleSavedArticle(id))
  }

  const unsaveArticle = () => {
    API.deleteUserArticle(id)
    .then(() => toggleSavedArticle(id))
  }

  const defaultImage = e => {
    e.target.src = require('../default_avatar.png')
  }

  return (
    <Card className={classes.card} style={{margin: '1vw', marginBottom: 0}} >
      <CardHeader
        avatar={
          <Avatar alt={`${source.name} logo`} imgProps={{onError: defaultImage}} src={`https://icon-locator.herokuapp.com/icon?url=${url}&size=70..120..200`} className={classes.avatar} action={
            <p>Action</p>
          }/>
        }
        title={source.name}
        subheader={(new Date(published_at)).toLocaleDateString('en-GB', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'})}
      />
      
        
      {url_to_image &&
      <CardMedia
        className={classes.media}
        image={url_to_image}
        src={url_to_image}
        title={title}
      />}

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {description}
        </Typography>
      </CardContent>
      
      <CardActions >
        {loggedIn ? <Button size="small" color="primary" onClick={savedArticles.includes(id) ? unsaveArticle : saveArticle}>
          {savedArticles.includes(id) ? 'Saved' : 'Save'}
        </Button> : ''}
        <Button size="small" color="primary" href={url} target="_blank" rel="noopener noreferrer" >
          Read More at {source.name}
        </Button>
      </CardActions>
    </Card>
 
  )
}

export default HeadlineCard;