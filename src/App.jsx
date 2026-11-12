import { useState } from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';

import ArticleLayout from './components/article/ArticleLayout';
import ContentLayout from './components/article/ContentLayout';
// import './App.css';
// import  './styles/home.css';
import Navbar from './components/layouts/Navbar';
import BuyMeACoffee from './components/article/BuyMeACoffee';

import WebsitePage from "./pages/Website/WebsitePage";

import TravelPartners from './pages/Resources/TravelPartners';

import Home from './pages/Home/Home';
import ArticleRoute from './pages/Article/ArticleRoute';
import Blog from './pages/Blog/Blog';
import Events from './pages/Events/Events';
import EventDetail from './pages/Events/EventDetail';

import Footer from './components/layouts/Footer';
import TravelGuide from './pages/TravelGuide/TravelGuide';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import Resources from './pages/Resources/Resources';
import ResourceDetail from './pages/Resources/ResourceDetail';

import Destinations from './pages/Destinations/Destinations';
import DestinationsHome from './pages/Destinations/DestinationsHome';
// import { Router } from 'react-router-dom'

// import Router from './router';

function App() {

  // return <Home />

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path='/' element={
          <div>
            <Home />
            <BuyMeACoffee/>
          </div>
        } />

        {/* <Route path='articles/:slug' element={<Article />}/> */}
        <Route path='articles/:slug' element={
          <div>
            <ArticleRoute />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='blog/' element={
          <div>
            <Blog />
            <BuyMeACoffee/>
          </div>
          // <ContentLayout type='blog'>
          // </ContentLayout>
        }/>

        <Route path='events/' element={
          <div>
            <Events />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='events/:slug' element={
          <div>
            <EventDetail />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='destinations/' element={
          <div>
            <Destinations />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='destinations/:slug' element={
          <div>
            <DestinationsHome />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='travel-guide/' element={
          <div>
              <TravelGuide />
              <BuyMeACoffee/>
            </div>
        }/>

        <Route path='resources/' element={
            <div>
              <Resources/>
              <BuyMeACoffee/>
            </div>
        }/>

        <Route path='resources/:slug/' element={
          <div>
            <ResourceDetail />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='travel-partners/' element={
          <TravelPartners />
        }/>

        <Route path='about/' element={
          <div>
              <ArticleLayout>
                <About />
              </ArticleLayout>
              <BuyMeACoffee/>
            </div>
        }/>

        <Route path='contact/' element={
          <div>
            <Contact />
            <BuyMeACoffee/>
          </div>
        }/>

        <Route path='/partner-with-us' element={
          <WebsitePage pageType='partner-with-us' />
        }/>

        <Route path='/privacy-policy' element={
          <WebsitePage pageType='privacy-policy' />
        }/>

        <Route path='/terms-and-disclaimers' element={
          <WebsitePage pageType='terms-and-disclaimers' />
        }/>

      </Routes>

      {/* <BuyMeACoffee /> */}

      <Footer />

    </BrowserRouter>
  );
}

export default App;
