package spring.base.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import spring.base.service.PostService;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;

/**
 * Created by Administrator on 2016/12/9.
 */
@Controller
public class PostControllar {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    PostService postService;


    @RequestMapping(value = "/count", method = RequestMethod.GET)
    @ResponseBody
    public Object getPostsql(){
        return jdbcTemplate.queryForMap("SELECT \"count\"(*) AS total FROM netward_used");
    }

    @RequestMapping(value = "/countsql", method = RequestMethod.GET)
    @ResponseBody
    public Object getMysql(){
        return jdbcTemplate.queryForMap("SELECT COUNT(*) AS total FROM netward_used");
    }

    //获取整个广州市和各个区的信息
    @RequestMapping(value="/a", method = RequestMethod.GET)
    @ResponseBody
    public Object getAreaCunt(){
        Map<String ,Object> map = new HashMap<String, Object>();
        List<Object> list = new ArrayList<Object>();
        //如果参数为null则获得广州全市的统计
        Object guangzhou = postService.countGuangzhou(null);
        map.put("guangzhou", guangzhou);
        //获取各个区域的信息，区域id是从1到11
        for (int i = 0; i < 11; i++) {
            String guid = i + 1 + "";
            list.add(postService.countGuangzhou(guid));
        }
        map.put("area", list);
        return map;
    }

    @RequestMapping(value = "/insert", method = RequestMethod.GET)
    @ResponseBody
    public void insert(int num){
        List<Map<String, Object>> listUserguid = jdbcTemplate.queryForList("SELECT guid FROM userinfo");
        jdbcTemplate.batchUpdate("INSERT INTO netward_used(\n" +
                " \n" +
                "\tdescription,\n" +
                "\tfileaction,\n" +
                "\tfilename,\n" +
                "\tfilepath,\n" +
                "\tguid,\n" +
                "\tkw_guid,\n" +
                "\tsummary,\n" +
                "\ttime,\n" +
                "\ttitle,\n" +
                "\tuser_guid,\n" +
                "\tmac,\n" +
                "autodealwith,\n" +
                "dealwith,\n" +
                "duser_guid,\n" +
                "dealwith_time\n" +
                ") VALUES(?,?,?,?,?,?,?,now(),?,?,?,?,?,?,now())", new BatchPreparedStatementSetter() {
            @Override
            public void setValues(PreparedStatement preparedStatement, int i) throws SQLException {
                preparedStatement.setString(1, "");
                preparedStatement.setString(2,"555");
                preparedStatement.setString(3,"C:/Users/admin/Desktop/677728597.doc");
                preparedStatement.setString(4,"/home/system/tiptop/alarmfile/00ab00db00ee00b600ab002200420083/AlarmFile_20161026_136094453.doc");
                preparedStatement.setString(5, UUID.randomUUID().toString());
                preparedStatement.setString(6,"75f33e08-aa60-41f2-9106-e8e2f5b2732e");
                preparedStatement.setString(7,"机密 75f33e08-aa60-41f2-9106-e8e2f5b");
                preparedStatement.setString(8,"进程:Explorer.EXE");
                preparedStatement.setString(9,listUserguid.get(new Random().nextInt(listUserguid.size())).get("guid").toString());
                preparedStatement.setString(10,"00-01-A4-AB-5D-99");
                preparedStatement.setInt(11,0);
                preparedStatement.setInt(12,new Random().nextInt(3));
                preparedStatement.setInt(13,42);

            }

            @Override
            public int getBatchSize() {
                return num;
            }
        });
    }

    @RequestMapping(value = "/query", method = RequestMethod.GET)
    @ResponseBody
    public Object queryfonetward(int start){
        return jdbcTemplate.queryForList("SELECT * FROM netward_used n LEFT JOIN userinfo ui ON n.user_guid=ui.guid ORDER BY n.time DESC limit 200 offset ?", start);
    }

}
