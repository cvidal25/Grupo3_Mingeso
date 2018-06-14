package grupo3.mingeso.others;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class codeAPI {

    public codeAPI(){
    }

    public String[] runProgram(String code, String language, String input, String output) {
        int i = 0;
        int score = 0;

        String[] realInput = input.split("/@");
        String[] jsonOutput = new String[realInput.length+1];
        if(output != null){

            String[] realOutput = output.split("/@");
            while(i < realInput.length){
                jsonOutput[i] = runAPI(code,language,realInput[i]);
                if(jsonOutput[i].contains(realOutput[i]))
                    score++;
                i++;
            }
            jsonOutput[i] = Integer.toString(score);
        }else{

            while(i < realInput.length){
                jsonOutput[i] = runAPI(code,language,realInput[i]);
                i++;
            }
        }
        return jsonOutput;
    }

    public String runAPI(String code, String language,String input){
        try {
            URL url;
            if(language.equals("python")){
                url = new URL("https://run.glot.io/languages/"+language+"/2");
            }else{
                url = new URL("https://run.glot.io/languages/"+language+"/latest");
            }

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setDoOutput(true);
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("authorization", "Token b5638b86-3d1c-44e4-b152-29a69cf1cfde");

            String realCode;
            String programName = "";
            if(language.equals("python")){
                programName = "main.py";
            }else if(language.equals("java")){
                programName = "Main.java";
            }else if(language.equals("c")){
                programName = "main.c";
            }

            String stdinCode = "{\"stdin\":\"" +input+"\",";
            String middleCode = "\"files\":\n" +
                    "\t[\n" +
                    "\t\t{\"name\": \""+programName+"\", \n" +
                    "\t\"content\": \""+code+"\"}\n" +
                    "\t]\n" +
                    "\t\n" +
                    "}";

            if(input.isEmpty()){
                realCode = "{".concat(middleCode);
            }else{
                realCode = stdinCode.concat(middleCode);
            }
            // String code = "{\"stdin\": \"\",\"files\": [{\"name\" : \"main.py\", \"content\": \"" + input +"\"}]}";

            System.out.println(realCode);

            OutputStream outputStream = connection.getOutputStream();
            outputStream.write(realCode.getBytes());
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
