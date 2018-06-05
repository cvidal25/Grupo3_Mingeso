package grupo3.mingeso.others;


import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


public class CodeAnalysis {

        public void searchCommentsCode(String code, Integer lenguaje){
            int i = 0 ;
            if (lenguaje==1) {
                int occurance = StringUtils.countMatches(code, "def");
                int input = StringUtils.countMatches(code, "#input");
                int out = StringUtils.countMatches(code, "#output");
                int description = StringUtils.countMatches(code, "#descripcion");
                if (occurance * 3 == input && occurance * 3 == out && occurance * 3 == description) {
                    System.out.println("Paso el test de Comentario");
                } else {
                    System.out.println("el codigo no pasa el test de comentario");
                }
            }
            
        }

        public void detectVariable(String code) {

            List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
            //IN JAVA O C, python change value to =
            for (String linea : myList) {

                if (linea.contains("int ")) {
                    //hacer para cada tipo de variable solo se cambia el primer replace
                    if (StringUtils.endsWithIgnoreCase(linea,";")) {

                        String aux = StringUtils.deleteWhitespace(linea.replace("int ", "").replace(";",""));
                        System.out.println(aux);
                        System.out.println(aux.length());
                    }
                }

                if ( linea.contains("float ")) {
                    //hacer para cada tipo de variable solo se cambia el primer replace
                    if (StringUtils.endsWithIgnoreCase(linea,";")) {

                        String aux = StringUtils.deleteWhitespace(linea.replace("float ", "").replace(";",""));
                        System.out.println(aux);

                        System.out.println(aux.length());
                    }
                }
                if (linea.contains("double ")) {
                    //hacer para cada tipo de variable solo se cambia el primer replace
                    if (StringUtils.endsWithIgnoreCase(linea,";")) {

                        String aux = StringUtils.deleteWhitespace(linea.replace("double ", "").replace(";",""));
                        System.out.println(aux);

                        System.out.println(aux.length());
                    }
                }
                if (linea.contains("char ")) {
                    //hacer para cada tipo de variable solo se cambia el primer replace
                    if (StringUtils.endsWithIgnoreCase(linea,";")) {

                        String aux = StringUtils.deleteWhitespace(linea.replace("char ", "").replace(";","").replace("*",""));
                        System.out.println(aux);

                        System.out.println(aux.length());
                    }
                }

                if (linea.contains("char * ")) {
                    //hacer para cada tipo de variable solo se cambia el primer replace
                    if (StringUtils.endsWithIgnoreCase(linea,";")) {

                        String aux = StringUtils.deleteWhitespace(linea.replace("char ", "").replace(";","").replace("*",""));
                        System.out.println(aux);

                        System.out.println(aux.length());
                        }
                 }

                }
            }

        public void dectectVariablePython(String code){
        List<String> myList = new ArrayList<String>(Arrays.asList(code.split("\n")));
        for (String elemento : myList){
            if (elemento.contains("=")) {
                String aux = StringUtils.substringBefore(StringUtils.deleteWhitespace(elemento),"=");
                if (aux.length()<3){
                    System.out.println(aux);

                }
                else{
                    System.out.println("cumple");
                }

            }
        }


        }

        public void findPrincipalBody(String code, Integer lenguage){
            if (lenguage == 1) {
                int occurance_input = StringUtils.countMatches(code, "#entrada");
                int occurance_process = StringUtils.countMatches(code, "#procesamiento");
                int occurance_output = StringUtils.countMatches(code, "#salida");
                if (occurance_input == 1 && occurance_process == 1 && occurance_output == 1) {
                    System.out.println("El codigo cumple con el cuerpo principal");

                } else {
                    System.out.println("El codigo No cumple con el cuerpo principal");

                }
            }
        if (lenguage == 2 || lenguage == 3){
            int occurance_input = StringUtils.countMatches(code, "//entrada");
            int occurance_process = StringUtils.countMatches(code, "//procesamiento");
            int occurance_output = StringUtils.countMatches(code, "//salida");
            if (occurance_input == 1 && occurance_process == 1 && occurance_output == 1) {
                System.out.println("El codigo cumple con el cuerpo principal");

            } else {
                System.out.println("El codigo No cumple con el cuerpo principal");

            }
        }


        }




    }





