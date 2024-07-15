import { NextFunction, Request, Response } from 'express'
import { UserServices } from './user.service'

import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body

    const result = await UserServices.createStudentIntoDB(password, studentData)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student created succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const UserControllers = {
  createStudent,
}
