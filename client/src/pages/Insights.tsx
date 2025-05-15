import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

// Define video categories
const videoCategories = [
  { id: 'testimonials', name: 'Testimonials' },
  { id: 'vision', name: 'Vision & Culture' },
  { id: 'promo', name: 'Promo & Product Spotlights' },
  { id: 'training', name: 'Training & Launch Tools' },
];

// Define video data organized by category
const videosByCategory = {
  testimonials: [
    { id: 1, title: "Testimonial 1", duration: "3:42" },
    { id: 2, title: "Testimonial 2", duration: "2:18" },
    { id: 3, title: "Testimonial 3", duration: "4:05" },
    { id: 4, title: "Testimonial 4", duration: "2:53" },
    { id: 5, title: "Testimonial 5", duration: "3:17" },
    { id: 6, title: "Testimonial 6", duration: "2:39" },
    { id: 7, title: "Testimonial 7", duration: "1:58" },
    { id: 8, title: "Testimonial 8", duration: "3:25" },
  ],
  vision: [
    { id: 9, title: "Company Vision", duration: "5:12" },
    { id: 10, title: "Core Values", duration: "3:45" },
    { id: 11, title: "Culture Overview", duration: "4:21" },
    { id: 12, title: "Team Building", duration: "3:10" },
    { id: 13, title: "Leadership Philosophy", duration: "4:43" },
    { id: 14, title: "Mission Statement", duration: "2:28" },
    { id: 15, title: "Company History", duration: "6:15" },
    { id: 16, title: "Future Vision", duration: "3:53" },
  ],
  promo: [
    { id: 17, title: "Product Intro", duration: "2:22" },
    { id: 18, title: "Feature Spotlight", duration: "1:48" },
    { id: 19, title: "Promo Campaign", duration: "3:15" },
    { id: 20, title: "Product Demo", duration: "4:32" },
    { id: 21, title: "Benefits Overview", duration: "2:56" },
    { id: 22, title: "Launch Event", duration: "5:20" },
    { id: 23, title: "Customer Results", duration: "3:19" },
    { id: 24, title: "Product Comparison", duration: "4:07" },
  ],
  training: [
    { id: 25, title: "Getting Started", duration: "6:42" },
    { id: 26, title: "Basic Training", duration: "8:10" },
    { id: 27, title: "Advanced Techniques", duration: "7:35" },
    { id: 28, title: "Launch Preparation", duration: "5:28" },
    { id: 29, title: "Success Strategies", duration: "4:15" },
    { id: 30, title: "Team Training", duration: "6:22" },
    { id: 31, title: "Onboarding Guide", duration: "7:46" },
    { id: 32, title: "Advanced Training", duration: "9:30" },
  ],
};

