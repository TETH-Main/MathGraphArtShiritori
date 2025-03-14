/**
 * 日付関連のユーティリティクラス
 */
class DateUtils {
    /**
     * 日付文字列をフォーマットする
     * @param {string} dateString - 日付文字列
     * @returns {string} フォーマットされた日付文字列
     */
    static formatDate(dateString) {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return dateString; // 日付形式でない場合はそのまま返す
        }

        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}