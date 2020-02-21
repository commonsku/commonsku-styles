module.exports = {
    components: 'src/@commonsku/styles/*.tsx',
    propsParser: require('react-docgen-typescript').withCustomConfig(
        './tsconfig.json'
    ).parse
}