document.addEventListener("DOMContentLoaded", () => {
  const accordionButtons = document.querySelectorAll(".accordion-button")

  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // アクティブ状態を切り替え
      this.classList.toggle("active")

      // 対応するコンテンツを取得
      const content = this.nextElementSibling
      content.classList.toggle("active")

      // アイコンの回転
      const icon = this.querySelector("i")
      if (icon) {
        if (this.classList.contains("active")) {
          icon.style.transform = "rotate(180deg)"
        } else {
          icon.style.transform = "rotate(0)"
        }
      }
    })
  })
})

