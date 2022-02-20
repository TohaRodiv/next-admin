export type TFieldType =
    "string"    |
    "text"      |
    "email"     |
    "tel"       |
    "date"      |
    "datetime" |
    "password"  |
    "binary"    |
    "byte"      |
    "number"    |
    "boolean"   |
    "select"    |
    "multiple";

export type TFieldsSchema = {
    [fieldName: string]: {
        type: TFieldType,
        title?: string,
        minLength?: number,
        maxLength?: number,
        items?: any[], //TODO
        defaultValue?: any
        pattern?: RegExp
        required?: boolean
        readOnly?: boolean
        writeOnly?: boolean
        deprecated?: boolean
    }
}

export type TMethodsSchema = {
    create?: {
        schema: TFieldsSchema,
    },
    update?: {
        schema: TFieldsSchema,
        item?: any,
    },
    delete?: {
        item?: any,
    },
    findAll?: {
        schema: TFieldsSchema,
        items?: any[],
    },
    findById?: {
        schema: TFieldsSchema,
        item?: any,
    },
}



export type TEndpoint = {
    id: number,
    path: string,
    methods: TMethodsSchema,
    title: string,
}

export type TEndpointPaths = { [name: string]: any }