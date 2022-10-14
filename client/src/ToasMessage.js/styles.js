import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
    wrapper: {
        position: 'fixed',
        zIndex: 99999,
        // [theme.breakpoints.up('sm')]: {
            top: 32,
            right: 32, 
        // },
        // [theme.breakpoints.down("xs")]: {
        //     bottom: 4,
        //     right: 4, 
        //     left: 4,
        // },
    },
    toast: {
        // transform: 'translateX(calc(100% + 32px))',
        marginTop: 20,
        maxWidth: 400,
        minWidth: 340,
        padding: '10px 0',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 4,
        border: '1px solid',
        borderLeft: '4px solid',
        boxShadow: '0 5px 8px rgba(0, 0, 0, 0.08)',
        animation: `$slideInLeft ease 0.3s, $fadeOut linear 1s 3s forwards`,
    },
    "@keyframes slideInLeft": {
        "from":{
            opacity: 0,
            transform: 'translateX(calc(100% + 32px))',
        },
        "to": {
            opacity: 1,
            transform: 'translateX(0)',
        }
    },
    "@keyframes fadeOut": {
        "to": {
            opacity: 0,
        }
    },
    "toast + toast": {

    },
    icon: {
        padding: '0 16px',
        fontSize: 24,
    },
    body: {
        flexGrow: 1,
    },
    title: {
        margin: 0,
        fontSize: 16,
        fontWeight: 600,
        color: '#333'
    },
    msg: {
        margin: '4px 0 0 0',
        fontSize: 12,
        color: '#888',
    },
    close: {
        "&:hover, &:focus": {
            backgroundColor: '#F1F3F4',
            borderRadius: 4,
        },
        padding: '4px',
        marginRight: 12,
        fontSize: 20,
        color: 'rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    toast__success_icon: {
        color: '#47d864',
    },

    toast__info_icon: {
        color: '#2f86eb',
    },

    toast__wrning_icon: {
        color: '#ffc021',
    },

    toast__error_icon: {
        color: '#ff623d',
    },

}));

/**
success
info
wrning
error
 */