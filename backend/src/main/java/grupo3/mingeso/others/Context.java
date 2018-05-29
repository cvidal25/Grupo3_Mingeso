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
        int i = 1;
        String realInput = "";
        if (input.contains("\"")) {
            String[] parts = input.split("(?=\")");
            realInput = realInput.concat(parts[0]);
            while(i < parts.length){
                realInput = realInput.concat("\\");
                realInput = realInput.concat(parts[i]);
                i++;
            }
            return strategy.executeCode(realInput);
        }
        return strategy.executeCode(input);
    }
}
