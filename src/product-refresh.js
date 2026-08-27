// My Nutri 2.0 product cleanup
// Keeps the current application logic intact while removing non-nutrition product surfaces.

const removeByText = (selector, needles) => {
  document.querySelectorAll(selector).forEach(el => {
    const text = (el.textContent || '').trim().toLowerCase()
    if (needles.some(n => text.includes(n))) el.remove()
  })
}

const replaceText = () => {
  document.querySelectorAll('*').forEach(el => {
    if (el.children.length) return
    const text = el.textContent?.trim()
    if (!text) return
    if (text === 'clinical workspace') el.textContent = 'nutrição inteligente'
    if (text.includes('Agenda, financeiro e relatórios')) el.textContent = 'Agenda, evolução e relatórios clínicos'
    if (text.includes('Diário, chat e evolução')) el.textContent = 'Diário, hábitos e evolução'
    if (text.includes('Atendimento, prontuário, prescrição, acompanhamento e relacionamento')) {
      el.textContent = 'Atendimento, prontuário, prescrição, plano alimentar e acompanhamento em um único fluxo.'
    }
  })
}

const cleanNutritionSurface = () => {
  removeByText('.sidebar button', ['financeiro', 'mensagens'])
  removeByText('.quickGrid button', ['financeiro', 'novo lançamento'])
  removeByText('.stat', ['a receber', 'lançamentos abertos'])
  removeByText('.loginFeatureGrid > div', ['chat', 'financeiro'])
  replaceText()
  document.documentElement.classList.add('my-nutri-2')
}

const observer = new MutationObserver(() => cleanNutritionSurface())

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    cleanNutritionSurface()
    observer.observe(document.body, { childList: true, subtree: true })
  })
} else {
  cleanNutritionSurface()
  observer.observe(document.body, { childList: true, subtree: true })
}
