import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { addToBooking } from '../slices/bookingSlice';
import { useDispatch } from 'react-redux';

function InfoCard ({ img, location, title, description, star, price, total, range }) {
	const dispatch = useDispatch();

	const addItemtoBooking = () => {
		const room = {
			img,
			location,
			title,
			description,
			star,
			price,
			total,
			range,
		};

		// Sending the room as action to the REDUX store... the booking slice
		dispatch(addToBooking(room));
	};

	return (
		<div className="flex py-7 px-2 pr-4 border-b hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
			<div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0 ">
				<Image
					src={img}
					layout="fill"
					objectFit="cover"
					className="rounded-2xl"
					alt="listing_image"
					priority
				/>
			</div>
			<div className="flex flex-col flex-grow pl-5">
				<div className="flex justify-between">
					<p className="text-gray-500">{location}</p>
					<HeartIcon className="h-7 cursor-pointer" />
				</div>

				<h4 className="text-xl">{title}</h4>

				<div className="border-b w-10 pt-2" />

				<p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

				<div className="flex justify-between items-end pt-5">
					<p className="flex items-center">
						<StarIcon className="h-5 text-blue-500" />
						{star}
					</p>

					<div>
						<p className="text-lg lg:text-2xl font-semibold pb-2">{price}</p>
						<p className="text-right font-extralight underline">{total}</p>

						<button
							className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-900 hover:shadow-lg active:scale-95 border border-slate-300 active:bg-blue-700 transition transform duration-100 ease-out"
							onClick={addItemtoBooking}
						>
							Add Booking
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InfoCard;
