/**
 * Google Spreadsheetからしりとりアート作品データを取得する関数
 * @param {string} spreadsheetId - Google SpreadsheetのID
 * @param {string} sheetName - シート名（オプション）
 * @returns {Promise<Array>} 作品データの配列
 */
async function fetchApplication() {
  try {
    // Google Sheets APIのエンドポイント
    // スプレッドシートを「ウェブに公開」設定にする必要があります
    const url = `https://script.google.com/macros/s/AKfycby1uK606WpIBfn6oxRaALBsUDgL4RO0Z6KYap5H_kaf9P8MCHX8ywfadbW8A53QiLjt4Q/exec?id=147uJQaQbfr8pTJZf6fuQkx5vgHjTfi1cnPYujyNg2Xs&name=data`;
    
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
