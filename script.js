const gallery = document.getElementById('gallery');
const counter = document.getElementById('counter');
const loaderMessage = document.getElementById('loaderMessage');
let currentTag = 'girl';
let page = 1;
const batchSize = 12; // প্রতিবার কয়টি ছবি আসবে

// ছবি লোড করার মেইন ফাংশন
function loadPhotos(tag, isReset = false) {
    if (isReset) {
        gallery.innerHTML = '';
        page = 1;
        loaderMessage.innerText = "নতুন ছবি লোড হচ্ছে...";
    }

    for (let i = 0; i < batchSize; i++) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        // ছবি দেখানোর জন্য নিশ্চিত এবং ডাইনামিক লিঙ্ক (Unsplash)
        const randomID = Math.floor(Math.random() * 1000) + (page * batchSize) + i;
        const dynamicUrl = `https://source.unsplash.com/400x600/?${tag},${randomID}`;

        card.innerHTML = `
            <img src="${dynamicUrl}" alt="${tag} ${randomID}" onload="imageLoaded()" onerror="imageError(this)">
            <div class="overlay">
                <a href="${dynamicUrl}" target="_blank" class="download-btn">View Full Size</a>
            </div>
        `;
        gallery.appendChild(card);
    }
    
    // লোডার মেসেজ আপডেট
    setTimeout(() => {
        loaderMessage.innerText = "স্ক্রল করে আরো ছবি দেখুন...";
    }, 1500);
}

// ছবি সফলভাবে লোড হলে কাউন্টার আপডেট
function imageLoaded() {
    counter.innerText = `Total Loaded: ${gallery.children.length}`;
}

// ছবি লোডে সমস্যা হলে একটি ফিক্সড ইমেজ সেট করা
function imageError(img) {
    img.src = "https://via.placeholder.com/400x600?text=Error+Loading+Image";
}

// ফিল্টার ফাংশন (Girl, Sea, Couple)
function filterBy(tag) {
    currentTag = tag;
    
    // শিরোনাম এবং টাইটেল পরিবর্তন
    document.getElementById('pageTitle').innerText = tag.charAt(0).toUpperCase() + tag.slice(1) + " Collection";
    
    // বাটন অ্যাক্টিভ করা
    document.querySelectorAll('.nav-menu button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${tag}`).classList.add('active');

    loadPhotos(tag, true);
}

// স্ক্রল করলে ছবি আসবে (Infinite Scroll)
window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
        page++;
        loadPhotos(currentTag);
    }
};

// অ্যাপ চালু হলে 'girl' ক্যাটাগরি লোড করা
window.onload = () => loadPhotos('girl');
