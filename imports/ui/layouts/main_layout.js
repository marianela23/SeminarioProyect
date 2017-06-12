import "./main_layout.html";


Template.mainLayout.onCreated(function(){
	this.autorun(function(){
		if (!Meteor.userId()) {
			FlowRouter.go("home");
		}
	})
})
