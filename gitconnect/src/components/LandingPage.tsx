import React from 'react';
import './styles/land.css'; 


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCode, faComments } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">

     
      <section className="hero flex flex-col md:flex-row items-center justify-between px-8 py-16 bg-gray-100">
        <div className="hero-content">
          <h1 className="text-4xl md:text-5xl font-bold">Welcome to GitConnect</h1>
          <p className="text-lg md:text-xl mt-4">The place where developers collaborate, share knowledge, and grow together.</p>
          <a href="/Signup" className="cta-button bg-blue-500 text-white py-3 px-6 mt-6 inline-block rounded hover:bg-blue-700">Join Now</a>
        </div>
        <div className="hero-image mt-8 md:mt-0">
          <img src="https://contentstatic.techgig.com/photo/74548080/4-essential-skills-every-net-developer-must-possess.jpg?67629" alt="Developers Networking" className="max-w-full h-auto" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features py-16 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Why GitConnect?</h2>
        <div className="features-container grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
          <div className="feature-card bg-gray-100 p-8 rounded-lg text-center shadow-lg">
            <FontAwesomeIcon icon={faUsers} className="text-4xl mb-4 text-blue-500" />
            <h3 className="text-2xl font-bold">Connect with Developers</h3>
            <p className="mt-4">Find and follow like-minded developers, explore projects, and build your professional network.</p>
          </div>
          <div className="feature-card bg-gray-100 p-8 rounded-lg text-center shadow-lg">
            <FontAwesomeIcon icon={faCode} className="text-4xl mb-4 text-green-500" />
            <h3 className="text-2xl font-bold">Collaborate on Projects</h3>
            <p className="mt-4">Work together on open-source or personal projects, and get feedback from the community.</p>
          </div>
          <div className="feature-card bg-gray-100 p-8 rounded-lg text-center shadow-lg">
            <FontAwesomeIcon icon={faComments} className="text-4xl mb-4 text-yellow-500" />
            <h3 className="text-2xl font-bold">Share Knowledge</h3>
            <p className="mt-4">Post tutorials, blogs, and ask for help from developers worldwide.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">What Developers Are Saying</h2>
        <div className="testimonial-carousel flex justify-center space-x-8 px-8">
          <div className="testimonial-card bg-white p-8 rounded-lg shadow-lg max-w-md">
            <p>"GitConnect has helped me find collaborators for my open-source project. It's like LinkedIn but better for devs!"</p>
            <h4 className="mt-4 font-bold">– Jane Doe, Front-End Developer</h4>
          </div>
          <div className="testimonial-card bg-white p-8 rounded-lg shadow-lg max-w-md">
            <p>"I found my current job through connections I made on GitConnect. Great platform!"</p>
            <h4 className="mt-4 font-bold">– John Smith, Full-Stack Developer</h4>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta py-16 bg-blue-500 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to connect with developers worldwide?</h2>
        <a href="/Signup" className="cta-button bg-white text-blue-500 py-3 px-6 mt-6 inline-block rounded hover:bg-gray-200">Sign Up Now</a>
      </section>

      {/* Footer */}
      <footer className="footer py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 GitConnect. All rights reserved.</p>
        <div className="social-icons flex justify-center space-x-4 mt-4">
          <a href="#"><FontAwesomeIcon icon={faGithub} className="text-xl" /></a>
          <a href="#"><FontAwesomeIcon icon={faTwitter} className="text-xl" /></a>
          <a href="#"><FontAwesomeIcon icon={faLinkedin} className="text-xl" /></a>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;
