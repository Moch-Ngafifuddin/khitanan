import "./globals.css";

export const metadata = {
  title: "Undangan Walimatul Khitan",
  description: "Undangan Digital Premium - Ananda Rizky Pratama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
