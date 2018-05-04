const utils = require("loader-utils");
const packageName = require('../package').name;

function loaderFn(source) {
	this.cacheable();

	const options = utils.getOptions(this) || {};
	const templateName = options.templateName || '[name]-[ext]';
	const name = this._module.rawRequest; // options.name || utils.interpolateName(this, templateName, options);
    const sourcePart = source.replace("module.exports", `module.exports = "${name}"; var htmlContent`);

	return [
		"var ko = require('knockout');",
		`var stringTemplateEngine = require('${packageName}/lib/string-template-engine');`,
		sourcePart,
		`ko.templates['${name}'] = htmlContent;`
	].join("\n");
}

module.exports = loaderFn;
