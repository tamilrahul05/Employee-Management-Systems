import React, { useEffect, useState } from 'react';
import { deleteDept, departmentList } from '../service/DepartmentService';
import { useNavigate } from 'react-router-dom';

const ListDepartmentComponent = () => {
    const [department, setDepartment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [deleting, setDeleting] = useState(null);

    const navigator = useNavigate();

    function getAllDept() {
        setLoading(true);
        departmentList()
            .then((response) => {
                const sorted = [...response.data].sort((a, b) => a.id - b.id);
                setDepartment(sorted);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });
    }

    useEffect(() => {
        getAllDept();
    }, []);

    function createDept() {
        navigator('/add-dept');
    }

    function removeDept(id) {
        setDeleting(id);
        deleteDept(id)
            .then(() => getAllDept())
            .catch((e) => console.log(e))
            .finally(() => setDeleting(null));
    }

    function editDept(id) {
        navigator(`/edit-dept/${id}`);
    }

    const deptIcons = ['🏢', '💼', '🔧', '📊', '🎨', '🔬', '💡', '🚀'];

    const filtered = department.filter((d) =>
        `${d.departmentName} ${d.departmentDescription}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <div className="ems-page">
            <div className="ems-container">

                {/* Stats */}
                <div className="ems-stats-bar">
                    <div className="ems-stat-card">
                        <div
                            className="ems-stat-value"
                            style={{ background: 'linear-gradient(135deg, #ffb300 0%, #ff6f00 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                        >
                            {department.length}
                        </div>
                        <div className="ems-stat-label">Total Departments</div>
                    </div>
                </div>

                {/* Main Card */}
                <div className="ems-card">
                    {/* Header */}
                    <div className="ems-section-header">
                        <div>
                            <h2 className="ems-page-title">Departments</h2>
                            <p className="ems-page-subtitle">Organize your company structure</p>
                        </div>
                        <button
                            id="add-dept-btn"
                            className="ems-btn ems-btn-primary"
                            onClick={createDept}
                        >
                            ＋ Add Department
                        </button>
                    </div>

                    {/* Search */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            id="dept-search"
                            type="text"
                            className="ems-form-control"
                            placeholder="🔍  Search departments…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ maxWidth: '360px' }}
                        />
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="ems-empty">
                            <div className="ems-empty-icon">⏳</div>
                            <p>Loading departments…</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="ems-empty">
                            <div className="ems-empty-icon">🏢</div>
                            <p>No departments found. Create your first department!</p>
                        </div>
                    ) : (
                        <div className="ems-table-wrap">
                            <table className="ems-table" aria-label="Department list">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Department</th>
                                        <th>Description</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.map((dep, idx) => (
                                        <tr key={dep.id}>
                                            <td>
                                                <span className="ems-id-badge">{idx + 1}</span>
                                            </td>
                                            <td>
                                                <div className="ems-name-cell">
                                                    <div
                                                        className="ems-avatar"
                                                        style={{ background: 'linear-gradient(135deg, #ffb300 0%, #ff6f00 100%)', fontSize: '1rem' }}
                                                    >
                                                        {deptIcons[idx % deptIcons.length]}
                                                    </div>
                                                    <span style={{ fontWeight: 600 }}>{dep.departmentName}</span>
                                                </div>
                                            </td>
                                            <td style={{ color: '#8892b0', maxWidth: 280 }}>
                                                {dep.departmentDescription}
                                            </td>
                                            <td>
                                                <div className="ems-action-cell">
                                                    <button
                                                        id={`edit-dept-${dep.id}`}
                                                        className="ems-btn ems-btn-warn"
                                                        style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                                                        onClick={() => editDept(dep.id)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        id={`del-dept-${dep.id}`}
                                                        className="ems-btn ems-btn-danger"
                                                        style={{ padding: '7px 14px', fontSize: '0.8rem' }}
                                                        onClick={() => removeDept(dep.id)}
                                                        disabled={deleting === dep.id}
                                                    >
                                                        {deleting === dep.id ? '…' : '🗑️ Delete'}
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

export default ListDepartmentComponent;