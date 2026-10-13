const products = [
 {id:1,name:"Blush Romance",price:18500,category:"romantic",badge:"Бестселлер",desc:"Пудровые Пионы и нежные сезонные цветы",size:"M · Сезонные Пионы",image:"https://i.pinimg.com/736x/bc/49/05/bc4905e33888f176607eb9755345bce6.jpg"},
 {id:2,name:"Velvet Roses",price:24000,category:"roses",badge:"Классика",desc:"Королевские Гортензии, синее как небо",size:"M · 25 шт",image:"https://i.pinimg.com/736x/41/0f/a5/410fa52df837e98bc884351640f644eb.jpg"},
 {id:3,name:"Soft Poetry",price:16500,category:"minimal",badge:"Нежность",desc:"Воздушная композиция в розовых оттенках",size:"S · вечная классика",image:"https://i.pinimg.com/736x/0e/95/9d/0e959d217a41b8b0b48994e333fa161b.jpg"},
 {id:4,name:"Pink Statement",price:32000,category:"premium",badge:"Премиум",desc:"Выразительный букет с эффектной фактурой",size:"L · 25+ стеблей",image:"https://i.pinimg.com/1200x/fc/e4/7d/fce47dcce34ce3e3cbde4ac4037fd6be.jpg"},
 {id:5,name:"Dophamine Bouqet",price:27500,category:"romantic",badge:"Выбор флориста",desc:"Романтичный микс с пышными сезонными цветами",size:"M · сезонный микс",image:"https://i.pinimg.com/736x/1d/0f/7a/1d0f7af2443fcf91cc5d6b78cedec14a.jpg"},
 {id:6,name:"Rose Atelier",price:21000,category:"roses",badge:"Популярный",desc:"Розы в минималистичной дизайнерской упаковке",size:"XL · 101 роз",image:"https://i.pinimg.com/736x/41/32/79/4132793d55f95098c13c9e66f6a149fe.jpg"},
 {id:7,name:"Pure Form",price:14500,category:"minimal",badge:"Минимализм",desc:"Чистые линии, спокойные оттенки и лёгкость",size:"S · 101 стеблей",image:"https://i.pinimg.com/736x/6e/cd/da/6ecdda9d6276baeb7a4009632e4bc991.jpg"},
 {id:8,name:"Grand Amour",price:42000,category:"premium",badge:"Особенный",desc:"Роскошная композиция для большого чувства",size:"XL · 35+ стеблей",image:"https://i.pinimg.com/736x/9d/8f/19/9d8f19190c3d883360eaa4a2b76a819a.jpg"},
 {id:9,name:"Cherry Blossom",price:19500,category:"romantic",badge:"Новинка",desc:"Нежные розовые розы с воздушными сезонными цветами",size:"M · Нежная композиция",image:"https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80"},
 {id:10,name:"Midnight Elegance",price:36500,category:"premium",badge:"Люкс",desc:"Изысканная композиция в глубоких бордовых и розовых оттенках",size:"L · Премиальная композиция",image:"https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&w=800&q=80"},
 {id:11,name:"Peony Dream",price:28500,category:"romantic",badge:"Любимый выбор",desc:"Пышные пионы в нежной пастельно-розовой гамме",size:"M · Сезонные пионы",image:"https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=800&q=80"},
 {id:12,name:"White Serenity",price:22000,category:"minimal",badge:"Элегантность",desc:"Белые цветы с лаконичным оформлением и воздушной текстурой",size:"M · Белая коллекция",image:"https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80"},
 {id:13,name:"Scarlet Love",price:30000,category:"roses",badge:"Романтика",desc:"Алые розы для яркого и запоминающегося подарка",size:"L · Классические розы",image:"https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80"},
 {id:14,name:"Lavender Mist",price:17500,category:"minimal",badge:"Новая коллекция",desc:"Воздушная композиция с лавандовыми и сиреневыми оттенками",size:"S · Пастельная гамма",image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80"}
];
const money = n => new Intl.NumberFormat("ru-RU").format(n) + " ₸";
let activeFilter = "all";
let cart = JSON.parse(localStorage.getItem("leamour-cart") || "[]");
const grid = document.getElementById("productGrid");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const toast = document.getElementById("toast");

function renderProducts(){
 let list = products.filter(p => activeFilter === "all" || p.category === activeFilter);
 const sort = document.getElementById("sortSelect").value;
 if(sort === "low") list.sort((a,b)=>a.price-b.price);
 if(sort === "high") list.sort((a,b)=>b.price-a.price);
 grid.innerHTML = list.map((p,i) => `<article class="product-card"style="--i:${i}">
  <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-badge">${p.badge}</span><button class="quick-add" data-add="${p.id}" aria-label="Добавить ${p.name} в корзину">+</button></div>
  <div class="product-info"><div class="product-topline"><h3 class="product-name">${p.name}</h3><span class="product-price">${money(p.price)}</span></div><p class="product-description">${p.desc}</p><div class="product-meta"><span>✿ ${p.size}</span><span>Соберём сегодня*</span></div></div></article>`).join("");
 initTilt();
}
function persist(){localStorage.setItem("leamour-cart",JSON.stringify(cart));renderCart();}
function addToCart(id){const found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({id,qty:1});persist();showToast("Букет добавлен в корзину");}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<=0)cart=cart.filter(x=>x.id!==id);persist();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);cartCount.textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;
 const total=cart.reduce((s,x)=>s+(products.find(p=>p.id===x.id)?.price||0)*x.qty,0);
 document.getElementById("cartTotal").textContent=money(total);
 const el=document.getElementById("cartItems");
 if(!cart.length){el.innerHTML='<div class="empty-cart"><span>✿</span><h4>Пока здесь пусто</h4><p>Добавьте букет, который вам понравился.</p></div>';return;}
 el.innerHTML=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-item"><img src="${p.image}" alt="${p.name}"><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="quantity"><button data-qty="${p.id}" data-delta="-1" aria-label="Уменьшить количество">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Увеличить количество">+</button></div></div><div class="cart-item-price">${money(p.price*x.qty)}<br><button class="remove-item" data-remove="${p.id}">Удалить</button></div></div>`}).join("");
}
function openCart(){cartDrawer.classList.add("open");cartOverlay.classList.add("open");cartDrawer.setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){cartDrawer.classList.remove("open");cartOverlay.classList.remove("open");cartDrawer.setAttribute("aria-hidden","true");document.body.style.overflow="";}
let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}
document.getElementById("filters").addEventListener("click",e=>{const btn=e.target.closest("[data-filter]");if(!btn)return;activeFilter=btn.dataset.filter;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();});
document.getElementById("sortSelect").addEventListener("change",renderProducts);
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(btn)addToCart(Number(btn.dataset.add));});
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
cartOverlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.getElementById("cartItems").addEventListener("click",e=>{const q=e.target.closest("[data-qty]");const r=e.target.closest("[data-remove]");if(q)changeQty(Number(q.dataset.qty),Number(q.dataset.delta));if(r){cart=cart.filter(x=>x.id!==Number(r.dataset.remove));persist();}});
document.getElementById("checkoutBtn").addEventListener("click",()=>{
 if(!cart.length){showToast("Сначала добавьте букет в корзину");return;}
 const summary=cart.map(x=>{const p=products.find(p=>p.id===x.id);return `${p.name} × ${x.qty} — ${money(p.price*x.qty)}`}).join("\n");
 const total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 document.querySelector('textarea[name="details"]').value=`Заказ из корзины:\n${summary}\nИтого: ${money(total)}`;
 closeCart();document.getElementById("order").scrollIntoView({behavior:"smooth"});showToast("Оставьте контакты — и мы уточним заказ");
});
document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);

  // Дата доставки
  const dateStr = f.get("deliveryDate");
  const timeStr = f.get("deliveryTime");
  const deliveryInfo = dateStr
    ? `\nДата доставки: ${formatDateRu(dateStr)}${timeStr ? ' в ' + timeStr : ''}`
    : '\nДата доставки: не выбрана';

  const message = `Здравствуйте! Хочу оформить заказ в LeAmourFlowers.
