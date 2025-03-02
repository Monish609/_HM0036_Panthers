import React from 'react';
import { Link } from 'react-router-dom';

// Reusable Section Component
const Section = ({ children, className }) => (
  <section className={`${className} py-32`}>
    <div className="container mx-auto px-12">{children}</div>
  </section>
);

// Reusable Card Component for Features, Professionals, and Testimonials
const Card = ({ children }) => (
  <div className="bg-white border border-gray-300 p-12 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
    {children}
  </div>
);

// Reusable Feature Component
const Feature = ({ title, description, icon }) => (
  <Card>
    <div className="text-blue-700 text-7xl mb-8">{icon}</div>
    <h3 className="text-3xl font-semibold mb-6">{title}</h3>
    <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
  </Card>
);

// Professional Component
const Professional = ({ name, role, img }) => (
  <div className="p-8 text-center">
    <img
      src={img}
      alt={name}
      className="rounded-full w-40 h-40 mx-auto mb-8 object-cover shadow-xl border-2 border-gray-300"
    />
    <h3 className="text-2xl font-semibold mb-4">{name}</h3>
    <p className="text-gray-500 text-lg">{role}</p>
  </div>
);

// Testimonial Component
const Testimonial = ({ quote, name, role }) => (
  <Card>
    <p className="text-gray-700 italic mb-8 text-lg">“{quote}”</p>
    <h4 className="text-xl font-semibold mb-2">{name}</h4>
    <p className="text-gray-500 text-lg">{role}</p>
  </Card>
);

// Call-to-Action (CTA) Component
const CTA = () => (
  <Section className="bg-blue-800">
    <div className="text-center text-white">
      <h2 className="text-5xl font-bold mb-6">Join Our Community Today</h2>
      <p className="text-2xl mb-10">
        Subscribe to our newsletter and stay updated with our latest courses and offers.
      </p>
      <Link
        to="/subscribe"
        className="bg-yellow-400 text-blue-900 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-yellow-500 transition"
      >
        Subscribe Now
      </Link>
    </div>
  </Section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-gray-900 text-white py-16 text-center">
    <p className="text-lg mb-8">&copy; {new Date().getFullYear()} EDUTECH. All rights reserved.</p>
    <div className="mt-8 space-x-8">
      {[
        { to: '/privacy', label: 'Privacy' },
        { to: '/terms', label: 'Terms' },
        { to: '/contact', label: 'Contact' }
      ].map((link, index) => (
        <Link key={index} to={link.to} className="text-gray-400 hover:text-blue-400 transition">
          {link.label}
        </Link>
      ))}
    </div>
  </footer>
);

const Home = () => {
  const features = [
    { title: 'Expert Instructors', description: 'Learn from industry leaders with proven track records.', icon: '🎓' },
    { title: 'Hands-on Learning', description: 'Engage with real projects and practical challenges.', icon: '🛠' },
    { title: 'Lifetime Access', description: 'Enjoy permanent access to all course materials.', icon: '🔓' }
  ];

  const professionals = [
    { name: 'Dr. Jane Smith', role: 'AI Specialist', img: './img1.jpeg' },
    { name: 'John Doe', role: 'Cybersecurity Expert', img: './img2.jpeg' },
    { name: 'Emily Johnson', role: 'Data Mentor', img: './img3.jpeg' }
  ];

  const testimonials = [
    { quote: 'These courses changed my career!', name: 'Sophia Lee', role: 'Software Engineer' },
    { quote: 'Best learning experience I have ever had!', name: 'Carlos Mendes', role: 'Data Analyst' },
    { quote: 'Highly recommended for anyone serious about upskilling.', name: 'Ayesha Khan', role: 'ML Engineer' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-gray-900 to-indigo-900 text-white py-40">
        <div className="text-center max-w-4xl px-12">
          <h1 className="text-7xl font-extrabold mb-12">
            Unlock Your Future with <span className="text-yellow-400">EDUTECH</span>
          </h1>
          <p className="text-2xl mb-16 leading-relaxed">
            Master new skills through expert-led, interactive courses designed for real-world impact.
          </p>
          <Link
            to="/courses"
            className="bg-yellow-400 text-indigo-800 px-12 py-4 rounded-lg text-xl font-semibold hover:bg-yellow-500 transition"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* About Us Section */}
      <Section className="bg-gray-50">
        <h2 className="text-5xl font-bold text-center mb-20">Why Choose EDUTECH?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </Section>

      {/* Our Mission Section */}
      <Section className="bg-white">
        <h2 className="text-5xl font-bold text-center mb-20">Our Mission</h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl text-gray-600 leading-relaxed mb-8">
            At EDUTECH, our mission is to empower individuals with the skills and knowledge required for a successful career in today’s digital world.
          </p>
          <p className="text-lg text-gray-500">
            We believe in lifelong learning and are committed to providing high-quality, accessible education to help you achieve your professional goals.
          </p>
        </div>
      </Section>

      {/* Professionals Section */}
      <Section className="bg-gray-50">
        <h2 className="text-5xl font-bold text-center mb-20">Meet Our Experts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {professionals.map((person, index) => (
            <Professional key={index} {...person} />
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-gray-100">
        <h2 className="text-5xl font-bold text-center mb-20">What Our Learners Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </Section>

      {/* Call to Action Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
