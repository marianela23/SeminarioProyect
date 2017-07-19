import { Meteor } from 'meteor/meteor';
import '../imports/database/models.js';
import {preg} from '../imports/database/models.js';
import {resp} from '../imports/database/models.js';

import {preg_curso} from '../imports/database/models.js';
import {resp_curso} from '../imports/database/models.js';
import {notificaciones} from '../imports/database/models.js';

Meteor.methods({
    subirpuntuacionPreguntas:function(id){
      var pcm = preg_curso.findOne({_id:id});
      puntosmas = pcm.puntos_mas + 1;
      user = Meteor.userId();
      preg_curso.update(id, { 
        $set: { puntos_mas: puntosmas},
        $push: { usercalifadosmas: user }
      });
      return 'ok'
    },
    rebajarpuntuacionPreguntas:function(id){
      var pcn = preg_curso.findOne({_id:id});
      puntosmenos = pcn.puntos_menos + 1;
      user = Meteor.userId();
      preg_curso.update(id, {
        $set: { puntos_menos: puntosmenos},
        $push: { usercalifadosmenos: user }
      });
      return 'ok'
    },
    subirpuntuacionRespuestas:function(id){
      var pcm = resp_curso.findOne({_id:id});
      puntosmas = pcm.puntos_mas + 1;
      user = Meteor.userId();
      resp_curso.update(id, { 
        $set: { puntos_mas: puntosmas},
        $push: { usercalifadosmas: user }
      });
      return 'ok'
    },
    rebajarpuntuacionRespuestas:function(id){
      var pcn = resp_curso.findOne({_id:id});
      puntosmenos = pcn.puntos_menos + 1;
      user = Meteor.userId();
      resp_curso.update(id, {
        $set: { puntos_menos: puntosmenos},
        $push: { usercalifadosmenos: user }
      });
      return 'ok'
    },
    notificacion:function(id){
      notificaciones.update(id, {
        $set: { estado: 'V'},
      });
      return 'ok ok'
    }
})

Meteor.publish('preguntas', function() {
  return preg.find();
});

Meteor.publish('respuestas', function() { 
  return resp.find();
});

Meteor.publish('preguntas_curso', function() {
  return preg_curso.find();
});

Meteor.publish('respuestas_curso', function() {
  return resp_curso.find();
});

Meteor.publish('notificaciones', function(limit) {
  var dl = limit || 10;
  return notificaciones.find({}, {limit: dl})
});

