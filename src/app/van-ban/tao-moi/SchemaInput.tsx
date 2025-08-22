import React from 'react'

export default function SchemaInput() {
	return (
		<div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
			<h3 className="font-semibold text-gray-800 mb-2">Thông tin Schema JSON</h3>
			<p className="text-sm text-gray-600">
				Schema JSON hiện tại sẽ được để trống và có thể được cập nhật sau.
				Schema này sẽ định nghĩa các trường dữ liệu động trong template.
			</p>
		</div>
	)
}
