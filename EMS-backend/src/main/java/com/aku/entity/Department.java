package com.aku.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "departments")
public class Department {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	
	@Column(name = "department_name")
	private String departmentName;
	
	@Column(name = "department-description")
	private String departmentDescription;

	public Department() {
		super();
	}

	public Department(Long id, String departmentName, String departmentDescription) {
		super();
		Id = id;
		this.departmentName = departmentName;
		this.departmentDescription = departmentDescription;
	}

	public Long getId() {
		return Id;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public String getDepartmentDescription() {
		return departmentDescription;
	}

	public void setId(Long id) {
		Id = id;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public void setDepartmentDescription(String departmentDescription) {
		this.departmentDescription = departmentDescription;
	}

	@Override
	public String toString() {
		return "Department [Id=" + Id + ", departmentName=" + departmentName + ", departmentDescription="
				+ departmentDescription + "]";
	}
	
}
