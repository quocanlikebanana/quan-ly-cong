export const routes = {
	van_ban: {
		INDEX: '/van-ban',
		TAO_MOI: '/van-ban/tao-moi',
		id: (templateId: string) => ({
			INDEX: `/van-ban/${templateId}`,
			DIEN_MAU: `/van-ban/${templateId}/dien-mau`,
		} as const),
	}
} as const;
