Ext.define("core.steelmesh_kanban.model.Model", {
			extend : 'Ext.data.Model',
			fields : [

							{
						name : 'row'
					}, {
						name : 'WorkCenter'
					}, {
						name : 'StoreNo'
					}, {
						name : 'SteelmeshSN'
					}, {
						name : 'flag'
					}, {
						name : 'OnlineDate'
					}, {
						name : 'WashOnLine'
					}, {
						name : 'nextonlinewash_time'
					}, {
						name : 'nextonlinewash_countdown'
						,type:'int'
					}, {
						name : 'WashOutLine'
					}, {
						name : 'nextoutlinewash_time'
					}, {
						name : 'nextoutlinewash_countdown',
						type:'int'
					}]
		});