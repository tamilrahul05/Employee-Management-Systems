package com.aku.dto;


public class DepartmentDto {
	private Long Id;
	private String departmentName;
	private String departmentDescription;
	public DepartmentDto() {
		super();
	}
	public DepartmentDto(Long id, String departmentName, String departmentDescription) {
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
		return "DepartmentDto [Id=" + Id + ", departmentName=" + departmentName + ", departmentDescription="
				+ departmentDescription + "]";
	}
	
}
