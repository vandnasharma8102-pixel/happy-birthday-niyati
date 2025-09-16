document.addEventListener('DOMContentLoaded', function() {

    // --- PAGE NAVIGATION LOGIC ---
    const mainContent = document.getElementById('main-content');
    const thoughtsPage = document.getElementById('thoughts-page');
    const showThoughtsBtn = document.getElementById('show-thoughts-btn');
    const goBackBtn = document.getElementById('go-back-btn');

    showThoughtsBtn.addEventListener('click', () => {
        mainContent.classList.add('hidden');
        thoughtsPage.classList.remove('hidden');
        window.scrollTo(0, 0); // Scroll to top of new "page"
    });

    goBackBtn.addEventListener('click', () => {
        thoughtsPage.classList.add('hidden');
        mainContent.classList.remove('hidden');
        window.scrollTo(0, 0); // Scroll to top of main page
        // Reset the thoughts page for next time
        resetThoughtsPage();
    });

    // --- "HONEST THOUGHTS" REVEAL LOGIC ---
    const revealButton = document.getElementById('reveal-honest-thoughts-btn');
    const thoughtsContainer = document.getElementById('thoughts-content-container');
    const sweetThoughts = thoughtsContainer.querySelectorAll('.sweet-thought');

    const roastThoughts = [
        "Laughs at my pain harder than they laugh at stand-up comedy.",
        "Loyal? Yes. But mostly loyal to WiFi and sleep.",
        "Birthday aa gaya, par maturity abhi bhi “loading…",
        "Brain ka size MB mein hai, attitude GB mein.",
      "Gym ka plan 100 baar banaya, result abhi bhi “before photo” jaisa.",
      "Duniya ko lecture degi, khud ki life Google Maps ke bina nahi chalti.",
      "99 problems hai, par solution ke naam pe: “chhod na yaar.”",
"Tera talent? 24/7 bakwaas karna without recharge.",
      "Tu itni lazy hai ki alarm bhi tujhe dekh ke bolti hai: “bhai, rehne de.”",
      "Tere jokes pe sirf tu hi hansti hain.",
      "Tere bina zindagi boring hoti… aur tere saath zindagi irritating hoti."
    ];

    revealButton.addEventListener('click', function() {
        sweetThoughts.forEach(thought => thought.classList.add('crossed-out'));
        roastThoughts.forEach(roast => {
            const p = document.createElement('p');
            p.textContent = roast;
            p.classList.add('roast-thought');
            thoughtsContainer.appendChild(p);
        });
        this.style.display = 'none';
    });

    function resetThoughtsPage() {
        sweetThoughts.forEach(thought => thought.classList.remove('crossed-out'));
        thoughtsContainer.querySelectorAll('.roast-thought').forEach(el => el.remove());
        revealButton.style.display = 'inline-block';
    }

    // --- CONFEETI EFFECT ON PAGE LOAD ---
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#FF6B6B', '#FFD166', '#06D6A0', '#4ECDC4'];
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = `${Math.random() * 100}vw`;
            confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            if (Math.random() > 0.5) { confetti.style.width = '15px'; confetti.style.height = '8px'; }
            document.body.appendChild(confetti);
            confetti.addEventListener('animationend', () => confetti.remove());
        }
    }
    createConfetti();

    // --- ROTATING BIRTHDAY QUOTES ---
    const quotes = ["Age is just a number. In your case, a really, really high one. 😉", "Happy birthday! May your Instagram wall be filled with messages from people you barely know.", "You're not old, you're vintage. And slightly more valuable.", "Don't worry about getting older. You're still going to do dumb stuff, only slower.", "It's scientifically proven that people who have more birthdays live longer. Congrats!", "Another year closer to getting that senior discount. The future is bright!"];
    const quoteElement = document.querySelector('#quotes .quote-text');
    if (quoteElement) {
        let currentQuoteIndex = 0;
        quoteElement.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
            quoteElement.style.opacity = 0;
            setTimeout(() => { quoteElement.textContent = quotes[currentQuoteIndex]; quoteElement.style.opacity = 1; }, 500);
        }, 5000);
    }

    // --- MEME FLIP EFFECT ---
    document.querySelectorAll('.meme-card').forEach(card => card.addEventListener('click', () => card.classList.toggle('is-flipped')));

    // --- NEW: VOUCHER SCRATCH & WHATSAPP LOGIC (with Bitly links) ---
    
    // **IMPORTANT**: Replace these placeholders with your actual Bitly links.
    // The order must match the order of vouchers in your HTML file.
    const voucherBitlyLinks = [
        "https://bit.ly/3VCYeY5", // Virtual Roast Session
        "https://bit.ly/3K5Urji", // Retail Therapy Rebate
        "https://bit.ly/4pn5LYj", // One Free Treat
        "https://bit.ly/4gqg1ej", // Self-Care Stimulus Package
        "https://bit.ly/4mYPaZo"  // Compliment Coins
    ];

    document.querySelectorAll('.voucher').forEach((voucher, index) => {
        const canvas = voucher.querySelector('.scratch-canvas');
        const useBtn = voucher.querySelector('.use-voucher-btn');
        
        // Assign the correct Bitly link to the button's href attribute
        if (voucherBitlyLinks[index]) {
            useBtn.href = voucherBitlyLinks[index];
        } else {
            console.error(`Bitly link for voucher ${index + 1} is missing.`);
            useBtn.href = "#"; // Fallback
        }

        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        let isDrawing = false;
        
        function setupCanvas() {
            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);

            const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
            gradient.addColorStop(0, '#d3d3d3');
            gradient.addColorStop(0.5, '#c0c0c0');
            gradient.addColorStop(1, '#d3d3d3');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#666';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = 'bold 24px Poppins';
            ctx.fillText('Scratch Here!', rect.width / 2, rect.height / 2);
        }

        function getScratchPosition(e) {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches ? e.touches[0] : e;
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        }

        function scratch(e) {
            if (!isDrawing) return;
            e.preventDefault();
            const pos = getScratchPosition(e);
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, 20, 0, Math.PI * 2);
            ctx.fill();
        }

        function checkCompletion() {
            if (isDrawing) return;
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imageData.data;
            let transparentPixels = 0;
            for (let i = 3; i < pixels.length; i += 4) {
                if (pixels[i] === 0) {
                    transparentPixels++;
                }
            }
            const scratchedPercent = (transparentPixels / (pixels.length / 4)) * 100;
            if (scratchedPercent > 60) {
                canvas.style.opacity = '0';
                useBtn.classList.remove('hidden');
                setTimeout(() => canvas.remove(), 800);
            }
        }
        
        ['mousedown', 'touchstart'].forEach(evt => canvas.addEventListener(evt, (e) => {
            isDrawing = true;
            scratch(e);
        }));

        ['mousemove', 'touchmove'].forEach(evt => canvas.addEventListener(evt, scratch));
        
        ['mouseup', 'mouseleave', 'touchend'].forEach(evt => canvas.addEventListener(evt, () => {
             if (isDrawing) {
                isDrawing = false;
                checkCompletion();
             }
        }));

        setupCanvas();
        window.addEventListener('resize', setupCanvas);
    });

    // --- SMOOTH SCROLLING FOR NAV LINKS ---
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if(targetElement) {
               targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
