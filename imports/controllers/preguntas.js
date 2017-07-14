import { Template } from 'meteor/templating';
import '../../imports/templates/preguntas.html';
import { preg } from '../database/models.js';
if (Meteor.isClient) { 
Template.preguntas.events({
  'submit #crearPregunta'(event) {
      event.preventDefault();
    // Get value from form element
    const target = event.target;
    const pregunta = target.createpregunta.value;
    
    var usernormal = Meteor.user().profile.Username;
    if (usernormal == undefined) {
        usernormal = Meteor.user().profile.name;
    }
    console.log(usernormal)
    // Insert a task into the collection
    preg.insert({
       pregunta:pregunta,
       username:usernormal,
       createdAt: new Date(), // current time
    });
 
    // Clear form
    target.createpregunta.value = '';
    console.log("registro correcto")
    event.preventDefault();
    return false;
  },
});

Template.preguntas.helpers({
    playesrsIndex: () => PlayersIndex,
    usuarios:()=>{
        console.log(preg.find({}).fetch()) 
    },
    //////////////
    inputAttributes: function(){
        //console.log('atributes')
        return {'class':'form-control','placeholder':'Buscar usuario'}  
    },
    /*players: function(){
        console.log('players')
        console.log(preg.find({},{sort:{createdAt:-1}}))
        return preg.find({},{sort:{createdAt:-1}})
    },
    selectdName:function(){
        var joke = PreguntasIndex.config.mongoCollection.findOne({__originalId:Session.get("selectedUsuario")})
        console.log('joke')
        console.log(joke)
        return joke && joke.emails;
    },*/
    index:function(){
        // console.log('index')
        return PreguntasIndex;
    },
    resultsCount:function(){
       // console.log('resultscount')
       // console.log(PreguntasIndex.getComponentDict().get('count') ) 
        return PreguntasIndex.getComponentDict().get('count');
    },
    /*showMore:function(){
        console.log('showmore')
       return false;
    },*/
    renderTmpl:()=>template.renderTemplate
});

Template.preg.helpers({
    selected:function(){
       // console.log(Session.equals("selectedUsuario",this.__originalId)? "selected":'')
        return Session.equals("selectedUsuario",this.__originalId)? "selected":'';
    }
})

Template.preg.events({
    'click .usuario':function(e){
        id = "#"+$(e.currentTarget).attr("axis");
        if($(id).hasClass("out")) {
            $(id).addClass("in");
            $(id).removeClass("out");
        } else {
            $(id).addClass("out");
            $(id).removeClass("in");
        }
        Session.set("selectedUsuario",this.__originalId);
    },
    'click .editUser' : function(){
        //console.log("entro");
        //var id = toString(this.__originalId)
       // console.log(this.__originalId)
        //console.log(Meteor.users.find({_id:id}).fetch())
       // console.log(Meteor.users.find({_id:'uujn7LDhukt8rEEQP'}).fetch())

        Meteor.call("existeUsuario",this.__originalId, function(err, res) {
        if (err) {
            console.log('Error: ' + err);
        }
        if (!err) {
            Session.set('usuario', res);
        }
        //console.log(Session.get('usuario'))
        FlowRouter.subsReady("chat", function() {
         console.log("entra aqui")
        });

    });
    }
})
}