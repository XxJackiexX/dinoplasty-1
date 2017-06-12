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
      .addEventListener('submit', this.addDinoFromForm.bind(this))

    this.load()
  },

  load() {
    // load the JSON from localStorage
    const dinoJSON = localStorage.getItem('dinos')

    // convert the JSON back into an array
    const dinoArray = JSON.parse(dinoJSON)

    // set this.dinos with the dinos from that array
    if (dinoArray) {
      dinoArray
        .reverse()
        .map(this.addDino.bind(this))
    }
  },

  addDino(dino) {
    const listItem = this.renderListItem(dino)
    this.list.insertBefore(listItem, this.list.firstChild)

    this.dinos.unshift(dino)
    this.save()

    ++ this.max
  },

  addDinoFromForm(ev) {
    ev.preventDefault()

    const dino = {
      id: this.max + 1,
      name: ev.target.dinoName.value,
      fav: false,
    }

    this.addDino(dino)
    
    ev.target.reset()
  },

  save() {
    localStorage
      .setItem('dinos', JSON.stringify(this.dinos))
  },

  renderListItem(dino) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = dino.id

    item
      .querySelector('.dino-name')
      .textContent = dino.name

    if (dino.fav) {
      item.classList.add('fav')
    }

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeDino.bind(this))
    item
      .querySelector('button.fav')
      .addEventListener('click', this.favDino.bind(this, dino))
    item
      .querySelector('button.move-up')
      .addEventListener('click', this.moveUp.bind(this, dino))

    return item
  },

  moveUp(dino, ev) {
    const listItem = ev.target.closest('.dino')

    const index = this.dinos.findIndex((currentDino, i) => {
      return currentDino.id === dino.id
    })

    if (index > 0) {
      this.list.insertBefore(listItem, listItem.previousElementSibling)

      const previousDino = this.dinos[index - 1]
      this.dinos[index - 1] = dino
      this.dinos[index] = previousDino
      this.save()
    }
  },

  favDino(dino, ev) {
    const listItem = ev.target.closest('.dino')
    dino.fav = !dino.fav

    if (dino.fav) {
      listItem.classList.add('fav')
    } else {
      listItem.classList.remove('fav')
    }

    this.save()
  },

  removeDino(ev) {
    const listItem = ev.target.closest('.dino')
    listItem.remove()

    for (let i = 0; i < this.dinos.length; i++) {
      const currentId = this.dinos[i].id.toString()
      if (listItem.dataset.id === currentId) {
        this.dinos.splice(i, 1)
        break;
      }
    }

    this.save()
  },
}

app.init({
  formSelector: '#dino-form',
  listSelector: '#dino-list',
  templateSelector: '.dino.template',
})
