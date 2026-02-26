package com.aku.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.aku.dto.Employeedto;
import com.aku.entity.Employee;
import com.aku.exception.ResourceNotFoundException;
import com.aku.repository.EmployeeRepository;
import com.aku.service.EmployeeService;
import com.aku.mapper.EmployeeMaper;

@Service
public class EmployeeServiceImpl implements EmployeeService{
	private EmployeeRepository empRe;
	
	public EmployeeServiceImpl(EmployeeRepository emper) {
		this.empRe = emper;
	}

	@Override
	public Employeedto createEmployee(Employeedto empdto) {
		Employee emp = EmployeeMaper.mapToEmployee(empdto);
		Employee saveEmp = empRe.save(emp);
		return EmployeeMaper.mapToEmployeedto(saveEmp);
	}

	@Override
	public Employeedto getEmployeeById(long id) {
		Employee emp = empRe.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee ID: "+ id+" not Found"));
		return EmployeeMaper.mapToEmployeedto(emp);
	}

	@Override
	public List<Employeedto> getAllEmployee() {
		List<Employee> listEmp = empRe.findAll();
		return listEmp.stream().map(listemp -> EmployeeMaper.mapToEmployeedto(listemp)).collect(Collectors.toList());
	}

	@Override
	public Employeedto updateEmployee(long id, Employeedto updateEmpDat) {
		Employee emp = empRe.findById(id).orElseThrow(() -> 
							new ResourceNotFoundException("Employee Id: "+id+" not found"));
		emp.setFirstName(updateEmpDat.getFirstName());
		emp.setLastName(updateEmpDat.getLastName());
		emp.setEmail(updateEmpDat.getEmail());
		Employee empnewobj = empRe.save(emp);
		return EmployeeMaper.mapToEmployeedto(empnewobj);
	}

	@Override
	public void deleteEmployee(long id) {
		empRe.findById(id).orElseThrow(() -> new ResourceNotFoundException("Emplouee Not Found"));
		empRe.deleteById(id);
	}

}
