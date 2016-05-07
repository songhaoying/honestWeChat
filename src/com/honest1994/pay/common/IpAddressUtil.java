package com.honest1994.pay.common;

import javax.servlet.http.HttpServletRequest;

/**
 * @(#)IpAddressUtil.java 
 *       
 * 获取客户端ip公用方法
 */
public class IpAddressUtil {
	public static String getIpAddr(HttpServletRequest request){
		String ip = request.getHeader("X-Forwarded-For"); 
		
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("X-Real-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("Proxy-Client-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getHeader("WL-Proxy-Client-IP"); 
		} 
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
			ip = request.getRemoteAddr(); 
		}
		if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)){
			ip="0.0.0.0";
		}else{
		
			String[] ips = ip.split(",");
			
			for(String tempIp:ips){
				if(!tempIp.equalsIgnoreCase("unknown")){
					ip = tempIp;
					break;
				}
			}
		}
		
		return ip.trim(); 
	}
}