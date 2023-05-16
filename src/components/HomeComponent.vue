<template>
    <div class="home">
      <h1>
        Connect with anyone, anywhere, in any language with
        <span class="bold">EasyTalk</span>.
      </h1>
  
      <button @click="createMeetingLink" class="create-link-button">
        <img src="../assets/link-icon.svg" alt="Link icon" />
        Create link for new chat
      </button>
  
      <!-- Pop-up -->
      <div v-if="showPopup" class="popup-container" @click="closePopup">
        <div class="popup" @click.stop>
          <button class="close-popup" @click="closePopup">
            <img src="../assets/x-icon.svg" alt="Close icon" />
            </button>
            <h2 class="popup-content">Here is the link for your meeting</h2>
            <p class="popup-content same-width">
            Copy this link and share it with the person(s) you want to talk to. Save it if you want to use it later.
          </p>
          <div class="link-container same-width">
            <div class="link-and-copy">
            <span class="bold">{{ meetingLink }}</span>
            <img src="../assets/copy-icon.svg" alt="Copy icon" @click.stop="copyToClipboard" />
            </div>
          </div>
        </div>
      </div>

      <!-- Copied link notification -->
    <transition name="fade">
      <div v-if="showCopyNotification" class="copy-notification">
        Link copied
      </div>
    </transition>
    </div>
  </template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      meetingLink: '',
      showCopyNotification: false,
    };
  },
  methods: {
    generateMeetingLink() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      const idLength = 9;
      let meetingId = '';

      for (let i = 0; i < idLength; i++) {
        meetingId += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      const baseUrl = window.location.origin;
      const meetingLink = `${baseUrl}/w/${meetingId}`;
      return meetingLink;
    },
    createMeetingLink() {
      this.meetingLink = this.generateMeetingLink();
      this.showPopup = true;
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.meetingLink).then(() => {
        this.showCopyNotification = true;
        setTimeout(() => {
          this.showCopyNotification = false;
        }, 1000);
      });
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>
  
<style scoped>
.home {
  max-width: 50%;
  margin: 0 auto;
  padding: 0 24px;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

@media (max-width: 767px) {
  .home {
    max-width: 100%;
  }
}

h1 {
  font-size: 44px;
  font-weight: 100;
}

.bold {
  font-weight: bold;
}

.create-link-button {
  background-color: #1A73E8;
  color: white;
  height: 47px;
  display: inline-flex; /* Cambia 'flex' a 'inline-flex' */
  align-items: center;
  justify-content: center;
  padding: 0 24px; /* Aumenta el padding a 24px a ambos lados */
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 24px;
  font-size: 16px;
  font-weight: 500;
}

.create-link-button img {
  width: 18px;
  height: 18px;
  margin-right: 8px;
}

.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup {
  background-color: white;
  padding: 24px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  max-width: 350px; /* Establece el ancho máximo del popup */
  position: relative;
}

.popup h2 {
    font-size: 16px;
    text-align: left;
}

.popup p {
  font-size: 16px;
  text-align: left;
  line-height: 24px;
}

.popup-content {
  width: 100%; 
}


.link-container {
  display: flex; /* Cambia a 'flex' */
  /* Elimina 'justify-content: center' */
  background-color: #FFFFFF;
  border-radius: 3px;
  font-weight: bold;
  width: 100%;
}

.link-and-copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #F3F3F3;
  border-radius: 3px;
  padding: 16px 16px; /* Ajusta el padding para que los elementos estén centrados y tengan espacio alrededor */
}

.same-width {
  max-width: 350px; /* Establece el ancho máximo deseado aquí */
}


@media (min-width: 768px) {
  .popup {
    width: 25%;
  }
}

@media (max-width: 767px) {
  .popup-container {
    padding: 0 24px;
  }
  .popup {
    width: 100%;
  }
}

.close-popup {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 24px; /* Añade un margen de 24px a todos los lados */
}

.close-popup img {
  width: 18px;
  height: 18px;
}

.link-container span {
  margin-right: 24px; /* Agrega un margen derecho de 8px */
}

.link-container img {
  cursor: pointer; 
}
.copy-notification {
  position: fixed;
  transform: translateX(-50%);
  background-color: #353741;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 16px;
  font-weight: bold;
  opacity: 0.9;
  z-index: 1000;
  top: calc(50% + 24px);
  left: 50%;
  transform: translate(-50%, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>
  