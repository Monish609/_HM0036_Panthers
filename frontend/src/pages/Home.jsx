import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <h1>Journey To Knowledge Made Simple!</h1>
        <p>Explore our wide range of courses and start your learning journey today.</p>
        <button className="cta-button">Explore Courses</button>
      </div>
    </div>
  );
};

export default Home;