const {findAllConversation, createConvesation, findConversationById, updateConversation, removeConversation} = require('./conversations.controller')

const getAllConversations = (req, res) => {
    findAllConversation()
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message})
    })
}

const getConversationById = (req, res) => {
    const id = req.params.conversation_id
    findConversationById(id)
    .then((data) => {
        res.status(200).json(data)
    })
    .catch((err) => {
        res.status(400).json({message: err.message, specification: 'Invalid ID'})
    })
}

const postConversation = (req, res) => {
    const {tittle, imgUrl, participantId} = req.body
    const ownerId = req.user.id
    createConvesation({tittle, imgUrl, participantId, ownerId})
    .then(data => {
        res.status(201).json(data)
    })
    .catch(err => {
        res.status(400).json({message: err.message, fields: {
            tittle: 'string',
            imgUrl: 'string',
            participantId: 'UUID'
        }})
    })
}

const patchConversation = (req, res) => {
    const id = req.params.conversation_id
    const {tittle, imgUrl} = req.body

    updateConversation(id, {tittle, imgUrl})
    .then(data => {
        if(data){
            res.status(200).json({message: `Conversation ${tittle} has been patched`})
        }else{
            res.status(404).json({message: `Element not found, Invalid ID`})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

const deleteConversation = (req, res) => {
    const id = req.params.conversation_id
    removeConversation(id)
    .then(data => {
        if(data){
            res.status(204).json({message: `Conversation ${tittle} has been deleted`})
        }else{
            res.status(404).json({message: `Element not found, Invalid ID`})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllConversations,
    postConversation,
    deleteConversation,
    getConversationById,
    patchConversation
}