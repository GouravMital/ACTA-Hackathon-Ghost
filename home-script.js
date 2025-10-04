// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll animation for elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .app-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add animation class to CSS elements
    document.querySelectorAll('.feature-card, .app-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Update YouTube video embed with proper sizing
    const resizeVideo = function() {
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            const width = videoContainer.offsetWidth;
            const height = width * 0.5625; // 16:9 aspect ratio
            videoContainer.style.height = height + 'px';
            videoContainer.style.paddingBottom = '0';
        }
    };
    
    // Resize video on window resize
    window.addEventListener('resize', resizeVideo);
    
    // Initial video sizing
    resizeVideo();
});