import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/departments';

export const departmentList = () => axios.get(REST_API_BASE_URL+'/getDepts');

export const createDept = (dept) => axios.post(REST_API_BASE_URL+'/addDept', dept);

export const deleteDept = (deptId) =>axios.delete(REST_API_BASE_URL+'/deletedept/'+deptId);

export const getById = (id) => axios.get(REST_API_BASE_URL+'/getbyid/'+id);

export const updateDept = (id, dept) => axios.put(REST_API_BASE_URL+'/updatedept/'+id, dept);