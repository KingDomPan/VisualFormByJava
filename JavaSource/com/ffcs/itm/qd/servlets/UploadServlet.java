package com.ffcs.itm.qd.servlets;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import com.ffcs.itm.qd.commons.AntExecSql;
import com.ffcs.itm.qd.commons.Constants;

@SuppressWarnings("serial")
public class UploadServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setCharacterEncoding("GBK");
		DiskFileItemFactory factory = new DiskFileItemFactory();
		factory.setRepository(new File(Constants.UPLOAD));
		factory.setSizeThreshold(1024 * 1024 * 2);
		ServletFileUpload upload = new ServletFileUpload(factory);
		upload.setFileSizeMax(1024 * 1024 * 2);
		List items = null;
		PrintWriter out = response.getWriter();
		try {
			items = upload.parseRequest(request);
			for (int i = 0; i < items.size(); i++) {
				FileItem item = (FileItem) items.get(i);
				if (item.getSize() > upload.getFileSizeMax()) {
					out.print("{success:false,errors:'上传失败,文件大小超过规定(2M)!!'}");
					return;
				}
				String fileName = item.getName();
				String extention=fileName.substring(fileName.lastIndexOf("."),fileName.length());
				String filePath = Constants.UPLOAD+File.separator+ System.currentTimeMillis()+ extention;
				File file = new File(filePath);
				item.write(file);
				AntExecSql.execSqlFile(filePath);
			}
			out.print("{success:true,message:'导入成功'}");
		} catch (FileUploadException e) {
			out.print("{success:false,errors:'"+e.getMessage()+"'}");
			e.printStackTrace();
		} catch (Exception e) {
			out.print("{success:false,errors:'"+e.getMessage()+"'");
			e.printStackTrace();
		}finally{
			out.close();
		}
	}
}
