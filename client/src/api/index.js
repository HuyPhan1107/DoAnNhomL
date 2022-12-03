import axios from 'axios';

const URL = 'http://localhost:7007';

// Lấy Nhân Viên
export const getNV = () => axios.get(`${URL}/nhanvien`);

// add new nhân viên
export const addNewNV = payload => axios.post(`${URL}/nhanvien/add-new-nv`, payload);

// xóa nhân vien
export const deleteNV = payload => axios.post(`${URL}/nhanvien/delete-nv`, payload);

// sửa nhân vien
export const updateNV = payload => axios.post(`${URL}/nhanvien/update-nv`, payload);

// login
export const login = payload => axios.post(`${URL}/user/admin`, payload);

// change pass
export const changePassword = payload => axios.post(`${URL}/user/change-password`, payload);

// Lấy Tasks
export const getTasks = () => axios.get(`${URL}/tasks`);

// Insert
export const insertTask = payload => axios.post(`${URL}/tasks/insert-task`, payload);

// Update
export const updateTask = payload => axios.post(`${URL}/tasks/update-task`, payload);

// Delete
export const deleteTask = payload => axios.post(`${URL}/tasks/delete-task`, payload);

// Search 
export const searchData = payload => axios.post(`${URL}/nhanvien/search`, payload);

// Create Payroll
export const createPayroll = payload => axios.post(`${URL}/payroll/insert`, payload);

// Get Payroll
export const getAllPayrolls = () => axios.get(`${URL}/payroll/get-all`);

// Get Payroll
export const getMucLuongNhanVienById = payload => axios.post(`${URL}/nhanvien/get-muc-luong-nhan-vien-by-id`, payload);

// Create Payroll
export const updateMucLuong = payload => axios.post(`${URL}/payroll/update-muc-luong`, payload);

// reset công làm
export const resetCongLam = payload => axios.post(`${URL}/payroll/reset-cong-lam`, payload);

// reset công làm
export const updateCongLam = payload => axios.post(`${URL}/payroll/update-cong-lam`, payload);

// Lấy chức vụ
export const getPositions = () => axios.get(`${URL}/nhanvien/position`);

// lấy nhân viên theo chức vụ
export const getStaffByPosition = (payload) => axios.post(`${URL}/nhanvien/get-staff-by-position`, payload);


// Thiếc lập json chấm công
export const setJsonTimekeeping = (payload) => axios.post(`${URL}/tasks/set-json-timekeeping`, payload);

// lấy task từ id
export const getTaskById = (payload) => axios.post(`${URL}/tasks/get-task-by-id`, payload);