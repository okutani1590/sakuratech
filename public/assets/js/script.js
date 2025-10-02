// 慣性スクロール

let activeSection = 0;
const sections = document.querySelectorAll('[id^="section-"]');
const dots = document.querySelectorAll('[id^="dot-"]');
const container = document.getElementById("scroll-container");

function updateActiveSection(newActiveSection) {
  if (newActiveSection === activeSection) return;

  // 前のセクションを非表示
  sections[activeSection].style.opacity = "0";
  dots[activeSection].classList.remove("active", "bg-blue-400");
  dots[activeSection].classList.add("bg-white", "bg-opacity-30");

  // 新しいセクションを表示
  activeSection = newActiveSection;
  sections[activeSection].style.opacity = "1";
  dots[activeSection].classList.remove("bg-white", "bg-opacity-30");
  dots[activeSection].classList.add("active", "bg-blue-400");
}

function handleScroll() {
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  // コンテナが画面に入っているかチェック
  if (scrollY + windowHeight > containerTop && scrollY < containerTop + containerHeight) {
    // コンテナ内でのスクロール進行度を計算 (0-1)
    const progress = Math.max(0, Math.min(1, (scrollY + windowHeight - containerTop) / (containerHeight + windowHeight)));

    // 進行度に基づいてアクティブセクションを決定
    const newActiveSection = Math.min(2, Math.floor(progress * 3));
    updateActiveSection(newActiveSection);
  }
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // 初期状態をセット

// スライダー

const swiper = new Swiper(".swiper", {
  loop: true, // ループ
  allowTouchMove: false, // ← これで手でスライド不可
  speed: 1500, // 少しゆっくり(デフォルトは300)
  effect: "fade", // フェード
  autoplay: {
    // 自動再生
    delay: 4000, // 2秒後に次のスライド
    disableOnInteraction: false, // 矢印をクリックしても自動再生を止めない
  },
  // ページネーション
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // 前後の矢印
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
