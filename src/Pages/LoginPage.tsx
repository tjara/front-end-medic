import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { classNames } from 'primereact/utils';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';

import illustration from '../Assets/Img/undraw_medical_care_movn.svg'
import { Link } from 'react-router-dom';

import { loginUser } from '../Services/UserService';
import { useDispatch } from "react-redux";
import { setItems } from '../Features/UserSlice';

const LoginPage = () => {
    const toast = useRef<any>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const showInfo = (msg: any) => {
        toast.current?.show({ severity: 'info', summary: 'Info Message', detail: msg, life: 3000 });
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            accept: false
        },
        validate: (data) => {
            const errors: any = {};

            if (!data.username) {
                errors.username = 'User is required.';
            }

            if (!data.password) {
                errors.password = 'Password is required.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            const response = await loginUser(data);
            if (response.message) {
                showInfo(JSON.stringify(response.message));
            } else {
                dispatch(setItems(response));
                navigate("/", { replace: true });
            }
            formik.resetForm();
        }
    });

    const isFormFieldValid = (name: string) => !!(formik.touched[name as keyof typeof formik.initialValues] && formik.errors[name as keyof typeof formik.initialValues]);
    const getFormErrorMessage = (name: string) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof typeof formik.initialValues]}</small>;
    };

    return (
        <div className="grid grid-cols-2">
            <Toast ref={toast} />
            <div className='bg-indigo-300 w-50 h-screen grid content-center'>
                <img className='mx-auto w-2/3 h-2/3' src={illustration} alt="illustration" />
            </div>
            <div className='bg-slate-50 h-screen'>
                <div className="grid place-items-center h-screen">
                    <div className="flex justify-content-center">
                        <div className="font-sans font-semibold">
                            <h5 className="text-lefttracking-wide text-2xl">Login</h5>
                            <form onSubmit={formik.handleSubmit} className="p-fluid">
                                <div className="py-5 mt-5">
                                    <span className="p-float-label p-input-icon-right">
                                        <i className="pi pi-envelope" />
                                        <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                                        <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>User*</label>
                                    </span>
                                    {getFormErrorMessage('username')}
                                </div>
                                <div className="py-5">
                                    <span className="p-float-label">
                                        <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} feedback={false} toggleMask
                                            className={classNames({ 'p-invalid': isFormFieldValid('password') })} />
                                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
                                    </span>
                                    {getFormErrorMessage('password')}
                                </div>

                                <Button label="Login" type='submit' className="p-button-raised mt-2" />
                            </form>
                            <div className='text-center'>
                                <Divider />
                                <Link to='/signup'><Button label="Don't have an account yet? Sing Up" className="p-button-link font-extralight" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage