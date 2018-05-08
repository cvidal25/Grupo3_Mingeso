package grupo3.mingeso.entities;
import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "excercise")
@NamedQuery(name = "Exercise.findAll", query = "SELECT a FROM Exercise a")
public class Exercise implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "exercise_id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer exerciseID;


    @Column(name = "title", nullable = false, length = 30)
    private String exerciseTitle;

    @Column(name = "body", nullable = false, length = 2048)
    private String exerciseBody;

    @Column(name = "language", nullable = false)
    private Integer exerciseLenguge;

    @Column(name = "initial_date", nullable = false)
    private Date exerciseIntialDate;

    @Column(name = "finish_date", nullable = false)
    private Date exerciseFinishlDate;

    @Column(name = "total_score", nullable = false)
    private Integer exerciseScore;

    public void Exercise(){
    }


    public Integer getExerciseID() {
        return exerciseID;
    }

    public void setExerciseID(Integer exerciseID) {
        this.exerciseID = exerciseID;
    }

    public String getExerciseTitle() {
        return exerciseTitle;
    }

    public void setExerciseTitle(String exerciseTitle) {
        this.exerciseTitle = exerciseTitle;
    }

    public String getExerciseBody() {
        return exerciseBody;
    }

    public void setExerciseBody(String exerciseBody) {
        this.exerciseBody = exerciseBody;
    }

    public Integer getExerciseLenguge() {
        return exerciseLenguge;
    }

    public void setExerciseLenguge(Integer exerciseLenguge) {
        this.exerciseLenguge = exerciseLenguge;
    }

    public Date getExerciseIntialDate() {
        return exerciseIntialDate;
    }

    public void setExerciseIntialDate(Date exerciseIntialDate) {
        this.exerciseIntialDate = exerciseIntialDate;
    }

    public Date getExerciseFinishlDate() {
        return exerciseFinishlDate;
    }

    public void setExerciseFinishlDate(Date exerciseFinishlDate) {
        this.exerciseFinishlDate = exerciseFinishlDate;
    }

    public Integer getExerciseScore() {
        return exerciseScore;
    }

    public void setExerciseScore(Integer exerciseScore) {
        this.exerciseScore = exerciseScore;
    }


}