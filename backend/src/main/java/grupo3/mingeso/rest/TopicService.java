/*package grupo3.mingeso.rest;

import grupo3.mingeso.entities.Topic;
import grupo3.mingeso.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("/topic")
public class TopicService {
    @Autowired
    TopicRepository topicRepository;

    //Get all
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Iterable<Topic> getAllTopics(){return topicRepository.findAll();}

    //Get one
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Topic findOne(@PathVariable("id") Integer id){
        return topicRepository.findById(id).get();
    }

    //Create one
    @RequestMapping(method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.CREATED)
    @ResponseBody
    public Topic create(@RequestBody Topic resource){
        return topicRepository.save(resource);
    }
}*/
