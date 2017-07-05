import { Template } from 'meteor/templating';
import '../../imports/templates/main_home.html';


//var myLogoutFunc = function(){
//    FlowRouter.go('/main')
//}
<<<<<<< HEAD
<<<<<<< HEAD

Template.main_principal.helpers({
  firstName: function() {
    return Meteor.user().profile.firstName;
=======
Meteor.subscribe('usuario')

=======
//Meteor.subscribe('usuario')
>>>>>>> marianela
/*Template.main_principal.helpers({

    username: function() {
        var u = Meteor.user().profile.Username;
        //var user = Meteor.users.findOne()
        //console.log(u)
        return
        //return Meteor.user().profile.first_name;
    }
});*/
Template.user.helpers({
<<<<<<< HEAD
  firstName: function() {
    return Meteor.user().profile.Username;
>>>>>>> marianela
  }
=======
    firstName: function() {
        var usernormal = Meteor.user().profile.Username;
        if (usernormal == undefined) {
            usernormal = Meteor.user().profile.name;
        }
        return usernormal
    }
>>>>>>> marianela
});

Template.main_principal.events({
    'click .logout': function(event) {
        event.preventDefault();
        console.log("entro")
        Meteor.logout();
    }
});


Template['override-atPwdFormBtn'].replaces('atPwdFormBtn');
Template['override-atTitle'].replaces('atTitle');
Template['override-atTextInput'].replaces('atTextInput');
Template['override-atSignupLink'].replaces('atSignupLink');
Template['override-atSocial'].replaces('atSocial');
Template['override-atSep'].replaces('atSep');
Template['override-atSigninLink'].replaces('atSigninLink');


AccountsTemplates.configure({
    confirmPassword: true,
    //privacyUrl: 'privacy',
    // termsUrl: 'terms-of-use',
    //   onLogoutHook:myLogoutFunc,
});

<<<<<<< HEAD
=======


<<<<<<< HEAD
>>>>>>> marianela
AccountsTemplates.addFields([
    {
    _id:'Carrera',
    type:'text',
    displayName:'Carrera',
    required: true,
    },{
<<<<<<< HEAD
=======
    _id:'Username',
    type:'text',
    displayName:'username',
    required: true,
    },{
>>>>>>> marianela
    _id:'Apellidos',
    type:'text',
    displayName:'apellidos',
    required: true,
=======
AccountsTemplates.addFields([{
        _id: 'ApellidoP',
        type: 'text',
        displayName: 'Apellido Paterno',
        required: true,
    }, {
        _id: 'ApellidoM',
        type: 'text',
        displayName: 'Apellido Materno',
        required: true,
    },
    {
        _id: 'Nombres',
        type: 'text',
        displayName: 'Nombres',
        required: true,
    }, {
        _id: 'Username',
        type: 'text',
        displayName: 'username',
        required: true,
    },
    {
        _id: 'Carrera',
        type: 'text',
        displayName: 'Carrera',
        required: true,
>>>>>>> marianela
    },
    {
        _id: 'Celular',
        type: 'text',
        displayName: 'Celular',
        required: true,
    },
    {
        _id: 'Direccion',
        type: 'text',
        displayName: 'Direccion',
        required: true,
    },
    /*{
        _id:'profession',
        type:'select',
        display:'Profession',
        class:'form-control',
        select:[
            {
                text:'Administrador',
                value:'admin',
            },
            {
                text:'Facilitador',
                value:'facilitador',
            },
            {
                text:'Estudiante',
                value:'estudiante',
            },
        ]
<<<<<<< HEAD
    }
<<<<<<< HEAD
]);
=======
=======
    }*/
>>>>>>> marianela
]);

/*Accounts.ui.config({
    passwordSignupFields:'USERNAME_AND_EMAIL'
})*/
>>>>>>> marianela
