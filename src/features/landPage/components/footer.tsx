// components/SponsorsSection.tsx
"use client";


export default function Footer() {
  return (
    <section className="bg-[#212529] text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Our Trusted Partners
          </h2>
          <p className="mt-2 text-gray-400">
            We collaborate with leading institutions to bring secure, reliable
            services.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">

        </div>

        {/* Contact + Footer */}
        <div className="border-t border-gray-700 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <p className="text-gray-400 text-sm mt-1">Email: support@tfa.org</p>
            <p className="text-gray-400 text-sm">Phone: +256 700 000000</p>
          </div>

          <p className="text-gray-500 text-sm text-center md:text-right">
            © {new Date().getFullYear()} TFA. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
