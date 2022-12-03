import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getMucLuongNhanVienById } from "../../api";
import { useStore } from "../../hooks";
import { setToastMesagae } from "../../reducers/action";

function ModalBangLuong({ payroll }) {

    const dispatch = useStore()[1];
    const [state, setState] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getMucLuongNhanVienById({id: payroll.Id});
            const { data } = response;
            if (!data.key) {
                dispatch(setToastMesagae({
                    title: 'Lỗi',
                    message: 'Lỗi lấy danh sách bảng lương!',
                    type: 'error',
                }));
                return;
            }
            const {MucLuong} = data.data;
            let cong = Number((MucLuong/1).toFixed());

            const CongLam = {
                label: "Tổng số công làm:",
                count: payroll.CongLam,
                result: (payroll.CongLam*cong)
            }

            const TangCa = {
                label: "Tổng số công tăng ca (150%):",
                count: payroll.TangCa,
                result: ((payroll.TangCa + (payroll.TangCa/2))*cong)
            }
            const cong10PhanTram = Number(((cong/100)*10).toFixed());
            const amLuong = (cong10PhanTram*payroll.DiTre)
            const DiTre = {
                label: "Đi trễ -10%/ca:",
                count: payroll.DiTre,
                result: `-${amLuong}`
            }

            const space = {
                label: "",
                count: "",
                result: ``
            }

            const result = {
                label: "Tổng lương thực lãnh:",
                count: "",
                result: (CongLam.result + TangCa.result) - amLuong
            }

            setState([CongLam, TangCa, DiTre, space, result])
        }

        fetchData();
    }, []);
    
    return (<Box display='flex' flexDirection='column' padding='8px'>
        {
            state.map((val, index) => (<Box key={index} display='flex'>
                <label>{val.label}&nbsp;</label>
                <h4 style={{margin: 0}}>{val.count}</h4>
                <label>&nbsp;{val.label ? '=>' : ''}&nbsp;</label>
                <h4 style={{margin: 0}}>{val.result}</h4>
            </Box>))
        }
    </Box>)
}

export default ModalBangLuong;