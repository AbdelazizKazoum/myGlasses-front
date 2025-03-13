import { AiFillGithub, AiFillLinkedin, AiFillFacebook } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-black/[0.065] text-gray-800 py-12 mt-16 border-t border-gray-300">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <h2
              style={{
                fontFamily: "monoton",
                backgroundSize: "300%",
                fontSize: "1.9rem",
                fontWeight: "500",
                backgroundClip: "text",
              }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              myglass
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Crafted with ❤️ by Kazoum. Your destination for stylish eyewear.
            </p>
            <div className="flex justify-center md:justify-start space-x-5">
              <a
                href="https://github.com/beshakil"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition"
                rel="noreferrer"
              >
                <AiFillGithub className="text-2xl" />
              </a>
              <a
                href="https://www.linkedin.com/in/beshakil/"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition"
                rel="noreferrer"
              >
                <AiFillLinkedin className="text-2xl" />
              </a>
              <a
                href="https://www.facebook.com/beshakil/"
                target="_blank"
                className="text-gray-600 hover:text-blue-600 transition"
                rel="noreferrer"
              >
                <AiFillFacebook className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Customer Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/shipping" className="hover:text-blue-600 transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-600 transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="/faqs" className="hover:text-blue-600 transition">
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="/privacy-policy"
                  className="hover:text-blue-600 transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              Stay Connected
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe for updates, offers & more.
            </p>
            <form className="flex flex-col sm:flex-wrap lg:flex-nowrap md:flex-row justify-center  items-center gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full md:w-auto px-4 py-2 rounded-lg border border-gray-300 text-gray-800 outline-none focus:border-primary-500"
              />
              <button
                type="submit"
                className="bg-primary-500 hover:bg-primary-800 text-white px-4 py-2 rounded-lg transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 pt-6 border-t border-gray-300 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Myglass. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
