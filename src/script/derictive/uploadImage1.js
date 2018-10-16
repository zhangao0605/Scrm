app.directive('uploadImage1', function () {
    return {
        link: function (scope, elem) {
            elem.on("change", function () {
                var file = this.files[0];
                if (!/image\/\w+/.test(file.type)) {
                    alert("文件必须为图片！");
                    return false;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    //result.innerHTML = '<img src="'+this.result+'" alt=""/>'
                    elem.parent().css({
                        'background': 'url(' + this.result + ') center no-repeat',
                        'backgroundSize': '100%'
                    });
                    scope.$apply();
                };
                scope.pic=file
            });
        }
    }
});
