var postSignUp = function(userId,info){
<<<<<<< HEAD
    console.log(userId)
    console.log(info.profile.profession)
=======
>>>>>>> marianela
    //Roles.addUsersToRoles(userId, ['corredor','pateador','golpeador'], 'real-madrid.com')
    Roles.addUsersToRoles(userId,['normal-user',info.profile.profession])
}

AccountsTemplates.configure({
    postSignUpHook:postSignUp,
   //forbidClientAccountCreation: true,
});
<<<<<<< HEAD
=======

Meteor.publish('usuario',function(){
    var user = Meteor.users.findOne(this.userId)
    return user
})
>>>>>>> marianela
