// Inicializar el mapa centrado en Buenos Aires
const map = L.map('map').setView([-34.6037, -58.3816], 13);

// Agregar capa de diseño estándar (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Listado de marcadores de las sedes
const sedes = [
    { lat: -34.5828, lng: -58.3912, titulo: "Facultad de Derecho - UBA" },
    { lat: -34.5885, lng: -58.3915, titulo: "Centro Cultural Recoleta" },
    { lat: -34.5552, lng: -58.4631, titulo: "Sede Comunal 13 Belgrano" },
    { lat: -34.6037, lng: -58.4215, titulo: "UTN - Facultad Regional Buenos Aires" },
    { lat: -34.6033, lng: -58.3838, titulo: "Palacio de Tribunales - Sala Electoral" }
];

// Guardar referencias a los marcadores
const marcadores = {};

sedes.forEach(sede => {
    const marker = L.marker([sede.lat, sede.lng]).addTo(map);
    marker.bindPopup(`<b>${sede.titulo}</b>`);
    marcadores[sede.titulo] = marker;
});

// Función global que se ejecuta al apretar "Ver sede en el mapa"
window.enfocarSede = function (lat, lng, tituloSede) {
    // 1. Desplazamiento suave hacia la sección del mapa
    const seccionMapa = document.getElementById("mapaDeSedes");
    seccionMapa.scrollIntoView({ behavior: 'smooth' });

    // 2. Centrar el mapa y hacer zoom con un pequeño retraso para que coincida con el scroll
    setTimeout(() => {
        map.setView([lat, lng], 16, { animate: true });
        if (marcadores[tituloSede]) {
            marcadores[tituloSede].openPopup();
        }
    }, 400);

};

function cambiarMapa(direccion) {
    // 1. Codifica la dirección para que sea apta para una URL (reemplaza espacios por +, etc.)
    const direccionCodificada = encodeURIComponent(direccion);

    // 2. Actualiza el atributo 'src' del iframe con la nueva ubicación
    const mapaIframe = document.getElementById('googleMap');
    mapaIframe.src = `https://www.google.com/maps?q=${direccionCodificada}&output=embed`;

    // 3. Hace scroll suave automático hacia la sección del mapa
    const seccionMapa = document.getElementById('mapaDeSedes');
    seccionMapa.scrollIntoView({ behavior: 'smooth' });
}