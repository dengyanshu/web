Ext.define("core.util.MenuUtil",{
	mixins:{
		suppleUtil:"core.util.SuppleUtil"
	},
	/**
	 * 加载当前登录的人权限按钮
	 */
	initMenu:function(){
		var self=this;
		var data=self.ajax({url:"/web/rbac/permAction!getAuthorMenuTree.action",params:{excludes:"checked"}});
		
		//添加网页跟路径名称(web)
	/*	for(var i=0;i<data.length;i++){
			data[i].bigIcon="/web"+data[i].bigIcon;
			data[i].icon="/web"+data[i].icon;
		}
	*/	
		//创建一个树型数据集,获取当前人员的权限按钮
		var menuTreeStore=Ext.create("Ext.data.TreeStore",{
			model:factory.ModelFactory.getModelByName("com.desktop.model.extjs.JSONTreeNode","checked").modelName,
			defaultRootId:"ROOT",
			root:{
				text:"ROOT",
				code:"ROOT",
				children:data
			}
		});
		//将次树添加到静态变量中
		comm.add("menuTreeStore",menuTreeStore);
	},
	/**
	 * 构建菜单数据  遍历node树中的每项放到数组data中并返回 
	 * @param {} node
	 * @return {}
	 */
	buildMenuData:function(node){
		var data=new Array();
		node.eachChild(function(n){
			data.push(n.raw);
		});
		return data;
	},
	/**
	 * 构建开始菜单中的项
	 * @param {} node
	 */
	buildStartMenu:function(root,me){
		var rootMenu={};
		var eachMenus = function(node,menu){
              node.eachChild(function(n){
	           var menuObj={
	           		text:n.get("text"),
	           		icon:n.get("icon"),
	           		handler:function(){
		            	 me.desktop.onShortcutItemClick(null,n);
		            }
	           };
	           if(menu.menu){
	           		menu.menu.items.push(menuObj);
	           }else{
	           		menu.menu={
	           			items:[menuObj]
	           		};
	           }
               eachMenus(n,menuObj);
            });
		};
		eachMenus(root,rootMenu);
		if(rootMenu.menu){
			return rootMenu.menu.items;
		}else{
			return [];
		}
	}
});