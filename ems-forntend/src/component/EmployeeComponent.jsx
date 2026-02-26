import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService';

const EmployeeComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { id } = useParams();
    const navigator = useNavigate();
    const isEditing = Boolean(id);

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
                .catch((error) => console.log(error));
        }
    }, [id]);

    function saveOrUpdateEmployee(e) {
        e.preventDefault();
        if (formValidate()) {
            setSubmitting(true);
            const employee = { firstName, lastName, email };
            const action = id
                ? updateEmployee(id, employee)
                : createEmployee(employee);
            action
                .then(() => navigator('/employees'))
                .catch((err) => { console.log(err); setSubmitting(false); });
        }
    }

    function formValidate() {
        let valid = true;
        const errorCopy = { ...errors };
        if (firstName.trim()) { errorCopy.firstName = ''; }
        else { errorCopy.firstName = 'First name is required'; valid = false; }
        if (lastName.trim()) { errorCopy.lastName = ''; }
        else { errorCopy.lastName = 'Last name is required'; valid = false; }
        if (email.trim()) { errorCopy.email = ''; }
        else { errorCopy.email = 'Email is required'; valid = false; }
        setErrors(errorCopy);
        return valid;
    }

    return (
        <div className="ems-page">
            <div className="ems-container">
                <div className="ems-form-card">

                    {/* Card */}
                    <div className="ems-card">
                        {/* Icon header */}
                        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                            <div style={{
                                width: 64, height: 64, margin: '0 auto 16px',
                                background: 'var(--gradient-main)',
                                borderRadius: '20px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '1.8rem',
                                boxShadow: '0 8px 24px rgba(108,99,255,0.4)',
                            }}>
                                {isEditing ? '✏️' : '➕'}
                            </div>
                            <h2 className="ems-page-title" style={{ textAlign: 'center' }}>
                                {isEditing ? 'Update Employee' : 'Add New Employee'}
                            </h2>
                            <p className="ems-page-subtitle" style={{ textAlign: 'center', marginBottom: 0 }}>
                                {isEditing
                                    ? 'Make changes to the employee record below'
                                    : 'Fill in the details to onboard a new team member'}
                            </p>
                        </div>

                        {/* Divider */}
                        <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

                        {/* Form */}
                        <form onSubmit={saveOrUpdateEmployee} noValidate>
                            <div className="ems-form-group">
                                <label className="ems-form-label" htmlFor="firstName">First Name</label>
                                <input
                                    id="firstName"
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
                                <label className="ems-form-label" htmlFor="lastName">Last Name</label>
                                <input
                                    id="lastName"
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
                                <label className="ems-form-label" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
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
                                    id="submit-employee-btn"
                                    type="submit"
                                    className="ems-btn ems-btn-success"
                                    disabled={submitting}
                                    style={{ flex: 1, justifyContent: 'center' }}
                                >
                                    {submitting ? '⏳ Saving…' : isEditing ? '✅ Update Employee' : '✅ Save Employee'}
                                </button>
                                <button
                                    id="back-employee-btn"
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

export default EmployeeComponent;