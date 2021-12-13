import { Container } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import Comment from '../components/Comment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsUser } from '../redux/actions/postActions/fetchPostsUser';
import { addPosts } from '../redux/actions/postActions/addPosts';
import { updatePost } from '../redux/actions/postActions/updatePost';
import { removePost } from '../redux/actions/postActions/deletePost';
import { addComment } from '../redux/actions/postActions/addComment';
import { fetchCurrentUser } from '../redux/actions/userActions/currentUser';
import { likePost } from '../redux/actions/postActions/likePost';
import { unlikePost } from '../redux/actions/postActions/unlikePost';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: 'justify',
        margin: '5px'
    },
    inf_user: {
        height: 500,
        textAlign: 'center',
        margin: '5px',
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
        color: "blue"
    },
    comment: {
        backgroundColor: '#e6f3f5',
        borderRadius: '5px',
        width: '80%',
        marginLeft: '5px',
        marginBottom: '5px'
    },
    input: {
        display: 'none',
    },
});

function Profile(props) {
    const classes = useStyles();
    const [pos, setPos] = useState({})
    const { currentUser } = useSelector(state => state.users)
    const [content, setContent] = useState(pos.content)
    const [editing, setEditing] = useState(false)
    const [photo, setPhoto] = useState("")
    const { posts } = useSelector(state => state.posts)
    const { users } = useSelector(state => state.users)
    const id = props.match.params.id
    const dispatch = useDispatch()

    const Add = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("content", content);
        formData.append("photo", photo);
        dispatch(addPosts(formData))
        setContent('')
        setPhoto('')
    }

    const deletePost = (id) => {
        dispatch(removePost(id))
    }

    const EditPost = (id, content) => {
        dispatch(updatePost(id, { content }))
        setEditing(false)
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
        dispatch(fetchPostsUser(id))
        dispatch(fetchCurrentUser())
    }, [posts])
    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'row', flexGrow: '1' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Card className={classes.inf_user} variant="outlined">
                            <CardContent>
                                <AccountCircleOutlinedIcon
                                    style={{
                                        marginTop: '10px',
                                        fontSize: '120px',
                                    }} />
                                <Typography variant="body2" component="p">
                                    <h4 className={classes.user}>
                                        {currentUser?.name}
                                    </h4>
                                </Typography>
                                <Typography variant="body2" component="p">
                                    <span>
                                        Welcome to my account
                                    </span>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <div style={{ width: '100%' }}>
                            {editing ? (
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
                                        color="primary"
                                        className={classes.submit}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            EditPost(pos._id, content)
                                        }}
                                    >
                                        Edit Post
                                    </Button>
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
                                currentUser?.userId === id && (
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
                            )
                            }
                            <div>
                                {posts?.map(post => (
                                    <Card className={classes.root} key={post._id} variant="outlined">
                                        <CardContent>
                                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                <AccountCircleOutlinedIcon
                                                    style={{
                                                        marginTop: '10px',
                                                        marginRight: '15px',
                                                        fontSize: '30px'
                                                    }} />
                                                <Typography variant="body2" component="p">
                                                    <h4 className={classes.user}>
                                                        {users?.find(user => post?.createdBy === user?._id)?.name}
                                                    </h4>
                                                </Typography>
                                            </div>
                                            <Typography variant="body2" component="p">
                                                {post?.photo && <img
                                                    style={{ height: '200px', width: '100%', borderRadius: '5px' }}
                                                    src={`http://localhost:8000/${post?.photo}`} alt={post?.photo} />}
                                                {post.content}
                                            </Typography>
                                        </CardContent>
                                        {currentUser?.userId === id && (<CardActions>
                                            <Button
                                                color='primary'
                                                onClick={() => {
                                                    setPos(post);
                                                    setEditing(true)
                                                }}
                                                size="small">
                                                Edit
                                            </Button>
                                            <Button
                                                color='secondary'
                                                onClick={() => deletePost(post._id, post.content)} size="small">
                                                Delete</Button>
                                        </CardActions>)}
                                        {post?.likedBy?.find(like => like?.author === currentUser?.userId) ? (<div style={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                            marginRight: '20px',
                                        }}
                                            onClick={() => unlike(post?._id)}>
                                            <ThumbUpAltIcon color="error"
                                                style={{
                                                    cursor: 'pointer'
                                                }} /> {post?.likeCount}
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
                                ))}
                            </div></div>
                    </Grid>
                </Grid>
            </div>
        </Container >
    );
}
export default Profile