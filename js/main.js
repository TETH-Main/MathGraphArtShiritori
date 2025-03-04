// Feather Iconsの初期化
import feather from "feather-icons" // Import feather-icons

document.addEventListener("DOMContentLoaded", () => {
  // Feather Iconsの初期化
  feather.replace()

  // 現在の年を取得してフッターに表示
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // モバイルメニューの制御
  const mobileMenuButton = document.querySelector(".mobile-menu-button")
  const mobileNav = document.querySelector(".mobile-nav")
  const body = document.body

  if (mobileMenuButton && mobileNav) {
    mobileMenuButton.addEventListener("click", () => {
      mobileNav.classList.toggle("active")

      // メニューが開いているときはボディのスクロールを無効化
      if (mobileNav.classList.contains("active")) {
        body.classList.add("menu-open")
        mobileMenuButton.innerHTML = feather.icons["x"].toSvg()
      } else {
        body.classList.remove("menu-open")
        mobileMenuButton.innerHTML = feather.icons["menu"].toSvg()
      }

      // Feather Iconsを再初期化
      feather.replace()
    })

    // モバイルメニューのリンクをクリックしたらメニューを閉じる
    const mobileNavLinks = mobileNav.querySelectorAll(".nav-link")
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("active")
        body.classList.remove("menu-open")
        mobileMenuButton.innerHTML = feather.icons["menu"].toSvg()
        feather.replace()
      })
    })
  }
})

