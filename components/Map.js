import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/solid';
import { getCenter, isPointNearLine } from 'geolib';

function Map ({ searchResults }) {
	const [ selectedLocation, setSelectedLocation ] = useState({});

	// Transform the search result object into the {latitude: 52.516752, longitude: 13.3777772}
	const coordinates = searchResults.map((result) => ({
		latitude: result.lat,
		longitude: result.long,
	}));

	const center = getCenter(coordinates);

	const [ viewport, setViewPort ] = useState({
		width: '100%',
		height: '100%',
		latitude: center.latitude,
		longitude: center.longitude,
		zoom: 11,
	});

	return (
		<ReactMapGL
			mapStyle="mapbox://styles/jsiu91/ckxgnfdg4100a14ql15fot1vt"
			mapboxApiAccessToken={process.env.mapbox_key}
			{...viewport}
			onViewportChange={(viewport) => setViewPort(viewport)}
			className="rounded-2xl"
		>
			{searchResults.map((item) => (
				<div key={item.long}>
					<Marker
						longitude={item.long}
						latitude={item.lat}
						offsetLeft={-20}
						offsetTop={-10}
					>
						<p
							onClick={() => setSelectedLocation(item)}
							className="cursor-pointer text-2xl animate-bounce"
							aria-label="push-pin"
						>
							<p className="p-1 text-center text-base rounded-full cursor-pointer bg-white border-slate-300 active:bg-black active:text-white ">
								{item.price.slice(0, -8)}
							</p>
						</p>
					</Marker>

					{/* The popup that should show if we click on a Marker */}
					{selectedLocation.long === item.long ? (
						<div className="flex cursor-pointer w-20">
							<Popup
								onClose={() => setSelectedLocation({})}
								closeOnClick={true}
								latitude={item.lat}
								longitude={item.long}
								className="rounded-full"
							>
								<div className="relative h-60 w-15 border-0">
									<Image
										src={item.img}
										layout="fill"
										objectFit="cover"
										className="rounded-2xl"
										alt="pin_image"
									/>
								</div>
								<div className="pt-4 pl-2">
									<p className="flex">
										<StarIcon className="h-5 text-blue-500" />
										{item.star}
									</p>
									<p className="text-xl">{item.location}</p>
									<p className="font-bold">{item.price}</p>
								</div>
							</Popup>
						</div>
					) : (
						false
					)}
				</div>
			))};
		</ReactMapGL>
	);
}

export default Map;
