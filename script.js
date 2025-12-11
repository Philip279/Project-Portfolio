// Projects data
const projects = [
    {
        title: "Explore Cape Town",
        description: "A responsive website showcasing Cape Town's top attractions and tourism information, built with HTML and CSS.",
        technologies: ["HTML", "CSS", "Responsive Design"],
        image: "https://cdn.pixabay.com/photo/2017/05/08/15/11/capetown-2295679_1280.jpg",
        liveDemo: "https://philip279.github.io/Explore-Cape-Town/",
        sourceCode: "https://github.com/Philip279/Explore-Cape-Town",
        documentation: "Documentation/Explore_Cape_town_testing.pdf",
        specification: "Documentation/Explore_Cape_town_specification.pdf",
        category: "web"
    },
    {
        title: "Equipment Hire System",
        description: "A Python-based command-line application for managing equipment rentals and processing late returns.",
        technologies: ["Python"],
        image: "https://cdn.pixabay.com/photo/2024/03/31/02/11/python-8665904_1280.png",
        liveDemo: "#",
        sourceCode: "https://github.com/Philip279/Equipment-Hire-Python-Script",
        documentation: "Documentation/1_Python_Documentation.pdf",
        category: "python"
    },
    {
        title: "Database Management System",
        description: "A SQL database project with documentation covering schema design, queries, and testing procedures.",
        technologies: ["SQL", "Database Design", "Documentation"],
        image: "https://cdn.pixabay.com/photo/2016/12/09/18/30/database-schema-1895779_1280.png",
        liveDemo: "#",
        sourceCode: "#",
        documentation: "Documentation/Databases_Documentation.pdf",
        category: "sql"
    }
];

// Build project cards grouped by category
function createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    projectsGrid.innerHTML = '';

    const categories = {
        'web': {
            title: 'Web Development',
            projects: projects.filter(project => project.category === 'web')
        },
        'python': {
            title: 'Python Projects',
            projects: projects.filter(project => project.category === 'python')
        },
        'sql': {
            title: 'SQL Projects',
            projects: projects.filter(project => project.category === 'sql')
        }
    };

    Object.entries(categories).forEach(([key, category]) => {
        if (category.projects.length === 0) return;

        const section = document.createElement('div');
        section.className = 'project-category';
        section.innerHTML = `<h3>${category.title}</h3><div class="projects-container"></div>`;
        
        const container = section.querySelector('.projects-container');
        
        category.projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card fade-in';
            
            const techList = project.technologies.map(tech => 
                `<span class="tech-tag">${tech}</span>`
            ).join('');
            
            const docLinks = [];
            if (project.documentation) {
                const docPath = project.documentation.startsWith('http') ? 
                    project.documentation : 
                    `./${project.documentation}`;
                docLinks.push(`<a href="${docPath}" target="_blank" class="doc-link">View Testing</a>`);
            }
            if (project.specification) {
                const specPath = project.specification.startsWith('http') ? 
                    project.specification : 
                    `./${project.specification}`;
                docLinks.push(`<a href="${specPath}" target="_blank" class="doc-link spec">View Spec</a>`);
            }
            
            projectCard.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/400x250?text=Image+Not+Found'">
                <div class="project-info">
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-tech">${techList}</div>
                    <div class="project-links">
                        ${project.liveDemo !== '#' ? `<a href="${project.liveDemo}" target="_blank" class="live-demo">Live Demo</a>` : ''}
                        ${project.sourceCode !== '#' ? `<a href="${project.sourceCode}" target="_blank" class="source-code">Source Code</a>` : ''}
                        ${docLinks.join('')}
                    </div>
                </div>
            `;
            
            container.appendChild(projectCard);
        });

        projectsGrid.appendChild(section);
    });
}

// Initialize projects when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createProjectCards();
});

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Fade-in animation on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    setTimeout(animateOnScroll, 100);
});

window.addEventListener('scroll', animateOnScroll);

// IntersectionObserver for section animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});