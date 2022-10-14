import { connect } from '../models/qlnvModal.js';

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
        const { title, decription, status } = req.body;
        connect.query(`INSERT INTO manage_task(Id, title, decription, status) VALUES ('null', '${title}','${decription}','${status}')`, 
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
        const { Id, title, decription, status } = req.body;
        connect.query(`UPDATE manage_task SET title='${title}',decription='${decription}',status='${status}' WHERE Id='${Id}'`, 
            (err, result) => {
                if(result) {
                    res.status(200).json({ key: true });
                }else res.status(200).json({ key: false });
        })
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