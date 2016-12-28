package spring.base.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import spring.base.util.MapResult;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PostService {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    //广州市和各个区的涉密统计和客户端状态统计
    public Object countGuangzhou(String area_guid) {
        /**
         *  获取所有单位类型下的单位数和涉密文件数
         */
        MapResult returnResult = new MapResult();
        List<Map<String, Object>> reportList = new ArrayList<Map<String, Object>>();
        //获取单位类型的guid和name(名称)
        List<Map<String, Object>> list =jdbcTemplate.queryForList("SELECT guid,name FROM unittype");
        for(int i=0;i<list.size();i++){
            //根据区域id和单位类型获取单位类型guid，单位类型名称，和单位数量
            String sqlForUnitNum = "SELECT \"max\"(ut.guid),\n" +
                    "\t\"max\"(ut.name),\"count\"(*) AS unitnum FROM unit u LEFT JOIN unittype ut ON  u.unittype_guid=ut.guid LEFT JOIN area a ON a.guid=u.area_guid where 1=1";
            if (area_guid != null) {
                sqlForUnitNum+= " and a.id='"+area_guid+"'";
            }
            sqlForUnitNum+= " and u.unittype_guid='"+list.get(i).get("guid")+"'";
            List<Map<String, Object>> listResult =jdbcTemplate.queryForList(sqlForUnitNum.toString());
            //获取确认涉密文件数量
            String sqlForFileNum="SELECT \"count\"(*) AS filenum FROM netward_used n LEFT JOIN userinfo ui on ui.guid=n.user_guid LEFT JOIN unit u ON u.guid =ui.unit_guid LEFT JOIN area a ON a.guid=u.area_guid ";
            sqlForFileNum+=" where n.dealwith=1";
            if (area_guid != null) {
                sqlForFileNum+= " and a.id='"+area_guid+"'";
            }
            sqlForFileNum+= " and u.unittype_guid='"+list.get(i).get("guid")+"'";
            List<Map<String, Object>> listResult1 =jdbcTemplate.queryForList(sqlForFileNum.toString());
            Object a=new Object();
            Object b=new Object();
            Object c=new Object();
            Object d=new Object();
            a=listResult.get(0).get("guid");     //获取单位类型guid
            b=listResult.get(0).get("unittype"); //获取单位类型名称
            c=listResult.get(0).get("unitnum");  //获取单位数量
            d=listResult1.get(0).get("filenum"); //获取文件数
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("guid", a !=null ? a : list.get(i).get("guid"));
            map.put("name", b !=null ? b : list.get(i).get("name"));
            map.put("unitnum", c !=null ? c : "0");
            map.put("filenum", d !=null ? d : "0");
            reportList.add(map);
        }
        /**
         *  获取预警信息总数总数和已处理总数
         */
        StringBuilder sql4_1 = new StringBuilder();
        StringBuilder sql4_2 = new StringBuilder();
        //获取预警信息总数
        sql4_1.append("SELECT \"count\"(*) AS allmessage FROM netward_used n LEFT JOIN userinfo ui ON n.user_guid=ui.guid LEFT JOIN area a ON a.guid=ui.area_guid WHERE 1=1");
        if (area_guid != null) {
            sql4_1.append(" AND a.id='"+area_guid+"'");
        }
        List<Map<String, Object>> list4_1 = jdbcTemplate.queryForList(sql4_1.toString());
        //获取已处理信息总数
        sql4_2.append("SELECT \"count\"(*) AS dealmessage FROM netward_used n");
        sql4_2.append(" LEFT JOIN userinfo ui ON ui.guid=n.user_guid LEFT JOIN area a ON a.guid=ui.area_guid WHERE n.dealwith between 1 and 3");
        if (area_guid != null) {
            sql4_2.append(" and a.id ='"+area_guid+"'");
        }
        List<Map<String, Object>> list4_2 = jdbcTemplate.queryForList(sql4_2.toString());

        Map<String, Object> mm1 = list4_1.get(0);
        Object obj1 = mm1.get("allmessage");
        Map<String, Object> mm2 = list4_2.get(0);
        Object obj2 =mm2.get("dealmessage");
        /**
         * 用户在线数和非在线数
         */

        StringBuilder sql1 = new StringBuilder();
        sql1.append("SELECT \"count\"(*) as total FROM (SELECT \"max\"(us.onlineflag) as onlineflag,\"max\"(A.ID) as id FROM userinfo ui LEFT JOIN userstatus us ON ui.guid = us.user_guid LEFT JOIN area a ON ui.area_guid = a.guid");
        sql1.append(" GROUP BY ui.mac ) v1 where 1=1");
        if (area_guid != null && area_guid != "") {
            sql1.append(" and v1.id='" + area_guid + "'");
        }
        //在线的话onlineflag为1
        String online = sql1 + " and v1.onlineflag=1";
        //不在线的话onlinflag为0
        String offline = sql1 + " and v1.onlineflag=0";
        //获取区域名称
        String[] arealist = {"南沙区", "海珠区", "番禺区", "荔湾区", "天河区", "花都区", "白云区", "越秀区", "黄埔区", "从化区", "增城区"};
        String area = null;
        if(area_guid != null){
            area = arealist[Integer.parseInt(area_guid)-1];
        }
        //区域名称
        returnResult.setArea(area);
        //在线数量
        Map<String ,Object> mapOnline = jdbcTemplate.queryForMap(online);
        returnResult.setOnline(Long.parseLong(mapOnline.get("total").toString()));
        //不在线数量
        Map<String ,Object> mapOffline = jdbcTemplate.queryForMap(offline);
        returnResult.setOffline(Long.parseLong(mapOffline.get("total").toString()));
        //预警信息数量
        returnResult.setAllalarm(Long.parseLong(obj1.toString()));
        //已处理数量
        returnResult.setDealed(Long.parseLong(obj2.toString()));
        //单位类型数量和文件数量
        returnResult.setRows(reportList);

        return returnResult;
    }
}
