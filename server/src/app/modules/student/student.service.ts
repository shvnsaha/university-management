import { Types } from 'mongoose'
import { TStudent } from './student.interface'
import { Student } from './student.model'

const createStudentIntoDB = async (payload: TStudent) => {
  if (await Student.isUserExists(payload.id)) {
    throw new Error('User already exists')
  }

  const result = await Student.create(payload) //built in static method:

  // built in instance method:
  // const student = new Student(payload);
  // if(await student.isUserExists(payload?.id)){
  //   throw new Error('User already exists')
  // }
  // const result = await student.save()
  return result
}

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
  return result
}

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.findById(id)
  const result = await Student.aggregate([
    {
      $match: { _id: new Types.ObjectId(id) },
    },
  ])
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.findByIdAndUpdate(id, { isDeleted: true })
  return result
}

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
}
