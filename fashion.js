/**
 * SOVEREIGN UNIVERSAL RENDERING ENGINE V2.0
 * Capacity: 5,000+ Nodes | 50+ Categories
 */

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const categoryContainer = document.querySelector('.filter-bar'); // The UI for your 50 categories
    const params = new URLSearchParams(window.location.search);
    const nodeName = params.get('node') || "Sovereign Elite Node";

    // 1. BRANDING DOMINATION
    document.getElementById('shop-name').innerText = nodeName.replace(/-/g, ' ').toUpperCase();

    // 2. DATA INGESTION
    fetch('products.json')
        .then(res => res.json())
        .then(inventory => {
            
            // Generate Category Buttons Automatically (For your 50 categories)
            const categories = [...new Set(inventory.map(item => item.category))];
            renderFilters(categories, inventory);

            // Initial Render of All Products
            renderInventory(inventory);
        })
        .catch(err => console.error("[FATAL ERROR]: Infrastructure Sync Failed", err));
});

// 3. THE MASS-RENDERER
function renderInventory(items) {
    const grid = document.querySelector('.grid');
    grid.innerHTML = ''; // Wipe the current view for new data
    
    items.forEach(item => {
        grid.innerHTML += `
            <div class="card" onclick="window.location.href='product.html?id=${item.id}&node=${getNode()}'">
                <div class="badge">${item.category.toUpperCase()}</div>
                <h3>${item.name}</h3>
                <p>${item.desc.substring(0, 50)}...</p>
                <div class="price">₹${item.price}</div>
                <button class="action-btn">VIEW SPECIFICATIONS</button>
            </div>`;
    });
}

// 4. THE 50-CATEGORY FILTER LOGIC
function renderFilters(categories, fullInventory) {
    const filterBar = document.getElementById('filter-bar');
    filterBar.innerHTML = `<button class="filter-btn active" onclick="filterData('all')">ALL NODES</button>`;
    
    categories.forEach(cat => {
        filterBar.innerHTML += `
            <button class="filter-btn" onclick="filterData('${cat}')">${cat.toUpperCase()}</button>`;
    });

    // Filtering Functionality
    window.filterData = (category) => {
        if (category === 'all') {
            renderInventory(fullInventory);
        } else {
            const filtered = fullInventory.filter(p => p.category === category);
            renderInventory(filtered);
        }
    };
}

// Helper to keep the Shop Name in the URL during navigation
function getNode() {
    return new URLSearchParams(window.location.search).get('node') || "Elite-Node";
}

// 5. THE WHATSAPP BRIDGE (For the Product Page)
function triggerSovereignInquiry(product, price) {
    const shop = document.getElementById('shop-name').innerText;
    const msg = encodeURIComponent(`[EXTERNAL SOVEREIGN INQUIRY]\nTarget Node: ${shop}\nAsset: ${product}\nValuation: ${price}\nStatus: Verification Requested.`);
    window.open(`https://wa.me/917003718537?text=${msg}`);
}