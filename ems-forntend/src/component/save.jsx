import React, { useState, useEffect } from 'react';
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const Save = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { id } = useParams();
    const isEditing = Boolean(id);
    const navigator = useNavigate();

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        if (id) {
            getEmployee(id)
                .then((response) => {
                    setFirstName(response.data.firstName);
                    setLastName(response.data.lastName);
                    setEmail(response.data.email);
                })
                .catch((error) => console.error(error));
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (validateForm()) {
            setSubmitting(true);
            const employee = { firstName, lastName, email };
            const action = id
                ? updateEmployee(id, employee)
                : createEmployee(employee);
            action
                .then(() => navigator('/employees'))
                .catch((error) => { console.error(error); setSubmitting(false); });
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) { errorsCopy.firstName = ''; }
        else { errorsCopy.firstName = 'First name is required'; valid = false; }

        if (lastName.trim()) { errorsCopy.lastName = ''; }
        else { errorsCopy.lastName = 'Last name is required'; valid = false; }

        if (email.trim()) { errorsCopy.email = ''; }
        else { errorsCopy.email = 'Email is required'; valid = false; }

        setErrors(errorsCopy);
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
                                background: 'linear-gradient(135deg, #6c63ff 0%, #00d4ff 100%)',
                                borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem',
                                boxShadow: '0 8px 24px rgba(108,99,255,0.4)',
                            }}>
                                {isEditing ? '✏️' : '➕'}
                            </div>
                            <h2 className="ems-page-title" style={{ textAlign: 'center' }}>
                                {isEditing ? 'Update Employee' : 'Add Employee'}
                            </h2>
                            <p className="ems-page-subtitle" style={{ textAlign: 'center', marginBottom: 0 }}>
                                {isEditing
                                    ? 'Modify the employee record below'
                                    : 'Fill in the details to add a new team member'}
                            </p>
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', marginBottom: 28 }} />

                        {/* Form */}
                        <form onSubmit={saveOrUpdateEmployee} noValidate>
                            <div className="ems-form-group">
                                <label className="ems-form-label" htmlFor="save-firstName">First Name</label>
                                <input
                                    id="save-firstName"
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    className={`ems-form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && (
                                    <div className="ems-invalid-msg">⚠️ {errors.firstName}</div>
                                )}
                            </div>

                            <div className="ems-form-group">
                                <label className="ems-form-label" htmlFor="save-lastName">Last Name</label>
                                <input
                                    id="save-lastName"
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    className={`ems-form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && (
                                    <div className="ems-invalid-msg">⚠️ {errors.lastName}</div>
                                )}
                            </div>

                            <div className="ems-form-group">
                                <label className="ems-form-label" htmlFor="save-email">Email Address</label>
                                <input
                                    id="save-email"
                                    type="email"
                                    placeholder="employee@company.com"
                                    value={email}
                                    className={`ems-form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="ems-invalid-msg">⚠️ {errors.email}</div>
                                )}
                            </div>

                            <div className="ems-form-actions">
                                <button
                                    id="save-submit-btn"
                                    type="submit"
                                    className="ems-btn ems-btn-success"
                                    disabled={submitting}
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    {submitting ? '⏳ Saving…' : isEditing ? '✅ Update Employee' : '✅ Save Employee'}
                                </button>
                                <button
                                    id="save-back-btn"
                                    type="button"
                                    className="ems-btn ems-btn-ghost"
                                    onClick={() => navigator('/employees')}
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

export default Save;
