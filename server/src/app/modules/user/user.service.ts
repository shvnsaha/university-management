import config from '../../config'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUSer } from './user.interface'
import { User } from './user.model'
import { generateStudentId } from './user.utils'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUSer> = {}

  user.password = password || (config.default_pass as string)
  user.role = 'student'

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  )

  //set  generated id
  user.id = await generateStudentId(admissionSemester)
  // user.id = '2030100001'

  const result = await User.create(user)

  if (Object.keys(result).length) {
    payload.id = result.id
    payload.user = result._id
  }

  const newStudent = await Student.create(payload)
  return newStudent
}

export const UserServices = {
  createStudentIntoDB,
}
