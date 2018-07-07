package grupo3.mingeso.rest;

import grupo3.mingeso.entities.UserExercise;
import grupo3.mingeso.repository.UserExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;


@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/userExercise")
public class UserExerciseService {
    @Autowired
    UserExerciseRepository userExerciseRepository;

    //Get all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<UserExercise> getAllUserExcercises(){ return userExerciseRepository.findAll(); }

    //Get one
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Optional<UserExercise> findOne(@PathVariable("id") Integer id) {
        return userExerciseRepository.findById(id);
    }

    //create one
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public UserExercise create(@RequestBody UserExercise resource) {

        return userExerciseRepository.save(resource);
    }

    //Get all by user id
    @RequestMapping(value = "/user/{id}",method = RequestMethod.GET)
    @ResponseBody
    public List<UserExercise> getAllByUser(@PathVariable("id") Integer id){ return userExerciseRepository.findAllByUserUserID(id); }

    //Cantidad de ejercicios resueltos diariamente por Alumno (Correo)
    @RequestMapping(value = "/exercise/student/{email}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,int[]> countByUserStudent(@PathVariable("email") String email,@PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserMailAndUserDateResolutionBetweenOrderByUserDateResolution(email,startDate,endDate);

        return countBy(completeList,year,month,lastDay,true);
    }

    //Cantidad de ejercicios resueltos diariamente por Carrera (Nombre)
    @RequestMapping(value = "/exercise/career/{career}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<String, int[]> countByCareer(@PathVariable("career") String career, @PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";
        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserCareerAndUserDateResolutionBetweenOrderByUserDateResolution(career,startDate,endDate);

        return countBy(completeList,year,month,lastDay,true);
    }

    //Cantidad de ejercicios resueltos diariamente por Coordinación
    @RequestMapping(value = "/exercise/coordination/{coordination}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,int[]> countByCoordination(@PathVariable("coordination") String coordination, @PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";
        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserCoordinationAndUserDateResolutionBetweenOrderByUserDateResolution(coordination,startDate,endDate);

        return countBy(completeList,year,month,lastDay,true);
    }

    //Tiempo invertido diariamente por Alumno (Correo)
    @RequestMapping(value = "/time/student/{email}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<String, int[]> countTimeByStudent(@PathVariable("email") String email, @PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserMailAndUserDateResolutionBetweenOrderByUserDateResolution(email,startDate,endDate);

        return countBy(completeList,year,month,lastDay,false);

    }

    //Tiempo invertido diariamente por Carrera (Nombre)
    @RequestMapping(value = "/time/career/{career}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<String, int[]> countTimeByCareer(@PathVariable("career") String career, @PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserCareerAndUserDateResolutionBetweenOrderByUserDateResolution(career,startDate,endDate);

        return countBy(completeList,year,month,lastDay,false);
    }

    //Tiempo invertido diariamente por Coordinación
    @RequestMapping(value = "/time/coordination/{coordination}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<String,int[]> countTimeByCoordination(@PathVariable("coordination") String coordination, @PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserCoordinationAndUserDateResolutionBetweenOrderByUserDateResolution(coordination,startDate,endDate);

        return countBy(completeList,year,month,lastDay,false);
    }

    @RequestMapping(value="/ranking/students/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public List<UserExercise> rankingStudentsGeneral(@PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        return userExerciseRepository.rankingStudents(startDate,endDate);
    }

    @RequestMapping(value="/ranking/coordination/{coordination}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public List<UserExercise> rankingByCoordination(@PathVariable("year") int year, @PathVariable("month") int month, @PathVariable("coordination") String coordination){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        return userExerciseRepository.rankingCoordination(startDate,endDate,coordination);
    }

    @RequestMapping(value="/ranking/career/{career}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public List<UserExercise> rankingByCareer(@PathVariable("year") int year, @PathVariable("month") int month, @PathVariable("career") String career){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysOfTheMonth(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        return userExerciseRepository.rankingCareer(startDate,endDate,career);
    }

    //Realiza el proceso completo del sumado, separando los ejercicios por el grado de dificultad.
    public Map<String, int[]> countBy(List<UserExercise> completeList, int year, int month, int lastDay, boolean isExercise){

        List<UserExercise> easy = new ArrayList<>();
        List<UserExercise> medium = new ArrayList<>();
        List<UserExercise> hard = new ArrayList<>();

        for(int i = 0; i < completeList.size(); i++){
            if(completeList.get(i).getExercise().getExerciseDifficulty() == 1) {
                easy.add(completeList.get(i));
            }else if(completeList.get(i).getExercise().getExerciseDifficulty() == 2) {
                medium.add(completeList.get(i));
            }else if(completeList.get(i).getExercise().getExerciseDifficulty() == 3){
                hard.add(completeList.get(i));
            }
        }

        //Para la lista Fácil:
        int[] easyCounter = counterList(easy,lastDay,year,month,isExercise);

        //Para la lista Medio:
        int[] mediumCounter = counterList(medium,lastDay,year,month,isExercise);

        //Para la lista Díficil:
        int[] hardCounter = counterList(hard,lastDay,year,month,isExercise);

        Map<String,int[]> exercisesPerDay= new HashMap<>();
        exercisesPerDay.put("Facil",easyCounter);
        exercisesPerDay.put("Intermedio",mediumCounter);
        exercisesPerDay.put("Dificil",hardCounter);

        return exercisesPerDay;
    }

    //Obtiene la fecha en la que se resueve el ejercicio y suma una unidad en la posición de la fecha en el arreglo.
    public int[] counterList(List<UserExercise> lista, int lastDay, int year, int month, boolean isExercise){
        int[] counter = new int[lastDay];

        for(UserExercise data : lista){
            Date solvedDate = new Date(data.getUserDateResolution().getTime());
            for(int i = 1; i <= lastDay; i++){
                Date comparingStartDate = new GregorianCalendar(year,month-1,i).getTime();
                Date comparingEndDate = new GregorianCalendar(year,month-1,i,23,59,59).getTime();
                if(solvedDate.after(comparingStartDate) && solvedDate.before(comparingEndDate)){
                    if(isExercise){
                        counter[i-1]++;
                    }else{
                        counter[i-1] = counter[i-1] + data.getUserSolvingTime();
                    }
                    i = lastDay +1;
                }
            }
        }

        return counter;
    }

    //Calcula la cantidad de días que tiene un mes y del año.
    public int daysOfTheMonth(int month, int year){
        if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            return 31;
        else if(month == 4 || month == 6 || month == 9 || month == 11)
            return 30;
        else if(month == 2){
            if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                return 29;
            else
                return 28;
        }else
            return 0;
    }

    //Convierte de un String a Timestamp
    public Timestamp timestampConverter(String date){
        try{
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS");
            Date parsedDate = dateFormat.parse(date);
            Timestamp timestamp = new Timestamp(parsedDate.getTime());
            return timestamp;
        } catch(Exception e) {
        }
        return null;
    }


}