import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 32,
        // [theme.breakpoints.up('sm')]: {
        //     margin: 0,
        // },
    },
    paper: {
        backgroundColor: 'white',
        borderRadius: 4,
    },
    header: {
        backgroundColor: 'rgb(241, 243, 244, 0.6)',
        color: '#333',
        padding: '0 8px',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#000',
        textTransform: 'capitalize',
        fontFamily: 'Raleway sans-serif',
        fontWeight: 700,
        marginRight: 12,
    },
    content: {
        padding: 8,
        margin: 0,
        minWidth: 400,
    },
    icon: {
        cursor: 'pointer',
        fontSize: 30,
    },
}));