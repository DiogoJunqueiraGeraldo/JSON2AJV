const {
    readFileSync,
    writeFileSync,
} = require('fs');

const {
    parse,
    stringify
} = JSON;

module.exports = {
    read_file: readFileSync,
    write_file: writeFileSync,
    get_argv: () => process.argv.slice(2),
    json_parse: parse,
    json_stringify: stringify
}