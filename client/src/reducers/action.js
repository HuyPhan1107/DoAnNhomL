import { 
    SET_INFO_NV, 
    SET_LIST_NHAN_VIEN, 
    SET_OPEN_MENU, 
    SET_TOAST_MESAGE,
    SET_USER_LOGIN,
    SHOW_MODAL, 
    SET_TASKS,
    SET_LIST_PAYROLL,
} from "./constant";

export const setOpenMenu = payload => ({
    type: SET_OPEN_MENU,
    payload,
});

export const setListNhanVien = payload => ({
    type: SET_LIST_NHAN_VIEN,
    payload,
});

export const actionType = (action) => ({
    type: action,
});

export const showModal = payload => ({
    type: SHOW_MODAL,
    payload: payload,
});

export const setInfoNV = payload => ({
    type: SET_INFO_NV,
    payload,
});

export const setToastMesagae = payload => ({
    type: SET_TOAST_MESAGE,
    payload,
});

export const setUserLogin = payload => ({
    type: SET_USER_LOGIN,
    payload,
});

export const setTasks = payload => ({
    type: SET_TASKS,
    payload,
});

export const setListPayroll = payload => ({
    type: SET_LIST_PAYROLL,
    payload,
});