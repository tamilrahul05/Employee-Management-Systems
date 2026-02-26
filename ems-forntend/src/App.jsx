import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import FooterComponent from './component/FooterComponent';
import Headercomponent from './component/Headercomponent';
import ListEmployee from './component/ListEmployee';
import EmployeeComponent from './component/EmployeeComponent';
import ListDepartmentComponent from './component/ListDepartmentComponent';
import DepartmentComponent from './component/DepartmentComponent';

function App() {
  return (
    <BrowserRouter>
      <Headercomponent />

      <Routes>
        {/* Home → Employees list */}
        <Route path="/" element={<ListEmployee />} />
        <Route path="/employees" element={<ListEmployee />} />
        <Route path="/add-employee" element={<EmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<EmployeeComponent />} />

        {/* Departments */}
        <Route path="/departments" element={<ListDepartmentComponent />} />
        <Route path="/add-dept" element={<DepartmentComponent />} />
        <Route path="/edit-dept/:id" element={<DepartmentComponent />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
