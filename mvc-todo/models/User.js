const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
})
const bcrypt = require('bcrypt')   // put this up top with the mongoose import

UserSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)