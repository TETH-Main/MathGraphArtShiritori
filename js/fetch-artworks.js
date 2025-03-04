/**
 * Google Spreadsheetからしりとりアート作品データを取得する関数
 * @param {string} spreadsheetId - Google SpreadsheetのID
 * @param {string} sheetName - シート名（オプション）
 * @returns {Promise<Array>} 作品データの配列
 */
async function fetchArtworks() {
  try {
    // Google Sheets APIのエンドポイント
    // スプレッドシートを「ウェブに公開」設定にする必要があります
    const url = `https://script.google.com/macros/s/AKfycby1uK606WpIBfn6oxRaALBsUDgL4RO0Z6KYap5H_kaf9P8MCHX8ywfadbW8A53QiLjt4Q/exec?id=1HoxCJ-GdButZZI3-GQEOaJv9ZVMqG6DaioR6Wpr2YeE&name=data`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error('作品データの取得に失敗しました:', error);
    return [];
  }
}

/**
 * 作品データを日付順にソートする関数
 * @param {Array} artworks - 作品データの配列
 * @param {boolean} newestFirst - 新しい順にソートする場合はtrue
 * @returns {Array} ソートされた作品データの配列
 */
function sortArtworks(artworks, newestFirst = true) {
  return [...artworks].sort((a, b) => {
    const dateA = new Date(a.date || a.postDate || a.投稿日付 || 0);
    const dateB = new Date(b.date || b.postDate || b.投稿日付 || 0);
    
    return newestFirst ? dateB - dateA : dateA - dateB;
  });
}

/**
 * 作品データを検索する関数
 * @param {Array} artworks - 作品データの配列
 * @param {string} searchTerm - 検索キーワード
 * @returns {Array} 検索結果の作品データの配列
 */
function searchArtworks(artworks, searchTerm) {
  if (!searchTerm) return artworks;
  
  const term = searchTerm.toLowerCase();
  
  return artworks.filter(artwork => {
    const word = (artwork.word || artwork.単語 || '').toLowerCase();
    const artist = (artwork.artist || artwork.artistName || artwork.アーティスト名 || '').toLowerCase();
    
    return word.includes(term) || artist.includes(term);
  });
}