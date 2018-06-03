Ext.define("core.mvc_test.view.Grid",{
	extend:'Ext.grid',
	xtype:('Ext.gridPanel', {
    title: 'Simpsons',
    store: Ext.data.StoreManager.lookup('simpsonsStore'),
    columns: [
        { text: '姓名',  dataIndex: 'name' },
        { text: '邮箱', dataIndex: 'email', flex: 1 },
        { text: '电话', dataIndex: 'phone' }
    ],
    height: 200,
    width: 400,
    renderTo: Ext.getBody()
	})
});