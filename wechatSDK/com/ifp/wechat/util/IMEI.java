package com.ifp.wechat.util;

import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.security.MessageDigest;
import java.util.HashMap;

/**
 * 安卓微信的打开密码由两个部分组成，一个是imei另一个是uin。这个imei好取得，但是uin可不是那么好取得的。
       不知大家注意到没有，在MicroMsg文件夹下有两个cfg文件。一个是systeminfo.cfg另一个是compatibleinfo.cfg。
在这两个文件中，用户的imei和uin以hashmap的方式进行存储。

 * @author song
 *
 */

public class IMEI {
	public static void main(String[] args) {
		try {
			ObjectInputStream in = new ObjectInputStream(new FileInputStream("c:\\systemInfo.cfg"));
			Object DL = in.readObject();
			HashMap hashWithOutFormat = (HashMap) DL;
			ObjectInputStream in1 = new ObjectInputStream(new FileInputStream("c:\\CompatibleInfo.cfg"));
			Object DJ = in1.readObject();
			HashMap hashWithOutFormat1 = (HashMap) DJ;
			String s = String.valueOf(hashWithOutFormat1.get(Integer
					.valueOf(258))); // 取手机的IMEI
			//s = s + hashWithOutFormat.get(Integer.valueOf(1)); // 合并到一个字符串
			s = s + "236488855"; // 合并到一个字符串  // 这个是我的微信uin 是通过chrome浏览
			s = encode(s); // hash
			System.out.println("The Key is : " + s.substring(0, 7));
			in.close();
			in1.close();
			//System.out.println(Integer .valueOf(258));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String encode(String content) {
		try {
			MessageDigest digest = MessageDigest.getInstance("MD5");
			digest.update(content.getBytes());
			return getEncode32(digest);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	private static String getEncode32(MessageDigest digest) {
		StringBuilder builder = new StringBuilder();
		for (byte b : digest.digest()) {
			builder.append(Integer.toHexString((b >> 4) & 0xf));
			builder.append(Integer.toHexString(b & 0xf));
		}
		return builder.toString();

	}
}