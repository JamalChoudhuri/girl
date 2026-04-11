const gallery = document.getElementById('gallery');
const counter = document.getElementById('counter');
let currentTag = 'girl';
let page = 1;

// ছবি লোড করার মেইন ফাংশন
function loadPhotos(tag, isReset = false) {
    if (isReset) {
        gallery.innerHTML = '';
        page = 1;
    }

    for (let i = 0; i < 12; i++) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        // ছবি দেখানোর জন্য নতুন এবং নিশ্চিত লিঙ্ক
        const randomID = Math.floor(Math.random() * 1000) + (page * i);
        const imgUrl = `https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80`; 
        // নোট: উপরের লিঙ্কটি টেস্টের জন্য। নিচের dynamic URL টি আসল কাজ করবে।
        const dynamicUrl = `https://source.unsplash.com/400x600/?${tag},${randomID}`;

        card.innerHTML = `
            <img src="${dynamicUrl}" alt="${tag}" onerror="this.src='https://via.placeholder.com/400x600?text=Loading+Image...'">
            <div class="overlay">
                <a href="${dynamicUrl}" target="_blank" class="download-btn">Download PNG</a>
            </div>
        `;
        gallery.appendChild(card);
    }
    counter.innerText = `Total: ${gallery.children.length}`;
}

// ফিল্টার ফাংশন
function filterBy(tag) {
    currentTag = tag;
    document.getElementById('pageTitle').innerText = tag.toUpperCase() + " COLLECTION";
    
    document.querySelectorAll('.nav-menu button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${tag}`).classList.add('active');

    loadPhotos(tag, true);
}

// স্ক্রল করলে ছবি আসবে
window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
        page++;
        loadPhotos(currentTag);
    }
};

// অ্যাপ চালু করা
window.onload = () => loadPhotos('girl');
