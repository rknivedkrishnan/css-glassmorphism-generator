document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const blurInput = document.getElementById('blur');
    const transparencyInput = document.getElementById('transparency');
    const colorInput = document.getElementById('color');
    const outlineInput = document.getElementById('outline');
    const radiusInput = document.getElementById('radius');

    const blurValDisp = document.getElementById('blur-val');
    const transparencyValDisp = document.getElementById('transparency-val');
    const outlineValDisp = document.getElementById('outline-val');
    const radiusValDisp = document.getElementById('radius-val');

    const previewCard = document.getElementById('preview-card');
    const cssCodeBlock = document.getElementById('css-code');
    const copyBtn = document.getElementById('copy-btn');

    // Helper: Convert Hex to RGB
    const hexToRgb = (hex) => {
        const r = parseInt(hex.substring(1, 3), 16);
        const g = parseInt(hex.substring(3, 5), 16);
        const b = parseInt(hex.substring(5, 7), 16);
        return { r, g, b };
    };

    // Main Update Function
    const updatePreview = () => {
        // 1. Get Values
        const blur = blurInput.value;
        const transparency = transparencyInput.value;
        const colorHex = colorInput.value;
        const outline = outlineInput.value;
        const radius = radiusInput.value;

        // 2. Process Colors
        const { r, g, b } = hexToRgb(colorHex);
        const rgbaColor = `rgba(${r}, ${g}, ${b}, ${transparency})`;
        const borderColor = `rgba(255, 255, 255, 0.3)`; // Keep border semi-transparent white for glass effect

        // 3. Update Display Values
        blurValDisp.innerText = `${blur}px`;
        transparencyValDisp.innerText = transparency;
        outlineValDisp.innerText = `${outline}px`;
        radiusValDisp.innerText = `${radius}px`;

        // 4. Apply Styles to Preview
        previewCard.style.backdropFilter = `blur(${blur}px)`;
        previewCard.style.webkitBackdropFilter = `blur(${blur}px)`;
        previewCard.style.backgroundColor = rgbaColor;
        previewCard.style.borderRadius = `${radius}px`;
        previewCard.style.border = `${outline}px solid ${borderColor}`;

        // 5. Generate CSS Code
        const cssText = `/* Glassmorphism CSS */
background: ${rgbaColor};
border-radius: ${radius}px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: ${outline}px solid rgba(255, 255, 255, 0.3);`;

        cssCodeBlock.innerText = cssText;
    };

    // Event Listeners
    const inputs = [blurInput, transparencyInput, colorInput, outlineInput, radiusInput];
    inputs.forEach(input => {
        input.addEventListener('input', updatePreview);
    });

    // Copy to Clipboard
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssCodeBlock.innerText).then(() => {
            const originalText = copyBtn.innerText;
            copyBtn.innerText = 'Copied!';
            copyBtn.style.background = '#4CAF50';

            setTimeout(() => {
                copyBtn.innerText = originalText;
                copyBtn.style.background = '';
            }, 2000);
        });
    });

    // Initialize
    updatePreview();
});
