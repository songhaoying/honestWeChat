package com.honest1994.homepage;

import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.bonc.base.dao.DaoHelper;
import com.bonc.base.dao.OpResult;
import com.bonc.base.dao.PagiParam;
import com.bonc.base.util.Utils;
import com.bonc.commons.json.JsonUtils;
import com.bonc.commons.servlet.ServletUtils;
 

/**
 * 
 *    
 * 项目名称：housewifery   
 * 类名称：HomePageAction   
 * 类描述：  首页 
 * 创建人：宋金殿   
 * 创建时间：Mar 21, 2014 2:09:07 AM   
 * 修改人：sjd   
 * 修改时间：Mar 21, 2014 2:09:07 AM   
 * 修改备注：   
 * @version    
 *
 */
public class HomePageAction {
	private Logger log = Logger.getLogger(HomePageAction.class); 
	private String sortCol;// 排序列名
	private String sortOrder;// 排序序向
	private PagiParam pagiParam = new PagiParam(1);
	public OpResult opResult;
	private int pageNo = 1;
	private int pageNumber = 1;
	private DaoHelper daoHelper;   
	private List list = new ArrayList();
	private List serviceList = new ArrayList();
	private Map<String,String> map;
	private String where;//当前位置：0-首页 1-会员中心 2-家庭服务 3-服务派单 4-生活经验 5-企业加盟 6-新闻中心 7-爱心社区 8-帮助中心
	
	/***  首页信息展现查询  ***/
	private List donation = new ArrayList();//爱心捐赠
	private List forgifts = new ArrayList();//求赠
	private Map<String,String> serviceType = null;
	private List xwlist;  //新闻列表
	private List zwlist;  //政务公开
	
	private List provideList = new ArrayList();;//供 列表
	private List demandList = new ArrayList();;//需 列表
	
	private List largeTypeList; //大类
	private List subTypeList;  //子类
	
	private String searchName;
	private List searchList;
	
	//推荐企业列表
	private List recCompanyList = new ArrayList();
	 
	
	
	/**
	 * 首页
	 * @return
	 */
	public String execute(){  
		donation = this.daoHelper.queryForList("homepage.donationList", this);
		forgifts = this.daoHelper.queryForList("homepage.forgiftsList", this);
		
		xwlist = this.daoHelper.queryForList("homepage.getHomeNewsList", this);
		zwlist = this.daoHelper.queryForList("homepage.getHomeZWList", this);
		
		provideList = this.daoHelper.queryForList("homepage.homeProvideList", this);
		demandList = this.daoHelper.queryForList("homepage.homeDemandList", this);
		
		largeTypeList = this.daoHelper.queryForList("homepage.getHomeLargeType", this);
		subTypeList	= this.daoHelper.queryForList("homepage.getHomeSubType", this);
		
		serviceList = this.daoHelper.queryForList("homepage.serviceList", this);
		
		//优秀企业推荐
		recCompanyList = this.daoHelper.queryForList("homepage.recCompanyList", this);
		
		//首页图片
		list = this.daoHelper.queryForList("homepage.homePagePicList", this);
		
		
		return "success";
	}
	
