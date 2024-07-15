import config from '../../config'
import { TStudent } from '../student/student.interface'
import { Student } from '../student/student.model'
import { TUSer } from './user.interface'
import { User } from './user.model'

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUSer> = {}

  user.password = password || (config.default_pass as string)
  user.role = 'student'
  user.id = '2030100001'

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
