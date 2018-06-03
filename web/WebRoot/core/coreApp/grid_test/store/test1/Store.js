Ext.define("core.grid_test.store.test1.Store",{
	extend:'Ext.data.Store',
	model:'core.grid_test.model.test1.Model',
	proxy:{
		type:'memory',
		reader:{
			type:'json',
			root:'items'
		}
	},
	data:{'items':[
        {"Id":1,"Name":"Lisa", "Email":"lisa@simpsons.com", "Phone":"555-111-1224"},
        {"Id":2,"Name":"Bart", "Email":"bart@simpsons.com", "Phone":"555-222-1234"},
        {"Id":3,"Name":"Homer", "Email":"home@simpsons.com", "Phone":"555-222-1244"},
        {"Id":4,"Name":"Marge", "Email":"marge@simpsons.com", "Phone":"555-222-1254"}
    ]},
    autoLoad:true
	
});