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
        try {
            URL url = new URL("https://run.glot.io/languages/c/latest");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("authorization", "Token b5638b86-3d1c-44e4-b152-29a69cf1cfde");

            String code = "{\"files\":\n" +
                    "\t[\n" +
                    "\t\t{\"name\": \"main.c\", \n" +
                    "\t\"content\": \""+input+"\"}\n" +
                    "\t]\n" +
                    "\t\n" +
                    "}";
            // String code = "{\"files\": [{\"name\" : \"main.py\", \"content\": \"" + input +"\"}]}";

            System.out.println(code);

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(code.getBytes());
            outputStream.flush();

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                throw new RuntimeException("Please check your inputs : HTTP error code : "+ connection.getResponseCode());
            }

            BufferedReader bufferedReader;
            bufferedReader = new BufferedReader(new InputStreamReader(
                    (connection.getInputStream())));

            String output;
            String realOutput = "";
            System.out.println("Output from Glot .... \n");
            while ((output = bufferedReader.readLine()) != null) {
                realOutput += output;
                System.out.println(output);
            }
            connection.disconnect();
            return realOutput;

        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
