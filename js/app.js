const dataRoot = document.body.dataset.root || '';
const nav = document.getElementById('siteNav');
const navToggle = document.querySelector('.nav-toggle');
const langButtons = document.querySelectorAll('.lang-button');
const revealTargets = document.querySelectorAll('.reveal');
const placeholderImage =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

/* ------------------------- NAV MENU ------------------------- */
if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('nav-open'));
  });
}

/* ------------------------- LANGUAGE SWITCH ------------------------- */
if (langButtons.length) {
  langButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const lang = button.dataset.lang;
      const target =
        lang === 'fa'
          ? `${dataRoot}fa/index.html`
          : `${dataRoot}index.html`;
      window.location.href = target;
    });
  });
}

/* ------------------------- SCROLL REVEAL ------------------------- */
if (revealTargets.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => observer.observe(el));
}

/* ------------------------- LAZY LOADING ------------------------- */
const lazyObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  },
  { rootMargin: '0px 0px 200px 0px' }
);

function enableLazyImages(scope) {
  scope
    .querySelectorAll('.lazy-img[data-src]')
    .forEach((img) => lazyObserver.observe(img));
}

/* ------------------------- PRODUCTS ------------------------- */
async function loadProducts() {
  const list = document.getElementById('product-list');
  const preview = document.getElementById('product-preview');
  if (!list && !preview) return;

  try {
    const response = await fetch(`${dataRoot}data/products.json`);
    if (!response.ok) throw new Error('Failed to load products');
    const products = await response.json();
    const markup = products
      .map((product) => renderProductCard(product))
      .join('');

    if (list) {
      list.innerHTML = markup;
      enableLazyImages(list);
    }
    if (preview) {
      preview.innerHTML = products
        .slice(0, 3)
        .map((product) => renderProductCard(product))
        .join('');
      enableLazyImages(preview);
    }
  } catch (error) {
    console.error(error);
    const message = '<p>Products are temporarily unavailable. Please refresh.</p>';
    if (list) list.innerHTML = message;
    if (preview) preview.innerHTML = message;
  }
}

function renderProductCard(product) {
  const waText = encodeURIComponent(
    "Hi, I'm interested in this wall art product. Please share details."
  );
  const waLink = `https://wa.me/98919996608?text=${waText}`;
  const imageSrc = `${dataRoot}${product.image}`;

  return `
    <article class="card product-card">
      <img class="lazy-img" src="${placeholderImage}" data-src="${imageSrc}"
           alt="${product.name}" loading="lazy">
      <div class="product-card-content">
        <h3>${product.name}</h3>
        <p class="product-meta">${product.category}</p>
        <p class="product-price">${product.price}</p>
      </div>
      <div class="product-card-actions">
        <a class="btn btn-secondary" href="${waLink}" target="_blank" rel="noreferrer">
          Ask via WhatsApp
        </a>
      </div>
    </article>
  `;
}

/* ------------------------- BLOG ------------------------- */
async function loadBlog() {
  const blogList = document.getElementById('blog-list');
  const blogPreview = document.getElementById('blog-list-home');
  if (!blogList && !blogPreview) return;

  try {
    const response = await fetch(`${dataRoot}data/blog-posts.json`);
    if (!response.ok) throw new Error('Failed to load blog posts');
    const posts = await response.json();

    if (blogList) {
      blogList.innerHTML = posts
        .map((post) => renderBlogCard(post))
        .join('');
      enableLazyImages(blogList);
    }
    if (blogPreview) {
      blogPreview.innerHTML = posts
        .slice(0, 3)
        .map((post) => renderBlogCard(post))
        .join('');
      enableLazyImages(blogPreview);
    }
  } catch (error) {
    console.error(error);
    const message = '<p>Blog posts are temporarily unavailable. Please refresh.</p>';
    if (blogList) blogList.innerHTML = message;
    if (blogPreview) blogPreview.innerHTML = message;
  }
}

function renderBlogCard(post) {
  const imageSrc = `${dataRoot}${post.thumb}`;

  return `
    <article class="card blog-card">
      <img class="lazy-img" src="${placeholderImage}" data-src="${imageSrc}"
           alt="${post.title}" loading="lazy">
      <div class="blog-card-content">
        <p class="blog-card-date">${
          new Date(post.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })
        }</p>
        <h3>${post.title}</h3>
        <p>${post.excerpt || ''}</p>
      </div>
      <div class="blog-card-actions">
        <a class="btn btn-secondary" href="${post.link}">Read article</a>
      </div>
    </article>
  `;
}

/* ------------------------- GALLERY (UPDATED FULL VERSION) ------------------------- */

const defaultGalleryImages = [
  '/images/gallery/mm.webp',
  '/images/gallery/stairs.jpg',
  '/images/gallery/sal.webp',
  '/images/gallery/yel.webp',
  '/images/gallery/teamwork.webp',
  '/images/gallery/god.webp',
  '/images/gallery/mus.webp',
  '/images/gallery/tree.webp',
  '/images/gallery/tel.jpg',
  '/images/gallery/img-6345.jpeg',
  '/images/gallery/img-6353.jpeg',
  '/images/gallery/img-6415.jpeg'
];

const galleryCaptions = {
  'mm.webp': 'Layered monochrome mural',
  'stairs.jpg': 'Clean stairwell repaint',
  'sal.webp': 'Soft lime-wash hallway',
  'yel.webp': 'Balanced accent wall',
  'teamwork.webp': 'Crew preparing a feature wall',
  'god.webp': 'Handcrafted artistic wall finish',
  'mus.webp': 'Modern artistic brush texture',
  'tree.webp': 'Natural textured wall',
  'tel.jpg': 'Soft pastel tone finish',
  'img-6345.jpeg': 'Real repaint project — modern white',
  'img-6353.jpeg': 'Living room wall refresh',
  'img-6415.jpeg': 'Bright hallway repaint'
};

async function loadGallery() {
  const preview = document.getElementById('gallery-preview-grid');
  const gallery = document.getElementById('gallery-grid');
  if (!preview && !gallery) return;

  // Folder listing on Vercel will always fail → use fallback
  let files = defaultGalleryImages.map((src) => `${dataRoot}${src}`);

  if (preview) {
    renderGallery(preview, files, Number(preview.dataset.limit) || 4);
  }
  if (gallery) {
    renderGallery(gallery, files, Number(gallery.dataset.limit) || files.length);
  }
}

function renderGallery(container, images, limit) {
  const subset = limit && limit > 0 ? images.slice(0, limit) : images;

  container.innerHTML = subset
    .map(
      (src) => `
      <figure class="card gallery-card">
        <img class="lazy-img" src="${placeholderImage}"
             data-src="${src}" alt="Rangestan project" loading="lazy">
        <figcaption>${getGalleryCaption(src)}</figcaption>
      </figure>`
    )
    .join('');

  enableLazyImages(container);
}

function getGalleryCaption(path) {
  const filename = path.split('/').pop().toLowerCase();
  return galleryCaptions[filename] || 'Calm Rangestan wall finish';
}

/* ------------------------- FOOTER YEAR ------------------------- */

function updateYear() {
  document
    .querySelectorAll('#year')
    .forEach((node) => (node.textContent = new Date().getFullYear()));
}

updateYear();
loadProducts();
loadBlog();
loadGallery();
