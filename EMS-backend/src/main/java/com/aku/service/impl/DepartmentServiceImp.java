package com.aku.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.aku.dto.DepartmentDto;
import com.aku.entity.Department;
import com.aku.exception.ResourceNotFoundException;
import com.aku.mapper.DepartmentMaper;
import com.aku.repository.DepartmentRepository;
import com.aku.service.DepartmentService;

@Service
public class DepartmentServiceImp implements DepartmentService{
	DepartmentRepository dep_re;
	public DepartmentServiceImp(DepartmentRepository dr) {
		this.dep_re = dr;
	}

	@Override
	public DepartmentDto createDeparement(DepartmentDto d) {
		Department department = DepartmentMaper.mapToDepartment(d);
		Department dep = dep_re.save(department);
		DepartmentDto dto = DepartmentMaper.mapToDepartmentDto(dep);
		return dto;
	}

	@Override
	public List<DepartmentDto> getAllDepartment() {
		List<Department> allD = dep_re.findAll();
		return allD.stream().map(listd -> DepartmentMaper.mapToDepartmentDto(listd)).collect(Collectors.toList());
	}

	@Override
	public DepartmentDto getDepartmentbyId(Long id) {
		Department department = dep_re.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id Not Found"));
		return DepartmentMaper.mapToDepartmentDto(department);
	}

	@Override
	public DepartmentDto updateDepartment(Long id, DepartmentDto d) {
		Department department = dep_re.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id Not Found"));
		department.setDepartmentName(d.getDepartmentName());
		department.setDepartmentDescription(d.getDepartmentDescription());
		Department department2 = dep_re.save(department);
		return DepartmentMaper.mapToDepartmentDto(department2);
	}

	@Override
	public void deleteDepartment(Long id) {
		dep_re.findById(id).orElseThrow(() -> new ResourceNotFoundException("Id not Found"));
		dep_re.deleteById(id);
	}

}
