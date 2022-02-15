const cor = require('colors')
let configuration = require('../configuration.json')
module.exports = (client) => {
    if(configuration.config.language == 'EN'){
    console.log(cor.green('[INDEX] -')+' Loaded')}
    if(configuration.config.language == 'PT'){
        console.log(cor.green('[INDEX] -')+' Iniciada')}
}