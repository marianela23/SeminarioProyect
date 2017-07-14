import { Meteor } from 'meteor/meteor';
import '../imports/database/models.js';
import {preg} from '../imports/database/models.js';
import {resp} from '../imports/database/models.js';

Meteor.methods({

})

Meteor.publish('preguntas', function() {
  return preg.find();
});

Meteor.publish('respuestas', function() {
  return resp.find();
});
