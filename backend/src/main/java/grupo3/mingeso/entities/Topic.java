package grupo3.mingeso.entities;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.ArrayList;

@Entity
@Table(name = "topic")
@NamedQuery(name = "Topic.findAll", query = "SELECT t from Topic t")
public class Topic implements Serializable {

    @Id
    @GeneratedValue
    @Column(name = "topic_id",unique = true, nullable = false)
    private Integer topicID;

    @Column(name = "name",nullable = false)
    private String topicName;

    public void Topic(){}

    public Integer getTopicID() { return topicID; }

    public void setTopicID(Integer topicID) { this.topicID = topicID; }

    public String getTopicName() { return topicName; }

    public void setTopicName(String topicName) { this.topicName = topicName; }

    @OneToMany(mappedBy="topic",cascade=CascadeType.ALL)
    private List<Exercise> Exercise = new ArrayList<Exercise>();

    public List<Exercise> getExercises(){
        return this.Exercise;
    }
}
