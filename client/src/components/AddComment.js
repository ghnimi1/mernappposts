import { Input, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: 'justify',
        margin: '5px'
    },
})
function AddComment({ post, Add }) {
    const classes = useStyles()
    const [comment, setComment] = useState('')
    return (
        <div>
            <form className={classes.root} noValidate
                onSubmit={(e) => {
                    e.preventDefault()
                    Add(post._id, { comment })
                    setComment('')
                }}>
                <Input placeholder="Add a comment"
                    fullWidth
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
            </form>
        </div>
    );
}

export default AddComment;