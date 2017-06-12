import { Meteor } from 'meteor/meteor';
import {Usuarios} from '../collections.js';
import {Cursos} from '../collections.js';

export default function(){
    Meteor.publish("usuario", function(){
        return Usuarios.find({});
    }),
    Meteor.publish("cursos", function(){
        return Cursos.find({});
    })
}
