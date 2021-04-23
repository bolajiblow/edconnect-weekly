const DataModel = require('./data_model');

class User {
    constructor(id, firstname, lastname, email, password, matricNumber, program, graduationYear) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.matricNumber = matricNumber;
        this.program = program;
        this.graduationYear = graduationYear;

    }

    getFullName() {
        return (`${this.firstname} ${this.lastname}`)
    }
}

class Users extends DataModel {
    authenticate(email, password) {
        let authenticateUser = this.data.filter((ob) => {return (ob.email === email && ob.password === password)})
        return (authenticateUser? true : false);
        


    }

    getByEmail(email) {
        let getUserbyMail = this.data.filter((ob) => {return (ob.email === email)})
            return getUserbyMail? getUserbyMail : null

    }

    getByMatricNumber(matricNumber) {
        let getUserbyMatric = this.data.filter((ob) => {return (ob.matricNumber === matricNumber)})
            return getUserbyMatric? getUserbyMatric : null

    }

    validate(obj) {
        this.errors = [];
        let message = '';
        let empty, userMail, userMatric, passs = false;
        //test for empty property
       Object.keys(obj).forEach(key => {
            if(obj[key] == ''){
                empty = true;
                message = (`${key} cannot be empty`)
                this.errors.push(message)
            } 
        });
        
        //test for the same email
        this.data.forEach((ob) => {
             if (ob.email == obj.email) {
                 userMail =  true;
                message = (`A user with ${obj.email} already exists`)
                this.errors.push(message)
            }
        });
        
        //test for matricNumber
        this.data.forEach(ob => {
            if(ob.matricNumber == obj.matricNumber){
                userMatric = true;
                message = (`A user with ${obj.matricNumber} already exists`)
                this.errors.push(message)
            }
        });
    
        //test for password
        if (obj.matricNumber.length < 7) {
            passs = true
            message =  'Password should have at least 7 characters'
            this.errors.push(message);
        }
        if (empty || userMail || userMatric || passs) {
            return false
        } else {
            return true
        }
    
        
    }
}
// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    User,
    Users
};