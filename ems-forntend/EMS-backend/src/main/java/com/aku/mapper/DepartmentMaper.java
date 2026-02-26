package com.aku.mapper;

import com.aku.dto.DepartmentDto;
import com.aku.entity.Department;
public class DepartmentMaper {
	public static DepartmentDto mapToDepartmentDto(Department d) {
		return new DepartmentDto(d.getId(), d.getDepartmentName(), d.getDepartmentDescription());
	}
	
	public static Department mapToDepartment(DepartmentDto d) {
		return new Department(d.getId(), d.getDepartmentName(), d.getDepartmentDescription());
	}
}
