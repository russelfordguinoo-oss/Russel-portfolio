const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const navClose = document.getElementById('nav-close')

navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'))
navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'))

document.querySelectorAll('.nav__link, .nav__resume').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('show-menu'))
})

const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav__link')

function updateActiveLink() {
  const scrollY = window.scrollY
  sections.forEach(section => {
    const top = section.offsetTop - 140
    const bottom = top + section.offsetHeight
    if (scrollY >= top && scrollY < bottom) {
      navLinks.forEach(link => link.classList.remove('active-link'))
      document.querySelector(`.nav__link[href="#${section.id}"]`)?.classList.add('active-link')
    }
  })
}

window.addEventListener('scroll', updateActiveLink, { passive: true })

const revealTargets = document.querySelectorAll('.section__head, .experience__grid, .project-card, .certificates__grid article, .blog__list article, .resume__content, .contact__email')
revealTargets.forEach(target => target.classList.add('reveal'))

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

revealTargets.forEach(target => revealObserver.observe(target))
const yearElement = document.getElementById('year')
if (yearElement) yearElement.textContent = new Date().getFullYear()
