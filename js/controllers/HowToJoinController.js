/**
 * 参加方法ページのUIを担当するコントローラークラス
 */
class HowToJoinController extends CommonUIController {
    /**
     * HowToJoinControllerのコンストラクタ
     */
    constructor() {
        super(); // CommonUIControllerのコンストラクタを呼び出し
        this.initFaqAccordion();
    }
}