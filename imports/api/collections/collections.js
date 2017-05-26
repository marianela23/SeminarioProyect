import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Usuarios = new Mongo.Collection("Usuarios");
export const Cursos = new Mongo.Collection("Cursos");
