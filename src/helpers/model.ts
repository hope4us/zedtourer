import {model, models, Schema} from 'mongoose'
import virtuals from 'mongoose-lean-virtuals'

export const transform = (ret: any) => {
    delete ret._id
    delete ret.__v
    delete ret.password
    delete ret.createdAt
    delete ret.updatedAt
    return ret
}

export const embed = (definition = {id: String, name: String}) =>
    ({_id: false, ...definition})

export const builder = (collection: string, definition: any, options?: any) => {
    definition.updatedBy = embed()
    definition.deletedAt = {
        type: Date
    }
    const schema: any = new Schema<any>(definition, {...options, timestamps: true, collection})
    schema.plugin(virtuals)

    schema.set('toObject', {getters: true, virtuals: true})

    if (!schema.options.toObject) schema.options.toObject = {}
    schema.options.toObject.transform = (doc: any, ret: any) => transform(ret)

    return schema
}

export default function helper<T>(collection: string, schema: Schema<T>) {
    return models[collection] || model(collection, schema)
}