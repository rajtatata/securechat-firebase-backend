const functions = require('firebase-functions')
const admin = require('firebase-admin')
const avatarImages = require('./avatarImages')

const serviceAccount = require('./ServiceAccountKey.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://[project-name].firebaseio.com', // paste database url here
})

const db = admin.database()
const db_name = "/secure_messages/"

exports.sendMessage = functions.https.onRequest((request, response) => {
    const { from, to, message, nonce } = request.body
    const timestamp = admin.database.ServerValue.TIMESTAMP

    if (from === null || to === null || message === null || nonce === null) {
        response.send({
            status: 0,
            error: "Wrong data sent (missing values)"
        })
    }

    const ref = db.ref(db_name + to + "/")
    const messageObject = {
        from: from,
        message: message,
        nonce: nonce,
        timestamp: timestamp
    }

    const newMessage = ref.push(messageObject)

    newMessage.once('value', snapshot => {
        response.send({
            status: 1,
            timestamp: snapshot.val().timestamp
        })
    })    
})

exports.getUserId = functions.https.onRequest((request, response) => {
    const db = admin.database()
    const newUser = db.ref(db_name).push()
    console.log("created new user id", newUser.key)

    response.send({
        status: 1,
        uid: newUser.key
    })
})

exports.deleteMessage = functions.https.onRequest((request, response) => {
    const { message_id, user_id } = request.body

    if (message_id === null || user_id === null) {
        response.send({
            status: 0,
            error: "Wrong data sent (missing values)"
        })
    }

    db.ref(db_name + user_id + "/" + message_id).remove()

    response.send({
        status: 1
    })
})

exports.getRandomAvatar = functions.https.onRequest(async (request, response) => {
    const avatarUri = avatarImages[Math.floor(avatarImages.length * Math.random())]
    response.send({
        uri: avatarUri
    })
})