import { Mongo } from 'meteor/mongo';
export const crs = new Mongo.Collection('cursos');
export const ars = new Mongo.Collection('archivos');
export const msg = new Mongo.Collection('messages')