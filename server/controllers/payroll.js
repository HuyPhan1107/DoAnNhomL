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
        connect.query(`UPDATE payroll SET CongLam='0',TangCa='0',TongCong='0',DiTre='0' WHERE Id='${id}'`, (err, result) => {
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

// Update công làm mới
export const updatePayrollFromTask = async (Id) => {
    try {
        connect.query(`SELECT * FROM manage_task WHERE Id = '${Id}'`, (err, result) => {
            if (err) {
                return; 
            } 
            try {
                let task = result[0];
                let holidayPay = task.holidayPay
                let {Ready, InProgress, Completed} = JSON.parse(task.json_timekeeping);
                if (Completed) {
                    for (let i = 0; i < Completed.length; i++) {
                        try {
                            let Cong = Completed[i];
                            connect.query(`UPDATE payroll SET CongLam=CongLam + '1', TongCong=TongCong+'${holidayPay}', TangCa=TangCa + '1' WHERE Id='${Cong}'`, () => {})
                        } catch (error) {
                            console.log(error)
                        }
                    }
                } else {
                    if (!Ready) {
                        return;
                    }
                    if (!Completed) {
                        Completed = [];
                    }
                    for (let i = 0; i < Ready.length; i++) {
                        try {
                            let Cong = Ready[i];
                            let DiTre = 0;
                            if (InProgress && InProgress.includes(Cong)) {
                                DiTre = 1;
                            }
                            connect.query(`UPDATE payroll SET CongLam=CongLam + '2', TongCong=TongCong+'${2*holidayPay}', DiTre=DiTre + '${DiTre}' WHERE Id='${Cong}'`, () => {})
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}