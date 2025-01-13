import Image from 'next/image';

const Cards = () => {
  const cards = [
    {
      id: 1,
      trend: '2025 Trend',
      title: 'Men Shirt',
      image: '/images/card-1.png', // Relative path from the `public` folder
    },
    {
      id: 2,
      trend: '2025 Trend',
      title: 'Men Jackets',
      image: '/images/card-2.jpg', // Relative path from the `public` folder
    },
    {
      id: 3,
      trend: '2025 Trend',
      title: 'Men Casuals',
      image: '/images/card-3.jpeg', // Relative path from the `public` folder
    },
  ];

  return (
    <section className={'text-black  my-12'}>
      <h1 className='text-3xl md:text-5xl font-semibold text-center my-12'>
        Latest Trends in <span className='text-primary'>Men’s Wear</span>
      </h1>
      <main className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {cards.map((item) => {
          const { id, title, trend, image } = item;
          return (
            <div
              key={id}
              className='relative block overflow-hidden rounded-lg shadow-lg group h-52 object-cover'
            >
              {/* Using Next.js Image Component */}
              <Image
                src={image}
                alt={title}
                layout='responsive'
                width={500}
                height={300}
                className='object-cover'
              />
              {/* Overlay with opacity for better text visibility */}
              <div className='absolute inset-0 bg-black bg-opacity-50'></div>
              <div className='absolute inset-0 flex flex-col justify-center items-center text-center p-4'>
                <h3 className='font-semibold text-white group-hover:scale-150 transition-all duration-300'>
                  {trend}
                </h3>
                <h2 className='text-2xl font-bold text-white my-2 group-hover:scale-110 transition-all duration-300'>
                  {title}
                </h2>
              </div>
            </div>
          );
        })}
      </main>
    </section>
  );
};

export default Cards;
