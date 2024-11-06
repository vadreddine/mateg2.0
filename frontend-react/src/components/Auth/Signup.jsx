// src/components/Auth/Signup.jsx

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Nom d\'utilisateur trop court!')
    .max(50, 'Nom d\'utilisateur trop long!')
    .required('Nom d\'utilisateur requis'),
  email: Yup.string()
    .email('Email invalide!')
    .required('Email requis'),
  password: Yup.string()
    .min(6, 'Mot de passe trop court!')
    .required('Mot de passe requis'),
  roles: Yup.array().of(Yup.string()),
});

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    console.log('Submitting values:', values);

    try {
      await authService.signup(values);
      alert('Inscription réussie!');
      navigate('/signin');
    } catch (error) {
      console.error('Erreur lors de l inscription', error);

      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Erreur lors de l\'inscription.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Inscription</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          roles: ['user'],
        }}
        validationSchema={SignupSchema}
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
              <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
              <Field type="text" name="username" className="form-control" id="username" />
              <ErrorMessage name="username" component="div" className="text-danger" />
            </div>

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

            {/* Optionnel : Sélection des rôles */}
            <div className="mb-3">
              <label htmlFor="roles" className="form-label">Rôles</label>
              <Field as="select" name="roles" multiple className="form-select" id="roles">
                <option value="user">Utilisateur</option>
                <option value="admin">Administrateur</option>
                <option value="moderator">Modérateur</option>
              </Field>
              <ErrorMessage name="roles" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Inscription...' : 'S\'inscrire'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
