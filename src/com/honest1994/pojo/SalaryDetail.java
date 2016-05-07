package com.honest1994.pojo;

import java.util.List;
import java.util.Map;

public class SalaryDetail {
	
	private String staffName;
	private String staffNo;
	private String salaryMonth;
	private List<Map<String,Float>> salaryDetail;
	
	/**
	 * @return the staffName
	 * 员工姓名
	 */
	public String getStaffName() {
		return staffName;
	}
	/**
	 * @param staffName the staffName to set
	 */
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	/**
	 * @return the staffNo
	 * 员工工号
	 */
	public String getStaffNo() {
		return staffNo;
	}
	/**
	 * @param staffNo the staffNo to set
	 */
	public void setStaffNo(String staffNo) {
		this.staffNo = staffNo;
	}
	/**
	 * @return the salaryMonth
	 * 工资月份
	 */
	public String getSalaryMonth() {
		return salaryMonth;
	}
	/**
	 * @param salaryMonth the salaryMonth to set
	 * 
	 */
	public void setSalaryMonth(String salaryMonth) {
		this.salaryMonth = salaryMonth;
	}
	/**
	 * @return the salaryDetail
	 * 工资明细
	 */
	public List<Map<String, Float>> getSalaryDetail() {
		return salaryDetail;
	}
	/**
	 * @param salaryDetail the salaryDetail to set
	 */
	public void setSalaryDetail(List<Map<String, Float>> salaryDetail) {
		this.salaryDetail = salaryDetail;
	}
	
	

}
