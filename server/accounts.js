import { Index, MinimongoEngine } from 'meteor/easy:search'
import { Meteor } from 'meteor/meteor';
import '../imports/database/models.js';
import {ars} from '../imports/database/models.js';

var postSignUp = function(userId,info){
    //Roles.addUsersToRoles(userId, ['corredor','pateador','golpeador'], 'real-madrid.com')
    Roles.addUsersToRoles(userId,'admin') // Facilitador admin estudiante
}

AccountsTemplates.configure({
    postSignUpHook:postSignUp,
   //forbidClientAccountCreation: true,
});

Meteor.methods({
    crearUsuario : function(email,password,profile,arrayRoles){
    
        var id;

        id = Accounts.createUser({
            email: email,
            password: password,
            profile: profile,
        });

      //  console.log(id)

        if (arrayRoles.length > 0) {
            // Need _id of existing user record so this call must come
            // after `Accounts.createUser` or `Accounts.onCreate`
            Roles.addUsersToRoles(id, arrayRoles);
        }

       // console.log("creado correctamente")
    },

    existeUsuario : function(id){
        //return !!Meteor.users.findOne({_id: id});// return true or false
         return Meteor.users.findOne({_id: id});
    },
    editarUsuario : function(appId,profile){
        Meteor.users.update(appId, {$set: {profile: profile}});
        //console.log("editado")
    },
    checkPassword: function(digest) { 
        //check(digest, String);

        if (this.userId) {
        var user = Meteor.user();
        var password = {digest: digest, algorithm: 'sha-256'};
        var result = Accounts._checkPassword(user, password);
        return result.error == null;
        } else {
        return false;
        }
    },
    changePAssword:function(userId,newPassword){
        Accounts.setPassword(userId, newPassword)
       // console.log("esc")
    },
    createRole:function(rol,des){
        Meteor.roles.insert({
            name:rol,
            description:des,
        })
        console.log("creado")
    },
    EditarUsuarioPs : function(appId,email,password,profile,arrayRoles){
        Meteor.users.update(appId, {$set: {profile: profile,email:email,roles:arrayRoles}});
        Accounts.setPassword(appId, password)
        //console.log("exito 2") 
    },
    EditarUsuario : function(appId,email,profile,arrayRoles){
    
        Meteor.users.update(appId, {$set: {profile: profile,email:email,roles:arrayRoles}});
        //console.log("exito 1")
    },
})


/*Meteor.publish('usuario',function(){
    var user = Meteor.users.findOne(this.userId)
    return user
})*/

Meteor.publish('roles',function(){
    var roles = Meteor.roles.find();
    return roles;
})