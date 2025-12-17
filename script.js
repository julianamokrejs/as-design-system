document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('[data-menu-toggle]')
  const nav = document.querySelector('[data-nav]')
  const submenuTriggers = document.querySelectorAll('[data-submenu-trigger]')

  // 1. Toggle do Menu Mobile
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = !nav.classList.contains('is-open')
      nav.classList.toggle('is-open', isOpen)
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false')
    })
  }

  // 2. Lógica de Submenu (Accordion no Mobile)
  submenuTriggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      const isDesktop = window.matchMedia('(min-width: 960px)').matches
      
      // Em desktop, o hover/focus resolve via CSS. Só queremos JS no mobile.
      if (isDesktop) return

      event.preventDefault()
      const item = trigger.closest('.nav-item--has-children')
      if (!item) return

      const alreadyOpen = item.classList.contains('is-open')

      // (Opcional) Fechar outros acordeões ao abrir um novo
      document.querySelectorAll('.nav-item--has-children.is-open').forEach(openItem => {
        if (openItem !== item) openItem.classList.remove('is-open')
      })

      // Alternar estado do atual
      item.classList.toggle('is-open', !alreadyOpen)
    })
  })

  // 3. Fechar menu ao clicar fora (Mobile)
  document.addEventListener('click', event => {
    const isDesktop = window.matchMedia('(min-width: 960px)').matches
    if (isDesktop) return

    const clickInsideHeader = event.target.closest('.site-header')
    
    // Se o clique não foi no header e o menu está aberto, feche-o
    if (!clickInsideHeader) {
      if (nav && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open')
        menuToggle?.setAttribute('aria-expanded', 'false')
        
        // Reseta também os submenus
        document.querySelectorAll('.nav-item--has-children.is-open').forEach(item => {
          item.classList.remove('is-open')
        })
      }
    }
  })
})