window.onload = main;
window.onresize = main; // Redibuja cuando cambia el tamaño de la ventana

function main() {
    var player = window.userStats; // Obtenemos las estadísticas del usuario

    var statColors = {
        experiencia: "#339933",
        responsabilidad: "#333399",
        extraversión: "#999933",
        amabilidad: "#993399",
        emocional: "#993333",
    };

    var statOrder = Object.keys(player);

    var canvasContainer = document.getElementById("canvas-container");
    if (!canvasContainer) return;

    // Crear o reutilizar el canvas
    var canvas = canvasContainer.querySelector("canvas");
    if (!canvas) {
        canvas = document.createElement("canvas");
        canvas.classList.add("absolute-center");
        canvasContainer.appendChild(canvas);
    }

    // Ajustar el tamaño del canvas dinámicamente
    canvas.width = canvasContainer.clientWidth;
    canvas.height = canvasContainer.clientHeight;

    var ctx = canvas.getContext("2d");
    var polygonSize = Math.min(canvas.width, canvas.height) * 0.3; // 40% del menor lado
    var polygonX = canvas.width / 2;
    var polygonY = canvas.height / 2;

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
        ctx.font = `${Math.max(12, polygonSize * 0.1)}px Lato`; // Ajusta tamaño del texto

        for (var i = 0; i < outerVertices.length; i++) {
            if (statOrder[i]) {
                var angle = (Math.PI * 2 / statOrder.length) * i - Math.PI / 2;
                var labelX = polygonX + (polygonSize + 30) * Math.cos(angle);
                var labelY = polygonY + (polygonSize + 20) * Math.sin(angle);

                ctx.fillText(
                    statOrder[i].toUpperCase(),
                    labelX - ctx.measureText(statOrder[i].toUpperCase()).width / 2,
                    labelY
                );
            }
        }
    }

    function animate(progress) {
        if (progress <= 1) {
            redraw(progress);
            requestAnimationFrame(function () {
                animate(progress + 0.01);
            });
        }
    }

    redraw(1);
    animate(0);
}
