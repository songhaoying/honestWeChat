package com.honest1994.services;

import com.bonc.base.dao.DaoHelper;
import com.ifp.wechat.entity.user.UserWeiXin;

public class userWeiXinServices {
	private DaoHelper daoHelp;
	
	public int saveUser2DB(UserWeiXin user){
		this.daoHelp.insert("", user);
		return 0;
	}
	
	public userWeiXinServices(DaoHelper daoHelp){
		this.daoHelp=daoHelp;
	}
}
