import md5 = require('crypto-js/md5')
import jwt = require('jsonwebtoken')
import pinyin = require('pinyin')
import { config } from './config'

const accessTokenExp = config.get('token.tokenExp') // 24h
const refreshTokenExp = accessTokenExp + config.get('token.tokenRefreshTime')

const secretStr = 'exam!@#secret'
function getMd5(str: string): string {
  return md5(str).toString()
}

function getToken(data: any, isRefreshToken: boolean = false): string {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (isRefreshToken ? refreshTokenExp : accessTokenExp), // 24h后过期 
    data,
  }, secretStr)
}

function decodeToken(token: string) {
  return jwt.decode(token)
}

function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretStr, function (err, decoded) {
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

function checkedWhiteList(url: string) {
  return config.get('whiteList').some((a: string) => {
    return url.includes(a)
  })
}

function chineseToPinyin(title: string, split: string = '-') {
  const py = pinyin(title, {
    style: pinyin.STYLE_NORMAL
  })
  const pyArr: Array<string> = []
  py.forEach((item: string[]) => {
    pyArr.push(item[0])
  })
  return pyArr.join(split)
}

export {
  getMd5,
  getToken,
  verifyToken,
  decodeToken,
  checkedWhiteList,
  chineseToPinyin
}
