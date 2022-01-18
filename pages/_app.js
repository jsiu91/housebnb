import '../styles/globals.css';
import Router from 'next/router';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import ProgressBar from '@badrap/bar-of-progress';

//** Progress Bar (badrap)*/
const progress = new ProgressBar({
	size: 4,
	className: 'z-50 text-blue-500',
	delay: 100,
});

//** Loading bar events when between routes */
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp ({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</SessionProvider>
	);
}

export default MyApp;
