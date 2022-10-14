import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles({
    boxChangePass: {
      color: 'blue',

      '&:hover': {
        cursor: 'pointer',
        textDecorationLine: 'underline'
      }
    }
});