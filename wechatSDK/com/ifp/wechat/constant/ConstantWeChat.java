package com.ifp.wechat.constant;

import com.ifp.wechat.util.ConfigUtil;

/**
 * 微信常量
 * @author caspar.chen
 * @version 1.0
 */
public class ConstantWeChat {
	
	
	
	
	/**
	 * 百度翻译的APIkey
	 */
	public static String BAIDU_API_KEY=ConfigUtil.get("baiduAPIKey");
	
	/**u
	 * 与接口配置信息中的Token要一致
	 */
	public static String TOKEN = ConfigUtil.get("token");
	
	/**
	 * 第三方用户唯一凭证
	 */
	public static String APPID = ConfigUtil.get("appId");
	
	/**
	 * 第三方用户唯一凭证密钥
	 */
	public static String APPSECRET = ConfigUtil.get("appSecret");
	
	/**
	 * 转发给多客服系统消息
	 */
	public static String RESP_MESSAGE_TYPE_CUSTOMER_SERVICE="transfer_customer_service";
	
	/**
	 * 返回消息类型：文本
	 */
	public static final String RESP_MESSAGE_TYPE_TEXT = "text";

	/**
	 * 返回消息类型：图片
	 */
	public static final String RESP_MESSAGE_TYPE_IMAGE = "image";
	
	/**
	 * 返回消息类型：语音
	 */
	public static final String RESP_MESSAGE_TYPE_VOICE = "voice";
	
	/**
	 * 返回消息类型：视频
	 */
	public static final String RESP_MESSAGE_TYPE_VIDEO = "video";
	
	/**
	 * 返回消息类型：音乐
	 */
	public static final String RESP_MESSAGE_TYPE_MUSIC = "music";

	/**
	 * 返回消息类型：图文
	 */
	public static final String RESP_MESSAGE_TYPE_NEWS = "news";
	
	/**
	 * 请求消息类型：文本
	 */
	public static final String REQ_MESSAGE_TYPE_TEXT = "text";

	/**
	 * 请求消息类型：图片
	 */
	public static final String REQ_MESSAGE_TYPE_IMAGE = "image";

	/**
	 * 请求消息类型：链接
	 */
	public static final String REQ_MESSAGE_TYPE_LINK = "link";

	/**
	 * 请求消息类型：地理位置
	 */
	public static final String REQ_MESSAGE_TYPE_LOCATION = "location";

	/**
	 * 请求消息类型：音频
	 */
	public static final String REQ_MESSAGE_TYPE_VOICE = "voice";

	/**
	 * 请求消息类型：事件
	 */
	public static final String REQ_MESSAGE_TYPE_EVENT = "event";

	/**
	 * 事件类型：subscribe(关注)
	 */
	public static final String EVENT_TYPE_SUBSCRIBE = "subscribe";

	/**
	 * 事件类型：unsubscribe(取消关注)
	 */
	public static final String EVENT_TYPE_UNSUBSCRIBE = "unsubscribe";

	/**
	 * 事件类型：CLICK(自定义菜单点击事件)
	 */
	public static final String EVENT_TYPE_CLICK = "CLICK";
	
	/**
	 * 事件类型：SCAN(二维码扫描事件)
	 */
	public static final String EVENT_TYPE_SCAN = "SCAN";	
	
	/**
	 * 事件类型:上报地址位置
	 */
	public static final String EVENT_TYPE_LOCATION="LOCATION";
	
	private  static String accessToken;

	public static String getAccessToken() {
		return accessToken;
	}

	public static void setAccessToken(String accessToken) {
		ConstantWeChat.accessToken = accessToken;
	}
	
	/**
	 * OAUTH scope
	 */
	public static final String SCOPE_SNSAPI_BASE = "snsapi_base";
	public static final String SCOPE_SNSAPI_USERINFO = "snsapi_userinfo";
}
