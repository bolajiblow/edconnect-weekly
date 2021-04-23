const DataModel = require('./data_model');

class Project {
    constructor(id, name, abstract, authors, tags, createdBy) {
        this.id = id;
        this.name = name;
        this.abstract = abstract;
        this.authors = authors;
        this.tags = tags;
        this.createdBy = createdBy;
    }
}

class Projects extends DataModel {
    validate(obj) {
        this.errors = [];
        let message = '';
        let arrayAuthor, arrayTag, isEmpty = false;
        //test for author
        
        if (Array.isArray(obj.authors) == false) {
            arrayAuthor = true;
            message = 'Authors should be an array'
            this.errors.push(message)            
        } 

        //test for tag
        if (Array.isArray(obj.tags) == false) {
            arrayTag = true;
            message = 'Tags should be an array'
            this.errors.push(message)            
        } 
        // check for empty property
        Object.keys(obj).forEach(key => {
            if(obj[key] == ''){
                isEmpty = true;
                message = (`${key} cannot be empty`)
                this.errors.push(message)
            } 
        })
        if (arrayAuthor || arrayTag || isEmpty) {
            return false
        }else{
            return true
        }
        
    }

        
       


    
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};