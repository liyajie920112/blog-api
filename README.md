# baba-admin

## mysql 8.0
## 为mysql新用户授权

grant all privileges on 数据库名称.* to '用户名'@'localhost' with grant option;

## 修改密码

ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';

## mac启动mysql

mysql.server start

