// src/components/Auth/Signin.jsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email invalide!')
    .required('Email requis'),
  password: Yup.string()
    .min(6, 'Mot de passe trop court!')
    .required('Mot de passe requis'),
});

const Signin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Submitting values:', values);
    try {
      const data = await authService.signin(values);
      setAuth(data);
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de login', error);

      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Erreur lors de la connexion.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Connexion</h2>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={SigninSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            {errors.submit && (
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <Field type="email" name="email" className="form-control" id="email" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <Field type="password" name="password" className="form-control" id="password" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Connexion...' : 'Se connecter'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
