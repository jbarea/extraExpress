const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const _ = require('lodash');
const {hash,compare,genSalt} = require('bcrypt');
const {sign, verify} = require('jsonwebtoken');
const moment = require('moment');
const UserSchema = new mongoose.Schema({
    //minlength y maxlength estan para definir los limites en tamaño para los nombres de ususario
    username: {
        type: String,
        minlength: 4,
        maxlength: 25
    },
    name: {
        type: Object,
        first: {
            type: String
        },
        last: {
            type: String
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        required: false,
        default: 'user'
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            isAsync: true,
            validator: (email) => isEmail(email,{domain_specific_validation: true}), 
            message: '(VALUE) is not a valid email.'
        }
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
},
{
    strict: false
});

UserSchema.method('toJSON',  function () {
    const user = this;
    const userObject = user.toObject();

    return _.pick(userObject, ['role','_id','name','email'])
})

UserSchema.methods.findSimilarRoles = function () {
    return this.model('Users').find({role: this.role});
}

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';

    const genPayload = ({_id, access, expTime}) => {
        const payload = {
            access,
            _id: _id.toHexString(),
            iat: moment().valueOf(),
            exp: expTime ? expTime : moment().add(1, 'day').valueOf() / 1000
        }
        console.log(payload)
        return payload;
    } 
    const token = sign(genPayload({_id: this._id, access}),'jwt-salt').toString()
    console.log(token)
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token; // para poder seguir trabajando con las promesas(volvera al punto de llamada)
        
    })
 
}

UserSchema.method('removeAuthToken', function (token) {
    const user = this;

    return user.update({
        $pull: {
            tokens: { token }
        }
    })
})

UserSchema.pre('save', function(next) {
    const user = this;
    const saltRounds = process.env.NODE_ENV === 'production' ? 10 : 1;

    if(user.isModified('password')){
        //console.log('Password se ha modificado')
        genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            console.log(salt);
            hash(user.password, salt, (err, hashedPassword) => {
                //console.log(hashedPassword)
                if(err) return next(err);
                compare(user.password, hashedPassword, (err,res) => {
                    if (err) return next(err)

                    if (res) {
                        user.password = hashedPassword;
                        next();
                    }else{
                        next('Las contraseñas no coinciden en el save');
                    }
                })
                user.password = hashedPassword
                next()
            })
        })
    }else{
        console.log('Se ha guardado pero la constraseña no se ha modificado')
        next();
    }
})

const User = mongoose.model('Users', UserSchema);

module.exports = User;