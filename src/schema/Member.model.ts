import { MemberStatus, MemberType } from '../libs/enums/member.enum'
import mongoose, { Schema } from 'mongoose'

const memberSchema = new Schema(
	{
		memberType: {
			type: String,
			enum: MemberType,
			default: MemberType.USER
		},

		memberStatus: {
			type: String,
			enum: MemberStatus,
			default: MemberStatus.ACTIVE
		},

		memberName: {
			type: String,
			index: { unique: true, sparse: true },
			required: true
		},

		memberPhone: {
			type: String,
			index: { unique: true, sparse: true },
			required: true
		},

		memberPassword: {
			type: String,
			select: false,
			required: true
		},

		memberAdress: {
			type: String
		},

		memberDesc: {
			type: String
		},

		memberImage: {
			type: String
		},

		memberPoints: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true } // createdAt, updatedAt
)

export default mongoose.model('Member', memberSchema)
