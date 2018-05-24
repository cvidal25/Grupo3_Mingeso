package grupo3.mingeso.entities;
import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import java.sql.Timestamp;
import java.util.*;

@Entity
@Table(name = "excercise")
@NamedQuery(name = "Exercise.findAll", query = "SELECT e FROM Exercise e")
public class Exercise implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "exercise_id", unique = true, nullable = false)
    private Integer exerciseID;

    @Column(name = "title", nullable = false, length = 30)
    private String exerciseTitle;

    @Column(name = "body", nullable = false, length = 16384)
    private String exerciseBody;

    @Column(name = "language", nullable = false)
    private Integer exerciseLenguge;

    @Column(name = "initial_date")
    private Date exerciseIntialDate;

    @Column(name = "input", length = 2048)
    private String exerciseInput;

    @Column(name = "output", nullable = false, length = 2048)
    private String exerciseOutput;

    @Column(name = "finish_date")
    private Date exerciseFinishlDate;

    @Column(name = "total_score", nullable = false)
    private Integer exerciseScore;

    @Column(name = "published", nullable = false)
    private boolean exercisePublished;

    public void Exercise(){
    }


    public String getExerciseInput() { return exerciseInput; }

    public void setExerciseInput(String exerciseInput) { this.exerciseInput = exerciseInput; }

    public String getExerciseOutput() { return exerciseOutput; }

    public void setExerciseOutput(String exerciseOutput) { this.exerciseOutput = exerciseOutput; }

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

    public boolean isExercisePublished() { return exercisePublished; }

    public void setExercisePublished(boolean exercisePublished) { this.exercisePublished = exercisePublished; }

    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.FALSE)
    @JsonIgnore
    private Set<UserExercise> userExercise = new HashSet<>();

    public Set<UserExercise> getUserExercise() {
        return userExercise;
    }

    public void setBookPublishers(Set<UserExercise> userExercise) {
        this.userExercise = userExercise;
    }

}