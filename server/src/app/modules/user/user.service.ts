import mongoose from 'mongoose'
import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUSer } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'
import AppError from '../../error/AppError'
import httpStatus from 'http-status'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUSer> = {}

  user.password = password || (config.default_pass as string)
  user.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    user.id = await generateStudentId(admissionSemester)
    // user.id = '2030100001'
    const result = await User.create([user], { session })

    if (!result.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    payload.id = result[0].id
    payload.user = result[0]._id

    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to create student')
  }
}

export const UserServices = {
  createStudentIntoDB,
}
