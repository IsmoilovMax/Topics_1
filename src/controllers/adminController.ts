import { Request, Response } from 'express'
import { MemberType } from '@/libs/enums/member.enum'
import { T } from '@/libs/types/common'
import { AdminRequest, MemberInput } from '@/libs/types/users'
import {MemberService} from '@/models/Member.Service'

const memberService = new MemberService()
export const adminController: T = {}

adminController.goHome = (req: Request, res: Response) => {
	try {
		res.send('Admin Home')
	} catch (error) {
		console.log('Error, goHome', error)
		res.redirect('/admin')
	}
}

adminController.getSignup = (req: Request, res: Response) => {
	try {
		const { email, password } = req.body
		res.send('Success signup')
		console.log(email, password)
	} catch (error) {
		console.log('Error, getSignup', error)
		res.redirect('/admin')
	}
}

adminController.getLogin = (req: Request, res: Response) => {
	try {
		console.log('getSignup')
		res.send('Success login')
	} catch (error) {
		console.log('Error, getLogin', error)
		res.redirect('/admin')
	}
}

adminController.processSignup =async (req: AdminRequest, res: Response) => {
	try {
		console.log('processSignup')
		const file = req.file
		if (!file) throw new Error('File required')

		const newMember: MemberInput = req.body
		newMember.memberImage = file?.path.replace(/\\/g, '/')
		newMember.memberType = MemberType.ADMIN
        const result = await memberService
		res.send('Success Signup')
	} catch (error) {
		console.log('Error, processSignup', error)
		res.send(Error)
	}
}
