
import Banner from '@/components/Banner';
import Categories from './Categories';
import OurServices from './OurServices';
import SpecialDishes from './SpecailDishes';
import Testimonials from './Testimonials';

function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <SpecialDishes />
      <Testimonials />
      <OurServices />
    </main>
  );
}

export default Home;
