Ext.define("core.util.DesktopUtil",{
	mixins:{
		menuUtil:"core.util.MenuUtil"
	},
	//当点击该图标后获取菜单选项
	/*
	 * 判断当点击桌面图标后该图标是功能还是菜单，如果是功能则分割nodeInfo信息，
	 * 提取控制器地址，返回获取功能按钮的主界面xtype
	 * 如果判断是菜单则获取该id,得到菜单树数据集并找出数据集中节点为id下的子数据集
	 * 
	 */
	getMenuItems:function(record,me){
		var self=this;
		var items=null;
		//加载菜单
		if(record.get("nodeInfoType")=="MENU"){						//如果叶子类型为菜单类型
			var id=record.get("id");													//获取ID
			var menuTreeStore=comm.get("menuTreeStore");		//获取菜单树数据集
			var node=menuTreeStore.getNodeById(id);				//获取指定ID菜单树数据集
			var data=self.buildMenuData(node);							//将该叶子下的所有数据传换成数组对像
			var dataView=Ext.create("Ext.ux.desktop.FolderView",{	//建立一个文件类视图
				listeners:{																			//添加文件夹中按钮单击事件
					itemclick:function(dv,record,item,index,e,eOpts){
						me.onShortcutItemClick(dv,record);					
					}
				}
			});
			dataView.getStore().loadData(data);
			items=dataView;
		//加载功能
		}else{
			var nodeInfo=record.data.nodeInfo;
        	var config=nodeInfo.split(",");
			var controller=coreApp.getController(config[1]);
			//if(!controller.inited){controller.init();controller.inited=true};
        	items={xtype:config[0]};
		}
		return items;
	},
	
	//加载文件夹数据
	loadFolderData:function(record,win,me,isHander){
		var self=this;
		var dataView=win.down("folderdataview");
		var id=record.get("id");
		var menuTreeStore=comm.get("menuTreeStore");
		var node=menuTreeStore.getNodeById(id);
		var data=self.buildMenuData(node);
		var store=dataView.getStore();
		if(isHander){
			store.loadData(data);
			return;
		}
		//如果你点击的是文件夹中的数据
		if(store.findRecord("id",record.get("id"))){
			var toolbar=win.down("toolbar");
			toolbar.add(">");
			toolbar.add({
				xtype:"button",
				text:"<b>"+record.get("text")+"</b>",
				handler:function(btn){
					while(btn.nextSibling()){
								btn.ownerCt.remove(btn.nextSibling());
							}
					self.loadFolderData(record,win,me,true);
				}
			});
		}else{
			var taskButton=me.taskbar.getTaskButton(win.taskButton);
			if(taskButton){
				taskButton.setText(record.get("text"));
				taskButton.setIcon(record.get("icon"));
			}
			win.setTitle(record.get("text"));
			win.setIcon(record.get("icon"));
			var toolbar=win.down("toolbar");
			toolbar.removeAll();
			toolbar.add({
				xtype:"button",
				text:"<b>"+record.get("text")+"</b>",
				handler:function(btn){
					while(btn.nextSibling()){
								btn.ownerCt.remove(btn.nextSibling());
							}
					self.loadFolderData(record,win,me);
				}
			});
		}
		store.loadData(data);
	}
});