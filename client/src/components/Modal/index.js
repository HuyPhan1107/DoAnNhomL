import CloseIcon from "@mui/icons-material/Close";
import { Modal } from "@mui/material";
import { useStore } from "../../hooks";
import { actionType } from "../../reducers/action";
import { HIDE_MODAL } from "../../reducers/constant";
import { useStyles } from "./style";

function CommonModal() {
    const classes = useStyles();

    const [state, dispatch] = useStore();
    const { modal: { showModal, title, component } } = state;

    return (
        <Modal 
            open={showModal} 
            onClose={() => dispatch(actionType(HIDE_MODAL))}
            className={classes.modal}
        >
            <div className={classes.paper}>
                <div className={classes.header}>
                    <span className={classes.title}>
                        {title ? title : 'Modal'}
                    </span>
                    <div 
                        onClick={() => dispatch(actionType(HIDE_MODAL))}
                        className={classes.icon}
                    >
                        <CloseIcon/>
                    </div>
                </div>
                
                <div className={classes.content}>
                    {component ? component : 'Conten trống!'}
                </div>
            </div>
        </Modal>
    )
}

export default CommonModal;