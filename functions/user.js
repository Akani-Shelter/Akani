const Database = require(`../database/database`);
const firestore_db = new Database().getInstance();

const register = async email => {
    await firestore_db.save(`users`, email, `user_id`, email);
}

module.exports = {register}

