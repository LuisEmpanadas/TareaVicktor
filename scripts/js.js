// Arreglo inicial de tarjetas que se mostrarán en la galería, contiene objetos con datos de imágenes
const cards = [
    {
        name: "Paisaje",
        image: "https://images.pexels.com/photos/18071152/pexels-photo-18071152.jpeg",
        description: "Paisaje"
    },
    {
        name: "Patos",
        image: "https://images.pexels.com/photos/33405508/pexels-photo-33405508.jpeg",
        description: "Animales"
    },
    {
        name: "Casas",
        image: "https://images.pexels.com/photos/33503143/pexels-photo-33503143.jpeg",
        description: "Ciudad"
    },
];

// Selecciona el botón para agregar nuevos lugares en el perfil del viajero
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");

// Obtiene el contenedor de detalles del perfil del viajero
const travelerProfileDetails = document.querySelector(".traveler-profile__details");
console.dir(travelerProfileDetails);

// Selecciona la lista donde se mostrarán las tarjetas de lugares
const placesGalleryList = document.querySelector(".places-gallery__list");

// Referencia al modal que muestra la imagen en tamaño completo
const modalImageView = document.querySelector("#modal-image-view");

// Referencia al modal para agregar un nuevo lugar
const ModalNewPlace = document.querySelector("#modal-new-place");

// Botón que permite editar la información del perfil del viajero
const travelerProfilEditBtn = document.querySelector("#button-edit");

// Modal que contiene el formulario de edición del perfil
const modalProfile = document.querySelector("#modal-profile")

// Campos de entrada para el nombre y descripción en el modal de perfil
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

// Elementos donde se muestran el nombre y biografía del viajero en el perfil
const travelerProfileName = document.querySelector("#traveler-profile__name");
const travelerProfileBio = document.querySelector(".traveler-profile__bio");

// Función que crea una tarjeta visual a partir de un objeto con datos
const createCard = (card) => {
    // Clona el contenido del template de tarjeta para reutilizar su estructura
    const templatePlaceCard = 
    document.querySelector("#template-place-card")
    .content.cloneNode(true);

    // Obtiene referencias a los elementos de imagen y título dentro de la tarjeta
    const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
    const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");

    // Asigna la URL de la imagen y el texto alternativo desde los datos de la card
    placeCardImage.src = card.image ;
    placeCardImage.alt = card.description;
    placeCardTitle.textContent = card.name;

    // Agrega funcionalidad para abrir la imagen en modal al hacer clic
    placeCardImage.addEventListener("click", () => {
        modalImageView.classList.toggle("modal_is-opened");
        const modalImage = modalImageView.querySelector(".modal__image");
        const modalCaption = modalImageView.querySelector(".modal__caption");
        modalImage.src = placeCardImage.src;
        modalImage.alt = placeCardImage.alt;
        modalCaption.textContent = placeCardImage.textContent;
    })

    // Selecciona el botón de eliminar dentro de la tarjeta
    const placeCardDeleteButton = templatePlaceCard.querySelector(
        ".place-card__delete-button"
    );

    // Agrega evento para remover la tarjeta al hacer clic en el botón de borrar
    placeCardDeleteButton.addEventListener("click", (evt) => {
        console.log(evt);
        evt.target.closest(".place-card").remove();
    });

    // Obtiene el botón de like dentro de la tarjeta
    const placeCardLikeButton = templatePlaceCard.querySelector(
        ".place-card__like-button"
    );

    // Alterna el estado activo del botón de like al hacer clic
    placeCardLikeButton.addEventListener("click", () =>{
        console.log("Me encorazona");
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    })

    // Inserta la tarjeta creada en la lista de la galería
    placesGalleryList.appendChild(templatePlaceCard);
}

// Evento para abrir el modal de nueva tarjeta al hacer clic en el botón
travelerProfileAddPlaceBtn.addEventListener("click", () => {
    ModalNewPlace.classList.toggle("modal_is-opened");
});

// Obtiene todos los botones de cierre de modales y los convierte en array
const modalClose = Array.from(document.querySelectorAll(".modal__close"));

console.log("Arreglo de modals: ", modalClose);

// A cada botón de cerrar modal se le agrega el evento de cierre
modalClose.forEach((modalClose) => {
    modalClose.addEventListener("click", (evt) => {
        console.log("Hola como estan amigos de youtube");
        let modal = evt.target.closest(".modal");
        modal.classList.toggle("modal_is-opened");
    })
})

// Evento que se ejecuta al enviar el formulario de nuevo lugar
ModalNewPlace.addEventListener("submit", (evt) => {
    const tempCard = {}
    const modalForms = ModalNewPlace.querySelector(".modal__form");
    const modalInputs = Array.from(modalForms.querySelectorAll(".modal__input"));
    evt.preventDefault();

    // Recorre todos los inputs y guarda sus valores en un objeto temporal
    modalInputs.forEach((modalInput) => {
        console.log(modalInput.value);
        tempCard[modalInput.name] = modalInput.value;
    });

    console.log(tempCard);
    // Invoca la función para crear una tarjeta con los datos recolectados
    createCard(tempCard);
});

// Obtiene todos los formularios de modales para validación
const modalForms = Array.from(document.querySelectorAll(".modal__form"));

// Función que verifica si algún input del formulario es inválido
const validarBoton = (modalInputs) => {
    return modalInputs.some((inputElement) => {
        return !inputElement.validity.valid;
    })
}

// Para cada formulario modal, configura la validación de inputs en tiempo real
modalForms.forEach((modalForm) => {
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    const modalButton = modalForm.querySelector(".modal__button");
    modalButton.disabled = false;

    // Deshabilita el botón si hay algún campo inválido
    modalButton.disabled = validarBoton(modalInputs);

    // Agrega evento de entrada de datos para validación en tiempo real
    modalInputs.forEach((modalInput) => {
        modalInput.addEventListener("input", () => {
            console.log("Hola como estamos");
            modalButton.disabled = validarBoton(modalInputs);

            // Muestra u oculta mensajes de error según la validación
            let modalError = modalForm.querySelector("#" + modalInput.id + "-error");
            if (!modalInput.validity.valid) {
                modalError.textContent = "Hay un error!";
                modalError.classList.add("modal__error_visible");
            } else {
                modalError.textContent = "";
                modalError.classList.remove("modal__error_visible");
            }
    });
});
})

// Itera sobre el arreglo inicial de cards y crea una tarjeta para cada una
cards.forEach((card) => {
    createCard(card);
});

// Evento para guardar los cambios del perfil desde el modal de edición
modalProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    travelerProfileBio.textContent = profileDescription.value;
    travelerProfileName.textContent = profileName.value;
    modalProfile.classList.toggle("modal_is-opened");
});

// Evento para abrir el modal de edición de perfil y cargar los datos actuales
travelerProfilEditBtn.addEventListener("click", () => {
    console.log("aña?")
    profileName.value = travelerProfileName.textContent;
    profileDescription.value = travelerProfileBio.textContent;
    modalProfile.classList.toggle("modal_is-opened");
});