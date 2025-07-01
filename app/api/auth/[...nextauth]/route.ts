import NextAuth, { Session } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectedToDB } from '@utils/database';
import User from '../../../../models/user'; 

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

// console.log({
//     clientId: process.env.GOOGLE_ID!,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
// });

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            httpOptions: {
        timeout: 10000, // 10 seconds
      },
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user?.email
            });
            if (session.user && sessionUser) {
                session.user.id = sessionUser._id.toString();
            }
            return session;
        },
        async signIn({ profile }) {
            try{
                if (!profile) {
                    return false;
                }
                await connectedToDB();

                // check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                // if not , create a new user
                if(!userExists){
                    await User.create({
                        email:profile?.email,
                        username: profile.name?.replace(" ","").toLowerCase(),
                        image: (profile as any)?.picture
                    })
                }

                return true
            } catch(error){
                console.log(error)
                return false;
            }
        }
        
    }
})

export { handler as GET, handler as POST };