"use client";

import type React from "react";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface EmailFormProps {
	onSuccess: () => void;
}

export default function EmailForm({ onSuccess }: EmailFormProps) {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
			const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
			const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

			if (!serviceID || !templateID || !publicKey) {
				throw new Error(
					"Email service is not configured. Please set environment variables."
				);
			}

			const templateParams = {
				email: email,
				message: message,
			};

			await emailjs.send(serviceID, templateID, templateParams, publicKey);

			setEmail("");
			setMessage("");
			onSuccess();
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: "An error occurred while sending your message."
			);
			console.error("Error sending email:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full">
			<form onSubmit={handleSubmit} className="space-y-5">
				<div>
					<label
						htmlFor="email"
						className="block text-sm font-normal text-white mb-2"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="your@email.com"
						required
						className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
					/>
				</div>

				<div>
					<label
						htmlFor="message"
						className="block text-sm font-normal text-white mb-2"
					>
						Message
					</label>
					<textarea
						id="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Your message here..."
						rows={6}
						required
						className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors resize-none"
					/>
				</div>

				{error && (
					<div className="p-3 bg-red-900 border border-red-700 text-red-200 rounded-lg text-sm">
						{error}
					</div>
				)}

				<Button
					type="submit"
					disabled={isLoading}
					className="w-full py-3 font-normal bg-white text-black hover:bg-gray-200"
				>
					{isLoading ? "Sending..." : "Send Message"}
				</Button>
			</form>

			<p className="text-xs text-gray-500 text-center mt-6">
				Your message is secure and anonymous · meow meow
			</p>
		</div>
	);
}
