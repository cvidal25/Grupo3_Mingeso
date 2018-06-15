package grupo3.mingeso.others;


import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static org.apache.commons.lang3.StringUtils.*;
import static org.apache.commons.lang3.StringUtils.endsWithIgnoreCase;


public class CodeAnalysis {

    //Busca Comentarios de la Funcion.
    //Detecta la Funcion.
    //Detecta Comentario Input
    //Detecta Comentario Output
    //Detecta Comentario Descripcion.
    // PYTHON C JAVA
    public boolean searchCommentsCode(String code, Integer lenguage) {
        if (lenguage == 1) {
            int occurance = countMatches(code.toLowerCase(), "def");
            int input = countMatches(code.toLowerCase(), "#input");
            int out = countMatches(code.toLowerCase(), "#output");
            int description = countMatches(code.toLowerCase(), "#descripcion");
            if (occurance == input && occurance == out && occurance == description) {
                return true;
            } else {
                return false;
            }
        }
        if (lenguage == 2) {
            int function = 0;
            int input = countMatches(code.toLowerCase(), "//input");
            int out = countMatches(code.toLowerCase(), "//output");
            int description = countMatches(code.toLowerCase(), "//descripcion");
            List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
            for (String elemento : myList) {
                if (elemento.contains("public") || elemento.contains("private") || elemento.contains("protected")) {
                    function++;
                }

            }
            if (function == input && function == out && function == description) {
               return true;
            } else {
               return false;
            }
        }

        if (lenguage == 3) {
            int input = countMatches(code.toLowerCase(), "//input");
            int out = countMatches(code.toLowerCase(), "//output");
            int description = countMatches(code.toLowerCase(), "//descripcion");
            int function = 0;
            List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
            for (String elemento : myList) {
                if (elemento.contains("int ") || elemento.contains("float ") || elemento.contains("double ") || elemento.contains("char ") || elemento.contains("void ")) {
                    if (endsWithIgnoreCase(elemento, ")") || endsWithIgnoreCase(elemento, "{")) {
                        function++;
                    }

                }

            }
            if (function == input && function == out && function == description) {
               return true;
            } else {
               return false;
            }
        }

        return false;

    }

    //Detect Variables para C y JAVA
    //IDENTIFIED LARGO
    public List<String> detectVariable(String code) {

        List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
        List<String> smallVariables = new ArrayList<>();

        for (String linea : myList) {
            if (linea.contains("int ")) {
                if (endsWithIgnoreCase(linea, ";")) {
                    String aux = substringBefore(deleteWhitespace(linea.replace("int ", "").replace(";", "")), "=");
                    lenVariableAnalyzer(smallVariables,aux);
                }
            }
            if (linea.contains("float ")) {
                if (endsWithIgnoreCase(linea, ";")) {
                    String aux = substringBefore(deleteWhitespace(linea.replace("float ", "").replace(";", "")), "=");
                    lenVariableAnalyzer(smallVariables,aux);
                }
            }
            if (linea.contains("double ")) {
                if (endsWithIgnoreCase(linea, ";")) {
                    String aux = substringBefore(deleteWhitespace(linea.replace("double ", "").replace(";", "")), "=");
                    lenVariableAnalyzer(smallVariables,aux);
                }
            }
            if (linea.contains("char ")) {
                if (endsWithIgnoreCase(linea, ";")) {
                    String aux = substringBefore(deleteWhitespace(linea.replace("char ", "").replace(";", "").replace("*", "")), "=");
                    lenVariableAnalyzer(smallVariables,aux);
                }
            }

        }
        return  smallVariables;
    }

    //Detecta Variables para Python
    // IDentifica largo.
    public List<String> dectectVariablePython(String code) {
        List<String> myList = new ArrayList<>(Arrays.asList(code.split("\n")));
        List<String> smallVariables = new ArrayList<>();
        for (String elemento : myList)
            if (elemento.contains("=")) {
                String aux = substringBefore(deleteWhitespace(elemento), "=");
                if (aux.length() < 3) {
                    lenVariableAnalyzer(smallVariables,aux);
                }
            }
        return smallVariables;
    }

    public void  lenVariableAnalyzer(List<String> smallVariables,String variable){
        if (variable.length()<3){
            smallVariables.add(variable);
        }

    }

    //Detecta Cuerpo principal
    public boolean findPrincipalBody(String code, Integer lenguage) {
        if (lenguage == 1) {
            int occuranceInput = countMatches(code.toLowerCase(), "#entrada");
            int occuranceProcess = countMatches(code.toLowerCase(), "#procesamiento");
            int occuranceOutput = countMatches(code.toLowerCase(), "#salida");
            if (occuranceInput == 1 && occuranceProcess == 1 && occuranceOutput == 1) {
               return true;

            } else {
               return false;

            }
        }
        if (lenguage == 2 || lenguage == 3) {
            int occuranceInput = countMatches(code.toLowerCase(), "//entrada");
            int occuranceProcess = countMatches(code.toLowerCase(), "//procesamiento");
            int occuranceOutput = countMatches(code.toLowerCase(), "//salida");
            if (occuranceInput == 1 && occuranceProcess == 1 && occuranceOutput == 1) {
             return true;

            } else {
               return false;

            }
        }
        return false;
    }


    public boolean identationAnalyzer(String code) {

        int identation = countMatches(code.toLowerCase(), "  ");
        int tabulation = countMatches(code.toLowerCase(), "\t");
        if (identation >= 1 || tabulation >= 1) {
            return true;
        }
        else {
            return false;
        } }

    public HashMap<String,String> Analysis(String code, Integer lenguage){
        HashMap<String,String> codeAnswer = new HashMap<>();
        if (searchCommentsCode(code,lenguage)){
            codeAnswer.put("Analisis de Comentario", "Exitoso");
        }
        else{
            codeAnswer.put("Analisis de Comentario", "Fallido");
        }
        if (identationAnalyzer(code)){
            codeAnswer.put("Analisis de Identación", "Exitoso");
        }
        else {
            codeAnswer.put("Analisis de Identación", "Fallido");
        }

        if(findPrincipalBody(code,lenguage)){
            codeAnswer.put("Analisis del Cuerpo Principal", "Exitoso");
        }
        else {
            codeAnswer.put("Analisis del Cuerpo Principal", "Fallido");
        }

        if (lenguage==1){
            codeAnswer.put("Variables Invalidas", dectectVariablePython(code).toString());
        }
        else if(lenguage==2 || lenguage==3){
            codeAnswer.put("Variables Invalidas", detectVariable(code).toString());
        }

        return codeAnswer;
    }
}





