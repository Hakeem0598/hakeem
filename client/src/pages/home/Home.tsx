import React from 'react'
import Announcement from '../../components/announcement/Announcement';
import Categories from '../../components/categories/Categories';
import Footer from '../../components/footer/Footer';
import Heading from '../../components/heading/Heading';
import Navbar from '../../components/navbar/Navbar';
import Newsletter from '../../components/newsletter/Newsletter';
import Products from '../../components/products/Products';
import Slider from '../../components/slider/Slider';
import { Filters } from '../products-page/Products-page.types';

function Home() {
    return (
        <>
            <Announcement />
            <Navbar />
            <Slider />
            <Heading hidden={true}>Shop the bestsellers</Heading>
            <Categories />
            <Heading>Trending items</Heading>
            <Products filters={{} as Filters} sort='newest' limit={8} />
            <Newsletter />
            <Footer />
        </>
    )
}

export default Home;
