/**
 * 入口
 */
Ext.onReady(function(){
	Ext.application({
		name:"core",				//引用的名称
		scope :this,
        appFolder : "core/coreApp", //应用的目录
        launch:function(){			//当前页面加载完成执行的函数
        	 var mainPageItems=parseInt((comm.get("screenHeight")-38-42-32-40-12-26)/35);
        	 var pageItems=Math.ceil((comm.get("screenHeight") -38-32-40-6)/25.5);
        	 comm.add("mainPageItems",mainPageItems);
        	 comm.add("pageItems",pageItems);
        },
        controllers:[
         "core.app.controller.MainController"          //装在主控制器
        ]

	});
});


