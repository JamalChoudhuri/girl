// বিভিন্ন ক্যাটাগরির জন্য সোর্স ডেটা
const photoData = {
    girl: ["https://source.unsplash.com/featured/?girl,model", "https://source.unsplash.com/featured/?woman,portrait", "https://source.unsplash.com/featured/?girl,fashion"],
    sea: ["https://source.unsplash.com/featured/?sea,ocean", "https://source.unsplash.com/featured/?beach,water", "https://source.unsplash.com/featured/?waves,sea"],
    couple: ["https://source.unsplash.com/featured/?couple,love", "https://source.unsplash.com/featured/?romance,couple", "https://source.unsplash.com/featured/?wedding,couple"]
};

function showCategory(category) {
    const gallery = document.getElementById('gallery');
    const title = document.getElementById('category-title');
    
    // টাইটেল আপডেট করা
    if(category === 'girl') title.innerText = "মেয়েদের ছবি দেখানো হচ্ছে";
    else if(category === 'sea') title.innerText = "সমুদ্রের ছবি দেখানো হচ্ছে";
    else title.innerText = "কাপল ছবি দেখানো হচ্ছে";

    gallery.innerHTML = ''; // আগের ছবিগুলো মুছে ফেলা

    // ১০টি করে রেন্ডম ছবি জেনারেট করা (ওপেন সোর্স)
    for (let i = 0; i < 10; i++) {
        const imgCard = document.createElement('div');
        imgCard.className = 'photo-card';
        
        // Unsplash Source ব্যবহার করে রেন্ডম ছবি (প্রতিবার লোডে নতুন ছবি আসবে)
        const imageUrl = `https://source.unsplash.com/featured/400x500?${category}&sig=${Math.random() + i}`;
        
        imgCard.innerHTML = `
            <img src="${imageUrl}" alt="${category}">
            <div class="download-btn">
                <a href="${imageUrl}" target="_blank">View Full Size</a>
            </div>
        `;
        gallery.appendChild(imgCard);
    }
}

// প্রথমবার পেজ ওপেন করলে 'girl' ক্যাটাগরি দেখাবে
window.onload = () => showCategory('girl');
