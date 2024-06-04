const logOut = document.getElementById("log-out");
logOut.addEventListener("click", () => {
  localStorage.removeItem("userOnline");
  window.location.href = "/";
});

const apiUrl = "http://localhost:3000/users";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// Llamamos la tabla
const dataTable = document.getElementById("data-table");

// Insertamos los datos en la tabla
fetch(apiUrl, options)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let array = data;
    array.forEach((element) => {
      dataTable.innerHTML += `
        <tr>
            <td><img src="${element.image}" alt="Image" width="50" height="50"></td>
            <td>${element.name}</td>
            <td>${element.nit}</td>
            <td>${element.email}</td>
            <td class="w-10">
                <div class="d-flex justify-content-center gap-3 align-items-center">
                <div>
                    <button type="button" class="btn btn-primary btn-update" data-id="${element.id}">Actualizar</button>
                </div>
                <div>
                    <button type="button" class="btn btn-primary btn-delete" data-id="${element.id}">Eliminar</button>
                </div>
            </div>
            </td>
        </tr>
        `;
    });

    // Añadir event listeners a los botones después de crear la tabla
    document.querySelectorAll(".btn-update").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        // Obtener los datos actuales del registro
        fetch(`${apiUrl}/${id}`)
          .then((response) => response.json())
          .then((data) => {
            // Pedir al usuario que ingrese los nuevos datos
            const newName = prompt("Ingrese el nuevo nombre:", data.name);
            const newNit = prompt("Ingrese el nuevo NIT:", data.nit);
            const newEmail = prompt("Ingrese el nuevo email:", data.email);
            const newPassword = prompt(
              "Ingrese la nueva contraseña (deje en blanco para no cambiar):",
              ""
            );
            const newImage = prompt(
              "Ingrese la nueva URL de la imagen:",
              data.image
            );

            const updatedData = {
              name: newName || data.name,
              nit: newNit || data.nit,
              email: newEmail || data.email,
              password: newPassword || data.password,
              image: newImage || data.image,
            };

            // Enviar los datos actualizados al servidor
            fetch(`${apiUrl}/${id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }).then((response) => {
              if (response.ok) {
                alert("Registro actualizado correctamente");
                location.reload(); // Recargar la página para reflejar los cambios
              } else {
                alert("Error al actualizar el registro");
              }
            });
          });
      });
    });

    document.querySelectorAll(".btn-delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        // Confirmar la eliminación
        if (confirm("¿Estás seguro de que deseas eliminar esta empresa?")) {
          fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => {
            if (response.ok) {
              alert("Registro eliminado correctamente");
              location.reload(); // Recargar la página para reflejar los cambios
            } else {
              alert("Error al eliminar el registro");
            }
          });
        }
      });
    });
  })
  .catch((error) => console.error("Error:", error));
