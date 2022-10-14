import React, { useEffect, useState } from 'react';
import IconClose from '@mui/icons-material/Close';
import useStyles from './styles';
import { useStore } from '../hooks';
import { actionType } from '../reducers/action';
import { HIDE_TOAST_MESAGE } from '../reducers/constant';

function Message({ title, message, classType, icon }) {
    const classes = useStyles();
    const dispatch = useStore()[1];

    const [checkRemove, setCheckRemove] = useState(0);

    useEffect(()=> {
        setTimeout(() => {
            setCheckRemove(1);
            dispatch(actionType(HIDE_TOAST_MESAGE))
        }, 4000);
    }, [dispatch])

    return (
        checkRemove === 0 ? <div className={classes.toast + ' ' + classType}>
            <div className={classes.icon}>
                {icon}
            </div>

            <div className={classes.body}>
                <h3 className={classes.title}>{title}</h3>
                <p className={classes.msg}>
                    {message.length < 40 ? message : message.slice(0, 65) + '...'}
                </p>
            </div>

            <div onClick={ () => setCheckRemove(1)} className={classes.close}>
                <IconClose  />
            </div>
        </div> : null
    )
}

export default Message;