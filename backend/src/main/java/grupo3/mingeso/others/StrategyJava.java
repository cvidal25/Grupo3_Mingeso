package grupo3.mingeso.others;

public class StrategyJava implements Strategy {

    @Override
    public String[] executeCode(String code, String input, String output) {
        codeAPI codeRunner = new codeAPI();
        return codeRunner.runProgram(code,"java",input,output);
    }
}
