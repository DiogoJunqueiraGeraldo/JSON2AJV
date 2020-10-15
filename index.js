// I just don't like CamelCase in my scripts.
// if this project becomes open source I will change this weirdo "alias" stuff

const { 
    read_file,
    get_argv,
    json_parse,
    write_file,
    json_stringify
} = require('./alias');

const get_schema = require('./lib');

const [ source, target ] = get_argv();
const source_file = read_file(source);
const source_json = json_parse(source_file);
const source_schema = get_schema(source_json);

write_file(target, json_stringify(source_schema));