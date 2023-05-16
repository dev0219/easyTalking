<template>
    <div class="waiting-room">
      <div class="logo-container">
        <img src="../assets/logo.svg" alt="EasyTalk logo" />
        <!--<span>EasyTalk.ai</span>-->
      </div>
      <div class="form-container">
        <form @submit.prevent="joinMeeting">
          <div class="input-wrapper">
            <label for="language" class="label">What is your <span class="label-bold">language</span>?</label>
            <select id="language" v-model="language" required>
              <option value="" disabled>Select your language</option>
              <!-- Añadir opciones de idioma aquí -->
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div class="input-wrapper">
            <label for="name" class="label">What is your <span class="label-bold">name</span>?</label>
            <input id="name" v-model="name" type="text" required />
          </div>
          <button type="submit" class="join-button">
            <span>Save and join the meeting</span>
            <!--<img src="../assets/arrow-right.svg" alt="Join icon" />-->
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: "",
        language: "",
      };
    },
    methods: {
      joinMeeting() {
        // Guardar el nombre y el idioma, y redirigir al usuario a la sala de chat
        this.$router.push({
          name: "ChatRoom",
          params: {
            meetingId: this.$route.params.meetingId,
            name: this.name,
            language: this.language,
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
  .waiting-room {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 0 24px;
  }
  .logo-container {
    display: flex;
    align-items: center;
    margin-bottom: 120px;
  }
  .logo-container img {
    width: 60px;
    height: 60px;
  }
  .form-container {
    width: 25%;
    display: flex;
    flex-direction: column;
  }
  .input-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 32px;
  }
  .label {
    font-weight: 300;
    font-size: 18px;
    margin-bottom: 8px;
  }
  .label-bold {
    font-weight: 700;
  }
  input, select {
    width: 100%;
    height: 47px;
    font-size: 16px;
    font-weight: 500;
    color: #232323;
    padding: 0 16px;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    box-sizing: border-box;
    outline: none;
  }
  select {
    background: url('../assets/arrow-down.svg') no-repeat right 24px center;
    appearance: none;
  }
  .join-button {
    width: 100%;
    background-color: #1A73E8;
    color: white;
    height: 47px;
    display: flex;
    align-items:
    center;
    justify-content: center;
    padding: 0 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
}
.join-button img {
    width: 13px;
    height: 13px;
    margin-left: 8px;
}

/* Estilos para dispositivos móviles */
@media (max-width: 767px) {
  .form-container {
    width: 100%;
  }
  .logo-container img {
    width: 40px;
    height: 40px;
  }
  .label {
    font-size: 16px;
  }

}

/* Estilo para el borde de color al enfocar un input */
input:focus, select:focus {
  border-color: #1A73E8;
}
</style>  