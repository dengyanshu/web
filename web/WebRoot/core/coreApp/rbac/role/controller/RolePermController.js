Ext.define("core.rbac.role.controller.RolePermController",{
	extend:"Ext.app.Controller",
	//引入以下类
	mixins: {
		suppleUtil:"core.util.SuppleUtil", 			//同步请求Ajax
		messageUtil:"core.util.MessageUtil",		//提示信息
		formUtil:"core.util.FormUtil",				//设置获取表单的值
		treeUtil:"core.util.TreeUtil",				//递归获取节点的信息
		gridActionUtil:"core.util.GridActionUtil",	//得到默认值对象
		queryUtil:"core.util.QueryUtil"				//查询树形
	},
	stores:[
		"core.rbac.role.store.RoleStore",
		"core.rbac.role.store.ModuleStore",
		"core.rbac.role.store.UserStore"
	],
	views:[
		"core.rbac.role.view.MainLayout",
		"core.rbac.role.view.RoleTree",
		"core.rbac.role.view.CenterLayout",
		"core.rbac.role.view.RoleForm",
		"core.rbac.role.view.UserGrid",
		"core.rbac.role.view.ModuleTree"
	],

	
	init:function(){
		var self=this;
		//添加权限的方法
		self.setPerm=function(tree,records,roleId){
			var oldSelection=tree.oldSelection;
				//需要 添加的权限
				var addIds=new Array();
				var delIds=new Array();
				Ext.each(records,function(rec,index){
					var id=rec.get("id");
					for(var i=0;i<oldSelection.length;i++){
					var old=oldSelection[i];
					if(old.get("id")==id){
						//暂时设置不操作的主键值
						old.set("id","STATUS");
							break;
					}
					//如果从初始的选中没有找到则代表需要添加这条权限
						if(i==oldSelection.length-1){
							addIds.push(id);
						}
					}
					if(oldSelection.length<=0){
						addIds.push(id);								
					}		
				});
				//放到外边。考虑到如果当前选中为空但是也需要删除权限
				Ext.each(oldSelection,function(old){
					if(old.get("id")!="STATUS"){
						delIds.push(old.get("id"));									
					}
				});
			var resObj=self.ajax({url:"/web/rbac/permAction!updatePerm.action",params:{roleId:roleId,addIds:addIds.join(","),delIds:delIds.join(",")}});
			if(resObj.success){
				self.msgbox("授权成功");
			}else{
				alert(resObj.obj);
			}
		};
		//事件注册
		this.control({
			"panel[xtype=role.roletree]":{
				itemclick:function(tree,record,item,index,e,eOpts){
					var mainLayout=tree.up("panel[xtype=role.mainlayout]");
					var roleForm=mainLayout.down("panel[xtype=role.roleform]");
					var roleTree=mainLayout.down("panel[xtype=role.roletree]");
					var formObj=roleForm.getForm();
					formObj.findField("roleName").setValue(record.get("text"));
					formObj.findField("roleCode").setValue(record.get("code"));
					formObj.findField("roleId").setValue(record.get("id"));
					formObj.findField("orderIndex").setValue(record.get("orderIndex"));
					var treeDel=roleTree.down("button[ref=treeDel]");
					treeDel.setDisabled(false);
					//加载人员信息
					var userGrid=mainLayout.down("panel[xtype=role.usergrid]");
					var store=userGrid.getStore();
					var proxy=store.getProxy();
					proxy.extraParams={
						roleId:record.get("id")					
					};
					store.load();
					
				}
			},
			"panel[xtype=role.roletree] button[ref=treeIns]":{
				click:function(btn){
					var tree=btn.up("panel[xtype=role.roletree]");
					var root=tree.getRootNode();
					var params={
						
					};
					var resObj=self.ajax({url:"/web/rbac/roleAction!doSave.action",params:params});
					if(resObj.success){
						var roleObj=resObj.obj;				
						params.parent="ROOT";
						params.id=roleObj.roleId;
						params.leaf=true;
						params.text=roleObj.roleName;
						params.code=roleObj.roleCode;
						params.icon=roleObj.icon;
						var node=root.appendChild(params);
						tree.fireEvent("itemclick",tree.getView(),node);	
					}
				}
			},
			"panel[xtype=role.roleform] button[ref=submit]":{
				click:function(btn){
					var deptForm=btn.up("panel[xtype=role.roleform]");
					var formObj=deptForm.getForm();
					
					var params=self.getFormValue(formObj);
					if(params.roleId!=null && params.roleId!=""){
						var resObj=self.ajax({url:"/web/rbac/roleAction!doUpdate.action",params:params});						
						if(resObj.success){
							var mainLayout=deptForm.up("panel[xtype=role.mainlayout]");
							var roleTree=mainLayout.down("panel[xtype=role.roletree]");
							var node=roleTree.getSelectionModel().getSelection()[0];
							var obj=resObj.obj;
							node.set("text",obj.roleName);
							node.set("code",obj.roleCode);
							node.set("id",obj.roleId);
							node.set("orderIndex",obj.orderIndex);
							node.set("icon",obj.icon);
							node.commit();
							self.msgbox("保存成功!");
						}else{
							alert(resObj.obj);
						}
					}else{
						alert("请选中节点");
					}
					
				}
			},
			/**
			 * 删除角色
			 */
			"panel[xtype=role.roletree] button[ref=treeDel]":{
				click:function(btn){
					var tree=btn.up("panel[xtype=role.roletree]");
					var records=tree.getSelectionModel().getSelection();
					if(records.length<=0){
						alert("请选中节点!");
						return;
					}
					var node=records[0];
					var resObj=self.ajax({url:"/web/rbac/roleAction!doRemove.action",params:{ids:node.get("id")}});
					if(resObj.success){
						tree.getStore().load();
						self.msgbox(resObj.obj);
					}else{
						alert(resObj.obj);
					}
				}				
			},
			"panel[xtype=role.usergrid] button[ref=addUser]":{
				click:function(btn){
					var mainLayout=btn.up("panel[xtype=role.mainlayout]");					
					var roleTree=mainLayout.down("panel[xtype=role.roletree]");			
					var selRoles=roleTree.getSelectionModel().getSelection();				
					var userGrid=btn.up("panel[xtype=role.usergrid]");
					
					//如果没有选中左边的角色则弹出信息
					if(selRoles.length<=0){
						alert("请选择角色");
						return;
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"组织结构",
						multiSelect:true,
						haveButton:true,
						isEmpty:false,
						config:{
							url:"/web/rbac/deptUserAction!getTree.action",
							params:{
								whereSql:" and 1=1",
								expanded:true
							}
						},
						callback:function(win,records){
							//点击确定之后会得到选中的数据做处理
							var ids=new Array();
							if(records.length>0){
							Ext.each(records,function(rec){
								ids.push(rec.get("id"));
							});
							var resObj=self.ajax({url:"/web/rbac/roleAction!addUsers.action",params:{roleId:role.get("id"),ids:ids.join(",")}});
								if(resObj.success){
									var proxy=userGrid.getStore().getProxy();
									proxy.extraParams={
										roleId:role.get("id")
									};
									userGrid.getStore().load();
									self.msgbox(resObj.obj);
								}else{
									alert(resObj.obj);
								}
							}
						}
					});	
				}
			},
			"panel[xtype=role.usergrid] button[ref=removeUser]":{
				click:function(btn){
					var mainLayout=btn.up("panel[xtype=role.mainlayout]");
					var userGrid=btn.up("panel[xtype=role.usergrid]");
					var roleTree=mainLayout.down("panel[xtype=role.roletree]");
					var userGrid=btn.up("panel[xtype=role.usergrid]");
					var records=userGrid.getSelectionModel().getSelection();
					var selRoles=roleTree.getSelectionModel().getSelection();
					
					if(selRoles.length<=0){
						alert("请选择角色");
						return;
					}
					var role=selRoles[0];
					if(records.length<=0){
						alert("请选择记录");
					}
					var ids=new Array();
					Ext.each(records,function(rec){
						ids.push(rec.get("userId"));
					});
					var resObj=self.ajax({url:"/web/rbac/roleAction!removeUsers.action",params:{roleId:role.get("id"),ids:ids.join(",")}});
					if(resObj.success){
						var proxy=userGrid.getStore().getProxy();
						proxy.extraParams={
								roleId:role.get("id")
						};
						userGrid.getStore().load();
						self.msgbox(resObj.obj);			
					}else{
						alert(resObj.obj);
					}
				}
			},
			/**
			 * 模块授权
			 */
			"panel[xtype=role.moduletree]":{
				itemdblclick:function(tree,record){
					var mainLayout=tree.up("panel[xtype=role.mainlayout]");
					var roleTree=mainLayout.down("panel[xtype=role.roletree]");
					var selRoles=roleTree.getSelectionModel().getSelection();
					if(selRoles.length<=0){
						alert("请选择角色");
						return;
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"授权管理",
						multiSelect:true,
						haveButton:true,
						isEmpty:true,
						config:{
							url:"/web/rbac/permAction!getPermTree.action",
							params:{
								whereSql:" and 1=1",
								isSee:false,								
								roleId:role.get("id"),
								nodeId:record.get("id"),
								expanded:true
							}
						},
						renderTree:function(tree){
							var records=tree.getChecked();
							tree.oldSelection=records;
							
						},
						callback:function(win,records){
							//点击确定之后会得到选中的数据做处理
							var tree=win.down("mttreeview");
							self.setPerm(tree,records,role.get("id"));
						}
					});
				}
			},
			/**
			 * 授权
			 */
			"panel[xtype=role.moduletree] button[ref=setPerm]":{
				click:function(btn){
					var mainLayout=btn.up("panel[xtype=role.mainlayout]");
					//角色树
					var roleTree=mainLayout.down("panel[xtype=role.roletree]");
					//得到选择集
					var selRoles=roleTree.getSelectionModel().getSelection();
					if(selRoles.length<=0){
						alert("请选择角色");
						return;
					}
					//因为只能同时选择一个所以第一个就是[0]
					var role=selRoles[0];
					self.selTreeWin({
						title:"授权管理",
						//多选择框
						multiSelect:true,
						haveButton:true,
						isEmpty:true,
						config:{
							url:"/web/rbac/permAction!getPermTree.action",
							params:{
								whereSql:" and 1=1",
								isSee:false,								
								roleId:role.get("id")
							}
						},
						renderTree:function(tree){
							var records=tree.getChecked();
							tree.oldSelection=records;
						},
						callback:function(win,records){
							//点击确定之后会得到选中的数据做处理
							var ids=new Array();
							var tree=win.down("mttreeview");
							self.setPerm(tree,records,role.get("id"));
						}
					});	
				}
			},
			/**
			 * 查看权限
			 */
			"panel[xtype=role.moduletree] button[ref=seePerm]":{
				click:function(btn){
					var mainLayout=btn.up("panel[xtype=role.mainlayout]");
					var roleTree=mainLayout.down("panel[xtype=role.roletree]");
					var selRoles=roleTree.getSelectionModel().getSelection();
					if(selRoles.length<=0){
						alert("请选择角色");
						return;						
					}
					var role=selRoles[0];
					self.selTreeWin({
						title:"查看权限",
						multiSelect:false,
						haveButton:false,
						isEmpty:true,
						config:{
							url:"/web/rbac/permAction!getPermTree.action",
							params:{
								whereSql:" and 1=1",
								isSee:true,								
								roleId:role.get("id"),
								expanded:true
							}
						},
						callback:function(win,records){						
							
						}
					});	
				}
			}
		});
	}

});