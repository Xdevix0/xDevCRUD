import { FastifyPluginAsync } from "fastify"
import { prisma } from '../../../lib/prisma'

const authLogout: FastifyPluginAsync =  async (fastify, opts): Promise<void> => {
    fastify.post('/', async function (request, reply) {
        const authHeader = request.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.code(401).send({
                status: "err",
                msg: "Unauthorized"
            })
        }
        const token = authHeader.substring(7);
        await fastify.jwt.verify(token, async (err, decoded) => {
            if (err) {
                return reply.code(401).send({
                    status: "err",
                    msg: "Unauthorized"
                })
            }
            await prisma.authTokens.deleteMany({
                where: {
                    token: token
                }
            })
            return reply.code(200).send({
                status: "ok",
                msg: "Logged out successfully"
            })
        })

    })
}
export default authLogout