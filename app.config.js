import 'dotenv/config'

export default ({config}) => ({
    ...config,
    extra: {
        port: process.env.PORT,
    }
})