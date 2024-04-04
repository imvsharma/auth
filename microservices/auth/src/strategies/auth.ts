import passport from "passport";
import { Strategy as LocalStrategy, IStrategyOptions, VerifyFunction } from "passport-local";
import MessageBroker from "../services/messaging-query.service";

const GET_USER_DETAILS_QUEUE = "get-user-details"

export const setupPassport = (passport: any) => {
    passport.use('signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
      }, async (req, username, password, done) => {
        let data;
            try {
                console.log(req.body)
                await sendUserDetails(req.body)
                const messageBroker = new MessageBroker("got-user-details")
                await messageBroker.init()
                messageBroker.channel.consume("got-user-details", async (msg) => {
                    console.log(msg?.content.toString())
                    let data = JSON.parse(msg?.content.toString()!)
                    console.log(data)
                    return done(null, data)
                    
                }, {
                    // automatic acknowledgment mode,
                    // see /docs/confirms for details
                    noAck: true
                  })
                // console.log(data)
                
            } catch (error) {
                return done(error)
            }
            
      } ))
}

const  sendUserDetails = async (data:any) => {
    const messageBroker = new MessageBroker(GET_USER_DETAILS_QUEUE);
    //await messageBroker.init()
    await messageBroker.sendMessage(JSON.stringify(data))
}

const getUserDetails = async () => {
    const messageBroker = new MessageBroker("got-user-details")
}