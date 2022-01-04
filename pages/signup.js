import React from 'react';
import { useFormik } from 'formik';
import HouseBnbApi from './api/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Router from 'next/router';

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

const validate = (values) => {
	const errors = {};
	if (!values.username) {
		errors.username = 'Required.';
	} else if (values.username.length > 15) {
		errors.username = 'Must be 15 characters or less.';
	}
	if (!values.firstName) {
		errors.firstName = 'Required.';
	} else if (values.firstName.length > 15) {
		errors.firstName = 'Must be 15 characters or less.';
	}
	if (!values.lastName) {
		errors.lastName = 'Required.';
	} else if (values.lastName.length > 20) {
		errors.lastName = 'Must be 20 characters or less.';
	}
	if (!values.email) {
		errors.email = 'Required.';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid email address.';
	}

	return errors;
};

const SignupForm = () => {
	const formik = useFormik({
		initialValues: {
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		validate,
		onSubmit: (values) => {
			HouseBnbApi.signup(values);
			Router.push('/');
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

					<div className="flex">
						<form
							onSubmit={formik.handleSubmit}
							className=" flex flex-col space-y-2 shadow-md rounded px-8 pt-6 pb-8 mb-4 md:w-[400px] lg:w-[600px] xl:w-[800px] 2xl:w-[900px]"
						>
							<label
								htmlFor="username"
								className="label focus:outline-none focus:shadow-outline"
							>
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

							<label htmlFor="firstName" className="label">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								onChange={formik.handleChange}
								value={formik.values.firstName}
								placeholder="First Name"
								className="input"
							/>
							{formik.errors.firstName ? (
								<div className="error">{formik.errors.firstName}</div>
							) : null}

							<label htmlFor="lastName" className="label">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								onChange={formik.handleChange}
								value={formik.values.lastName}
								placeholder="Last Name"
								className="input"
							/>
							{formik.errors.lastName ? (
								<div className="error">{formik.errors.lastName}</div>
							) : null}

							<label htmlFor="email" className="label">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								onChange={formik.handleChange}
								value={formik.values.email}
								placeholder="Email"
								className="input"
							/>
							{formik.errors.email ? (
								<div className="error">{formik.errors.email}</div>
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

							<div className="mb-2" />
							<button
								className="bg-blue-500 rounded-2xl text-white text-lg p-2 font-bold"
								type="submit"
							>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default SignupForm;
