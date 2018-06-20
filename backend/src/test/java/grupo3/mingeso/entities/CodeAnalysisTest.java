package grupo3.mingeso.entities;
import grupo3.mingeso.others.CodeAnalysis;
import org.junit.Before;
import org.junit.Test;


import java.util.ArrayList;
import java.util.List;

import static junit.framework.TestCase.assertTrue;

import static org.junit.Assert.assertArrayEquals;


public class CodeAnalysisTest {

    String code;
    boolean comments;
    boolean body;
    boolean identation;
    List<String> pythonVariables;
    List<String> variables;
    @Before
    public void before() {

        CodeAnalysis codeAnalysisObject = new CodeAnalysis();

        code = "def funcionPrueba(string):\n" +
                "\tif string == \"hola\":\n" +
                "\t\treturn \"aloh\"\n" +
                "\telif string == \"bai\":\n" +
                "\t\treturn \"iab\"\n" +
                "\telif string == \"chao\":\n" +
                "\t\treturn \"oahc\"\n" +
                "var = raw_input()\n" +
                "respuesta = funcionPrueba(var)\n" +
                "print(respuesta\\n)";

      comments = codeAnalysisObject.searchCommentsCode(code,1);
      body = codeAnalysisObject.findPrincipalBody(code,1);
      identation = codeAnalysisObject.identationAnalyzer(code);
      pythonVariables = codeAnalysisObject.dectectVariablePython(code);
      variables = codeAnalysisObject.detectVariable(code);


    }

    @Test
    public void searchCommentsCode(){
        assertTrue(comments == false);

    }

    @Test
    public void findPrincipalBody(){
        assertTrue(body == false);
    }

    @Test
    public void identationAnalyzer(){
        assertTrue(identation==true);
    }

    @Test
    public void dectectVariablePython(){
        List<String> actual = new ArrayList();
        assertArrayEquals(pythonVariables.toArray(),actual.toArray());

    }
    @Test
    public void dectectVariable(){
        List<String> actual = new ArrayList();
        assertArrayEquals(variables.toArray(),actual.toArray());
    }





}
