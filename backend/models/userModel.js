const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema

const profileSchema = Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    }
})

const Profile = mongoose.model("profiles", profileSchema);

module.exports = Profile