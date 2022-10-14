import { connect } from "../models/qlnvModal.js";

// Lấy tất cả các nhân viên
export const getAllNhanViens = async (req, res) => {
  try {
    connect.query("SELECT * FROM nhan_vien", (err, result) => {
      res.status(200).json(result);
      // res.send(JSON.stringify())
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Thêm mới nhân viên
export const addNewNV = async (req, res) => {
  try {
    const { chucVu, diaChi, gender, mucLuong, sdt, tenNV } = req.body;
    connect.query(
      `INSERT INTO nhan_vien(Id, TenNV, GioiTinh, DiaChi, SDT, ChucVu, MucLuong) VALUES ('null','${tenNV}','${gender}','${diaChi}','${sdt}','${chucVu}','${mucLuong}')`,
      (err, result) => {
        if (result) {
          res.status(200).json({ key: true });
        } else res.status(200).json({ key: false });
      }
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Sửa nhân viên
export const updateNhanVien = async (req, res) => {
  try {
    const { tenNV, sdt, gender, diaChi, chucVu, mucLuong, id } = req.body;
    connect.query(
      `UPDATE nhan_vien SET TenNV='${tenNV}',GioiTinh='${gender}',DiaChi='${diaChi}',SDT='${sdt}',ChucVu='${chucVu}',MucLuong='${mucLuong}' WHERE Id='${id}'`,
      (err, result) => {
        if (result) {
          res.status(200).json({ key: true });
        } else res.status(200).json({ key: false });
      }
    );
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// Xóa nhân viên
export const deleteNV = async (req, res) => {
  try {
    const { id } = req.body;
    connect.query(`DELETE FROM payroll WHERE Id='${id}'`, (err, result) => {
      if (result) {
        connect.query(
          `DELETE FROM nhan_vien WHERE Id='${id}'`,
          (err, result) => {
            if (result) {
              res.status(200).json({ key: true });
            } else res.status(200).json({ key: false });
          }
        );
      } else res.status(200).json({ key: false });
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// SEARCH
export const searchNhanVien = async (req, res) => {
  try {
    const { valueSearch, table } = req.body;
    connect.query(`SELECT * FROM ${table}`, (err, result) => {
      let data = [];
      if (table === "nhan_vien") {
        data = result.filter((value) => {
          return (
            value.TenNV.toLowerCase().includes(valueSearch.toLowerCase()) ||
            value.DiaChi.toLowerCase().includes(valueSearch.toLowerCase()) ||
            value.SDT.toString()
              .toLowerCase()
              .includes(valueSearch.toLowerCase()) ||
            value.ChucVu.toLowerCase().includes(valueSearch.toLowerCase()) ||
            value.MucLuong.toString()
              .toLowerCase()
              .includes(valueSearch.toLowerCase())
          );
        });
      } else if (table === "manage_task") {
        data = result.filter((value) => {
          return (
            value.title.toLowerCase().includes(valueSearch.toLowerCase()) ||
            value.decription.toLowerCase().includes(valueSearch.toLowerCase())
          );
        });
      } else {
        data = result.filter((value) => {
          return (
            value.TenNv.toLowerCase().includes(valueSearch.toLowerCase()) ||
            value.MucLuong.toString()
              .toLowerCase()
              .includes(valueSearch.toLowerCase())
          );
        });
      }

      res.status(200).json(data);
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
