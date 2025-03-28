import { Request, Response } from 'express'
import { MemberType } from '../libs/enums/member.enum'
import { T } from '../libs/types/common'
import { AdminRequest, LoginInput, Member, MemberInput } from '../libs/types/users'
import { MemberService } from '../models/Member.service'
import Errors, { Message } from '../libs/utils/Errors'

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

adminController.processSignup = async (req: AdminRequest, res: Response) => {
	try {
		const newMember: MemberInput = req.body
		newMember.memberType = MemberType.ADMIN
		const result = await memberService.processSignup(newMember)

		req.session.member = result
		// req.session.save(function () {
		// 	res.redirect('/admin/product/all')
		// })
		res.send('Success')
	} catch (err) {
		console.log('Error, processSignup', err)
		const message = err instanceof Errors ? err.message : Message.SOMETHING_WENT_WRONG
		res.send(message)
	}
}

adminController.processLogin = async (req: AdminRequest, res: Response) => {
	try {
		const { memberNick, memberPassword }: LoginInput = req.body
		console.log(memberNick, memberPassword)

		const result = await memberService.processLogin(memberNick, memberPassword)

		res.send(result)
	} catch (err) {
		res.send(err).status(404)
	}
}