Имя: ${f.get("name")}
Телефон: ${f.get("phone")}
Бюджет: ${f.get("budget")}
Повод: ${f.get("occasion")}${deliveryInfo}
Пожелания: ${f.get("details") || "не указаны"}`;

  // Сохраняем заказ для админки
  const orders = JSON.parse(localStorage.getItem('leamour-orders') || '[]');
  orders.unshift({
    id: 'ORD-' + Date.now(),
    createdAt: new Date().toISOString(),
    name: f.get("name"),
    phone: f.get("phone"),
    budget: f.get("budget"),
    occasion: f.get("occasion"),
    details: f.get("details"),
    deliveryDate: dateStr,
    deliveryTime: timeStr,
    items: cart.map(x => {
      const p = products.find(p => p.id === x.id);
      return `${p.name} × ${x.qty}`;
    }).join(', ') || '—',
    total: cart.reduce((s, x) => s + products.find(p => p.id === x.id).price * x.qty, 0),
    status: 'new'
  });
  localStorage.setItem('leamour-orders', JSON.stringify(orders));

  // Очищаем корзину
  cart = [];
  persist();

  document.getElementById("formStatus").textContent = "Открываем WhatsApp с деталями заявки. Проверьте сообщение и отправьте его менеджеру.";
  const whatsappNumber = "77772751307";
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});

// Форматирование даты для WhatsApp
function formatDateRu(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
renderProducts();
// 3D tilt эффект
function initTilt() {
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
      card.querySelector('.product-image')?.style.setProperty('transform', `scale(1.08) translate(${x * -8}px, ${y * -8}px)`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.querySelector('.product-image')?.style.removeProperty('transform');
    });
  });
}
renderCart();
/* ============================================
   ОТЗЫВЫ — СЛАЙДЕР + ФОРМА
   ============================================ */

// Стартовые отзывы (можно менять)
const defaultReviews = [
  {
    id: 'r1',
    name: 'Алина М.',
    subtitle: 'Заказ на особенный день',
    text: 'Букет превзошёл все ожидания. Очень нежная упаковка, свежие цветы и ощущение, что его собирали именно для нас.',
    stars: 5,
    initial: 'А'
  },
  {
    id: 'r2',
    name: 'Дмитрий К.',
    subtitle: 'Подарок на годовщину',
    text: 'Заказал утром — привезли вечером. Жена была в восторге, а я стал героем дня. Упаковка отдельный вид искусства.',
    stars: 5,
    initial: 'Д'
  },
  {
    id: 'r3',
    name: 'Марина Л.',
    subtitle: 'Просто так, без повода',
    text: 'Хотелось порадовать маму без повода — флорист помог собрать композицию в её любимых пастельных тонах. Мама плакала от счастья.',
    stars: 5,
    initial: 'М'
  }
];

// Загружаем сохранённые отзывы + дефолтные
function getReviews() {
  const saved = JSON.parse(localStorage.getItem('leamour-reviews') || '[]');
  return [...saved, ...defaultReviews];   // новые отзывы сверху
}

let currentReview = 0;
let reviewTimer = null;

// Рендер слайдера
function renderReviews() {
  const list = getReviews();
  const slider = document.getElementById('reviewSlider');
  const dots = document.getElementById('reviewDots');

  if (!slider || !dots) return;

  slider.innerHTML = list.map((r, i) => `
    <div class="review-card ${i === currentReview ? 'active' : ''}" data-index="${i}">
      <div class="review-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
      <blockquote>«${r.text}»</blockquote>
      <div class="review-author">
        <div class="review-avatar">${r.initial || r.name[0]}</div>
        <div>
          <strong>${r.name}</strong>
          <small>${r.subtitle || 'Клиент LeAmourFlowers'}</small>
        </div>
      </div>
    </div>
  `).join('');

  dots.innerHTML = list.map((_, i) =>
    `<span class="${i === currentReview ? 'active' : ''}" data-dot="${i}"></span>`
  ).join('');
}

// Показать отзыв по индексу
function showReview(i) {
  const list = getReviews();
  if (i < 0) i = list.length - 1;
  if (i >= list.length) i = 0;
  currentReview = i;
  renderReviews();
  resetAutoPlay();
}

// Автопрокрутка
function startAutoPlay() {
  reviewTimer = setInterval(() => {
    showReview(currentReview + 1);
  }, 6000);
}
function resetAutoPlay() {
  clearInterval(reviewTimer);
  startAutoPlay();
}

// Инициализация
renderReviews();
startAutoPlay();

// Стрелки
document.getElementById('reviewPrev')?.addEventListener('click', () => showReview(currentReview - 1));
document.getElementById('reviewNext')?.addEventListener('click', () => showReview(currentReview + 1));

// Точки
document.getElementById('reviewDots')?.addEventListener('click', (e) => {
  const dot = e.target.closest('[data-dot]');
  if (dot) showReview(Number(dot.dataset.dot));
});

// Открыть/закрыть форму
const formWrap = document.getElementById('reviewFormWrap');
document.getElementById('reviewOpenBtn')?.addEventListener('click', () => {
  formWrap.classList.add('open');
  clearInterval(reviewTimer);   // пауза автопрокрутки
  formWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.getElementById('reviewCancelBtn')?.addEventListener('click', () => {
  formWrap.classList.remove('open');
  startAutoPlay();
});

// Звёзды в форме
const starsButtons = document.querySelectorAll('#starsInput button');
const starsValue = document.getElementById('reviewStarsValue');

starsButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const n = Number(btn.dataset.star);
    starsValue.value = n;
    starsButtons.forEach(b => {
      b.classList.toggle('active', Number(b.dataset.star) <= n);
    });
  });
  // Ховер
  btn.addEventListener('mouseenter', () => {
    const n = Number(btn.dataset.star);
    starsButtons.forEach(b => {
      b.classList.toggle('active', Number(b.dataset.star) <= n);
    });
  });
});
document.getElementById('starsInput')?.addEventListener('mouseleave', () => {
  const current = Number(starsValue.value);
  starsButtons.forEach(b => {
    b.classList.toggle('active', Number(b.dataset.star) <= current);
  });
});

// Инициализируем 5 звёзд по умолчанию
starsButtons.forEach(b => {
  b.classList.toggle('active', Number(b.dataset.star) <= 5);
});

// Отправка формы
document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.currentTarget);

  const newReview = {
    id: 'r-' + Date.now(),
    name: f.get('reviewName').trim(),
    subtitle: 'Новый отзыв',
    text: f.get('reviewText').trim(),
    stars: Number(f.get('reviewStars')),
    initial: f.get('reviewName').trim()[0].toUpperCase(),
    createdAt: new Date().toISOString()
  };

  // Сохраняем в localStorage
  const saved = JSON.parse(localStorage.getItem('leamour-reviews') || '[]');
  saved.unshift(newReview);
  localStorage.setItem('leamour-reviews', JSON.stringify(saved));

  // Сбрасываем форму, обновляем слайдер, показываем первый отзыв (наш новый)
  e.currentTarget.reset();
  starsValue.value = 5;
  starsButtons.forEach(b => b.classList.toggle('active', true));
  formWrap.classList.remove('open');
  currentReview = 0;
  renderReviews();
  startAutoPlay();

  showToast('Спасибо за отзыв! ✿');
});
/* ============================================
   SCROLL-REVEAL
   Секции плавно появляются при прокрутке
   ============================================ */

function initReveal() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => el.classList.add('visible'));
    return;
  }

  // Создаём observer один раз и переиспользуем
  if (!window.__revealObserver) {
    window.__revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          window.__revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px 0px 0px'
    });
  }

  document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)')
    .forEach(el => window.__revealObserver.observe(el));
}

// Какие элементы анимировать
function setupRevealElements() {
  document.querySelectorAll('.section-heading:not(.reveal)').forEach(el => {
    el.classList.add('reveal');
  });

  document.querySelectorAll('.trust-strip > div:not(.reveal)').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--i', i);
  });

  // Карточки уже имеют reveal из HTML, только пропишем им --i
  document.querySelectorAll('.product-card').forEach((el, i) => {
    el.style.setProperty('--i', i);
  });

  const storyImage = document.querySelector('.story-image');
  const storyCopy = document.querySelector('.story-copy');
  if (storyImage && !storyImage.classList.contains('reveal-left')) storyImage.classList.add('reveal-left');
  if (storyCopy && !storyCopy.classList.contains('reveal-right')) storyCopy.classList.add('reveal-right');

  document.querySelectorAll('.occasion-card:not(.reveal)').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--i', i);
  });

  const testimonial = document.querySelector('.testimonial-section blockquote');
  if (testimonial && !testimonial.classList.contains('reveal')) testimonial.classList.add('reveal');

  const orderCopy = document.querySelector('.order-copy');
  const orderForm = document.querySelector('.order-form');
  if (orderCopy && !orderCopy.classList.contains('reveal-left')) orderCopy.classList.add('reveal-left');
  if (orderForm && !orderForm.classList.contains('reveal-right')) orderForm.classList.add('reveal-right');

  document.querySelectorAll('.footer-main:not(.reveal), .footer-col:not(.reveal)').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.setProperty('--i', i);
  });
}

// Запуск
//setupRevealElements();
//initReveal();
/* ============================================
   ГЕНЕРАТОР ПЛАВАЮЩИХ ЛЕПЕСТКОВ
   ============================================ */

function spawnPetals() {
  const box = document.getElementById('petals');
  if (!box) return;

  const glyphs = ['✿', '❀', '✽', '❁', '✾'];
  const count = 14; // сколько лепестков одновременно

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'petal';
    p.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];

    // Случайная позиция по горизонтали
    p.style.left = Math.random() * 100 + '%';

    // Случайный размер (14–32px)
    p.style.fontSize = (14 + Math.random() * 18) + 'px';

    // Случайная скорость падения (8–18 секунд)
    p.style.animationDuration = (8 + Math.random() * 10) + 's';

    // Случайная задержка — чтобы не падали все сразу
    p.style.animationDelay = (Math.random() * 12) + 's';

    // Случайная прозрачность для глубины
    p.style.opacity = 0.3 + Math.random() * 0.5;

    box.appendChild(p);
  }
}

spawnPetals();
/* ============================================
   ПАРАЛЛАКС В HERO-БЛОКЕ
   Элементы плавно следуют за курсором мыши
   ============================================ */

const hero = document.querySelector('.hero');
const heroVisual = document.querySelector('.hero-visual');
const orbitOne = document.querySelector('.orbit-one');
const orbitTwo = document.querySelector('.orbit-two');

// Проверяем, что все элементы есть на странице
if (hero && heroVisual && orbitOne && orbitTwo) {
  
  hero.addEventListener('mousemove', (e) => {
    // Вычисляем позицию курсора внутри hero
    // 0 = левый/верхний край, 1 = правый/нижний край
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;   // от -0.5 до 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;   // от -0.5 до 0.5

    // Двигаем элементы с разной скоростью (глубиной)
    heroVisual.style.transform = `translate(${x * 25}px, ${y * 25}px)`;
    orbitOne.style.transform  = `translate(${x * -45}px, ${y * -45}px)`;
    orbitTwo.style.transform  = `translate(${x * 60}px, ${y * 60}px)`;
  });

  // Когда мышка уходит с hero — плавно возвращаем всё в исходное
  hero.addEventListener('mouseleave', () => {
    heroVisual.style.transform = '';
    orbitOne.style.transform = '';
    orbitTwo.style.transform = '';
  });
}
/* ============================================
   КАЛЕНДАРЬ ДОСТАВКИ
   ============================================ */

const bookingState = {
  calDate: new Date(),
  selectedDate: null,
  selectedTime: null
};

function renderCalendar() {
  const grid = document.getElementById('calGrid');
  const title = document.getElementById('calTitle');
  if (!grid || !title) return;

  const d = bookingState.calDate;
  const y = d.getFullYear();
  const m = d.getMonth();
  const first = new Date(y, m, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(y, m + 1, 0).getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  title.textContent = first.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  grid.innerHTML = '';

  for (let i = 0; i < startDay; i++) {
    grid.insertAdjacentHTML('beforeend', '<button class="cal-day empty" disabled></button>');
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(y, m, day);
    const iso = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const past = date < today;
    const tooFar = date > maxDate;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-day';
    btn.textContent = day;

    if (date.getTime() === today.getTime()) btn.classList.add('today');
    if (bookingState.selectedDate === iso) btn.classList.add('selected');
    if (past || tooFar) btn.disabled = true;

    btn.addEventListener('click', () => {
      bookingState.selectedDate = iso;
      document.getElementById('deliveryDate').value = iso;
      renderCalendar();
      updateTimeSlots();
    });

    grid.appendChild(btn);
  }
}

function updateTimeSlots() {
  document.querySelectorAll('.slot').forEach(s => {
    s.classList.toggle('selected', s.dataset.time === bookingState.selectedTime);
  });
}

document.querySelectorAll('.cal-nav').forEach(btn => {
  btn.addEventListener('click', () => {
    bookingState.calDate.setMonth(
      bookingState.calDate.getMonth() + Number(btn.dataset.cal)
    );
    renderCalendar();
  });
});

document.querySelectorAll('.slot').forEach(s => {
  s.addEventListener('click', () => {
    if (!bookingState.selectedDate) {
      showToast('Сначала выберите дату');
      return;
    }
    bookingState.selectedTime = s.dataset.time;
    document.getElementById('deliveryTime').value = s.dataset.time;
    updateTimeSlots();
  });
});

renderCalendar();
