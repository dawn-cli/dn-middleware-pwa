
/* eslint-disable max-len */
const swTypeMap = {
  'Offline page': {
    path: 'ServiceWorker1',
    description: 'This simple but elegant solution pulls a file from your web server called "offline.html" (make sure that file is actually there) and serves the file whenever a network connection can not be made.'
  },
  'Offline copy of pages': {
    path: 'ServiceWorker2',
    description: 'A solution that expands the offline capabilities of your app. A copy of each pages is stored in the cache as your visitors view them. This allows a visitor to load any previously viewed page while they are offline.'
  },
  'Offline copy with Backup offline page': {
    path: 'ServiceWorker3',
    description: 'A copy of each pages is stored in the cache as your visitors view them. This allows a visitor to load any previously viewed page while they are offline. This then adds the "offline page" that allows you to customize the message and experience if the app is offline, and the page is not in the cache.'
  },
  'Cache-first network': {
    path: 'ServiceWorker4',
    description: 'Use this service worker to pre-cache content. The content you add to the "cache-array" will be added immediately to the cache and service from the cache whenever a page requests it. At the same time it will update the cache with the version you have on the server. Configure your file array to include all your site files, or a subset that you want to be served quickly.'
  }
};
/* eslint-enable max-len */

/**
 * 这是一个标准的中间件工程模板
 * @param {object} opts cli 传递过来的参数对象 (在 pipe 中的配置)
 * @return {AsyncFunction} 中间件函数
 */
module.exports = function (opts) {
  let { type } = opts;
  return async function (next) {
    const questions = {
      type: 'list',
      choices: Object.entries(swTypeMap)
        .map(([name]) => ({ name, value: name })),
      name: 'swtype',
      message: 'Select the service worker functionality for your app:'
    };

    if (type && Object.keys(swTypeMap).indexOf(type) < 0) {
      this.console.log(`'type' should be one of ${Object.keys(swTypeMap).join(', ')}`);
      throw 'type error';
    }

    if (Object.keys(swTypeMap).indexOf(type) < 0) {
      const { swtype } = await this.inquirer.prompt([questions]);
      type = swtype;
    }

    this.console.info(swTypeMap[type].description);

    const folder = `${this.cwd}/node_modules/pwabuilder-serviceworkers/${swTypeMap[type].path}`;

    console.log(type, folder);
    next();
  };
};