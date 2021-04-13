// adds colored text to command line, not used in this file anymore
const chalk = require('chalk')

// helps with arguement parsing 
const yargs = require('yargs')

// where the functions for our command handlers are
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// create add command using yarg command method instead of (command === 'add')
// builder is used to give the command options to support, title and body are the options to add a note
// the demandOption and type ensures that the title and body are passed with the command and that they come up as strings not booleans
// if there isn't a title or a body the command wont run

// how to use add command: node app.js add --title="title name" --body="body content"
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    // 
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of Note',
            demandOption: true,
            type: 'string'
        }
    },
    // Code run when command is used
    handler: function (argv) {

        notes.addNote(argv.title, argv.body)
        // console.log('Title: ' + argv.title)
        // console.log('Body: ' + argv.body)
    }
})

// create remove command
// how to use remove command: node app.js remove --title="title name"
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title)
    }
})

// read note command
// how to use read command: node app.js read --title="title name"
yargs.command({
    command: 'read',
    describe: 'Reading your note',
    builder: {
        title: {
            describe: 'Note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.readNote(argv.title)

    }
})

// list note command
// how to use list command: node app.js list
yargs.command({
    command: 'list',
    describe: 'Listing your notes',
    handler: function () {

        notes.listNotes()
    }
})




// needed so that yargs knows to parse arguements
yargs.parse()




