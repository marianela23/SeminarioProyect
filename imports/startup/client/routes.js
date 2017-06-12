import "../../ui/layouts/main_layout.js";
import "../../ui/pages/main_page.js";
import "../../ui/pages/estudiante/estudiante_page.js";
import "../../ui/pages/administrador/administrador_page.js";
import "../../ui/pages/facilitador/facilitador_page.js";


BlazeLayout.setRoot("body");

FlowRouter.route("/",{
	name:"home",
	action(params, queryParams){
		BlazeLayout.render("mainLayout",{
			main: "mainPage"
		});
	}
})
FlowRouter.route("/estudiante",{
    name:"estudiante",
    action(params, queryParams){
        BlazeLayout.render("mainLayout",{
            main: "estudiantePage"
        });
    }
})

FlowRouter.route("/administrador",{
    name:"administrador",
    action(params, queryParams){
        BlazeLayout.render("mainLayout",{
            main: "administradorPage"
        });
    }
})
FlowRouter.route("/facilitador",{
    name:"facilitador",
    action(params, queryParams){
        BlazeLayout.render("mainLayout",{
            main: "facilitadorPage"
        });
    }
})
