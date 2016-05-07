package com.honest1994.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import common.Logger;

/**
 * 用来执行dos命令
 * @author songhaoying
 *
 */
public class Command {
	public static Logger log=Logger.getLogger(Command.class);
	public static String exec(String cmd ,boolean bool ){
		
		StringBuffer resStr = new StringBuffer();  
		 try  
	        {  
	            // 执行ping命令  
	            Process process = Runtime.getRuntime().exec(cmd);
	            if (bool){
	            process.waitFor();
	            // 记录dos命令的返回信息  
	            // 获取返回信息的流  
	            InputStream in = process.getInputStream();  
	            Reader reader = new InputStreamReader(in,"GBK");  
	            BufferedReader bReader = new BufferedReader(reader);  
	            for (String res = ""; (res = bReader.readLine()) != null;)  
	            {  
	                resStr.append(res + "\n");  
	            }  
	            bReader.close();  
	            reader.close();  
	            System.out.println(resStr.toString()); 
	            }
	            System.out.println("okok"); 
	            
	        } catch (IOException e)  
	        {  
	            e.printStackTrace();
	            log.error("Error:-------------"+ e.toString());
	        } catch (InterruptedException e) {
			 
				e.printStackTrace();
				log.error("Error:-------------"+ e.toString());
			}  
		 return resStr.toString();
	}
	
	public static void main(String [] args){
		Command.exec("d:\\shutdownWX.bat",false);
		System.out.print("ok");
	}
}
