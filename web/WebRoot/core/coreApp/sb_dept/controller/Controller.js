Ext.define("core.sb_dept.controller.Controller", {
	extend : "Ext.app.Controller",
	mixins:{
		suppleUtil:'core.util.SuppleUtil',
		MaskMsgUtil:'core.util.model.MaskMsgUtil',
		MessageUitl:'core.util.MessageUtil'
	},
	
	init : function() {
		var self = this;
		coreApp = self;				
		this.control(
			{
			'sb_dept_search button[ref=submit]':{
			   click:function(e,Opts){
		   	      var ser=e.ownerCt.ownerCt;
		          var BelongDivision=ser.getForm().findField('BelongDivision').getValue();
		          //var factory=ser.getForm().findField('factory').getValue();
		          var InstrumentType= ser.getForm().findField('InstrumentType').getValue(); 
		          var UserDepartments= ser.getForm().findField('UserDepartments').getValue(); 
		          var status=ser.getForm().findField('status').getValue();
                   
			  	  var store = Ext.data.StoreManager.map['core.sb_dept.store.Store'];
				  store.removeAll();
				  store.getProxy().extraParams={
					  BelongDivision:BelongDivision,InstrumentType:InstrumentType,UserDepartments:UserDepartments,status:status};
				  store.load();

			   		}
				}
			}		
					
		);
	},


	views : ['core.sb_dept.view.Main',
		'core.sb_dept.view.SearchView',
		'core.sb_dept.view.ResultView'
		],
		
	stores : ['core.sb_dept.store.Store',
	          'core.sb_dept.store.sb.Store'
	          ],
	
	models : ['core.sb_dept.model.Model' ]
});