import { Template } from 'meteor/templating';
import '../../imports/templates/preguntas.html';
import { preg } from '../database/models.js';
import { resp } from '../database/models.js';

import { preg_curso } from '../database/models.js';
import { resp_curso } from '../database/models.js';

import { notificaciones } from '../database/models.js';

if (Meteor.isClient) {

    Meteor.subscribe('preguntas')
    Meteor.subscribe('respuestas')

     Meteor.subscribe('preguntas_curso')
     Meteor.subscribe('respuestas_curso') 
     Meteor.subscribe('notificaciones',20) 

Template.preguntas_curso.helpers({
    playesrsIndexPregCurso: () => playesrsIndexPregCurso,
    
    Curso:(idCurso)=>{
        var appId = FlowRouter.getParam("_id");
        if(appId === idCurso){
            console.log("entro")
            return true
        }
    },

    preguntas_curso:()=>{
        var appId = FlowRouter.getParam("_id");
        console.log(preg_curso.find({idCurso:appId}).fetch()) 
        return preg_curso.find({idCurso:appId}).fetch()
    },
    //////////////
    inputAttributes: function(){
        //console.log('atributes')
        return {'class':'form-control','placeholder':'Buscar Pregunta'}  
    },
    players: function(){
        console.log('players')
        console.log(preg_curso.find({},{sort:{createdAt:-1}}))
        return preg_curso.find({},{sort:{createdAt:-1}})
    },
    /*selectdName:function(){
        var joke = PreguntasIndex.config.mongoCollection.findOne({__originalId:Session.get("selectedUsuario")})
        console.log('joke')
        console.log(joke)
        return joke && joke.emails;
    },*/
    index:function(){
        // console.log('index')
        return PreguntasIndexCurso;
    },
    resultsCount:function(){
       // console.log('resultscount')
       // console.log(PreguntasIndexCurso.getComponentDict().get('count') ) 
        return PreguntasIndexCurso.getComponentDict().get('count');
    },
    /*showMore:function(){
        console.log('showmore')
       return false;
    },*/
    renderTmpl:()=>template.renderTemplate
});


Template.preguntas_curso.events({
  'submit #crearPregunta'(event) {
    event.preventDefault();
    var appId = FlowRouter.getParam("_id")    
    // Get value from form element
    const target = event.target;
    const pregunta = target.createpregunta.value;
    
    var usernormal = Meteor.user().profile.Username;
    if (usernormal == undefined) {
        usernormal = Meteor.user().profile.name;
    }

    IDuser = Meteor.userId();
    console.log(usernormal)
    // Insert a task into the collection
    preg_curso.insert({
       idCurso : appId,
       pregunta:pregunta,
       username:usernormal,
       iduser: IDuser,
       puntos_mas : 0,
       puntos_menos: 0,
       usercalficadosmas:[],
       usercalficadosmenos:[],
       createdAt: new Date(), // current time
    });
 

    // Clear form
    target.createpregunta.value = '';
    console.log("registro correcto")
    event.preventDefault();
    return false;
  },
});

Template.preg_curso.events({
    'click .mas1'(event){
        
        idmas = $(event.currentTarget).attr('href')

        
        Meteor.call("subirpuntuacionPreguntas",idmas, function(err, res) {
            if (err) {
                console.log('Error: ' + err);
            }
            if (!err) {
                console.log(res)
            }
        })

        var notrespuesta = preg_curso.findOne({
            _id: idmas,
        });

        IDuser = Meteor.userId();

        var usernormal = Meteor.user().profile.Username;
        if (usernormal == undefined) {
            usernormal = Meteor.user().profile.name;
        }
        notificaciones.insert({
            notificacion:notrespuesta.pregunta,
            idPregunta: idmas,
            perteneceIduser:notrespuesta.iduser,
            tipo:'like_MM_pregunta',
            estado:'N',
            usernameResp:usernormal,
            iduserResp:IDuser,
            createdAt: new Date(),
        });

    },
    'click .menos1'(event){
        
        idmenos = $(event.currentTarget).attr('href')

        Meteor.call("rebajarpuntuacionPreguntas",idmenos, function(err, res) {
            if (err) {
                console.log('Error: ' + err);
            }
            if (!err) {
                console.log(res)
            }
        })

        var notrespuesta = preg_curso.findOne({
            _id: idmenos,
        });

        IDuser = Meteor.userId();

        var usernormal = Meteor.user().profile.Username;
        if (usernormal == undefined) {
            usernormal = Meteor.user().profile.name;
        }
        notificaciones.insert({
            notificacion:notrespuesta.pregunta,
            idPregunta: idmenos,
            perteneceIduser:notrespuesta.iduser,
            tipo:'like_M_pregunta',
            estado:'N',
            usernameResp:usernormal,
            iduserResp:IDuser,
            createdAt: new Date(),
        });
    },
});

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
        return {'class':'form-control','placeholder':'Buscar Pregunta'}  
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


Template.preg_curso.helpers({
    selected:function(){
       // console.log(Session.equals("selectedUsuario",this.__originalId)? "selected":'')
        return Session.equals("selectedUsuario",this.__originalId)? "selected":'';
    },
})

    Template.respuestas_pregunta_curso.helpers({
        Verpregunta: () => {
            var appId = FlowRouter.getParam("_id");
            var pregunta = preg_curso.findOne({
                _id: appId,
            });
            return pregunta
        },
        VerRespuestas: () => {
            var appId = FlowRouter.getParam("_id");
            var respuesta = resp_curso.find({
                idPreg: appId,
            }).fetch();
            //console.log(respuesta)
            return respuesta
        }
    })

    Template.respuestas_pregunta_curso.events({
        'submit #repsPregunta'(event) {
            event.preventDefault();
            // Get value from form element
            const target = event.target;
            const resps = target.resp.value;
            const idpreg = target.rca.value;
            var usernormal = Meteor.user().profile.Username;
            if (usernormal == undefined) {
                usernormal = Meteor.user().profile.name;
            }
            IDuser = Meteor.userId();
            console.log(usernormal)
            // Insert a task into the collection
            resp_curso.insert({
                respuesta:resps,
                username:usernormal,
                iduser:IDuser,
                idPreg:idpreg,
                puntos_mas : 0,
                puntos_menos: 0,
                usercalficadosmas:[],
                usercalficadosmenos:[],
                createdAt: new Date(), // current time
            });
            /// crear una notificacion para el usuario que creo la pregunta
            var pregunta = preg_curso.findOne({
                _id: idpreg,
            });
            console.log(pregunta)
            notificaciones.insert({
                notificacion:pregunta.pregunta,
                idPregunta: idpreg,
                perteneceIduser:pregunta.iduser,
                tipo:'respuesta_pregunta',
                estado:'N',
                usernameResp:usernormal,
                iduserResp:IDuser,
                createdAt: new Date(),
            });
            //////
            // Clear form
            target.resp.value = '';
            console.log("registro correcto")
            event.preventDefault();
            return false;
        },

        'click .repMas1'(event){
            var appId = FlowRouter.getParam("_id");
            var usernormal = Meteor.user().profile.Username;
            if (usernormal == undefined) {
                usernormal = Meteor.user().profile.name;
            }
            idmas = $(event.currentTarget).attr('href')

            Meteor.call("subirpuntuacionRespuestas",idmas, function(err, res) {
                if (err) {
                    console.log('Error: ' + err);
                }
                if (!err) {
                    console.log(res)
                }
            })

            var notrespuesta = preg_curso.findOne({
                _id: appId,
            });

            IDuser = Meteor.userId();

            notificaciones.insert({
                notificacion:notrespuesta.pregunta,
                idPregunta: appId,
                perteneceIduser:notrespuesta.iduser,
                tipo:'like_MM_respuesta',
                estado:'N',
                usernameResp:usernormal,
                iduserResp:IDuser,
                createdAt: new Date(),
            });
            return false
        },
        'click .repMenos1'(event){
            var appId = FlowRouter.getParam("_id");
            idmenos = $(event.currentTarget).attr('href')

            Meteor.call("rebajarpuntuacionRespuestas",idmenos, function(err, res) {
                if (err) {
                    console.log('Error: ' + err);
                }
                if (!err) {
                    console.log(res)
                }
            })

            var notrespuesta = preg_curso.findOne({
                _id: appId,
            });

            IDuser = Meteor.userId(); 

            var usernormal = Meteor.user().profile.Username;
            if (usernormal == undefined) {
                usernormal = Meteor.user().profile.name;
            }
            notificaciones.insert({
                notificacion:notrespuesta.pregunta,
                idPregunta: appId,
                perteneceIduser:notrespuesta.iduser,
                tipo:'like_M_respuesta',
                estado:'N',
                usernameResp:usernormal,
                iduserResp:IDuser,
                createdAt: new Date(),
            });
            return false
        },
    });

////helpers notificaciones////
Template.main_principal.helpers({
    notificaciones:function(){
        IDuser = Meteor.userId();
        return notificaciones.find({estado:'N',perteneceIduser:IDuser},{sort:{createdAt:-1}}).fetch();
    },
    numNoti:function(){
        IDuser = Meteor.userId();
        var n = notificaciones.find({estado:'N',perteneceIduser:IDuser}).fetch()
        //console.log(n)
        //console.log(n.length)
        return n.length;
    },
    verficartipo:function(tipo){
        if(tipo === "respuesta_pregunta"){
            return "respondio a su pregunta"
        }
        if(tipo === "like_MM_respuesta"){
            return "Le gusto tu respuesta"
        }
        if(tipo === "like_M_respuesta"){
            return "NO Le gusto tu respuesta"
        }
        if(tipo === "like_MM_pregunta"){
            return "Le gusto tu pregunta"
        }
        if(tipo === "like_M_pregunta"){
            return "NO Le gusto tu pregunta"
        }
    }
});

Template.main_principal.events({
    'click .btnNotificacion'(event){
        idnot = $(event.currentTarget).attr('rev')
        Meteor.call("notificacion",idnot, function(err, res) {
            if (err) {
                console.log('Error: ' + err);
            }
            if (!err) {
                console.log(res)
            }
        })
    },
});
/////////////////////////////

Template.preg.helpers({
    selected:function(){
       // console.log(Session.equals("selectedUsuario",this.__originalId)? "selected":'')
        return Session.equals("selectedUsuario",this.__originalId)? "selected":'';
    },
})

/*Template.preg.events({
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
})*/
    Template.respuestas_pregunta.helpers({
        Verpregunta: () => {
            var appId = FlowRouter.getParam("_id");
            var pregunta = preg.findOne({
                _id: appId,
            });
            return pregunta
        },
        VerRespuestas: () => {
            var appId = FlowRouter.getParam("_id");
            var respuesta = resp.find({
                idPreg: appId,
            }).fetch();
            console.log(respuesta)
            return respuesta
        }
    })

    Template.respuestas_pregunta.events({
        'submit #repsPregunta'(event) {
            event.preventDefault();
            // Get value from form element
            const target = event.target;
            const resps = target.resp.value;
            const idpreg = target.rca.value;
            var usernormal = Meteor.user().profile.Username;
            if (usernormal == undefined) {
                usernormal = Meteor.user().profile.name;
            }
            console.log(usernormal)
            // Insert a task into the collection
            resp.insert({
                respuesta:resps,
                username:usernormal,
                idPreg:idpreg,
                createdAt: new Date(), // current time
            });
        
            // Clear form
            target.resp.value = '';
            console.log("registro correcto")
            event.preventDefault();
            return false;
        },
    });
}