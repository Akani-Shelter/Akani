const admin = require('firebase-admin');
const serviceAccount = require('./firebase.js');


/** Initializes the database*/
const initialize = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

class Database {

    #db;

    /** Starts the database */
    constructor() {
        initialize();
        this.#db=admin.firestore();
    }
    
    async save(collectionPath, documentName, field, fieldsData, merge = false){
        let data = {[field]: fieldsData}

        if(merge){
            try{
                await this.fetch(collectionPath, documentName, field).then(async oldField => {
                    if(!oldField)
                        oldField = [];
                    oldField.push(fieldsData);
                    data = {[field]: oldField};
                    await this.#db.collection(collectionPath).doc(documentName).set(data, {merge:true}).then();
                }).catch(error => {
                    return Promise.reject(error);
                })
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else
            this.#db.collection(collectionPath).doc(documentName).set(data, {merge:true}).then();
    }

    async fetch(collectionPath, documentName = null, field = null)
    {
        if(documentName === null)
        {
            try{
                return this.#db.collection(collectionPath).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }

        }
        else if(field === null && collectionPath !==undefined){
          try{
                return this.#db.collection(collectionPath).doc(documentName).get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
          
        }
        else if(field === null){
            try{
                return this.#db.collection(collectionPath).doc().get().then();
            }
            catch(e) {
                console.error(`An error occurred while connecting to the database: \n${e}`);
            }
        }
        else{
            try{
                const doc = await this.#db.collection(collectionPath).doc(documentName).get(field);
                if(doc){
                    const entries = await Object.entries(doc.data());
                    for(const entry of entries){
                        if(entry[0] === field)
                            return entry[1]
                    }
                }

                return null;
            }
            catch(e) {
                return null;
            }
        }
    }

    async delete(collectionPath, documentPath, field, fieldData){
        //Delete a specific value from a field. Only works when the field is an array or object
        if(collectionPath && documentPath && field && fieldData){
            //Get the field from the database
            const oldField = await this.fetch(collectionPath, documentPath, field);
            //Check if the field is an array
            if(Array.isArray(oldField)){
                //Check if the value exists in the array
                const index = oldField.indexOf(fieldData);
                if(index !== -1){
                    try{
                        //Delete the value from the array
                        oldField.splice(index, 1);
                        if(oldField){
                            try{
                                //Save the new array in the field
                                this.save(collectionPath, documentPath, field, oldField);
                            }
                            catch (error){
                                return Promise.reject(error)
                            }
                        }
                        return true;
                    }
                    catch (error){
                        return Promise.reject(error);
                    }
                }
                else
                    return Promise.reject(`Value does not exist within the field`);

            }
        }
    }
}

class Singleton {

    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = new Database();
        }
    }

    getInstance() {
        return Singleton.instance;
    }
}

module.exports = Singleton;
