import { Mongo } from 'meteor/mongo';
import { Index, MinimongoEngine } from 'meteor/easy:search'
export const crsMaster = new Mongo.Collection('cursos');
export const crs = new Mongo.Collection('clases');//Materiales
export const ars = new Mongo.Collection('archivos');
export const msg = new Mongo.Collection('messages')
export const msgClases = new Mongo.Collection('msgClases')
export const preg = new Mongo.Collection('preguntas')
export const preg_curso = new Mongo.Collection('preguntas_curso')
export const resp = new Mongo.Collection('respuestas')
export const resp_curso = new Mongo.Collection('respuestas_curso')

export const notificaciones = new Mongo.Collection('notificaciones')
/*export const fls = new FS.Collection("files", {
                stores: [new FS.Store.FileSystem("files", {path: "public/images  "})]
            });*/
            
export const fls  = new FS.Collection("files", {
    stores: [
        //new FS.Store.FileSystem("original", { path: "../../../../../public/files" }),
        //new FS.Store.FileSystem("thumb", { path: "../../../../../public/files" })
        new FS.Store.FileSystem("original", { path: "../../../public/files" }),
        new FS.Store.FileSystem("thumb", { path: "../../../public/files" })
    ],
    /*filter: {
        maxSize: 1000000, //1Mo
        allow: { contentTypes: ['image/*'] }
    },*/
    onInvalid: function (message) {
        //throw new Meteor.Error(403, message);
    }
});

UserIndex = new EasySearch.Index({
    engine:new EasySearch.MongoDB({
        sort:function(){
            return {createdAt:1}
        },
        selector:function(searchObject,options,aggregation){
            let selector = this.defaultConfiguration().selector(searchObject,options,aggregation),
            categoryFilter = options.search.props.categoryFilter;

            //if(_isString(categoryFilter) && !_.isEmpty(categoryFilter)){
                selector.category = categoryFilter;
            //}
            return selector
            
        }
    }),
    collection:Meteor.users,//Meteor.users,
    fields:['profile.Username','profile.ApellidoP','profile.ApellidoM','profile.Nombres'],
    defaultSearchOptions:{
        limit:8 
    },
    permission:()=>{
        return true
    }
});

//console.log(JokesIndex)


PreguntasIndex = new EasySearch.Index({
    engine:new EasySearch.MongoDB({
        sort:function(){
            return {createdAt:1}
        },
        selector:function(searchObject,options,aggregation){
            let selector = this.defaultConfiguration().selector(searchObject,options,aggregation),
            categoryFilter = options.search.props.categoryFilter;

            //if(_isString(categoryFilter) && !_.isEmpty(categoryFilter)){
                selector.category = categoryFilter;
            //}
            return selector
            
        }
    }),
    collection:preg,
    fields:['pregunta'],
    defaultSearchOptions:{
        limit:8 
    },
    permission:()=>{
        return true
    }
});

PreguntasIndexCurso = new EasySearch.Index({
    engine:new EasySearch.MongoDB({
        sort:function(){
            return {createdAt:1}
        },
        selector:function(searchObject,options,aggregation){
            let selector = this.defaultConfiguration().selector(searchObject,options,aggregation),
            categoryFilter = options.search.props.categoryFilter;

            //if(_isString(categoryFilter) && !_.isEmpty(categoryFilter)){
                selector.category = categoryFilter;
            //}
            //console.log(categoryFilter)
            //console.log(selector.pregunta)
            return selector
            
        }
    }),
collection:preg_curso,
    fields:['pregunta'],
    defaultSearchOptions:{
        limit:8 
    },
    permission:()=>{
        return true
    }
});