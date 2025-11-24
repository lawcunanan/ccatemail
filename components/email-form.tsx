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
	const [image, setImage] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];

			const reader = new FileReader();
			reader.onload = (event) => {
				const img = new window.Image();
				img.onload = () => {
					const canvas = document.createElement("canvas");
					let width = img.width;
					let height = img.height;
					const maxDim = 300;
					if (width > height) {
						if (width > maxDim) {
							height *= maxDim / width;
							width = maxDim;
						}
					} else {
						if (height > maxDim) {
							width *= maxDim / height;
							height = maxDim;
						}
					}
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext("2d");
					ctx?.drawImage(img, 0, 0, width, height);

					let dataUrl = canvas.toDataURL("image/jpeg", 0.6);

					let quality = 0.6;
					while (dataUrl.length > 50000 && quality > 0.2) {
						quality -= 0.1;
						dataUrl = canvas.toDataURL("image/jpeg", quality);
					}
					if (dataUrl.length > 50000) {
						setError(
							"Image is too large after compression. Please use a simpler or smaller image."
						);
						setImage(null);
						e.target.value = "";
					} else {
						setImage(dataUrl);
						setError("");
					}
				};
				img.onerror = () => {
					setError("Failed to process image.");
					setImage(null);
					e.target.value = "";
				};
				img.src = event.target?.result as string;
			};
			reader.onerror = () => {
				setError("Failed to read image file.");
				setImage(null);
				e.target.value = "";
			};
			reader.readAsDataURL(file);
		}
	};

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
				image: image || "",
			};

			await emailjs.send(serviceID, templateID, templateParams, publicKey);

			setEmail("");
			setMessage("");
			setImage(null);
			onSuccess();
		} catch (err: any) {
			const errorMessage =
				err instanceof Error
					? err.message
					: err?.text || "An error occurred while sending your message.";
			setError(errorMessage);
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

				<div>
					<label
						htmlFor="image"
						className="block text-sm font-normal text-white mb-2"
					>
						Attach Image (Optional)
					</label>
					<input
						type="file"
						id="image"
						accept="image/*"
						onChange={handleImageChange}
						className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-black text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-white hover:file:bg-gray-700"
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
