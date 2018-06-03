/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
	//需要的文件
    requires: [
        'Ext.window.MessageBox',
		'Ext.ux.desktop.Module',
        'Ext.ux.desktop.ShortcutModel',
        'MyDesktop.Settings',
        'MyDesktop.StoredProcedure'
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        return [];
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent();
        //加载按钮信息
		var menuUtil=Ext.create("core.util.MenuUtil");
		menuUtil.initMenu();
		var menuTreeStore=comm.get("menuTreeStore");
		var moduleData=menuUtil.buildMenuData(menuTreeStore.getRootNode());
        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',
			
        	
            contextMenuItems: [
                { text: '更改背景', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: factory.ModelFactory.getModelByName("com.desktop.model.extjs.JSONTreeNode","checked").modelName,
                data: moduleData
            }),
            wallpaper: 'MyDesktop/wallpapers/Zowee.jpg',
            wallpaperStretch: true
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: '系统',
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'清除缓存',
                        iconCls:'clear_cache',
                        handler: me.onClear,
                        scope: me
                    },'-',{
                        text:'更改背景',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',{
						text:'存储过程',
						iconCls:'settings',
						handler:me.onStoredProcedure,
						scope:me
					},
					'-',                    
                    {
                        text:'退出系统',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    //任务栏位配置
    getTaskbarConfig: function () {
    	var me = this;
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [
//                { name: '清除缓存', iconCls: 'accordion',handler:me.onClear}
//                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        Ext.Msg.confirm('提示', '确定要退出系统么?',function(btn,text){
        	if(btn=='yes'){
        		window.location.href="/web/j_spring_security_logout";
        	}
        });
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    },
    onStoredProcedure:function(){
    	var dlg = new MyDesktop.StoredProcedure({
            desktop: this.desktop
        });
        dlg.show();
    },
    onClear:function(){
    	//前台清理
    	factory.DDCache.clearAll();
    	//后台清理
    	var suppUtil=Ext.create("core.util.MessageUtil");
    	Ext.Ajax.request({
    		url:"/web/core/ddAction!clearAll.action",
    		method:"POST",
			async:false,
			success:function(response){
				var resObj=Ext.decode(response.responseText);
				if(resObj.success){
					suppUtil.msgbox(resObj.obj);
				}else{
					alert(resObj.obj);
				}
			}
    	});
    }
});
