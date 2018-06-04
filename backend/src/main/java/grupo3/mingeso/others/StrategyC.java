package grupo3.mingeso.others;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class StrategyC implements Strategy{
    @Override
    public String executeCode(String input) {
        codeAPI codeRunner = new codeAPI();
        return codeRunner.runCode(input,"c");
    }
}
