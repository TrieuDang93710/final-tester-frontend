// import bannerImg from '/images/home/banner.png';
import chef_banner from '/images/home/chef_banner.png'

function Banner() {
  return (
    <div className='section-container bg-gradient-to-r from-[#FAFAFA] fron-0% to-[#FCFCFC] to-100%'>
      <div className='py-24 flex flex-col md:flex-row-reverse items-center justify-center gap-8'>
        {/** images */}
        <div className='md:w-1/2 flex flex-col justify-center'>
          <img src={chef_banner} alt='' />
          <div className='flex flex-col md:flex-row items-center justify-around gap-4 -mt-15'>
            <div className='bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-md w-64'>
              <img src='/images/home/b-food1.png' alt='' className='rounded-2xl' />
              <div className='space-y-1'>
                <h5>Spicy noodles</h5>
                <div className='rating rating-sm'>
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-500' readOnly />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-500' readOnly />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-500' checked readOnly />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-400' />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-400' readOnly />
                </div>
                <p className='text-red'>$18.00</p>
              </div>
            </div>
            <div className='bg-white px-3 py-2 rounded-2xl flex items-center gap-3 shadow-md w-64'>
              <img src='/images/home/b-food1.png' alt='' className='rounded-2xl' />
              <div className='space-y-1'>
                <h5>Spicy noodles</h5>
                <div className='rating rating-sm'>
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-500' readOnly />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-500' readOnly />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-500' checked readOnly />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-400' />
                  <input type='radio' name='rating-6' className='mask mask-star-2 bg-orange-400' readOnly />
                </div>
                <p className='text-red'>$18.00</p>
              </div>
            </div>
          </div>
        </div>
        {/** texts */}
        <div className='md:w-1/2 space-y-7 px-4'>
          <h1 className='md:text-5xl text-4xl md:leading-nug leading-snug font-bold'>
            Dive Into Delights Of Delectable <span className='text-green'>Food</span>
          </h1>
          <p className='text-[#4A4A4A] text-xl'>
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship
          </p>
          <button className='bg-green font-semibold btn text-white px-8 py-3 rounded-full'>Order Now</button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
