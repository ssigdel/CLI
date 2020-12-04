const program = require('commander');
const { prompt } = require('inquirer');
const { addUser, findUser, updateUser, removeUser, listUsers} = require('./index');
const ansi = require('ansi')
const cursor = ansi(process.stdout)

//questions
const questions = [
    {
     type: 'input',
     name: 'name',
     message: 'Username:'
    },
    {
     type: 'input',
     name: 'email',
     message: 'Email:'
    },
    {
     type: 'input',
     name: 'password',
     message: 'Password:'
    }
]

program 
    .version('1.0.0')
    .description('User Management System')

//add command
program
    .command('add')
    .alias('a')
    .description('Add a user')
    .action(() => {
        prompt(questions).then(answers => addUser(answers));
    });

//find command
program 
    .command('find <name>')
    .alias('f')
    .description('find a user')
    .action(name => findUser(name));

//update command
program
    .command('update <_id>')
    .alias('u')
    .description('Update a user')
    .action((_id) => {
        prompt(questions).then(answers => updateUser(_id, answers));
});

//remove command
program 
    .command('remove <_id>')
    .alias('r')
    .description('remove a user')
    .action(_id => removeUser(_id));

//list user
program 
    .command('list')
    .alias('l')
    .description('list all user')
    .action(() => listUsers()); 

//beep sound on process completion
cursor.beep();
program.parse(process.argv);

