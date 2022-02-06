import ReactDOM from 'react-dom'
import App from './App.js'

const numbers = [
  {
    id: 1,
    name: 'Rohis',
    phonenumber: '12',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    name: 'Pekka',
    phonenumber: '34',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    name: 'Matti',
    phonenumber: '56',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

ReactDOM.render(
  <App numbers={numbers} />,
  document.getElementById('root')
)