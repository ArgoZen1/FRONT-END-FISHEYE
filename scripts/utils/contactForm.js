document.addEventListener('DOMContentLoaded', () => {
  // Elements du DOM


  const formData = document.querySelectorAll('.formData');
  const closeConfirmModalCrossElement = document.querySelector('.closeConfirmModal');
  // récupération des élements du formulaire
  const forms = document.querySelectorAll('form[data-form]');
  const formElement = document.querySelector('form[data-form]');
  const modalConfirmContainer = document.querySelector('.confirmModal');
  const modalConfirmElement = document.querySelector('.confirmModal__box');

  // Gestion des erreurs
  let error;
  let errors;

  // ==================================
  // === CONTROLS AND ACCESSIBILITY ===
  // ==================================

  // récupération de tous les aria-haspopup
  const triggers = document.querySelectorAll('[aria-haspopup="dialog"]');
  const mainElement = document.querySelector('.main');

  // tableau de tous les éléments focusables de la fenêtre modale
  const focusableElementsArray = [
    '[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ];

  const keyValues = {
    enter: 'Enter',
    escape: 'Escape',
    tab: 'Tab',
  };

  // ==============================================
  // === Ouverture et fermeture du contact modal ===
  // ==============================================

  // ==================
  // === Modal ouverte ===

  /**
   * Open the modal set as argument and set focus on the first focusable element
   * @param {HTMLElement} dialog élement de la modal à ouvrir
   * @returns Return si le modal n'a pas d'éléments focalisables
   */
  const openModal = (dialog) => {
    // Sélection de tous les éléments focusables du modal, le premier et le dernier
    const focusableElements = dialog.querySelectorAll(focusableElementsArray);
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Activate modal and disable main element when modal window opens
    dialog.setAttribute('aria-hidden', false);
    mainElement.setAttribute('aria-hidden', true);

    // return si aucun élément focusable
    if (!firstFocusableElement) {
      return;
    }

    // Place le focus sur le premier élément focalisable avec un délai
    // pour se concentrer après l'animation modale ouverte
    window.setTimeout(() => {
      firstFocusableElement.focus();

      // garde le focus dans la boîte de dialogue
      focusableElements.forEach((focusableElement) => {
        if (focusableElement.addEventListener) {
          focusableElement.addEventListener('keydown', (event) => {
            const tab = event.key === keyValues.tab;

            if (!tab) {
              return;
            }

            // Alors si la tabulation est pressée :
            // si la touche majuscule ou majuscule + tabulation sont appuyées, aller au dernier ou au premier élément
            // en fonction de la position réelle
            if (event.shiftKey) {
              if (event.target === firstFocusableElement) {
                event.preventDefault();
                lastFocusableElement.focus();
              }
            } else if (event.target === lastFocusableElement) {
              event.preventDefault();
              firstFocusableElement.focus();
            }
          });
        }
      });
    }, 100);
  };

  // ==================
  // === CLOSE MODAL ===

  /**
   * Ferme le modal, supprime les messages d'erreur et restaure le focus sur l'ouverture du déclencheur
   * @param {HTMLElement} dialog Élément modal à fermer
   * @param {HTMLElement} trigger Déclencheur sur lequel restaurer le focus après la fermeture
   */
  const closeModal = (dialog, trigger) => {
    dialog.setAttribute('aria-hidden', true);
    mainElement.setAttribute('aria-hidden', false);

    // Supprime les messages d'erreur
    formData.forEach((formD) => {
      formD.setAttribute('data-error-visible', 'false');
      formD.setAttribute('data-error', '');
    });
    error = '';

    // Restaure le focus sur le déclencheur qui ouvre le modal
    trigger.focus();
  };

  // ======================================================
  // === On va chercher le modal et les déclancheurs pour gérer les actions.  ===
  // ======================================================

  triggers.forEach((trigger) => {
    // on va chercher le modal lié au déclencheur via l'attribut aria-controls
    const dialog = document.getElementById(trigger.getAttribute('aria-controls'));

    // on va chercher tous les déclencheurs pour fermer le modal via l'attribut de données
    const closeTriggers = dialog.querySelectorAll('[data-close]');

    // Ouverture de la boîte de dialogue modale via l'événement 'clic' sur le bouton
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(dialog);
    });

    // Ouverture de la boîte de dialogue modale en appuyant sur la touche "Entrée"
    trigger.addEventListener('keydown', (event) => {
      if (event.key === keyValues.enter) {
        event.preventDefault();
        openModal(dialog);
      }
    });


    closeTriggers.forEach((closeTrigger) => {
      //Obtentionde de la correspondance modale avec le déclencheur via l'id
      const dialogModalToClose = document.getElementById(closeTrigger.dataset.close);

      //  fermeture
      closeTrigger.addEventListener('click', () => {
        closeModal(dialogModalToClose, trigger);
      });

      closeTrigger.addEventListener('keydown', (event) => {
        if (event.key === keyValues.enter) {
          event.preventDefault();
          closeModal(dialogModalToClose, trigger);
        }
      });
    });

    // Ferme la modale en appuyant sur la touche "Echap"
    dialog.addEventListener('keydown', (event) => {
      if (event.key === keyValues.escape) {
        event.preventDefault();
        closeModal(dialog, trigger);
      }
    });

    // Ferme la modal en cliquant sur le background
    window.addEventListener('click', (event) => {
      if (event.target === dialog) {
        closeModal(dialog, trigger);
      }
    });
  });

  // =======================
  // === Validation Formulaire ===
  // =======================

  // On verifie si le formulaire existe
  if (forms.length > 0) {
    // Boucle sur tous les éléments
    forms.forEach((form) => {
      // pour obtenir tous les inputs qui doivent être validés (avoir l'attribut data-validate)
      const inputs = form.querySelectorAll('[data-validate]');

      // bind permet de passer tous les inputs en argument
      form.addEventListener('submit', submitForm.bind(form, inputs));
    });
  }

  // ======================
  // === Validation des inputs ===
  // ======================

  /**
   *
   * @param {HTMLElement} input Input du formulaire pour la validation
   * @returns S'il y a des erreurs, affiche un message sous les champs concernés,
   * sinon on return pas d'erreur
   */
  function validateInput(input) {
    // pour obtenir la valeur et l'élément formData pour assigner un message d'erreur
    // (via CSS pseudo-elements)
    const { value } = input;
    const formDataElement = input.closest('[data-formData]');
    // Déclare une variable d'erreur pour afficher les messages d'erreur et assigné null par défaut
    error = null;

    // On verifie : -> if l'input est une radio ou une checkbox
    // -> et si l'input a data-required attribute
    //  -> et on verifie que la valeur est vide et que celle-ci a une minlength requise
    // -> la valeur de l'input est < au minlength
    if (
      input.type !== 'radio'
      && input.type !== 'checkbox'
      && input.dataset.required !== undefined
      && input.dataset.minlength !== undefined
      && value.length < input.dataset.minlength
    ) {
      // Définir un message d'erreur sur l'attribut data-error pour l'afficher à l'utilisateur
      formDataElement.setAttribute(
        'data-error',
        `Ce champ est requis. Veuillez entrer au moins ${input.dataset.minlength} caractères.`,
      );
      error = formDataElement.dataset.error;
    }

    // Vérifie si l'input a l'attribut data-email et si l'email n'est pas valide avec la fonction validateEmail
    if (input.dataset.email !== undefined && !validateEmail(value)) {
      formDataElement.setAttribute(
        'data-error',
        'Ce champ est requis. Veuillez entrer une adresse email valide.',
      );
      error = formDataElement.dataset.error;
    }

    /**
     *
     * @param {String} String adresse Email
     * @returns Booléen. true si l'e-mail correspond à la regex, sinon false
     */
    function validateEmail(email) {
      const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regexMail.test(String(email).toLowerCase());
    }

    // S'il n'y a pas d'erreur, on supprime le message d'erreur 
    // et on défini l'attribut data-error-visible sur false
    if (!error) {
      formDataElement.setAttribute('data-error-visible', 'false');
      error = '';
      formDataElement.setAttribute('data-error', '');
    } else {
      formDataElement.setAttribute('data-error-visible', 'true');
    }
    return error;
  }

  // ============================
  // ======== SOUMETTRE LE FORMULAIRE ========
  // ============================

  /**
   * Soumet le formulaire en cliquant sur le bouton Soumettre et appelle validateInput() sur chaque input
   * @param {NodeList} inputs Liste de toutes les entrées du formulaire par id/classe
   * (ex: input#first.text-control)
   * @param {MouseEvent} event
   */
  function submitForm(inputs, event) {
    event.preventDefault();
    errors = [];

    inputs.forEach((input) => {
      validateInput(input);
      if (error) {
        errors.push(error);
      }
    });

    // Vérifie si le tableau des erreurs est vide et seulement dans ce cas, le formulaire est soumis
    //Linter ok
    function close() {
      const modalToClose = document.querySelector('.contactModal');
      const triggerToFocus = document.querySelector('.contactButton');
      closeModal(modalToClose, triggerToFocus);
    }
    if (errors.length === 0) {
      logDatas();
      // réinitialise le formulaire
      formElement.reset();
      close();
      confirmSubmission();
    }
  }

  // =========================
  // === confirmation de la soumission du formulaire ===
  // ==========================

  function confirmSubmission() {
    // ouverture du modal de confirmation
    modalConfirmContainer.style.display = 'block';

    // Affiche un message après le succès de la validation du formulaire
    // 1. On créait une div
    const divElement = document.createElement('div');
    divElement.className = 'confirmModal__body';

    // 2. On met l'element p dans l'element div
    const pElement = document.createElement('p');
    pElement.textContent = 'Merci pour votre message. Nous vous répondrons dans les meilleurs délais.';

    divElement.appendChild(pElement);

    // Ajout d'un bouton pour fermer le modal de confirmation
    const buttonElement = document.createElement('input');
    buttonElement.classList.add('btn-submit', 'btn-close-modal');
    buttonElement.setAttribute('type', 'button');
    buttonElement.setAttribute('value', 'Fermer');

    divElement.appendChild(buttonElement);

    modalConfirmElement.appendChild(divElement);

    closeConfirmModalCrossElement.addEventListener('click', closeConfirmModal);

    const btnCloseModalElement = document.querySelector('.btn-close-modal');
    btnCloseModalElement.focus();
    btnCloseModalElement.addEventListener('click', closeConfirmModal);
    btnCloseModalElement.addEventListener('keydown', (event) => {
      if (event.key === keyValues.enter) {
        event.preventDefault();
        closeConfirmModal();
      }
    });

    modalConfirmElement.addEventListener('keydown', (event) => {
      if (event.key === keyValues.escape) {
        event.preventDefault();
        closeConfirmModal();
      }
    });
  }

  // ==================================
  // === Modal confirmation closing ===
  // ==================================

  /**
   * Fermeture de la popup de confirmation
   */
  function closeConfirmModal() {
    // Sélectionne et supprime l'élément p
    modalConfirmElement.querySelector('p').remove();
    // Sélectionne et supprime le bouton Élément
    modalConfirmElement.querySelector('.btn-close-modal').remove();
    // Sélectionne et supprime l'élément div
    modalConfirmElement.querySelector('.confirmModal__body').remove();
    // fermeture de la modal
    modalConfirmContainer.style.display = 'none';
    const triggerToFocus = document.querySelector('.contactButton');
    triggerToFocus.focus();
  }

  // ========================================
  // === Fonction qui récupères les données du formulaire ==
  // === et les affiche dans la console ===
  // ========================================

  /**
   * Récupère les données saisies dans les champs après validation
   *  et on l'affiche dans la console
   */
  function logDatas() {
    const datas = document.querySelectorAll('[data-validate]');
    datas.forEach((data) => {
      // eslint-disable-next-line no-console
      console.log(`${data.name} : ${data.value}`);
    });
  }
});
