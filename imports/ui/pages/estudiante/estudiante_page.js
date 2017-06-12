import "./estudiante_page.html";
import {Usuarios} from '../../../api/collections/collections.js';
import '../../components/estudiante/est_cursos.js';
import '../../components/estudiante/est_mi_curso.js';
import '../../components/estudiante/est_curso_act.js';

Template.estudiantePage.onCreated(function(){
    this.subscribe("usuario");
    this.currentTab = new ReactiveVar("estCursos");
})

Template.estudiantePage.helpers({
    tab: function(){
        return Template.instance().currentTab.get();
    },
    usuariosActual: function(){
        return Usuarios.findOne({userid:Meteor.userId()});
    }  
});

Template.estudiantePage.events({
    'click #active_template': function(event, template){
        var currentTab = $(event.target).closest("li");
        currentTab.addClass("active");
        $("#active_template").not(currentTab).removeClass("active");
        template.currentTab.set(currentTab.data("template"));
    },
    'click #active_template_a': function(event, template){
        var currentTab = $(event.target).closest("a");
        currentTab.addClass("active");
        $("#active_template").not(currentTab).removeClass("active");
        template.currentTab.set(currentTab.data("template"));
    },
    'click #logoutEst': function(event, template){
        event.preventDefault();
        Meteor.logout();
    }

})
