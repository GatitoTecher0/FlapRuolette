let array_concursantes = [
    "Opción 1", "Opción 2", "Opción 3", "Opción 4", "Opción 5"
];

let canvas = document.getElementById("idcanvas");
let context = canvas.getContext("2d");
let center = canvas.width / 2;

document.fonts.ready.then(function() {
    context.font = "13px LithosB";
    drawCanvas();
});

// Dibuja la ruleta con segmentos de colores
function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
    for (let i = 0; i < array_concursantes.length; i++) {
        context.beginPath();
        context.moveTo(center, center);
        context.arc(center, center, center - 20, i * 2 * Math.PI / array_concursantes.length, (i + 1) * 2 * Math.PI / array_concursantes.length);
        context.lineTo(center, center);
        context.fillStyle = ['#fd7eff', '#7ee2ff', '#7effa5', '#f5ff7e', '#ffc46a'][i % 5];
        context.fill();

        context.strokeStyle = "#fffedf";  // Color del borde (blanco)
        context.lineWidth = 1;  // Grosor del borde
        context.stroke();  // Dibuja el borde alrededor del segmento

        context.save();
        context.translate(center, center);
        context.rotate(3 * 2 * Math.PI / (5 * array_concursantes.length) + i * 2 * Math.PI / array_concursantes.length);
        context.translate(-center, -center);
        context.font = "13px Faculty Glyphic";
        context.textAlign = "right";
        context.fillStyle = "black";
        context.fillText(array_concursantes[i], canvas.width - 45, center);
        context.restore();
    }
}

// Actualiza la lista de concursantes desde el textarea
function actualizarConcursantes() {
    const inputText = document.getElementById("concursantesInput").value;
    
    // Divide el texto en líneas y filtra las que estén vacías
    array_concursantes = inputText.split("\n").filter(name => name.trim() !== "");
    
    // Mezcla el array de concursantes de forma aleatoria
    array_concursantes = array_concursantes.sort(() => Math.random() - 0.5);
    
    drawCanvas();  // Redibuja la ruleta con las opciones actualizadas y reordenadas
}

let clic = 0;
let pos_ini = 0; // Ángulo inicial
let movement;
let speed = 15;  // Velocidad inicial
let deceleration = 0.1; // Desaceleración gradual
let winner = "";

// Indica si la ruleta está girando
let isMoving = false;

// Función para sortear
function sortear() {
    if (isMoving) {
        console.log('El movimiento ya está activo');
        return;
    }
    isMoving = true;
    speed = 15;
    movement = setInterval(function () {
        pos_ini += speed;
        canvas.style.transform = 'rotate(' + pos_ini + 'deg)';
        speed -= deceleration;
        if (speed <= 0) {
            clearInterval(movement);
            movement = null;
            isMoving = false; // Permitir volver a presionar el botón
            showResult();
        }
    }, 10);
}

// Función para mostrar el resultado
function showResult() {
    // Ajusta el cálculo teniendo en cuenta la flecha estática
    let angle = pos_ini % 360; // Ángulo final de la ruleta
    let winnerIndex = Math.floor(((angle + 90) % 360) / (360 / array_concursantes.length));  // Ajuste para la flecha
    let winner = array_concursantes[winnerIndex];
    
    Swal.fire({
        title: "¡Tenemos un ganador!",
        text: "El premio es: " + winner,
        icon: "success",
        confirmButtonText: "¡Felicidades!",
        background: '#404040',  // Color de fondo
        color: '#ffffff',  // Color del texto
        confirmButtonColor: '#9600bb',  // Color del botón de confirmación
        titleColor: '#ff5733',  // Color del título
    });
}

// Dibuja la ruleta inicialmente con los concursantes por defecto
drawCanvas();
