<%@ page contentType="text/html; charset=UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

%>
<!DOCTYPE HTML>
<html>
  <head>
  <base href="<%=basePath%>">
  <title>桌面化系统</title>
  
  
 
 <link rel="stylesheet" type="text/css" href="MyDesktop/js/core/resources/css/ext-all-neptune.css" />
 <script type="text/javascript" src="MyDesktop/js/core/ext-all-debug.js"></script>  
 <link rel="shortcut icon" href="/web/platform/login/images/favicon.ico"/>
 <link rel="stylesheet" type="text/css" href="MyDesktop/shared/example.css" />
 <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/TabScrollerMenu.css" />
 <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/GridWarn.css" />
 <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/CheckHeader.css" />
  <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/desktop.css" />
  <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/progress_bar.css" />
  <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/data-view.css" /> 
  <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/ItemSelector.css" />
  <link rel="stylesheet" type="text/css" href="/web/core/css/comm.css" /> 
  <link rel="stylesheet" type="text/css" href="/web/core/css/icon.css" /> 
  <link rel="stylesheet" type="text/css" href="/web/MyDesktop/css/web4d.css" /> 
   <!-- <link rel="stylesheet" type="text/css" href="/web/core/css/diy.css" /> -->
  <script type="text/javascript" src="MyDesktop/js/core/ext-lang-zh_CN.js"></script>
  <script type="text/javascript" src="MyDesktop/shared/examples.js"></script>
  <script type="text/javascript" src="MyDesktop/images/clock/media/swfobject.js"></script>
  <script type="text/javascript" src="MyDesktop/images/clock/media/soundmanager2.js"></script>
  <script type="text/javascript" src="/web/core/coreApp/util/overrideUtil.js"></script>
  <script type="text/javascript" src="/web/core/coreApp/util/comm.js"></script>
  <script type="text/javascript" src="/web/core/loader.js"></script>
  <script type="text/javascript" src="/web/core/app.js"></script>
  <!-- <script type="text/javascript" src="/web/toolbar.js"></script> -->
  <script type="text/javascript">
  function load(){
		Ext.MessageBox.confirm(
				'全屏确认','您想全屏显示吗?',
				function(choice) {
					if (choice == 'yes') {
						 var docElm=Ext.getDom(document).documentElement;
						 //W3C 
						if (docElm.requestFullscreen) { 
						docElm.requestFullscreen(); 
						} 
						//FireFox 
						else if (docElm.mozRequestFullScreen) { 
						docElm.mozRequestFullScreen(); 
						} 
						//Chrome等 
						else if (docElm.webkitRequestFullScreen) { 
						docElm.webkitRequestFullScreen(); 
						} 
						//IE11 
						else if (docElm.msRequestFullscreen) { 
						docElm.msRequestFullscreen(); 
						}    
					}
				});
  }
  </script>
</head>
<body>
	<script type="text/javascript">
	
			var screenHeight = (document.documentElement.scrollHeight >document.documentElement.clientHeight) ? document.documentElement.scrollHeight : document.documentElement.clientHeight; 
			var screenWidth=(document.documentElement.scrollWidth>document.documentElement.clientWidth) ? document.documentElement.scrollWidth : document.documentElement.scrollWidth; 
			var clientWidth = document.body.clientWidth;
			var clientHeight = document.body.clientHeight;
			var resolutionHeight = window.screen.height;
			var resolutionWidth = window.screen.width;
			comm.add("clientWidth",clientWidth);
			comm.add("clientHeight",clientHeight);
			comm.add("screenWidth",screenWidth);
			comm.add("screenHeight",screenHeight);
			comm.add("resolutionWidth",resolutionWidth);
			comm.add("resolutionHeight",resolutionHeight);   
           /*改造窗体的层次*/
           Ext.override(Ext.ZIndexManager, {
               tempHidden: [],
               show: function () {
                   var comp, x, y;
                   while (comp = this.tempHidden.shift()) {
                       x = comp.x;
                       y = comp.y;
                       comp.show();
                       comp.setPosition(x, y);
                   }
               }
           });       

           Ext.Loader.setConfig({
                 enabled: true,
                 paths: {
                     'Ext.ux.desktop': 'MyDesktop/js',
                       'MyDesktop': 'MyDesktop'
                 }
             });    
           
           Ext.require([
                   'MyDesktop.App'
                   ]);
 
           var myDesktopApp;
           Ext.onReady(function () {
               myDesktopApp = new MyDesktop.App();
           });
       </script>
</body>
</html>