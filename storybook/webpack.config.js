const common = require('../webpack/common');
const webpackConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (config, env) => {
	const newConfig = webpackConfig(config, env);

	newConfig.module.rules.map(item => {
		if(item.test.test('styles.css')) {
			item.use[1].options.modules = true;
		}

		return item;
	});

	newConfig.resolve = common.resolve;

	return newConfig;
}
