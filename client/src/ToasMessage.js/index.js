import useStyles from './styles';
import Message from './Message';
import IconCheckCircle from '@mui/icons-material/CheckCircle';
import IconInfo from '@mui/icons-material/Info';
import IconWarning from '@mui/icons-material/Warning';
import IconPriorityHigh from '@mui/icons-material/PriorityHigh';
import { useStore } from '../hooks';

function ToastMessage() {
    const classes = useStyles();

    const [state] = useStore();
    const { toast: toastMessage } = state;

    const rederMessage = () => {
        if(toastMessage.title && toastMessage.message) {
            if(toastMessage.type === 'success') {
                return <Message
                    icon={<IconCheckCircle />} 
                    toastMessage={toastMessage} 
                    title={toastMessage.title} 
                    message={toastMessage.message} 
                    classType={classes.toast__success_icon} 
                />;
            }else if (toastMessage.type === 'info') {
                return <Message
                    icon={<IconInfo />} 
                    toastMessage={toastMessage} 
                    title={toastMessage.title} 
                    message={toastMessage.message} 
                    classType={classes.toast__info_icon} 
                />;
            }else if (toastMessage.type === 'error') {
                return <Message
                    icon={<IconPriorityHigh />} 
                    toastMessage={toastMessage} 
                    title={toastMessage.title} 
                    message={toastMessage.message} 
                    classType={classes.toast__error_icon}
                />;
            }else {
                return <Message
                    icon={<IconWarning />} 
                    toastMessage={toastMessage} 
                    title={toastMessage.title}  
                    message={toastMessage.message} 
                    classType={classes.toast__wrning_icon} 
                />;
            }
        }else return;
    }

    return (<div className={classes.wrapper}>
        {rederMessage()}
    </div>);
}

export default ToastMessage;

/**
 success
 info
 wrning
 error
*/