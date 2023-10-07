module.exports.api = async (req, res, utils) => {
  try {
  console.log('Incoming request!')
  let { payload, uses } = req.body;
  let db = utils.db;
  if(!!uses && !!payload) {
    let accounts = await db.readData('accounts') || [];
    if(uses == 'auth-create') {
       try {
       let isAccountExist = accounts.find((acc) => acc.username === payload.username);
       if(isAccountExist) {
         res.send({ code: 409, error: "Username not available", token: null })
         return;
       }
      console.log('Creating account!')
       let recoveryCode = Math.random().toString(36).substring(2, 11);
       let result = await db.writeData('accounts', {
         username: payload.username,
         created: Date.now(), 
         recoveryCode: recoveryCode
       })
       let token = utils.jwt.generateToken({ username: payload.username, recoveryCode }, '365d');
       res.send({ code: 200, error: null, token: token })
      console.log('Account created!')
      } catch (err) {
         console.log(err)
         res.send({ code: 400, error: "An error occurred while creating your account", token: null })
      }
    } else if (uses == 'auth-verify') {
        let data = utils.jwt.verifyToken(payload.token)
        if(!!data) {
          let isAccountExist = accounts.find((acc) => acc.username === data.username);
          if(!isAccountExist) {
             res.send({ code: 404, error: "Account not found", token: null })
         return;
          }
          res.send({ code: 200, data: data })
        } else {
          res.send({ code: 401, data: null })
        }
    } else if (uses == 'api-usrfind') {
      let isAccountExist = accounts.find((acc) => acc.username === payload.username);
      if(isAccountExist) {
        res.send({ code: 200, message: 'Account has found' })
      } else {
        res.send({ code: 404, message: 'Account not found' })
      }
    } else if (uses == 'api-msgs') {
      console.log('A user requested to fetch messages');
      try {
        let msgs = await db.readData('messages') || [];
        let data = utils.jwt.verifyToken(payload.token);
        console.log(msgs, data)
        if(!!data) {
        let cooked = [];
        for(let i = 0;i < msgs.length;i++) {
          if(msgs[i].target == data.username) {
            cooked.push(msgs[i])
          }
        }
        res.send(cooked);
       } 
      } catch (err) {
        res.send({ error: "An error occurred" })
      }
    } else {
        res.send('Err')                                 
    }
  } else {
    res.send({ code: 422, error: "Missing parameters", token: null })
  }
 } catch (error) {
    res.send({ code: 500, error: "Api error", token: null })
    }
}
module.exports.socket = async (io, socket, utils) => {
  socket.on('send-message', (message) => {
    utils.db.writeData('messages', message)
    io.emit('event', {
      type: 'event', 
      data: {
        target: message.target,
        message: message.message,
        timestamp: message.timestamp
      }
    })
  })
}