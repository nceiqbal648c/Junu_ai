function normalizeName(name) {
    return String(name || '')
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_]/g, '');
}

const storyPlots = [
    { title: "Neon Alley Mystery", plot: "A mysterious rainy night encounter in a cyberpunk alleyway with neon reflections", mood: "suspenseful, cyberpunk glow" },
    { title: "Golden Hour Solitude", plot: "A quiet, moody reflection inside a vintage room during a golden hour sunset", mood: "melancholic, warm cinematic lighting" },
    { title: "Rooftop Escape", plot: "An adventurous escape across high-rise city rooftops under a starry night sky", mood: "action-packed, dynamic perspective" },
    { title: "Secret Archive", plot: "Uncovering a hidden secret in an old ancient library filled with glowing artifacts", mood: "mysterious, dramatic shadows" },
    { title: "Midnight Drive", plot: "A dramatic late-night journey through empty coastal highways with soft moonlight", mood: "atmospheric, emotional depth" }
];

function createPrompt(options = {}) {
    const safeOptions = options || {};
    const randomStory = storyPlots[Math.floor(Math.random() * storyPlots.length)];
    
    const age = String(safeOptions.age || '40');
    let subject = age === '40' 
        ? (safeOptions.subject || "40-year-old mature male character, confident and expressive features")
        : (safeOptions.subject || "19-year-old university student female character, natural and expressive features");

    const storyPlot = safeOptions.plot || randomStory.plot;
    const mood = safeOptions.mood || randomStory.mood;
    const style = safeOptions.style || 'high-end 3D cinematic animation, motion graphics style';
    const quality = 'masterpiece, 8k resolution, ultra-detailed textures, smooth cinematic motion';
    
    // Video and Camera specific additions for better output
    const camera = safeOptions.camera || 'smooth cinematic pan, slow zoom-in, dynamic tracking shot, steady framing';
    const motion = safeOptions.motion || 'natural fluid movement, high motion consistency, realistic physics';

    return {
        ageGroup: age === '40' ? "40 Years Old" : "19 Years Old",
        storyTitle: randomStory.title,
        prompt: `${subject}, involved in: ${storyPlot}, style: ${style}, mood: ${mood}, camera movement: ${camera}, motion details: ${motion}, ${quality}`,
        negativePrompt: 'low quality, blurry, deformed, bad anatomy, jittery motion, morphing, watermarks, fast erratic cuts',
        aspectRatio: safeOptions.ratio || '9:16',
        videoConfig: {
            engine: safeOptions.engine || 'Runway Gen-3 / Luma Dream Machine / Kling AI',
            duration: safeOptions.duration || '5s',
            fps: 24,
            guidanceScale: 7.5,
            steps: 30
        }
    };
}

module.exports = {
    createPrompt,
    normalizeName
};
