 const fs = require('fs');
 const _ = require('lodash');
 const yargs = require('yargs');

 const notes = require('./notes.js');

 const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
 }

 const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
 }

 const argv = yargs
    .command('add', 'Add a note', {
        title:titleOptions ,
        body: bodyOptions 
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note',{
        title: titleOptions 
    })
    .command('remove', 'Remove a note',{
        title: titleOptions
    })
    .help()
    .argv;
 var command = argv._[0];
  console.log('command: ', command);
  console.log('yargs', argv);

 if(command === 'list'){
     var notes_list = notes.getAll();
     if(notes_list){
         console.log('List is: ');
         notes_list.forEach(note => notes.logNote(note));
     }
 }
 else if(command === 'add'){
     var note = notes.addNote(argv.title, argv.body);
     if(note!=null){
        console.log("Note created");
        notes.logNote(note);
     }
     else{
         console.log("Note not found");
     }
 }
 else if(command == 'read'){
    var note = notes.getNote(argv.title);
    if(note){
        console.log("Required note:");
        notes.logNote(note);
    }
    else{
        console.log('No such note exists');
    }
 }
 else if(command == 'remove'){
    var result = notes.delNote(argv.title);
    var message = result ? 'Note removed' : 'Note not present';
    console.log(message);
 }
 else{
     console.log("command not recognized");
 }
