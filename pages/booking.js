import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BookedRoom from '../components/BookedRoom';
import { useSelector } from 'react-redux';
import { selectItems, selectTotal } from '../slices/bookingSlice';
import { useSession } from 'next-auth/react';

function Checkout () {
	const items = useSelector(selectItems);
	const total = useSelector(selectTotal);
	const { data: session } = useSession();

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
				<div className="flex flex-col bg-white p-10">
					{items.length > 0 && (
						<div>
							<h2 className="whitespace-nowrap">
								Subtotal ({items.length} items): {' '}
								<span className="font-bold">
									{new Intl.NumberFormat('en-US', {
										style: 'currency',
										currency: 'GBP',
									}).format(total)}
								</span>
							</h2>

							<button className={`button mt-2 bg-blue-500 text-white`}>
								{!session ? (
									'Sign in to checkout'
								) : (
									'Proceed to checkout'
								)}
							</button>
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default Checkout;
