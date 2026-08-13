const menu = document.querySelector('#nav-menu')
const menuButton = document.querySelector('#nav-toggle')

menuButton?.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open')
  document.body.classList.toggle('menu-open', open)
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
})

menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('is-open')
  document.body.classList.remove('menu-open')
  menuButton?.setAttribute('aria-expanded', 'false')
}))

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const roleElement = document.querySelector('#rotating-role')
const roles = [
  'AI / ML ENGINEER',
  'TECHNICAL SUPPORT',
  'COMPUTER ENGINEER',
  'DATA ANALYST',
  'FULL STACK DEVELOPER',
  'SOFTWARE ENGINEER'
]

if (roleElement) {
  if (reduceMotion.matches) {
    roleElement.textContent = 'SOFTWARE ENGINEER'
    document.querySelector('.type-caret')?.remove()
  } else {
    let roleIndex = 0
    let characterIndex = roles[0].length
    let deleting = true

    const typeRole = () => {
      const role = roles[roleIndex]

      if (!deleting) {
        characterIndex += 1
        roleElement.textContent = role.slice(0, characterIndex)

        if (characterIndex === role.length) {
          deleting = true
          window.setTimeout(typeRole, 1600)
          return
        }

        window.setTimeout(typeRole, 58)
        return
      }

      characterIndex -= 1
      roleElement.textContent = role.slice(0, characterIndex)

      if (characterIndex === 0) {
        deleting = false
        roleIndex = (roleIndex + 1) % roles.length
        window.setTimeout(typeRole, 300)
        return
      }

      window.setTimeout(typeRole, 32)
    }

    window.setTimeout(typeRole, 1600)
  }
}

const cursorLight = document.querySelector('.cursor-light')
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')

if (cursorLight && finePointer.matches && !reduceMotion.matches) {
  let targetX = window.innerWidth * .68
  let targetY = window.innerHeight * .48
  let currentX = targetX
  let currentY = targetY

  window.addEventListener('pointermove', event => {
    targetX = event.clientX
    targetY = event.clientY
    cursorLight.classList.add('is-visible')
  }, { passive: true })

  document.documentElement.addEventListener('mouseleave', () => cursorLight.classList.remove('is-visible'))

  const followPointer = () => {
    currentX += (targetX - currentX) * .075
    currentY += (targetY - currentY) * .075
    cursorLight.style.left = `${currentX}px`
    cursorLight.style.top = `${currentY}px`
    requestAnimationFrame(followPointer)
  }
  requestAnimationFrame(followPointer)
}

const manifestos = document.querySelectorAll('.manifesto')

const capabilitiesPanel = document.querySelector('.capabilities__inner')
const profileStory = document.querySelector('.professional-profile__story')

if (capabilitiesPanel && profileStory) {
  profileStory.append(capabilitiesPanel)
  document.querySelector('.capabilities')?.remove()
}

if (manifestos.length) {
  if (reduceMotion.matches) {
    manifestos.forEach(manifesto => manifesto.classList.add('is-visible'))
  } else {
    const scrollLines = document.querySelectorAll('.manifesto__title span, .manifesto__copy p, .profile__reveal')
    let scrollFrame

    const updateScrollText = () => {
      const viewportCenter = window.innerHeight / 2
      const fadeDistance = window.innerHeight * .85

      scrollLines.forEach(line => {
        const box = line.getBoundingClientRect()
        const lineCenter = box.top + box.height / 2
        const signedDistance = lineCenter - viewportCenter
        const isProfileText = line.classList.contains('profile__reveal')
        const elementFadeDistance = isProfileText ? window.innerHeight * .48 : fadeDistance
        const proximity = Math.max(0, 1 - Math.abs(signedDistance) / elementFadeDistance)
        const eased = proximity * proximity * (3 - 2 * proximity)

        line.style.opacity = String((isProfileText ? .045 : .14) + eased * (isProfileText ? .955 : .86))
        line.style.transform = `translateY(${signedDistance * .045}px)`
        line.style.filter = `blur(${(1 - eased) * (isProfileText ? 2 : 3)}px) brightness(${isProfileText ? .42 + eased * .68 : 1})`
        if (isProfileText) line.style.setProperty('--profile-glow', `${(eased * 16).toFixed(2)}px`)
      })

      scrollFrame = null
    }

    const requestScrollTextUpdate = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollText)
    }

    window.addEventListener('scroll', requestScrollTextUpdate, { passive: true })
    window.addEventListener('resize', requestScrollTextUpdate, { passive: true })
    updateScrollText()
  }
}
