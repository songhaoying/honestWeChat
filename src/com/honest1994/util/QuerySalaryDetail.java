package com.honest1994.util;

import java.util.HashMap;
import java.util.List;

import com.bonc.base.dao.DaoHelper;
import com.honest1994.pojo.StaffInfo;

/**
 * 查询工资明细
 * 
 * @author song
 * 
 */
public class QuerySalaryDetail {
	/**
	 * 绑定微信手的openId
	 */
	private String openId;
	private String acctMonth;

	/**
	 * @return the openId
	 */
	public String getOpenId() {

		return openId;
	}

	/**
	 * @param openId
	 *            the openId to set
	 */
	public void setOpenId(String openId) {
		this.openId = openId;
	}

	/**
	 * @return the acctMonth
	 */
	public String getAcctMonth() {
		return acctMonth;
	}

	/**
	 * @param acctMonth
	 *            the acctMonth to set
	 */
	public void setAcctMonth(String acctMonth) {
		this.acctMonth = acctMonth;
	}

	/**
	 * 
	 * @param openId
	 *            微信的openID
	 * @param acctMonth
	 *            工资月份
	 */
	public QuerySalaryDetail(String openId) {
		super();
		this.openId = openId;
		
	}
	/**
	 * 
	 * @param openId
	 *            微信的openID
	 * @param acctMonth
	 *            工资月份
	 */
	public QuerySalaryDetail(String openId, String acctMonth) {
		super();
		this.openId = openId;
		this.acctMonth = acctMonth;
	}

	public String getSalaryDetailByOpenId(DaoHelper daoHelper) {
		@SuppressWarnings("unchecked")
		List<HashMap<String, String>> list = daoHelper.queryForList("staffinfo.queryStaffPayByOpenId", this);
		String tmp = "您 ";
		
		QueryStaffPhone queryPhone1 = new QueryStaffPhone();
		List<StaffInfo> staffList1 = queryPhone1.getPhoneByOpenID(this.openId, daoHelper);
		if(staffList1.isEmpty()){
			tmp+="还未绑定自己的员工号码，请回复 “BD 员工工号”绑定您的员工号码！ ";
		}else		
		if (list.size() < 1) {
			tmp+="未查询到工资明细，目前只能查询到行政人员工资明细！";
		} else {
			for (HashMap<String, String> map : list) {
				tmp += map.get("工资月份") + "月的工资明细如下：\n";
				tmp += "\n\t姓名：\t" + map.get("员工姓名");
				tmp += "\n\t基本工资：\t" + map.get("基本工资");
				tmp += "\n\t医补：\t" + map.get("医补");
				tmp += "\n\t小时：\t" + map.get("小时");
				tmp += "\n\t加班：\t" + map.get("加班");
				tmp += "\n\t伙食补助：\t" + map.get("伙食补助");
				tmp += "\n\t交通补助：\t" + map.get("交通补助");
				tmp += "\n\t电话费：\t" + map.get("电话费");
				tmp += "\n\t补助：\t" + map.get("补助");
				tmp += "\n\t质量奖：\t" + map.get("质量奖");
				tmp += "\n\t统筹补助：\t" + map.get("统筹补助");
				tmp += "\n\t出勤：\t" + map.get("出勤");
				tmp += "\n\t应扣考勤：\t" + map.get("应扣考勤");
				tmp += "\n\t应扣餐补：\t" + map.get("应扣餐补");
				tmp += "\n\t奖励：\t" + map.get("奖励");
				tmp += "\n\t工作质量扣款：\t" + map.get("工作质量扣款");
				tmp += "\n\t补上月：\t" + map.get("补上月");
				tmp += "\n\t实发数：\t" + map.get("实发数");
				tmp += "\n\t其它：\t" + map.get("备注信息");
			}
		}
		return tmp;
	}
}
