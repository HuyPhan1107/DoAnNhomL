import { Box, Checkbox, Grid } from '@mui/material';
import { useState } from 'react';
import { getAllPayrolls, updateCongLam } from '../../api';
import { useStore } from '../../hooks';
import { setListPayroll, setToastMesagae } from '../../reducers/action';

function ModalPayroll({ Id, congLam }) {

    const [stateCongLam, setCongLam] = useState(congLam)
    const dispatch = useStore()[1];

    const handleChange = async indexUpdate => {

        const newCongLam = stateCongLam.map((value, index) => {
            if(indexUpdate === index) {
                return value === '1' ? '0' :'1'
            }
            return value
        })

        const response = await updateCongLam({
            congLam: newCongLam,
            id: Id
        })

        if(response.data.key) {
            setCongLam(newCongLam);
            const response = await getAllPayrolls();
            const { data } = response;
            dispatch(setListPayroll(data));

            dispatch(setToastMesagae({
                title: 'Thành công',
                message: 'Đã cập nhật lại số công làm!',
                type: 'success',
            }));
        }else {
            dispatch(setToastMesagae({
                title: 'Lỗi',
                message: 'Cập nhật thất bại lỗi client or server',
                type: 'error',
            }));
        }
    }

    return <Grid container>
        {
            stateCongLam.map((congLam, index) => {
                if(index === 0) return null;

                const date = new Date()
                const ngay = date.getDate();

                if(index > ngay) {
                    return (<Grid mt={2} item xs={2} sm={2} key={index}>
                        <Box>
                            Ngày {index} - 
                            <Checkbox
                                disabled
                                checked={Number(congLam) === 1 ? true : false}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </Box>
                    </Grid>)
                }

                return (<Grid mt={2} item xs={2} sm={2} key={index}>
                    <Box>
                        Ngày {index} - 
                        <Checkbox
                            checked={Number(congLam) === 1 ? true : false}
                            onChange={() => handleChange(index)}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    </Box>
                </Grid>)
            })
        }
    </Grid>
};

export default ModalPayroll;