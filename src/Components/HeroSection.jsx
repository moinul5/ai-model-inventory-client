import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../Context/ThemeContext';
import Button, { ChevronRightIcon, PlusIcon } from './UI/Button';
import './HeroSection.css';

const HeroSection = () => {
  const { isDark } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Interactive element - Statistics animation
  const [stats, setStats] = useState({
    models: 0,
    users: 0,
    downloads: 0
  });

  const targetStats = {
    models: 1247,
    users: 8935,
    downloads: 25643
  };

  // Animate numbers on mount
  useEffect(() => {
    setIsVisible(true);
    
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      
      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      setStats({
        models: Math.round(targetStats.models * easedProgress),
        users: Math.round(targetStats.users * easedProgress),
        downloads: Math.round(targetStats.downloads * easedProgress)
      });
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, []);

  // Hero carousel slides
  const slides = [
    {
      title: "Revolutionary AI Models",
      subtitle: "Marketplace",
      description: "Discover, deploy, and monetize cutting-edge AI models from the world's top researchers and developers.",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Build the Future",
      subtitle: "with AI",
      description: "Access state-of-the-art machine learning models for computer vision, NLP, and more.",
      image: "/api/placeholder/600/400"
    },
    {
      title: "Scale Your Innovation",
      subtitle: "Effortlessly",
      description: "From research to production, find the perfect AI model for your next breakthrough project.",
      image: "/api/placeholder/600/400"
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Background Elements */}
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-particles">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${3 + Math.random() * 4}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="hero-content">
          {/* Text Content */}
          <div className={`hero-text ${isVisible ? 'hero-text-visible' : ''}`}>
            <h1 className="hero-title">
              {slides[currentSlide].title}
              <span className="hero-subtitle">
                {slides[currentSlide].subtitle}
              </span>
            </h1>
            
            <p className="hero-description">
              {slides[currentSlide].description}
            </p>

            {/* Interactive Element 1: CTA Buttons */}
            <div className="hero-actions">
              <Button
                variant="primary"
                size="large"
                rightIcon={<ChevronRightIcon />}
                className="hero-cta-primary"
                onClick={() => window.location.href = '/all-models'}
              >
                Explore Models
              </Button>
              
              <Button
                variant="secondary"
                size="large"
                rightIcon={<PlusIcon />}
                className="hero-cta-secondary"
                onClick={() => window.location.href = '/add-model'}
              >
                Add Your Model
              </Button>
            </div>

            {/* Interactive Element 2: Dynamic Statistics */}
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">
                  {stats.models.toLocaleString()}+
                </div>
                <div className="stat-label">AI Models</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">
                  {stats.users.toLocaleString()}+
                </div>
                <div className="stat-label">Developers</div>
              </div>
              
              <div className="stat-item">
                <div className="stat-number">
                  {stats.downloads.toLocaleString()}+
                </div>
                <div className="stat-label">Downloads</div>
              </div>
            </div>
          </div>

          {/* Interactive Element 3: Image Carousel */}
          <div className="hero-visual">
            <div className="carousel-container">
              <div 
                className="carousel-track"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="carousel-slide">
                    <div className="slide-image-wrapper">
                      <img
                        src={slide.image}
                        alt={`${slide.title} - AI Model Marketplace`}
                        className="slide-image"
                        loading={index === 0 ? 'eager' : 'lazy'}
                      />
                      <div className="slide-overlay"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Carousel Controls */}
              <button
                className="carousel-control carousel-prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="15,18 9,12 15,6"/>
                </svg>
              </button>
              
              <button
                className="carousel-control carousel-next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"/>
                </svg>
              </button>
              
              {/* Carousel Indicators */}
              <div className="carousel-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-indicator ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="7,13 12,18 17,13"/>
              <polyline points="7,6 12,11 17,6"/>
            </svg>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;