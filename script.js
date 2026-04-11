const gallery = document.getElementById('gallery');
const counter = document.getElementById('counter');
let currentTag = 'girl';
let page = 1;

// নিশ্চিত ছবি লোড করার ফাংশন
function loadPhotos(tag, isReset = false) {
    if (isReset) {
        gallery.innerHTML = '';
        page = 1;
    }

    // প্রতিবার ১২টি ছবি লোড হবে
    for (let i = 0; i < 12; i++) {
        const card = document.createElement('div');
        card.className = 'photo-card';
        
        // এখানে পিক্সাম এবং আনস্প্ল্যাশ-এর স্ট্যাটিক মেথড ব্যবহার করা হয়েছে যা নিশ্চিতভাবে কাজ করে
        const randomID = Math.floor(Math.random() * 1000) + (page * i);
        
        // লজিক্যাল সার্চ কি-ওয়ার্ড
        let searchQuery = tag;
        if(tag === 'girl') searchQuery = 'woman,fashion';
        if(tag === 'sea') searchQuery = 'ocean,beach';
        if(tag === 'couple') searchQuery = 'couple,love';

        const imgUrl = `https://images.unsplash.com/photo-${1500000000000 + randomID}?auto=format&fit=crop&w=500&q=60&sig=${randomID}`;
        // যদি আনস্প্ল্যাশ ডাইনামিক কাজ না করে, তবে পিক্সাম ব্যাকআপ
        const fallbackUrl = `https://picsum.photos/400/600?random=${randomID}`;

        card.innerHTML = `
            <img src="https://loremflickr.com/400/600/${searchQuery}?lock=${randomID}" 
                 alt="${tag}" 
                 onerror="this.src='${fallbackUrl}'">
            <div class="overlay">
                <a href="#" class="download-btn">Download HD</a>
            </div>
        `;
        gallery.appendChild(card);
    }
    counter.innerText = `Assets: ${gallery.children.length}`;
}

function filterBy(tag) {
    currentTag = tag;
    document.getElementById('pageTitle').innerText = "Premium " + tag.charAt(0).toUpperCase() + tag.slice(1) + " Collection";
    
    document.querySelectorAll('.nav-menu button').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-${tag}`).classList.add('active');

    loadPhotos(tag, true);
}

window.onscroll = () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) {
        page++;
        loadPhotos(currentTag);
    }
};

// সাইট ওপেন হলে প্রথম লোড
window.onload = () => loadPhotos('girl');
