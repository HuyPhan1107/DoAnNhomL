import { connect } from '../models/qlnvModal.js';
import { updatePayrollFromTask } from './payroll.js';

// Get
export const getTasks = async (req, res) => {
    try {
        connect.query(`SELECT * FROM manage_task`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true, result });
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Insert
export const insertTask = async (req, res) => {
    try {
        const { title, decription, status, correspondingPosition } = req.body;
        connect.query(`INSERT INTO manage_task(Id, title, decription, status, correspondingPosition, json_timekeeping, holidayPay) VALUES (NULL, '${title}','${decription}','${status}', '${correspondingPosition}', '', '1')`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true });
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Update
export const updateTask = async (req, res) => {
    try {
        const { Id, title, decription, status, correspondingPosition, holidayPay, Done } = req.body;
        if (Done) {
            await updatePayrollFromTask(Id);
            connect.query(`UPDATE manage_task SET status='${status}', json_timekeeping='', holidayPay='1' WHERE Id='${Id}'`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true });
                }else res.status(200).json({ key: false });
            })
        } else {
            if (status === 3) {
                await updatePayrollFromTask(Id);
            }
            connect.query(`UPDATE manage_task SET title='${title}',decription='${decription}',status='${status}', correspondingPosition='${correspondingPosition}', holidayPay='${holidayPay}' WHERE Id='${Id}'`, 
                (err, result) => {
                    if(result) {
                        res.status(200).json({ key: true });
                    }else res.status(200).json({ key: false });
            })
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// Delete
export const deleteTask = async (req, res) => {
    try {
        const { Id } = req.body;
        connect.query(`DELETE FROM manage_task WHERE Id='${Id}'`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true });
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

// set Json Timekeeping
export const setJsonTimekeeping = async (req, res) => {
    try {
        const { listId, Id } = req.body;
        connect.query(`UPDATE manage_task SET json_timekeeping='${listId}' WHERE Id='${Id}'`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true });
                } else res.status(200).json({ key: false, err });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}

export const getTaskById = async (req, res) => {
    const {Id} = req.body;
    try {
        connect.query(`SELECT * FROM manage_task WHERE Id = ${Id}`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true, result });
                }else res.status(200).json({ key: false });
        })
    } catch (e) {
        res.status(500).json({ error: e });
    }
}