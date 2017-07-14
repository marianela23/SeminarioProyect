import { Template } from 'meteor/templating';
import { Index, MinimongoEngine } from 'meteor/easy:search'
import '../templates/crearusuario.html';
import {ars} from '../database/models.js';

Meteor.subscribe('roles')
Template.CrearUsuarios.helpers({
    roles: () => {
        var r = Meteor.roles.find().fetch()
        return r
    }
})
Template.CrearUsuarios.events({
    
    'submit form': function(event,template) {
        event.preventDefault();

        const target = event.target;

        const carrera = target.carrera.value;
        const username = target.username.value;
        const apellidoP = target.apellidoP.value;
        const apellidoM = target.apellidoM.value;
        const nombres = target.nombres.value;
        const cel = target.cel.value;
        const direccion = target.direccion.value;

        const password = target.password.value;
        const email = target.email.value;

        const roles = template.findAll( "input[type=checkbox]:checked");
        const estado = 'activo';

        var arrayRoles = _.map(roles, function(item) {
            return item.defaultValue;
        });

        var profile = {
            Carrera :carrera,
            Username:username,
            ApellidoP:apellidoP,
            ApellidoM:apellidoM,
            Nombres:nombres,
            Celular:cel,
            Direccion:direccion,
            estado:estado
        }
         
        Meteor.call('crearUsuario', email,password,profile,arrayRoles)
        swal(
            'Exito!',
            'Usuario creado correctamente!',
            'success'
        )
        template.find("form").reset();
        event.preventDefault();
        return false;
    }
});



Template['Override-EasySearch.Pagination'].replaces('EasySearch.Pagination');

Template.full_usuarios.helpers({
    playesrsIndex: () => PlayersIndex,
    usuarios:()=>{
        console.log(Meteor.users.find({}).fetch()) 
    },
    //////////////
    inputAttributes: function(){
        //console.log('atributes')
        return {'class':'form-control','placeholder':'Buscar usuario'}  
    },
    /*players: function(){
        console.log('players')
        console.log(Meteor.users.find({},{sort:{createdAt:-1}}))
        return Meteor.users.find({},{sort:{createdAt:-1}})
    },
    selectdName:function(){
        var joke = UserIndex.config.mongoCollection.findOne({__originalId:Session.get("selectedUsuario")})
        console.log('joke')
        console.log(joke)
        return joke && joke.emails;
    },*/
    index:function(){
        // console.log('index')
        return UserIndex;
    },
    resultsCount:function(){
       // console.log('resultscount')
       // console.log(UserIndex.getComponentDict().get('count') ) 
        return UserIndex.getComponentDict().get('count');
    },
    /*showMore:function(){
        console.log('showmore')
       return false;
    },*/
    renderTmpl:()=>template.renderTemplate
});

Template.User.helpers({
    selected:function(){
       // console.log(Session.equals("selectedUsuario",this.__originalId)? "selected":'')
        return Session.equals("selectedUsuario",this.__originalId)? "selected":'';
    }
})

