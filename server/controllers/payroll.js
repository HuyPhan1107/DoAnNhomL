import { connect } from '../models/qlnvModal.js';

// Insert
export const insertPayroll = async (req, res) => {
    try {
        const { Id, TenNV, MucLuong } = req.body;
        connect.query(`SELECT * FROM payroll WHERE Id='${Id}'`, 
            (err, result) => {
                if(result) {
                    if(result.length < 1) {

                        let congLam = [];
                        for (let i = 0; i <= 31; i++) {
                            congLam.push('0')
                        };
                        const congLamString = congLam.toString();

                        connect.query(`INSERT INTO payroll(Id, TenNv, MucLuong, CongLam) VALUES ('${Id}','${TenNV}','${MucLuong}','${congLamString}')`, 
                            (err, result) => {
                                if(result) {
                                    res.status(200).json({ key: true, create: true });
                                }else res.status(200).json({ key: false });
                        })
                                        
                    }else {
                        res.status(200).json({ key: true, create: false });
                    }
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Get All
export const getAllPayroll = async (req, res) => {
    try {
        connect.query('SELECT * FROM payroll', (err, result) => {
            res.status(200).json(result);
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Update Mức lương , tên
export const updateMucLuong = async (req, res) => {
    try {
        const { mucLuong, id, tenNV } = req.body;
        connect.query(`UPDATE payroll SET MucLuong='${mucLuong}', TenNv='${tenNV}' WHERE Id='${id}'`, (err, result) => {
            if(result) {
                res.status(200).json({ key: true });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// RESET công làm
export const resetCongLam = async (req, res) => {
    try {
        const { id } = req.body;
        let congLam = [];
        for (let i = 0; i <= 31; i++) {
            congLam.push('0')
        };
        const congLamString = congLam.toString();

        connect.query(`UPDATE payroll SET CongLam='${congLamString}' WHERE Id='${id}'`, (err, result) => {
            if(result) {
                res.status(200).json({ key: true });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Update công làm
export const updateCongLam = async (req, res) => {
    try {
        const { congLam, id } = req.body;
        connect.query(`UPDATE payroll SET CongLam='${congLam}' WHERE Id='${id}'`, (err, result) => {
            if(result) {
                res.status(200).json({ key: true });
            }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}