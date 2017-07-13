//login and logout
if(Meteor.isClient){
  Accounts.onLogin(function(){
    FlowRouter.go('home');
  })

  Accounts.onLogout(function(){
    FlowRouter.go('login');
  })
}
//check session//
FlowRouter.triggers.enter([function(context,redirect){
  if(!Meteor.userId()){
    FlowRouter.go('login')
  }
}])


FlowRouter.route('/', {
    name:'login',
    action: function(params, queryParams) {
        BlazeLayout.render('mainLogin');
    }
});

FlowRouter.route('/home',{
  name: 'home',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'main_home'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/crear_clases',{
  name: 'crearCursos',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'crearCursos'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/crear_cursos',{
  name: 'crearCursosMaster',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'crearCursosMaster'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/crear_usuarios',{
  name: 'crearusuarios',
  action:function(){
        BlazeLayout.render('main_principal',{main:'CrearUsuarios'})
 
  }
});


FlowRouter.route('/cursos',{
  name: 'cursos',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'cursosDBMaster'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/full-cursos',{
  name: 'Fullcursos',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'FullCursosFull'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/ver-curso/:sigla',{
  name: 'ver_curso',
  action:function(params){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'ver_cursoMaster'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/ver-material/:identi',{
  name: 'ver_material',
  action:function(params){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'ver_curso_clase_archivos'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/chat-cursos',{
  name: 'chat',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'chat'})
      }else{
        FlowRouter.go('login')
      }
  }
});

FlowRouter.route('/full-usuarios',{
  name: 'fullUsuarios',
  action:function(){
    if(Meteor.userId()){
        BlazeLayout.render('main_principal',{main:'full_usuarios'})
      }else{
        FlowRouter.go('login')
      }
  }
});