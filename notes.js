const fs = require('fs');

var fetchNOte = () => {
    //fetching current notes in file
    try{
        var noteString = fs.readFileSync("notes-data.json");
        return JSON.parse(noteString);
    }catch(e){
        return [];
    }
};

var saveNote = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
}

//adding a note
var addNote = (title, body) => {
        var notes = fetchNOte();
        var note = {
            title,
            body
        };
        //returns true if a note is already there
        var duplicateNotes = notes.filter((note) => note.title === title)
        
        //storing note in file
        if(duplicateNotes.length === 0){
            //storing object in array
            notes.push(note);
            //adding array in json file
            saveNote(notes);
            return note;
        }   
};

var getAll = () => {
    return fetchNOte();

}

var getNote = (title) => {
    var notes = fetchNOte();
    var note = notes.filter((note) => note.title === title);
    return note[0];
}

var delNote = (title) => {
    var notes = fetchNOte();
    var modifiedNotes = notes.filter((note) => note.title !== title);
    saveNote(modifiedNotes);
    return notes.length !== modifiedNotes.length;
    
}

var logNote  = (note) => {
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    getNote,
    delNote,
    logNote
}