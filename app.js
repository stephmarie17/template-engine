// Dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");

// Classes
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

// Function to collect user input for Team Members
// Need to collect parameters for Employee class then:
// based on response to role, ask follow up questions for each team member
// Only create HTML file if team is complete

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your name:',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Enter your ID:',
            name: 'id'
        },
        {
            type: 'input',
            message: 'Enter your email:',
            name: 'email'
        },
        {
            type: 'input',
            message: 'Enter your team role:',
            name: 'role'
        }
    ]);
};

function promptEngineer() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your Github profile name:',
            name: 'github'
        },
        {
            type: 'confirm',
            message: 'Would you like to add another team member?',
            name: 'addteam'
        }
    ]);
};

function promptManager() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your office number:',
            name: 'officeNumber'
        },
        {
            type: 'confirm',
            message: 'Would you like to add another team member?',
            name: 'addteam'
        }
    ]);
};

function promptIntern() {
    return inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your school name:',
            name: 'school'
        },
        {
            type: 'confirm',
            message: 'Would you like to add another team member?',
            name: 'addteam'  
        }
    ]);
};

function generateManagers(managers){
    return managers.map(manager => {
        return `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${manager.getName()}</h5>
            <p class="card-text"><i class="fas fa-tasks"></i> Manager</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: ${manager.getId()}</li>
            <li class="list-group-item">Email: ${manager.getEmail()}</li>
            <li class="list-group-item">Office Number: ${manager.getOfficeNumber()}</li>
        </ul>
    </div>
        `
    }).join('');
};

function generateEngineers(engineers){
    return engineers.map(engineer => {
        return `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title" id="display-name">${engineer.getName()}</h5>
                <p class="card-text"><i class="fas fa-database"></i> Engineer</p>
            </div>
                 <ul class="list-group list-group-flush">
                   <li class="list-group-item" id="display-id">ID: ${engineer.getId()}</li>
                   <li class="list-group-item" id="display-email">Email: ${engineer.getEmail()}</li>
                   <li class="list-group-item" id="display-github">GitHub: ${engineer.getGithub()}</li>
                 </ul>
         </div>
        `
    }).join('');
};

function generateInterns(interns){
    return interns.map(intern => {
        return `
        <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${intern.getName()}</h5>
          <p class="card-text"><i class="fas fa-graduation-cap"></i> Intern</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${intern.getId()}</li>
          <li class="list-group-item">Email: ${intern.getEmail()}</li>
          <li class="list-group-item">School: ${intern.getSchool()}</li>
        </ul>
        </div>      
        `
    }).join('');
}

// Function to write the collected data into HTML file



function generateHtmlDoc(engineers, managers, interns) {
        const html = renderTeamHTML(engineers, managers, interns);
        writeFileAsync("./output/team.html", html)
        console.log("Team.html successfully created!");
}

function renderTeamHTML(engineers, managers, interns) {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="../lib/mainstyle.css" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <script src="https://kit.fontawesome.com/5b7ccd430b.js" crossorigin="anonymous"></script>
    <title>Team Role: Engineer</title>
</head>
<body>
        <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">My Team</h1>
            <p class="lead">Meet the project team.</p>
        </div>
        </div>
        <div class="card-deck">
        ${generateManagers(managers)}
        ${generateEngineers(engineers)}
        ${generateInterns(interns)}
        </div>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>`
};

const engineers = [];
const managers = []; 
const interns = [];

// Init function to launch application when run in node
async function init () {
        try {
        const {role: roleType, name: nameEmployee, id: idEmployee, email: emailEmployee} = await promptUser();
        
            // const newEmployee = new Employee(nameEmployee, idEmployee, emailEmployee);
            switch(roleType) {
                case 'Engineer':
                    promptEngineer().then(async function(answers) {
                        const {github: myGithub, addteam: createAnother} = answers;
                        const newEngineer = new Engineer(nameEmployee, idEmployee, emailEmployee, myGithub);
                        engineers.push(newEngineer);
                        console.log(newEngineer, createAnother);
                        if(createAnother){
                            init();
                        }
                        else {
                            generateHtmlDoc(engineers, managers, interns)
                        }
                        
                    });
                break;
                case 'Manager':
                    promptManager().then(async function(answers){
                        const {officeNumber: myOfficeNumber, addteam: createAnother} = answers;
                        const newManager = new Manager(nameEmployee, idEmployee, emailEmployee, myOfficeNumber);
                        managers.push(newManager);
                        console.log(newManager);
                        if(createAnother){
                            init();
                        }
                        else {
                            generateHtmlDoc(engineers, managers, interns)
                        }
                    });
                break;
                case 'Intern':
                    promptIntern().then(async function(answers){
                        const {school: mySchool, addteam: createAnother} = answers;
                        const newIntern = new Intern(nameEmployee, idEmployee, emailEmployee, mySchool);
                        interns.push(newIntern);
                        console.log(newIntern);
                        if(createAnother){
                            init();
                        }
                        else {
                            generateHtmlDoc(engineers, managers, interns)
                        }
                    });
                break;
            default:
                console.log('Please enter a valid role: Engineer, Manager, or Intern.');
            }
        }
        catch(err) {
            console.log(err);
        };
};

init();
