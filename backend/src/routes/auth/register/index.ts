
import { PrismaClient } from '../../../../../generated/prisma'
const prisma = new PrismaClient()
import { type FastifyPluginAsync } from 'fastify'
interface RegisterBody {
    name: string
    surname: string
    email: string
    password: string
    phoneNumber: string
    birthday: string
}
const emptyToUndefined = (value: string) => {
    if (value === undefined || value.trim() === "") {
        return undefined;
    } else {
        return value;
    }
}
const authRegister: FastifyPluginAsync = async (fastify, opts): Promise<void> => {

    fastify.post<{ Body: RegisterBody }>('/', async function (request, reply) {

        const { name, surname, email, password, phoneNumber, birthday } = request.body as RegisterBody;
        if (emptyToUndefined(name) === undefined) {
            return reply.code(422).send({
                status: "err",
                msg: "Name is requided"
            })
        }
        if (emptyToUndefined(surname) === undefined) {
            return reply.code(422).send({
                status: "err",
                msg: "Surname is requided"
            })
        }
        if (emptyToUndefined(email) === undefined) {
            return reply.code(422).send({
                status: "err",
                msg: "Email is requided"
            })
        }
        if (emptyToUndefined(password) === undefined) {
            return reply.code(422).send({
                status: "err",
                msg: "Password is requided"
            })
        }
        if (emptyToUndefined(phoneNumber) === undefined) {
            return reply.code(422).send({
                status: "err",
                msg: "PhoneNumber is requided"
            })
        }
        if (emptyToUndefined(birthday)) {
            return reply.code(422).send({
                status: "err",
                msg: "BrithDay is requided"
            })
        }
        try {
            await prisma.user.create({
                data: {
                    name,
                    surname,
                    email,
                    password,
                    phoneNumber,
                    birthday: new Date(birthday),
                }
            })
            return reply.code(201).send({
                status: "ok",
                msg: "Succesfuly created account"
            })
        } catch (err: any) {
            if (err.code === 'P2002') {
                return reply.code(409).send({ status: "err", msg: "Email is exist" })
            }
            return reply.code(500).send({ status: "err", msg: "server error" })
        }



    })
}

export default authRegister
