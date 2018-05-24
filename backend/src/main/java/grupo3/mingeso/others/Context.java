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
        return strategy.executeCode(input);
    }
}
