import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { GlobeAltIcon, MenuIcon, UserCircleIcon, HomeIcon, SearchIcon } from '@heroicons/react/solid';

function classNames (...classes) {
	return classes.filter(Boolean).join(' ');
}

function Header () {
	return (
		<header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">
			{/* left */}
			<div className="relative flex items-center h-10 cursor-pointer my-auto">
				<HomeIcon className="h-8 text-blue-500" />
				<p className="text-lg p-1 pt-2 font-bold text-blue-500 ">HouseBnb</p>
			</div>

			{/* middle - Search */}
			<div className="flex items-center md:border-2 rounded-full py-2 md:shadow-sm">
				<input
					className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
					type="text"
					placeholder="Start your search"
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
		</header>
	);
}

export default Header;
