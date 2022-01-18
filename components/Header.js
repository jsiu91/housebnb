import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';
import { useSelector } from 'react-redux';
import { selectItems } from '../slices/bookingSlice';

function classNames (...classes) {
	return classes.filter(Boolean).join(' ');
}

function Header (props) {
	const [ searchInput, setSearchInput ] = useState('');
	const [ startDate, setStartDate ] = useState(new Date());
	const [ endDate, setEndDate ] = useState(new Date());
	const [ numberGuests, setNumberGuests ] = useState(1);
	const router = useRouter();
	const items = useSelector(selectItems);
	const { data: session } = useSession();
	const user = jwt.decode(props.token, process.env.JWT_SECRET);

	const selectionRange = {
		startDate: startDate,
		endDate: endDate,
		key: 'selection',
	};

	const handleSelect = (ranges) => {
		setStartDate(ranges.selection.startDate);
		setEndDate(ranges.selection.endDate);
	};

	const resetInput = () => {
		setSearchInput('');
	};

	const search = () => {
		router.push({
			pathname: '/search',
			query: {
				location: searchInput,
				startDate: startDate.toISOString(),
				endDate: endDate.toISOString(),
				numberGuests,
			},
		});
	};

	return (
		<header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
			{/* left - Logo */}
			<div
				className="relative flex items-center h-10 cursor-pointer my-auto"
				onClick={() => router.push('/')}
			>
				<HomeIcon className="h-8 text-blue-500" />
				<p className="text-lg p-1 pt-2 font-bold text-blue-500 ">HouseBnb</p>
			</div>

			{/* middle - Search */}
			<div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
				<input
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					className="flex-grow pl-5 bg-transparent outline-none text-sm placeholder-gray-500"
					type="text"
					placeholder={props.placeholder || 'Start your search'}
				/>
				<SearchIcon className="hidden md:inline h-8 bg-blue-500 text-white rounded-full p-2 cursor-pointer md:mx-2
                " />
			</div>

			{/* right - User */}
			<div className="flex items-center space-x-4 justify-end text-gray-500">
				<p className="hidden lg:inline p-3 cursor-pointer rounded-full hover:bg-gray-100 font-bold">
					Become a Host
				</p>
				<p className="p-3 cursor-pointer rounded-full hover:bg-gray-100 font-bold">
					<GlobeAltIcon className="h-6" />
				</p>
				{(session && `Hello, ${session.user.name}`) ||
					(user && `Hello, ${user.firstName} ${user.lastName}`)}
				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="flex border-2 p-2 rounded-full cursor-pointer hover:shadow-md">
							<MenuIcon className="h-7 mr-2" />
							{session ? (
								<Image
									src={session.user.image}
									width={30}
									height={30}
									className="relative rounded-full"
									alt="profile-picture"
								/>
							) : (
								<UserCircleIcon className="h-7" />
							)}
						</Menu.Button>
					</div>

					{/* Menu Dropdown */}
					<Transition
						as={Fragment}
						enter="transition ease-out duration-100"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
							<div className="py-1">
								{!(session || user) && (
									<div>
										{/* Login */}
										<Menu.Item>
											{({ active }) => (
												<a
													onClick={() =>
														router.push(
															'/login'
														)}
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'font-bold block px-4 py-2 text-sm cursor-pointer'
													)}
												>
													Log in
												</a>
											)}
										</Menu.Item>
										{/* Sign Up */}
										<Menu.Item>
											{({ active }) => (
												<a
													onClick={() =>
														router.push(
															'/signup'
														)}
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm cursor-pointer'
													)}
												>
													Sign up
												</a>
											)}
										</Menu.Item>
									</div>
								)}
								{(session || user) && (
									<div>
										<Menu.Item>
											{({ active }) => (
												<a
													onClick={() =>
														router.push(
															'/booking'
														)}
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block px-4 py-2 text-sm cursor-pointer'
													)}
												>
													<span className="absolute right-5 h-5 w-5 bg-blue-500 text-center
                                                        text-white font-bold rounded-full">
														{
															items.length
														}
													</span>
													Bookings
												</a>
											)}
										</Menu.Item>
										{/* Sign Out */}
										<Menu.Item>
											{({ active }) => (
												<button
													className={classNames(
														active
															? 'bg-gray-100 text-gray-900'
															: 'text-gray-700',
														'block w-full text-left px-4 py-2 text-sm cursor-pointer font-bold'
													)}
													onClick={async () =>
														session
															? signOut()
															: await fetch(
																	'api/logout',
																	{
																		method:
																			'POST',
																		headers: {
																			'Content-Type':
																				'application/json',
																		},
																		body: JSON.stringify(
																			{}
																		),
																	} &&
																		router.push(
																			'/'
																		)
																)}
												>
													Sign out
												</button>
											)}
										</Menu.Item>
									</div>
								)}
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			{/* Search input & calendar range  */}
			{searchInput && (
				<div className="flex flex-col col-span-3 mx-auto">
					<DateRangePicker
						ranges={[ selectionRange ]}
						minDate={new Date()}
						onChange={handleSelect}
					/>
					<div className="flex items-center border-b mb-4">
						<h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>

						<UsersIcon className="h-5" />
						<input
							value={numberGuests}
							onChange={(e) => setNumberGuests(e.target.value)}
							type="number"
							min={1}
							className="w-12 pl-3 text-lg outline-none text-blue-500 font-bold"
						/>
					</div>
					<div className="flex">
						<button
							className="flex-grow bg-gray-500 text-white rounded-full"
							onClick={resetInput}
						>
							Cancel
						</button>
						<button
							onClick={search}
							className="p-2 font-bold flex-grow bg-blue-500 rounded-full text-white"
						>
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	);
}

export default Header;
