import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    listItem: {
        backgroundColor: 'rgb(182,182,182,0.7)',

        '&:hover': {
            backgroundColor: 'rgb(182,182,182,0.8)',
        }
    },
    active: {
        backgroundColor: 'rgb(182,182,182,0.9)',
    }
});