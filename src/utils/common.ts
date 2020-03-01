import md5 = require('crypto-js/md5')
import jwt = require('jsonwebtoken')

const secretStr = 'exam!@#secret'
function getMd5(str: string): string {
  return md5(str).toString()
}

function getToken(data: any): string {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24h后过期 
    data,
  }, secretStr)
}

function decodeToken(token: string) {
  return jwt.decode(token)
}

function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretStr, function(err, decoded) {
      if (err) {
        /*
          err = {
            name: 'TokenExpiredError',
            message: 'jwt expired',
            expiredAt: 1408621000
          }
        */
       reject(false)
      }
      resolve(decoded)
    })
  })
}

export {
  getMd5,
  getToken,
  verifyToken
}
