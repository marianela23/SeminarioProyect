import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Usuarios} from "./collections.js";

export const regUsuario = new ValidatedMethod({
    name: "registro.usuario",
    validate:new SimpleSchema({
        nombre:{type: String},
        apellidos:{type: String},
        email:{type: String},
        userid:{type: String},
        subsistema:{type: String},
        nick:{type: String}
    }).validator(),
    run({
        nombre,
        apellidos,
        email,
        userid,
        subsistema,
        nick
    }){
        return Usuarios.insert({
            nombre:nombre,
        apellidos:apellidos,
        email:email,
        userid:userid,
        subsistema:subsistema,
        nick:nick,
        });
    }
})
