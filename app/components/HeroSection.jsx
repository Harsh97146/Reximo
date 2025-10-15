export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-[636px] mt-[88px]">
        {/* Background Image */}
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/643ddb178957e85a0bcf5be7f3501d7d6d47b478?width=3840"
          alt="Rexino Chemical Industries - Quality craftsmanship"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'linear-gradient(149deg, rgba(24, 24, 24, 0.60) 18.55%, rgba(24, 24, 24, 0.71) 89.13%, rgba(24, 24, 24, 0.00) 167.85%)'
          }}
        />
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white font-dm-sans mb-6">
              Welcome to Rexino Chemical Industries
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-dm-sans mb-8">
              Leading the way in chemical innovation and manufacturing excellence.
            </p>
            <button className="inline-flex items-center justify-center gap-2.5 px-10 py-2.5 rounded-[88px] bg-blue-secondary hover:bg-blue-secondary/90 transition-colors">
              <span className="text-white font-dm-sans text-[18px] font-bold leading-[27px]">
                Explore Our Products
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
