import { AiFillGithub, AiFillLinkedin, AiFillFacebook } from "react-icons/ai";

const Footer = () => (
  <footer className="bg-gray-800 text-white py-10">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left section - Brand Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-semibold mb-4">Myglass</h2>
          <p className="text-sm mb-6">
            Crafted with &#10084; by Shakil Ahmed. A modern eCommerce solution
            for eyewear shopping.
          </p>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href="https://github.com/beshakil"
              target="_blank"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <AiFillGithub className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/beshakil/"
              target="_blank"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <AiFillLinkedin className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/beshakil/"
              target="_blank"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <AiFillFacebook className="text-2xl" />
            </a>
          </div>
        </div>

        {/* Middle section - Useful Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
          <ul className="text-sm space-y-2">
            <li>
              <a href="/shipping" className="hover:text-gray-400">
                Shipping & Returns
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-400">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/faqs" className="hover:text-gray-400">
                FAQs
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-gray-400">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Right section - Social Links / Newsletter */}
        <div className="text-center md:text-right">
          <h3 className="text-xl font-semibold mb-4">Stay Connected</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for the latest updates and offers!
          </p>
          <form className="flex justify-center md:justify-end">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 text-black rounded-l-lg"
            />
            <button className="bg-primary text-white p-2 rounded-r-lg hover:bg-primary-dark transition duration-300">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Section - Copyright */}
      <div className="text-center mt-10">
        <p className="text-sm text-gray-400">
          &copy; 2025 Myglass. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
