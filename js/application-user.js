document.addEventListener('DOMContentLoaded', async function() {
  const applicationUserItem = document.getElementById('application-user');
  
  if (!applicationUserItem) return;
    
  try {
    // 作品データを取得
    const applicationUsers = await fetchApplication();

    // 申し込みユーザーにアイテムを追加
    applicationUserItem.innerHTML = '';

    // 申し込みユーザーにアイテムを追加
    applicationUsers.forEach(user => {
      const participationBool = user.check || '';
      if (participationBool === '申し込みを取り消します') continue;
      const artist = user.account || user.artistName || user.artist || '';
      
      const userItem = document.createElement('div');
      userItem.innerHTML = `
        <a href="https://x.com/${artist}" target="_blank" rel="noopener noreferrer" class="artist-link">
          <div class="artist-avatar"></div>
          <div class="artist-info">
              <p class="artist-name">${artist.replace("@", "")}</p>
            <p class="artist-handle">${artist}</p>
          </div>
        </a>
      `;
      applicationUserItem.appendChild(userItem);
    });
  } catch (error) {
    console.error('初期化に失敗しました:', error);
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
