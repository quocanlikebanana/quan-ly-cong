import { z } from "zod";

const envSchema = z.object({
	// Public (client + server)
	NEXT_PUBLIC_ENABLE_BETA: z.string().optional(),

	// Server-only
	MONGODB_URI: z.string().min(1),
	S3_BUCKET_NAME: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
	console.error("❌ Invalid environment variables:", z.treeifyError(parsed.error));
	throw new Error("Invalid environment variables. See logs.");
}

const env = parsed.data;

const configs = {
	appName: "My Next App",
	db: {
		uri: env.MONGODB_URI,
	},
	aws: {
		s3: {
			bucketName: env.S3_BUCKET_NAME,
		},
	},
	features: {
		enableBeta: env.NEXT_PUBLIC_ENABLE_BETA === "true",
	},
} as const;

export default configs;
