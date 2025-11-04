import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import BlogList from '../components/features/Blog/BlogList';

const Blog = () => {
  return (
    <>
      <Navbar />
      <BlogList />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Blog;
