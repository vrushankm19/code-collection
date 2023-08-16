$(document).ready(function () {

    // iziToast.show({
    //     title: 'Hey',
    //     message: 'What would you like to add?'
    // });
    

    // Rest of your existing code

    $("#svgInput").focus();


    $("#resetButton").click(function () {
        $("#svgInput").val(""); // Clear SVG input
        $("#newText").val(""); // Clear new text input
        $("#output").val(""); // Clear output textarea
        iziToast.info({
            title: 'Info',
            close: false,
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
        // $("#copyButton").focus();
        iziToast.success({
            title: 'Success',
            close: false,
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
            close: false,
            message: 'Copy Output successfully!',
            position: 'topRight', // You can change the position of the toast
            timeout: 3000, // Toast will auto-hide after 3 seconds
        });
    }

    $("#downloadButton").click(function () {
        // Show the popup to input file name
        var fileName = prompt("Enter File Name Only:");
        if (fileName) {
            downloadSvgFile(fileName);
        }
    });

    function downloadSvgFile(fileName) {
        var svgContent = $("#output").val();
        var blob = new Blob([svgContent], { type: "image/svg+xml" });
        var url = URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.href = url;
        a.download = fileName + ".svg";
        document.body.appendChild(a);
        a.click();

        // Cleanup
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            iziToast.success({
                title: 'Success',
                close: false,
                message: 'SVG Download successfully!',
                position: 'topRight', // You can change the position of the toast
                timeout: 3000, // Toast will auto-hide after 3 seconds
            });
        }, 0);
    }
});
