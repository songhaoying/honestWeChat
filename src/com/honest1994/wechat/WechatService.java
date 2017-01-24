package com.honest1994.wechat;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;

import com.bonc.base.dao.DaoHelper;
import com.honest1994.pojo.StaffInfo;
import com.honest1994.pojo.UnicomManInfo;
import com.honest1994.util.BandStaffId;
import com.honest1994.util.Command;
import com.honest1994.util.QuerySalaryDetail;
import com.honest1994.util.QueryStaffPhone;
import com.ifp.wechat.constant.ConstantWeChat;
import com.ifp.wechat.entity.message.resp.Article;
import com.ifp.wechat.entity.message.resp.NewsMessage;
import com.ifp.wechat.entity.message.resp.TemplateMessage;
import com.ifp.wechat.entity.message.resp.TextMessage;
import com.ifp.wechat.entity.message.resp.TransferCustomerServiceMessage;
import com.ifp.wechat.entity.user.UserWeiXin;
import com.ifp.wechat.service.MessageService;
import com.ifp.wechat.service.TemplateMessageService;
import com.ifp.wechat.service.UserService;
import com.ifp.wechat.util.MessageUtil;
import com.ifp.wechat.util.WeixinUtil;

/**
 * 处理微信核心业务的service
 * 
 * @author caspar.chen
 * 
 */
public class WechatService {

	public static Logger log = Logger.getLogger(WechatService.class);

