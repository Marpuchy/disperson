onload = main;
function main() {
    var player = {
        apertura: 61,
        conciencia: 45,
        extraversión: 33,
        amabilidad: 69,
        neuroticismo: 42,
    };

    var statColors = {
        apertura: "#339933",
        conciencia: "#333399",
        extraversión: "#999933",
        amabilidad: "#993399",
        neuroticismo: "#993333",
    };

    var statOrder = Object.keys(player);
    var polygonX = 240;
    var polygonY = 240;
    var polygonSize = 120;

    // Directamente creamos el canvas y lo agregamos al contenedor
    var canvas = document.createElement("canvas");
    canvas.width = 480;
    canvas.height = 480;
    canvas.classList.add("absolute-center");
    document.getElementById("canvas-container").appendChild(canvas);

    var ctx = canvas.getContext("2d");

    function drawRegularPolygon(x, y, fill, stroke, strokeWidth, sides, radius) {
        var vertices = [];
        ctx.beginPath();
        for (var i = 0; i <= sides; i++) {
            var angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
            var px = x + radius * Math.cos(angle);
            var py = y + radius * Math.sin(angle);
            vertices.push({ x: px, y: py });
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.fill();
        ctx.lineWidth = strokeWidth;
        ctx.strokeStyle = stroke;
        ctx.stroke();
        return vertices;
    }

    function drawInnerPolygon(vertices, stats, fill, stroke) {
        ctx.beginPath();
        for (var i = 0; i < vertices.length; i++) {
            var statValue = stats[statOrder[i]] / 100; // Normalize stat value
            var x = polygonX + (vertices[i].x - polygonX) * statValue;
            var y = polygonY + (vertices[i].y - polygonY) * statValue;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = fill;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.lineWidth = 2;
        ctx.strokeStyle = stroke;
        ctx.stroke();
    }

    function redraw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var outerVertices = drawRegularPolygon(polygonX, polygonY, "#666", "#333", 4, statOrder.length, polygonSize);

        // Draw radial lines
        ctx.beginPath();
        for (var i = 0; i < outerVertices.length; i++) {
            ctx.moveTo(polygonX, polygonY);
            ctx.lineTo(outerVertices[i].x, outerVertices[i].y);
        }
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        // Draw inner polygon for stats
        drawInnerPolygon(outerVertices, player, "#b95ded", "#b700ff");

        // Draw stat labels on top of each point
        ctx.fillStyle = "#fff";
        ctx.font = "16px Lato";
        for (var i = 0; i < outerVertices.length; i++) {
            var x = outerVertices[i].x;
            var y = outerVertices[i].y;

            // Calculate offset for text to be positioned above the vertex
            var angle = (Math.PI * 2 / statOrder.length) * i - Math.PI / 2;
            var labelX = polygonX + (polygonSize + 68) * Math.cos(angle);
            var labelY = polygonY + (polygonSize + 30) * Math.sin(angle);

            // Draw text centered above each point
            ctx.fillText(statOrder[i].toUpperCase(), labelX - ctx.measureText(statOrder[i].toUpperCase()).width / 2, labelY);
        }
    }

    redraw();
}
