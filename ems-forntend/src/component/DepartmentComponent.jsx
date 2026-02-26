import React, { useEffect, useState } from 'react';
import { createDept, getById, updateDept } from '../service/DepartmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: '',
    });

    const navigator = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (id) {
            getById(id)
                .then((response) => {
                    setDepartmentName(response.data.departmentName);
                    setDepartmentDescription(response.data.departmentDescription);
                })
                .catch((e) => console.log(e));
        }
    }, [id]);

    function saveAndUpdate(e) {
        e.preventDefault();
        if (formValidate()) {
            setSubmitting(true);
            const dept = { departmentName, departmentDescription };
            const action = id ? updateDept(id, dept) : createDept(dept);
            action
                .then(() => navigator('/departments'))
                .catch((e) => { console.log(e); setSubmitting(false); });
        }
    }

    function formValidate() {
        let valid = true;
        const errorCopy = { ...errors };
        if (departmentName.trim()) { errorCopy.departmentName = ''; }
        else { errorCopy.departmentName = 'Department name is required'; valid = false; }
        if (departmentDescription.trim()) { errorCopy.departmentDescription = ''; }
        else { errorCopy.departmentDescription = 'Description is required'; valid = false; }
        setErrors(errorCopy);
        return valid;
    }

    return (
        <div className="ems-page">
            <div className="ems-container">
                <div className="ems-form-card">
                    <div className="ems-card">
                        {/* Icon header */}
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{
                                width: 64, height: 64, margin: '0 auto 16px',
                                background: 'var(--gradient-warn)',
                                borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem',
                                boxShadow: '0 8px 24px rgba(255,179,0,0.35)',
                            }}>
                                {isEditing ? '✏️' : '🏢'}
                            </div>
                            <h2 className="ems-page-title" style={{ textAlign: 'center' }}>
                                {isEditing ? 'Update Department' : 'Add Department'}
                            </h2>
                            <p className="ems-page-subtitle" style={{ textAlign: 'center', marginBottom: 0 }}>
                                {isEditing
                                    ? 'Update the department information below'
                                    : 'Create a new department for your organisation'}
                            </p>
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

                        {/* Form */}
                        <form onSubmit={saveAndUpdate} noValidate>
                            <div className="ems-form-group">
                                <label className="ems-form-label" htmlFor="deptName">Department Name</label>
                                <input
                                    id="deptName"
                                    type="text"
                                    placeholder="e.g. Engineering, Marketing…"
                                    className={`ems-form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                    value={departmentName}
                                    onChange={(e) => setDepartmentName(e.target.value)}
                                />
                                {errors.departmentName && (
                                    <div className="ems-invalid-msg">⚠️ {errors.departmentName}</div>
                                )}
                            </div>

                            <div className="ems-form-group">
                                <label className="ems-form-label" htmlFor="deptDesc">Description</label>
                                <input
                                    id="deptDesc"
                                    type="text"
                                    placeholder="Brief description of the department…"
                                    className={`ems-form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                    value={departmentDescription}
                                    onChange={(e) => setDepartmentDescription(e.target.value)}
                                />
                                {errors.departmentDescription && (
                                    <div className="ems-invalid-msg">⚠️ {errors.departmentDescription}</div>
                                )}
                            </div>

                            <div className="ems-form-actions">
                                <button
                                    id="submit-dept-btn"
                                    type="submit"
                                    className="ems-btn ems-btn-success"
                                    disabled={submitting}
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    {submitting ? '⏳ Saving…' : isEditing ? '✅ Update Department' : '✅ Save Department'}
                                </button>
                                <button
                                    id="back-dept-btn"
                                    type="button"
                                    className="ems-btn ems-btn-ghost"
                                    onClick={() => navigator('/departments')}
                                >
                                    ← Back
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DepartmentComponent;