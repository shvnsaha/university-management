import { NextFunction, Request, Response } from 'express'
import { StudentServices } from './student.service'

import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB()

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student retrieved succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params

    const result = await StudentServices.getSingleStudentFromDB(studentId)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student retrieved succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params

    const result = await StudentServices.deleteStudentFromDB(id)

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student deleted succesfully',
      data: result,
    })
  } catch (err) {
    next(err)
  }
}

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
}
