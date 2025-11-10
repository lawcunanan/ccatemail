"use client";

import { useState } from "react";
import EmailForm from "@/components/email-form";

export default function Page() {
	const [showSuccess, setShowSuccess] = useState(false);

	const handleSubmitSuccess = () => {
		setShowSuccess(true);
		setTimeout(() => setShowSuccess(false), 3000);
	};

	return (
		<main className="min-h-screen flex flex-col bg-black">
			<div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
				<div className="mb-8 text-center">
					<h1 className="text-4xl font-bold text-white mb-2">Whisper</h1>
					<p className="text-sm text-gray-400">
						Send anonymous messages securely
					</p>
				</div>

				<div className="w-full max-w-md">
					<EmailForm onSuccess={handleSubmitSuccess} />
				</div>
			</div>

			{showSuccess && (
				<div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
					✓ Message sent successfully!
				</div>
			)}
		</main>
	);
}
