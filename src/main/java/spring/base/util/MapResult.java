package spring.base.util;

import java.util.List;

public class MapResult {
    private String area;
    private Long allalarm; //所有的预警信息
    private Long dealed;  //已处理信息
    private List<?> rows; //所有单位类型的数量以及文件数
    private Long online;  //在线客户端数
    private Long offline; //离线客户端数

    public String getArea() {
        return area;
    }
    public void setArea(String area) {
        this.area = area;
    }
    public Long getAllalarm() {
        return allalarm;
    }
    public void setAllalarm(Long allalarm) {
        this.allalarm = allalarm;
    }
    public Long getDealed() {
        return dealed;
    }
    public void setDealed(Long dealed) {
        this.dealed = dealed;
    }
    public List<?> getRows() {
        return rows;
    }
    public void setRows(List<?> rows) {
        this.rows = rows;
    }
    public Long getOnline() {
        return online;
    }
    public void setOnline(Long online) {
        this.online = online;
    }
    public Long getOffline() {
        return offline;
    }
    public void setOffline(Long offline) {
        this.offline = offline;
    }

}
