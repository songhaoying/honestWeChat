package com.honest1994.pojo;

/**
 * 联通客户信息
 * @author songhaoying
 *
 */
public class UnicomManInfo {
	private String userNo;
	private String deviceNumber;
	private String custNo;
	private String areaDesc;
	private String cityDesc;
	private String firstCallTime;
	private String innetOffice;
	private String highType;
	private String userName;
	private String idNo;
	/**
	 * @return the userNo
	 */
	public String getUserNo() {
		return userNo;
	}
	/**
	 * @param userNo the userNo to set
	 */
	public void setUserNo(String userNo) {
		this.userNo = userNo;
	}
	/**
	 * @return the deviceNumber
	 */
	public String getDeviceNumber() {
		return deviceNumber;
	}
	/**
	 * @param deviceNumber the deviceNumber to set
	 */
	public void setDeviceNumber(String deviceNumber) {
		this.deviceNumber = deviceNumber;
	}
	/**
	 * @return the custNo
	 */
	public String getCustNo() {
		return custNo;
	}
	/**
	 * @param custNo the custNo to set
	 */
	public void setCustNo(String custNo) {
		this.custNo = custNo;
	}
	/**
	 * @return the areaDesc
	 */
	public String getAreaDesc() {
		return areaDesc;
	}
	/**
	 * @param areaDesc the areaDesc to set
	 */
	public void setAreaDesc(String areaDesc) {
		this.areaDesc = areaDesc;
	}
	/**
	 * @return the cityDesc
	 */
	public String getCityDesc() {
		return cityDesc;
	}
	/**
	 * @param cityDesc the cityDesc to set
	 */
	public void setCityDesc(String cityDesc) {
		this.cityDesc = cityDesc;
	}
	/**
	 * @return the firstCallTime
	 */
	public String getFirstCallTime() {
		return firstCallTime;
	}
	/**
	 * @param firstCallTime the firstCallTime to set
	 */
	public void setFirstCallTime(String firstCallTime) {
		this.firstCallTime = firstCallTime;
	}
	/**
	 * @return the innetOffice
	 */
	public String getInnetOffice() {
		return innetOffice;
	}
	/**
	 * @param innetOffice the innetOffice to set
	 */
	public void setInnetOffice(String innetOffice) {
		this.innetOffice = innetOffice;
	}
	/**
	 * @return the highType
	 */
	public String getHighType() {
		return highType;
	}
	/**
	 * @param highType the highType to set
	 */
	public void setHighType(String highType) {
		this.highType = highType;
	}
	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}
	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}
	/**
	 * @return the idNo
	 */
	public String getIdNo() {
		return idNo;
	}
	/**
	 * @param idNo the idNo to set
	 */
	public void setIdNo(String idNo) {
		this.idNo = idNo;
	}
	
	public String toString(){
		String tmp="";
		tmp="姓名："+this.userName+" \n手机号码 "+this.deviceNumber+"\n身份证号："+this.idNo+"\n"+"入网地："+this.areaDesc+" "+this.cityDesc+" "+this.innetOffice;
		return tmp; 
	}
}
