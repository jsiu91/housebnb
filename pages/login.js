import { useFormik } from 'formik';
import { getProviders, signIn } from 'next-auth/react';
import HouseBnbApi from './api/api';
import Image from 'next/image';
import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Router from 'next/router';

function Login ({ providers }) {
	// A custom validation function. This must return an object
	// which keys are symmetrical to our values/initialValues
	const [ message, setMessage ] = useState('');

	const validate = (values) => {
		const errors = {};
		if (!values.username) {
			errors.username = 'Required.';
		} else if (values.username.length > 15) {
			errors.username = 'Must be 15 characters or less.';
		}
		if (!values.password) {
			errors.password = 'Required.';
		}
		return errors;
	};

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validate,
		onSubmit: async (values) => {
			try {
				const token = await HouseBnbApi.login(values);
				// cookie.set('token', token, { expires: 1 / 24 }); //Expires every hour
				await fetch('api/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ token: token }),
				});
				Router.push('/');
			} catch (error) {
				setMessage('Login failed. Please enter the correct username and password.');
				return { success: false, error };
			}
		},
	});
	return (
		<div>
			<Header />
			<main className="flex justify-center pt-6">
				<div className="flex flex-col space-y-2 justify-center items-center rounded-2xl border-slate-300">
					<div className="items-center">
						<h1 className="pt-6 pl-6 pr-6 text-2xl font-bold">
							Welcome to HouseBnb
						</h1>
					</div>

					{/* Login Form */}
					<div className="flex">
						<form
							onSubmit={formik.handleSubmit}
							className=" flex flex-col space-y-2 shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-[400px] lg:w-[600px] xl:w-[800px] 2xl:w-[900px]"
						>
							<label htmlFor="username" className="label">
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								onChange={formik.handleChange}
								value={formik.values.username}
								placeholder="Username"
								className="input"
							/>
							{formik.errors.username ? (
								<div className="error">{formik.errors.username}</div>
							) : null}

							<label htmlFor="password" className="label">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								onChange={formik.handleChange}
								value={formik.values.password}
								placeholder="******************"
								className="input"
							/>

							{formik.errors.password ? (
								<div className="error">{formik.errors.password}</div>
							) : null}

							<div className="mb-2" />

							<button
								className="bg-blue-500 rounded-2xl text-white text-lg p-2 font-bold"
								type="submit"
							>
								Login
							</button>

							<div className="error">{message}</div>
						</form>

						{/* List OAuth providers */}
						<div className="flex flex-col space-y-2 shadow-md justify-center items-center rounded px-8 pt-6 pb-8 mb-4 md:w-[400px] lg:w-[600px] xl:w-[800px] 2xl:w-[900px]">
							<div className="label">Login with</div>
							{Object.values(providers).map((provider) => (
								<div
									key={provider.name}
									className="justify-center items-center"
								>
									{/* Facebook */}
									{provider.name === 'Facebook' && (
										<button
											className="px-4 py-2 rounded-2xl cursor-pointer 
                                                text-white bg-blue-600 hover:shadow-lg hover:border-gray-900 active:scale-95 border border-slate-300  transition transform duration-100 ease-out"
											onClick={() =>
												signIn(provider.id, {
													callbackUrl:
														'/',
												})}
										>
											<Image
												src={
													'/facebook-logo.png'
												}
												width={25}
												height={25}
												objectFit="cover"
												alt="facebook-logo"
											/>
											Continue with Facebook
										</button>
									)}
									{/* Google */}
									{provider.name === 'Google' && (
										<button
											className="px-4 py-2 rounded-2xl cursor-pointer 
                                             hover:shadow-lg hover:border-gray-900 active:scale-95 border border-slate-300  transition transform duration-100 ease-out"
											onClick={() =>
												signIn(provider.id, {
													callbackUrl:
														'/',
												})}
										>
											<Image
												src={'/google-logo.png'}
												width={25}
												height={25}
												objectFit="cover"
												alt="google-logo"
											/>
											Continue with Google
										</button>
									)}
									{/* Apple */}
									{provider.name === 'Apple' && (
										<button
											className="px-4 py-2 rounded-2xl cursor-pointer text-white bg-black
                                             hover:shadow-lg hover:border-gray-900 active:scale-95 border border-slate-300  transition transform duration-100 ease-out"
											onClick={() =>
												signIn(provider.id, {
													callbackUrl:
														'/',
												})}
										>
											<Image
												src={'/apple-logo.png'}
												width={25}
												height={25}
												objectFit="cover"
												alt="apple-logo"
											/>
											Continue with Apple
										</button>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Login;

export async function getServerSideProps () {
	const providers = await getProviders();

	return {
		props: {
			providers,
		},
	};
}
