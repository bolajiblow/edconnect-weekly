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
        //test for author
        let authorCheck = Array.isArray(obj.authors) ? true: this.errors.push('Authors should be an array');
        //test for tag
        let tagCheck = Array.isArray(obj.tags) ? true: this.errors.push('Tags should be an array');
        // check for empty property
        Object.keys(obj).forEach(key => {
            if(obj[key] == ''){
                message = (`${key} cannot be empty`)
                this.errors.push(message)
            } 
            })
        }
        if (this.errors.length == 0) {
            return true
        }else{
            return false;
        }


    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};