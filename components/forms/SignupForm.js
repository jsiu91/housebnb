import React from 'react';
import { useFormik } from 'formik';

const SignupForm = () => {
	const formik = useFormik({
		initialValues: {
			username: '',
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			alert(JSON.stringify(values.null, 2));
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<label htmlFor="username">Username:</label>
			<input
				type="text"
				id="username"
				name="username"
				onChange={formik.handleChange}
				value={formik.values.username}
			/>
			<label htmlFor="firstName">First Name:</label>
			<input
				type="text"
				id="firstName"
				name="firstName"
				onChange={formik.handleChange}
				value={formik.values.firstName}
			/>
			<label htmlFor="lastName">Last Name:</label>
			<input
				type="text"
				id="lastName"
				name="lastName"
				onChange={formik.handleChange}
				value={formik.values.lastName}
			/>
			<label htmlFor="email">Email:</label>
			<input
				type="email"
				id="email"
				name="email"
				onChange={formik.handleChange}
				value={formik.values.email}
			/>
			<label htmlFor="password">Password:</label>
			<input
				type="password"
				id="password"
				name="password"
				onChange={formik.handleChange}
				value={formik.values.password}
			/>

			<button type="submit">Submit</button>
		</form>
	);
};

export default SignupForm;
