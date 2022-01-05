import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';

// async function refreshAccessToken (token) {
// 	try {
// 		const url =
// 			'https://oauth2.googleapis.com/token?' +
// 			new URLSearchParams({
// 				client_id: process.env.GOOGLE_ID,
// 				client_secret: process.env.GOOGLE_SECRET,
// 				grant_type: 'refresh_token',
// 				refresh_token: token.refreshToken,
// 			});

//         const response = await fetch(url, {
//             headers:{
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//             method:"POST",
//         })

//         const refreshedTokens = await response.json()

//         if (!response.ok) {
//             throw refreshedTokens
//         }

//         return {
//             ...token,
//             accessToken: refreshedTokens.access_token,
//             accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
//             refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
//         }
// 	} catch (error) {
// 		console.log(error);

// 		return {
// 			...token,
// 			error: 'RefreshAccessTokenError',
// 		};
// 	}
// }

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		FacebookProvider({
			clientId: process.env.FACEBOOK_ID,
			clientSecret: process.env.FACEBOOK_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
		AppleProvider({
			clientId: process.env.APPLE_ID,
			clientSecret: process.env.APPLE_SECRET,
		}),
	],
	jwt: {
		encryption: true,
	},
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/login',
	},
	// callbacks: {
	// 	async jwt ({ token, account, user }) {
	// 		// initial sign in
	// 		if (account && user) {
	// 			return {
	// 				...token,
	// 				accessToken: account.access_token,
	// 				refreshToken: account.refresh_token,
	// 				username: account.providerAccountId,
	// 				accessTokenExpires: Date.now() + account.expires_at * 1000,
	// 				user, //1 hour
	// 			};
	// 		}

	// 		// return previous token if the access token has not expired yet
	// 		if (Date.now() < token.accessTokenExpires) {
	// 			return token;
	// 		}

	// 		// access token has expired
	// 		return await refreshAccessToken(token);
	// 	},
	// 	async session ({ session, token }) {
	// 		session.user = token.user;
	// 		session.accessToken = token.accessToken;
	// 		session.error = token.error;

	// 		return session;
	// 	},
	// },
});
