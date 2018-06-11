package grupo3.mingeso.others;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

//@Component("strategyC")
public class StrategyC implements Strategy{

    @Override
    public String[] executeCode(String code, String input, String output) {
        codeAPI codeRunner = new codeAPI();
        return codeRunner.runProgram(code,"c",input,output);
    }
}
