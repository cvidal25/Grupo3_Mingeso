package grupo3.mingeso.rest;

import grupo3.mingeso.entities.User;
import grupo3.mingeso.entities.UserExercise;
import grupo3.mingeso.repository.UserExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.DateTimeException;
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

    //Cantidad de ejercicios resueltos diariamente por Alumno (Correo)
    @RequestMapping(value = "/student/{email}/{year}-{month}",method = RequestMethod.GET)
    @ResponseBody
    public Map<Integer,int[]> countByUserStudent(@PathVariable("email") String email,@PathVariable("year") int year, @PathVariable("month") int month){
        String start = "" + year + "-" + month + "-01 00:00:00.000";
        int lastDay = daysCounter(month,year);
        String end = "" + year + "-" + month + "-" + lastDay + " 23:59:59.999";

        Timestamp startDate = timestampConverter(start);
        Timestamp endDate = timestampConverter(end);

        List<UserExercise> completeList = userExerciseRepository.findAllByUserUserMailAndUserDateResolutionBetweenOrderByUserDateResolution(email,startDate,endDate);

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
        int[] easyCounter = counterList(easy,lastDay,year,month);

        //Para la lista Medio:
        int[] mediumCounter = counterList(medium,lastDay,year,month);

        //Para la lista Díficil:
        int[] hardCounter = counterList(hard,lastDay,year,month);

        Map<Integer,int[]> exercisesPerDay= new HashMap<>();
        exercisesPerDay.put(1,easyCounter);
        exercisesPerDay.put(2,mediumCounter);
        exercisesPerDay.put(3,hardCounter);

        return exercisesPerDay;
    }

    public int[] counterList(List<UserExercise> lista, int lastDay, int year, int month){
        int[] counter = new int[lastDay];

        for(UserExercise data : lista){
            Date solvedDate = new Date(data.getUserDateResolution().getTime());
            for(int i = 1; i <= lastDay; i++){
                Date comparingStartDate = new GregorianCalendar(year,month-1,i).getTime();
                Date comparingEndDate = new GregorianCalendar(year,month-1,i,23,59,59).getTime();
                if(solvedDate.after(comparingStartDate) && solvedDate.before(comparingEndDate)){
                    counter[i-1]++;
                    i = lastDay +1;
                }
            }
        }

        return counter;
    }

    public int daysCounter(int month, int year){
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

    /*//Cantidad de ejercicios resueltos diariamente por Carrera (Nombre)
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public int countByCareer(){

    }

    //Cantidad de ejercicios resueltos diariamente por Coordinación
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public int countByCoordination(){

    }*/

    //número de problemas resueltos por alumno y dia
    /*@GetMapping(value = "/userTasks", params = {"email", "date"})
    @ResponseBody
    public int countAllByEmailAndDate(@RequestParam("email") String email,
                                      @RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return userTaskRepository.countAllByUserEmailAndDate(email, date);


    } */

    /*private Map<Date, Integer> getSumInvestedTimeByUser(String email, Date from, Date to) {

        List<UserTask> metrics = userTaskRepository.findByUserEmailAndDateBetweenOrderByIdDesc(email, from, to);

        Map<Date, Integer> statistic = new HashMap<>();

        int aux = 0;

        for (UserTask data : metrics) {

            if (statistic.containsKey(data.getDate())) {

                aux += statistic.get(data.getDate());

                statistic.put(data.getDate(), data.getInvestedTime() + aux);

            } else

                statistic.put(data.getDate(), data.getInvestedTime());

        }

        return statistic;

    }
    * */