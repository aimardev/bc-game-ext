const DEFAULT_BASE_URL = 'https://www.filescan.io'
const TOKEN_KEY = 'accessToken'
const SIGNIN_URL = '/auth/signin'

function clearToken() {
  if (localStorage.getItem(TOKEN_KEY)) {
    localStorage.removeItem(TOKEN_KEY)
    setTimeout(() => window.location.pathname = SIGNIN_URL, 1000)
  }
}

async function command(cmd) {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ cmd }, (response) => {
      resolve(response)
    })
  })
}

async function waitForToken() {
  return new Promise(function (resolve) {
    const id = setInterval(() => {
      const token = localStorage.getItem(TOKEN_KEY)
      if (token) {
        clearInterval(id)
        resolve(token)
      }
    }, 1000)
  })
}

async function main() {
  const setting = await command('get_base_url')
  const origin = setting?.origin ?? DEFAULT_BASE_URL
  if (!origin.startsWith(window.location.origin)) {
    return
  }

  clearToken()
  const token = await waitForToken()
  chrome.runtime.sendMessage({ token })
}

main().catch(e => console.log(e))
