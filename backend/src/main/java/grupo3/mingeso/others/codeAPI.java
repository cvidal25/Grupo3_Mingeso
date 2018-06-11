package grupo3.mingeso.others;

import grupo3.mingeso.entities.Exercise;
import grupo3.mingeso.repository.ExerciseRepository;
import grupo3.mingeso.rest.ExerciseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

import javax.validation.constraints.Null;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Optional;

//@Controller
public class codeAPI {

    /*@Autowired
    ExerciseRepository exerciseRepository;*/

    public codeAPI(){
    }

    //poner condiciones en caso de que no haya input
    //ver la manera de tener el output en esta función
    //Corregir en las estrategias el nombre de la función y los parametros de entrada
    public String[] runProgram(String code, String language, String input, String output){
        int i = 0;
        /*Exercise exercise;
        System.out.println("holi");
        System.out.println(exerciseRepository.existsById(2));
        System.out.println("chau");
        exercise = exerciseRepository.findById(2).get();*/

        System.out.println(input);
        //String input = exercise.getExerciseInput();
        String[] realInput = input.split("/@");
        /*for(i = 0; i < realInput.length; i++){
            System.out.println(realInput[i]);
        }*/

        //String output = exercise.getExerciseOutput();
        String[] realOutput = output.split("/@");

        String[] jsonOutput = new String[realInput.length];

        while(i < realInput.length){
            jsonOutput[i] = runAPI(code,language,realInput[i]);
            i++;
        }

        return jsonOutput;
    }


    //if input es null
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

            realCode = "{\"stdin\":\"" +input+"\"," +
                    "\"files\":\n" +
                    "\t[\n" +
                    "\t\t{\"name\": \""+programName+"\", \n" +
                    "\t\"content\": \""+code+"\"}\n" +
                    "\t]\n" +
                    "\t\n" +
                    "}";
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
