import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import OurServices from './OurServices'
import SpecailDishes from './SpecailDishes'
import Testimonials from './Testimonials'

function Home() {
  return (
    <main>
      <Banner />
      <Categories />
      <SpecailDishes />
      <Testimonials />
      <OurServices />
    </main>
  )
}

export default Home