const app = {
  init(selectors) {
    this.dinos = []
    this.max = 0
    this.list = document
      .querySelector(selectors.listSelector)
    this.template = document
      .querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addDino.bind(this))
  },

  addDino(ev) {
    ev.preventDefault()

    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value,
    }

    const listItem = this.renderListItem(dino)
    this.list.insertBefore(listItem, this.list.firstChild)

    this.dinos.unshift(dino)

    ++ this.max
    ev.target.reset()
  },

  renderListItem(dino) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = dino.id

    item
      .querySelector('.dino-name')
      .textContent = dino.name

    return item
  }
}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
  templateSelector: '.dino.template',
})