import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/employees';
const allEmployee = REST_API_BASE_URL + '/allEmployee';

export const listEmployeeUrl = () => axios.get(allEmployee);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL+'/addEmployee', employee);

export const deleteEmployee = (employeeId) => axios.delete(REST_API_BASE_URL+'/deleteEmployee'+'/'+employeeId);

export const getEmployee = (employeeId) => axios.get(REST_API_BASE_URL+'/'+employeeId);

export const updateEmployee = (empId, employee) => axios.put(REST_API_BASE_URL+'/updateEmployee/'+empId, employee);
