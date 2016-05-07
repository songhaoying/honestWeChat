package com.honest1994.pojo;

public class StaffInfo {
	private String staffNo="";
	private String staffName="";
	private String jobTitle="";
	private String linePhone="";
	private String mobile="";
	private String smallPhone="";
	private String wechat="";
	private String deptNo="";
	private String deptName="";
	private String openID="";
	public StaffInfo(){
		
	}
	/**
	 * 工号
	 * @return the staffNo
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
	 * 姓名
	 * @return the staffName
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
	 * 职位
	 * @return the jobTitle
	 */
	public String getJobTitle() {
		return jobTitle;
	}
	/**
	 * @param jobTitle the jobTitle to set
	 */
	public void setJobTitle(String jobTitle) {
		this.jobTitle = jobTitle;
	}
	/**
	 * 固定电话
	 * @return the linePhone
	 */
	public String getLinePhone() {
		return linePhone;
	}
	/**
	 * 
	 * @param linePhone the linePhone to set
	 */
	public void setLinePhone(String linePhone) {
		this.linePhone = linePhone;
	}
	/**
	 * 手机号
	 * @return the mobile
	 */
	public String getMobile() {
		return mobile;
	}
	/**
	 * 
	 * @param mobile the mobile to set
	 */
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	/**
	 * 短号码
	 * @return the smallPhone
	 */
	public String getSmallPhone() {
		return smallPhone;
	}
	/**
	 * @param smallPhone the smallPhone to set
	 */
	public void setSmallPhone(String smallPhone) {
		this.smallPhone = smallPhone;
	}
	/**
	 * 微信号
	 * @return the wechat
	 */
	public String getWechat() {
		return wechat;
	}
	/**
	 * @param wechat the wechat to set
	 */
	public void setWechat(String wechat) {
		this.wechat = wechat;
	}
	/**
	 * 部门编号
	 * @return the deptNo
	 */
	public String getDeptNo() {
		return deptNo;
	}
	/**
	 * @param deptNo the deptNo to set
	 */
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}
	/**
	 * 部门名称
	 * @return the deptName
	 */
	public String getDeptName() {
		return deptName;
	}
	/**
	 * @param deptName the deptName to set
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	/**
	 * 微信唯一id
	 * @return the openId
	 */
	public String getOpenID() {
		return openID;
	}
	/**
	 * @param openId the openId to set
	 */
	public void setOpenID(String openId) {
		this.openID = openId;
	}
	
	public String toString(){
		String tmp="";
		tmp=new StringBuilder().append("姓名：").append(this.staffName).append("\n").append("手机：").append(this.mobile).append("\n小号：").append(this.smallPhone).append("\n职务:").append(this.jobTitle) .append("\n").toString();
		return tmp;
		
	}
	
}
