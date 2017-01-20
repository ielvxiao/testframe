package spring.base.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Map;

/**
 * Created by Clark on 2017/1/11.
 * 向数据库中插入图片
 */
@Service
public class ImageService {
    @Autowired
    JdbcTemplate jdbcTemplate;

    public void insertImage(){
        String path = "F:\\迅雷下载\\ukbench\\full";
        File file = new File(path);
        File[] files = file.listFiles();
        System.out.println("总文件个数：" + files.length);

        InputStream fileInputStream = null;
        for (int i = 0; i < files.length; i++) {
            try {
                fileInputStream = new FileInputStream(files[i]);
                byte[] b = org.apache.commons.io.IOUtils.toByteArray(fileInputStream);
                jdbcTemplate.update("INSERT INTO image VALUES (DEFAULT , ?)", b);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

    }

    public void readImage(){
        FileOutputStream fileOutputStream = null;

        try {
            Map<String, Object> map = jdbcTemplate.queryForMap("SELECT image,\"length\"(image) FROM image");
            fileOutputStream = new FileOutputStream("00.jpg");
            int len = Integer.parseInt(map.get("length").toString());
            byte[] b = map.get("image").toString().getBytes();
            fileOutputStream.write(b, 0, len);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
