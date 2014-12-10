package com.ffcs.itm.qd.model;

public class Data_table_fields {
	public String table_field_id;
	public String table_name;
	public String field_name;
	public String field_name_cn;
	public String field_type;
	public String field_length;
	public String field_scale;
	public String is_nullable;
	public String remark;
	public String field_format;
	public String audit_type = "none";
	@Override
	public String toString() {
		return "Data_table_fields [table_field_id=" + table_field_id
				+ ", table_name=" + table_name + ", field_name=" + field_name
				+ ", field_name_cn=" + field_name_cn + ", field_type="
				+ field_type + ", field_length=" + field_length
				+ ", field_scale=" + field_scale + ", is_nullable="
				+ is_nullable + ", remark=" + remark + ", field_format="
				+ field_format + ", audit_type=" + audit_type + ", ref_table="
				+ ref_table + ", ref_field=" + ref_field + ", ref_value_field="
				+ ref_value_field + ", get_ref_type=" + get_ref_type
				+ ", get_ref_sql=" + get_ref_sql + "]";
	}
	public String ref_table;
	public String ref_field;
	public String ref_value_field;
	public String get_ref_type;
	public String get_ref_sql;
}
