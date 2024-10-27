// src/components/Checklists/ChecklistForm.jsx

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../UI/Loader';

const ChecklistSchema = Yup.object().shape({
  name: Yup.string()
    .required('Le nom de la checklist est requis'),
  frequency: Yup.string()
    .required('La fréquence est requise'),
  items: Yup.array()
    .of(
      Yup.object().shape({
        number: Yup.number()
          .required('Le numéro est requis'),
        description: Yup.string()
          .required('La description est requise'),
      })
    )
    .min(1, 'Au moins un item est requis'),
});

const ChecklistForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [initialValues, setInitialValues] = useState({
    name: '',
    frequency: '',
    items: [{ number: 1, description: '' }],
  });
  const [loading, setLoading] = useState(isEdit);

  const fetchChecklist = async () => {
    try {
      const response = await api.get(`/qhse/checklists/${id}`);
      const { name, frequency, items } = response.data;
      setInitialValues({
        name,
        frequency,
        items: items.map(item => ({ number: item.number, description: item.description })),
      });
    } catch (error) {
      console.error('Erreur lors de la récupération de la checklist', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchChecklist();
    }
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      if (isEdit) {
        await api.put(`/qhse/checklists/${id}`, values);
        alert('Checklist mise à jour avec succès!');
      } else {
        await api.post('/qhse/checklists', values);
        alert('Checklist créée avec succès!');
      }
      navigate('/checklists');
    } catch (error) {
      console.error('Erreur lors de la soumission de la checklist', error);
      if (error.response && error.response.data) {
        setErrors({ submit: error.response.data.message });
      } else {
        setErrors({ submit: 'Erreur lors de la soumission de la checklist.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-5">
      <h2>{isEdit ? 'Modifier la Checklist' : 'Créer une Checklist'}</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={ChecklistSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
            {errors.submit && (
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Nom</label>
              <Field type="text" name="name" className="form-control" id="name" />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>

            <div className="mb-3">
              <label htmlFor="frequency" className="form-label">Fréquence</label>
              <Field as="select" name="frequency" className="form-select" id="frequency">
                <option value="">Sélectionner</option>
                <option value="Mensuelle">Mensuelle</option>
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Annuel">Annuel</option>
              </Field>
              <ErrorMessage name="frequency" component="div" className="text-danger" />
            </div>

            <FieldArray name="items">
              {({ insert, remove, push }) => (
                <div>
                  <h4>Items</h4>
                  {values.items.length > 0 &&
                    values.items.map((item, index) => (
                      <div className="card mb-3" key={index}>
                        <div className="card-body">
                          <div className="mb-3">
                            <label htmlFor={`items.${index}.number`} className="form-label">Numéro</label>
                            <Field
                              name={`items.${index}.number`}
                              type="number"
                              className="form-control"
                              id={`items.${index}.number`}
                            />
                            <ErrorMessage
                              name={`items.${index}.number`}
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor={`items.${index}.description`} className="form-label">Description</label>
                            <Field
                              name={`items.${index}.description`}
                              type="text"
                              className="form-control"
                              id={`items.${index}.description`}
                            />
                            <ErrorMessage
                              name={`items.${index}.description`}
                              component="div"
                              className="text-danger"
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => remove(index)}
                          >
                            Supprimer l'Item
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => push({ number: values.items.length + 1, description: '' })}
                  >
                    Ajouter un Item
                  </button>
                  <ErrorMessage name="items" component="div" className="text-danger" />
                </div>
              )}
            </FieldArray>

            <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
              {isSubmitting ? (isEdit ? 'Mise à jour...' : 'Création...') : (isEdit ? 'Mettre à jour' : 'Créer')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChecklistForm;
