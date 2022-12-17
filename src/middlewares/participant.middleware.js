const { findParticipantConversation } = require("../participants/participants.controller")

const participantMiddleware = (req, res, next) => {
    const conversationId = req.params.conversation_id
    const userId = req.user.id

    findParticipantConversation(userId, conversationId)
    .then(data => {
        if(data) {
            next()
        } else { 
            res.status(400).json({message: "You are not participant of this conversation."})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {participantMiddleware}