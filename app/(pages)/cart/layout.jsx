/** @format */
export const metadata = {
  title: "Cart",
};

export default function RootLayout({ children }) {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-grow'>{children}</main>
    </div>
  );
}
