import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, MenuIcon, UserCircleIcon, UsersIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/dist/client/router';

function classNames (...classes) {
	return classes.filter(Boolean).join(' ');
}

function Header ({ placeholder }) {
	const [ searchInput, setSearchInput ] = useState('');
	const [ startDate, setStartDate ] = useState(new Date());
	const [ endDate, setEndDate ] = useState(new Date());
	const [ numberGuests, setNumberGuests ] = useState(1);
	const router = useRouter();

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
			{/* left */}
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
					className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
					type="text"
					placeholder={placeholder || 'Start your search'}
				/>
				<SearchIcon className="hidden md:inline h-8 bg-blue-500 text-white rounded-full p-2 cursor-pointer md:mx-2
                " />
			</div>

			{/* right */}
			<div className="flex items-center space-x-4 justify-end text-gray-500">
				<p className="hidden md:inline cursor-pointer">Become a host</p>
				<GlobeAltIcon className="h-6 cursor-pointer" />

				<Menu as="div" className="relative inline-block text-left">
					<div>
						<Menu.Button className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
							<MenuIcon className="h-6" />
							<UserCircleIcon className="h-6" />
						</Menu.Button>
					</div>

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
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active
													? 'bg-gray-100 text-gray-900'
													: 'text-gray-700',
												'font-bold block px-4 py-2 text-sm'
											)}
										>
											Log in
										</a>
									)}
								</Menu.Item>
								<form method="POST" action="#">
									<Menu.Item>
										{({ active }) => (
											<button
												type="submit"
												className={classNames(
													active
														? 'bg-gray-100 text-gray-900'
														: 'text-gray-700',
													'block w-full text-left px-4 py-2 text-sm'
												)}
											>
												Sign out
											</button>
										)}
									</Menu.Item>
								</form>
							</div>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>

			{/* search input & calendar range  */}
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
							className="w-12 pl-2 text-lg outline-none text-blue-500"
						/>
					</div>
					<div className="flex">
						<button className="flex-grow text-gray-500" onClick={resetInput}>
							Cancel
						</button>
						<button onClick={search} className="flex-grow text-blue-500">
							Search
						</button>
					</div>
				</div>
			)}
		</header>
	);
}

export default Header;
