class DataModel {
    constructor() {
        this.data = [];
        this.errors = [];
    }

    getAll() {
        return this.data;
    }

    getById(id) {
        for (let i=0; i<this.data.length; i++){
            let getUser = this.data[i];
            if(getUser.id == id){
                return getUser;
            }else {
                return null;
            }
            }
            }

    }

    save(obj) {
        if (this.validate(obj)) {
            this.data.push(obj);
            return true;
        }
        return false;
    }

    update(obj, id) {
        addUser(obj,id) {
            let isUpdated = false;
            this.data.forEach(ob => {
               if(ob.id==id){
                Object.keys(ob).forEach(key => {
                    ob[key] = obj[key]
               })
               isUpdated = true
               }
               
               })
               return isUpdated
        }

    }

    delete(id) {
        for (let i=0; i<this.data.length; i++){
            let deleteUser = this.data[i];
            if(deleteUser.id == id){
                this.data.splice(i,1);
                return true;
            }else {
                return false;
            }
            }
            }

    }

    // this method will be overriden in the sub classes
    validate(obj) {
        return false;
    }
}

// Do not worry about the below for now; It is included so that we can test your code
// We will cover module exports in later parts of this course
module.exports = DataModel;