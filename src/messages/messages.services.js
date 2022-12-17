const { createMessages, findMessagesById, removeMessage, findAllMessages } = require("./messages.controllers");

const getAllMessages = (req, res) => {
    findAllMessages()
    .then(data => {
        data ? res.status(200).json(data) : res.status(404).json({message: "data not found"})
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

const getMessageById = (req, res) => {
    const id = req.params.message_id;
    findMessagesById(id)
    .then(data => {
        if(data){
            res.status(200).json(data)
         }
        else {
            res.status(404).json({message: "Message Not Found"})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

const postMessage = (req, res) => {
    const userId = req.user.id;
    const conversationId = req.params.conversation_id; //! el .params debe tener el mismo nombre del parametro.
    const { message } = req.body //! debes destructurar el body, de lo contrario lo detecta como un array o un objeto.

    createMessages({ userId, conversationId, message })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message, fields: {
                message: 'text'
            }})
        })
}

const deleteMessage = (req, res) => {
    const id = req.params.message_id;
    removeMessage(id)
    .then(data => {
        if(data){
            res.status(204).json({message: `Conversation ${id} has been deleted`})
         }
        else {
            res.status(404).json({message: "Message Not Found"})
        }
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    postMessage,
    getMessageById,
    deleteMessage,
    getAllMessages
}