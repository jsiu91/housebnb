import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BookedRoom from '../components/BookedRoom';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/bookingSlice';

function Checkout () {
	const items = useSelector(selectItems);

	return (
		<div>
			<Header />
			<main className="lg:flex max-w-screen-2xl mx-auto">
				{/* Bookings */}
				<div className="flex flex-col p-5 space-y-10 bg-white">
					<h1 className="text-3xl border-b pb-4">
						{items.length === 0 ? 'There are no rooms booked.' : 'Your Bookings'}
					</h1>

					{items.map(
						(
							{
								img,
								location,
								title,
								description,
								star,
								price,
								total,
								range,
							},
							i
						) => (
							<BookedRoom
								key={i}
								img={img}
								location={location}
								title={title}
								description={description}
								star={star}
								price={price}
								total={total}
								range={range}
							/>
						)
					)}
				</div>
				{/* Right */}
				<div />
			</main>

			<Footer />
		</div>
	);
}

export default Checkout;
