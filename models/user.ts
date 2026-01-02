import {Schema,model,models} from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: false,
        
    },
    
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!'],
    },
    username: {
    type: String,
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
    image: {
        type: String,
    },

    password:{
        type:String,
        required: false,
    },
});

const User = models.User || model('User', UserSchema);
export default User;