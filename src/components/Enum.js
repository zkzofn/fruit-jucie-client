export const enumSalad = { value: "salad", label: "SALAD" };
export const enumJuice = { value: "juice", label: "JUICE" };
export const enumDelivery = (status) => {
  switch (status) {
    case 0:
      return "입금대기";
    case 1:
      return "배송준비중";
    case 2:
      return "배송중";
    case 3:
      return "배송완료";
    case 4:
      return "구매확정";
    case 5:
      return "구매취소 진행중";
    case 6:
      return "구매취소 및 환불완료";
    default:
      return "관리자에게 문의";
  }
}
