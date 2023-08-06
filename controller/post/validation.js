exports.titleCheck = function (title, errors) {
   if (!(title.length && title.length <= 40)) {
      errors.title = '게시글 제목은 1글자 이상 40글자 이하로 작성해 주시기 바랍니다.';
   }
};
exports.contentCheck = function (content, errors) {
   if (!(content.length <= 150)) {
      errors.content = '게시글 본문은 150글자 이하로 작성해 주시기 바랍니다.';
   }
};
