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
        //Check if Authors is array
        let checkAuthor = Array.isArray(obj.authors)
        checkAuthor ? true : this.errors.push("Authors should be an array")
        //Check if Tag is array
        let checkTags = Array.isArray(obj.tags)
        checkTags ? true : this.errors.push("Tags should be an array")
        //Check for empty values
        let value = true;
        Object.keys(obj).forEach(key => {
            if(!obj[key] || obj[key] === null || obj[key] === undefined || obj[key] === ""){
                value = false;
                this.errors.push(`${key} should not be empty`)
            } 
        });
        return (checkAuthor && checkTags && value) ? true : false
    }
}


// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = {
    Project,
    Projects
};