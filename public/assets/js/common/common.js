/*
 * 共通で使用する定数
 */
const headerElem = document.getElementById("header");

/*
 * スクロール量を保存
 */
// 初期のY座標を取得
let nowPosition = window.scrollY;
// headerを表示させるY座標を取得
window.addEventListener("scroll", () => {
  nowPosition = window.scrollY;
});

