module.exports = {
   "name": "default",
   "type": "mysql",
   "host": "localhost",
   "port": 3306,
   "username": "root",
   "password": "liyajie920112",
   "database": "exam_dev",
   "synchronize": true,
   "logging": false,
   "entities": [
      "build/entity/**/*.js"
   ],
   "migrations": [
      "build/migration/**/*.js"
   ],
   "subscribers": [
      "build/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "build/entity",
      "migrationsDir": "build/migration",
      "subscribersDir": "build/subscriber"
   }
}
