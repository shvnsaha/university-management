import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  // TStudentMethod,
  TUserName,
} from './student.interface'
import config from '../../config'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'firstName is required'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
})

const localGuradianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
})

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String },
    password: {
      type: String,
      required: true,
    },
    name: userNameSchema,
    gender: {
      type: String,
      enum: ['male', 'female'],
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: guardianSchema,
    localGuardian: localGuradianSchema,
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true } },
)

// middlewares:
studentSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.salt_rounds))
  next()
})

studentSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

// query middleware:
studentSchema.pre('find', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', async function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

// virtuals:
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
})

// static method:
studentSchema.statics.isUserExists = async (id: string) => {
  return await Student.findOne({ id })
}

// creating a custom instance method
// studentSchema.methods.isUserExists = async(id: string) =>{
//   return await Student.findOne({id})
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema)
