/**
 * 绑定微信的action
 */
package com.honest1994.wechat;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;

 
import com.honest1994.BaseAction;
import com.ifp.wechat.service.SignService;
import org.apache.log4j.Logger;

/**
 * @author songhaoying * 2015.06.30
 * 
 */
public class ServicesAction extends BaseAction {

	private Logger log =Logger.getLogger(ServicesAction.class);
	/**
	 * 微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
	 */
	private String signature;

	/**
	 * 时间戳
	 */
	private String timestamp;

	/**
	 * 随机数
	 */
	private String nonce;

	/**
	 * 随机字符串
	 */
	private String echostr;

	/**
	 * 微信绑定url主方法
	 * 
	 * 开发者通过检验signature对请求进行校验（下面有校验方式）。若确认此次GET请求来自微信服务器，请原样返回echostr参数内容，则接入生效
	 * ，成为开发者成功，否则接入失败。
	 * 
	 * 加密/校验流程如下： 1. 将token、timestamp、nonce三个参数进行字典序排序 2.
	 * 将三个参数字符串拼接成一个字符串进行sha1加密 3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
	 * 
	 * @return
	 */
	public String execute() {
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request=ServletActionContext.getRequest();
		response.setCharacterEncoding("UTF-8");
		
        if (request.getMethod().equalsIgnoreCase("POST")){
        	//处理业务核心请求
        	String respMessage = WechatService.processWebchatRequest(request,this.daoHelper);
		PrintWriter out = null;
		try {
			 
			out=response.getWriter();
		  log.info("POST请求！");
		  log.info("返回内容为："+respMessage);
		  out.print(respMessage);
			 
		} catch (IOException e) {
			log.error( "er:-"+e.getMessage());
			e.printStackTrace();
		} finally {
			out.close();
			out=null;
		}

		return null;

	}
        
        if (request.getMethod().equals("GET")){
        	log.info("get请求");
		PrintWriter out = null;
		try {
			
			out=response.getWriter();
			if (SignService.checkSignature(signature, timestamp, nonce)) {
				System.out.println("signature:"+this.signature+";    timestamp:"+this.timestamp+";  noce:"+this.nonce+"; echostr:"+this.echostr);
				out.write(this.echostr);
			} else {
				log.info("错误！");
			} 
		} catch (IOException e) {
			log.error( "er:-"+e.getMessage());
			e.printStackTrace();
		} catch (Exception e) {
			out.println("非法请求！");
			log.error("error:\n"+e.getMessage());
			e.printStackTrace();
		}
		finally {
			out.close();
			out=null;
		}

		return null;

	}
        return null;
        }
	
	

	public String test() {
		HttpServletResponse response = ServletActionContext.getResponse();
		HttpServletRequest request=ServletActionContext.getRequest();
		response.setCharacterEncoding("UTF-8");
		
        if (request.getMethod().equalsIgnoreCase("POST")){
        	//处理业务核心请求
        	String respMessage = WechatService.processWebchatRequest(request,this.daoHelper);
		PrintWriter out = null;
		try {
			 
			out=response.getWriter();
		  log.info("POST请求！");
		  out.print(respMessage);
		  log.info("返回内容为："+respMessage);
			 
		} catch (IOException e) {
			log.error( "er:-"+e.getMessage());
			e.printStackTrace();
		} finally {
			out.close();
			out=null;
		}

		return null;

	}
        
        if (request.getMethod().equals("GET")){
        	log.info("get请求");
		PrintWriter out = null;
		try {
			
			out=response.getWriter();
			if (SignService.checkSignature(signature, timestamp, nonce)) {
				System.out.println("signature:"+this.signature+";    timestamp:"+this.timestamp+";  noce:"+this.nonce+"; echostr:"+this.echostr);
				out.write(this.echostr);
				out.write("dfdafdf");
			} else {
				log.info("错误！");
			} 
		} catch (IOException e) {
			log.error( "er:-"+e.getMessage());
			e.printStackTrace();
		} finally {
			out.close();
			out=null;
		}

		return null;

	}
        return null;
        }

	/**
	 * @return the signature
	 */
	public String getSignature() {
		return signature;
	}

	/**
	 * @param signature
	 *            the signature to set
	 */
	public void setSignature(String signature) {
		this.signature = signature;
	}

	/**
	 * @return the timestamp
	 */
	public String getTimestamp() {
		return timestamp;
	}

	/**
	 * @param timestamp
	 *            the timestamp to set
	 */
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}

	/**
	 * @return the nonce
	 */
	public String getNonce() {
		return nonce;
	}

	/**
	 * @param nonce
	 *            the nonce to set
	 */
	public void setNonce(String nonce) {
		this.nonce = nonce;
	}

	/**
	 * @return the echostr
	 */
	public String getEchostr() {
		return echostr;
	}

	/**
	 * @param echostr
	 *            the echostr to set
	 */
	public void setEchostr(String echostr) {
		this.echostr = echostr;
	}

}
