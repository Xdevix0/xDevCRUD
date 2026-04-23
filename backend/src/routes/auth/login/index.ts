import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcryptjs'

import { type FastifyPluginAsync } from 'fastify'
interface LoginBody {
    email: string
    password: string
}
const emptyToUndefined = (value: string) => {
    if (value === undefined || value.trim() === "") {
        return undefined;
    } else {
        return value;
    }
}
const authLogin: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.post<{ Body: LoginBody }>('/', async function (request, reply) {

        const {email, password} = request.body as LoginBody;
        if(emptyToUndefined(email) === undefined){
            return reply.code(400).send({
                status: "err",
                msg: "Email is required"
            })
        }
        if(emptyToUndefined(password) === undefined){
            return reply.code(400).send({
                status: "err",
                msg: "Password is required"
            })
        }
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if (!user){
                return reply.code(400).send({
                    status: "err",
                    msg: "Incorect mail or password"
                })
            }
            const valid = await bcrypt.compare(password, user.password)
            if(!valid){
                return reply.code(400).send({
                    status: "err",
                    msg: "Incorect mail or password"
                })
            }
            const token = fastify.jwt.sign({userId: user.id})
            await prisma.authTokens.create({
                data: {
                    token: token,
                    expiresAt: new Date(Date.now() + 1 * 12 * 60 * 60 * 1000),
                    userId: user.id,
                    
                }
            })
            return reply.code(201).send({
                status: "ok",
                token,
                msg: "Succesfuly login account"
            })
        } catch (err: any) {

            return reply.code(500).send({ status: "err", msg: "server error", error: err })
        }



    })
}

export default authLogin
