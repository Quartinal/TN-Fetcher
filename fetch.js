const cfg = require('./cfg.json')

const botToken = cfg.BOT_TOKEN

const channelId = cfg.CHANNEL_ID

const latestMessages = []

const fetchMessages = async () => {
  try {
    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'GET',
      headers: {
        'Authorization': `Bot ${botToken}`
      },
    })

    if (response.ok) {
      const messages = await response.json()
      updateMessages(messages)
    } else {
      console.error('Error fetching messages:', response.statusText)
    }
  } catch (error) {
    console.error('Error:', error.message)
  }
}

const updateMessages = (messages) => {
  latestMessages.length = 0
  messages.forEach((message) => {
    latestMessages.push(message.content)
  })

  updateAlert()
}

const updateAlert = () => {
  alert(`Latest Messages:\n\n${latestMessages.join('\n')}`)
}

setInterval(fetchMessages, 5000)

fetchMessages()
