package com.honest1994.util;

import java.util.ArrayList;
import java.util.List;

import com.bonc.base.dao.DaoHelper;
import com.honest1994.pojo.StaffInfo;

public class QueryStaffPhone {
	public QueryStaffPhone(){
		super();
	}
  
	/**
	 * 根据姓名查询员工信息，姓名可以是汉字，也可以是拼音 模糊匹配 。
	 * @param staffName
	 * @param daoHelper
	 * @return
	 */
	public List<StaffInfo> getPhoneByStaffName(String staffName,DaoHelper daoHelper){
		StaffInfo staff=new StaffInfo();
		staff.setStaffName(staffName);
		
		 List<StaffInfo>  staffList= new ArrayList<StaffInfo> ();
		 staffList=  daoHelper.queryForList("staffinfo.queryStaffInfoByStaffName", staff);
		 staff=null;
		 return staffList;
	}
	

	/**
	 * 根据Staffno查询员工信息，精确匹配
	 * @param staffNo
	 * @param daoHelper
	 * @return
	 */
	public List<StaffInfo> getPhoneByStaffNo(String staffNo,DaoHelper daoHelper){
		StaffInfo staff=new StaffInfo();
		staff.setStaffNo(staffNo);
		
		List<StaffInfo>  staffList= new ArrayList<StaffInfo> ();
		staffList= daoHelper.queryForList("staffinfo.queryStaffInfoByStaffNo", staff);
		staff=null;
		return staffList;
	}

	/**
	 * 根据微信的openID 查询员工的详细信息
	 * @param openID
	 * @param daoHelper
	 * @return
	 */
	public List<StaffInfo> getPhoneByOpenID(String openID, DaoHelper daoHelper) {
		StaffInfo staff=new StaffInfo();
		staff.setOpenID(openID);
		
		List<StaffInfo>  staffList= new ArrayList<StaffInfo> ();
		staffList= daoHelper.queryForList("staffinfo.queryStaffInfoByOpenID", staff);
		staff=null;
		return staffList;
	}
}
