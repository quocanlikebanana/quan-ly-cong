import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import GlobalLoadingContextProvider from "@/client/global/loading/GlobalLoadingContextProvider";
import GlobalLoadingContextConsumer from "@/client/global/loading/GlobalLoadingContextComsumer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Quản Lý Công",
	description: "Quản lý văn bản, tài liệu liên quan công việc hành chính.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<NuqsAdapter>
					<GlobalLoadingContextProvider>
						{children}
						<GlobalLoadingContextConsumer />
					</GlobalLoadingContextProvider>
				</NuqsAdapter>
				<Toaster />
			</body>
		</html>
	);
}
