import {expressjwt} from 'express-jwt'
import jwksRsa from 'jwks-rsa'
import dotenv from 'dotenv'

dotenv.config({ silent: true })

const domain = process.env.NODE_ENV === "production"? process.env.AUTH0_DOMAIN : process.env.AUTH0_DOMAIN_DEV;

const checkJwt = expressjwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        jwksUri: `https://${domain}/.well-known/jwks.json`,
    }),

    audience: `https://${domain}/api/v2/`,
    algorithms: ['RS256']
})

export default checkJwt;
