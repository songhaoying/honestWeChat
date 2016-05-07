package com.honest1994.pay;

import com.honest1994.BaseAction;

/**
 * 扫码支付
 * @author song
 *
 */
public class Pay1Action extends BaseAction {
	
	public String execute(){
		
		return "success";
	}

	public String buildQrImage(){
		
		
		return "buildQr";
	}
}
