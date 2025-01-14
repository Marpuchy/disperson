window.onload = main;

function main() {
    var player = window.userStats; // Obtenemos las estadísticas del objeto global

    var statColors = {
        experiencia: "#339933",
        responsabilidad: "#333399",
        extraversión: "#999933",
        amabilidad: "#993399",
        emocional: "#993333",
    };

    var statOrder = Object.keys(player);
    var polygonX = 255;
    var polygonY = 240;
    var polygonSize = 120;  // Tamaño inicial del polígono

    var canvas = document.createElement("canvas");
    canvas.classList.add("absolute-center");

    // Ajustar dinámicamente el tamaño del canvas según su contenedor
    var canvasContainer = document.getElementById("canvas-container");

    // Asegurarse de que el contenedor esté disponible
    if (!canvasContainer) return;

    var containerWidth = canvasContainer.clientWidth;
    var containerHeight = canvasContainer.clientHeight;

    // Definir el tamaño del canvas igual al contenedor
    canvas.width = containerWidth;
    canvas.height = containerHeight;

    canvasContainer.appendChild(canvas);

    var ctx = canvas.getContext("2d");

    var animationFrameId;

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

    function drawInnerPolygon(vertices, stats, fill, stroke, progress) {
        ctx.beginPath();
        for (var i = 0; i < vertices.length; i++) {
            var statValue = stats[statOrder[i]] / 100;
            var x = polygonX + (vertices[i].x - polygonX) * statValue * progress;
            var y = polygonY + (vertices[i].y - polygonY) * statValue * progress;
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

    function redraw(progress) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var outerVertices = drawRegularPolygon(polygonX, polygonY, "#666", "#333", 4, statOrder.length, polygonSize);

        ctx.beginPath();
        for (var i = 0; i < outerVertices.length; i++) {
            ctx.moveTo(polygonX, polygonY);
            ctx.lineTo(outerVertices[i].x, outerVertices[i].y);
        }
        ctx.strokeStyle = "#fff";
        ctx.stroke();

        drawInnerPolygon(outerVertices, player, "#b95ded", "#b700ff", progress);

        ctx.fillStyle = "#fff";
        ctx.font = "16px Lato";
        for (var i = 0; i < outerVertices.length; i++) {
            if (statOrder[i]) {
                var x = outerVertices[i].x;
                var y = outerVertices[i].y;

                var angle = (Math.PI * 2 / statOrder.length) * i - Math.PI / 2;
                var labelX = polygonX + (polygonSize + 68) * Math.cos(angle);
                var labelY = polygonY + (polygonSize + 30) * Math.sin(angle);

                ctx.fillText(statOrder[i].toUpperCase(), labelX - ctx.measureText(statOrder[i].toUpperCase()).width / 2, labelY);
            }
        }
    }

    function animate(progress) {
        progress += 0.01;
        if (progress <= 1) {
            redraw(progress);
            animationFrameId = requestAnimationFrame(function() {
                animate(progress);
            });
        }
    }

    redraw(1);
    animate(0);
}
