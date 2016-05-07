package com.honest1994.wechat;

import com.ifp.wechat.entity.menu.Button;
import com.ifp.wechat.entity.menu.Menu;
import com.ifp.wechat.util.WeixinUtil;

/**
 * 创建微信菜单
 * @author songhaoying
 *
 */
public class MenuService {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Button sb2 = new Button("微客服", "click", "wchat_CustomerService_01", null, null);
		Button btn1 = new Button("", "click", null, null, new Button[] {sb2 });

		Button sb3 = new Button("公司简介", "click", "23", null, null);
		Button sb4 = new Button("有问必答", "click", "45", null, null);
		
		Button btn2 = new Button("音智达", "click", null, null, new Button[] {
				sb3, sb4 });

		Button sb6 = new Button("view类型", "view", null, "http://m.baidu.com",
				null);
		
		Button btn3 = new Button("最新动态", "click", null, null, new Button[] {
				sb6 });

		Menu menu = new Menu(new Button[] { btn1, btn2, btn3 });
//		createMenu(menu);
		
		//com.ifp.wechat.service.MenuService.createMenu(menu);
		System.out.println(WeixinUtil.getToken());
		System.out.println(com.ifp.wechat.service.MenuService.getMenuJson());

	}

}