Template.User.events({
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

Template.perfil_usuario.onCreated(function () {
        var appId = Meteor.userId();
        Meteor.call("existeUsuario",appId, function(err, res) {
                if (err) {
                    console.log('Error: ' + err);
                }
                if (!err) {
                    Session.set('infouser', res);
                }
        });
});

Template.editar_perfil.onCreated(function () {
        var appId = Meteor.userId();
        Meteor.call("existeUsuario",appId, function(err, res) {
                if (err) {
                    console.log('Error: ' + err);
                }
                if (!err) {
                    Session.set('editarperfil', res);
                }
        });
});

Template.perfil_usuario.helpers({
    usuario: function() {
        return Session.get('infouser')
    }
})

Template.perfil_usuario.events({
    'submit #editPassword': function(event,template) {
        event.preventDefault();
        var appId = Meteor.userId();
        const target = event.target;
        
        const passA = target.passant.value;
        const passN = target.passnew.value;
        const passnC = target.passnewconf.value;

        var digest = Package.sha.SHA256(passA);
        Meteor.call('checkPassword', digest, function(err, result) {
        if (result) {
            if(passN == passnC){
                  Meteor.call('changePAssword',appId,passN,function(err,result){
                    if(!err){
                        swal(
                            'Exito!',
                            'Contraseña cambiada correctamente!',
                            'success'
                        )
                    }else{
                        console.log("pup there is an error caused by " + err.reason)
                    }
                })
            }else{
                swal(
                    'Error!',
                    'Su nueva contraseña no coincide!',
                    'error'
                )
            }
        }
        else{
             swal(
                    'Error!',
                    'Su contraseña actual no coincide!',
                    'error'
                )
        }
        });
        console.log(passA)
        //Meteor.call('editarUsuario',appId,profile)

        //template.find("form").reset();
        event.preventDefault();
        return false;
    }
})


Template.editar_perfil.helpers({
    edituser: function() {
        return Session.get('editarperfil')
    }
})

Template.editar_perfil.events({
        'submit form': function(event,template) {
        event.preventDefault();
        var appId = Meteor.userId();
        const target = event.target;

        const carrera = target.carrera.value;
        
        const apellidoP = target.apellidoP.value;
        const apellidoM = target.apellidoM.value;
        const nombres = target.nombres.value;
        const cel = target.cel.value;
        const direccion = target.direccion.value;

        
        const email = target.email.value;

        //const roles = template.findAll( "input[type=checkbox]:checked");
        const estado = 'activo';

        //var arrayRoles = _.map(roles, function(item) {
        //    return item.defaultValue;
        //});

        var profile = {
            Carrera :carrera,
            ApellidoP:apellidoP,
            ApellidoM:apellidoM,
            Nombres:nombres,
            Celular:cel,
            Direccion:direccion,
            estado:estado
        }

        Meteor.call('editarUsuario',appId,profile)
        swal(
            'Exito!',
            'Usuario editado correctamente!',
            'success'
        )
        //template.find("form").reset();
        event.preventDefault();
        return false;
    }
})

Template.editar_usuario.onCreated(function () {
    var appId = FlowRouter.getParam("_id");
   // console.log(appId)
    Meteor.call("existeUsuario",appId, function(err, res) {
            if (err) {
                console.log('Error: ' + err);
            }
            if (!err) {
          //      console.log(res)
                Session.set('edituser', res);
            }
    });
});

Template.editar_usuario.helpers({
        userEdit: () => {
            return Session.get('edituser');
        },
        rolesUser: () => {
            var r = Meteor.roles.find().fetch()
            return r
        },
        isChecked: function (type) {
            var userchek = Session.get('edituser');
            var rol = userchek.roles

            if(jQuery.inArray(type, rol) !== -1){
                return 'checked'
            }else{
                return null
            }
        }
})

Template.editar_usuario.events({
    
    'submit form': function(event,template) {
        var appId = FlowRouter.getParam("_id");
        event.preventDefault();

        const target = event.target;

        const carrera = target.carrera.value;
        const username = target.username.value;
        const apellidoP = target.apellidoP.value;
        const apellidoM = target.apellidoM.value;
        const nombres = target.nombres.value;
        const cel = target.cel.value;
        const direccion = target.direccion.value;

        const password = target.password.value;
        const email = target.email.value;

        const roles = template.findAll( "input[type=checkbox]:checked");
        const estado = 'activo';

        var arrayRoles = _.map(roles, function(item) {
            return item.defaultValue;
        });

        var profile = {
            Carrera :carrera,
            Username:username,
            ApellidoP:apellidoP,
            ApellidoM:apellidoM,
            Nombres:nombres,
            Celular:cel,
            Direccion:direccion,
            estado:estado
        }
        //console.log(password)
        if(password === ''){
            Meteor.call('EditarUsuario',appId ,email,profile,arrayRoles)
            //console.log("1")
            swal(
                'Exito!',
                'Usuario Editado correctamente!',
                'success'
            )
        }else{
           Meteor.call('EditarUsuarioPs',appId ,email,password,profile,arrayRoles)
            //console.log("2")
            swal(
                'Exito!',
                'Usuario Editado correctamente!',
                'success'
            )
        }
        //template.find("form").reset();
        event.preventDefault();
        return false;
    }
});