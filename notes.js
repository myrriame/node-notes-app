// load file system module from npm
const fs = require('fs')

// adds colored text to command line
const chalk = require('chalk')

// adds a note and requires a title and body
// duplicateNote chekcs for duplicate note titles and if there is one it executes the else statement
// if not it adds the title and the body to the notes.json with the notes variable which is the loadNotes function and then uses the saveNotes function
const addNote = function (title, body) {

    const notes = loadNotes()

    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {

        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)

        console.log(chalk.bold.rgb(25, 41, 88)(title + ' note was added succesfully!'))

    } else {

        console.log(duplicateNote)
        console.log(chalk.bold.rgb(255, 0, 0)('Note title already taken, try a new title name!'))

    }
}

// saving to json file, takes in notes array(which is the notes.json file but are JS objects in an array)
// stringifies it and then saves that to the notes.json file without overriding the previous data but appending it
const saveNotes = function (notes) {

    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)

}

// dataBuffer reads a file called notes.json, dataJSON turns that data info into a string, then JSON.parse turns JSON into a javascript object 
// catch handles the error that'd occur if there isn't a file or the file doesn't contain JSON. It returns an empty array which is what is returned when there is an empty file normally
const loadNotes = function () {

    try {

        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {

        return []

    }

}


// using the .filter method it looks through each note for the title name entered and returns all the titles except the one entered
// then the if statement checks the new array's length vs the orginal array's length and if the new array is less then it console logs the title was removed
// else (if they're equal) it console logs that the title was not found
// it then runs the saveNote function but passes the new array through it
const removeNote = function (title) {

    const notes = loadNotes()

    const notesToKeep = notes.filter(function (note) {

        return note.title !== title

    })

    if (notes.length > notesToKeep.length) {

        console.log(chalk.bold.green(title + " was removed"))

    } else {

        console.log(chalk.bold.red(title + " was not found"))

    }

    saveNotes(notesToKeep)
}

// lists each note title using the forEach method to the console
const listNotes = function () {

    const notes = loadNotes()

    console.log(chalk.bold.magenta('Your notes: '))

    notes.forEach((note) => {

        console.log(chalk.rgb(210, 180, 140).bold(note.title))

    })
}

// when using the read command the required option is the title so this finds the title in the array and if it finds a match it console logs the totle and the body
// if not if returns a error saying that title was not found
const readNote = function (title) {

    const notes = loadNotes()

    const noteRead = notes.find((note) => note.title === title)

    if (noteRead) {

        console.log(chalk.rgb(255, 165, 0).bold(noteRead.title))
        console.log(chalk.bold.magenta(noteRead.body))

    } else {

        console.log(chalk.bold.rgb(255, 0, 0)(title + ' was not found'))

    }
}

// exports functions to be used in app.js file ex. notes.addNote()
module.exports = {

    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

}