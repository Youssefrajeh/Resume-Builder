// DOM ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabSections = document.querySelectorAll('.tab-section');
    
    function showTab(tabName) {
        // Hide all sections
        tabSections.forEach(section => {
            section.style.display = 'none';
        });
        
        // Remove active from all buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected section
        const activeSection = document.getElementById('tab-' + tabName);
        if (activeSection) {
            activeSection.style.display = 'block';
        }
        
        // Add active to selected button
        const activeButton = document.querySelector(`[data-tab="${tabName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }
    
    // Add click events to tabs
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            showTab(btn.dataset.tab);
        });
    });
    
    // Show first tab by default
    showTab('personal');
    
    // Live preview function
    function generateResumeHTML() {
        const fullName = document.getElementById('fullName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const location = document.getElementById('location')?.value || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const summary = document.getElementById('summary')?.value || '';
        const skills = document.getElementById('skills')?.value || '';
        
        // Get design customization values
        const fontSize = document.getElementById('fontSize')?.value || '14';
        const lineSpacing = document.getElementById('lineSpacing')?.value || '1.5';
        const fontColor = document.getElementById('fontColor')?.value || '#222222';
        const accentColor = document.getElementById('accentColor')?.value || '#8f5cff';
        const fontFamily = document.getElementById('fontFamily')?.value || "'Inter', Arial, sans-serif";
        
        return `
            <div style="font-family: ${fontFamily}; color: ${fontColor}; padding: 20px; font-size: ${fontSize}px; line-height: ${lineSpacing};">
                <h1 style="color: ${accentColor}; margin-bottom: 0.2em; font-size: ${parseInt(fontSize) + 8}px;">${fullName}</h1>
                <div style="margin-bottom: 1em; color: #666;">
                    ${email ? `📧 ${email}` : ''}
                    ${phone ? ` | 📞 ${phone}` : ''}
                    ${location ? ` | 📍 ${location}` : ''}
                </div>
                ${linkedin ? `<div style="margin-bottom: 1em; color: ${accentColor};">🔗 ${linkedin}</div>` : ''}
                
                ${summary ? `
                    <h2 style="color: ${accentColor}; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; font-size: ${parseInt(fontSize) + 4}px;">Professional Summary</h2>
                    <p style="margin-bottom: 1.5em;">${summary}</p>
                ` : ''}
                
                ${skills ? `
                    <h2 style="color: ${accentColor}; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; font-size: ${parseInt(fontSize) + 4}px;">Skills</h2>
                    <div style="margin-bottom: 1.5em;">
                        ${skills.split(',').map(skill => 
                            `<span style="display: inline-block; background: ${accentColor}20; color: ${accentColor}; padding: 4px 12px; margin: 2px 4px; border-radius: 12px; font-size: ${parseInt(fontSize) - 1}px;">${skill.trim()}</span>`
                        ).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    function updateLivePreview() {
        const previewElement = document.getElementById('resumePreview');
        if (previewElement) {
            previewElement.innerHTML = generateResumeHTML();
        }
    }
    
    // Update preview on any input change
    function addInputListeners() {
        const inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('input', updateLivePreview);
            input.addEventListener('change', updateLivePreview);
        });
    }
    
    // Design customization event listeners
    function setupDesignControls() {
        // Font size slider
        const fontSizeSlider = document.getElementById('fontSize');
        const fontSizeValue = document.getElementById('fontSizeValue');
        if (fontSizeSlider && fontSizeValue) {
            fontSizeSlider.addEventListener('input', function() {
                fontSizeValue.textContent = this.value + 'px';
                updateLivePreview();
            });
        }
        
        // Line spacing slider
        const lineSpacingSlider = document.getElementById('lineSpacing');
        const lineSpacingValue = document.getElementById('lineSpacingValue');
        if (lineSpacingSlider && lineSpacingValue) {
            lineSpacingSlider.addEventListener('input', function() {
                lineSpacingValue.textContent = this.value;
                updateLivePreview();
            });
        }
        
        // Color pickers
        const fontColorPicker = document.getElementById('fontColor');
        const accentColorPicker = document.getElementById('accentColor');
        const fontFamilySelect = document.getElementById('fontFamily');
        
        if (fontColorPicker) {
            fontColorPicker.addEventListener('change', updateLivePreview);
        }
        if (accentColorPicker) {
            accentColorPicker.addEventListener('change', updateLivePreview);
        }
        if (fontFamilySelect) {
            fontFamilySelect.addEventListener('change', updateLivePreview);
        }
        
        // Reset button
        const resetButton = document.getElementById('resetDesign');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                document.getElementById('fontSize').value = '14';
                document.getElementById('fontSizeValue').textContent = '14px';
                document.getElementById('lineSpacing').value = '1.5';
                document.getElementById('lineSpacingValue').textContent = '1.5';
                document.getElementById('fontColor').value = '#222222';
                document.getElementById('accentColor').value = '#8f5cff';
                document.getElementById('fontFamily').value = "'Inter', Arial, sans-serif";
                updateLivePreview();
            });
        }
    }
    
    // Initial setup
    setupDesignControls();
    addInputListeners();
    updateLivePreview();
    
    // Add Experience functionality
    document.getElementById('addExperience')?.addEventListener('click', function() {
        const container = document.getElementById('experienceContainer');
        const newItem = document.createElement('div');
        newItem.className = 'experience-item';
        newItem.innerHTML = `
            <div class="form-group">
                <label>Job Title</label>
                <input type="text" class="jobTitle" placeholder="e.g., Software Engineer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="company" placeholder="e.g., Tech Corp">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Start Date</label>
                    <input type="month" class="startDate">
                </div>
                <div class="form-group">
                    <label>End Date</label>
                    <input type="month" class="endDate">
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="description" rows="3" placeholder="Describe your responsibilities"></textarea>
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); updateLivePreview();">Remove</button>
        `;
        container.appendChild(newItem);
        addInputListeners();
    });
    
    // Add Education functionality
    document.getElementById('addEducation')?.addEventListener('click', function() {
        const container = document.getElementById('educationContainer');
        const newItem = document.createElement('div');
        newItem.className = 'education-item';
        newItem.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="degree" placeholder="e.g., Bachelor of Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="institution" placeholder="e.g., University Name">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Graduation Year</label>
                    <input type="number" class="graduationYear" placeholder="2023">
                </div>
                <div class="form-group">
                    <label>GPA (Optional)</label>
                    <input type="text" class="gpa" placeholder="3.8">
                </div>
            </div>
            <button type="button" class="remove-btn" onclick="this.parentElement.remove(); updateLivePreview();">Remove</button>
        `;
        container.appendChild(newItem);
        addInputListeners();
    });
    
    // Export PDF functionality
    document.getElementById('generateResume')?.addEventListener('click', function() {
        const resumeContent = generateResumeHTML();
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Resume</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                    </style>
                </head>
                <body>
                    ${resumeContent}
                    <script>window.print();</script>
                </body>
            </html>
        `);
        printWindow.document.close();
    });
    
    // Preview modal
    document.getElementById('previewResume')?.addEventListener('click', function() {
        const modal = document.getElementById('previewModal');
        const modalContent = document.getElementById('resumePreviewModal');
        if (modal && modalContent) {
            modalContent.innerHTML = generateResumeHTML();
            modal.style.display = 'block';
        }
    });
    
    // Close modal
    document.querySelector('.close')?.addEventListener('click', function() {
        document.getElementById('previewModal').style.display = 'none';
    });
    
    // Clear form
    document.getElementById('clearForm')?.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all data?')) {
            document.querySelectorAll('input, textarea').forEach(input => {
                input.value = '';
            });
            updateLivePreview();
        }
    });
    
    // Make updateLivePreview global so remove buttons can use it
    window.updateLivePreview = updateLivePreview;
}); 