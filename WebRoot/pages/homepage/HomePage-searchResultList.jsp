<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="b" uri="/bonc-tags"%> 
<%@ taglib prefix="s" uri="/struts-tags"%>
 <ul>
	 <s:iterator value="searchList">
	 	<li><span>[<b:inputProperty value="RECORD_DATE" fp="yyyy-MM-dd"/>]</span><a href="javascript:news_show('<s:property value='NEWS_ID'/>','6')">·<s:property value="NEWS_TITLE"/></a></li> 
	 </s:iterator>     
</ul> 
<div ><b:pagiLink target="searchList"/> </div>