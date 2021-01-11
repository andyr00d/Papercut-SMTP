var messageId = window.location.href.substring(window.location.href.indexOf("=") + 1);
console.log(location.hostname + ':37408/api/messages/' + messageId);

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

        //console.log(xhttp.responseText);

        var headerTextDirty = xhttp.responseText.split(',"Cc"');
        var headerTextClean = headerTextDirty[0] + '}';
        var obj = JSON.parse(headerTextClean);

        $("#hdrFrom").text(obj.From[0].Name + ' <' + obj.From[0].Address + '>');
        $("#hdrTo").text(obj.To[0].Name + ' <' + obj.To[0].Address + '>');
        $("#hdrSubject").text(obj.Subject);
        var d = new Date(obj.CreatedAt);
        $("#hdrDate").text(d.toString());

        var bodyTextDirty = xhttp.responseText.match(new RegExp("<body>" + "(.*)" + "</body>"))[0];
        var bodyTextClean = replaceAllBackSlash(bodyTextDirty);

        function replaceAllBackSlash(targetStr) {
            var index = targetStr.indexOf("\\");
            while (index >= 0) {
                targetStr = targetStr.replace("\\", "");
                index = targetStr.indexOf("\\");
            }
            return targetStr;
        }

        $(bodyTextClean).appendTo("#bodymain");
    }
};

xhttp.open("GET", '/api/messages/' + messageId, true);
xhttp.send();