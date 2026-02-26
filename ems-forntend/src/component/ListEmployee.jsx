import React, { useEffect, useState } from 'react';
import { deleteEmployee, listEmployeeUrl } from '../service/EmployeeService';
import { useNavigate } from 'react-router-dom';

const ListEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deleting, setDeleting] = useState(null);

    const navigator = useNavigate();

    useEffect(() => {
        getAllEmployee();
    }, []);

    function getAllEmployee() {
        setLoading(true);
        listEmployeeUrl()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => a.id - b.id);
                setEmployees(sorted);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }

    function updateEmployee(id) {
        navigator(`/edit-employee/${id}`);
    }

    function removeEmployee(id) {
        setDeleting(id);
        deleteEmployee(id)
            .then(() => getAllEmployee())
            .catch((error) => console.error(error))
            .finally(() => setDeleting(null));
    }

    function addNewEmployee() {
        navigator('/add-employee');
    }

    const getInitials = (first = '', last = '') =>
        `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

    const filtered = employees.filter((emp) =>
        `${emp.firstName} ${emp.lastName} ${emp.email}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="ems-page">
            <div className="ems-container">

                {/* Stats Row */}
                <div className="ems-stats-bar">
                    <div className="ems-stat-card">
                        <div className="ems-stat-value">{employees.length}</div>
                        <div className="ems-stat-label">Total Employees</div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="ems-card">
                    {/* Section Header */}
                    <div className="ems-section-header">
                        <div>
                            <h2 className="ems-page-title">Employee Directory</h2>
                            <p className="ems-page-subtitle">Manage your team members in one place</p>
                        </div>
                        <button
                            id="add-employee-btn"
                            className="ems-btn ems-btn-primary"
                            onClick={addNewEmployee}
                        >
                            <span>＋</span> Add Employee
                        </button>
                    </div>

                    {/* Search */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            id="employee-search"
                            type="text"
                            className="ems-form-control"
                            placeholder="🔍  Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ maxWidth: '360px' }}
                        />
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="ems-empty">
                            <div className="ems-empty-icon">⏳</div>
                            <p>Loading employees…</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="ems-empty">
                            <div className="ems-empty-icon">👤</div>
                            <p>No employees found. Add your first team member!</p>
                        </div>
                    ) : (
                        <div className="ems-table-wrap">
                            <table className="ems-table" aria-label="Employee list">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Employee</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((employee, index) => (
                                        <tr key={employee.id}>
                                            <td>
                                                <span className="ems-id-badge">{index + 1}</span>
                                            </td>
                                            <td>
                                                <div className="ems-name-cell">
                                                    <div className="ems-avatar">
                                                        {getInitials(employee.firstName, employee.lastName)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600 }}>
                                                            {employee.firstName} {employee.lastName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ color: '#8892b0' }}>{employee.email}</td>
                                            <td>
                                                <span className="ems-tag ems-tag-green">Active</span>
                                            </td>
                                            <td>
                                                <div className="ems-action-cell">
                                                    <button
                                                        id={`edit-emp-${employee.id}`}
                                                        className="ems-btn ems-btn-warn"
                                                        style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                                                        onClick={() => updateEmployee(employee.id)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        id={`del-emp-${employee.id}`}
                                                        className="ems-btn ems-btn-danger"
                                                        style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                                                        onClick={() => removeEmployee(employee.id)}
                                                        disabled={deleting === employee.id}
                                                    >
                                                        {deleting === employee.id ? '…' : '🗑️ Delete'}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListEmployee;