package grupo3.mingeso.others;

import java.sql.Timestamp;
import java.util.Date;

public class Factory {

    int language;
    String code;
    int exercise_id;
    String input;
    String output;
    int user_id;
    int resolving_time; //in minutes
    Timestamp resolving_date;

    public void Factory(int lang, String code, int exercise_id){
        this.language = lang;
        this.code = code;
        this.exercise_id = exercise_id;
    }

    public int getLanguage() {
        return language;
    }

    public void setLanguage(int language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getExercise_id() { return exercise_id; }

    public void setExercise_id(int exercise_id) { this.exercise_id = exercise_id; }

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }

    public String getOutput() {
        return output;
    }

    public void setOutput(String output) {
        this.output = output;
    }

    public int getUser_id() { return user_id; }

    public void setUser_id(int user_id) { this.user_id = user_id; }

    public int getResolving_time() { return resolving_time; }

    public void setResolving_time(int resolving_time) { this.resolving_time = resolving_time; }

    public Timestamp getResolving_date() { return resolving_date; }

    public void setResolving_date(Timestamp resolving_date) { this.resolving_date = resolving_date; }

    public String[] executeFactory(){
        if(this.language == 1){
            Strategy python = new StrategyPython();
            Context context = new Context(python);
            return context.methodStrategy(code,input,output);
        }else if(language == 2){
            Strategy java = new StrategyJava();
            Context context = new Context(java);
            return context.methodStrategy(code,input,output);
        }else if(language == 3){
            Strategy c = new StrategyC();
            Context context = new Context(c);
            return context.methodStrategy(code,input,output);
        }
        return null;
    }
}
