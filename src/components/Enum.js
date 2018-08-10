export const enumCategory = {
  salad: {
    code: 0,
    value: "salad",
    label: "SALAD"
  },
  juice: {
    code: 1,
    value: "juice",
    label: "JUICE"
  },
  fruits: {
    code: 2,
    value: "fruits",
    label: "FRUITS"
  },
  soup: {
    code: 3,
    value: "soup",
    label: "SOUP"
  },
  etc: {
    code: 4,
    value: "etc",
    label: "ETC"
  }
};

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
};
export const enumAdminProducts = { value: "products", label: "products"};
export const enumAdminShipping = { value: "shipping", label: "shipping"};
export const enumAdminCustomers = { value: "customers", label: "customers"};
