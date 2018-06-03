/***************************************************************************
  								<主控制类> 
 ***************************************************************************/
 
/**
 * 常用变量定义
 * @type String
 */ 
var BS="core.mes.store.reportforms.";
var BM="core.mes.model.reportforms.";
var BV="core.mes.view.main.content.reportforms.";

Ext.define("core.mes.controller.MesController",{
	extend:'Ext.app.Controller',
	require:('baseUx.BoxReorderer'),
	
	/*引入数据集类*/
	stores:[
		'core.mes.store.BaseGridStore',							//基本表格数据集
		'core.mes.store.AllDataStore',							//得到所有工单、料号、机型、描述的数据集
		'core.mes.store.BaseTreeStore',						//基础树数据集
		'core.mes.store.viewList.MOName_SMT_ViewList_Store',	//SMT工单名列表数据集
		'core.mes.store.viewList.Workcenter_ViewList_Store',	//手机工作中心数据集
		'core.mes.store.viewList.QMOReadyOutLotMOName_ViewList_Store',	//工单数据集
		'core.mes.store.tree.ReportForms',					//报表查询数据集
		BS+'sl.Store',				
		BS+'sljl.Store',			
		BS+'iqc.Store',				
		BS+'ztl.Store',				
		BS+'bdgx.Store',			
		BS+'gdbl.Store',			
		BS+'wx.Store',				
		BS+'wx.StoreMo',			
		BS+'dip_wx.Store',			
		BS+'dip_wx.StoreMo',			
		BS+'cn.Store',				
		BS+'cn.StorePn',			
		BS+'cn.StoreMo',			
		BS+'sjl.Store',				
		BS+'wl.Store',				
		BS+'rk.Store',				
		BS+'phwlxm.Store',			
		BS+'gccxsjscap.StoreSum',	
		BS+'gccxsjscap.StorePn',	
		BS+'gccxsjscap.StoreMo',	
		BS+'gccxsjscap.Store',		
		BS+'gyswlxx.Store',			
		BS+'gyswlxx.StoreGYS',		
		BS+'smt_tplx.Store',		
		BS+'smt_zxwx.Store',		
		BS+'smt_sljl.Store',			
		BS+'smt_tpjkxx.Store',			
		BS+'smt_sl.Store',				
		BS+'smt_cn.Store',				
		BS+'ckwl.Store1',				
		BS+'ckwl.Store2',				
		BS+'gdwlckmx.Store',				
		BS+'gdwlblmx.Store',				
		BS+'wlsldhc.Store',					
		BS+'wlrk.Store',						
		BS+'feeder_byjl.Store',						
		BS+'smt_sbbyjl.Store'						
		
		
	],
	
	/*引入模型类*/
	models:[
		'core.mes.model.viewList.MOName_SMT_ViewList_Model',		
		'core.mes.model.viewList.Workcenter_ViewList_Model',		
		'core.mes.model.viewList.QMOReadyOutLotMOName_ViewList_Model',		
		'core.mes.model.AllDataModel',								
		BM+'sl.Model',						
		BM+'sljl.Model',					
		BM+'iqc.Model',						
		BM+'ztl.Model',						
		BM+'bdgx.Model',					
		BM+'gdbl.Model',					
		BM+'wx.Model',						
		BM+'wx.ModelMo',					
		BM+'dip_wx.Model',					
		BM+'dip_wx.ModelMo',					
		BM+'cn.Model',						
		BM+'cn.ModelPn',					
		BM+'cn.ModelMo',					
		BM+'sjl.Model',						
		BM+'wl.Model',						
		BM+'rk.Model',						
		BM+'phwlxm.Model',					
		BM+'gccxsjscap.ModelSum',			
		BM+'gccxsjscap.ModelPn',			
		BM+'gccxsjscap.ModelMo',			
		BM+'gccxsjscap.Model',				
		BM+'gyswlxx.Model',					
		BM+'gyswlxx.ModelGYS',			
		BM+'smt_tplx.Model',				
		BM+'smt_zxwx.Model',				
		BM+'smt_sljl.Model',				
		BM+'smt_tpjkxx.Model',				
		BM+'smt_sl.Model',					
		BM+'smt_cn.Model',					
		BM+'ckwl.Model1',					
		BM+'ckwl.Model2',					
		BM+'gdwlckmx.Model',				
		BM+'gdwlblmx.Model',				
		BM+'wlsldhc.Model',					
		BM+'wlrk.Model',					
		BM+'feeder_byjl.Model',				
		BM+'smt_sbbyjl.Model'			
	],
	
	
		/*引入视图类*/
	views:[
		'core.mes.view.MainFrame',										
		'core.mes.view.main.Content',									
		'core.mes.view.main.Navigation',								
		'core.mes.base.BaseTree',								 		
		'core.mes.base.BaseForm',										
		'core.mes.base.BaseGrid',										 
		'core.mes.view.main.navigation.ReportForms',			 		
		'core.mes.view.main.navigation.tree.ReportForms',				
		BV+'sl.Operate',	 	 	 
		BV+'sl.Result',		 		 
		BV+'sljl.Operate',	 		
		BV+'sljl.Result',			
		BV+'iqc.Operate',			
		BV+'iqc.Result',	    	
		BV+'ztl.Operate',		 	 
		BV+'ztl.Result',	     		
		BV+'bdgx.Operate',		 	
		BV+'bdgx.Result',	    	
		BV+'gdbl.Operate',			 
		BV+'gdbl.Result',	    		
		BV+'wx.Operate',			
		BV+'wx.Result',	    		 
		BV+'dip_wx.Operate',			
		BV+'dip_wx.Result',	   	 		
		BV+'cn.Operate',		    
		BV+'cn.Result',	    	 	 	
		BV+'sjl.Operate',		 	
		BV+'sjl.Result',    	   		
		BV+'wl.Operate',			 
		BV+'wl.Result',	    		
		BV+'rk.Operate',			
		BV+'rk.Result',	    		
		BV+'phwlxm.Operate',		
		BV+'phwlxm.Result',	     	
		BV+'gccxsjscap.North',		
		BV+'gccxsjscap.Center',		
		BV+'gccxsjscap.Operate',	
		BV+'gccxsjscap.Result',	     
		BV+'gyswlxx.Operate',		 
		BV+'gyswlxx.Result',	    	
		BV+'smt_tplx.Operate',			
		BV+'smt_tplx.Result',	    	
		BV+'smt_zxwx.Operate',			
		BV+'smt_zxwx.Result',	    	 
		BV+'smt_sljl.Operate',			
		BV+'smt_sljl.Result',	    	
		BV+'smt_tpjkxx.Operate',		 
		BV+'smt_tpjkxx.Result',	    	 
		BV+'smt_sl.Operate',		 
		BV+'smt_sl.Result',	    	
		BV+'smt_cn.Operate',		 
		BV+'smt_cn.Result',	    	
		BV+'ckwl.Operate',		     
		BV+'ckwl.Result',	    	
		BV+'gdwlckmx.Operate',		
		BV+'gdwlckmx.Result',	   
		BV+'gdwlblmx.Operate',		 
		BV+'gdwlblmx.Result',	   
		BV+'wlsldhc.Operate',		
		BV+'wlsldhc.Result',	     	 
		BV+'wlrk.Operate',		 		
		BV+'wlrk.Result',	     		 
		BV+'feeder_byjl.Operate',		 
		BV+'feeder_byjl.Result',	     
		BV+'smt_sbbyjl.Operate',		 	
		BV+'smt_sbbyjl.Result'	     	 
	],
	
	
	init:function(){
		this.self=this;
		//coreApp=self;
		
		/*定义控制的方法*/
		this.control({
			/************************************************************************************
											控制事件开始
			 ************************************************************************************/
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 			（报表查询）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			
			/** 当点击报表树中的项目时触发以下事件 */
			'reportforms':{
				itemclick:function(view,record,item,index,e,options){
					//得到主内容框架
					var tabpanel=Ext.getCmp('mes_content'); 					
					//得到所点击树的text
					var name=record.raw.name;				
					//得到标题名
					var text=record.get("text");				
					//得到所点击树的ID
					var id=record.get("id");	

					if(name=="gccxsjscap"){
						var store = Ext.data.StoreManager.get(BS+'gccxsjscap.StoreSum');
						store.load();
					}
					//判断所点击的界面是否已存在如果已存在则显示，如果不存在则添加显示
					var tab=tabpanel.getComponent(id);	
					if(!tab){
						var t=tabpanel.add({
							title:text,   			//新建的tab标题
							id:id,					//新建的id标题
							closable:true,			//有关闭按钮
							layout:'border',		//border布局
							closeAction:'hide', 	 //关闭后隐藏
							items:[					
								{xtype:name+'.operate'},	//查询操作界面类
								{xtype:name+'.result'}		//查询结果界面类
							]
							});
							tabpanel.setActiveTab(t);		//激活当前tab
					}else{
						tabpanel.setActiveTab(tab);			//激活当前tab
					}
				}
			},
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 			（收料查询）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			
			/** 确认按钮触发以下事件 */
			'panel[xtype=sl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);
				}	
			},
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=sl.operate] textfield[name=sl_sn]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=sl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（IQC物料抽栓、检验查询iqc）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			
			/** 确认按钮触发以下事件 */
			'panel[xtype=iqc.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},	
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=iqc.operate] textfield[name=iqc_pn]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=iqc.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},	

			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（上料记录查询sljl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=sljl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},		
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=sljl.operate] searchgrid[name=sljl_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=sljl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},	
		
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（直通率查询ztl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=ztl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=ztl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（绑定关系bdgx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=bdgx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},	
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=bdgx.operate] searchgrid[name=bdgx_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=bdgx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（工单备料查询gdbl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=gdbl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},	
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=gdbl.operate] searchgrid[name=gdbl_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=gdbl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 			（维修查询wx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=wx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=wx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（DIP维修dip_wx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=dip_wx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=dip_wx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
			
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（产能查询cn）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=cn.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=cn.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
						
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（数据链查询sjl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=sjl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=sjl.operate] textfield[name=sjl_sn]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},			
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=sjl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（物料查询wl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=wl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=wl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（入库查询rk）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=rk.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);	
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=rk.operate] textfield[name=rk_sn]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=rk.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（批号物料细明查询phwlxm）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=phwlxm.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);			
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=phwlxm.operate] textfield[name=phwlxm_sn]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=phwlxm.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
						
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（供应商物料信息查询gyswlxx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=gyswlxx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=gyswlxx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（SMT设备保养记录查询smt_sbbyjl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_sbbyjl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);			
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_sbbyjl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},		
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=smt_sbbyjl.operate] textfield[name=smt_sbbyjl_line]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},	
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（SMT贴片类型查询smt_tplx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_tplx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=smt_tplx.operate] searchgrid[name=smt_tplx_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},		
					
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_tplx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（SMT在线维修查询smt_zxwx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_zxwx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);			
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_zxwx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（SMT上料记录smt_sljl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_sljl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);			
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=smt_sljl.operate] searchgrid[name=smt_sljl_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},		
						
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_sljl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（SMT贴片接口信息smt_tpjkxx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_tpjkxx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=smt_tpjkxx.operate] combo[name=smt_tpjkxx_workcenter]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},			
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_tpjkxx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（SMT上料查询smt_sl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_sl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_sl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},			
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=smt_tpjkxx.operate] combo[name=smt_sl_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},		
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	     （SMT产能查询smt_cn）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/	
			/** 确认按钮触发以下事件 */
			'panel[xtype=smt_cn.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);			
				}	
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=smt_cn.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（Feeder保养记录查询feeder_byjl）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=feeder_byjl.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=feeder_byjl.operate] textfield[name=feeder_byjl_number]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},			
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=feeder_byjl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（物料收料单回传查询wlsldhc）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=wlsldhc.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=wlsldhc.operate] textfield[name=wlsldhc_po]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},			
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=wlsldhc.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
						 	（仓库物料查询） 
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/				
			/** 当点击仓库物料查询界面的确认按钮时触发以下事件 */
			'panel[xtype=ckwl.operate] button[action=enter]':{
				click:function(e,eOpts){
					var formObj=e.ownerCt.ownerCt;							//得到表单
					var gridObj=e.ownerCt.ownerCt.ownerCt.items.items[2];   //得到表格
					var basic=formObj.getForm();
					var type=basic.findField('ckwl_type').value;			//得到表单中ckwl_type的值，并进行判断				
					if(type=="a"){					
						var store=Ext.data.StoreManager.map[BS+'ckwl.Store1'];
						//重新配置列和数据源
                        var columns = [];
                       	    columns.push(Ext.create("Ext.grid.RowNumberer",{header:'序号',width: 40}));
                            columns.push({header:"库位",dataIndex:'库位',sortable:true,width:100});
                            columns.push({header:"产品描述",dataIndex:'产品描述',sortable:true,width:100});
                            columns.push({header:"料号",dataIndex:'料号',sortable:true,width:100});
						//重新配置表格的(store)数据集和(columns)栏位
						gridObj.reconfigure(store, columns);						
						Ext.create("core.util.model.MesBaseFormButtonAction").click(e);
					}else{				
						var store=Ext.data.StoreManager.map[BS+'ckwl.Store2'];
						var columns = [];
							columns.push(Ext.create("Ext.grid.RowNumberer",{header:'序号',width: 40}));
                            columns.push({header:"料号",dataIndex:'料号',sortable:true,width:100});
                            columns.push({header:"库位",dataIndex:'库位',sortable:true,width:100});
                            columns.push({header:"物料SN",dataIndex:'物料SN',sortable:true,width:100});
                            columns.push({header:"Lot Code",dataIndex:'Lot Code',sortable:true,width:100});
                            columns.push({header:"Date Code",dataIndex:'Date Code',sortable:true,width:100});
                            columns.push({header:"生产日期",dataIndex:'生产日期',sortable:true,width:100});
                            columns.push({header:"入库时间",dataIndex:'入库时间',sortable:true,width:100});
                            columns.push({header:"出库时间",dataIndex:'出库时间',sortable:true,width:100});
                            columns.push({header:"备料工单",dataIndex:'备料工单',sortable:true,width:100});                            
						gridObj.reconfigure(store, columns);
						Ext.create("core.util.model.MesBaseFormButtonAction").click(e);
					}			
				}				
			},	
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=ckwl.operate] textfield[name=ckwl_pn]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						var formObj=field.up('form');
						var basic=formObj.getForm();
						var gridObj=formObj.ownerCt.items.items[2];   //得到表格
						var type=basic.findField('ckwl_type').value;			//得到表单中ckwl_type的值，并进行判断		
						if(type=="a"){					
							var store=Ext.data.StoreManager.map[BS+'ckwl.Store1'];
							//重新配置列和数据源
	                        var columns = [];
	                       	    columns.push(Ext.create("Ext.grid.RowNumberer",{header:'序号',width: 40}));
	                            columns.push({header:"库位",dataIndex:'库位',sortable:true,width:100});
	                            columns.push({header:"产品描述",dataIndex:'产品描述',sortable:true,width:100});
	                            columns.push({header:"料号",dataIndex:'料号',sortable:true,width:100});
							//重新配置表格的(store)数据集和(columns)栏位
							gridObj.reconfigure(store, columns);						
							Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
						}else{				
							var store=Ext.data.StoreManager.map[BS+'ckwl.Store2'];
							var columns = [];
								columns.push(Ext.create("Ext.grid.RowNumberer",{header:'序号',width: 40}));
	                            columns.push({header:"料号",dataIndex:'料号',sortable:true,width:100});
	                            columns.push({header:"库位",dataIndex:'库位',sortable:true,width:100});
	                            columns.push({header:"物料SN",dataIndex:'物料SN',sortable:true,width:100});
	                            columns.push({header:"Lot Code",dataIndex:'Lot Code',sortable:true,width:100});
	                            columns.push({header:"Date Code",dataIndex:'Date Code',sortable:true,width:100});
	                            columns.push({header:"生产日期",dataIndex:'生产日期',sortable:true,width:100});
	                            columns.push({header:"入库时间",dataIndex:'入库时间',sortable:true,width:100});
	                            columns.push({header:"出库时间",dataIndex:'出库时间',sortable:true,width:100});
	                            columns.push({header:"备料工单",dataIndex:'备料工单',sortable:true,width:100});                            
							gridObj.reconfigure(store, columns);
							Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
						}
					}
				}
			},
			
			/** 当点击SMT产能查询界面的清除按钮时触发以下事件 */
			'panel[xtype=ckwl.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
						
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（工单物料出库明细查询gdwlckmx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=gdwlckmx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=gdwlckmx.operate] textfield[name=gdwlckmx_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=gdwlckmx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 	（工单物料备料明细查询gdwlblmx）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=gdwlblmx.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},		
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=gdwlblmx.operate] textfield[name=gdwlblmx_mo]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},			
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=gdwlblmx.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},				
			
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（物料入库查询wlrk）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=wlrk.operate] button[action=enter]':{
				click:function(e,eOpts){
					Ext.create("core.util.model.MesBaseFormButtonAction").click(e);		
				}	
			},	
			
			/**输入框回车按钮触发以下事件 */
			'panel[xtype=wlrk.operate] textfield[name=wlrk_value]':{
				specialkey: function(field, e){
					if (e.getKey() == e.ENTER) {
						Ext.create("core.util.model.MesBaseFormTextFieldAction").click(field);	
					}
				}
			},			
					
			/** 清除按钮时触发以下事件 */
			'panel[xtype=wlrk.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			},
			
			/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
					 		（工厂产线实际生产安排gccxsjscap）
			&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&*/
			/** 确认按钮触发以下事件 */
			'panel[xtype=gccxsjscap.operate] button[action=enter]':{
				click:function(e,eOpts){
					var formObj=e.ownerCt.ownerCt;
					var basic=formObj.getForm();		
					var result=formObj.ownerCt.items.items[2].items.items[1];
					var store=result.store;
					if(basic.isValid){
						basic.submit({
							clientValidation:true,
							url:'/web/mes/baobiao/gccxsjscap.action',
							type:'ajax',
							waitTitle:'系统提示',
							waitMsg:'正在查询中，请耐心等待........',
							success: function(basic, action) {
								store.proxy.data=action.result.data;					//把查询结果赋值给数据集
								//store.load({params:{start:0,limit:15}});					//load重新加载数据集
								store.load();												//load重新加载数据集
								basic.reset();												//清空form表单的值
							},
							failure:function(basic,action){
								Ext.Msg.alert("系统提示",action.result.returnMes);
								basic.reset();
							}
						});
					}					
				}
			},		
		
			
			/** 清除按钮时触发以下事件 */
			'panel[xtype=gccxsjscap.operate] button[action=reset]':{
				click:function(e,eOpts){
					e.ownerCt.ownerCt.getForm().reset();
				}
			}			
			
					
		
			/************************************************************************************
											控制事件结束
			 ************************************************************************************/
		});
	}
	
});