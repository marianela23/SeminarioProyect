import './est_cursos.html';
import {Cursos} from '../../../api/collections/collections.js';


Template.estCursos.onCreated(function(){
    this.subscribe("cursos");
}) 

Template.estCursos.helpers({
    listCursos: function(){
        return Cursos.find();
    }  
});

Template.itemCurso.events({
    'click .dataclass': function(event, template){
        
        console.log(template.data)
    }
})
