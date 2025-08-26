"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Grid3X3, List } from 'lucide-react';
import React from 'react'
import { useQueryState } from 'nuqs';
import Link from 'next/link';
import { routes } from '@/lib/routes-utils';

export default function Header() {
	const [viewMode, setViewMode] = useQueryState<'grid' | 'list'>("view", {
		defaultValue: 'grid',
		parse: (value) => value as 'grid' | 'list',
	});
	const [searchQuery, setSearchQuery] = useQueryState("search", {
		defaultValue: '',
	});

	return (
		<div className="sticky top-0 z-40 bg-lavender-web-800 border-b border-vista-blue-300 shadow-sm">
			<div className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">

					<div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">
						{/* Search */}
						<div className="relative flex-1 max-w-md">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vista-blue-600 w-4 h-4" />
							<Input
								placeholder="Tìm kiếm văn bản..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="pl-10 border-vista-blue-400 focus:border-egyptian-blue-600 bg-lavender-web-900"
							/>
						</div>

						<Link href={routes.van_ban.TAO_MOI}>
							<Button>
								Tạo văn bản mới
							</Button>
						</Link>
					</div>

					{/* View Toggle */}
					<div className="flex items-center gap-2">
						<Button
							variant={viewMode === 'grid' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setViewMode('grid')}
							className={viewMode === 'grid'
								? 'bg-egyptian-blue-600 hover:bg-egyptian-blue-700 text-lavender-web-900'
								: 'border-vista-blue-400 text-vista-blue-600 hover:bg-vista-blue-50'
							}
						>
							<Grid3X3 className="w-4 h-4" />
						</Button>
						<Button
							variant={viewMode === 'list' ? 'default' : 'outline'}
							size="sm"
							onClick={() => setViewMode('list')}
							className={viewMode === 'list'
								? 'bg-egyptian-blue-600 hover:bg-egyptian-blue-700 text-lavender-web-900'
								: 'border-vista-blue-400 text-vista-blue-600 hover:bg-vista-blue-50'
							}
						>
							<List className="w-4 h-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
