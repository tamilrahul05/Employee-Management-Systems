package com.aku.mapper;

import com.aku.dto.Employeedto;
import com.aku.entity.Employee;

public class EmployeeMaper {
	public static Employeedto mapToEmployeedto(Employee emp) {
		Employeedto em = new Employeedto(emp.getId(), emp.getFirstName(), emp.getLastName(), emp.getEmail());
		return em;
	}
	
	public static Employee mapToEmployee(Employeedto empdto) {
		 return new Employee(
					 empdto.getId(),
					 empdto.getFirstName(),
					 empdto.getLastName(),
					 empdto.getEmail()
				 );
	}
}
