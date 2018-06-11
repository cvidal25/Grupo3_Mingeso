package grupo3.mingeso.others;

public class StrategyPython implements Strategy {

    @Override
    public String[] executeCode(String code, String input, String output) {
        codeAPI codeRunner = new codeAPI();
        return codeRunner.runProgram(code,"python",input,output);
    }
}
