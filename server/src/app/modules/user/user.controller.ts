import { UserServices } from './user.service'
import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(password, studentData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created succesfully',
    data: result,
  })
})

export const UserControllers = {
  createStudent,
}
