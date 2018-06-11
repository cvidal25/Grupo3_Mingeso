package grupo3.mingeso.others;

public class Context {

    Strategy strategy;

    public Context(Strategy strategy){
        this.strategy = strategy;
    }

    public void setStrategy(Strategy strategy){
        this.strategy = strategy;
    }

    //Método de estrategia
    public String[] methodStrategy(String code, String input, String output)
    {
        if (code.contains("\"") || code.contains("\\n")) {
            String mediumCode = code.replace("\"","\\\"");
            String realCode =  mediumCode.replace("\\n","\\\\n");
            return strategy.executeCode(realCode,input,output);
        }
        return strategy.executeCode(code,input,output);
    }
}