package spring.base.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import spring.base.domain.WiselyMessage;
import spring.base.domain.WiselyResponse;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class WsController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping("/ws")
    public String tows(){
        return "/ws";
    }
    @MessageMapping("/welcome")
    @SendTo("/topic/getResponse")
    public Object say(WiselyMessage message) throws Exception {
        int total = Integer.parseInt(jdbcTemplate.queryForMap("SELECT COUNT(*) as total FROM netward_used").get("total").toString());
        List<Map<String, Object>> list = jdbcTemplate.queryForList("SELECT time FROM netward_used ORDER BY time DESC limit 10");
        System.out.println(message.getName());
        Thread.sleep(3000);
        Map<String, Object> map = new HashMap<>();
        map.put("total",total);
        map.put("list",list);
        return map;
    }
}
