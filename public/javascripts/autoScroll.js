let posts = document.querySelector('.posts')

const autoScroll = () => {
    if(posts.childNodes[0].childNodes.length > 5) {
      //message height
      console.log(getComputedStyle(posts))
      console.log(posts)
      //height off messages container
      const containerHeight = posts.scrollHeight
      console.log(posts.scrollHeight)
      //distance scrolled from top
      posts.scrollTop = posts.scrollHeight
      console.log(posts.scrollTop)
    }
  }

autoScroll()