const actions = [...document.querySelectorAll('.action')]
const homeActions = document.querySelector('#home-actions')
const insertForm = document.querySelector('#insert-form')
// // const actionsContainer = document.querySelector('#actions-container')

// let toggle = true

// actions.forEach((action, id) => {
//     action.addEventListener('click', e => {
//         if(toggle) {
//             homeActions.style.height = '80vh'
//             homeActions.style.height = '80vh'
//             // actionsContainer.style.flexDirection = 'column'
//             insertForm.style.width = '100%'
//             insertForm.style.height = '70%'
//             toggle = !toggle

//         } else {
//             // actionsContainer.style.flexDirection = 'row'
//             homeActions.style.height = '30em'
//             insertForm.style.width = '0'
//             insertForm.style.height = '0'
//             toggle = !toggle
//         }
//         // actions[(id+1)%3].style.transform = 'scale(0.5)'
//         // actions[(id+2)%3].style.transform = 'scale(0.5)'
//         // setTimeout(() => {
//         //     actions[(id+1)%3].style.position = 'absolute'
//         //     actions[(id+2)%3].style.position = 'absolute'
//         // }, 50)
//         // action.style.width = '100%'
//     })
// })