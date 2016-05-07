package com.honest1994;

import com.bonc.base.dao.DaoHelper;
import com.bonc.base.dao.OpResult;
import com.bonc.base.dao.PagiParam;
import common.Logger;

/**
 * 
 * @TypeName:     BaseAction 
 * @Description:  Action父类，定义了一些公共变量
 * @author:       陈刚勇
 * @date:         2014-3-30 下午2:37:53 
 *
 */
public class BaseAction {
	 
	public String sortCol;// 排序列名
	public String sortOrder;// 排序序向
	public PagiParam pagiParam = new PagiParam();
	public DaoHelper daoHelper;
	public OpResult opResult;
	public String getSortCol() {
		return sortCol;
	}
	public void setSortCol(String sortCol) {
		this.sortCol = sortCol;
	}
	public String getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	public PagiParam getPagiParam() {
		return pagiParam;
	}
	public void setPagiParam(PagiParam pagiParam) {
		this.pagiParam = pagiParam;
	}
	public DaoHelper getDaoHelper() {
		return daoHelper;
	}
	public void setDaoHelper(DaoHelper daoHelper) {
		this.daoHelper = daoHelper;
	}   
}
