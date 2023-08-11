$(document).ready(function () {

    // Rest of your existing code

    $("#resetButton").click(function () {
        $("#svgInput").val(""); // Clear SVG input
        $("#newText").val(""); // Clear new text input
        $("#output").val(""); // Clear output textarea
    });
    
    $("#convertButton").click(function () {
        var inputSvg = $("#svgInput").val();
        var newText = $("#newText").val();
        var outputSvg = convertSvgIdsAndAttributes(inputSvg, newText);
        $("#output").val(outputSvg);
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

        var clipPathElements = $(svgDoc).find("[clip-path]");
        clipPathElements.each(function (index, element) {
            var oldClipPathValue = $(element).attr("clip-path");
            var newClipPathValue = oldClipPathValue.replace(/url\(#clip-path\)/g, "url(#" + newText + "clip-path)");
            $(element).attr("clip-path", newClipPathValue);
        });

        return svgDoc.documentElement.outerHTML;
    }

    function copyToClipboard(elementSelector) {
        var copyText = $(elementSelector)[0];
        copyText.select();
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
    }
});