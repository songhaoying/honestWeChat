 package com.honest1994.quartz;

import org.apache.log4j.Logger;

import com.ifp.wechat.constant.ConstantWeChat;
import com.ifp.wechat.util.WeixinUtil;
 
 
public class RefreshAccessTokenTask {
	private Logger log=Logger.getLogger(RefreshAccessTokenTask.class);
	public void refreshToken(){
		//System.out.println("refresh!");
		//ActionContext.getContext().getApplication().put("token", "21213213123123");
		
		String token=WeixinUtil.getToken();
		if(null==token) token=WeixinUtil.getToken();
		log.info("自动取得微信Token~~ ："+token);
		ConstantWeChat.setAccessToken(token);
	}
}
