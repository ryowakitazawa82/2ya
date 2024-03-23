/*
 * 共通で使用する定数
 */

/**
 * DOMの読み込みが完了したら実行
 */
document.addEventListener('DOMContentLoaded', () => {
  dateChange();
});

/**
 * 日付をカウントアップする処理
 */
const startDate = new Date(2022, 2, 18); // 月は0から始まるため、3月は2となります。
const endDate = new Date(2024, 2, 27);
const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 日数の差
const interval = 10000 / diffDays; // 10秒を日数で割ったものをインターバルとします。

const dateChange = setInterval(() => {
  startDate.setDate(startDate.getDate() + 1);
  if (startDate >= endDate) {
    clearInterval(dateChange);
  }
  document.getElementById('date').innerText =
    `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日`;
}, interval);
