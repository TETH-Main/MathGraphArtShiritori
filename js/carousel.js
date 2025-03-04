document.addEventListener('DOMContentLoaded', async function() {
  const latestArtItem = document.getElementById('latestArtwork');
  const carousel = document.getElementById('artCarousel');
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  
  if (!latestArtItem || !carousel || !prevButton || !nextButton) return;
    
  try {
    // 作品データを取得
    const artworks = await fetchArtworks();

    const latestArtwork = artworks[artworks.length - 1];
    // 最新しりとりにアイテムを追加
    latestArtItem.innerHTML = '';
    const latestWord = latestArtwork.word || latestArtwork.word || '';
    const latestArtist = latestArtwork.artist || latestArtwork.artistName || latestArtwork.artist || '';
    
    const cardItem = document.createElement('div');
    cardItem.className = 'card-content';
    cardItem.innerHTML = `
      <h2 class="section-title">現在のバトン</h2>
      <div class="baton-info">
        <div class="baton-item">
          <h3 class="baton-label">バトン保持者</h3>
          <p class="baton-value text-muted">${latestArtist}</p>
        </div>
        <div class="baton-item">
          <h3 class="baton-label">前回の単語</h3>
          <p class="baton-value bold">${latestWord}</p>
        </div>
        <div class="baton-item">
          <h3 class="baton-label">次の単語の頭文字</h3>
          <p class="baton-value bold primary large">${latestWord.charAt(latestWord.length - 1)}</p>
        </div>
      </div>
    `;
    latestArtItem.appendChild(cardItem);

    // カルーセルにアイテムを追加
    carousel.innerHTML = '';
    artworks.forEach(artwork => {
      const imageUrl = artwork.imageUrl || artwork.image || artwork.imageLink || 'images/placeholder.jpg';
      const word = artwork.word || artwork.word || '';
      const artist = artwork.artist || artwork.artistName || artwork.artist || '';
      const artistLink = artwork.artistLink || artwork.artistUrl || artwork.artistLink || '#';
      const date = artwork.date || artwork.postDate || artwork.date || '';
      const formattedDate = date ? new Date(date).toLocaleDateString('ja-JP') : '';
      
      const carouselItem = document.createElement('div');
      carouselItem.className = 'carousel-item';
      carouselItem.innerHTML = `
        <div class="card">
          <div class="card-image">
            <a href="${artistLink}" target="_blank" rel="noopener noreferrer">
              <img src="${imageUrl}" alt="${word}">
              ${artistLink.includes('twitter.com') ? '@' + artistLink.split('/').pop() : artistLink}
            </a>
          </div>
          <div class="card-content">
            <h3 class="card-title">${word}</h3>
            <p class="artwork-artist">${artist}</p>
            <p class="artwork-date">${formattedDate}</p>
          </div>
        </div>
      `;
      carousel.appendChild(carouselItem);
    });
    
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    
    // ウィンドウサイズに応じて表示アイテム数を取得
    function getItemsPerView() {
      if (window.innerWidth < 640) {
        return 1;
      } else if (window.innerWidth < 1024) {
        return 2;
      } else {
        return 3;
      }
    }
    
    // カルーセルの位置を更新
    function updateCarousel() {
      const itemWidth = 100 / itemsPerView;
      carousel.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
      
      // ボタンの有効/無効状態を更新
      const items = carousel.querySelectorAll('.carousel-item');
      prevButton.disabled = currentIndex <= 0;
      nextButton.disabled = currentIndex >= items.length - itemsPerView;
      
      prevButton.style.opacity = prevButton.disabled ? '0.5' : '1';
      nextButton.style.opacity = nextButton.disabled ? '0.5' : '1';
    }
    
    // 前へボタンのクリックイベント
    prevButton.addEventListener('click', function() {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });
    
    // 次へボタンのクリックイベント
    nextButton.addEventListener('click', function() {
      const items = carousel.querySelectorAll('.carousel-item');
      if (currentIndex < items.length - itemsPerView) {
        currentIndex++;
        updateCarousel();
      }
    });
    
    // ウィンドウリサイズ時の処理
    window.addEventListener('resize', function() {
      const newItemsPerView = getItemsPerView();
      if (newItemsPerView !== itemsPerView) {
        itemsPerView = newItemsPerView;
        // リサイズ時にインデックスが範囲外にならないように調整
        const items = carousel.querySelectorAll('.carousel-item');
        if (currentIndex > items.length - itemsPerView) {
          currentIndex = Math.max(0, items.length - itemsPerView);
        }
        updateCarousel();
      }
    });
    
    // 初期化
    updateCarousel();
    
  } catch (error) {
    console.error('カルーセルの初期化に失敗しました:', error);
    // エラー時にはプレースホルダーを表示
    carousel.innerHTML = `
      <div class="carousel-item">
        <div class="card">
          <div class="card-content">
            <p class="text-muted">データの読み込みに失敗しました。</p>
          </div>
        </div>
      </div>
    `;
  }
});