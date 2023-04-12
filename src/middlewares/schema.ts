export function withSchema(schema: any) {
    const entries = Object.keys(schema);

    return (request: Request) => {
        for(let key of entries) {
            if(request[key] == undefined)
                return Response.json({ message: `Bad schema validation, missing ${key} body.` }, { status: 400 });

            const properties = Object.keys(schema[key]);

            for(let property of properties) {
                if(request[key][property] == undefined && schema[key][property].required)
                   return Response.json({ message: `Bad ${key} schema validation, missing ${property} property.` }, { status: 400 });
            }
        }
    };
};
