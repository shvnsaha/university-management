import { model, Schema } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Months,
    },
  },
  {
    timestamps: true,
  },
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.find({
    year: this.year,
    name: this.name,
  })
  if (isSemesterExists) {
    throw new Error('Semester is already exist')
  }
  next()
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)
