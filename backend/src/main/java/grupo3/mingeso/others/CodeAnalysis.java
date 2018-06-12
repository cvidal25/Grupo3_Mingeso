package grupo3.mingeso.others;


import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class CodeAnalysis {

    public void searchCommentsCode(String code, Integer lenguage) {
        if (lenguage == 1) {
            int occurance = StringUtils.countMatches(code.toLowerCase(), "def");
            int input = StringUtils.countMatches(code.toLowerCase(), "#input");
            int out = StringUtils.countMatches(code.toLowerCase(), "#output");
            int description = StringUtils.countMatches(code.toLowerCase(), "#descripcion");
            if (occurance == input && occurance == out && occurance == description) {
                System.out.println("Paso el test de Comentario");
            } else {
                System.out.println("el codigo no pasa el test de comentario");
            }
        }
        if (lenguage == 2) {
            int function = 0;
            int input = StringUtils.countMatches(code.toLowerCase(), "//input");
            int out = StringUtils.countMatches(code.toLowerCase(), "//output");
            int description = StringUtils.countMatches(code.toLowerCase(), "//descripcion");
            List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
            for (String elemento : myList) {
                if (elemento.contains("public") || elemento.contains("private") || elemento.contains("protected")) {
                    System.out.println(elemento);
                    function++;
                }

            }
            if (function == input && function == out && function == description) {
                System.out.println("Cumple con el punto (C)");
            } else {
                System.out.println("No cumple el punto(C)");
            }
        }

        if (lenguage == 3) {
            int input = StringUtils.countMatches(code.toLowerCase(), "//input");
            int out = StringUtils.countMatches(code.toLowerCase(), "//output");
            int description = StringUtils.countMatches(code.toLowerCase(), "//descripcion");
            int function = 0;
            List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
            for (String elemento : myList) {
                if (elemento.contains("int ") || elemento.contains("float ") || elemento.contains("double ") || elemento.contains("char ") || elemento.contains("void ")) {
                    if (StringUtils.endsWithIgnoreCase(elemento, ")") || StringUtils.endsWithIgnoreCase(elemento, "{")) {
                        function++;
                        System.out.println(elemento);
                    }

                }

            }
            if (function == input && function == out && function == description) {
                System.out.println("Cumple con el punto (C)");
            } else {
                System.out.println("No cumple el punto(C)");
            }
        }


    }

    public void detectVariable(String code) {

        List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
        System.out.println(myList);

        for (String linea : myList) {

            if (linea.contains("int ")) {
                //hacer para cada tipo de variable solo se cambia el primer replace
                if (StringUtils.endsWithIgnoreCase(linea, ";")) {

                    String aux = StringUtils.substringBefore(StringUtils.deleteWhitespace(linea.replace("int ", "").replace(";", "")), "=");
                    System.out.println(aux);
                    System.out.println(aux.length());
                }
            }

            if (linea.contains("float ")) {
                //hacer para cada tipo de variable solo se cambia el primer replace
                if (StringUtils.endsWithIgnoreCase(linea, ";")) {

                    String aux = StringUtils.substringBefore(StringUtils.deleteWhitespace(linea.replace("float ", "").replace(";", "")), "=");
                    System.out.println(aux);

                    System.out.println(aux.length());
                }
            }
            if (linea.contains("double ")) {
                //hacer para cada tipo de variable solo se cambia el primer replace
                if (StringUtils.endsWithIgnoreCase(linea, ";")) {

                    String aux = StringUtils.substringBefore(StringUtils.deleteWhitespace(linea.replace("double ", "").replace(";", "")), "=");
                    System.out.println(aux);

                    System.out.println(aux.length());
                }
            }
            if (linea.contains("char ")) {
                //hacer para cada tipo de variable solo se cambia el primer replace
                if (StringUtils.endsWithIgnoreCase(linea, ";")) {

                    String aux = StringUtils.substringBefore(StringUtils.deleteWhitespace(linea.replace("char ", "").replace(";", "").replace("*", "")), "=");
                    System.out.println(aux);

                    System.out.println(aux.length());
                }
            }


        }
    }

    public void dectectVariablePython(String code) {
        List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
        for (String elemento : myList) {
            if (elemento.contains("=")) {
                String aux = StringUtils.substringBefore(StringUtils.deleteWhitespace(elemento), "=");
                if (aux.length() < 3) {
                    System.out.println(aux);

                } else {
                    System.out.println("cumple");
                }

            }
        }


    }

    public void findPrincipalBody(String code, Integer lenguage) {
        if (lenguage == 1) {
            int occuranceInput = StringUtils.countMatches(code.toLowerCase(), "#entrada");
            int occuranceProcess = StringUtils.countMatches(code.toLowerCase(), "#procesamiento");
            int occuranceOutput = StringUtils.countMatches(code.toLowerCase(), "#salida");
            if (occuranceInput == 1 && occuranceProcess == 1 && occuranceOutput == 1) {
                System.out.println("El codigo cumple con el cuerpo principal");

            } else {
                System.out.println("El codigo No cumple con el cuerpo principal");

            }
        }
        if (lenguage == 2 || lenguage == 3) {
            int occuranceInput = StringUtils.countMatches(code.toLowerCase(), "//entrada");
            int occuranceProcess = StringUtils.countMatches(code.toLowerCase(), "//procesamiento");
            int occuranceOutput = StringUtils.countMatches(code.toLowerCase(), "//salida");
            if (occuranceInput == 1 && occuranceProcess == 1 && occuranceOutput == 1) {
                System.out.println("El codigo cumple con el cuerpo principal");

            } else {
                System.out.println("El codigo No cumple con el cuerpo principal");

            }
        }


    }



    public void IdentationAnalyzer(String code) {


        int identation = StringUtils.countMatches(code.toLowerCase(), "  ");
        int tabulacion = StringUtils.countMatches(code.toLowerCase(), "\t");
        if (identation > 1 || tabulacion > 1) {
            System.out.println("Cumnple identacion");
        }
        else {
            System.out.println("Terrible pollo ");
        }
        System.out.println("Indentation");
        System.out.println(identation);


    }

}





