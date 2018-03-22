'use strict';

var pa11y = require('pa11y');
const fs = require('fs');
const html = require('pa11y-reporter-html');
const routes = require('./hertzRoutes_23Feb_test');
const routeActions = require('./hertzRouteAction_23_test.json');
const actionArray = require('./node_modules/pa11y/lib/action');

const elementAction = {
	name: 'setting-field-value',
	match: /^setting( field)? (.+) to (.+)$/i,
	run: async (browser, page, options, matches) => {
		const selector = matches[2];
		const value = matches[3];
		try {
			/* eslint-disable no-shadow */
			await page.evaluate((selector, value) => {
				const target = document.querySelector(selector);
				if (!target) {
					return Promise.reject(new Error('No element found'));
				}
				target.value = value;
				target.dispatchEvent(new Event('keyup', {
					bubbles: true
				}));
				return Boolean(target);
			}, selector, value);
			/* eslint-enable no-shadow */
		} catch (error) {
			throw new Error(`Failed action: no element matching selector "${selector}"`);
		}
	}
};
actionArray.actions.push(elementAction);
var options = {
	// Log what's happening to the console
	log: {
		debug: console.log.bind(console),
		error: console.error.bind(console),
		info: console.log.bind(console)
	},
	timeout: 300000,
	reporter: 'html',
	// chromeLaunchConfig: {
	// 	executablePath: '/Applications/Google/Chromium.app/Contents/MacOS/Chromium',
	// 	ignoreHTTPSErrors: false,
	// 	'remote-debugging-port': 9222,
	// 	headless: false
	// }
};

const baseUrl = 'http://localhost:4000/'
const pa11yOptionsArr = [];
const batchSize = 2;
var startIndex = 0;
var newStartIndex;
var currentBatch;

routes.forEach(function (element) {
	var routePath; var parentRoutePath; var childRoutePath;
	var routeAction;
	if (element.path) {
		routePath = element.path
		pa11yOptionsArr.push(buildActionArr(routePath, routeActions));
	}
	if (element.children && element.children.length > 0) {
		element.children.forEach(function (element) {
			parentRoutePath = element.path
			pa11yOptionsArr.push(buildActionArr(parentRoutePath, routeActions));

			if (element.children && element.children.length > 0) {
				element.children.forEach(function (element) {
					childRoutePath = element.path
					pa11yOptionsArr.push(buildActionArr(parentRoutePath + '/' + childRoutePath, routeActions));
				}, this);
			}
		}, this);
	}
}, this);

function buildActionArr(path, routeActions) {
	var routeAction = routeActions[path];
	if (routeAction)
		return { ...options, actions: routeAction, url: baseUrl + path }
	else
		return { ...options, url: baseUrl + path };
}

function buildPa11yCommands() {
	pa11yOptionsArr.splice(0, 9).forEach(function (element) {
		console.log(element[0]);
		console.log(element[1]);
	}, this);
}
async function runPa11yInBatches(startIndex, batchSize) {
	try {
		var results = await runPa11yOnBatch(startIndex, batchSize);
		newStartIndex = await writeResultsToFile(results).then((res) => {
			return new Promise((resolve, reject) => {
				results = null;
				startIndex = startIndex + batchSize;
				resolve(startIndex);
			});
		});
		console.log("Processing batch with start index " + newStartIndex);
		while (newStartIndex < pa11yOptionsArr.length) {
			await runPa11yInBatches(newStartIndex, batchSize);
		}
	}
	catch (error) {
		console.error(error.message);
	};
}

function runPa11y() {
	runPa11yInBatches(startIndex, batchSize);
}

async function runPa11yOnBatch(startIndex, batchSize) {
	currentBatch = pa11yOptionsArr.slice(startIndex, startIndex + batchSize);
	return Promise.all(
		currentBatch.map(pa11y)
	);
}
async function writeResultsToFile(results) {
	new Promise((resolve, reject) => {
		resolve(results.forEach(function (element) {
			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			console.log(element.pageUrl);
			const htmlResults = html.results(element);
			htmlResults.then(function (resultHtml) {
				var fileName = element.pageUrl.replace(baseUrl, '').replace(/\//g, '_');
				if (fileName.indexOf('(modal') > 0)
					fileName = fileName.substring(0, fileName.indexOf('(modal'))
				fs.writeFile(fileName + '.html', resultHtml, (err) => {
					// throws an error, you could also catch it here
					if (err) throw err;
					// success case, the file was saved
					console.log(fileName + ' File saved!');
					if (newStartIndex > pa11yOptionsArr.length)
						process.exit(0);
				});
			})
			console.log("****************************************************");
		}, this));
	});
}

runPa11y();