import { Meteor } from 'meteor/meteor';
import {Usuarios} from '../imports/api/collections/collections.js';
import {Cursos} from '../imports/api/collections/collections.js';
import pubs from '../imports/api/collections/server/publications.js';
import {regUsuario} from '../imports/api/collections/methods.js';

pubs();
/*
PORQUE  NO DA
*/
/*Meteor.startup(() => {
  // code to run on server at startup
});
*/
