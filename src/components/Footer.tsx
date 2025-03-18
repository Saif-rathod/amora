import type React from "react"
import { Heart, HelpCircle, Gift, Facebook, Twitter, Instagram, Send } from "lucide-react"

const FooterSection = ({
  title,
  links,
}: { title: string; links: { name: string; href: string; icon?: React.ReactNode }[] }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
    <ul className="space-y-2">
      {links.map((link, index) => (
        <li key={index}>
          <a
            href={link.href}
            className="text-gray-600 hover:text-red-500 transition-colors duration-300 flex items-center group"
          >
            {link.icon && (
              <span className="mr-2 text-gray-400 group-hover:text-red-500 transition-colors duration-300">
                {link.icon}
              </span>
            )}
            <span className="relative">
              {link.name}
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-red-500 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const SocialButton = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a
    href={href}
    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gradient-to-r from-red-500 to-red-500 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
)

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4 border-t border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FooterSection
            title="Company"
            links={[
              { name: "About Us", href: "#", icon: <Heart size={16} /> },
              { name: "Careers", href: "#", icon: <Heart size={16} /> },
              { name: "Blog", href: "#", icon: <Heart size={16} /> },
            ]}
          />
          <FooterSection
            title="Support"
            links={[
              { name: "Help Center", href: "#", icon: <HelpCircle size={16} /> },
              { name: "Contact", href: "#", icon: <HelpCircle size={16} /> },
              { name: "FAQs", href: "#", icon: <HelpCircle size={16} /> },
            ]}
          />
          <FooterSection
            title="Quick Links"
            links={[
              { name: "Gifting Options", href: "#", icon: <Gift size={16} /> },
              { name: "Pricing", href: "#", icon: <Gift size={16} /> },
              { name: "My Account", href: "#", icon: <Gift size={16} /> },
            ]}
          />
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Social & Newsletter</h3>
            <div className="flex space-x-4 mb-4">
              <SocialButton href="#" icon={<Facebook size={18} />} />
              <SocialButton href="#" icon={<Twitter size={18} />} />
              <SocialButton href="#" icon={<Instagram size={18} />} />
            </div>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 rounded-l-full border-2 border-gray-300 focus:outline-none focus:border-red-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-500 text-white rounded-r-full hover:from-red-600 hover:to-red-600 transition-colors duration-300"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Amora. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

