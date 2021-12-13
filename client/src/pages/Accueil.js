import { Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import { Link } from 'react-router-dom'
import Comment from '../components/Comment';
import { fetchPosts } from '../redux/actions/postActions/fetchPosts';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../redux/actions/postActions/addPosts';
import { fetchUsers } from '../redux/actions/userActions/fetchUsers';
import { addComment } from '../redux/actions/postActions/addComment';
import { likePost } from '../redux/actions/postActions/likePost';
import { unlikePost } from '../redux/actions/postActions/unlikePost';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles({
    root: {
        textAlign: 'justify',
        flexGrow: 1
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    user: {
        color: "blue",
    },
    comment: {
        backgroundColor: '#e6f3f5',
        borderRadius: '5px',
        width: '80%',
        marginLeft: '5px',
        marginBottom: '5px'
    },
    input: { display: 'none' }
});

function Accueil(props) {
    const classes = useStyles();
    const { posts } = useSelector(state => state.posts)
    const [pos, setPos] = useState({})
    const { users } = useSelector(state => state.users)
    const [content, setContent] = useState(pos.content)
    const [photo, setPhoto] = useState('')
    const [editing, setEditing] = useState(false)
    const { currentUser } = useSelector(state => state.users)
    const dispatch = useDispatch()

    const Add = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("content", content);
        formData.append("photo", photo);
        dispatch(addPosts(formData))
        setContent('')
        setPhoto("")
    }
    const AddComm = (id, comment) => {
        dispatch(addComment(id, comment))
    }
    const like = (id) => {
        dispatch(likePost(id))
    }

    const unlike = (id) => {
        dispatch(unlikePost(id))
    }

    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchUsers())
    }, [posts])
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                </Grid>
                <Grid item xs={12} sm={8}>
                    {
                        editing ? (
                            <form className={classes.form} noValidate>
                                <TextField
                                    color='primary'
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    size="small"
                                    name="post"
                                    placeholder="Create new post"
                                    type="text"
                                    id="post"
                                    defaultValue={pos?.content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => setEditing(false)}
                                    className={classes.submit}
                                >
                                    Cancel
                                </Button>
                            </form>
                        ) : (
                            <form className={classes.form} noValidate
                                onSubmit={Add}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    size="small"
                                    name="post"
                                    placeholder="Create new post"
                                    type="text"
                                    id="post"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                                <div>
                                    <input accept="image/*"
                                        className={classes.input}
                                        id="icon-button-file"
                                        type="file"
                                        value={FormData.photo}
                                        onChange={(e) => setPhoto(e.target.files[0])} />
                                    <label htmlFor="icon-button-file" >
                                        <IconButton color="primary"
                                            aria-label="upload picture" component="span">
                                            <PhotoCamera />
                                        </IconButton>
                                    </label>
                                </div>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Add Post
                                </Button>

                            </form>
                        )
                    }
                    <div>
                        {posts?.map(post => (
                            <Card key={post._id} className={classes.root} variant="outlined">
                                <CardContent >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <AccountCircleOutlinedIcon
                                            style={{
                                                marginTop: '10px',
                                                marginRight: '15px',
                                                fontSize: '30px'
                                            }} />
                                        <Typography variant="body2" component="p">

                                            <Link to={`${post.createdBy}/profile`}
                                                style={{ textDecoration: 'none' }}>
                                                <h4 className={classes.user} >
                                                    {users?.find(user => user._id === post.createdBy)?.name}
                                                </h4>
                                            </Link>
                                        </Typography>
                                    </div>
                                    <Typography variant="body2" component="p">
                                        {post?.photo && <img
                                            style={{ height: '150px', width: '100%' }}
                                            src={`https://mernappposts.herokuapp.com/${post?.photo}`} alt={post?.photo} />}
                                        {post.content}
                                    </Typography>

                                </CardContent>
                                {post?.likedBy?.find(like => like.author === currentUser?.userId) ? (<div style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    marginRight: '20px',
                                    cursor: 'pointer'
                                }}
                                    onClick={() => unlike(post?._id)}>
                                    <ThumbUpAltIcon color="error"
                                        style={{
                                            cursor: 'pointer'
                                        }} />
                                    {post?.likeCount}
                                </div>) : (<div style={{
                                    display: 'flex',
                                    justifyContent: 'end',
                                    marginRight: '20px',
                                }}
                                    onClick={() => like(post?._id)}>
                                    <ThumbUpAltIcon style={{
                                        cursor: 'pointer'
                                    }} />{post?.likeCount}
                                </div>)
                                }
                                <Comment post={post} users={users} AddComm={AddComm} />
                            </Card>
                        ))
                        }
                    </div>
                </Grid>
                <Grid item xs={12} sm={2}></Grid>
            </Grid>
        </Container >
    );
}

export default Accueil;