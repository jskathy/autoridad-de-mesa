document.getElementById("registroForm").addEventListener("submit", function(e){
  e.preventDefault();

  // Validar nombre
  const nombre = document.getElementById("nombre").value.trim();
  if(nombre.length < 3){
    alert("El nombre debe tener al menos 3 letras.");
    return;
  }

  // Validar edad
  const fechaNacimiento = new Date(document.getElementById("fecha").value);
  const hoy = new Date();
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  if(mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())){
    edad--;
  }
  if(edad < 18){
    alert("Debes ser mayor de 18 años.");
    return;
  }

  // Validar teléfono
  const telefono = document.getElementById("telefono").value.trim();
  const regexTelefono = /^\+54\d{10}$/;
  if(!regexTelefono.test(telefono)){
    alert("El teléfono debe comenzar con +54 y tener 10 dígitos.");
    return;
  }

  alert("Formulario enviado correctamente.");
});
