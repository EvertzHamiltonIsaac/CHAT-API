const Messages = require('../models/messages.models')
const uuid = require('uuid')


const findAllMessages = async () => {
    const data = await Messages.findAll()
    return data
}


const findMessagesById = async (id) => {
    const data = await Messages.findOne({
        where: {
            id:id
        }
    })

    return data
}

const createMessages = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(), //! las key deben ser igual al modelo
        userId: obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })

    return data
}

const removeMessage = async (id) => {
    const data = await Messages.destroy({
        where: {
            id:id
        }
    })

    return data[0]
}

module.exports = {createMessages, findMessagesById, removeMessage, findAllMessages}