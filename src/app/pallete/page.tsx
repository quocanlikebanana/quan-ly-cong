"use client";

import React from 'react';

const ColorPalette = () => {
	const colorGroups = [
		{
			name: 'Egyptian Blue',
			baseClass: 'bg-egyptian-blue',
			colors: [
				{ name: '100', bgClass: 'bg-egyptian-blue-100', textClass: 'text-egyptian-blue-100', tailwindClass: 'egyptian-blue-100' },
				{ name: '200', bgClass: 'bg-egyptian-blue-200', textClass: 'text-egyptian-blue-200', tailwindClass: 'egyptian-blue-200' },
				{ name: '300', bgClass: 'bg-egyptian-blue-300', textClass: 'text-egyptian-blue-300', tailwindClass: 'egyptian-blue-300' },
				{ name: '400', bgClass: 'bg-egyptian-blue-400', textClass: 'text-egyptian-blue-400', tailwindClass: 'egyptian-blue-400' },
				{ name: '500', bgClass: 'bg-egyptian-blue-500', textClass: 'text-egyptian-blue-500', tailwindClass: 'egyptian-blue-500' },
				{ name: '600', bgClass: 'bg-egyptian-blue-600', textClass: 'text-egyptian-blue-600', tailwindClass: 'egyptian-blue-600' },
				{ name: '700', bgClass: 'bg-egyptian-blue-700', textClass: 'text-egyptian-blue-700', tailwindClass: 'egyptian-blue-700' },
				{ name: '800', bgClass: 'bg-egyptian-blue-800', textClass: 'text-egyptian-blue-800', tailwindClass: 'egyptian-blue-800' },
				{ name: '900', bgClass: 'bg-egyptian-blue-900', textClass: 'text-egyptian-blue-900', tailwindClass: 'egyptian-blue-900' },
			]
		},
		{
			name: 'True Blue',
			baseClass: 'bg-true-blue',
			colors: [
				{ name: '100', bgClass: 'bg-true-blue-100', textClass: 'text-true-blue-100', tailwindClass: 'true-blue-100' },
				{ name: '200', bgClass: 'bg-true-blue-200', textClass: 'text-true-blue-200', tailwindClass: 'true-blue-200' },
				{ name: '300', bgClass: 'bg-true-blue-300', textClass: 'text-true-blue-300', tailwindClass: 'true-blue-300' },
				{ name: '400', bgClass: 'bg-true-blue-400', textClass: 'text-true-blue-400', tailwindClass: 'true-blue-400' },
				{ name: '500', bgClass: 'bg-true-blue-500', textClass: 'text-true-blue-500', tailwindClass: 'true-blue-500' },
				{ name: '600', bgClass: 'bg-true-blue-600', textClass: 'text-true-blue-600', tailwindClass: 'true-blue-600' },
				{ name: '700', bgClass: 'bg-true-blue-700', textClass: 'text-true-blue-700', tailwindClass: 'true-blue-700' },
				{ name: '800', bgClass: 'bg-true-blue-800', textClass: 'text-true-blue-800', tailwindClass: 'true-blue-800' },
				{ name: '900', bgClass: 'bg-true-blue-900', textClass: 'text-true-blue-900', tailwindClass: 'true-blue-900' },
			]
		},
		{
			name: 'Vista Blue',
			baseClass: 'bg-vista-blue',
			colors: [
				{ name: '100', bgClass: 'bg-vista-blue-100', textClass: 'text-vista-blue-100', tailwindClass: 'vista-blue-100' },
				{ name: '200', bgClass: 'bg-vista-blue-200', textClass: 'text-vista-blue-200', tailwindClass: 'vista-blue-200' },
				{ name: '300', bgClass: 'bg-vista-blue-300', textClass: 'text-vista-blue-300', tailwindClass: 'vista-blue-300' },
				{ name: '400', bgClass: 'bg-vista-blue-400', textClass: 'text-vista-blue-400', tailwindClass: 'vista-blue-400' },
				{ name: '500', bgClass: 'bg-vista-blue-500', textClass: 'text-vista-blue-500', tailwindClass: 'vista-blue-500' },
				{ name: '600', bgClass: 'bg-vista-blue-600', textClass: 'text-vista-blue-600', tailwindClass: 'vista-blue-600' },
				{ name: '700', bgClass: 'bg-vista-blue-700', textClass: 'text-vista-blue-700', tailwindClass: 'vista-blue-700' },
				{ name: '800', bgClass: 'bg-vista-blue-800', textClass: 'text-vista-blue-800', tailwindClass: 'vista-blue-800' },
				{ name: '900', bgClass: 'bg-vista-blue-900', textClass: 'text-vista-blue-900', tailwindClass: 'vista-blue-900' },
			]
		},
		{
			name: 'Lavender Web',
			baseClass: 'bg-lavender-web',
			colors: [
				{ name: '100', bgClass: 'bg-lavender-web-100', textClass: 'text-lavender-web-100', tailwindClass: 'lavender-web-100' },
				{ name: '200', bgClass: 'bg-lavender-web-200', textClass: 'text-lavender-web-200', tailwindClass: 'lavender-web-200' },
				{ name: '300', bgClass: 'bg-lavender-web-300', textClass: 'text-lavender-web-300', tailwindClass: 'lavender-web-300' },
				{ name: '400', bgClass: 'bg-lavender-web-400', textClass: 'text-lavender-web-400', tailwindClass: 'lavender-web-400' },
				{ name: '500', bgClass: 'bg-lavender-web-500', textClass: 'text-lavender-web-500', tailwindClass: 'lavender-web-500' },
				{ name: '600', bgClass: 'bg-lavender-web-600', textClass: 'text-lavender-web-600', tailwindClass: 'lavender-web-600' },
				{ name: '700', bgClass: 'bg-lavender-web-700', textClass: 'text-lavender-web-700', tailwindClass: 'lavender-web-700' },
				{ name: '800', bgClass: 'bg-lavender-web-800', textClass: 'text-lavender-web-800', tailwindClass: 'lavender-web-800' },
				{ name: '900', bgClass: 'bg-lavender-web-900', textClass: 'text-lavender-web-900', tailwindClass: 'lavender-web-900' },
			]
		},
		{
			name: 'Goldenrod',
			baseClass: 'bg-goldenrod',
			colors: [
				{ name: '100', bgClass: 'bg-goldenrod-100', textClass: 'text-goldenrod-100', tailwindClass: 'goldenrod-100' },
				{ name: '200', bgClass: 'bg-goldenrod-200', textClass: 'text-goldenrod-200', tailwindClass: 'goldenrod-200' },
				{ name: '300', bgClass: 'bg-goldenrod-300', textClass: 'text-goldenrod-300', tailwindClass: 'goldenrod-300' },
				{ name: '400', bgClass: 'bg-goldenrod-400', textClass: 'text-goldenrod-400', tailwindClass: 'goldenrod-400' },
				{ name: '500', bgClass: 'bg-goldenrod-500', textClass: 'text-goldenrod-500', tailwindClass: 'goldenrod-500' },
				{ name: '600', bgClass: 'bg-goldenrod-600', textClass: 'text-goldenrod-600', tailwindClass: 'goldenrod-600' },
				{ name: '700', bgClass: 'bg-goldenrod-700', textClass: 'text-goldenrod-700', tailwindClass: 'goldenrod-700' },
				{ name: '800', bgClass: 'bg-goldenrod-800', textClass: 'text-goldenrod-800', tailwindClass: 'goldenrod-800' },
				{ name: '900', bgClass: 'bg-goldenrod-900', textClass: 'text-goldenrod-900', tailwindClass: 'goldenrod-900' },
			]
		}
	];

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
					Color Palette
				</h1>

				<div className="grid gap-8">
					{colorGroups.map((group) => (
						<div key={group.name} className="bg-white rounded-lg shadow-lg p-6">
							<div className="flex items-center gap-4 mb-6">
								<div className={`w-8 h-8 rounded-full border-2 border-gray-300 ${group.baseClass}`} />
								<h2 className="text-2xl font-semibold text-gray-800">
									{group.name}
								</h2>
								<span className="text-sm text-gray-500 font-mono">
									{group.baseClass}
								</span>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-9 gap-4">
								{group.colors.map((color) => (
									<div key={color.name} className="group">
										<div
											className={`w-full h-24 rounded-lg border border-gray-200 cursor-pointer transition-transform hover:scale-105 shadow-sm ${color.bgClass}`}
											onClick={() => copyToClipboard(color.bgClass)}
											title={`Click to copy: ${color.bgClass}`}
										/>
										<div className="mt-2 text-center">
											<div className="text-sm font-medium text-gray-700">
												{color.name}
											</div>
											<div className="text-xs text-gray-500 font-mono">
												{color.tailwindClass}
											</div>
											<div className="text-xs text-blue-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
												onClick={() => copyToClipboard(color.bgClass)}>
												{color.bgClass}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				<div className="mt-12 bg-white rounded-lg shadow-lg p-6">
					<h2 className="text-2xl font-semibold text-gray-800 mb-6">
						Usage Examples
					</h2>

					<div className="grid md:grid-cols-2 gap-6">
						<div>
							<h3 className="text-lg font-medium text-gray-700 mb-3">Tailwind CSS Classes</h3>
							<div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
								<div className="text-gray-600">/* Background colors */</div>
								<div className="text-green-600">className="bg-egyptian-blue-500"</div>
								<div className="text-green-600">className="bg-lavender-web-900"</div>
								<div className="text-gray-600 mt-2">/* Text colors */</div>
								<div className="text-green-600">className="text-goldenrod-600"</div>
								<div className="text-green-600">className="text-true-blue-700"</div>
							</div>
						</div>

						<div>
							<h3 className="text-lg font-medium text-gray-700 mb-3">CSS Custom Properties</h3>
							<div className="bg-gray-100 rounded-lg p-4 font-mono text-sm">
								<div className="text-gray-600">/* Use in CSS */</div>
								<div className="text-blue-600">.my-element &#123;</div>
								<div className="text-blue-600 ml-4">background-color: var(--color-egyptian-blue-500);</div>
								<div className="text-blue-600 ml-4">color: var(--color-lavender-web-900);</div>
								<div className="text-blue-600">&#125;</div>
							</div>
						</div>
					</div>

					<div className="mt-6">
						<h3 className="text-lg font-medium text-gray-700 mb-3">Color Examples</h3>
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<div className="bg-egyptian-blue-500 text-white p-4 rounded-lg text-center">
								<div className="font-semibold">Primary</div>
								<div className="text-sm">bg-egyptian-blue-500</div>
							</div>
							<div className="bg-goldenrod-500 text-white p-4 rounded-lg text-center">
								<div className="font-semibold">Accent</div>
								<div className="text-sm">bg-goldenrod-500</div>
							</div>
							<div className="bg-lavender-web-500 text-lavender-web-100 p-4 rounded-lg text-center">
								<div className="font-semibold">Neutral</div>
								<div className="text-sm">bg-lavender-web-500</div>
							</div>
							<div className="bg-true-blue-600 text-white p-4 rounded-lg text-center">
								<div className="font-semibold">Secondary</div>
								<div className="text-sm">bg-true-blue-600</div>
							</div>
						</div>
					</div>

					<div className="mt-6 p-4 bg-blue-50 rounded-lg">
						<p className="text-sm text-blue-800">
							💡 <strong>Tip:</strong> Click on any color swatch to copy its Tailwind CSS class to your clipboard!
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ColorPalette;