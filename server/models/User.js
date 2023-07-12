const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        outfits: [
            {
                type: Schema.Types.ObjectId,
                ref: 'outfit',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

const User = model('user', userSchema);

module.exports = User;


// const userSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true, 
//         unique: false,
//         trim: true,
//     },
//     lastName: {
//         type: String,
//         required: true, 
//         unique: false,
//         trim: true,
//     },
//     email: {
//         type: String,
//         required: true, 
//         unique: true,
//         match: [/.+@.+\..+/, 'Must match an email address!'],
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 6,
//     },
// });

// userSchema.pre('save', async function (next) {
//     if (this.isNew || this.isModified('password')) {
//         const saltRounds = 10;
//         this.password = await bcrypt.hash(this.password, saltRounds);
//     }

//     next();
// });

// profileSchema.methods.isCorrectPassword = async function (password) {
//     return bcrypt.compare(password, this.password);
// };

// const User = model('User', userSchema);

// module.exports = User;