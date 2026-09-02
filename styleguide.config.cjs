module.exports = {
    components: 'src/@commonsku/styles/*.tsx',
    propsParser: require('react-docgen-typescript').withCustomConfig(
        './tsconfig.json'
    ).parse,
    // CRA's ModuleScopePlugin blocks styleguidist loaders under node_modules.
    dangerouslyUpdateWebpackConfig(webpackConfig) {
        if (webpackConfig.resolve && Array.isArray(webpackConfig.resolve.plugins)) {
            webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
                (plugin) => !(plugin && plugin.constructor && plugin.constructor.name === 'ModuleScopePlugin')
            );
        }
        return webpackConfig;
    },
}
