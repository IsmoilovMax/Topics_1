import { Session } from 'express-session'
import { Request } from 'express'
import { Multer } from 'multer'

import { Types } from 'mongoose'
import { MemberStatus, MemberType } from '../enums/member.enum'

export interface Member {
	_id: Types.ObjectId
	memberType: MemberType
	memberStatus: MemberStatus
	memberNick: string
	memberPhone: string
	memberPassword: string
	memberAdress: string
	memberDesc: string
	memberImage: string
	memberPoints: number
	createdAt: Date
	updatedAt: Date
}

export interface MemberInput {
	memberType?: MemberType
	memberStatus?: MemberStatus
	memberNick: string
	memberPhone: string
	memberPassword: string
	memberAdress?: string
	memberDesc?: string
	memberImage: string
	memberPoints?: number
}

export interface LoginInput {
	memberNick: string
	memberPassword: string
}

export interface AdminRequest extends Request {
	member: any
	session: Session & { member: any }
	file: Express.Multer.File
	files: Express.Multer.File[]
}
