// Mock document templates with JSON schema
export const mockTemplates = {
	1: {
		name: "Quyết định số 123/2024/QĐ-UBND",
		category: "Quyết định",
		description: "Quyết định về việc ban hành quy định mới về quản lý tài liệu công",
		schema: {
			type: "object",
			required: ["soQuyetDinh", "ngayBanHanh", "tenCoQuan", "noiDung"],
			properties: {
				soQuyetDinh: {
					type: "string",
					title: "Số quyết định",
					description: "Số và ký hiệu quyết định"
				},
				ngayBanHanh: {
					type: "string",
					format: "date",
					title: "Ngày ban hành",
					description: "Ngày ban hành quyết định"
				},
				tenCoQuan: {
					type: "string",
					title: "Tên cơ quan ban hành",
					description: "Tên đầy đủ của cơ quan ban hành"
				},
				nguoiKy: {
					type: "object",
					title: "Người ký",
					properties: {
						hoTen: {
							type: "string",
							title: "Họ và tên"
						},
						chucVu: {
							type: "string",
							title: "Chức vụ"
						}
					}
				},
				noiDung: {
					type: "object",
					title: "Nội dung quyết định",
					properties: {
						canCu: {
							type: "string",
							title: "Căn cứ",
							description: "Các văn bản pháp lý làm căn cứ"
						},
						quyetDinh: {
							type: "string",
							title: "Nội dung quyết định",
							description: "Nội dung chính của quyết định"
						},
						hieuLuc: {
							type: "string",
							format: "date",
							title: "Có hiệu lực từ ngày"
						}
					}
				},
				dieuKhoan: {
					type: "array",
					title: "Các điều khoản",
					items: {
						type: "object",
						properties: {
							dieu: {
								type: "string",
								title: "Điều số"
							},
							noiDung: {
								type: "string",
								title: "Nội dung điều"
							}
						}
					}
				}
			}
		},
		uiSchema: {
			noiDung: {
				canCu: {
					"ui:widget": "textarea",
					"ui:options": {
						rows: 4
					}
				},
				quyetDinh: {
					"ui:widget": "textarea",
					"ui:options": {
						rows: 6
					}
				}
			},
			dieuKhoan: {
				items: {
					noiDung: {
						"ui:widget": "textarea",
						"ui:options": {
							rows: 3
						}
					}
				}
			}
		},
		formData: {
			soQuyetDinh: "123/2024/QĐ-UBND",
			ngayBanHanh: "2024-01-15",
			tenCoQuan: "Ủy ban nhân dân tỉnh",
			nguoiKy: {
				hoTen: "Nguyễn Văn A",
				chucVu: "Chủ tịch UBND tỉnh"
			},
			noiDung: {
				canCu: "- Luật Tổ chức chính quyền địa phương số 77/2015/QH13;\n- Nghị định số 63/2020/NĐ-CP của Chính phủ;",
				quyetDinh: "Ban hành quy định mới về quản lý tài liệu công trong phạm vi tỉnh",
				hieuLuc: "2024-02-01"
			},
			dieuKhoan: [
				{
					dieu: "Điều 1",
					noiDung: "Ban hành kèm theo Quyết định này Quy định về quản lý tài liệu công"
				},
				{
					dieu: "Điều 2",
					noiDung: "Quyết định này có hiệu lực từ ngày ký"
				}
			]
		}
	},
	2: {
		name: "Thông tư số 45/2024/TT-BNV",
		category: "Thông tư",
		description: "Hướng dẫn thực hiện các quy định về quản lý hồ sơ cán bộ",
		schema: {
			type: "object",
			required: ["soThongTu", "ngayBanHanh", "tenCoQuan", "noiDungHuongDan"],
			properties: {
				soThongTu: {
					type: "string",
					title: "Số thông tư"
				},
				ngayBanHanh: {
					type: "string",
					format: "date",
					title: "Ngày ban hành"
				},
				tenCoQuan: {
					type: "string",
					title: "Tên cơ quan ban hành"
				},
				noiDungHuongDan: {
					type: "string",
					title: "Nội dung hướng dẫn"
				},
				phamViApDung: {
					type: "string",
					title: "Phạm vi áp dụng"
				}
			}
		},
		uiSchema: {
			noiDungHuongDan: {
				"ui:widget": "textarea",
				"ui:options": {
					rows: 8
				}
			},
			phamViApDung: {
				"ui:widget": "textarea",
				"ui:options": {
					rows: 4
				}
			}
		},
		formData: {
			soThongTu: "45/2024/TT-BNV",
			ngayBanHanh: "2024-02-20",
			tenCoQuan: "Bộ Nội vụ",
			noiDungHuongDan: "Hướng dẫn chi tiết về việc quản lý hồ sơ cán bộ, công chức, viên chức",
			phamViApDung: "Áp dụng đối với các cơ quan, đơn vị thuộc hệ thống hành chính nhà nước"
		}
	}
}

// Mock past edits data
export const mockPastEdits = [
	{
		id: 1,
		name: "Phiên bản gốc",
		date: "2024-08-15 09:00",
		author: "Nguyễn Văn A",
		status: "published" as const
	},
	{
		id: 2,
		name: "Cập nhật điều 2",
		date: "2024-08-15 14:30",
		author: "Trần Thị B",
		status: "draft" as const
	},
	{
		id: 3,
		name: "Bổ sung căn cứ pháp lý",
		date: "2024-08-16 10:15",
		author: "Lê Văn C",
		status: "draft" as const
	}
]