	public String addNetOrder(){
		map.put("guid", GetGuid());
		map.put("orderNo", ReaderNewOrderNo());
		try {
			map.put("name", java.net.URLDecoder.decode(map.get("name"),"utf-8")) ;
			map.put("serviceType", java.net.URLDecoder.decode(map.get("serviceType"),"utf-8")) ;
			map.put("address", java.net.URLDecoder.decode(map.get("address"),"utf-8")) ;
			map.put("content", java.net.URLDecoder.decode(map.get("content"),"utf-8")) ;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		opResult = daoHelper.insert("homepage.addOrder", map);
		daoHelper.insert("homepage.addOrderLog", map);
		String s = opResult.isSuccess()?"true":"flase";
        ServletUtils.sendAsText(ServletActionContext.getResponse(),s);
        return null;
	}
	
	public String addPreOrder(){
		map.put("guid", GetGuid());
		map.put("orderNo", ReaderNewOrderNo());
		try {
			map.put("name", java.net.URLDecoder.decode(map.get("name"),"utf-8")) ;
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		
		opResult = daoHelper.insert("homepage.addPreOrder", map);
		String s = opResult.isSuccess()?"true":"flase";
        ServletUtils.sendAsText(ServletActionContext.getResponse(),s);
        return null;
	}
	/**
	 * 获取网站首页显示的订单统计信息
	 * @return
	 */
	public String queryOrder(){
		
		map = (Map)this.daoHelper.queryForObject("homepage.queryOrderMessage", this);
        ServletUtils.sendAsJson(ServletActionContext.getResponse(),Utils.toJson(map));
        return null;
	}
	
	private String ReaderNewOrderNo()
	{
		String ReturnValue = (String)this.daoHelper.queryForObject("homepage.getOrderNo", null);
		if(ReturnValue.length() < 8)
		{
			ReturnValue = "00000000000000000000000".substring(0, 8-ReturnValue.length()) + ReturnValue;
		}
		return ReturnValue;
	}
	
	 public String GetGuid()
	  {
	    return UUID.randomUUID().toString().toUpperCase();
	  }
	
	/**
	 * 头部页面
	 * @return
	 */
	public String head(){
		return "head";
	}
	
	
	/**
	 * 尾部页面
	 * @return
	 */
	public String foot(){
		list = this.daoHelper.queryForList("homepage.friendlyLinkList", this);
		return "foot";
	}

	/**
	 * 爱心企业
	 */
	public void loveCompany(){ 
		String result = "";
		List list  =   this.daoHelper.queryForList("homepage.loveCompanyList", this);
		result = JsonUtils.getJsonArrayString(list); 
		try { 
			HttpServletResponse response = Utils.getResponse();
			response.setContentType("text/html; charset=utf-8");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = response.getWriter();
			out.print(result);
			out.flush();
			out.close();
		} catch (Exception e) {
			log.error("首页爱心企业异常:异常信息-->"+e);
		}
	}
	
	/**
	 * 全局搜索
	 * @return
	 */
	public String search(){ 
		return "search";
	}
	
	/**
	 * 全局搜索列表
	 * @return
	 */
	public String searchResultList(){
		this.pagiParam.setPageSize(20);
		//转码
		try {
			this.searchName = java.net.URLDecoder.decode(this.searchName,"utf-8");  
		} catch (UnsupportedEncodingException e) { 
			log.error("转码异常:异常信息-->"+e);;
		}
		searchList = this.daoHelper.queryForPagiList("homepage.search", this);
		return "searchResultList";
	}
	

	public Logger getLog() {
		return log;
	}

	public void setLog(Logger log) {
		this.log = log;
	}

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

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public DaoHelper getDaoHelper() {
		return daoHelper;
	}

	public void setDaoHelper(DaoHelper daoHelper) {
		this.daoHelper = daoHelper;
	}

	public List getList() {
		return list;
	}

	public void setList(List list) {
		this.list = list;
	}

	public String getWhere() {
		return where;
	}

	public void setWhere(String where) {
		this.where = where;
	}

	public List getDonation() {
		return donation;
	}

	public List getForgifts() {
		return forgifts;
	}

	public void setDonation(List donation) {
		this.donation = donation;
	}

	public void setForgifts(List forgifts) {
		this.forgifts = forgifts;
	}

	public List getXwlist() {
		return xwlist;
	}

	public List getZwlist() {
		return zwlist;
	}
 

	public List getLargeTypeList() {
		return largeTypeList;
	}

	public List getSubTypeList() {
		return subTypeList;
	}

	public String getSearchName() {
		return searchName;
	}

	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}

	public List getSearchList() {
		return searchList;
	}

	public void setSearchList(List searchList) {
		this.searchList = searchList;
	}

	public List getServiceList() {
		return serviceList;
	}

	public OpResult getOpResult() {
		return opResult;
	}

	public void setOpResult(OpResult opResult) {
		this.opResult = opResult;
	}

	public Map<String, String> getMap() {
		return map;
	}

	public void setMap(Map<String, String> map) {
		this.map = map;
	}

	public Map<String, String> getServiceType() {
		return serviceType;
	}

	public void setServiceType(Map<String, String> serviceType) {
		this.serviceType = serviceType;
	}

	public List getRecCompanyList() {
		return recCompanyList;
	}

	public void setRecCompanyList(List recCompanyList) {
		this.recCompanyList = recCompanyList;
	}

	public void setServiceList(List serviceList) {
		this.serviceList = serviceList;
	}

	public void setXwlist(List xwlist) {
		this.xwlist = xwlist;
	}

	public void setZwlist(List zwlist) {
		this.zwlist = zwlist;
	} 

	public void setLargeTypeList(List largeTypeList) {
		this.largeTypeList = largeTypeList;
	}

	public void setSubTypeList(List subTypeList) {
		this.subTypeList = subTypeList;
	}

	public List getProvideList() {
		return provideList;
	}

	public void setProvideList(List provideList) {
		this.provideList = provideList;
	}

	public List getDemandList() {
		return demandList;
	}

	public void setDemandList(List demandList) {
		this.demandList = demandList;
	}
 
	
 
}
