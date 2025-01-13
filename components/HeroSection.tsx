const HeroSection = () => {
  return (
    <section className='relative bg-gradient-to-b  py-16'>
      {/* Content Section */}
      <div className='relative z-10 max-w-7xl mx-auto flex items-center justify-between flex-col md:flex-row gap-8 px-6'>
        {/* Text Section */}
        <div className='w-full md:w-2/3 lg:w-1/2 text-center md:text-left'>
          <h1 className='text-4xl sm:text-6xl font-extrabold leading-tight mb-6'>
            Redefine Your Style with <br />
            <span className='text-primary'>Menswear Elegance</span>
          </h1>
          <p className='text-lg sm:text-xl font-light mb-8'>
            Discover the finest collection of tailored suits, casual wear, and
            accessories crafted to enhance your confidence and elevate your
            style. Embrace the essence of modern sophistication with every step
            you take.
          </p>
        </div>

        {/* Decorative Section */}
        <div className='w-full md:w-1/3 lg:w-1/2 flex items-center justify-center'>
          <div className='relative bg-white p-8 rounded-xl shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500'>
            <p className='text-gray-800 text-2xl font-semibold italic'>
              &quot;Elegance is not standing out, but being remembered.&quot;
            </p>
            <span className='block mt-4 text-right text-gray-600'>
              - Giorgio Armani
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
