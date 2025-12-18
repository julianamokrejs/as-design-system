document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]')
  const nav = document.querySelector('[data-nav]')
  const submenuTriggers = document.querySelectorAll('[data-submenu-trigger]')

  // 1. Toggle do menu mobile
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('is-open')
      nav.classList.toggle('is-open', isOpen)
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    })
  }

  // 2. Lógica de submenu mobile (accordion)
  submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      const isDesktop = window.matchMedia('(min-width: 960px)').matches

      if (!isDesktop) {
        // MOBILE: accordion behavior
        event.preventDefault()
        const item = trigger.closest('.nav-item--has-children')
        if (!item) return

        const alreadyOpen = item.classList.contains('is-open')

        document.querySelectorAll('.nav-item--has-children.is-open').forEach(openItem => {
          if (openItem !== item) openItem.classList.remove('is-open')
        })

        item.classList.toggle('is-open', !alreadyOpen)
      } else {
        // DESKTOP: clique para abrir o mega menu
        event.preventDefault()
        const currentItem = trigger.closest('.nav-item--has-children')
        const isActive = currentItem.classList.contains('is-active')

        // Fecha todos os outros
        document.querySelectorAll('.nav-item--has-children.is-active').forEach(item => {
          if (item !== currentItem) item.classList.remove('is-active')
        })

        // Alterna o atual
        currentItem.classList.toggle('is-active', !isActive)
      }
    })
  })

  // 3. Fechar menu ao clicar fora (apenas desktop)
  document.addEventListener('click', event => {
    const isDesktop = window.matchMedia('(min-width: 960px)').matches
    if (!isDesktop) return

    const insideNav = event.target.closest('.nav-item--has-children')
    if (!insideNav) {
      document.querySelectorAll('.nav-item--has-children.is-active').forEach(item => {
        item.classList.remove('is-active')
      })
    }
  })

  // 4. Fechar menu mobile ao clicar fora do header
  document.addEventListener('click', event => {
    const isDesktop = window.matchMedia('(min-width: 960px)').matches
    if (isDesktop) return

    const clickInsideHeader = event.target.closest('.site-header')
    if (!clickInsideHeader && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open')
      menuToggle?.setAttribute('aria-expanded', 'false')

      document.querySelectorAll('.nav-item--has-children.is-open').forEach(item => {
        item.classList.remove('is-open')
      })
    }
  })

  // 5. Atualização dinâmica da mega-hero (desktop apenas)
  if (window.matchMedia('(min-width: 960px)').matches) {
    const megaLinks = document.querySelectorAll('.mega-list-link')

    megaLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const hero = link.closest('.mega').querySelector('.mega-hero')
        if (!hero) return

        const title = link.dataset.title
        const text = link.dataset.text
        const image = link.dataset.image

        const titleEl = hero.querySelector('.mega-hero-title')
        const textEl = hero.querySelector('.mega-hero-text')
        const mediaEl = hero.querySelector('.mega-hero-media')

        if (title && titleEl) titleEl.textContent = title
        if (text && textEl) textEl.textContent = text
        if (image && mediaEl) {
          mediaEl.style.backgroundImage = `url(${image})`
          mediaEl.style.backgroundSize = 'cover'
          mediaEl.style.backgroundPosition = 'center'
        }
      })
    })
  }
})
