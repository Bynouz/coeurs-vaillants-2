/* Scripts du système CSB / Coeurs Vaillants 2 pour Foundry VTT */

const mois = (new Date()).getMonth();

// message d'accueil à l'activation du module
async function welcomeMessage() {
  ChatMessage.create({
    type: CONST.CHAT_MESSAGE_TYPES.OTHER,
    content: '🗺️ Hello aventurier/ère !</br> Bienvenue dans le monde de Coeurs Vaillants !',
    speaker: { alias: "Bynouz" }
  })
  game.user.setFlag("coeurs-vaillants-2", "welcome-message", mois)
}
  
Hooks.on('hotReload', async function () {
  // mise à jour automatique des paramètres du système
  if (game.settings.get('custom-system-builder', 'customStyle')) {
    const settings = {
      initFormula: '![:niveau_num:+:init_bonus:]',
      customStyle: ''
    }
    game.settings.settings.forEach(async setting => {
      if (typeof settings[setting.key] !== 'undefined' && 
            game.settings.get('custom-system-builder', setting.key) !== settings[setting.key]) {
              await game.settings.set('custom-system-builder', setting.key, settings[setting.key])
      }
    })

    // message d'accueil à l'activation du module
    if (game.user.getFlag("coeurs-vaillants-2", "welcome-message") !== mois) {
        welcomeMessage()
    }

  }
    
})

Hooks.once('ready', async function () {
  // message d'accueil à l'activation du module
  if (game.user.getFlag("coeurs-vaillants-2", "welcome-message") !== mois) {
    welcomeMessage()
  }
})
