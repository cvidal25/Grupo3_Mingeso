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
    public String methodStrategy(String input)
    {
        if (input.contains("\"") || input.contains("\\n")) {
            String mediumInput = input.replace("\"","\\\"");
            String realInput =  mediumInput.replace("\\n","\\\\n");
            return strategy.executeCode(realInput);
        }
        return strategy.executeCode(input);
    }
}