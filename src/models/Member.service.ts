import { MemberType } from '../libs/enums/member.enum'
import { Member, MemberInput } from '../libs/types/users'
import Errors, { HttpCode, Message } from '../libs/utils/Errors'
import MemberModel from '../schema/Member.model'
import bcrypt from 'bcrypt'

export class MemberService {
	private readonly memberModel

	constructor() {
		this.memberModel = MemberModel
	}

	/**SinglePageApplication */

	/**Server Side Rendering */

	async processSignup(input: MemberInput): Promise<Member> {
		const exist = await this.memberModel.findOne({ memberType: MemberType.ADMIN }).exec()
		if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)

		const salt = await bcrypt.genSalt(10)
		input.memberPassword = await bcrypt.hash(input.memberPassword, salt)

		try {
			const result = await this.memberModel.create(input)
			result.memberPassword = ''

			return result as Member
		} catch (error) {
			throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED)
		}
	}
}
