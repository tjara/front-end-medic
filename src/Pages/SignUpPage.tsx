import React, { useState } from 'react';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Name is required.'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .required('Password is required.'),
  email: Yup.string().email('Invalid email address. E.g. example@email.com').required('Email is required.'),
});

const SignUpPage = () => {
  const [showMessage, setShowMessage] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      phone_number: '',
      accept: false
    },
    validationSchema: SignupSchema,
    onSubmit: (data) => {
      setShowMessage(true);
      console.log(data);
      formik.resetForm();
    }
  });

  const isFormFieldValid = (name: string) => !!(formik.touched[name as keyof typeof formik.initialValues] && formik.errors[name as keyof typeof formik.initialValues]);
  const getFormErrorMessage = (name: string) => {
    return isFormFieldValid(name) && <small className="p-error">{formik.errors[name as keyof typeof formik.initialValues]}</small>;
  };

  const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="justify-center grid content-center h-screen">
      <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" footer={dialogFooter} showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
          <h5>Registration Successful!</h5>
          {/* <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p> */}
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="font-sans font-semibold">
          <h5 className="text-lefttracking-wide text-2xl">Register</h5>
          <form onSubmit={formik.handleSubmit} className="p-fluid">
            <div className="py-3 mt-5">
              <span className="p-float-label">
                <InputText id="username" name="username" value={formik.values.username} onChange={formik.handleChange} autoFocus className={classNames({ 'p-invalid': isFormFieldValid('username') })} />
                <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid('username') })}>User Name*</label>
              </span>
              {getFormErrorMessage('username')}
            </div>
            <div className="py-3 mt-1">
              <span className="p-float-label">
                <Password id="password" name="password" value={formik.values.password} onChange={formik.handleChange} toggleMask
                  className={classNames({ 'p-invalid': isFormFieldValid('password') })} header={passwordHeader} footer={passwordFooter} />
                <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid('password') })}>Password*</label>
              </span>
              {getFormErrorMessage('password')}
            </div>
            <div className="py-3 mt-5">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-user" />
                <InputText id="name" name="name" value={formik.values.name} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('name') })} />
                <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid('name') })}>Name*</label>
              </span>
              {getFormErrorMessage('name')}
            </div>
            <div className="py-3 mt-1">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <InputText id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('email') })} />
                <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid('email') })}>Email*</label>
              </span>
              {getFormErrorMessage('email')}
            </div>
            <div className="py-3 mt-5">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-phone" />
                <InputText id="phone_number" name="phone_number" value={formik.values.phone_number} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('phone_number') })} />
                <label htmlFor="phone_number" className={classNames({ 'p-error': isFormFieldValid('phone_number') })}>Phone number*</label>
              </span>
              {getFormErrorMessage('phone_number')}
            </div>
            <div className="flex justify-content-center mb-5 mt-5">
              <Checkbox inputId="accept" name="accept" checked={formik.values.accept} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('accept'), 'py-1': true, 'mr-1': true })} />
              <label htmlFor="accept" className={classNames({ 'p-error': isFormFieldValid('accept') })}> I agree to the terms and conditions*</label>
            </div>

            <Button type="submit" label="Register" className="p-button-raised" />
          </form>
          <div className='text-center'>
            <Divider />
            <Link to='/'><Button label="I already have an account" className="p-button-link" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage