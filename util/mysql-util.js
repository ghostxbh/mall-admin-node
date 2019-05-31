/**
 * Create by xbh 2019-05-28 mysql连接工具
 */

const mysql = require('mysql');
const readConf = require('../conf/mysql-read-connection');
const writeConf = require('../conf/mysql-write-connection');

const readConfig = {
    connectionLimit: 5,
    host: readConf.host,
    user: readConf.username,
    password: readConf.password,
    port: readConf.port,
    database: readConf.database_usercenter,
    multipleStatements: true
};
const writeConfig = {
    connectionLimit: 5,
    host: writeConf.host,
    user: writeConf.username,
    password: writeConf.password,
    port: writeConf.port,
    database: writeConf.database_usercenter,
    multipleStatements: true
};
let readConn;
let writeConn;
const Mysql = {
    getPool: (config, domain) => {
        //确认读写数据库
        if (readConn && domain === 'R') {
            return readConn;
        } else if (writeConn && domain === 'W') {
            return writeConn;
        } else {
            if (domain === 'R') {
                readConn = mysql.createPool(config);
                console.log(new Date(), '已创建连接池');
                return readConn;
            } else if (domain === 'W') {
                writeConn = mysql.createPool(config);
                console.log(new Date(), '已创建连接池');
                return writeConn;
            }
        }
    },
    //read
    fetch: (sql, ps) => {
        return new Promise((resolve, reject) => {
            let pool = Mysql.getPool(readConfig, 'R');
            pool.getConnection((err, conn) => {
                conn.query(sql, ps, (e, v, f) => {
                    if (e) {
                        console.log(e);
                        reject(e);
                    } else {
                        resolve(v);
                    }
                    conn.release();
                });
            });
        });
    },
    //write
    excute: (sql, ps) => {
        return new Promise((resolve, reject) => {
            let pool = Mysql.getPool(writeConfig, 'W');
            pool.getConnection((err, conn) => {
                conn.query(sql, ps, (e, v, f) => {
                    if (e) {
                        console.log(e);
                        reject(e);
                    } else {
                        resolve(v);
                    }
                    conn.release();
                });
            });
        });
    },
    //事务执行
    transExcute: (sql, ps) => {
        return new Promise((resolve, reject) => {
            let pool = Mysql.getPool(writeConfig, 'W');
            pool.getConnection((err, conn) => {
                conn.beginTransaction(e => {
                    if (e) return reject('开启事务失败');
                    else {
                        conn.query(sql, ps, (e, v, f) => {
                            if (e) {
                                return conn.rollback(() => {
                                    reject('插入失败数据回滚');
                                })
                            } else {
                                conn.commit((e) => {
                                    if (e) {
                                        reject('事务提交失败');
                                    } else {
                                        resolve(v);
                                    }
                                });
                            }
                            conn.release();
                        });
                    }
                });
            });
        });
    },
};

module.exports = Mysql;
