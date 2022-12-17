const Conversations = require('../models/conversations.models');
const Participants = require('../models/participants.models');

const uuid = require('uuid')

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
