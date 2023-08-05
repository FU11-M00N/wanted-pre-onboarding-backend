exports.emailCheck = function (email, errors) {
   const regex = /[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
   if (!regex.test(email)) {
      errors.email = '이메일 형식이 올바르지 않습니다.';
   }
};
exports.passwordCheck = function (password, errors) {
   if (password.length < 8) {
      errors.password = '패스워드 길이는 8글자 이상으로 입력해 주시기 바랍니다.';
   }
};
