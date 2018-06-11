package grupo3.mingeso.others;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

//@Component("strategyJava")
public class StrategyJava implements Strategy {

    @Override
    public String[] executeCode(String code, String input, String output) {
        codeAPI codeRunner = new codeAPI();
        return codeRunner.runProgram(code,"java",input,output);
    }
}
