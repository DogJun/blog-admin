const path = require('path');
const Promise = require('bluebird');
const childProcessExec = Promise.promisify(require('child_process').exec);
// 服务器地址
const SERVER_PATH = 'root@119.29.90.205:/usr/share/nginx/blog-admin';
// 编译输出目录
const DIST_PATH = path.join(__dirname, 'dist');

console.time('sync time');

childProcessExec(`rsync -Rr . ${SERVER_PATH}`, { cwd: DIST_PATH }).then(() => {
    console.info('sync success~');
    console.timeEnd('sync time');
});
