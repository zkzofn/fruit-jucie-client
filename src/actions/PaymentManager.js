/**
 * Created by jang on 2018-03-19.
 */
export const payment = () => {
  const self = this;

  console.log(self);

  const paymentData = {
    user_id: self.props.currentUser.id,
    sender_name: self.state.senderName,
    sender_phone: self.state.senderPhone,
    sender_email: self.state.senderEmail,
    receiver_name: self.state.receiverName,
    receiver_nickname: self.state.receiverNickname,
    receiver_zip_code: self.state.receiverZipcode,
    receiver_address1: self.state.receiverAddress1,
    receiver_address2: self.state.receiverAddress2,
    receiver_phone: self.state.receiverPhone,
    status: 1,
    payment_type: self.state.paymentMethod,
    total_price: this.state.totalPrice, // 여기서 나중에 적립금 적용한 금액으로 넣어야해
    imp_uid: rsp.imp_uid,
    merchant_uid: rsp.merchant_uid,
    card_confirm_num: rsp.apply_num,
    items: self.state.cartItems,
  };

  if (this.state.paymentMethod === "cash") {
    self.props.postOrder(paymentData)
      .then(res => {
        console.log(res);

        self.props.history.push("/my/order")
      });


  } else {
    this.IMP.request_pay({
      pg: 'inicis', // version 1.1.0부터 지원.
      pay_method: this.state.paymentMethod,
      merchant_uid: 'merchant_' + new Date().getTime(),
      name: '주문명:결제테스트',
      amount: 14000, // 여기서 this.state.totalPrice 에 나중에 적립금 적용한 가격으로 넣어야해
      buyer_email: 'zkzofn@gmail.com',
      buyer_name: '이장호',
      buyer_tel: '010-3399-0081',
      buyer_addr: '서울특별시 강남구 삼성동',
      buyer_postcode: '123-456',
      m_redirect_url: 'http://eatmore-green.com/my/order'
    }, function (rsp) {
      if (rsp.success) {
        const paymentData = {
          user_id: self.props.currentUser.id,
          sender_name: self.state.senderName,
          sender_phone: self.state.senderPhone,
          sender_email: self.state.senderEmail,
          receiver_name: self.state.receiverName,
          receiver_nickname: self.state.receiverNickname,
          receiver_zip_code: self.state.receiverZipcode,
          receiver_address1: self.state.receiverAddress1,
          receiver_address2: self.state.receiverAddress2,
          receiver_phone: self.state.receiverPhone,
          status: 1,
          payment_type: self.state.paymentMethod,
          total_price: rsp.paid_amount,
          imp_uid: rsp.imp_uid,
          merchant_uid: rsp.merchant_uid,
          card_confirm_num: rsp.apply_num,
          items: self.state.cartItems,
        };

        self.props.postOrder(paymentData)
          .then(res => {
            console.log(res);

            self.props.history.push("/my/order")
          });
      } else {
        var msg = '결제에 실패하였습니다.';
        msg += '에러내용: ' + rsp.error_msg;
        msg += '다시 시도해보세요.';

        alert(msg);
      }
    });
  }
};