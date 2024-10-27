// src/components/Checklists/FillChecklist.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import Loader from '../UI/Loader';

const FillChecklistSchema = Yup.object().shape({
  items: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      description: Yup.string().required(),
      completed: Yup.boolean(),
      comment: Yup.string().optional(),
    })
  ),
});

const FillChecklist = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchChecklist = async () => {
    try {
      const response = await api.get(`/qhse/checklists/${id}`);
      setChecklist(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération de la checklist', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChecklist();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await api.post(`/qhse/checklists/${id}/fill`, values);
      alert('Checklist remplie avec succès!');
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

  if (!checklist) return <p>Checklist non trouvée.</p>;

  return (
    <div className="container mt-5">
      <h2>Remplir la Checklist : {checklist.name}</h2>
      <Formik
        initialValues={{
          items: checklist.items.map(item => ({
            id: item.id,
            description: item.description,
            completed: false,
            comment: '',
          })),
        }}
        validationSchema={FillChecklistSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors }) => (
          <Form>
            {errors.submit && (
              <div className="alert alert-danger" role="alert">
                {errors.submit}
              </div>
            )}
            {values.items.map((item, index) => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body">
                  <div className="form-check mb-2">
                    <Field
                      type="checkbox"
                      name={`items.${index}.completed`}
                      className="form-check-input"
                      id={`items.${index}.completed`}
                    />
                    <label className="form-check-label" htmlFor={`items.${index}.completed`}>
                      {item.description}
                    </label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`items.${index}.comment`} className="form-label">Commentaire (optionnel)</label>
                    <Field
                      as="textarea"
                      name={`items.${index}.comment`}
                      className="form-control"
                      id={`items.${index}.comment`}
                      rows="2"
                    />
                    <ErrorMessage name={`items.${index}.comment`} component="div" className="text-danger" />
                  </div>
                </div>
              </div>
            ))}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Soumission...' : 'Soumettre la Checklist'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FillChecklist;
