/** @format */

import "./globals.css";
import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { CartProvider } from "./Context/CartContext";
import { Poppins } from "next/font/google";
import AuthProvider from "@/app/components/AuthProvider";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={poppins.className}>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
          <ToastContainer />
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
}
