package com.honest1994.pay;

import java.util.SortedMap;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.honest1994.BaseAction;
import com.honest1994.pay.common.CommonUtil;
import com.honest1994.pay.common.IpAddressUtil;
import com.honest1994.pay.common.PayCommonUtil;
import com.honest1994.pay.config.ConfigUtil;
import com.ifp.wechat.entity.AccessTokenOAuth;
import com.ifp.wechat.entity.user.UserWeiXin;
import com.ifp.wechat.service.OAuthService;

/**
 * 微信支付 
 * @author song
 *
 */
public class PayAction extends BaseAction {
	
	private Logger log = Logger.getLogger(PayAction.class); 
	
	private String requestXML;
	
	private String accessToken;
	
	private String code;
	
	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRequestXML() {
		return requestXML;
	}

	public void setRequestXML(String requestXML) {
		this.requestXML = requestXML;
	}

	public String execute(){
		//System.out.println("code:"+code);
		log.info("code:======"+code);
		AccessTokenOAuth oAuth= OAuthService.getOAuthAccessToken(code);
		UserWeiXin user= OAuthService.getUserInfoOauth(oAuth.getAccessToken(), oAuth.getOpenid());
		log.info("userWeixin:===="+user.toString());
		return "success";
	}
	
	/**
	 * 微信支付
	 * @return
	 */
	public String pay(){
		
		HttpServletRequest request= ServletActionContext.getRequest();
		
		SortedMap<Object,Object> parameters = new TreeMap<Object,Object>();
		parameters.put("appid", ConfigUtil.APPID);
		parameters.put("mch_id", ConfigUtil.MCH_ID);
		parameters.put("nonce_str", PayCommonUtil.CreateNoncestr());
		parameters.put("body", "LEO测试");
		parameters.put("out_trade_no", "201412051510");
		parameters.put("total_fee", "1");
		parameters.put("spbill_create_ip",IpAddressUtil.getIpAddr(request));
		parameters.put("notify_url", ConfigUtil.NOTIFY_URL);
		parameters.put("trade_type", "JSAPI");
		parameters.put("openid","o53-7jm77BhNxElMDKwgQXw-r2gQ" );
		String sign = PayCommonUtil.createSign("UTF-8", parameters);
		parameters.put("sign", sign);
		 requestXML = PayCommonUtil.getRequestXml(parameters);
		log.info("requestXML:\t"+requestXML);
		
		//最后我们要将这些参数以POST方式调用微信统一支付接口：代码如下
		
		String result =CommonUtil.httpsRequest(ConfigUtil.UNIFIED_ORDER_URL, "POST", requestXML);
		log.info("result:\t"+result);
		
		
		return "pay";
	}
	

}



