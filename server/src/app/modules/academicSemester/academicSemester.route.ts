import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AcademicSemesterValidations } from './academicSemester.validation'
import { AcademicSemesterControllers } from './academicSemester.controller'

const router = Router()

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
)

router.get(
  '/:semesterId',
  AcademicSemesterControllers.getSingleAcademicSemester,
)

router.patch(
  '/:semesterId',
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
)

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters)

export const AcademicSemesterRoutes = router
