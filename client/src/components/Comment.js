import { makeStyles, Typography } from '@material-ui/core';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import React, { useState } from 'react';
import AddComment from './AddComment';
const useStyles = makeStyles({
    comment: {
        display: 'flex',
        flexDirection: 'row'
    }
});
function Comment({ post, users, AddComm }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    return (
        <div>
            <h4 style={{ textAlign: 'center', cursor: 'pointer' }}
                onClick={() => setOpen(!open)}>Comment <span>({post.comments?.length})</span></h4>
            <AddComment post={post} Add={AddComm} />
            {open && (
                post.comments?.map(com => (
                    <div className={classes.comment} key={com._id}>
                        <AccountCircleOutlinedIcon
                            style={{
                                marginTop: '20px',
                                marginRight: '30px',
                                fontSize: '30px'
                            }} />
                        <div style={{
                            backgroundColor: '#f2f2f2',
                            borderRadius: '5px',
                            borderTopLeftRadius: '0px',
                            width: '80%',
                            marginLeft: '5px',
                            marginBottom: '5px',
                            padding: '2px'
                        }}>
                            <h4>{users.find(user => com.createdBy === user._id)?.name}</h4>
                            <Typography style={{ padding: '1px' }} variant="body2" component="p">
                                {com.comment}
                            </Typography>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default Comment;