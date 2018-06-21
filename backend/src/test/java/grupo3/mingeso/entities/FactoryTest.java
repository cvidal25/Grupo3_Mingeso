package grupo3.mingeso.entities;


import grupo3.mingeso.others.Factory;
import org.junit.Before;
import org.junit.Test;


import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static junit.framework.TestCase.assertTrue;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;

public class FactoryTest {

    int language;
    String code;
    int exercise_id;
    String input;
    String output;
    int user_id;
    int resolving_time; //in minutes
    Factory factory = new Factory();

    @Before
    public void before(){
        language = 1;
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
        exercise_id = 2;
        input = "hola";
        output = "aloh";
        user_id = 1;
        resolving_time = 20;
        factory.setLanguage(language);
        factory.setCode(code);
        factory.setInput(input);
        factory.setOutput(output);
        factory.setExercise_id(exercise_id);
        factory.setUser_id(user_id);
        factory.setResolving_time(resolving_time);


    }


    @Test
    public void getAndSetTest(){

        assertTrue(factory.getLanguage()==language);

        assertTrue(factory.getCode()==code);

        assertTrue(factory.getInput()==input);

        assertTrue(factory.getOutput()==output);

        assertTrue(factory.getExercise_id()==exercise_id);

        assertTrue(factory.getExercise_id()==exercise_id);

        assertTrue(factory.getResolving_time()==resolving_time);

    }

   

}
