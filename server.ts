// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

const compression = require('compression');

const sm = require('sitemap');
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

app.use(compression());

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');

app.use(require('prerender-node').set('prerenderToken', 'tC4oIuN2oCIVolr5qqqy'));


app.engine('html', (_, options, callback) => {
  renderModuleFactory(AppServerModuleNgFactory, {
    // Our index.html
    document: template,
    url: options.req.url,
    // DI so that we can get lazy-loading to work differently (since we need it to just instantly render it)
    extraProviders: [
      provideModuleMap(LAZY_MODULE_MAP)
    ]
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

const sitemap = sm.createSitemap({
  hostname: 'https://ngx-seo-demo.herokuapp.com',
  cacheTime: 1000 * 60 * 24,  // keep the sitemap cached for 24 hours
  urls: [
    { url: '/dashboard/', changefreq: 'daily', priority: 0.80, image: 'heroes.jpg', logo: 'seoTitleNew.jpg' },
    { url: '/heroes/', changefreq: 'monthly', priority: 0.80 },
    { url: '/detail/11/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/12/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/13/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/14/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/15/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/16/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/17/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/18/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/19/', changefreq: 'monthly', priority: 0.64 },
    { url: '/detail/20/', changefreq: 'monthly', priority: 0.64 },
    { url: '/signup/', changefreq: 'monthly', priority: 0.50 },
    { url: '/login/', changefreq: 'monthly', priority: 0.50 },
    { url: '/about/', changefreq: 'monthly', priority: 0.50 },
    { url: '/contact/', changefreq: 'monthly', priority: 0.50 }

  ]
});

app.get('/sitemap.xml', function (req, res, next) {
  sitemap.toXML(function (err, xml) {
    if (err) {
      return res.status(500).end();
    }
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  });
});
// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser')));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});





// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node server listening on http://localhost:${PORT}`);
});