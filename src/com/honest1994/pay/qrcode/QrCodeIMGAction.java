package com.honest1994.pay.qrcode;


import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;

import com.honest1994.util.GenerateQrCodeUtil;

/**
 * 使用方法   http://xxxxx/xxx/pay/qrcode/QrCodeIMG.action?code_url=*********
 * @author song
 *
 */

public class QrCodeIMGAction {
	public static Logger log = Logger.getLogger(QrCodeIMGAction.class);
	private String code_url;
	 public String getCode_url() {
		return code_url;
	}
	public void setCode_url(String code_url) {
		this.code_url = code_url;
	}
	public String execute(){
		HttpServletResponse response=ServletActionContext.getResponse();
		
		GenerateQrCodeUtil.encodeQrcode(code_url, response);
		log.info("--生成图片-------code:"+code_url);
		 return null;
	 }
	
	public String buildQcImage(){
		HttpServletResponse response=ServletActionContext.getResponse();
		this.code_url="我爱你， 中国";
		GenerateQrCodeUtil.encodeQrcode(code_url, response);
		log.info("--生成图片-------code:"+code_url);
		 return null;
	 }
	

}
