// Utility function to convert large numbers to a readable format
export const formatNumber = (num: number) => {
    if (num >= 1e9) {
        return '$' + (num / 1e9).toFixed(1).replace(/\.0$/, '') + 'B';
    } else if (num >= 1e6) {
        return '$' + (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1e3) {
        return '$' + (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return '$' + num + '';
};

// Utility function to format dates
export const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short', // Change to 'short' to shorten month names to three letters
        day: 'numeric',
    };

    // Check if the dateString is a valid date
    if (isNaN(Date.parse(dateString))) {
        return dateString; // Return the original string if it's not a valid date
    }

    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Utility function to debounce a function
export const debounce = (
    func: (query: string) => Promise<void>,
    wait: number,
) => {
    let timeout: NodeJS.Timeout | null = null;
    return (query: string) => {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func(query);
        }, wait);
    };
};

// Utility function to get the average color of an image from a URL (faster by downscaling, more saturated, prevent lighter colors)
export async function getAverageImageColor(imageUrl: string): Promise<string> {
    return new Promise((resolve) => {
        const img = new window.Image();
        img.crossOrigin = 'Anonymous';
        img.src = imageUrl;
        img.onload = () => {
            // Downscale to 10x10 for faster processing
            const size = 10;
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (!ctx) return resolve('#222');
            ctx.drawImage(img, 0, 0, size, size);
            const imageData = ctx.getImageData(0, 0, size, size).data;
            let r = 0,
                g = 0,
                b = 0,
                count = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                r += imageData[i];
                g += imageData[i + 1];
                b += imageData[i + 2];
                count++;
            }
            if (count === 0) return resolve('#222');
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);

            // Convert RGB to HSL, boost saturation, clamp lightness to prevent lighter colors, then convert back to RGB
            function rgbToHsl(r: number, g: number, b: number) {
                r /= 255;
                g /= 255;
                b /= 255;
                const max = Math.max(r, g, b),
                    min = Math.min(r, g, b);
                let h = 0,
                    s = 0;
                const l = (max + min) / 2;
                if (max !== min) {
                    const d = max - min;
                    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                    switch (max) {
                        case r:
                            h = (g - b) / d + (g < b ? 6 : 0);
                            break;
                        case g:
                            h = (b - r) / d + 2;
                            break;
                        case b:
                            h = (r - g) / d + 4;
                            break;
                    }
                    h /= 6;
                }
                return [h, s, l];
            }
            function hslToRgb(h: number, s: number, l: number) {
                let r, g, b;
                if (s === 0) {
                    r = g = b = l;
                } else {
                    const hue2rgb = (p: number, q: number, t: number) => {
                        if (t < 0) t += 1;
                        if (t > 1) t -= 1;
                        if (t < 1 / 6) return p + (q - p) * 6 * t;
                        if (t < 1 / 2) return q;
                        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                        return p;
                    };
                    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                    const p = 2 * l - q;
                    r = hue2rgb(p, q, h + 1 / 3);
                    g = hue2rgb(p, q, h);
                    b = hue2rgb(p, q, h - 1 / 3);
                }
                return [
                    Math.round(r * 255),
                    Math.round(g * 255),
                    Math.round(b * 255),
                ];
            }
            const [h, s, l] = rgbToHsl(r, g, b);
            const sBoosted = Math.min(1, s * 1.5); // Boost saturation
            const lClamped = Math.min(l, 0.45); // Clamp lightness to prevent lighter colors (max 0.45)
            [r, g, b] = hslToRgb(h, sBoosted, lClamped);

            resolve(`${r},${g},${b}`);
        };
        img.onerror = () => resolve('#222');
    });
}
