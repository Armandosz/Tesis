/*
self.__precacheManifest = [].concat(self.__precacheManifest || []);

// eslint-disable-next-line no-undef
workbox.setConfig({
    debug: true
}),

// eslint-disable-next-line no-undef
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// eslint-disable-next-line no-undef
const assetRoute = new workbox.routing.RegExpRoute({
    regExp: new RegExp('^http://localhost:8081/src/*'),
    // eslint-disable-next-line no-undef
    handler: new workbox.runtimeCaching.CacheFirst()
});

// eslint-disable-next-line no-undef
const router = new workbox.routing.Router();
//router.addFetchListener();
router.registerRoutes({routes: [assetRoute]});
router.setDefaultHandler({
    // eslint-disable-next-line no-undef
    handler: new workbox.runtimeCaching.CacheFirst()
});
//const { concat } = require("core-js/fn/array");

/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */
//self.__precacheManifest = [].concat(self.__precacheManifest || []);



//workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

