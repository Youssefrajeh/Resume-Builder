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
            // Re-setup design controls when Design tab is clicked
            if (btn.dataset.tab === 'design') {
                setTimeout(setupDesignControls, 100);
            }
        });
    });
    
    // Show first tab by default
    showTab('personal');
    
    // Live preview function
    function generateResumeHTML() {
        const selectedTemplate = document.querySelector('.template-option.active')?.dataset.template || 'modern';
        
        switch(selectedTemplate) {
            case 'classic':
                return generateClassicLayout();
            case 'creative':
                return generateCreativeLayout();
            case 'minimal':
                return generateMinimalLayout();
            default:
                return generateModernLayout();
        }
    }
    
    function generateModernLayout() {
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
        
        // Get experience data
        const experienceItems = Array.from(document.querySelectorAll('.experience-item')).map(item => ({
            jobTitle: item.querySelector('.jobTitle')?.value || '',
            company: item.querySelector('.company')?.value || '',
            startDate: item.querySelector('.startDate')?.value || '',
            endDate: item.querySelector('.endDate')?.value || '',
            description: item.querySelector('.description')?.value || ''
        })).filter(exp => exp.jobTitle || exp.company);
        
        // Get education data
        const educationItems = Array.from(document.querySelectorAll('.education-item')).map(item => ({
            degree: item.querySelector('.degree')?.value || '',
            institution: item.querySelector('.institution')?.value || '',
            graduationYear: item.querySelector('.graduationYear')?.value || '',
            gpa: item.querySelector('.gpa')?.value || ''
        })).filter(edu => edu.degree || edu.institution);
        
        return `
            <div style="font-family: ${fontFamily}; color: ${fontColor}; padding: 20px; font-size: ${fontSize}px; line-height: ${lineSpacing};">
                <h1 style="color: ${fontColor}; margin-bottom: 0.2em; font-size: ${parseInt(fontSize) + 8}px; font-weight: bold;">${fullName}</h1>
                <div style="margin-bottom: 1em; color: ${fontColor}; opacity: 0.8;">
                    ${email ? `📧 ${email}` : ''}
                    ${phone ? ` | 📞 ${phone}` : ''}
                    ${location ? ` | 📍 ${location}` : ''}
                </div>
                ${linkedin ? `<div style="margin-bottom: 1em; color: ${accentColor};">🔗 ${linkedin}</div>` : ''}
                
                ${summary ? `
                    <h2 style="color: ${accentColor}; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; font-size: ${parseInt(fontSize) + 4}px;">Professional Summary</h2>
                    <p style="margin-bottom: 1.5em; color: ${fontColor};">${summary}</p>
                ` : ''}
                
                ${experienceItems.length > 0 ? `
                    <h2 style="color: ${accentColor}; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; font-size: ${parseInt(fontSize) + 4}px;">Work Experience</h2>
                    ${experienceItems.map(exp => `
                        <div style="margin-bottom: 1.2em;">
                            <h3 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold;">${exp.jobTitle}${exp.company ? ` at ${exp.company}` : ''}</h3>
                            ${exp.startDate || exp.endDate ? `<div style="color: ${fontColor}; opacity: 0.7; margin-bottom: 0.5em; font-size: ${parseInt(fontSize) - 1}px;">${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''}</div>` : ''}
                            ${exp.description ? `<p style="margin-bottom: 0; color: ${fontColor};">${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                ` : ''}
                
                ${educationItems.length > 0 ? `
                    <h2 style="color: ${accentColor}; border-bottom: 2px solid ${accentColor}; padding-bottom: 5px; font-size: ${parseInt(fontSize) + 4}px;">Education</h2>
                    ${educationItems.map(edu => `
                        <div style="margin-bottom: 1.2em;">
                            <h3 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold;">${edu.degree}${edu.institution ? ` at ${edu.institution}` : ''}</h3>
                            ${edu.graduationYear || edu.gpa ? `<div style="color: ${fontColor}; opacity: 0.7; margin-bottom: 0.5em; font-size: ${parseInt(fontSize) - 1}px;">${edu.graduationYear}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</div>` : ''}
                        </div>
                    `).join('')}
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
    
    function generateClassicLayout() {
        const fullName = document.getElementById('fullName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const location = document.getElementById('location')?.value || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const summary = document.getElementById('summary')?.value || '';
        const skills = document.getElementById('skills')?.value || '';
        
        const fontSize = document.getElementById('fontSize')?.value || '14';
        const lineSpacing = document.getElementById('lineSpacing')?.value || '1.5';
        const fontColor = document.getElementById('fontColor')?.value || '#222222';
        const accentColor = document.getElementById('accentColor')?.value || '#8f5cff';
        const fontFamily = document.getElementById('fontFamily')?.value || "'Times New Roman', serif";
        
        const experienceItems = Array.from(document.querySelectorAll('.experience-item')).map(item => ({
            jobTitle: item.querySelector('.jobTitle')?.value || '',
            company: item.querySelector('.company')?.value || '',
            startDate: item.querySelector('.startDate')?.value || '',
            endDate: item.querySelector('.endDate')?.value || '',
            description: item.querySelector('.description')?.value || ''
        })).filter(exp => exp.jobTitle || exp.company);
        
        const educationItems = Array.from(document.querySelectorAll('.education-item')).map(item => ({
            degree: item.querySelector('.degree')?.value || '',
            institution: item.querySelector('.institution')?.value || '',
            graduationYear: item.querySelector('.graduationYear')?.value || '',
            gpa: item.querySelector('.gpa')?.value || ''
        })).filter(edu => edu.degree || edu.institution);
        
        return `
            <div style="font-family: ${fontFamily}; color: ${fontColor}; padding: 20px; font-size: ${fontSize}px; line-height: ${lineSpacing}; text-align: center;">
                <h1 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 8}px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">${fullName}</h1>
                <div style="margin-bottom: 2em; color: ${fontColor}; opacity: 0.8; border-bottom: 1px solid ${accentColor}; padding-bottom: 1em;">
                    ${email ? `${email}` : ''}
                    ${phone ? ` • ${phone}` : ''}
                    ${location ? ` • ${location}` : ''}
                    ${linkedin ? `<br>${linkedin}` : ''}
                </div>
                
                <div style="text-align: left;">
                    ${summary ? `
                        <h2 style="color: ${accentColor}; text-align: center; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em; text-transform: uppercase; letter-spacing: 1px;">Summary</h2>
                        <p style="margin-bottom: 2em; color: ${fontColor}; text-align: justify;">${summary}</p>
                    ` : ''}
                    
                    ${experienceItems.length > 0 ? `
                        <h2 style="color: ${accentColor}; text-align: center; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
                        ${experienceItems.map(exp => `
                            <div style="margin-bottom: 1.5em;">
                                <h3 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold;">${exp.jobTitle}</h3>
                                <div style="color: ${fontColor}; font-style: italic; margin-bottom: 0.5em;">${exp.company} ${exp.startDate || exp.endDate ? `(${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''})` : ''}</div>
                                ${exp.description ? `<p style="margin-bottom: 0; color: ${fontColor}; text-align: justify;">${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    ` : ''}
                    
                    ${educationItems.length > 0 ? `
                        <h2 style="color: ${accentColor}; text-align: center; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
                        ${educationItems.map(edu => `
                            <div style="margin-bottom: 1.5em;">
                                <h3 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold;">${edu.degree}</h3>
                                <div style="color: ${fontColor}; font-style: italic;">${edu.institution} ${edu.graduationYear || edu.gpa ? `(${edu.graduationYear}${edu.gpa ? ` - GPA: ${edu.gpa}` : ''})` : ''}</div>
                            </div>
                        `).join('')}
                    ` : ''}
                    
                    ${skills ? `
                        <h2 style="color: ${accentColor}; text-align: center; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em; text-transform: uppercase; letter-spacing: 1px;">Skills</h2>
                        <div style="text-align: center; margin-bottom: 1.5em;">
                            ${skills.split(',').map(skill => skill.trim()).join(' • ')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    function generateCreativeLayout() {
        const fullName = document.getElementById('fullName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const location = document.getElementById('location')?.value || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const summary = document.getElementById('summary')?.value || '';
        const skills = document.getElementById('skills')?.value || '';
        
        const fontSize = document.getElementById('fontSize')?.value || '14';
        const lineSpacing = document.getElementById('lineSpacing')?.value || '1.5';
        const fontColor = document.getElementById('fontColor')?.value || '#222222';
        const accentColor = document.getElementById('accentColor')?.value || '#8f5cff';
        const fontFamily = document.getElementById('fontFamily')?.value || "'Inter', Arial, sans-serif";
        
        const experienceItems = Array.from(document.querySelectorAll('.experience-item')).map(item => ({
            jobTitle: item.querySelector('.jobTitle')?.value || '',
            company: item.querySelector('.company')?.value || '',
            startDate: item.querySelector('.startDate')?.value || '',
            endDate: item.querySelector('.endDate')?.value || '',
            description: item.querySelector('.description')?.value || ''
        })).filter(exp => exp.jobTitle || exp.company);
        
        const educationItems = Array.from(document.querySelectorAll('.education-item')).map(item => ({
            degree: item.querySelector('.degree')?.value || '',
            institution: item.querySelector('.institution')?.value || '',
            graduationYear: item.querySelector('.graduationYear')?.value || '',
            gpa: item.querySelector('.gpa')?.value || ''
        })).filter(edu => edu.degree || edu.institution);
        
        return `
            <div style="font-family: ${fontFamily}; color: ${fontColor}; padding: 0; font-size: ${fontSize}px; line-height: ${lineSpacing}; display: flex; min-height: 600px;">
                <div style="background: linear-gradient(135deg, ${accentColor}, ${accentColor}dd); width: 35%; padding: 30px 20px; color: white;">
                    <h1 style="color: white; margin-bottom: 1em; font-size: ${parseInt(fontSize) + 6}px; font-weight: bold;">${fullName}</h1>
                    
                    <div style="margin-bottom: 2em;">
                        <h3 style="color: white; font-size: ${parseInt(fontSize) + 2}px; margin-bottom: 0.5em;">Contact</h3>
                        ${email ? `<div style="margin-bottom: 0.3em;">📧 ${email}</div>` : ''}
                        ${phone ? `<div style="margin-bottom: 0.3em;">📞 ${phone}</div>` : ''}
                        ${location ? `<div style="margin-bottom: 0.3em;">📍 ${location}</div>` : ''}
                        ${linkedin ? `<div style="margin-bottom: 0.3em;">🔗 ${linkedin}</div>` : ''}
                    </div>
                    
                    ${skills ? `
                        <div style="margin-bottom: 2em;">
                            <h3 style="color: white; font-size: ${parseInt(fontSize) + 2}px; margin-bottom: 0.5em;">Skills</h3>
                            ${skills.split(',').map(skill => 
                                `<div style="background: rgba(255,255,255,0.2); padding: 4px 8px; margin: 4px 0; border-radius: 4px; font-size: ${parseInt(fontSize) - 1}px;">${skill.trim()}</div>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
                
                <div style="flex: 1; padding: 30px 25px; background: white;">
                    ${summary ? `
                        <h2 style="color: ${accentColor}; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em;">About Me</h2>
                        <p style="margin-bottom: 2em; color: ${fontColor};">${summary}</p>
                    ` : ''}
                    
                    ${experienceItems.length > 0 ? `
                        <h2 style="color: ${accentColor}; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em;">Experience</h2>
                        ${experienceItems.map(exp => `
                            <div style="margin-bottom: 1.5em; border-left: 3px solid ${accentColor}; padding-left: 15px;">
                                <h3 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold;">${exp.jobTitle}</h3>
                                <div style="color: ${accentColor}; font-weight: 500; margin-bottom: 0.3em;">${exp.company}</div>
                                ${exp.startDate || exp.endDate ? `<div style="color: ${fontColor}; opacity: 0.7; margin-bottom: 0.5em; font-size: ${parseInt(fontSize) - 1}px;">${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''}</div>` : ''}
                                ${exp.description ? `<p style="margin-bottom: 0; color: ${fontColor};">${exp.description}</p>` : ''}
                            </div>
                        `).join('')}
                    ` : ''}
                    
                    ${educationItems.length > 0 ? `
                        <h2 style="color: ${accentColor}; font-size: ${parseInt(fontSize) + 4}px; margin-bottom: 1em;">Education</h2>
                        ${educationItems.map(edu => `
                            <div style="margin-bottom: 1.5em; border-left: 3px solid ${accentColor}; padding-left: 15px;">
                                <h3 style="color: ${fontColor}; margin-bottom: 0.3em; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold;">${edu.degree}</h3>
                                <div style="color: ${accentColor}; font-weight: 500;">${edu.institution}</div>
                                ${edu.graduationYear || edu.gpa ? `<div style="color: ${fontColor}; opacity: 0.7; font-size: ${parseInt(fontSize) - 1}px;">${edu.graduationYear}${edu.gpa ? ` - GPA: ${edu.gpa}` : ''}</div>` : ''}
                            </div>
                        `).join('')}
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    function generateMinimalLayout() {
        const fullName = document.getElementById('fullName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const location = document.getElementById('location')?.value || '';
        const linkedin = document.getElementById('linkedin')?.value || '';
        const summary = document.getElementById('summary')?.value || '';
        const skills = document.getElementById('skills')?.value || '';
        
        const fontSize = document.getElementById('fontSize')?.value || '14';
        const lineSpacing = document.getElementById('lineSpacing')?.value || '1.5';
        const fontColor = document.getElementById('fontColor')?.value || '#222222';
        const accentColor = document.getElementById('accentColor')?.value || '#8f5cff';
        const fontFamily = document.getElementById('fontFamily')?.value || "'Helvetica', Arial, sans-serif";
        
        const experienceItems = Array.from(document.querySelectorAll('.experience-item')).map(item => ({
            jobTitle: item.querySelector('.jobTitle')?.value || '',
            company: item.querySelector('.company')?.value || '',
            startDate: item.querySelector('.startDate')?.value || '',
            endDate: item.querySelector('.endDate')?.value || '',
            description: item.querySelector('.description')?.value || ''
        })).filter(exp => exp.jobTitle || exp.company);
        
        const educationItems = Array.from(document.querySelectorAll('.education-item')).map(item => ({
            degree: item.querySelector('.degree')?.value || '',
            institution: item.querySelector('.institution')?.value || '',
            graduationYear: item.querySelector('.graduationYear')?.value || '',
            gpa: item.querySelector('.gpa')?.value || ''
        })).filter(edu => edu.degree || edu.institution);
        
        return `
            <div style="font-family: ${fontFamily}; color: ${fontColor}; padding: 40px 20px; font-size: ${fontSize}px; line-height: ${lineSpacing}; max-width: 600px; margin: 0 auto;">
                <h1 style="color: ${fontColor}; margin-bottom: 0.5em; font-size: ${parseInt(fontSize) + 6}px; font-weight: 300; letter-spacing: 1px;">${fullName}</h1>
                <div style="margin-bottom: 3em; color: ${fontColor}; opacity: 0.8; font-size: ${parseInt(fontSize) - 1}px;">
                    ${email ? `${email}` : ''}
                    ${phone ? ` • ${phone}` : ''}
                    ${location ? ` • ${location}` : ''}
                    ${linkedin ? `<br><a href="${linkedin}" style="color: ${accentColor}; text-decoration: none;">${linkedin}</a>` : ''}
                </div>
                
                ${summary ? `
                    <div style="margin-bottom: 3em; color: ${fontColor}; font-size: ${parseInt(fontSize) + 1}px; line-height: 1.6;">${summary}</div>
                ` : ''}
                
                ${experienceItems.length > 0 ? `
                    <h2 style="color: ${fontColor}; font-size: ${parseInt(fontSize) + 2}px; font-weight: 400; margin-bottom: 1.5em; text-transform: uppercase; letter-spacing: 2px;">Experience</h2>
                    ${experienceItems.map(exp => `
                        <div style="margin-bottom: 2em;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.3em;">
                                <h3 style="color: ${fontColor}; margin: 0; font-size: ${parseInt(fontSize) + 1}px; font-weight: 500;">${exp.jobTitle}</h3>
                                <span style="color: ${fontColor}; opacity: 0.6; font-size: ${parseInt(fontSize) - 1}px;">${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''}</span>
                            </div>
                            <div style="color: ${accentColor}; margin-bottom: 0.5em; font-size: ${fontSize}px;">${exp.company}</div>
                            ${exp.description ? `<p style="margin: 0; color: ${fontColor}; opacity: 0.9;">${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                ` : ''}
                
                ${educationItems.length > 0 ? `
                    <h2 style="color: ${fontColor}; font-size: ${parseInt(fontSize) + 2}px; font-weight: 400; margin-bottom: 1.5em; text-transform: uppercase; letter-spacing: 2px;">Education</h2>
                    ${educationItems.map(edu => `
                        <div style="margin-bottom: 2em;">
                            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.3em;">
                                <h3 style="color: ${fontColor}; margin: 0; font-size: ${parseInt(fontSize) + 1}px; font-weight: 500;">${edu.degree}</h3>
                                <span style="color: ${fontColor}; opacity: 0.6; font-size: ${parseInt(fontSize) - 1}px;">${edu.graduationYear}</span>
                            </div>
                            <div style="color: ${accentColor}; font-size: ${fontSize}px;">${edu.institution}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}</div>
                        </div>
                    `).join('')}
                ` : ''}
                
                ${skills ? `
                    <h2 style="color: ${fontColor}; font-size: ${parseInt(fontSize) + 2}px; font-weight: 400; margin-bottom: 1.5em; text-transform: uppercase; letter-spacing: 2px;">Skills</h2>
                    <div style="color: ${fontColor}; opacity: 0.9;">${skills.split(',').map(skill => skill.trim()).join(' • ')}</div>
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
        // Template selection
        const templateOptions = document.querySelectorAll('.template-option');
        templateOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                templateOptions.forEach(opt => opt.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                // Update preview
                updateLivePreview();
            });
        });
        
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
        
        // Color pickers - add both input and change events
        const fontColorPicker = document.getElementById('fontColor');
        const accentColorPicker = document.getElementById('accentColor');
        const fontFamilySelect = document.getElementById('fontFamily');
        
        if (fontColorPicker) {
            fontColorPicker.addEventListener('input', updateLivePreview);
            fontColorPicker.addEventListener('change', updateLivePreview);
        }
        if (accentColorPicker) {
            accentColorPicker.addEventListener('input', updateLivePreview);
            accentColorPicker.addEventListener('change', updateLivePreview);
        }
        if (fontFamilySelect) {
            fontFamilySelect.addEventListener('change', updateLivePreview);
        }
        
        // Reset button
        const resetButton = document.getElementById('resetDesign');
        if (resetButton) {
            resetButton.addEventListener('click', function() {
                const fontSize = document.getElementById('fontSize');
                const fontSizeValue = document.getElementById('fontSizeValue');
                const lineSpacing = document.getElementById('lineSpacing');
                const lineSpacingValue = document.getElementById('lineSpacingValue');
                const fontColor = document.getElementById('fontColor');
                const accentColor = document.getElementById('accentColor');
                const fontFamily = document.getElementById('fontFamily');
                
                if (fontSize) fontSize.value = '14';
                if (fontSizeValue) fontSizeValue.textContent = '14px';
                if (lineSpacing) lineSpacing.value = '1.5';
                if (lineSpacingValue) lineSpacingValue.textContent = '1.5';
                if (fontColor) fontColor.value = '#222222';
                if (accentColor) accentColor.value = '#8f5cff';
                if (fontFamily) fontFamily.value = "'Inter', Arial, sans-serif";
                
                // Reset template to modern
                templateOptions.forEach(opt => opt.classList.remove('active'));
                const modernOption = document.querySelector('[data-template="modern"]');
                if (modernOption) modernOption.classList.add('active');
                
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
        
        // Add event listeners to the new inputs
        newItem.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updateLivePreview);
            input.addEventListener('change', updateLivePreview);
        });
        
        updateLivePreview();
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
        
        // Add event listeners to the new inputs
        newItem.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updateLivePreview);
            input.addEventListener('change', updateLivePreview);
        });
        
        updateLivePreview();
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