	/**
	 * 处理微信发来的请求
	 * 
	 * @param request
	 * @return String
	 */
	public static String processWebchatRequest(HttpServletRequest request, DaoHelper daoHelper) {
		String respMessage = "";
		String voicMessage = null;
		boolean isReply=true;
		Map<String, String> requestMap = null;
		try {
			requestMap = MessageUtil.parseXml(request);
			// xml请求解析
			log.info("requestMap ===" + requestMap);
			// 消息类型
			String msgType = requestMap.get("MsgType");
			log.debug(msgType);
			TextMessage textMessage = (TextMessage) MessageService.bulidBaseMessage(requestMap, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
			TransferCustomerServiceMessage customerServicesMessage = (TransferCustomerServiceMessage) MessageService.bulidCustomerServiceMessage (requestMap, ConstantWeChat.RESP_MESSAGE_TYPE_CUSTOMER_SERVICE);
			NewsMessage newsMessage = (NewsMessage) MessageService.bulidBaseMessage(requestMap, ConstantWeChat.RESP_MESSAGE_TYPE_NEWS);
			String openID = "";
			openID = requestMap.get("FromUserName");

			String respContent = "";
			// 创建图文消息
			List<Article> articleList = new ArrayList<Article>();

			switch (msgType) {

			case ConstantWeChat.REQ_MESSAGE_TYPE_TEXT:
				// 文本

				// 接收用户发送的文本消息内容
				String content = requestMap.get("Content").trim();

				if ("?".equals((content.trim())) || "？".equals(content.trim()) || "？".equals(content.trim())) {
					// 回复帮助信息
					List<Map<String, String>> list = daoHelper.queryForList("staffinfo.queryCommInfo", "help");
					textMessage.setContent(list.get(0).get("INFO_VALE"));
					respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);

				}

				// 单图文消息

				if (content.length() == 2) {
					if (content.equalsIgnoreCase("关机")) {
						// 发送关机到微信平台
						Command.exec("d:\\shutdownWX.bat", true);
						textMessage.setContent("已经发送关机指令！");
						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
					}else if("客服".equals(content)){
						textMessage.setMsgType(ConstantWeChat.RESP_MESSAGE_TYPE_CUSTOMER_SERVICE);
						textMessage.setContent("你好，正为你转接客服中……");
						//respMessage=MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_CUSTOMER_SERVICE);
						respMessage=MessageService.bulidSendMessage(customerServicesMessage, ConstantWeChat.RESP_MESSAGE_TYPE_CUSTOMER_SERVICE);
					}
					
					
				}

				String flag = "";// 标志位，用来标识上行信息
				if (content.trim().indexOf("#") > 0) {
					String[] cmd = content.split("#");
					String args = cmd[1];
					UnicomManInfo uInfo = new UnicomManInfo();
					if (content.toUpperCase().startsWith("CDH")) {
						uInfo.setDeviceNumber(args);
						flag = "1";
					} else if (content.toUpperCase().startsWith("CXM")) {
						uInfo.setUserName(args);
						flag = "1";
					} else if (content.toUpperCase().startsWith("CSF")) {
						uInfo.setIdNo(args);
						flag = "1";
					} else {
						flag = "2";

					}
					if ("1".equals(flag)) {

						List<UnicomManInfo> list = daoHelper.queryForList("staffinfo.queryUnicomInfo", uInfo);
						StringBuilder sb = new StringBuilder();
						sb.append("查询结果如下：\n");
						for (UnicomManInfo info : list) {
							sb.append(info.toString()).append("\n");
						}

						String tmp = sb.toString();
						if (tmp.getBytes("utf-8").length > 2047) {
							tmp = tmp.substring(0, 600) + ".....";
						}
						textMessage.setContent(tmp.trim());
					}

					if ("2".equals(flag)) {
						textMessage.setContent("对不起，指令错误！");
					}

					respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
				} else if (content.trim().length() > 2) {
					String switchVar = content.trim().substring(0, 2).toUpperCase();
					switch (switchVar) {
					case "SX":
						//刷新所有关注用户 
	
						List<String> openidList=UserService.getUserOpenIdList();
						for(String tmp:openidList){
							System.out.println(tmp);
							UserWeiXin user=UserService.getUserInfo(tmp);
							daoHelper.delete("staffinfo.deleteWeiXinUser",user);
							daoHelper.insert("staffinfo.insertWeiXinUser", user);
						}
						textMessage.setContent("刷新完毕！");
						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
						break;
					case "DH":
						String tmp = "";
						// 查询员工电话
						String staffName = content.trim().substring(2).trim();
						log.info("开始查询电话：" + staffName);
						QueryStaffPhone queryPhone = new QueryStaffPhone();
						List<StaffInfo> staffList = queryPhone.getPhoneByStaffName(staffName, daoHelper);
						if (staffList.size() > 0) {
							StringBuilder sb = new StringBuilder();
							for (StaffInfo staff : staffList) {
								sb.append(staff.toString()).append("\n");
							}
							tmp = sb.toString();
							if (tmp.getBytes("utf-8").length > 2047) {
								tmp = tmp.substring(0, 600) + ".....";
							}
							textMessage.setContent(tmp.trim());
						} else {
							textMessage.setContent("对不起，没有查询到结果。");

						}

						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);

						break;
					case "BD":

						// 绑定员工id

						// 先查询该微信是否已经绑定
						QueryStaffPhone queryPhone1 = new QueryStaffPhone();
						List<StaffInfo> staffList1 = queryPhone1.getPhoneByOpenID(openID, daoHelper);

						if (!staffList1.isEmpty()) {

							textMessage.setContent("对不起，您已经成功绑定过，您绑定的工号为：" + staffList1.get(0).getStaffNo() + "  员工姓名为：" + staffList1.get(0).getStaffName());

						} else {

							String staffNo = content.substring(2).trim();
							// ,首先查询员工id,存在不存在

							staffList1 = queryPhone1.getPhoneByStaffNo(staffNo, daoHelper);
							if (staffList1.isEmpty()) {
								// 工号不存在
								textMessage.setContent("对不起，您输入的工号有误，请重新绑定，回复格式如下：\n bd 工号  。");
							} else {
								// 开始绑定

								BandStaffId bd = new BandStaffId(daoHelper, openID, staffNo);
								if (bd.bandStaffById()) {
									textMessage.setContent("绑定成功，您的工号为：" + bd.getStaffNo() + "。 姓名为：" + staffList1.get(0).getStaffName()
											+ ",\n 如有错误，请反馈至行政人事部。谢谢！");

								} else {
									textMessage.setContent("对不起绑定失败！详情请咨询行政人事部。");

								}
								;
							}// 绑定结束
						}

						//
						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
						break;

					case "FY":
						// 翻译
						String src = content.trim().substring(2).trim();
						// 调用百度翻译的API接口
						textMessage.setContent(WeixinUtil.transMessage(src));
						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);

						break;

					case "GZ":
						String tmp1 = "";
						// String
						// tmp1="您2015年8月份工资如下：\n 姓名：XXX，工号：XXX 基本工资：1200元，工龄工资：20元，餐补：20元，奖金：200元，扣罚款：-5元，扣社保：-35元，实发：XXXX元。";

						QuerySalaryDetail qd = new QuerySalaryDetail(openID);
						tmp1 = qd.getSalaryDetailByOpenId(daoHelper);

						textMessage.setContent(tmp1);
						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
						break;

					case "WI":

						// String tmp2="SSD:  honest_guest\n密码:  jC837qAAQ3w4";
						List<Map<String, String>> list = daoHelper.queryForList("staffinfo.queryCommInfo", "wifi");
						textMessage.setContent(list.get(0).get("INFO_VALE"));
						respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
						break;

					}// end switch

				} else if ("1".equals(content)) {
					Article article = new Article();
					article.setTitle("我是一条单图文消息");
					article.setDescription("我是描述信息，哈哈哈哈哈哈哈。。。");
					article.setPicUrl("http://www.iteye.com/upload/logo/user/603624/2dc5ec35-073c-35e7-9b88-274d6b39d560.jpg");
					article.setUrl("http://tuposky.iteye.com");
					articleList.add(article);
					// 设置图文消息个数
					newsMessage.setArticleCount(articleList.size());
					// 设置图文消息包含的图文集合
					newsMessage.setArticles(articleList);
					// 将图文消息对象转换成xml字符串
					respMessage = MessageService.bulidSendMessage(newsMessage, ConstantWeChat.RESP_MESSAGE_TYPE_NEWS);

				}
				// 多图文消息
				else if ("3".equals(content)) {

					Article article1 = new Article();
					article1.setTitle("我是一条多图文消息");
					article1.setDescription("");
					article1.setPicUrl("http://www.isic.cn/viewResourcesAction//logo/20130913/2013091314543416032.jpg");
					article1.setUrl("http://tuposky.iteye.com/blog/2008583");

					Article article2 = new Article();
					article2.setTitle("微信公众平台开发教程Java版（二）接口配置 ");
					article2.setDescription("");
					article2.setPicUrl("http://www.isic.cn/viewResourcesAction//logo/20131021/2013102111243367254.jpg");
					article2.setUrl("http://tuposky.iteye.com/blog/2008655");

					Article article3 = new Article();
					article3.setTitle("微信公众平台开发教程Java版(三) 消息接收和发送");
					article3.setDescription("");
					article3.setPicUrl("http://www.isic.cn/viewResourcesAction//logo/20131021/2013102111291287031.jpg");
					article3.setUrl("http://tuposky.iteye.com/blog/2017429");

					articleList.add(article1);
					articleList.add(article2);
					articleList.add(article3);
					newsMessage.setArticleCount(articleList.size());

					newsMessage.setArticles(articleList);
					respMessage = MessageService.bulidSendMessage(newsMessage, ConstantWeChat.RESP_MESSAGE_TYPE_NEWS);
				}

				break;

			case ConstantWeChat.REQ_MESSAGE_TYPE_VOICE:
				// 语音消息

				// 语音信息
				voicMessage = requestMap.get("Recognition");
				if ("你好漂亮".equals(voicMessage)) {

					textMessage.setContent("没有小聂漂亮！ ：）");
				} else if (voicMessage.indexOf("电话") != -1) {
					if (voicMessage.indexOf("小聂") != -1) {

						textMessage.setContent("小聂的电话是：15937190425");
					} else {
						textMessage.setContent("对不起，没有听懂您说的是谁。");

					}
				} else

				{
					textMessage.setContent("您说的是：" + voicMessage);
				}
				respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
				// 事件处理开始

				break;
			case ConstantWeChat.REQ_MESSAGE_TYPE_EVENT:
				// 事件

				// 事件类型
				String eventType = requestMap.get("Event");

				String eventKey = ""; // 事件参数，这里是扫描带参数的二纬码

				switch (eventType) {

				case ConstantWeChat.EVENT_TYPE_SUBSCRIBE:
					// 关注
					// 关注
					// respContent = "感谢您关注偶,这里会给您提供最新的公司资讯和公告！\n";
					// StringBuffer contentMsg = new StringBuffer();
					// contentMsg.append("您还可以回复下列数字，体验相应服务").append("\n\n");
					// contentMsg.append("1  我就是个测试的").append("\n");
					// contentMsg.append("2  我啥都木有").append("\n");
					// contentMsg.append("3  我是多图文").append("\n");
					// respContent = respContent + contentMsg.toString();

					eventKey = requestMap.get("EventKey"); // 扫描带参数的二纬码，取得参数（用户未关注时）
					if (!eventKey.equals("")) { // 用户通过扫描参数二纬码关注。
						eventKey = eventKey.substring(8);

					}

					Article article = new Article();
					article.setTitle("欢迎关注奥特制衣");
					article.setDescription("奥特制衣全称“郑州奥特制衣有限公司”（Zhengzhou Honest Clothes Making CO.TD,.）。成立于1979年，1994年通过外经贸部批准获得自营出口权，是一家专业生产、出口服装的工贸一体化企业。");
					article.setPicUrl("http://7xl9wm.com1.z0.glb.clouddn.com/奥特楼.jpg");
					article.setUrl("http://mp.weixin.qq.com/s?__biz=MjM5NDY1MjY0Nw==&mid=401352318&idx=1&sn=cf20744da1941afeff89b5982a634a45");
					articleList.add(article);
					// 设置图文消息个数
					newsMessage.setArticleCount(articleList.size());
					// 设置图文消息包含的图文集合
					newsMessage.setArticles(articleList);
					// 将图文消息对象转换成xml字符串
					respMessage = MessageService.bulidSendMessage(newsMessage, ConstantWeChat.RESP_MESSAGE_TYPE_NEWS);

					// 记录关注者到数据库里边
					
					UserWeiXin user=UserService.getUserInfo(openID);
					daoHelper.delete("staffinfo.deleteWeiXinUser",user);
					daoHelper.insert("staffinfo.insertWeiXinUser", user);
					
					//发一条模板消息
					TemplateMessage message=new TemplateMessage();
					
				
					message.setTemplate_id("cspAlrWNRnjGRUXfehTxztApcOKLcb7PjSG2YP0Yh50");
					message.setUrl(user.getHeadimgurl()); //增加关注者的头像
					Map<String,Map<String,String>> data=new HashMap<String,Map<String,String>>();
					Map<String,String> maps1 =new HashMap<String,String>();
					maps1.put("value", "测试消息：刚刚 "+user.getNickname() +" 关注了奥特制衣微信公众号");
					data.put("first", maps1);
					
					Map<String,String> maps2 =new HashMap<String,String>();
					maps2.put("value", user.getNickname());
					data.put("keyword1", maps2);
					
					Map<String,String> maps3 =new HashMap<String,String>();
					maps3.put("value", user.getOpenid());
					data.put("keyword2", maps3);
					
					Map<String,String> maps4 =new HashMap<String,String>();
					SimpleDateFormat sf= new SimpleDateFormat("yy/MM/dd HH:mm");
					maps4.put("value",  sf.format(user.getSubscribe_time()));
					data.put("keyword3", maps4);
					
					Map<String,String> maps5 =new HashMap<String,String>();
					maps5.put("value",  "这是一条测试消息，每当有人关注微信公众号时会向指定人发送通知。--song");
					data.put("remark", maps5);
					
					message.setData(data);
					
					List<String> toUserList=new ArrayList<String>();
					toUserList.add("o53-7jm77BhNxElMDKwgQXw-r2gQ"); //宋浩莹的 openid
					toUserList.add("o53-7jtGytAMbEjukXv5RpUPODlI");//李钊的openid
					
					for (String toUser:toUserList){
						message.setTouser(toUser);
						TemplateMessageService.sendTemplateMessae(message);
					}
					
					
					break;

				case ConstantWeChat.EVENT_TYPE_UNSUBSCRIBE:
					// 取消关注
					// 取消关注,用户接受不到我们发送的消息了，可以在这里记录用户取消关注的日志信息
					
					daoHelper.update("staffinfo.unsubscribe",openID);
					textMessage.setContent(respContent);
					respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
					
					break;

				case ConstantWeChat.EVENT_TYPE_CLICK:
					// 点击菜单
					// 事件KEY值，与创建自定义菜单时指定的KEY值对应
					eventKey = requestMap.get("EventKey");

					// 自定义菜单点击事件
					if (eventKey.equals("11")) {
						respContent = "天气预报菜单项被点击！";
					} else if (eventKey.equals("12")) {
						respContent = "公交查询菜单项被点击！";
					}
					textMessage.setContent(respContent);
					respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
					break;

				case ConstantWeChat.EVENT_TYPE_SCAN:
					// 扫描二纬码
					eventKey = requestMap.get("EventKey");
					textMessage.setContent("你扫描的是" + eventKey + "号二纬码");
					respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
					break;
				
				case ConstantWeChat.EVENT_TYPE_LOCATION:
					//上报地理位置
					//可以做一些其它操作
					isReply=false;  //得到用户的地址位置，此时不回复用户默认回复信息
				}

				break;

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		if ("".equals(respMessage)&&isReply==true) {
			// 如果发送的指令系统未识别的话，默认回复如下信息
			// 回复帮助信息
			TextMessage textMessage = (TextMessage) MessageService.bulidBaseMessage(requestMap, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);
			List<Map<String, String>> list = daoHelper.queryForList("staffinfo.queryCommInfo", "help");
			textMessage.setContent(list.get(0).get("INFO_VALE"));
			respMessage = MessageService.bulidSendMessage(textMessage, ConstantWeChat.RESP_MESSAGE_TYPE_TEXT);

		}
		return respMessage;
	}

	public static void main(String args[]) {
		System.out.println("关机".length());
		String content = "wifi";
		String switchVar = content.trim().substring(0, 2).toUpperCase();
		System.out.println(switchVar);
		System.out.println(switchVar.length());

	}
}
