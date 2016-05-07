package com.honest1994.util;

import com.bonc.base.dao.DaoHelper;
import com.bonc.base.dao.OpResult;

public class BandStaffId {
	private DaoHelper daoHelper;
	private String openID;
	private String staffNo;
	 
		/**
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
	 * @return the openID
	 */
	public String getOpenID() {
		return openID;
	}

	/**
	 * @param openID the openID to set
	 */
	public void setOpenID(String openID) {
		this.openID = openID;
	}

	    /**
	     * 
	     * @param daoHelper
	     * @param openID 微信的opneId
	     */
		public BandStaffId(DaoHelper daoHelper,String openID,String staffNo ){
		 super();
		 this.daoHelper=daoHelper;
		 this.openID=openID;
		 this.staffNo=staffNo;
		
	}
	
		/**
		 * 绑定微信id 
		 * @param staffid
		 * @return
		 */
	public boolean bandStaffById(){
		boolean ret = false;
		OpResult op=null;
		op= daoHelper.update("staffinfo.bandStaffById", this);
		ret=op.isSuccess();
		return ret;
	}

}
