package com.aku.service;

import java.util.List;

import com.aku.dto.DepartmentDto;

public interface DepartmentService {
	DepartmentDto createDeparement(DepartmentDto d);
	List<DepartmentDto> getAllDepartment();
	DepartmentDto getDepartmentbyId(Long id);
	DepartmentDto updateDepartment(Long id, DepartmentDto d);
	void deleteDepartment(Long id);
}
