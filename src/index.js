const utils = require("loader-utils");
const packageName = require('../package').name;

function loaderFn(source) {
	this.cacheable();

	const sourcePart = source.replace("module.exports", "var htmlContent");
	const options = utils.getOptions(this) || {};
	const templateName = options.templateName || '[name]-[ext]';
	const name = options.name || utils.interpolateName(this, templateName, options);

	return [
		"var ko = require('knockout');",
		`var stringTemplateEngine = require('${packageName}/lib/string-template-engine');`,
		sourcePart,
		`ko.templates['${name}'] = htmlContent;`
	].join("\n");
}

module.exports = loaderFn;
