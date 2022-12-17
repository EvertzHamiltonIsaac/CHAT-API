const { postConversation, getAllConversations, getConversationById, patchConversation, deleteConversation } = require("./conversation.services");
const router = require('express').Router()
const passportJWT = require('../middlewares/auth.middleware');

router.route('/')
    .get(passportJWT.authenticate('jwt', {session:false}), getAllConversations)
    .post(passportJWT.authenticate('jwt', {session:false}), postConversation)

router.route('/:conversation_id')
    .get(passportJWT.authenticate('jwt', {session:false}),getConversationById)
    .patch(passportJWT.authenticate('jwt', {session:false}),patchConversation)
    .delete(passportJWT.authenticate('jwt', {session:false}), deleteConversation)


module.exports = router