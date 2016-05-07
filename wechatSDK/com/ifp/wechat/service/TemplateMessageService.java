package com.ifp.wechat.service;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;

import org.apache.log4j.Logger;

import com.ifp.wechat.entity.message.resp.TemplateMessage;
import com.ifp.wechat.util.StringUtil;
import com.ifp.wechat.util.WeixinUtil;

/**
 * 模板消息服务类
 * @author song
 *
 */
public class TemplateMessageService {
	public static Logger log = Logger.getLogger(TemplateMessageService.class);
	
	/**
	 * 发送模板消息的API
	 */
	public static String TEMPLATE_MESSAGE_SEND="https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=ACCESS_TOKEN";
	
	
	/**
	 * 发送模板消息
	 */
	
	public static Integer sendTemplateMessae(TemplateMessage message){
		String url = TEMPLATE_MESSAGE_SEND.replace("ACCESS_TOKEN",
				WeixinUtil.getToken());
		String tmpString="";
		int result=0;
		JSONObject json=JSONObject.fromObject(message);
		tmpString=json.toString();
		JSONObject jsonObject = WeixinUtil.httpsRequest(url, "POST", tmpString);
		
		if(null!=jsonObject){
			if (StringUtil.isNotEmpty(jsonObject.get("errcode"))&& !jsonObject.get("errcode").toString().equals("0") ){
				System.out.println(jsonObject.get("errcode").toString().equals("0")+"   "+jsonObject.get("errcode")+"********" );
				System.out.println(jsonObject.get("errcode")+"********");
				result = jsonObject.getInt("errcode");
				log.error("发送模板消息失败，errcode:"
						+ jsonObject.getInt("errcode") + "，errmsg:"
						+ jsonObject.getString("errmsg"));
				
				} 
		}
		return result;
	}
	
	public static void main(String args[]){
		TemplateMessage message= new TemplateMessage();
		message.setTouser("o53-7jm77BhNxElMDKwgQXw-r2gQ");
		message.setTemplate_id("-SvW1PLpKU_5Lk6G-u6iNTmHmvtr74_ZeRxyiyo-ig8");
		message.setUrl("http://www.baidu.com");
		 Map<String,Map<String,String>> data = new HashMap<String ,Map<String,String>>();
		Map<String,String> maps1=new HashMap<String,String>();
		Map<String,String> maps2=new HashMap<String,String>();
		Map<String,String> maps3=new HashMap<String,String>();
		maps1.put("value", "你好，你还有3项待办工作。");
		maps1.put("color", "#00ffff");
		data.put("first", maps1);
		
		
		 
		maps2.put("value", "客户生日关怀、客户保险到期等3项工作");
		data.put("work", maps2);
		
		maps3.put("value", "请按时完成待办工作。");
		data.put("remark", maps3);
		
		message.setData(data);
		 
		JSONObject jso= JSONObject.fromObject(message);
		System.out.println( jso.toString());
		
		
		System.out.println(sendTemplateMessae(message));
	}
	
}
