// @ts-ignore
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./components/ui/button";

const Layout = ({ children }) => (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <div className="mr-4 hidden md:flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="hidden font-bold sm:inline-block">ShopNow</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/products">
            Products
            </Link>
            <Link to="/categories">
            Categories
            </Link>
            <Link to="/about">
            About
            </Link>
            <Link to="/contact">
            Contact
            </Link>

            </nav>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Button variant="ghost">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {children}
      </main>
      <footer className="w-full py-6 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <ShoppingCart className="h-6 w-6" />
              <p className="text-center text-sm leading-loose md:text-left">
                © 2023 ShopNow. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4">
              <Link className="text-sm" to="/terms">Terms</Link>
              <Link className="text-sm" to="/privacy">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )

export default Layout;