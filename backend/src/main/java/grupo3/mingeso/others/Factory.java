package grupo3.mingeso.others;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

//@Component
public class Factory {

    /*@Autowired
    Context context;

    @Autowired
    @Qualifier("strategyPython")
    Strategy strategyPython;

    @Autowired
    @Qualifier("strategyJava")
    Strategy strategyJava;

    @Autowired
    @Qualifier("strategyC")
    Strategy strategyC;
*/
    int language;
    String code;
    int exercise_id;

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

    String input;
    String output;

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

    public String[] executeFactory(){
        if(this.language == 1){
            Strategy python = new StrategyPython();
            Context context = new Context(python);
            //context.setStrategy(strategyPython);
            return context.methodStrategy(code,input,output);
        }else if(language == 2){
            Strategy java = new StrategyJava();
            Context context = new Context(java);
            //context.setStrategy(strategyJava);
            return context.methodStrategy(code,input,output);
        }else if(language == 3){
            Strategy c = new StrategyC();
            Context context = new Context(c);
            //context.setStrategy(strategyC);
            return context.methodStrategy(code,input,output);
        }
        return null;
    }
}
