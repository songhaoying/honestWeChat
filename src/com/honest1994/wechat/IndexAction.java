package com.honest1994.wechat;

import org.apache.log4j.Logger;

import com.honest1994.BaseAction;
import com.ifp.wechat.constant.ConstantWeChat;
import com.ifp.wechat.service.OAuthService;

public class IndexAction extends BaseAction {
	private Logger log =Logger.getLogger(IndexAction.class);
	private String authUrl;
	public String getAuthUrl() {
		return authUrl;
	}
	public void setAuthUrl(String authUrl) {
		this.authUrl = authUrl;
	}
	public String execute(){
		log.info("IndexAction.execute()");
		//确认授权
		authUrl=OAuthService.getOauthUrl("http://wx.songhaoying.net/honestWeChat/pay/Pay.action", "utf-8", ConstantWeChat.SCOPE_SNSAPI_USERINFO);
		 
		//静默授权
		//authUrl=OAuthService.getOauthUrl("http://wx.songhaoying.net/honestWeChat/pay/Pay.action", "utf-8", ConstantWeChat.SCOPE_SNSAPI_BASE);
		return "success";
	}
}
