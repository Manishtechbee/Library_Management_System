// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-[#d1e3f4] py-2 text-center text-gray-800 text-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-4">
        <div>
            
        <div className="flex gap-4 justify-center py-1">
          <a href="https://github.com" className="hover:text-blue-600">GitHub</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
          <a href="/features" className="hover:text-blue-600">Features</a>

        </div>
        <p>© {new Date().getFullYear()} Library Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
