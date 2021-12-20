import React from 'react';

function Footer () {
	return (
		<div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-500">
			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">ABOUT</h5>
				<p>How HouseBnb works</p>
				<p>Newsroom</p>
				<p>Investors</p>
				<p>Airbnb Plus</p>
				<p>Airbnb Luxe</p>
			</div>
			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">COMMUNITY</h5>
				<p>Accessibility</p>
				<p>More</p>
				<p>Amazing</p>
				<p>Things</p>
				<p>To code on these page</p>
			</div>
			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">HOST</h5>
				<p>A</p>
				<p>B</p>
				<p>C</p>
				<p>D</p>
				<p>E</p>
			</div>
			<div className="space-y-4 text-xs text-gray-800">
				<h5 className="font-bold">SUPPORT</h5>
				<p>Alright</p>
				<p>You</p>
				<p>Can Add</p>
				<p>More</p>
				<p>Cool tabs</p>
			</div>
		</div>
	);
}

export default Footer;
