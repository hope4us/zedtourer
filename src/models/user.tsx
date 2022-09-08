import bcrypt from 'bcryptjs'
import model, {builder} from '../helpers/model'

const collection = 'users'

const device = {
    id: {
        type: String,
        sparse: true,
        unique: true
    },
    token: {
        type: String,
        sparse: true,
        unique: true
    }
}

const schema = builder(collection, {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        sparse: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        trim: true,
        sparse: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

schema.pre('save', function (next: any) {
    // @ts-ignore
    if (!(this.isNew || this.isModified('password'))) return next()

    bcrypt.genSalt(10, (error, salt) => {
        if (error) return next(error)
        // @ts-ignore
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (error) return next(error)
            // @ts-ignore
            this.password = hash
            next()
        })
    })
})

schema.methods.comparePasswords = async function (candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default model(collection, schema)
