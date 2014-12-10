package com.ffcs.itm.qd.model;

public class Form_tables {
	public String form_id;
	public String table_name;
	public String get_type = "table";
	public String table_type = "regular";
	public String audit_type = "none";
	@Override
	public String toString() {
		return "Form_tables [form_id=" + form_id + ", table_name=" + table_name
				+ ", get_type=" + get_type + ", table_type=" + table_type
				+ ", audit_type=" + audit_type + "]";
	}
}
