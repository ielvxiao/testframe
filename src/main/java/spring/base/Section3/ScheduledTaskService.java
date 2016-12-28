package Section3;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by Administrator on 2016/12/8.
 */
@Service
public class ScheduledTaskService {
    private static final SimpleDateFormat dateFormat =
            new SimpleDateFormat("HH:mm:ss");

    @Scheduled(fixedRate = 5000)
    public void reportCurrentTime() {
        System.out.println("每隔五秒执行一次" + dateFormat.format(new Date()));
    }

    @Scheduled(cron = "0 24 18 ? * *")
    public void fixTimeExecution() {
        System.out.println("在指定时间" + dateFormat.format(new Date()) + "执行");
    }
}
