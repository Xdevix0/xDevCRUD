import { type FastifyPluginAsync } from 'fastify'

const auth: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/auth/', async function (request, reply) {
    return (
        {
            status: "error",
            msg: "Incorrect url"
        }
    )
  })
}

export default auth
