export const routes = {
	van_ban: {
		INDEX: '/van-ban',
		TAO_MOI: '/van-ban/tao-moi',
		id: (templateId: string) => ({
			INDEX: `/van-ban/${templateId}`,
			FILL: `/van-ban/${templateId}/fill`,
		} as const),
	}
} as const;
