// import moment from "moment";

export default class Format {
  /**
   * Hàm format tiền
   * @param {number} money
   * @returns string tiền được định dạng
   * Author: dxviet (18/07/2021)
   */
  static formatMoney(money) {
    if (money == 0) return 0;
    if (money) {
      return money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
    } else return "";
  }

  // /**
  //  * Hàm format date
  //  * @param {any} date
  //  * @returns string ngày/tháng/năm
  //  * Author: dxviet(02/08/2021)
  //  */
  // static formatDate(date) {
  //   if (date == undefined || moment(date).toISOString() == null) return "";
  //   else return moment(date).format("DD/MM/YYYY");
  // }

  /**
   * Hàm chuyển đổi giới tính sang string
   * @param {number} gender
   * @returns string
   * Author: dxviet (18/07/2021)
   */
  static convertGender(gender) {
    switch (gender) {
      case 0:
        return "Nữ";
      case 1:
        return "Nam";
      case 2:
        return "Khác";
      default:
        return "";
    }
  }

  /**
   * Hàm validate email
   * @param {any} email
   * @returns true nếu email đúng định dạng và ngược lại
   * Author: dxviet (20/07/2021)
   */
  static validateEmail(email) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  /**
   * Hàm validate số (số điện thoại, số CMND)
   * @param {any} number
   * @returns true/false
   * Author: dxviet (20/07/2021)
   */
  static validateNumber(number) {
    const numberRegex = /^[0-9]+$/;
    return numberRegex.test(number);
  }
}
