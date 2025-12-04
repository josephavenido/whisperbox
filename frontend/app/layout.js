import "./globals.css";

export const metadata = {
  title: "anonymousy",
  description: "Anonymous Feedback Board",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
