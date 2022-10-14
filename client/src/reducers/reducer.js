import { 
    SET_OPEN_MENU, 
    SET_LIST_NHAN_VIEN, 
    SHOW_MODAL, 
    HIDE_MODAL, 
    SET_INFO_NV, 
    HIDE_TOAST_MESAGE, 
    SET_TOAST_MESAGE,
    SET_INFO_NV_DEFAULT,
    SET_USER_LOGIN,
    SET_TASKS,
    SET_LIST_PAYROLL,
} from "./constant";

export const initState = {
    userLogin: false,
    openMenu: false,
    listNhanVien: [],
    modal: {
        showModal: false,
        title: '',
        component: null,
    },
    nhanVien: {
        id: undefined,
        tenNV: '',
        sdt: '',
        gender: 1,
        diaChi: '',
        chucVu: '',
        mucLuong: '',
    },
    toast: {
        title: '',
        message: '',
        type: '',
    },
    tasks: [],
    listPayroll: [],
} 

function reducer(state, action) {
    switch (action.type) {
        // Thanh menu
        case SET_OPEN_MENU: 
            return {
                ...state,
                openMenu: action.payload,
            }
        
        // List Nhân viên
        case SET_LIST_NHAN_VIEN: 
            return {
                ...state,
                listNhanVien: action.payload,
            }

        // Modal
        case SHOW_MODAL: 
            return {
                ...state,
                modal: action.payload,
            }
        case HIDE_MODAL: 
            return {
                ...state,
                modal: {
                    showModal: false,
                    title: '',
                    component: null,
                },
                nhanVien: {
                    id: undefined,
                    tenNV: '',
                    sdt: '',
                    gender: 1,
                    diaChi: '',
                    chucVu: '',
                    mucLuong: '',
                },
            }

        // Info nhân viên 
        case SET_INFO_NV: 
            return {
                ...state,
                nhanVien: action.payload,
            }
        case SET_INFO_NV_DEFAULT: 
            return {
                ...state,
                nhanVien: {
                    tenNV: '',
                    sdt: '',
                    gender: 1,
                    diaChi: '',
                    chucVu: '',
                    mucLuong: '',
                },
            }

        // Toast mesage 
        case HIDE_TOAST_MESAGE: 
            return {
                ...state,
                toast: {
                    title: '',
                    message: '',
                    type: '',
                },
            }
        case SET_TOAST_MESAGE: 
            return {
                ...state,
                toast: action.payload,
            }

        // User login
        case SET_USER_LOGIN: 
            return {
                ...state,
                userLogin: action.payload,
            }

        // Tasks 
        case SET_TASKS: 
            return {
                ...state,
                tasks: action.payload,
            }

        // Payroll
        case SET_LIST_PAYROLL:  
            return {
                ...state,
                listPayroll: action.payload,
            }
        default:
            throw new Error('Invalid action!');
    }
}

export default reducer;