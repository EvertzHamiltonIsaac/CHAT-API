const Conversations = require('../models/conversations.models');
const Participants = require('../models/participants.models');
const Users = require('../models/users.models')

const uuid = require('uuid')

const findAllConversation = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const createConvesation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        tittle: obj.tittle,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //* Este es el propetario de la conversacion
    })

    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //* Este es el id que viene desde el Token
        conversationId: newConversation.id
    })

    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, //* Este es el id que viene desde el body.                          
        conversationId: newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async (id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })

    return data[0]
}

const removeConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })

    return data
}

module.exports = {
    findAllConversation,
    findConversationById,
    createConvesation,
    updateConversation,
    removeConversation
}
