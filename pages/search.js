import { useRouter } from 'next/dist/client/router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Map from '../components/Map';
import { format } from 'date-fns';
import InfoCard from '../components/InfoCard';

function Search ({ searchResults, token }) {
	// Next.js router
	const router = useRouter();
	const { location, startDate, endDate, numberGuests } = router.query;

	// Calendar formatting for search placeholder
	const formattedStartDate = format(new Date(startDate), 'MMM d');
	const formattedEndDate = format(new Date(endDate), 'MMM d, yyyy');
	const range = `${formattedStartDate} - ${formattedEndDate}`;

	return (
		<div>
			<Header placeholder={`${location} | ${range} | ${numberGuests} guests`} token={token} />

			{/* Search Queries */}
			<main className="flex">
				<section className="flex-grow pt-14 px-6">
					<p className="text-xs">
						300+ stays - {range} - for {numberGuests} guests
					</p>

					{/* Location */}
					<h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>

					{/* Category Buttons */}
					<div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
						<p className="button">Cancellation Flexibility</p>
						<p className="button">Type of Place</p>
						<p className="button">Price</p>
						<p className="button">Rooms and Beds</p>
						<p className="button">More filters</p>
					</div>

					{/* Info Cards */}
					<div className="flex flex-col">
						{searchResults.map(
							({ img, location, title, description, star, price, total }) => (
								<InfoCard
									key={img}
									img={img}
									location={location}
									title={title}
									description={description}
									star={star}
									price={price}
									total={total}
									range={range}
									token={token}
								/>
							)
						)}
					</div>
				</section>

				{/* MapBox Map */}
				<section className="hidden xl:inline-flex xl:min-w-[600px]">
					<Map searchResults={searchResults} />
				</section>
			</main>

			<Footer />
		</div>
	);
}

export default Search;

export async function getServerSideProps ({ req, res }) {
	const searchResults = await fetch('https://links.papareact.com/isz').then((res) => res.json());

	return {
		props: {
			searchResults,
			token: req.cookies.token || null,
		},
	};
}
