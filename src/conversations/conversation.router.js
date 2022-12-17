const { postConversation, getAllConversations, getConversationById, patchConversation, deleteConversation } = require("./conversation.services");
const router = require('express').Router()
const passportJWT = require('../middlewares/auth.middleware');
const { postMessage, deleteMessage, getMessageById, getAllMessages } = require("../messages/messages.services");
const { participantMiddleware } = require("../middlewares/participant.middleware");



router.route('/')
    .get(passportJWT.authenticate('jwt', { session: false }), getAllConversations)
    .post(passportJWT.authenticate('jwt', { session: false }), postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', { session: false }), getConversationById)
    .patch(passportJWT.authenticate('jwt', { session: false }), patchConversation)
    .delete(passportJWT.authenticate('jwt', { session: false }), deleteConversation)

router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt', { session: false }), getAllMessages)
    .post(passportJWT.authenticate('jwt', { session: false }), participantMiddleware, postMessage)

router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt', { session: false }), getMessageById)
    .delete(passportJWT.authenticate('jwt', { session: false }), deleteMessage)

module.exports = router