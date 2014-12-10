package com.ffcs.itm.qd.servlets;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.ffcs.itm.qd.commons.Constants;

@SuppressWarnings("serial")
public class DownLoadServlet extends HttpServlet {
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		String filename = new String(request.getParameter("filename").getBytes(
				"ISO-8859-1"), "utf-8");
		System.out.println(filename);
		File file = new File(Constants.DOWNLOAD+File.separator+filename);
		InputStream in = new FileInputStream(file);
		ServletOutputStream out = response.getOutputStream();
		response.addHeader("Content-disposition", "attachment;filename="
				+ new String(file.getName().getBytes("ISO-8859-1"), "gbk"));
		response.addHeader("Content-Length", String.valueOf(file.length()));
		response.setCharacterEncoding("gbk");
		response.setContentType("application/octet-stream");
		BufferedOutputStream bos = new BufferedOutputStream(out);
		byte[] buffer = new byte[2048];
		int len;
		while (-1 != (len = in.read(buffer, 0, buffer.length))){
    		bos.write(buffer, 0, len);
    	}	
		bos.close();
		in.close();
	}
}