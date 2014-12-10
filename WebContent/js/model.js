var Data_table_fields_model=new Ext.data.Record.create([//表字段--模型类
	{name:'table_field_id'},
	{name:'table_name'},
	{name:'field_name'},
	{name:'field_name_cn'},
	{name:'field_type'},
	{name:'field_length'},
	{name:'field_scale'},
	{name:'is_nullable'},
	{name:'field_format'},
	{name:'audit_type'},
	{name:'remark'},
	{name:'ref_table'},
	{name:'ref_field'},
	{name:'ref_value_field'},
	{name:'get_ref_type'},
	{name:'get_ref_sql'}
]);

var Data_tables_model=new Ext.data.Record.create([//表信息--模型类
	{name:'table_name'},
	{name:'table_name_cn'},
	{name:'table_desc'},
	{name:'key_fields'},
	{name:'audit_type'}
]);

var Flow_form_element_right_model=new Ext.data.Record.create([
	{name:'form_element_right_id'},
	{name:'tch_mod'},
	{name:'flow_mod'},
	{name:'is_append'}
]);

var Form_element_bind_model=new Ext.data.Record.create([
	{name:'form_element_id'},
	{name:'table_field_id'},
	{name:'element_name'},
	{name:'element_name_cn'},
	{name:'is_empty'},
	{name:'form_id'}
]);

var Form_element_right_model=new Ext.data.Record.create([
	{name:'form_element_right_id'},
	{name:'table_field_id'},
	{name:'is_show'},
	{name:'is_readonly'},
	{name:'is_require'}
]);

var Form_element_model=new Ext.data.Record.create([//表单元素--模型类
	{name:'form_element_id'},
	{name:'element_name'},
	{name:'element_name_cn'},
	{name:'element_type'},
	{name:'init_sql'},
	{name:'init_list_col_num'},
	{name:'default_value'},
	{name:'default_value_type'},
	{name:'is_empty'},
	{name:'bind_type'},
	{name:'remark'}
]);

var Form_tables_model=new Ext.data.Record.create([
	{name:'form_id'},
	{name:'table_name'},
	{name:'get_type'},
	{name:'table_type'},
	{name:'audit_type'}
]);


var Form_element_bind_model=new Ext.data.Record.create([//表单元素--模型类
	{name:'form_element_id'},
	{name:'table_field_id'},
	{name:'element_name'},
	{name:'element_name_cn'},
	{name:'is_empty'},
	{name:'form_id'}
]);

var Table_reference_model=new Ext.data.Record.create([//主从表关系--模型类
	{name:'form_id_table_reference'},
	{name:'main_table'},
	{name:'sub_table'},
	{name:'main_table_field'},
	{name:'sub_table_field'},
	{name:'table_referenece'},
	{name:'get_value_order'}
]);

var Forms_model=new Ext.data.Record.create([
	{name:'form_id'},
	{name:'form_name'},
	{name:'file_path'},
	{name:'file_print_path'},
	{name:'form_desc'},
	{name:'form_prop'},
	{name:'form_type'},
	{name:'state'},
	{name:'audit_type'}
]);


var Table_reference_model=new Ext.data.Record.create([
	{name:'form_id'},
	{name:'main_table'},
	{name:'sub_table'},
	{name:'main_table_field'},
	{name:'sub_table_field'},
	{name:'table_reference'},
	{name:'get_value_order'}
]);

var Tache_form_model=new Ext.data.Record.create([
	{name:'form_id'},
	{name:'tache_mod'},
	{name:'flow_mod'},
	{name:'form_action'}
]);

var Flow_form_element_right_model=new Ext.data.Record.create([
	{name:'form_element_right_id'},
	{name:'tch_mod'},
	{name:'flow_mod'},
	{name:'is_append'}
]);