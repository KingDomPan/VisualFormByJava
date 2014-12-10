/*var Sys_Config = new Ext.data.Record.create([// 表字段--模型类
{
	name : 'sys_config_id'
}, {
	name : 'sys_var'
}, {
	name : 'sys_var_value'
}, {
	name : 'remark'
}, ]);*/
var codelist = new Ext.data.Record.create([// 表字段--模型类
{
	name : 'type_code'
}, {
	name : 'type_name'
}, {
	name : 'parent_type_code'
}, {
	name : 'description'
}, {
	name : 'domain_type'
} ]);
/*var codelist = new Ext.data.Record.create([// 表字段--模型类
                                           {
                                        	   name : 'code_type'
                                           }, {
                                        	   name : 'code'
                                           }, {
                                        	   name : 'mean'
                                           }, {
                                        	   name : 'sort_id'
                                           }, {
                                        	   name : 'remark'
                                           } ]);
*/
var grid;
Ext.ns('Ext.ffcs');
Ext.grid.AsyncGridView = function(config)
{
	Ext.grid.AsyncGridView.superclass.constructor.call(this, config);
}

Ext.extend(Ext.grid.AsyncGridView, Ext.grid.GridView, {
			renderRowNum		: 10,
			renderStartRow		: 0,
			isContinueAddRender	: true,
			getRenderHtml		: function()
			{
				var count = this.grid.store.getCount();
				var nextRenderStartRow = this.renderStartRow
						+ this.renderRowNum;
				if (nextRenderStartRow >= count)
				{
					nextRenderStartRow = count;
					this.isContinueAddRender = false;
				}
				var markup = this.renderRows(this.renderStartRow,
						nextRenderStartRow - 1);
				this.renderStartRow = nextRenderStartRow;
				return this.templates.body.apply({
							rows	: markup
						});
			},
			renderBody			: function()
			{
				this.renderStartRow = 0;
				return this.getRenderHtml();
			},
			addRenderBody		: function()
			{
				if (this.isContinueAddRender)
				{
					var html = this.getRenderHtml();
					Ext.DomHelper.insertHtml('beforeEnd', this.mainBody.dom,
							html);
					this.addRenderBody.defer(1, this);
				}
				else
				{
					this.processRows(0, true);
					this.fireEvent("refresh", this);
				}
			},
			refresh				: function(headersToo)
			{
				this.fireEvent("beforerefresh", this);
				this.grid.stopEditing(true);
				var result = this.renderBody();
				this.mainBody.update(result);
				if (headersToo === true)
				{
					this.updateHeaders();
					this.updateHeaderSortState();
				}
				this.addRenderBody.defer(1, this);
				this.layout();
				this.applyEmptyText();
			},
			afterRender			: function()
			{
				return null;
			}
		});
Ext.ffcs.EasyGrid = Ext.extend(Ext.grid.GridPanel, {
	initComponent : function() {
		this.autoHeight = false;
		this.autoScroll = true;
		this.height = 600;
		this.width = 800;
		this.stripeRows = true;
		this.loadMask = true;
		this.header = false;
		this.viewConfig = {
			forceFit : true
		};
		this.fields = this.recordToFields(this.Record); // 通过配置的Record类获取对应的fields字段
		this.createStore();
		this.createColumns();
		Ext.ffcs.EasyGrid.superclass.initComponent.call(this);
	},
	// 创建数据源
	createStore : function() {
		this.store = new Ext.data.XmlStore({
			autoDestroy : true,
			url : '/handler?tag=3',
			record : 'row',
			fields : this.fields
		});
	},
	recordToFields : function(Record) {
		var fields = [];
		var array = Record.prototype.fields.items;
		for ( var i = 0; i < array.length; i++) {
			var item = array[i];
			for ( var key in item) {
				if (key == 'name') {
					fields.push(item[key]);
				}
			}
		}
		return fields;
	},
	isArray : function(obj) {
		if (typeof obj == 'object' && obj.constructor == Array) {
			return true;
		}
		return false;
	},
	// 创建列模型
	createColumns : function() {
		var cols = [];
		cols.push(new Ext.grid.RowNumberer());
		for ( var i = 0; i < this.fields.length; i++) {
			var field = this.fields[i];
			var header = null; // 列名
			var dataIndex = null; // 字段名
			if (this.isArray(field)) {
				header = field[0];
				dataIndex = field[1];
			} else {
				header = field;
				dataIndex = field;
			}
			cols.push({
				header : header,
				dataIndex : dataIndex
			});
		}
		this.cm = new Ext.grid.ColumnModel({
			columns : cols
		});
	}
});

Ext.onReady(function() {
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = '../resources/images/default/s.gif';
	grid = new Ext.ffcs.EasyGrid({
		renderTo : 'mygrid',
		Record : codelist,
		view	: new Ext.grid.AsyncGridView(),
		listeners:{
			'render':function(_g){
				_g.getStore().load();
			}
		}
	});
	grid.getStore().on({
		load : {
			fn : function() {
				setTimeout(function() {
					/*var len = grid.getStore().getCount();
					console.log(len + '   --->aaaaaaaaa');
					var lengt=grid.getView().getRows().length;
					console.log(lengt+'   ------->bbbbbbbbb');
					console.log(grid.getView().getRows()[0].outerHTML);
					for ( var i = 0; i < len; i++) {
						var value = grid.getStore().getAt(i).get('domain_type');
						if (value.indexOf('a') < 0) {
							grid.getView().getRow(i).style.display = 'none';
						}
					}*/
					console.log(grid.getView().getRows().length+"  DDDDDDDD");
					function hello(){console.log("hello world");};
					console.log(hello.defer);
					hello.defer(2,this);
				}, 1000);
			}
		},
		scope:this 
	});
	//grid.getStore().load();
});
