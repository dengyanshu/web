 Ext.define('core.mvc.controller.Controller', {
     extend: 'Ext.app.Controller',

   /*  init: function() {
         this.control({
			'panel[xtype=mainview]':{
				itemclick:function(_this, record, item, index, e, eOpts){
					Ext.Msg.alert("System",record.data.address);	
				},
			},
			'mvc_treepanel':{
				itemclick:function(view, record, item, index, e, eOpts ){
					var tabpanel=view.ownerCt.ownerCt.down('mvc_content');
					console.log(record);
					var text=record.get('text');
					var id=record.get('id');
					var name=record.raw.name;
					var tab=tabpanel.getComponent(id);
					
					if(!tab){
						var t=tabpanel.add({
							title : text,
							id : id,
							layout:'fit',
							items:[
							       {xtype:name}
							]
						});
						tabpanel.setActiveTab(t);				
					}else{
						tabpanel.setActiveTab(tab);
					}
					
				}
				
			},
			'mvc_content panel[xtype=testgrid1] button[ref=submit]':{
				click:function(e){
					var toolbar=e.ownerCt;
					var textfield=toolbar.items.items[0];
					var value=textfield.value;
					
					
					Ext.Ajax.request({
					    url: '/web/test/testdata!getResult3.action',
					    params: {
					        val: value
					    },
					    success: function(response){
					        var text = response.responseText;
					        var obj=Ext.decode(text);
					        var store = Ext.data.StoreManager.map['core.mvc.store.Store'];
					        store.getProxy().data=obj.data;
					        store.load();
					    }
					});
					
					var store = Ext.data.StoreManager.map['core.mvc.store.Store'];
					store.removeAll();
					store.getProxy().extraParams={val:value};
					store.load();
				}
				
			},
			'mvc_content panel[xtype=testgrid2] button[ref=submit]':{
				click:function(e){
					var store = Ext.data.StoreManager.map['core.mvc.store.TestStore'];
					store.removeAll();
					store.load();
				}
				
			}
         });
     },
	 */
	 views:['core.mvc.view.MainLayout',	        
			'core.mvc.view.DisplayPanel',
			'core.mvc.view.TreePanel',
			],
	 stores:['core.mvc.store.Store','core.mvc.store.TreeStore'],
	 models:['core.mvc.model.Model',]
 });