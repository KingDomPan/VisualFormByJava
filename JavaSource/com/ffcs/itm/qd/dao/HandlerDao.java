package com.ffcs.itm.qd.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.HashMap;
import java.util.List;
import org.dom4j.Document;
import com.ffcs.itm.qd.commons.DBCtrl;
import com.ffcs.itm.qd.commons.XmlHelper;
import com.ffcs.itm.qd.exception.ApplicationException;
import com.ffcs.itm.qd.exception.SystemException;

public class HandlerDao {
	public static HashMap<String, String> table_fields_map=new HashMap<String, String>();
	public final static String GET_FLOW_MOD="SELECT COUNT(*) FROM FLOW_MODEL WHERE FLOW_MOD=?";
	public final static String GET_TABLE_FIELDS="select COLUMN_NAME VALUE,COLUMN_NAME text from user_tab_columns where table_name=?";//参数需要大写
	public final static String GET_FORM_ID="SELECT FORM_ID_SEQ.NEXTVAL form_id FROM DUAL";
	public final static String GET_TACHE_MODEL="SELECT TCH_MOD VALUE,TCH_MOD||'('||TCH_NAME||')' text FROM TACHE_MODEL WHERE FLOW_MOD=? order by 1";
	public final static String GET_SYS_CONFIG="SELECT * FROM tp_tree_type order by 1 desc";
	
	public static String get_flow_mod(Document doc) throws ApplicationException,SystemException{
		Connection conn = DBCtrl.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			int flow_mod=Integer.parseInt(XmlHelper.getSingleParam(doc, "flow_mod"));
			ps = conn.prepareStatement(GET_FLOW_MOD);
			ps.setInt(1, flow_mod);
			rs=ps.executeQuery();
			rs.next();
			if(rs.getInt(1)>0)
				return get_tache_model(flow_mod);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		} finally {
			DBCtrl.close(conn, ps,rs);
		}
		return null;
	}
	
	public static String get_form_id() throws ApplicationException,SystemException{
		Connection conn = DBCtrl.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs=stmt.executeQuery(GET_FORM_ID);
			return XmlHelper.rsToXML(rs);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		} finally {
			DBCtrl.close(conn, stmt,rs);
		}
	}
	public static String get_sys_config() throws ApplicationException,SystemException{
		Connection conn = DBCtrl.getConnection();
		Statement stmt = null;
		ResultSet rs = null;
		try {
			stmt = conn.createStatement();
			rs=stmt.executeQuery(GET_SYS_CONFIG);
			return XmlHelper.rsToXML(rs);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		} finally {
			DBCtrl.close(conn, stmt,rs);
		}
	}
	
	public static String get_table_fields(Document doc) throws ApplicationException,SystemException{
		String table_name=XmlHelper.getSingleParam(doc, "table_name").toUpperCase();
		if(table_fields_map.containsKey(table_name)){
			return table_fields_map.get(table_name);
		}
		Connection conn = DBCtrl.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement(GET_TABLE_FIELDS);
			ps.setString(1,table_name);
			rs=ps.executeQuery();
			String result=XmlHelper.rsToXML(rs);
			table_fields_map.put(table_name, result);
			return result;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		} finally {
			DBCtrl.close(conn, ps,rs);
		}
	}
	
	public static String get_table_fields(String table_name) throws ApplicationException,SystemException{
		if(table_fields_map.containsKey(table_name)){
			return table_fields_map.get(table_name);
		}
		Connection conn = DBCtrl.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement(GET_TABLE_FIELDS);
			ps.setString(1,table_name);
			rs=ps.executeQuery();
			String result=XmlHelper.rsToXML(rs);
			table_fields_map.put(table_name, result);
			return result;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		} finally {
			DBCtrl.close(conn, ps,rs);
		}
	}
	
	public static String get_tache_model(int flow_mod) throws ApplicationException,SystemException{
		Connection conn = DBCtrl.getConnection();
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			ps = conn.prepareStatement(GET_TACHE_MODEL);
			ps.setInt(1, flow_mod);
			rs=ps.executeQuery();
			return XmlHelper.rsToXML(rs);
		} catch (SQLException e) {
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		} finally {
			DBCtrl.close(conn, ps,rs);
		}
	}
	
	public static String push_into_table(List<List<String>> inserts) throws ApplicationException,SystemException{
		Connection conn = DBCtrl.getConnection();
		Statement stmt = null;
		try {
			conn.setAutoCommit(false);
			stmt=conn.createStatement();
			for(List<String> insert:inserts){
				System.out.println(insert);
				for(String insertsql:insert){
					stmt.addBatch(insertsql);
				}
				stmt.executeBatch();
			}
			conn.commit();
			return XmlHelper.SUCCESS_XML;
		} catch (SQLException e) {
			try {
				conn.rollback();
			} catch (SQLException se) {
				se.printStackTrace();
				throw new SystemException(e.getMessage(), e);
			}
			e.printStackTrace();
			throw new SystemException(e.getMessage(), e);
		}finally {
			DBCtrl.close(conn, stmt);
		}
	}
}
