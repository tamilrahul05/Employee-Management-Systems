package com.aku.service;

import java.util.List;

import com.aku.dto.Employeedto;

public interface EmployeeService {
	Employeedto createEmployee(Employeedto empdto);
	Employeedto getEmployeeById(long id);
	List<Employeedto> getAllEmployee();
	Employeedto updateEmployee(long id, Employeedto updateEmpDat);
	void deleteEmployee(long id);
}
