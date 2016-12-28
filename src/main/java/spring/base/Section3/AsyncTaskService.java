package Section3;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2016/12/8.
 */
class main {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(TaskExecutorConfig.class);
        AsyncTaskService asyncTaskService =
                context.getBean(AsyncTaskService.class);

        for (int i = 0; i < 10; i++) {
            asyncTaskService.executeAsyncTask(i);
            asyncTaskService.excuteAsyncTaskPlus(i);
        }
        context.close();
    }
}
@Service
public class AsyncTaskService {

    @Async
    public void executeAsyncTask(Integer i ) {
        System.out.println("执行了异步任务:" + i);
    }

    @Async
    public void excuteAsyncTaskPlus(Integer i) {
        System.out.println("执行了异步任务+1：" + i);
    }
}
