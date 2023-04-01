const db = require("../../data/dbConfig")

const getUserBy = async (filter) => {
    return db("users").where(filter).first()
}

const getUserById = async (userId) => {
    return db("users").where("id",userId).first()
}

const createUser = async (user) => {
    const [userId] = await db("users").insert(user)
    return getUserById(userId)
}

module.exports = {
    createUser,
    getUserById,
    getUserBy
}