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

import com.aku.dto.DepartmentDto;
import com.aku.service.DepartmentService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
	DepartmentService departmentServiceImp;
	public DepartmentController(DepartmentService d) {
		this.departmentServiceImp = d;
	}
	@PostMapping("/addDept")
	public ResponseEntity<DepartmentDto> createDepartment(@RequestBody DepartmentDto d){
		DepartmentDto departmentDto = departmentServiceImp.createDeparement(d);
		return new ResponseEntity<>(departmentDto, HttpStatus.CREATED);
	}
	
	@GetMapping("/getDepts")
	public ResponseEntity<List<DepartmentDto>> getAllDept(){
		List<DepartmentDto> list = departmentServiceImp.getAllDepartment();
		//return new ResponseEntity<List<DepartmentDto>>(list, HttpStatus.OK);
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/getbyid/{id}")
	public ResponseEntity<DepartmentDto> getDeptById(@PathVariable("id") Long id){
		DepartmentDto d = departmentServiceImp.getDepartmentbyId(id);
		return ResponseEntity.ok(d);
	}
	
	@PutMapping("/updatedept/{id}")
	public ResponseEntity<DepartmentDto> updateDept(@PathVariable("id") Long id, @RequestBody DepartmentDto d){
		DepartmentDto dept = departmentServiceImp.updateDepartment(id, d);
		return ResponseEntity.ok(dept);
	}
	
	@DeleteMapping("/deletedept/{id}")
	public ResponseEntity<String> deleteDept(@PathVariable("id") Long id){
		departmentServiceImp.deleteDepartment(id);
		return ResponseEntity.ok("Department Deleted Successful");
	}
}
