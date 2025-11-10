# Whisper - Anonymous Email Sender

Whisper is a sleek and secure web application that allows users to send anonymous emails. Built with Next.js, Tailwind CSS, and powered by EmailJS, it provides a minimal and intuitive interface for sending messages without revealing the sender's identity.

![Whisper Screenshot](https://i.imgur.com/your-screenshot.png) <!-- Optional: Add a screenshot of your application -->

## ✨ Features

- **Anonymous Sending**: Send emails to any recipient without disclosing your own email address.
- **Modern UI**: A clean, responsive, and dark-themed interface built with Shadcn/UI.
- **Secure Delivery**: Utilizes EmailJS to handle email sending securely on the client-side.
- **Instant Feedback**: Receive instant notifications upon successfully sending a message.
- **Easy to Set Up**: Get the project running locally with just a few commands.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Shadcn/UI](https://ui.shadcn.com/) - Re-usable components built using Radix UI and Tailwind CSS.
- [EmailJS](https://www.emailjs.com/) - A service to send emails using client-side technologies.
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/) (v18.x or later recommended)
- [pnpm](https://pnpm.io/installation) (or npm/yarn)

### Installation

1.  **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/catemail.git
    cd catemail
    ```

2.  **Install dependencies:**

    ```sh
    pnpm install
    ```

3.  **Set up environment variables:**
    You'll need to create an account at [EmailJS](https://www.emailjs.com/) to get your credentials.

    Create a file named `.env.local` in the root of your project and add the following variables:

    ```env
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
    ```

    - `your_service_id`: The ID of the email service you configured in EmailJS.
    - `your_template_id`: The ID of the email template you created. Make sure your template includes the variables `{{email}}` and `{{message}}`.
    - `your_public_key`: Your EmailJS Public Key (previously User ID).

### Running the Application

Once the installation is complete, you can run the development server:

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
