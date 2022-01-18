import { getToken } from 'next-auth/jwt';

const secret = process.env.JWT_SECRET;

export default (jwt = async (req, res) => {
	const token = await getToken({ req, secret });
	console.log('JSON Web Token', token);
	res.end();
	return token;
});
