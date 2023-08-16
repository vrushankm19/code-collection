$(document).ready(function () {

    // iziToast.show({
    //     title: 'Hey',
    //     message: 'What would you like to add?'
    // });
    

    // Rest of your existing code

    $("#resetButton").click(function () {
        $("#svgInput").val(""); // Clear SVG input
        $("#newText").val(""); // Clear new text input
        $("#output").val(""); // Clear output textarea
        iziToast.info({
            title: 'Info',
            message: 'Reset successfully!',
            position: 'topRight', // You can change the position of the toast
            timeout: 3000, // Toast will auto-hide after 3 seconds
        });
    });

    $("#convertButton").click(function () {
        var inputSvg = $("#svgInput").val();
        var newText = $("#newText").val();
        var outputSvg = convertSvgIdsAndAttributes(inputSvg, newText);
        $("#output").val(outputSvg);
        iziToast.success({
            title: 'Success',
            message: 'Reset successfully!',
            position: 'topRight', // You can change the position of the toast
            timeout: 3000, // Toast will auto-hide after 3 seconds
        });
    });

    $("#copyButton").click(function () {
        copyToClipboard("#output");
    });

    function convertSvgIdsAndAttributes(svgCode, newText) {
        var parser = new DOMParser();
        var svgDoc = parser.parseFromString(svgCode, "image/svg+xml");
        var svgElements = $(svgDoc).find("[id]");

        svgElements.each(function (index, element) {
            var oldId = $(element).attr("id");
            var newId = newText + oldId;
            $(element).attr("id", newId);
        });

        var attributesToModify = ["fill", "clip-path", "filter"]; // Add more attributes as needed

        attributesToModify.forEach(function (attrName) {
            var attrElements = $(svgDoc).find("[" + attrName + "^='url(#']");
            attrElements.each(function (index, element) {
                var oldAttrValue = $(element).attr(attrName);
                var newAttrValue = oldAttrValue.replace(/url\(#(.+?)\)/g, "url(#" + newText + "$1)");
                $(element).attr(attrName, newAttrValue);
            });
        });

        return svgDoc.documentElement.outerHTML;
    }

    function copyToClipboard(elementSelector) {
        var copyText = $(elementSelector)[0];
        copyText.select();
        document.execCommand("copy");
        // alert("Copied the text: " + copyText.value);
        iziToast.success({
            title: 'Success',
            message: 'Copy Output successfully!',
            position: 'topRight', // You can change the position of the toast
            timeout: 3000, // Toast will auto-hide after 3 seconds
        });
    }
});
