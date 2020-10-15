const type = data => {
    if(data === null)
        return 'null'
    
    if(Array.isArray(data))
        return 'array'

    return typeof data;
}

const schema_factory = {
    object: object => {
        const properties_list = Object.keys(object);

        const schema = {
            'type': 'object',
            'additionalProperties': false,
            'required': properties_list,
            'properties': {}
        }

        for(let prop of properties_list) {
            const prop_value = object[prop];
            const prop_type = type(prop_value);
            const prop_schema = schema_factory[prop_type](prop_value);
            schema.properties[prop] = prop_schema;
        }

        return schema;
    },

    array: array => {
        // I know a have to improve this method, but for now work's just fine.

        const [ item ] = array;
        const item_type =  type(item);

        const schema = {
            'type': 'array',
            'uniqueItems': true,
            'items': schema_factory[item_type](item)
        }

        return schema;
    },

    number: () => ({ 'type': 'number' }),
    string: () => ({ 'type': 'string' }),
    boolean: () => ({ 'type': 'boolean' }),
    null: () => ({ 'type': 'null' })
}

module.exports = data => schema_factory[type(data)](data);