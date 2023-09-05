let isGamePlaying = false
{
  const control = document.querySelector('.control')
  const closeControl = document.querySelector('#closeControl')

  const playBtn = document.querySelector('#play')

  closeControl.addEventListener('click', () => {
    let isOpen = control.dataset.open === 'true'
    control.dataset.open = !isOpen
  })

  playBtn.addEventListener('click', () => {
    let iconEl = playBtn.querySelector('i')

    isGamePlaying = !isGamePlaying

    if (isGamePlaying) {
      iconEl.classList.remove('fa-play')
      iconEl.classList.add('fa-pause')

      playBtn.classList.remove('bg-green')
      playBtn.classList.add('bg-red')
    } else {
      iconEl.classList.remove('fa-pause')
      iconEl.classList.add('fa-play')

      playBtn.classList.remove('bg-red')
      playBtn.classList.add('bg-green')
    }
  })

}