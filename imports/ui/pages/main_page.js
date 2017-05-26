import "./main_page.html";
import {Usuarios} from '../../api/collections/collections.js';
import {regUsuario} from '../../api/collections/methods.js';

Template.mainPage.onCreated(function(){
    this.subscribe("usuario");
})

Template.mainPage.events({
    'submit #form_login': function(event,template){
        event.preventDefault();
        var email = template.find("#loginEmail").value;
        var password = template.find("#loginPassword").value;
        Meteor.loginWithPassword(email, password, function(error){
            if (Meteor.userId()) {
                var usuario = Usuarios.find({userid: Meteor.userId()}).fetch();
                switch(usuario[0].subsistema){
                    case "Administrador": {
                        $('#modalLogin').modal('close');
                        FlowRouter.go("administrador");
                        break;
                    }
                    case "Facilitador": {
                        $('#modalLogin').modal('close');
                        FlowRouter.go("facilitador");
                        break;
                    }
                    case "Estudiante": {
                        $('#modalLogin').modal('close');
                        FlowRouter.go("estudiante");
                        break;
                    }
                }
                
            } else{
                console.log("Error: " + error.reason)
            }
        })
    },
    'click #registrate_aqui': function(event, template){
        event.preventDefault();
        $('#modalLogin').modal('close');
        $('#modalRegistro').modal('open');
    },
    'click #btnRegEstudiante': function(event, template){
        event.preventDefault();
        $('#modalRegistro').modal('close');
        $('#modalRegEstudiante').modal('open');
    },
    'submit #form_reg_est': function(event,template){
        event.preventDefault();
        var email = template.find("#reg_estEmail").value;
        var password = template.find("#reg_estPassword").value;

        Accounts.createUser({
            email: email,
            password: password,
        },function(error){
            if (!error) {
                regUsuario.call({
                    nombre: template.find("#reg_estNombre").value,
                    apellidos: template.find("#reg_estApellido").value,
                    email:email,
                    userid: Meteor.userId(),
                    subsistema: "Estudiante",
                    nick: template.find("#reg_estNick").value
                });
                $('#modalRegEstudiante').modal('close');
                FlowRouter.go("estudiante");
            }else{
                console.log("Error: " + error.reason);
            }
        })
    },
    
})

