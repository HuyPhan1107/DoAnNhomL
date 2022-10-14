import Dashboard from "../Dashboard";
import Drawable from "../Drawable";
import Header from "../Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageTask from "../ManageTask";
import { useStore } from "../../hooks";
import Payroll from "../Payroll";

function LayoutOrigin() {

    const [state] = useStore();
    const { userLogin } = state;

    return(<BrowserRouter>
        <Header />
        <Drawable />
        <main style={{margin: 12}}>
                <Routes>
                    <Route element={<Dashboard />} exact={true} path='/'></Route>

                    {
                        userLogin ? 
                        <>
                            <Route element={
                                <ManageTask />
                            } exact={true} path='/manage-task'></Route>
                            <Route element={
                                <Payroll />
                            } exact={true} path='/payroll'></Route>
                        </>
                        : null
                    }

                    <Route element={
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <h2>Trang này hiện tại không có!</h2>
                        </div>
                    } path='*'></Route>
                </Routes>
        </main>
    </BrowserRouter>)
}

export default LayoutOrigin;