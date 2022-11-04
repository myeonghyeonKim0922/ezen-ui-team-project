
export function toggleLoading(on) {
  const loadingEl = document.querySelector(".loading");

    if (loadingEl) {
      loadingEl.style.display = on ? "block": "none";
    } else {
      if (on) {
        const mainWrap = document.querySelector(".main__wrap");

        const newLoadingEl = document.createElement("div");

        newLoadingEl.classList.add("loading");
        newLoadingEl.innerHTML = `
          <i class="fa-solid fa-compact-disc"></i>
        `;

        mainWrap.appendChild(newLoadingEl);
      }
    }
}