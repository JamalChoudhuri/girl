const gallery = document.getElementById('gallery');
const pageTitle = document.getElementById('pageTitle');
const counter = document.getElementById('counter');

let currentTag = 'girl'; // ডিফল্ট ক্যাটাগরি
let pageCount = 1;

// ছবি নিয়ে আসার মেইন ফাংশন
async function loadPhotos(tag, isReset = false) {
    if (isReset) {
        gallery.innerHTML = '';
        pageCount = 1;
    }

    // লুপ চালিয়ে ১২টি ছবি তৈরি করা
    for (let i = 0; i < 12; i++) {
        const randomID = Math.floor(Math.random() * 5000);
        const imgUrl = `https://source.unsplash.com/featured/800x1200?${tag}&sig=${randomID + pageCount}`;
        
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `
            <img src="${imgUrl}" alt="${tag}">
            <div class="overlay">
                <span style="color:white; margin-bottom:12px; font-weight:600; font-size:14px;">Premium Asset #${randomID}</span>
                <a href="${imgUrl}" target="_blank" class="download-btn">Free Download</a>
            </div>
        `;
        gallery.appendChild(card);
    }
    
    counter.innerText = `Assets: ${gallery.children.length}`;
}

// ক্যাটাগরি ফিল্টার ফাংশন
function filterBy(tag) {
    currentTag = tag;
    
    // শিরোনাম পরিবর্তন
    const titles = {
        'girl': 'Elegant Girl Portraits',
        'sea': 'Breathtaking Ocean Views',
        'couple': 'Romantic Couple Moments'
    };
    pageTitle.innerText = titles[tag];

    // বাটনের কালার পরিবর্তন করা
    document.querySelectorAll('.nav-menu button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`btn-${tag}`).classList.add('active');

    loadPhotos(tag, true); // পেজ রিসেট করে লোড করা
}

// স্ক্রল করলে অটোমেটিক লোড হবে (Infinite Scroll)
window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
        pageCount++;
        loadPhotos(currentTag);
    }
};

// প্রথমবার লোডিং
loadPhotos('girl');
