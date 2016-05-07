/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	config.language = 'zh-cn';//中文
	config.font_names = '宋体;楷体_GB2312;新宋体;黑体;隶书;幼圆;微软雅黑;Arial;Comic Sans MS;Courier New;Tahoma;Times New Roman;Verdana';
	config.skin = 'v2';
	config.toolbar_Full = [
			[ 'Source', '-', 'Preview', '-', 'Templates' ],
			[ 'Bold', 'Italic', 'Underline', 'Strike', '-', 'Subscript',
					'Superscript' ],
			[ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent',
					'Blockquote', 'CreateDiv' ],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ],
			[ 'Link', 'Unlink', 'Anchor','Image'], '/',
			[ 'Styles', 'Format', 'Font', 'FontSize' ],
			[ 'TextColor', 'BGColor' ],
			[ 'Maximize', 'ShowBlocks', '-', 'About' ] ];

	config.toolbar_Basic = [ [ 'Bold', 'Italic', '-', 'NumberedList',
			'BulletedList', '-', 'Link', 'Unlink', '-', 'About' ] ];

	config.width = 710;//宽度

	config.height = 180;//高度
	config.resize_enabled =false;
};
