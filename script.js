const API_BASE_URL = '/api';

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch(`${API_BASE_URL}/contacts/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                alert(data.message);
                contactForm.reset();
            } else {
                alert('Failed to send message: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/`);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
            const grid = document.getElementById('projectsGrid');
            if (grid) {
                grid.innerHTML = '';
                data.slice(0, 3).forEach(p => {
                    const card = document.createElement('div');
                    card.className = 'project-card';
                    card.innerHTML = `
                        <div class="project-content">
                            <h3>${p.title}</h3>
                            <p>${p.description}</p>
                            <div class="project-tags">
                                ${(p.technologies || []).map(t => `<span class="project-tag">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="project-links">
                            ${p.github_url ? `<a href="${p.github_url}" target="_blank" class="project-link"><i class="fab fa-github"></i> Code</a>` : ''}
                            ${p.live_url ? `<a href="${p.live_url}" target="_blank" class="project-link"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
        }
    } catch (error) {
        console.error('Failed to load projects:', error);
    }
}

async function loadSkills() {
    try {
        const response = await fetch(`${API_BASE_URL}/skills/`);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
            const grid = document.getElementById('skillsGrid');
            if (grid) {
                grid.innerHTML = '';
                data.forEach(s => {
                    const card = document.createElement('div');
                    card.className = 'skill-category';
                    card.innerHTML = `
                        <div class="skill-header">
                            <i class="${s.icon || 'fas fa-tools'}"></i>
                            <h3>${s.name}</h3>
                        </div>
                        <p>${s.description || ''}</p>
                        <div class="skill-tags">
                            <span class="skill-tag">${s.category}</span>
                            <span class="skill-tag">Proficiency: ${s.proficiency}%</span>
                        </div>
                    `;
                    grid.appendChild(card);
                });
            }
        }
    } catch (error) {
        console.error('Failed to load skills:', error);
    }
}

async function loadExperience() {
    try {
        const response = await fetch(`${API_BASE_URL}/experience/`);
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
            const list = document.getElementById('experienceList');
            if (list) {
                list.innerHTML = '';
                data.forEach(e => {
                    const item = document.createElement('div');
                    item.className = 'experience-item';
                    item.innerHTML = `
                        <div class="exp-header">
                            <h3>${e.position}</h3>
                            <span class="exp-company">${e.company}</span>
                            <span class="exp-location">${e.location}</span>
                        </div>
                        <div class="exp-details">
                            <span class="exp-duration">${e.currently_working ? 'Current' : ''}</span>
                            <span class="exp-type">${e.employment_type}</span>
                        </div>
                        <p class="exp-description">${e.description}</p>
                    `;
                    list.appendChild(item);
                });
            }
        }
    } catch (error) {
        console.error('Failed to load experience:', error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetch(`${API_BASE_URL}/health/`)
        .then(response => response.json())
        .then(data => console.log('API Health:', data))
        .catch(error => console.log('API not available'));
    
    loadProjects();
    loadSkills();
    loadExperience();

    // Hamburger menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });
    }
});
