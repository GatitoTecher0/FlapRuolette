let array_concursantes = [
    "Opción 1", "Opción 2", "Opción 3", "Opción 4", "Opción 5"
];

let canvas = document.getElementById("idcanvas");
let context = canvas.getContext("2d");
let center = canvas.width / 2;

document.fonts.ready.then(function() {
    context.font = "14px Faculty Glyphic";
    drawCanvas();
});

function drawCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < array_concursantes.length; i++) {
        context.beginPath();
        context.moveTo(center, center);
        context.arc(center, center, center - 20, i * 2 * Math.PI / array_concursantes.length, (i + 1) * 2 * Math.PI / array_concursantes.length);
        context.lineTo(center, center);
        context.fillStyle = ['#fd7eff', '#7ee2ff', '#7effa5', '#f5ff7e', '#ffc46a'][i % 5];
        context.fill();

        context.strokeStyle = "#fffedf";
        context.lineWidth = 1;
        context.stroke();

        context.save();
        context.translate(center, center);
        context.rotate(3 * 2 * Math.PI / (5 * array_concursantes.length) + i * 2 * Math.PI / array_concursantes.length);
        context.translate(-center, -center);
        context.font = "14px Faculty Glyphic";
        context.textAlign = "right";
        context.fillStyle = "black";
        context.fillText(array_concursantes[i], canvas.width - 45, center);
        context.restore();
    }
}

function actualizarConcursantes() {
    const inputText = document.getElementById("concursantesInput").value;

    array_concursantes = inputText.split("\n").filter(name => name.trim() !== "");

    array_concursantes = array_concursantes.sort(() => Math.random() - 0.5);
    
    drawCanvas(); 
}

let clic = 0;
let pos_ini = 0; 
let movement;
let speed = 15; 
let deceleration = 0.1; 
let winner = "";

let isMoving = false;

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
            isMoving = false;
            showResult();
        }
    }, 10);
}

function showResult() {
    let angle = pos_ini % 360; 
    let winnerIndex = Math.floor(((angle + 90) % 360) / (360 / array_concursantes.length)); 
    let winner = array_concursantes[winnerIndex];
    
    Swal.fire({
        title: "¡Tenemos un ganador!",
        text: "El premio es: " + winner,
        icon: "success",
        confirmButtonText: "¡Felicidades!",
        background: '#404040', 
        color: '#ffffff', 
        confirmButtonColor: '#9600bb', 
        titleColor: '#ff5733', 
    });
}

drawCanvas();
