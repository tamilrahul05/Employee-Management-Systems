package com.aku.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aku.dto.Employeedto;
import com.aku.service.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {
	private EmployeeService empSer;
	public EmployeeController(EmployeeService es) {
		this.empSer = es;
	}
	
	//build add employee REST Api
	@PostMapping("/addEmployee")
	public ResponseEntity<Employeedto> createEmployee(@RequestBody Employeedto empdto){
		Employeedto saveEmp = empSer.createEmployee(empdto);
		return new ResponseEntity<>(saveEmp, HttpStatus.CREATED);
	}
	
	//build get employee REST Api
	@GetMapping("{id}")
	public ResponseEntity<Employeedto> getEmployeeById(@PathVariable("id") long id){
		Employeedto empdto = empSer.getEmployeeById(id);
		return ResponseEntity.ok(empdto);
	}
	
	//build get all employee REST Api
	@GetMapping("/allEmployee")
	public ResponseEntity<List<Employeedto>> getAllEmployee(){
		List<Employeedto> employees = empSer.getAllEmployee();
		return ResponseEntity.ok(employees);
	}
	
	//build update employee REST Api
	@PutMapping("/updateEmployee/{id}")
	public ResponseEntity<Employeedto> updateEmployee(@PathVariable("id") long id, @RequestBody Employeedto empdto) {
		Employeedto emp = empSer.updateEmployee(id, empdto);
		return ResponseEntity.ok(emp);
	}
	
	//build delete employee REST Api
	@DeleteMapping("/deleteEmployee/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") long id){
		empSer.deleteEmployee(id);
		return ResponseEntity.ok("Employee deleted successful");
	}
}
















