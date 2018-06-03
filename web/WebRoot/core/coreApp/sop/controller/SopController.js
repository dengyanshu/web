/*******************************************************************************
 * <主控制类>
 ******************************************************************************/

Ext.define("core.sop.controller.SopController", {
	extend : 'Ext.app.Controller',
	require : ('baseUx.BoxReorderer'),



	init : function() {
		this.self = this;
		// coreApp=self;

		/* 定义控制的方法 */
		this.control({
			/*******************************************************************
			 * 控制事件开始
			 ******************************************************************/
			/*
			 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ （点击SOP树触发的方法）
			 * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
			 */

			/** 当点击报表树中的项目时触发以下事件 */
			'soptree' : {
				itemclick : function(view, record, item, index, e, eOpts) {
					// 得到主内容框架
					var tabpanel = view.ownerCt.ownerCt.ownerCt.items.items[2];

					// 得到所点击树的text
					var name = record.raw.name;

					var text = record.get("text");
					// 得到所点击树的ID
					var id = record.get("id");

					// 判断所点击的界面是否已存在如果已存在则显示，如果不存在则添加显示
					var tab = tabpanel.getComponent(id);

					if (id == "sop-01-02") {
						if (!tab) {
							var t = tabpanel.add({
										title : text, // 新建的tab标题
										id : id, // 新建的id标题
										closable : true, // 有关闭按钮
										layout : 'border', // border布局
										closeAction : 'hide', // 关闭后隐藏
										items : [{
											xtype : 'add_sop_operate'
										}		// 查询操作界面类
										]
									});
							tabpanel.setActiveTab(t); // 激活当前tab
						} else {
							tabpanel.setActiveTab(tab); // 激活当前tab
						}
					} else{
						if (!tab) {
							var t = tabpanel.add({
										title : text, 			// 新建的tab标题
										id : id, 				// 新建的id标题
										closable : true,	    // 有关闭按钮
										layout : 'border', 		// border布局
										closeAction : 'hide',   // 关闭后隐藏
										items : [
												{xtype : name+'_operate',region : 'north'},		// 查询操作界面类
												{xtype : name+'_result',region : 'center'}		// 查询结果界面类
										]
									});
							tabpanel.setActiveTab(t); // 激活当前tab
						} else {
							tabpanel.setActiveTab(tab); // 激活当前tab
						}
					}
				}
			},

			/** 当点击报表树中的项目时触发以下事件 */

			/*
			 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ （添加SOP事件）
			 * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
			 */

			'panel[xtype:=add_sop_operate] button[action=enter]' : {
				click : function(e, eOpts) {

					var formObj = e.ownerCt.ownerCt;
					var basic = formObj.getForm();
					
					//过滤<pre>标签
					Ext.override(Ext.form.Action.Submit, {
								processResponse : function(response) {
									this.response = response;
									var data = response.responseText;
									if (data.indexOf('<pre>') != -1
											|| data.indexOf('<PRE>') != -1) {
										response.responseText = data.substring(
												5, data.length - 6);
										this.response = Ext.JSON
												.decode(response.responseText);
									}
									if (!response.responseText) {
										return true;
									}
									this.result = this.handleResponse(response);
									return this.result;
								}
							});

					if (basic.isValid) {
						basic.submit({
									clientValidation : true,
									url : '/web/sop/add.action',
									type : 'ajax',
									waitTitle : '系统提示',
									waitMsg : '正在上传中，请耐心等待2........',
									success : function(basic, action) {
										Ext.Msg.alert("系统提示",
												action.result.returnMes);
										basic.reset();
									},
									failure : function(basic, action) {
										Ext.Msg.alert("系统提示",
												action.result.returnMes);
										basic.reset();
									}
								});
					}

				}

			},

			'panel[xtype=add_sop_operate] button[action=reset]' : {
				click : function(e, eOpts) {
					var formObj = e.ownerCt.ownerCt;
					var basic = formObj.getForm();
					basic.reset();
				}
			},

			/*
			 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ （删除SOP事件）
			 * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
			 */
			'panel[xtype=delete_sop_operate] button[action=enter]' : {
				click : function(e, eOpts) {
					var formObj = e.ownerCt.ownerCt;
					var basic = formObj.getForm();
					var result = e.ownerCt.ownerCt.ownerCt.items.items[1];
					var store = result.store;
					if (basic.isValid) {
						basic.submit({
									clientValidation : true,
									url : '/web/sop/search.action',
									type : 'ajax',
									waitTitle : '系统提示',
									waitMsg : '正在查询中，请耐心等待........',
									success : function(basic, action) {
										store.proxy.data = action.result.data;
										store.load();
										basic.reset(); // 清空form表单的值
									},
									failure : function(basic, action) {
										Ext.Msg.alert("系统提示",
												action.result.returnMes);
										basic.reset();
									}
								});
					}
				}

			},

			'panel[xtype=delete_sop_result] button[action=delete]' : {
				click : function(e, eOpts) {
					var grid = e.ownerCt.ownerCt; // 得到表格
					var data = grid.getSelectionModel().getSelection(); // 得到所选择的MODEL【】
					if (data.length == 0) {
						Ext.Msg.alert("提示", "您最少要选择一条数据!");
					} else {
						// 先得到ID的数据(name)
						var store = grid.getStore(); // 得到表格的数据集
						var ids = []; // 创建一个ids的数组
						Ext.Array.each(data, function(record) { // 遍历data里面的所有数据
									ids.push(record.raw.id);
								});

						// 后台操作
						Ext.Ajax.request({
									url : '/web/sop/del.action',
									params : {
										ids : ids.join(",")
									},
									method : 'post',
									timeout : 2000,
									success : function(response, opts) {
										// 如果后台删除成功则前端操作DOM进行删除(EXTJS)
										Ext.Array.each(data, function(record) {
													store.remove(record);
												});
									}
								});
					}
				}
			},

			'panel[xtype=delete_sop_result] button[action=save]' : {
				click : function(e, eOpts) {
					var grid = e.ownerCt.ownerCt; // 得到表格
					var store = grid.getStore(); // 得到表格的数据集
					// store.sync(); //数据与后台同步
					var records = store.getUpdatedRecords(); // 得到被你修改过的数据
					var data = [];
					Ext.Array.each(records, function(model) {
								data.push(Ext.JSON.encode(model.data));
							});
					// 异步操作数据
					if (data.length > 0) {
						Ext.Ajax.request({
									url : "/web/sop/update.action",
									params : {
										modification : "[" + data.join(",")
												+ "]"
									},
									method : 'post',
									timeout : 4000,
									success : function(response, opts) {
										Ext.Array.each(records,
												function(model) {
													model.commit(); // 取消小箭头
												});

										obj = Ext.decode(response.responseText);
										Ext.Msg.alert("系统提示", obj.returnMes);
									},
									failure : function(response, opts) {
										obj = Ext.decode(response.responseText);
										Ext.Msg.alert("系统提示", obj.returnMes);
									}
								});
					} else {
						alert("至少要选择一条数据");
					}
				}
			},

			/*
			 * $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ （查找SOP事件）
			 * &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
			 */
			'panel[xtype=search_sop_operate] button[action=enter]' : {
				click : function(e, eOpts) {
					var formObj = e.ownerCt.ownerCt;
					var basic = formObj.getForm();
					var result = e.ownerCt.ownerCt.ownerCt.items.items[1];
					var store = result.store;
					if (basic.isValid) {
						basic.submit({
									clientValidation : true,
									url : '/web/sop/search.action',
									type : 'ajax',
									waitTitle : '系统提示',
									waitMsg : '正在查询中，请耐心等待........',
									success : function(basic, action) {
										store.proxy.data = action.result.data;
										store.load(); // load重新加载数据集
										basic.reset(); // 清空form表单的值
									},
									failure : function(basic, action) {
										Ext.Msg.alert("系统提示",
												action.result.returnMes);
										basic.reset();
									}
								});
					}
				}

			},

			'panel[xtype=search_sop_operate] textfield[name=name]' : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						var formObj = field.up('form');
						var basic = formObj.getForm();
						var result = formObj.ownerCt.items.items[1];
						var store = result.store;
						if (basic.isValid) {
							basic.submit({
										clientValidation : true,
										url : '/web/sop/search.action',
										type : 'ajax',
										waitTitle : '系统提示',
										waitMsg : '正在查询中，请耐心等待........',
										success : function(basic, action) {
											store.proxy.data = action.result.data;
											store.load();
											basic.reset(); // 清空form表单的值
										},
										failure : function(basic, action) {
											Ext.Msg.alert("系统提示",
													action.result.returnMes);
											basic.reset();
										}
									});
						}
					}
				}
			},

			/*
			 * 'panel[xtype:=search.operate] searchtest[name=name]':{
			 * this.onTriggerClick(), specialkey:function(f, e){ if(e.getKey() ==
			 * e.DOWN){ alert("asdfasf");
			 *  } }
			 *  },
			 */

			'panel[xtype=search_sop_operate] combo[name=zcb]' : {
				specialkey : function(field, e) {
					if (e.getKey() == e.ENTER) {
						var formObj = field.up('form');
						var basic = formObj.getForm();
						var result = formObj.ownerCt.items.items[1];
						var store = result.store;
						if (basic.isValid) {
							basic.submit({
										clientValidation : true,
										url : '/web/sop/search.action',
										type : 'ajax',
										waitTitle : '系统提示',
										waitMsg : '正在查询中，请耐心等待........',
										success : function(basic, action) {
											obj = Ext
													.decode(action.result.data); // 把后台传来的JSON数据解码成前台数据
											store.proxy.data = obj; // 把查询结果赋值给数据集
											store.load({
														params : {
															start : 0,
															limit : 15
														}
													}); // load重新加载数据集
											basic.reset(); // 清空form表单的值
										},
										failure : function(basic, action) {
											Ext.Msg.alert("系统提示",
													action.result.data);
											basic.reset();
										}
									});
						}
					}
				}

			},

			'panel[xtype=search_sop_operate] button[action=reset]' : {
				click : function(e, eOpts) {
					var formObj = e.ownerCt.ownerCt;
					var basic = formObj.getForm();
					basic.reset();
				}
			},

			'panel[xtype=search_sop_result]' : {
				itemclick : function(record, item, index, e, eOpts) {
					var id = record.getSelectionModel().selected.items[0].raw['id'];
					var name = record.getSelectionModel().selected.items[0].raw['name'];

					Ext.Ajax.request({ // 读取后台传递于前台数据
						// url: 'core/data/sop/open_sop.jsp',
						url : '/web/sop/open_sop.action',
						method : 'post',
						params : {
							id : id
						},
						success : function(response, opts) {
							var win = Ext.create('Ext.window.Window', { // 当数据传递到后台处理建立该SOP后，再new一个窗口来显示它;
								title : name,
								height : 600,
								width : 1024,
								closable : true,
								renderTo : Ext.getBody(),
								html : "<iframe id='openwin' src='core/data/sop/master/views.jsp?&name="
										+ name
										+ "' scrolling='auto' style='width:100%;height:100%;margin:0;padding:0'></iframe>",
								listeners : {
									beforedestroy : function(eOpts) {
										Ext.Ajax.request({ // 读取后台传递于前台数据
											// url:
											// 'core/data/sop/del_temp.jsp',
											url : '/web/sop/del_temp_sop.action',
											method : 'post',
											params : {
												name : name
											},
											success : function(response, opts) {
											},
											failure : function() {
											}
										});
									}
								}
							}).show();
						},
						failure : function() {
							Ext.Msg.alert("failure");
						}
					});

				}
			}

				/***************************************************************
				 * 控制事件结束
				 **************************************************************/
		});
	},

	/* 引入视图类 */
	views : ['core.sop.view.MainFrame', // 主程序视图
			'core.sop.view.main.Content', // 内容区域视图
			'core.sop.view.main.Navigation', // 导航栏视图
			'core.sop.base.SopBaseTree', // 加载基础的树
			'core.sop.view.main.navigation.tree.SopTree', // SOP树的界面
			'core.sop.view.main.content.add.Operate', // 添加SOP操作界面
			'core.sop.view.main.content.search.Operate', // 查询SOP操作界面
			'core.sop.view.main.content.search.Result', // 查询SOP查询结果界面
			'core.sop.view.main.content.delete.Operate', // 删除SOP操作界面
			'core.sop.view.main.content.delete.Result' // 删除SOP查询结果界面

	],

	/* 引入数据集类 */
	stores : ['core.sop.store.tree.SopTree', // SOP树数据集
			'core.sop.store.MOName_SMT_ViewList_Store', // 所有产品名称、描述、机型、工单的数据集
			'core.sop.store.add.TypeStore', // 机型数据集
			'core.sop.store.add.ProcedureStore', // 制程数据集
			'core.sop.store.search.Store', // SOP查询数据集
			'core.sop.store.delete.Store' // SOP删除查询数据集
	],

	/* 引入模型类 */
	models : ['core.sop.model.MOName_SMT_ViewList_Model', // 所有产品名称、描述、机型、工单的模型
			'core.sop.model.search.Model' // SOP查询模型

	]

});