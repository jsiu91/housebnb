import Head from 'next/head';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import Header from '../components/Header';
import LargeCard from '../components/LargeCard';
import MediumCard from '../components/MediumCard';
import SmallCard from '../components/SmallCard';
import styles from '../styles/Home.module.css';

export default function Home ({ exploreData, cardsData, token }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>HouseBnb</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Header token={token} />
			<Banner />

			<main className="max-w-7xl mx-auto px-8 sm:px-16 shadow-lg">
				<section className="pt-6">
					<h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
					{/* Pull data from server - Server Side Rendering */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{exploreData.map(({ img, distance, location }) => (
							<SmallCard
								key={img}
								img={img}
								distance={distance}
								location={location}
							/>
						))}
					</div>
				</section>

				<section>
					<h2 className="text-4xl font-semibold py-8">Live Anywhere</h2>

					<div className="flex space-x-3 overflow-x-scroll scrollbar-hide p-3 -ml-3">
						{cardsData.map(({ img, title }) => (
							<MediumCard key={img} img={img} title={title} />
						))}
					</div>
				</section>

				<LargeCard
					img="https://links.papareact.com/4cj"
					title="The Greatest Outdoors"
					description="Wishlists curated by HouseBnb."
					buttonText="Get Inspired"
				/>
			</main>

			<Footer />
		</div>
	);
}

export async function getServerSideProps ({ req, res }) {
	const exploreData = await fetch('https://www.jsonkeeper.com/b/4G1G').then((res) => res.json());

	const cardsData = await fetch('https://www.jsonkeeper.com/b/VHHT').then((res) => res.json());

	return {
		props: {
			exploreData,
			cardsData,
			token: req.cookies.token || null,
		},
	};
}
