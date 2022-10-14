import { connect } from '../models/qlnvModal.js';

// Đăng nhập
export const loginAdmin = async (req, res) => {
    try {
        const { user, pass } = req.body;
        connect.query(`SELECT usename, password FROM admin WHERE usename='admin'`, 
            (err, result) => {
                if(result) {
                    const admin = result[0]
                    if(admin.usename === user && admin.password === pass) {
                        res.status(200).json({ key: true });
                    }else {
                        res.status(200).json({ key: false });
                    }
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Đổi mật khẩu
export const changePassword = async (req, res) => {
    try {
        const { pass, oldPass } = req.body;
        connect.query(`SELECT usename, password FROM admin WHERE usename='admin'`, 
            (err, result) => {
                if(result) {
                    const admin = result[0]
                    if(admin.password === oldPass) {
                        connect.query(`UPDATE admin SET password='${pass}' WHERE usename='admin'`, 
                        (err, result) => {
                            if(result) {
                                res.status(200).json({ key: true });
                            }else res.status(200).json({ key: false });
                    })
                    }else {
                        res.status(200).json({ key: false });
                    }
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}