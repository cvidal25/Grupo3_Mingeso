package grupo3.mingeso.others;

public class Factory {
    int language;
    String code;

    public void Factory(int lang, String code){
        this.language = lang;
        this.code = code;
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

    public String executeFactory(){
        if(this.language == 1){
            Strategy python = new StrategyPython();
            Context context = new Context(python);
            return context.methodStrategy(code);
        }else if(language == 2){
            Strategy java = new StrategyJava();
            Context context = new Context(java);
            return context.methodStrategy(code);
        }else if(language == 3){
            Strategy c = new StrategyC();
            Context context = new Context(c);
            return context.methodStrategy(code);
        }
        return null;
    }
}