export default function Insights() {
  // Import navigate for navigation
  const [_, navigate] = useLocation();
  // State to track which video is being played (if any)
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  // State to track if the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store the selected video for the modal
  const [selectedVideo, setSelectedVideo] = useState<{id: number, title: string, duration: string} | null>(null);
  // State to track the active category
  const [activeCategory, setActiveCategory] = useState<string>('testimonials');
  // State to track if the page has loaded for animations
  const [pageLoaded, setPageLoaded] = useState(false);
  
  // Trigger animations when component mounts
  useEffect(() => {
    // Short delay to ensure DOM is ready
    setTimeout(() => {
      setPageLoaded(true);
    }, 100);
  }, []);
  
  // Function to handle category change - improved for better UX
  const handleCategoryChange = (categoryId: string) => {
    // Update the active category
    setActiveCategory(categoryId);
    setActiveVideo(null);
    
    // Add a subtle animation effect when changing categories
    const videosContainer = document.querySelector('.videos-grid');
    if (videosContainer) {
      // Brief opacity animation for transition
      videosContainer.classList.add('opacity-0');
      setTimeout(() => {
        videosContainer.classList.remove('opacity-0');
      }, 50);
    }
    
    // Log for debugging
    console.log(`Changed to category: ${categoryId}`);
  };
  
  // Function to handle video click - open the modal with video info
  const handleVideoClick = (videoId: number) => {
    // Find the selected video in our data
    const video = videosByCategory[activeCategory as keyof typeof videosByCategory].find(v => v.id === videoId);
    if (video) {
      setSelectedVideo(video);
      setActiveVideo(videoId);
      setIsModalOpen(true);
      
      // In a real app, this would prepare the video player
      console.log(`Opening video ${videoId}: ${video.title}`);
    }
  };
  
  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setActiveVideo(null);
    setSelectedVideo(null);
  };
  
  // Function to return to home page
  const handleReturnToHome = () => {
    navigate('/');
  };
  
  return (
    <div className="bg-black min-h-screen w-full">
      
      {/* Video Modal */}
      {isModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/90" onClick={closeModal}></div>
          
          {/* Modal content */}
          <div className="relative z-10 bg-black/90 border border-white/20 p-1 w-[90%] max-w-5xl">
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10 cursor-pointer" onClick={closeModal}>
              <div className="w-8 h-8 flex flex-col justify-center items-center">
                <div className="w-6 h-0.5 bg-white transform rotate-45"></div>
                <div className="w-6 h-0.5 bg-white transform -rotate-45 -mt-0.5"></div>
              </div>
            </div>
            
            {/* Video placeholder */}
            <div className="aspect-video bg-black/70 w-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full border-2 border-white/60 flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-white/80" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21" />
                  </svg>
                </div>
                <p className="text-white/80 text-lg">
                  {selectedVideo.title} • {selectedVideo.duration}
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Video will be available soon
                </p>
              </div>
            </div>
            
            {/* Video info */}
            <div className="p-6">
              <h2 className="text-xl text-white mb-2">{selectedVideo.title}</h2>
              <p className="text-white/70">
                This video is coming soon. In the final version, users will be able to watch videos from the {activeCategory} category.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Main content with improved layout */}
      <div className="relative h-screen w-full flex flex-col">
        
        {/* Category section - centered on desktop, scrolling on mobile */}
        <div className="h-[70px] border-b border-white/10 pt-[30px] pl-[16px] pr-[16px] flex items-center justify-center relative">
          {/* Left shadow indicator for scroll - only on mobile */}
          <div className="absolute left-0 top-[30px] bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none h-[70px] md:hidden"></div>
          
          {/* Category tabs container - centered on desktop, scrollable on mobile */}
          <div className="w-full overflow-x-auto scrollbar-hide px-4 category-scroll-container">
            <div className="flex py-1 space-x-8 min-w-max md:justify-center"> {/* Added justify-center for desktop */}
              {videoCategories.map((category, index) => (
                <div
                  key={category.id}
                  data-category-id={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-5 py-2 transition-all duration-300 relative min-w-max cursor-pointer ${
                    activeCategory === category.id 
                      ? 'text-white bg-black/40 rounded-sm font-medium' 
                      : 'text-white/60 hover:text-white/90 hover:bg-black/20 hover:rounded-sm'
                  }`}
                >
                  <span className="text-[11px] md:text-[13px] uppercase tracking-wider whitespace-nowrap flex items-center">
                    {activeCategory === category.id && (
                      <svg className="w-3 h-3 mr-1.5" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L5 7L13 1" stroke="rgba(255,255,255,0.9)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {category.name}
                  </span>
                  {activeCategory === category.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Right shadow indicator for scroll - only on mobile */}
          <div className="absolute right-0 top-[30px] bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none h-[70px] md:hidden"></div>
        </div>
        
        {/* Videos Grid - Made even smaller to fit without scrolling */}
        <div className="flex-1 p-4 pt-2 pb-2 flex items-center justify-center">
          <div 
            className="videos-grid grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-2 max-w-5xl mx-auto w-full h-[calc(85vh-130px)] transition-all duration-200"
            key={activeCategory}
          >
            {/* Map through videos of the active category */}
            {videosByCategory[activeCategory as keyof typeof videosByCategory].map((video) => (
              <div 
                key={video.id}
                className="border border-white/[0.13] flex items-center justify-center relative overflow-hidden group bg-black/30 h-full cursor-pointer transform transition-transform duration-200 hover:scale-[1.01]"
                onClick={() => handleVideoClick(video.id)}
              >
                <div className="w-full h-full bg-gray-900/60 flex flex-col items-center justify-center">
                  {/* Video Placeholder */}
                  <div 
                    className={`w-full h-full flex items-center justify-center relative cursor-pointer ${
                      activeVideo === video.id ? 'bg-gray-800/80' : 'bg-black/40'
                    }`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      {/* Play button with focus and hover states - smaller size */}
                      <div className={`w-8 h-8 rounded-full border border-white/60 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all ${
                        activeVideo === video.id ? 'scale-90 opacity-80' : ''
                      }`}>
                        <svg className="w-3 h-3 text-white/80 group-hover:text-white" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Video title and duration - More compact */}
                    <div className="absolute bottom-2 left-0 right-0 text-center text-white/80 text-[10px] px-2 group-hover:text-white transition-colors">
                      <div className="truncate font-medium">{video.title}</div>
                      <div className="text-white/50 text-[8px] group-hover:text-white/70 transition-colors">{video.duration}</div>
                    </div>
                  </div>
                </div>
                
                {/* Active state indicator */}
                {activeVideo === video.id && (
                  <div className="absolute inset-0 border-2 border-white/40 pointer-events-none"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Border around entire content */}
        <div className={`absolute inset-0 border border-white/[0.13] transition-all duration-700 ${pageLoaded ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
    </div>
  );
}