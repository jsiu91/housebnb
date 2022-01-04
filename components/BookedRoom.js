import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import React from 'react';

function BookedRoom ({ img, location, title, description, star, price, total, range }) {
	return (
		<div className="grid grid-cols-5">
			{/* Left */}
			<Image src={img} height={200} width={200} objectFit="contain" alt="room-image" />

			{/* Middle */}
			<div className="col-span-3 mx-5">
				<p className="text-lg">From {range}</p>
				<p className="text-gray-500">{location}</p>
				<p>{title}</p>
				<div className="border-b w-100 pt-4" />
				<p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>
				<p className="flex items-center mt-5">
					<StarIcon className="h-5 text-blue-500" />
					{star}
				</p>
			</div>
			{/* Right */}
			<div className="flex flex-col space-y-3 my-auto justify-self-end">
				<p className="text-lg lg:text-2xl font-semibold align-text-bottom">{price}</p>
				<p className="text-right pr-5 font-extralight underline">{total}</p>
				<button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-900 hover:shadow-lg active:scale-95 border border-slate-300 active:bg-blue-700 transition transform duration-100 ease-out">
					Cancel Booking
				</button>
			</div>
		</div>
	);
}

export default BookedRoom;
