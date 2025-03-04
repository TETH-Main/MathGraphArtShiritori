document.addEventListener('DOMContentLoaded', async function() {
  const searchInput = document.getElementById('searchInput');
  const sortNewestBtn = document.getElementById('sortNewest');
  const sortOldestBtn = document.getElementById('sortOldest');
  const artworkGrid = document.getElementById('artworkGrid');
  
  if (!searchInput || !sortNewestBtn || !sortOldestBtn || !artworkGrid) return;
  
  try {
    // 作品データを取得
    const artworks = await fetchArtworks();
    
    // アーカイブグリッドにアイテムを表示する関数
    function renderArtworks(artworksToRender) {
      artworkGrid.innerHTML = '';
      
      if (artworksToRender.length === 0) {
        artworkGrid.innerHTML = '<p class="text-center">該当する作品が見つかりませんでした。</p>';
        return;
      }
      
      artworksToRender.forEach((artwork, index) => {
        const imageUrl = artwork.imageUrl || artwork.image || artwork.imageLink || 'images/placeholder.jpg';
        const word = artwork.word || artwork.word || '';
        const artist = artwork.artist || artwork.artistName || artwork.artist || '';
        const artistLink = artwork.artistLink || artwork.artistUrl || artwork.artistLink || '#';
        const date = artwork.date || artwork.postDate || artwork.date || '';
        const formattedDate = date ? new Date(date).toLocaleDateString('ja-JP') : '';
        
        const artworkItem = document.createElement('a');
        artworkItem.href = `archive-detail.html?id=${index}`;
        artworkItem.className = 'artwork-item';
        artworkItem.innerHTML = `
          <div class="artwork-image">
            <a href="${artistLink}" target="_blank" rel="noopener noreferrer">
              <img src="${imageUrl}" alt="${word}">
              ${artistLink.includes('twitter.com') ? '@' + artistLink.split('/').pop() : artistLink}
            </a>
          </div>
          <div class="artwork-info">
            <h2 class="artwork-title">${word}</h2>
            <p class="artwork-artist">${artist}</p>
            <p class="artwork-date">${formattedDate}</p>
          </div>
        `;
        artworkGrid.appendChild(artworkItem);
      });
    }
    
    // 初期表示
    renderArtworks(artworks);
    
    // 検索機能
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase().trim();
      const filteredArtworks = searchArtworks(currentArtworks, searchTerm);
      renderArtworks(filteredArtworks);
    });
    
    // 並び替え機能
    sortNewestBtn.addEventListener('click', function() {
      sortNewestBtn.classList.add('active');
      sortOldestBtn.classList.remove('active');
      
      currentArtworks = sortArtworks(artworks, true);
      renderArtworks(searchArtworks(currentArtworks, searchInput.value.toLowerCase().trim()));
    });
    
    sortOldestBtn.addEventListener('click', function() {
      sortOldestBtn.classList.add('active');
      sortNewestBtn.classList.remove('active');
      
      currentArtworks = sortArtworks(artworks, false);
      renderArtworks(searchArtworks(currentArtworks, searchInput.value.toLowerCase().trim()));
    });
    
    // URLパラメータからIDを取得して詳細ページを表示する機能
    const urlParams = new URLSearchParams(window.location.search);
    const artworkId = urlParams.get('id');
    
    if (artworkId && window.location.pathname.includes('archive-detail.html')) {
      const artwork = artworks[parseInt(artworkId, 10)];
      if (artwork) {
        // 詳細ページの要素を取得して内容を設定
        const detailContainer = document.getElementById('artworkDetail');
        if (detailContainer) {
          const imageUrl = artwork.imageUrl || artwork.image || artwork.imageリンク || 'images/placeholder.jpg';
          const word = artwork.word || artwork.単語 || '';
          const artist = artwork.artist || artwork.artistName || artwork.アーティスト名 || '';
          const date = artwork.date || artwork.postDate || artwork.投稿日付 || '';
          const formattedDate = date ? new Date(date).toLocaleDateString('ja-JP') : '';
          const artistLink = artwork.artistLink || artwork.artistUrl || artwork.アーティストリンク || '#';
          
          detailContainer.innerHTML = `
            <div class="artwork-detail-image">
              <img src="${imageUrl}" alt="${word}" class="rounded">
            </div>
            <div class="artwork-detail-info">
              <h1 class="artwork-detail-title">${word}</h1>
              <p class="artwork-detail-artist">
                作者: <a href="${artistLink}" target="_blank" rel="noopener noreferrer">${artist}</a>
              </p>
              <p class="artwork-detail-date">投稿日: ${formattedDate}</p>
            </div>
          `;
        }
      }
    }
    
  } catch (error) {
    console.error('アーカイブの初期化に失敗しました:', error);
    artworkGrid.innerHTML = '<p class="text-center">データの読み込みに失敗しました。</p>';
  }
});